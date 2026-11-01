---
title: Developers
description: What you can extend in Marker CRM, when your add-on's code runs, and which hooks are a promise.
---

Marker CRM is built to be extended from the outside. An add-on is an ordinary WordPress
plugin: it waits for Marker CRM to load, then registers what it brings through filters. You
never edit a file of ours or alter one of our tables.

## What you can extend

| You want to | Use | Read |
|---|---|---|
| Start an automation when something happens in your plugin | `marker_crm/automation_triggers` | [Triggers](/developers/automations/triggers/) |
| Add a step an automation can run | `marker_crm/automation_actions` | [Actions](/developers/automations/actions/) |
| Give a step or trigger a settings panel, with no JavaScript | the `fields` schema | [Settings fields](/developers/automations/fields/) |
| Let automations wait for, jump to or stop on your event | `met` on your trigger | [Goals and events](/developers/automations/goals-and-events/) |
| Add a `{{token}}` to emails | `marker_crm/merge_tags` | [Merge tags](/developers/extending/merge-tags/) |
| Add a new kind of named group beside tags and lists | `marker_crm/term_types` | [Term types](/developers/extending/term-types/) |
| Add a rule to segments and automation conditions | `marker_crm/segment_fields` | [Segment fields](/developers/extending/segment-fields/) |
| React to contacts, emails, campaigns and runs | actions such as `marker_crm/contact_created` | [Hooks](/developers/reference/hooks/) |
| Read or write CRM data from JavaScript in the admin | the `markercrm/v2` REST API | [REST API](/developers/reference/rest-api/) |

Everything an add-on registers shows up next to the core features: a trigger you register is
in the same picker as *Tag is added*, and its settings panel is drawn by the same renderer.

## When your code runs

Register everything from `marker_crm/loaded`:

```php
add_action('marker_crm/loaded', function ($app) {
    add_filter('marker_crm/automation_triggers', 'acme_triggers');
    add_filter('marker_crm/automation_actions', 'acme_actions');
});
```

`marker_crm/loaded` fires on `plugins_loaded`, after Marker CRM has set itself up and before
`init`. Your filters are in place before anything reads them.

- If Marker CRM is not active, `marker_crm/loaded` never fires and your add-on does nothing.
  You need no `class_exists()` checks around your registrations.
- Do not hook `plugins_loaded` yourself and assume Marker CRM is there. Plugin load order is
  not guaranteed.
- Automation triggers are attached to their hooks at `init` (priority 20) and again at
  `wp_loaded`, so a trigger registered a little late is still heard. A hook that fires
  *during* `init` before priority 20 would be missed.

### Checking the version

The plugin version is the constant `MARKER_CRM_VERSION`. The automation block contract has its
own version, `MarkerCRM\App\Services\Automation\AutomationRegistry::VERSION` (currently
`1.0`), raised only when the shape of a trigger or action changes.

```php
add_action('marker_crm/loaded', function () {
    if (version_compare(MARKER_CRM_VERSION, '1.0.0', '<')) {
        return;
    }

    // register here
});
```

## What we promise

- **Hook names and signatures are a promise.** Once a `marker_crm/` hook has shipped, its name
  and the parameters it passes do not change. A new parameter may be appended to the end —
  that is not a breaking change. Renaming or removing one waits for a major version.
- **The registry shapes are a promise**: the trigger and action arrays, the field schema,
  `StepResult`, and the `marker_crm/loaded` hook and its timing.
- **Not a promise**: our Vue components and CSS classes, the internals of service classes
  beyond the methods these pages name, and any REST response field that is not documented.

## Ground rules

- **One write path for contacts.** Anything that creates or changes a contact goes through
  `ContactService::createOrUpdate()`. It de-duplicates by address, fires the events
  automations listen to, and keeps the contact's status in step with its subscriptions.
- **Consent is not implied.** A purchase or an account is not permission to send marketing
  email. Give a contact you create the `transactional` status unless the person actually
  opted in. See [Concepts](/developers/start/concepts/).
- **Never break the host.** Wrap your own hook callbacks so an exception in your add-on
  cannot stop a checkout or a login.
- **Never alter our tables.** Keep your own data in your own tables or in meta.

## Where to start

1. [Your first add-on](/developers/start/first-add-on/) — a complete plugin with one trigger
   and one action.
2. [Concepts](/developers/start/concepts/) — contacts, subscriptions, tags and lists, runs and
   the queue, as an add-on sees them.
3. [Hooks](/developers/reference/hooks/) — every action and filter Marker CRM fires.
