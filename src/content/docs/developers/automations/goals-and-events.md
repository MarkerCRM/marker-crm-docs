---
title: Goals and events
description: How your trigger also becomes a goal, a wait-for-event and a leave-when event, and what met and matches must answer.
sidebar:
  order: 4
---

Every trigger you register is also an **event** that contacts already inside an automation
can react to. You do not register anything else: the same `matches`, `met` and `context`
callables serve all of these.

| Where | What the event does |
|---|---|
| **Goal** step | A contact anywhere *before* the goal on their own path jumps to it when the event happens to them, skipping what lay between |
| **Wait for an event** step | Holds the contact until the event happens or a time limit runs out, whichever is first |
| **Leave when** (automation settings) | Ends the contact's run as *left* when the event happens |
| **Let others join here** (on a goal) | A contact who is not in the automation joins at the goal and gets only the steps after it |

## `met` makes a trigger a goal

The builder offers a trigger as a **goal** only when it has a `met` callable. A goal is a
checkpoint, so it has to be able to answer "has this already happened to them?" An event that
cannot — *Contact is created*, *User logs in* — is a start, not a checkpoint.

```php
'met' => fn (Contact $contact, array $settings, string $since) => acme_bought_since($contact, $settings['product'] ?? 0, $since),
```

| Argument | |
|---|---|
| `$contact` | The contact the run is for |
| `$settings` | The settings the site owner chose for *this* goal or wait, in your trigger's fields |
| `$since` | When the run entered the automation, UTC, `Y-m-d H:i:s` |

Return `true` if the event has happened to this contact since `$since`. It is asked:

- when a run arrives at a **Wait for an event** on your event — if `true`, the contact moves on
  at once instead of waiting;
- when a run arrives at a goal set to **Waits here until they do it** — if `false`, the
  contact waits there until the event comes.

Any trigger, with or without `met`, can be chosen for **Wait for an event** and **Leave
when**. Without `met`, a wait always waits for the next time the event fires.

:::tip
`met` runs once per contact arriving, on the queue. Answer it with one indexed query — never
by loading everything the contact ever did.
:::

## `matches` answers for each listener

When your event fires for a contact, Marker CRM finds the runs that care about it — goals ahead
of them, waits they are held at, leave-when events — and asks your `matches` once per goal,
wait or leave-when, with **that step's** settings:

```php
'matches' => fn (array $settings, array $args, array $context) => empty($settings['product']) || (int) $settings['product'] === $context['product'],
```

When no active automation starts on your event and none waits for it, a fire costs nothing:
`contact` and `context` are not even called.

## What moves, and what does not

- **Only goals ahead.** A goal behind the contact, or on another path, moves nobody.
- **Not the run's own doing.** An event caused by an action inside the same run does not
  count as reaching a goal early — the run's own *Add to a list* is not the contact choosing
  to join.
- **Arriving without the event.** A contact who reaches an optional goal without having done
  it carries on, and is not counted as reaching it. If the event happens later while the run
  is still going, the goal counts then.
- **Context travels.** A run that moves because of your event — to a goal, or out of a wait —
  merges the event's context over its own, your keys winning. Later steps and merge tags read
  the newer values.
- **Many contacts at once.** An event on your `bulk` hook reaches runs too. Where `matches`
  cannot tell per contact, `among` is asked once per distinct setting.

## Firing an event without starting anything

There is no separate way to fire an event. `do_action('marker_crm/trigger', …)`, or your
trigger's `hook`, both start automations that begin with the trigger *and* reach runs already
waiting for it. An automation only starts for contacts when one of its triggers names your
event and it is active.

## Keep it honest

- Do not fire an event that did not happen to the contact, to push runs along. Goals are what
  the automation's report counts as success.
- If your plugin can be deactivated, give the trigger `available`. While it is unavailable,
  its event is not heard, and it is left out of the pickers. Goals and waits already saved on
  it are kept as stored.
