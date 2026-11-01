---
title: Going live and editing
description: Turn an automation on through the review, publish changes to a live automation safely, and know what happens to contacts already inside when you edit, pause or delete steps.
sidebar:
  order: 5
---

An automation does nothing until it is **Active**. Going live always goes through a review, so
you never switch on something half-built. Once it is live, your edits wait in a draft until
you publish them.

## The review

Click **Review** at the top right of the builder, or choose **Active** from the state menu
beside the title. The review lists everything the builder found:

- **Red items** must be fixed before the automation can go live. The slider reads **Fix the
  red items to go live** until they are.
- **Amber items** are warnings. You can go live with them, but read them first.

Click **Fix** or **Show** beside an item to jump to the step or setting it is about. When
nothing is red, drag **Slide to activate** to the end. The automation turns on and starts
listening for its trigger.

![The review popover, with one red item for an email that has no content and the Slide to activate control below](/images/placeholder.svg)

The same list is in the overview panel as **Checklist**, so you can watch it while you build.

### What has to be fixed

| Item | Why |
|---|---|
| **Choose what starts this automation** | There is no trigger. |
| **The trigger still needs setting up** | A required trigger setting is empty, like the tags for **Tag is added**. |
| **This leave event still needs setting up** | An event under **Stop early** is missing a setting. |
| **Add at least one step before activating** | The flow is empty. |
| **Needs setting up** | A step's required setting is empty. |
| **Needs an event** / **The event still needs setting up** | A goal or **Wait for an event** has no event, or the event is missing a setting. |
| **The email has no content yet** | An email has a subject but nothing written. |
| **Pick the date this email goes out** / **Its sending hours end before they start** | An email's **Send** timing is incomplete. |
| **A path has no rules** | An **If / else** path other than **Everyone else** has no rules. |
| **The weights must add up to 100%** | An **A/B split** doesn't total 100. |

### Warnings worth reading

- **The first email sends immediately** — add a wait first if the trigger can fire while
  someone is still filling in a form.
- **Contacts can enter more than once** — re-entry is set to let people through again.
- **Runs once per contact, not every year** — **A date on the contact** with re-entry set to
  **Skip them**.
- **New sign-ups have not subscribed to marketing, so they skip this email** — a **Marketing**
  email after **New user signs up**, where new users don't join as **Subscribed**. Make it an
  **Account** email if it is about their account.
- **This date has passed, so contacts will not wait here** — a wait until a date already gone.
- **Nothing happens on this path; contacts go straight on to the next step.**

## What the server refuses

The same checks run on the server whenever an automation is turned on — from the builder, from
**Activate** on the Automations list, or from a bulk action. If something required is still
empty, the automation stays off and you see a message naming what to finish, for example:

- *Choose what starts this automation before turning it on.*
- *Add at least one step before turning it on.*
- *Finish setting these up before turning it on: Add a tag, Send an email.*
- *It uses what is not available right now: …* — a trigger or step from a plugin that is
  deactivated, or a feature that is turned off, such as click tracking.

If a step becomes unfinished after the automation is live — the tag it adds is deleted, say —
contacts who reach it have that step fail. Check the [report](/automations/reports/) for
**Failed** runs.

## Editing a live automation

Edit a live automation the same way as a draft. The difference is where your changes go: they
are saved to a **draft** of the automation, and contacts keep following the live version until
you publish. The saved label reads **Draft saved**, and a banner appears:

> **This automation has unpublished changes.** Contacts follow the live version until you
> publish. Anyone already inside picks up from wherever the new flow leads.

- **Publish changes** opens the review. Drag **Slide to publish** to make the draft live.
- **Discard** throws away every change since the last publish, and the builder goes back to
  the live version.

You can change anything in a draft, including the trigger. Publishing is all or nothing: if
the result couldn't run — a required setting left empty — nothing is published and the live
automation stays exactly as it was.

A draft or paused automation saves its edits directly, so they apply as soon as they are
saved. (Pause a live automation that has unpublished changes and the draft stays until you
publish or discard it.) When contacts are inside a paused automation, a banner says how many
and reminds you that your changes apply to them too.

![The builder with the unpublished-changes banner, showing the Discard and Publish changes buttons](/images/placeholder.svg)

## What happens to contacts already inside

When you publish (or save a paused automation), people part-way through are moved onto the new
flow. Nobody goes back to the start, and nobody repeats a step they have already had.

- **A step you deleted** — anyone waiting on it moves on to the next step that still exists.
  Anyone inside a path you deleted moves on to the step after that path's split. If nothing
  follows, their run is completed.
- **A wait whose length changed** — they are rescheduled, counting from when they arrived at
  the wait, not from now. Shortening a 7-day wait to 2 days releases anyone who has already
  waited 2 days.
- **A wait whose date or day changed** — they wait for the new moment.
- **A changed time limit on Wait for an event** — rescheduled from when they arrived,
  like a wait.
- **An email step you deleted** — emails it queued but hadn't sent yet are cancelled. Emails
  already sent stay in the [email log](/logs/email/).
- **A goal switched from Waits here until they do it to Carries on** — anyone waiting at it is
  released.
- **New steps** — contacts reach them when the flow leads them there. A step added above where
  someone already is never runs for them.

:::note
The Delete step confirmation tells you how many contacts are waiting on that step, so you know
who will move on before you delete it.
:::

## Pausing

Choose **Paused** from the state menu, or **Pause** on the Automations list. While paused:

- Nobody new enters, whatever the trigger does.
- Anyone inside stays where they are. Waits keep counting, but nobody moves on.
- You can't add contacts by hand.

Set it back to **Active** (through the review) and everyone carries on. Anyone whose wait ended
while it was paused moves on straight away. Setting an automation back to **Draft** has the
same effect as pausing it.

## When two people edit at once

The builder saves as you go. If someone else saved the same automation after you opened it,
your next save is refused rather than overwriting their work. You see:

> Somebody else saved this automation since you opened it. Reload the page to see their
> changes before making yours.

The label beside the title reads **Not saved**, and the builder stops saving. Reload the page
to pick up their changes, then make yours again. Anything you changed after the refusal is not
kept.
