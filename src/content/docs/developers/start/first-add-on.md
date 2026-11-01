---
title: Your first add-on
description: Build a small WordPress plugin that adds one automation trigger and one automation action to Marker CRM.
sidebar:
  order: 1
---

This page builds **Acme Rewards**, a plugin that tells Marker CRM when a member reaches a
reward level, and gives automations a step that grants them points. When you are done, a
site owner can build "When a member reaches Gold → wait 1 day → grant 100 points → send an
email" without writing any code.

You need a WordPress site with Marker CRM active.

## 1. Create the plugin

Make a folder `wp-content/plugins/acme-rewards/` with one file, `acme-rewards.php`:

```php
<?php
/**
 * Plugin Name: Acme Rewards for Marker CRM
 * Description: Reward levels and points, as Marker CRM automation steps.
 * Version: 1.0.0
 * Requires PHP: 8.0
 * Text Domain: acme-rewards
 */

defined('ABSPATH') || exit;

use MarkerCRM\App\Models\Contact;
use MarkerCRM\App\Services\Automation\RunContext;
use MarkerCRM\App\Services\Automation\StepResult;
use MarkerCRM\App\Services\Contact\ContactService;

add_action('marker_crm/loaded', function () {
    add_filter('marker_crm/automation_triggers', 'acme_rewards_triggers');
    add_filter('marker_crm/automation_actions', 'acme_rewards_actions');
});
```

Everything is registered inside `marker_crm/loaded`, so if Marker CRM is switched off the
plugin quietly does nothing. The `use` lines do not load anything by themselves, so they are
safe even then.

## 2. Register a trigger

A trigger is an entry in the `marker_crm/automation_triggers` array, keyed by a name made of
lowercase letters, numbers, dashes and underscores. Prefix it with your plugin's slug so it
cannot collide with anyone else's.

```php
function acme_rewards_triggers(array $triggers): array
{
    $triggers['acme_level_reached'] = [
        'label'       => __('Member reaches a level', 'acme-rewards'),
        'description' => __('Runs when a member reaches the chosen reward level.', 'acme-rewards'),
        'group'       => __('Rewards', 'acme-rewards'),
        'integration' => ['key' => 'acme-rewards', 'label' => 'Acme Rewards'],
        'icon'        => 'trophy',
        'fields'      => [[
            'key'      => 'level',
            'label'    => __('Level', 'acme-rewards'),
            'type'     => 'select',
            'required' => true,
            'options'  => [
                ['value' => 'silver', 'label' => __('Silver', 'acme-rewards')],
                ['value' => 'gold', 'label' => __('Gold', 'acme-rewards')],
            ],
        ]],
        'matches'     => fn (array $settings, array $args, array $context) => ($context['level'] ?? '') === ($settings['level'] ?? ''),
    ];

    return $triggers;
}
```

- `fields` describes the settings panel. The automation builder draws it for you — an add-on
  ships no JavaScript. See [Settings fields](/developers/automations/fields/).
- `matches` decides whether a particular automation should start. `$settings` is what the site
  owner chose in that automation; `$context` is what you pass when you fire the trigger.
- `integration` puts your trigger under its own entry in the trigger picker. Leave it out and
  the trigger is filed under **Other**.

## 3. Fire the trigger

When a member reaches a level in your own code, find their contact and fire the trigger by
name through `marker_crm/trigger`:

```php
function acme_rewards_level_reached(int $userId, string $level): void
{
    $user = get_userdata($userId);

    if (!$user || !did_action('marker_crm/loaded')) {
        return;
    }

    $contact = ContactService::matching([['channel' => 'email', 'address' => $user->user_email]]);

    if ($contact) {
        do_action('marker_crm/trigger', 'acme_level_reached', $contact, ['level' => $level]);
    }
}
```

The `did_action()` check keeps the function safe to call while Marker CRM is inactive, when
`ContactService` does not exist. `marker_crm/trigger` takes the trigger name, a `Contact` (or a contact id), and a **context**
array. The context is stored on every run the trigger starts, so later steps and email merge
tags can read it. Keep it flat and scalar — strings, numbers, ids — never objects.

:::note
This example only reaches people who are already contacts. To create a contact when someone
new reaches a level, call `ContactService::createOrUpdate()` and give them the
`transactional` status — reaching a level is not consent to marketing email.
[Concepts](/developers/start/concepts/#subscriptions-and-consent) explains why.
:::

## 4. Register an action

An action is an entry in `marker_crm/automation_actions` with a `run` callable:

```php
function acme_rewards_actions(array $actions): array
{
    $actions['acme_grant_points'] = [
        'label'       => __('Grant reward points', 'acme-rewards'),
        'description' => __('Adds points to the member’s account.', 'acme-rewards'),
        'group'       => __('Rewards', 'acme-rewards'),
        'integration' => ['key' => 'acme-rewards', 'label' => 'Acme Rewards'],
        'icon'        => 'gift',
        'fields'      => [[
            'key'      => 'points',
            'label'    => __('Points', 'acme-rewards'),
            'type'     => 'number',
            'default'  => 100,
            'required' => true,
        ]],
        'sanitize'    => fn (array $settings) => ['points' => min(10000, absint($settings['points'] ?? 0))],
        'run'         => 'acme_rewards_grant_points',
    ];

    return $actions;
}

function acme_rewards_grant_points(Contact $contact, array $settings, RunContext $run): StepResult
{
    $userId = (int) $contact->user_id;

    if (!$userId) {
        return StepResult::skipped(__('The contact has no WordPress account to add points to.', 'acme-rewards'));
    }

    $points = (int) get_user_meta($userId, 'acme_points', true);
    update_user_meta($userId, 'acme_points', $points + (int) $settings['points']);

    return StepResult::done();
}
```

- `run` receives the contact, the step's saved settings and a `RunContext`. Read the trigger's
  context with `$run->get('level')`.
- It returns a `StepResult` — or nothing, which means done. `skipped()` moves on and records
  why; `fail()` retries after 1 and then 5 minutes, and the third failure marks the run
  **Failed**. See [Actions](/developers/automations/actions/).
- `sanitize` owns the step's settings when you give it. Without it, every value is cleaned as
  plain text.

## 5. Try it

1. Activate **Acme Rewards for Marker CRM** under **Plugins**.
2. In Marker CRM, open **Automations**, create an automation and choose the trigger. Your
   plugin appears in the picker's rail as **Acme Rewards**, with **Member reaches a level**
   inside it.
3. Choose **Gold**, add the **Grant reward points** step, and turn the automation on.
4. Call `acme_rewards_level_reached($userId, 'gold')` for a user who is a contact — from
   WP-CLI, `wp eval 'acme_rewards_level_reached(1, "gold");'` works.
5. Open the automation's report. The contact is listed, and once the queue has run, the user
   has 100 more `acme_points`.

## When it does not work

- **The trigger is not in the picker.** Check your debug log for a `_doing_it_wrong` notice
  naming your trigger: an entry with a bad name or a callable that is not callable is skipped,
  and the notice says why.
- **Nobody enters.** The automation must be on, the contact must exist, and `matches` must
  return `true` for the settings that automation saved.
- **Entered, but the step never runs.** Actions run on Marker CRM's queue. Check that it is
  running in **Settings → Tools**.
- **The run is Failed.** The run's history in the automation report shows the reason your
  action gave, or the exception it threw.

## Next

- [Triggers](/developers/automations/triggers/) — listening to a WordPress hook instead of
  firing by name, bulk events, creating contacts.
- [Goals and events](/developers/automations/goals-and-events/) — add `met` so your trigger
  can also be a goal.
