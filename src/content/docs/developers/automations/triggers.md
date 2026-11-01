---
title: Triggers
description: Register an automation trigger, fired by name or heard on a WordPress hook, with the exact keys and callable signatures.
sidebar:
  order: 1
---

A trigger is an event that can let a contact into an automation. Register it on the
`marker_crm/automation_triggers` filter, from inside `marker_crm/loaded`. Every trigger is
also an event that goals, **Wait for an event** and **Leave when** can listen for — see
[Goals and events](/developers/automations/goals-and-events/).

There are two kinds:

- **Fired by name.** Your code calls `do_action('marker_crm/trigger', …)` when the event
  happens. Simplest when the event is in your own plugin.
- **Heard on a hook.** You name a WordPress action (yours or another plugin's) and say how to
  find the contact from its arguments. Marker CRM listens to it for you.

## Fired by name

```php
add_filter('marker_crm/automation_triggers', function (array $triggers) {
    $triggers['acme_level_reached'] = [
        'label'       => __('Level reached', 'acme'),
        'description' => __('Runs when a member reaches the chosen level.', 'acme'),
        'group'       => 'Acme',
        'icon'        => 'trophy',
        'fields'      => [[
            'key'     => 'level',
            'label'   => __('Level', 'acme'),
            'type'    => 'select',
            'options' => [['value' => 'gold', 'label' => __('Gold', 'acme')]],
        ]],
        'matches'     => fn (array $settings, array $args, array $context) => ($context['level'] ?? '') === ($settings['level'] ?? ''),
    ];

    return $triggers;
});
```

Fire it with the trigger's name, the contact and a context array:

```php
do_action('marker_crm/trigger', 'acme_level_reached', $contactOrId, ['level' => 'gold']);
```

| Argument | Type | |
|---|---|---|
| `$name` | `string` | The key you registered |
| `$contact` | `Contact` or `int` | The contact, or its id. An id that does not exist does nothing |
| `$context` | `array` | Stored on the run as `data.context`; read later by actions, merge tags and goals |

Nothing happens if the trigger is not registered, is unavailable, or the request is an import
running with automations turned off.

## Heard on a hook

Give `hook` and a `contact` resolver instead of firing by name:

```php
use MarkerCRM\App\Models\Contact;
use MarkerCRM\App\Services\Contact\ContactService;

$triggers['acme_order_paid'] = [
    'label'   => __('Order paid', 'acme'),
    'group'   => 'Acme',
    'icon'    => 'shopping-cart',
    'hook'    => 'acme/order_paid',              // do_action('acme/order_paid', $orderId, $order)
    'fields'  => [['key' => 'product', 'label' => __('Product', 'acme'), 'type' => 'select', 'source' => 'acme_products']],
    'contact' => function (int $orderId, $order): ?Contact {
        $email = [['channel' => 'email', 'address' => $order->email]];

        return ContactService::matching($email)
            ?: ContactService::createOrUpdate(['subscriptions' => [$email[0] + ['status' => 'transactional']]]);
    },
    'context' => fn (array $args) => ['total' => number_format((float) $args[1]->total, 2, '.', ''), 'product' => (int) $args[1]->product_id],
    'matches' => fn (array $settings, array $args, array $context) => empty($settings['product']) || (int) $settings['product'] === $context['product'],
    'met'     => fn (Contact $contact, array $settings, string $since) => acme_bought_since($contact, $settings['product'] ?? 0, $since),
];
```

`acme_bought_since()` stands for your own lookup, and `acme_products` is an
[option source](/developers/automations/fields/#option-sources) you register. Marker CRM
attaches to the hook at priority 20, passing up to 10 arguments.

:::caution
A resolver that may create a contact must go through `ContactService::createOrUpdate()`, look
the contact up first so an existing subscription is left alone, and give a new contact an
explicit `transactional` status. A purchase is not consent to marketing email.
:::

## Keys

| Key | Type | Required | |
|---|---|---|---|
| `label` | `string` | No (defaults to the key) | Name shown in the trigger picker and on the canvas |
| `description` | `string` | No | One line under the label in the picker: what makes it run |
| `group` | `string` | No (defaults to *Other*) | Heading the trigger sits under in the picker |
| `integration` | `array` | No | `['key' => …, 'label' => …, 'logo' => …]`: your entry in the picker's rail. `logo` is an optional `http(s)` image URL shown at 16px. Without it the trigger is filed under *Other* |
| `icon` | `string` | No | A Lucide icon name from the [list below](#icons); anything else shows `zap` |
| `fields` | `array` | No | The settings panel. See [Settings fields](/developers/automations/fields/) |
| `available` | `bool` or `callable(): bool` | No | Whether the trigger can be used right now. See [Availability](#availability) |
| `sanitize` | `callable(array $settings): array` | No | Cleans the saved settings. When given, it owns them outright; otherwise every value is cleaned as text |
| `matches` | `callable` | No | Whether one automation should start. Without it, every fire matches |
| `met` | `callable` | No | Whether the event already happened since a moment. Makes the trigger usable as a goal |
| `hook` | `string` | For hooked triggers | The WordPress action to listen to |
| `contact` | `callable` | When `hook` is given | Finds the contact from the hook's arguments |
| `context` | `callable` | No | Builds the context array from the hook's arguments |
| `bulk` | `string` | No | A second hook for the same event reaching many contacts at once |
| `among` | `callable` | No | Narrows a bulk set to the contacts it applies to |
| `create` | `callable` | No | Makes a contact when `contact` finds none |

## Callable signatures

| Key | Signature | Called |
|---|---|---|
| `contact` | `(...$hookArgs): ?Contact` | Once per fire, with every argument the hook passed. Two triggers on one hook sharing the same callable share the answer |
| `context` | `(array $hookArgs): array` | Once per fire, after `contact`. Stored on the run as `data.context` |
| `matches` | `(array $settings, array $args, array $context): bool` | Once per automation listening, and once per goal, wait or leave-when naming the event. `$args` is the hook's arguments, or `[$contact, $context]` when fired by name. Read from `$context`, which is the same both ways |
| `met` | `(Contact $contact, array $settings, string $since): bool` | When a run reaches a goal or a wait on this event: has it already happened since `$since` (UTC, `Y-m-d H:i:s`, when the run entered)? |
| `among` | `(array $settings, int[] $ids): int[]` | On the bulk path only, after the **Only if** rules: the ids this automation's settings really apply to |
| `create` | `(array $settings, array $hookArgs): ?Contact` | Per listening automation whose `matches` passed, only when `contact` returned `null` |

`contact` and `context` are not called at all when no active automation starts on the trigger
and none waits for it, so loading an order there costs nothing on a site that does not use the
trigger.

An exception thrown by any of these is caught and logged under *automations* when debug
logging is on. It never reaches the code that fired the hook, so a failing trigger cannot
break a checkout or a login.

## Context

The context is stored as JSON on every run and read back by merge tags, actions and goals.

- Keep it **flat and scalar**: strings, numbers and ids, never objects or models.
- Money is a formatted string (`'42.00'`), never a float.
- When a run later moves because of an event — it reaches a goal, or a wait ends — that
  event's context is merged over the run's, the event's keys winning. An email after a goal on
  *Order paid* can read `{{order.total}}` even though the run began on *Contact is created*.

## Many contacts at once

If your plugin can raise the same event for many contacts in one call, give a `bulk` hook
beside `hook`. It passes an array of contact ids where `hook` passes what `contact` resolves,
and the other arguments unchanged:

```php
'hook' => 'acme/member_upgraded',     // do_action('acme/member_upgraded', $member, $level)
'bulk' => 'acme/members_upgraded',    // do_action('acme/members_upgraded', $contactIds, $level)
```

On the bulk path `contact` is not called, `context` and `matches` are called once for the
whole set, and the contacts enter in one insert — tagging 10,000 contacts costs the same
handful of queries as tagging three. Because a single `true` cannot narrow a set, a trigger
whose answer differs per contact also gives `among`.

`bulk` must be a string, needs `hook`, and must name a different hook — otherwise the trigger
is rejected.

The core tag and list triggers use this: they listen on
`marker_crm/tag_added_to_contact` and `marker_crm/tag_added_to_contacts` (and the list and
removal pairs).

## Creating the contact

Some events reach people who are not contacts yet, like a new user registering. A trigger may
give `contact` that returns `null` and a `create` callable. Marker CRM checks `matches` first
and only then calls `create`, once per listening automation, so an event the settings turn
away never makes a contact. `create` gets that automation's settings, so it can honour a
choice such as "new contacts join as".

## Availability

`available` says whether the trigger works right now — the plugin it needs is active, a setting
is on:

```php
'available' => fn () => class_exists('WooCommerce'),
```

It runs on every request, so it must be cheap: a `class_exists()` or a constant, never an
HTTP call or a query. One that throws counts as unavailable.

An unavailable trigger stays registered. It is not heard, it is left out of the pickers, and
an automation using it is listed as unavailable and cannot be turned on until it is back.
Saving such an automation keeps the trigger exactly as stored, so deactivating the other
plugin for an update loses nothing.

## When a trigger is rejected

Each trigger is checked once per request. It is skipped, with a `_doing_it_wrong()` notice
naming it, when:

- its key is not lowercase letters, numbers, dashes and underscores;
- it is not an array;
- `contact`, `create`, `matches`, `among`, `met`, `context` or `sanitize` is given but not
  callable;
- `available` is neither a bool nor callable;
- it has `hook` but no `contact`;
- `bulk` is not a string, has no `hook`, or names the same hook.

Every other trigger still loads.

## Changing a core trigger

Core triggers are registered at priority 5. An add-on at the default priority 10 sees them,
and may change or `unset()` one like any other array entry.

## Icons

`activity` `bell` `building` `cake` `calendar` `check-circle` `clock` `credit-card` `database`
`edit` `eye` `file-text` `filter` `flag` `gift` `git-branch` `globe` `heart` `hourglass` `key`
`link` `list` `list-checks` `log-in` `log-out` `mail` `mail-check` `mail-x` `mails` `message-square`
`mouse-pointer-click` `package` `pencil` `phone` `play` `repeat` `send` `shield`
`shopping-cart` `sliders-horizontal` `split` `star` `tag` `timer` `trash` `trophy` `user`
`user-plus` `users` `webhook` `x-circle` `zap`
