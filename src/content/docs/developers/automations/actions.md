---
title: Actions
description: Register an automation step that does something to a contact, and tell the engine what happened with StepResult.
sidebar:
  order: 2
---

An action is a step an automation runs for a contact: tag them, call your API, grant a reward.
Register it on the `marker_crm/automation_actions` filter, from inside `marker_crm/loaded`.

```php
use MarkerCRM\App\Models\Contact;
use MarkerCRM\App\Services\Automation\RunContext;
use MarkerCRM\App\Services\Automation\StepResult;

add_filter('marker_crm/automation_actions', function (array $actions) {
    $actions['acme_grant'] = [
        'label'       => __('Grant a reward', 'acme'),
        'description' => __('Gives the member a reward.', 'acme'),
        'group'       => 'Acme',
        'integration' => ['key' => 'acme', 'label' => 'Acme'],
        'icon'        => 'gift',
        'fields'      => [['key' => 'points', 'label' => __('Points', 'acme'), 'type' => 'number', 'required' => true]],
        'sanitize'    => fn (array $settings) => ['points' => absint($settings['points'] ?? 0)],
        'run'         => function (Contact $contact, array $settings, RunContext $run) {
            return acme_grant($contact, $settings['points'], $run->get('level'))
                ? StepResult::done()
                : StepResult::fail(__('Acme refused the grant.', 'acme'));
        },
    ];

    return $actions;
});
```

## Keys

