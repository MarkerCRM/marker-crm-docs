---
title: Concepts
description: Contacts, subscriptions and consent, tags and lists, automations, runs and the queue — what an add-on author needs to know.
sidebar:
  order: 2
---

This page covers only the parts of Marker CRM's model that an add-on touches. Class names are
under the `MarkerCRM\App\` namespace.

## Contacts

A contact (`Models\Contact`, table `{prefix}marker_crm_contacts`) is a person. It holds
names, address, `date_of_birth`, `contact_type` (`lead` or `customer` by default), `owner_id`,
and `user_id` when the person has a WordPress account.

A contact does **not** hold an email address. Addresses live on its subscriptions, below.
Read one with `$contact->subscription('email')?->address`.

### Creating and updating contacts

Everything that creates or changes a contact — the REST API, imports, forms, webhooks,
automations — goes through one method, and your add-on should too:

```php
use MarkerCRM\App\Services\Contact\ContactService;

$contact = ContactService::createOrUpdate([
    'first_name'    => 'Ada',
    'last_name'     => 'Lovelace',
    'subscriptions' => [
        ['channel' => 'email', 'address' => 'ada@example.com', 'status' => 'transactional'],
    ],
    'tags'          => [12, 14],          // term ids; replaces the contact's tags
    'custom'        => ['plan' => 'pro'], // custom field key => value
]);
```

- Pass `id` to update a known contact. Without `id`, a contact with the same address is found
  and updated rather than duplicated.
- A new contact needs an email address (unless `marker_crm/require_contact_email` returns
  `false`, when a phone number will do). A missing one throws
  `MarkerCRM\App\Exceptions\ValidationException`.
- `tags` and `lists` replace the whole set of that type. Leave the key out to leave them alone.
- It fires `marker_crm/contact_created` or `marker_crm/contact_updated` once the write is
  done — which is what starts the **Contact is created** trigger and every listener on it.

To look a contact up by address without creating one:

```php
$contact = ContactService::matching([['channel' => 'email', 'address' => $email]]);
```

### Extra data on a contact

Do not alter `marker_crm_contacts`. For a value the site owner should see and edit, use a
custom field (**Contacts → Custom fields**) and write it through `custom`. For data only your
add-on reads, keep your own table, keyed by `contact_id`.

## Subscriptions and consent

Each contact has one subscription per channel (`Models\ContactSubscription`): `email`, and
`sms`. A subscription holds the address, a status, and when and how consent was given
(`consent_at`, `consent_source`, `consent_ip`).

| Email status | Meaning | Marketing email | Account email |
|---|---|---|---|
| `subscribed` | Opted in | Yes | Yes |
| `pending` | Asked to confirm (double opt-in) | No | Yes |
| `transactional` | A customer or user who never opted in to marketing | No | Yes |
| `unsubscribed` | Opted out | No | No |
| `bounced` · `complained` · `spammed` | The address is gone, or they reported spam | No | No |

The contact's own `status` column is a summary of its subscriptions, kept in step by
`ContactService`. Never write it directly.

**Consent is never implied.** A purchase, a sign-up or a form submission without a consent box
is not permission to send marketing email. When your add-on creates a contact, give the email
subscription an explicit `transactional` status unless the person really opted in. If you
leave `status` empty, a new contact gets the site's default — `subscribed`, or `pending` when
double opt-in is on — which is wrong for a customer who only bought something.

To change consent after the fact, use `ContactService::unsubscribe($contact, ['reason' => '…'])`
and `ContactService::confirm($contact)`. Both fire their own events
(`marker_crm/contact_unsubscribed`, `marker_crm/contact_confirmed`).

## Tags and lists

Tags and lists are both **terms** (`Models\Term`), told apart by `type`. A contact holds them
through term relations.

- **Tags** are labels. Removing a tag deletes the relation.
- **Lists** are subscriptions. Leaving a list keeps the relation with `status: unsubscribed`,
  because it records that the person opted out of that list. The **Add to a list** action never
  re-adds someone who left.

Adding or removing a term fires `marker_crm/tag_added_to_contact`,
`marker_crm/contact_added_to_list` and their opposites, with `($contact, $term)`. Bulk changes
from the contacts table fire one plural hook per term instead, with an array of contact ids.
See [Hooks](/developers/reference/hooks/#tags-and-lists).

You can add your own kind of term. See [Term types](/developers/extending/term-types/).

## Automations

An automation (`Models\Automation`) has:

- **Triggers** — the events that let a contact in. Each saved trigger is `name`, `settings`
  (what the site owner chose in its fields) and `conditions` (the **Only if** rules).
- **Steps** — a tree (`Models\AutomationStep`, linked by `parent_id` and `branch`). A step is
  an action you or the core registered, or one of the flow steps the engine provides: waits,
  **Wait for an event**, **If / else**, **A/B split**, goals and **End the automation**.
- **A re-entry policy** — whether a contact may go through it again.
- **A status** — `draft`, `active` or `paused`. Only active automations listen to triggers.

### Runs

Each time a contact enters an automation, a **run** is created (`Models\AutomationSubscriber`,
one row per run). The run remembers which trigger started it and that trigger's context, in
`data.trigger` and `data.context`. Inside an action, `RunContext` reads them for you.

A run ends as `completed`, `left` (a goal or **Leave when** rule took them out), `cancelled`
or `failed`. Every step a run executes is logged once (`Models\AutomationStepRun`), so a step
that was already run is never repeated, even if the queue retries the job.

## The queue

Nothing in an automation runs in the request that triggered it. Entering only inserts the run
and wakes the queue; the queue then walks the run through its steps. That means:

- Your trigger's callables run in the request where your event happens, so they must be cheap.
- Your action's `run` executes later, in a queue worker, with no logged-in user and no
  request to read from. Keep it to a few seconds. For slower work, hand it to a background
  job of your own and return `StepResult::done()`.
- If the queue is not running, nothing moves. **Settings → Tools** shows its state.

The queue runs on WP-Cron every minute (`marker_crm/run_queue`), and Marker CRM fires
`marker_crm/tick` on the same clock. A listener on `marker_crm/tick` is the place to check
whether something of yours is due, rather than scheduling a cron event of your own.

## Modules

Some features can be switched off, such as companies. Ask before you rely on one:

```php
use MarkerCRM\App\Services\ModuleService;

if (ModuleService::isEnabled('companies')) {
    // …
}
```

`marker_crm/module_enabled` and `marker_crm/module_disabled` fire with the module's slug when
someone switches one.
