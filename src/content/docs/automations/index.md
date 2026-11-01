---
title: Automations
description: What an automation is, how to start one from scratch or from a recipe, and how to manage them from the Automations list.
sidebar:
  order: 1
---

An automation reacts to one contact at a time. Something happens — a tag is added, someone
joins a list, a WordPress user signs up — and that contact starts down a flow of steps you
drew: send an email, wait three days, check whether they clicked, tag them, and so on. Each
contact moves through it on their own clock.

Every automation has three parts:

- **One trigger** — what starts it. See [Triggers](/automations/triggers/).
- **Steps** — actions, waits, goals and paths, drawn top to bottom on a canvas. See
  [Actions, waits and paths](/automations/steps/).
- **Settings** — what happens if someone triggers it again, and what takes them out early.

You build all three in [the builder](/automations/builder/).

![The Automations list, with each automation's trigger, status and how many contacts are in progress](/images/placeholder.svg)

## Start a new automation

Go to **Automations** and click **New automation**. The **New automation** page asks
**How do you want to start?**

### Start from scratch

Click **Start from scratch** and choose a trigger in **What starts this automation?** The
picker opens on **CRM** triggers; use the rail on the left to see **All**, **WordPress**, or
any integration that adds its own triggers, or search with **Search triggers…**.

The automation is created as a draft, named after the trigger and today's date, and the
builder opens with the trigger selected so you can set it up. Click the title at the top to
rename it.

### Start from a recipe

Under **Or start from a recipe**, pick a ready-made flow. Each card shows its trigger and
how many steps it has. The recipe is created as a draft with its emails already written, and
the builder opens on it. Anything only you can decide — which list, which tag — is left
empty and shows up in the builder's checklist as something to fix.

| Recipe | Group | What it does |
|---|---|---|
| **Welcome series** | Onboarding | Three emails over a week for everyone who joins a list. Trigger: **Added to a list**. Email, wait 2 days, email, wait 4 days, email. |
| **Thanks for confirming** | Onboarding | A welcome the moment someone confirms their subscription. Trigger: **Confirms their subscription**. |
| **New member onboarding** | Onboarding | Tag new WordPress users and welcome them to their account. Trigger: **New user signs up**. |
| **Follow up on a tag** | Nurture | Two emails a few days apart when a contact gets a tag. Trigger: **Tag is added**. Email, wait 3 days, email. |
| **Follow up on a click** | Nurture | Tag contacts who click a link in an email, and follow up a day later. Trigger: **Clicks a link in an email**. |
| **Birthday greeting** | Engagement | An email on each contact's birthday. Trigger: **A date on the contact**, at 09:00. |

A recipe only appears when everything it uses is available on your site. **Follow up on a
click** needs click tracking on, for example — turn on **Track clicks** under
[Settings → Email defaults](/settings/email/) if you don't see it.

:::caution[Check the email kind on sign-up recipes]
Recipe emails are **Marketing** emails, which only reach subscribed contacts. In **New member
onboarding**, new users join as **Transactional** by default, so the welcome email would
reach none of them. The checklist warns you; change the email to **Account** if it is about
their account.
:::

:::tip[Birthday greetings run once by default]
A new automation lets each contact through once. For a birthday greeting that should go out
every year, open **Settings** in the builder and set **If someone triggers it again** to
**Let them go through it again once they finish**.
:::

## Draft, Active and Paused

An automation is always in one of three states. You change it from the state menu beside the
title in the builder, or from the Automations list.

| State | What it means |
|---|---|
| **Draft** | Still being built. Nobody starts it. |
| **Active** | Contacts start it when the trigger fires. |
| **Paused** | Nobody starts it; anyone inside waits where they are. |

Only an **Active** automation moves contacts along. If you pause one, or set it back to
draft, the people already inside stay on the step they reached and carry on when you turn it
on again. Turning an automation on always goes through a check first — see
[Going live and editing](/automations/going-live/).

## The Automations list

**Automations** lists every automation with its trigger under its name. Click a row to open
it: a draft opens in the builder, anything else opens its [report](/automations/reports/).

- **Status pills** — **All**, **Draft**, **Active** and **Paused**, each with a count.
- **Search automations…** searches by name.
- **Tags** and **Lists** filters find the automations that use a tag or list anywhere — in
  the trigger, a step, a goal, or a rule.
- **Columns** — **Name**, **Status**, **In progress**, **Completed** and **Last entry** are
  shown by default. **Entered**, **Opened**, **Clicked** and **Updated** can be turned on
  from the column picker.

### Row actions

The menu at the end of each row has **Edit**, **View report** (not for drafts),
**Duplicate**, **Activate** or **Pause**, and **Delete**.

- **Duplicate** makes a draft copy named "… (copy)" with the same trigger, steps and settings,
  and opens it in the builder.
- **Activate** runs the same check the builder does. If something is unfinished, you see a
  message naming it — for example *Finish setting these up before turning it on: Add a tag.*
- **Delete** removes the steps and report. Anyone part-way through stops where they are and
  never receives the rest. This cannot be undone.

### Bulk actions

Tick several rows to **Activate**, **Pause** or delete them together. When activating, any
automation that is not ready is left as it was, and the message says how many could not be
activated and why.

## Where to go next

- [The builder](/automations/builder/) — the canvas, the panels and the keyboard shortcuts.
- [Triggers](/automations/triggers/) — every trigger, **Only if** rules, and re-entry.
- [Actions, waits and paths](/automations/steps/) — every step you can add, and **Stop
  early**.
- [Going live and editing](/automations/going-live/) — the review, publishing changes to a
  live automation, and what happens to contacts already inside.
- [Reports and runs](/automations/reports/) — the numbers, each contact's history, and
  adding contacts by hand.