| Key | Type | Required | |
|---|---|---|---|
| `run` | `callable` | Yes | Does the work. See [Running](#running) |
| `label` | `string` | No (defaults to the key) | Name in the step picker and on the canvas |
| `description` | `string` | No | One line in the picker: what the step does |
| `group` | `string` | No (defaults to *Other*) | Heading inside your integration's section |
| `integration` | `array` | No | `['key' => …, 'label' => …, 'logo' => …]`, as for [triggers](/developers/automations/triggers/#keys) |
| `category` | `string` | No (defaults to `apps`) | Section of the **Actions** tab: `contact`, `email`, `sms`, `timing`, `automation`, `wordpress` or `apps`. In `apps`, steps are headed by their integration |
| `icon` | `string` | No | A Lucide name from the [icon list](/developers/automations/triggers/#icons) |
| `fields` | `array` | No | The settings panel. See [Settings fields](/developers/automations/fields/) |
| `sanitize` | `callable(array $settings): array` | No | Cleans the settings on save. When given, it owns them outright |
| `available` | `bool` or `callable(): bool` | No | Whether the step can run right now |
| `capability` | `string` | No | A WordPress capability the person saving the automation must hold to add this step or change its settings |
| `message` | `bool` | No | `true` when the step sends something to the contact, so the email's sending window applies |

Leave out `category` and your action lands under **Apps**, headed by your integration's name
and logo — which is usually what you want.

## Running

```php
function (Contact $contact, array $settings, RunContext $run): ?StepResult
```

- `$contact` is the contact the run is for.
- `$settings` is what the site owner saved in your fields, after `sanitize`.
- `$run` is the run it is working inside.

`run` executes on Marker CRM's queue, never in the request that started the automation. There
is no signed-in user and no request to read. Keep it under a few seconds; for anything slower,
queue a job of your own and return `done()`.

### StepResult

Return a `StepResult`, or `null` for done:

| Result | What happens |
|---|---|
| `StepResult::done()` | Moves on to the next step |
| `StepResult::wait(int\|DateTimeInterface $until)` | Holds the contact until then (seconds from now, at least 60, or a moment), then moves on. The action is not run again |
| `StepResult::skipped(string $reason)` | Moves on as done without retrying. The reason is logged and passed to `marker_crm/automation_step_executed`. Use it when the step must not act on this contact — they have no account, they opted out of that list |
| `StepResult::stop()` | Ends the run as completed. Not an error |
| `StepResult::fail(string $reason)` | Retries after 1 minute, then 5. The third failure ends the run as **Failed**, with the reason kept as its last error |

A thrown exception counts as `fail()` with the exception's message.

Choose `skipped()` over `fail()` when retrying cannot help. A failure retries twice and then
throws the contact out of the automation; a skip records why and lets the rest of the flow
carry on.

### RunContext

| Member | Returns |
|---|---|
| `$run->get(string $key, $default = null)` | One value from the trigger's context, dot notation allowed |
| `$run->context()` | The whole context array |
| `$run->trigger()` | The name of the trigger that started the run |
| `$run->mergeData(Contact $contact)` | What merge tags read for this run, for rendering text yourself |
| `$run->subscriber` | The run (`Models\AutomationSubscriber`) |
| `$run->step` | The step being run (`Models\AutomationStep`) |
| `$run->automation` | The automation (`Models\Automation`) |

To fill merge tags in your own text — a note, a value you send elsewhere — render it with the
run's data:

```php
use MarkerCRM\App\Services\Sending\MergeTagService;

$text = MergeTagService::text((string) $settings['message'], $run->mergeData($contact));
```

`MergeTagService::text()` leaves values as plain text. Use `MergeTagService::render()` only
for HTML: it escapes every value for HTML.

## Writing to the contact

If your step changes the contact, write through the same service every other part of the CRM
uses, so automations and webhooks hear about it:

```php
use MarkerCRM\App\Services\Contact\ContactService;

ContactService::createOrUpdate(['id' => $contact->id, 'custom' => ['plan' => 'pro']]);
```

The contact you are handed is the one the run loaded. If an earlier step in the same chain
changed it, re-read what you depend on rather than trusting the object.

## Availability

When `available` says no — the plugin your step needs is inactive — the step is left out of
the picker, and an automation using it is listed as unavailable and cannot be turned on.
A run that reaches it waits 15 minutes at a time, without using up an attempt, until it is
available again. The step's settings are kept as stored when the automation is saved.

`available` runs on every request: keep it to a `class_exists()` or a constant.

## Capabilities

The runner acts as nobody, so a step that hands out access is guarded when it is saved. With
`'capability' => 'promote_users'`, a person without that capability cannot add the step or
change its settings — the whole save is refused with a 422 and nothing is written. They may
still keep, move or delete one somebody else built.

## Sending something to the contact

A step that sends a message to the contact says `'message' => true`, and the builder is told
so. For such a step, a `window` in its settings holds the contact until the window opens, in
the shape the core email step stores:

| `window` | Means |
|---|---|
| `null` or missing | Run as soon as it is reached |
| `['mode' => 'custom', 'days' => […], 'from' => 'HH:MM', 'to' => 'HH:MM']` | Only within these hours and days, site time. `days` are `0` (Sunday) to `6`; empty means any day |
| `['mode' => 'date', 'at' => 'Y-m-d H:i', 'late' => 'send'\|'skip']` | Not before `at`, site time; if that had passed on arrival, send at once or skip |

The builder draws the window control only for the core **Send an email** step, so an add-on
that wants one provides `window` itself, for example through `sanitize`.

## Required fields

A field marked `required` that is left empty stops the automation being turned on or a draft
being published. The check runs on the server, with the same rules as the builder's
checklist, so the list page's **Activate** cannot get round it. See
[Settings fields](/developers/automations/fields/#required).

## When an action is rejected

An action without `run`, or with `run`, `sanitize` or `available` that is not callable, a
`capability` that is not a string, or a key that is not lowercase letters, numbers, dashes and
underscores, is skipped with a `_doing_it_wrong()` notice naming it. Every other action still
loads.

A new step naming an action nobody registers is dropped when the automation is saved. A step
already saved keeps its settings while its add-on is away, and a run that reaches it fails
rather than silently skipping a step nobody can see.

## Changing a core action

Core actions are registered at priority 5. An add-on at the default priority 10 may change one
or `unset()` it.
