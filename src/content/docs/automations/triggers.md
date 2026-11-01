---
title: Triggers
description: What starts an automation, how to narrow it with Only if rules, what happens when someone triggers it twice, and every trigger Marker CRM offers.
sidebar:
  order: 3
---

The trigger is the event that puts a contact into an automation. Each automation has one,
shown at the top of the canvas. When the event happens to a contact and the automation is
**Active**, they enter and start at the first step.

![The trigger panel for Tag is added, with the Lead tag chosen and an Only if rule for contacts in the United States](/images/placeholder.svg)

## Choosing and changing the trigger

A new automation from scratch asks for its trigger straight away. To change it later, click
the trigger card and then **Change** in the panel. You can change the trigger of a live
automation too; the change waits in its draft until you publish (see
[Going live and editing](/automations/going-live/)).

Most triggers have settings of their own — which tags, which emails, which roles. A trigger
whose required settings are empty shows **The trigger still needs setting up** on its card,
and the automation cannot be turned on until you fill them in.

## Only if

Below the trigger's settings, **Only if** narrows who gets in. Click **Add rules** and build
rules the same way you build a [segment](/contacts/segments/): contact fields, tags and lists,
email activity, WordPress role, company, and whether they have been in other automations.

When the trigger fires, the rules are checked against the contact at that moment. Anyone who
doesn't match is passed over — nothing happens to them, and they are not counted as
entering. **Remove rules** clears them.

:::note
A contact sent in by another automation's **Start another automation** step, or added by hand
from the report, does not go through the **Only if** rules. Being sent is the reason they
enter. The re-entry setting still applies.
:::

## If someone triggers it again

What happens when the trigger fires for someone who has already been through the automation,
or is still in it? Set this in **Settings** → **If someone triggers it again**:

| Option | What happens |
|---|---|
| **Skip them** | Each contact goes through once, ever. This is the default. |
| **Let them go through it again once they finish** | They can enter again, but only after their last run has ended. Nobody is in it twice at once. |
| **Let them go through it again after** *N* **days** | They can enter again once that many days have passed since they last entered. |
| **Start them over from the first step** | If they are still inside, that run is ended and a fresh one starts at the top. |

The same setting applies when you add contacts by hand, and when another automation starts
this one. If the same trigger fires twice for one contact at the same moment — a double form
submission, say — only one run starts.

:::caution[A date on the contact needs re-entry to repeat]
**A date on the contact** fires every year, but with **Skip them** each contact only enters
the first time. The checklist warns about this. For a yearly greeting, choose **Let them go
through it again once they finish**.
:::

## Every trigger

The trigger picker groups triggers by where they come from. **CRM** holds Marker CRM's own,
**WordPress** the ones about WordPress users, and an add-on or integration adds its own entry
on the rail.

### Contacts

| Trigger | Starts when | Settings |
|---|---|---|
| **Tag is added** | One of the chosen tags is added to a contact. | **Tags**; **When**: **Any of them is added**, or **They have all of them** (starts when the last missing one arrives). |
| **Tag is removed** | One of the chosen tags is taken off a contact. | **Tags**; **When**: **Any of them is removed**, or **They have none left**. |
| **Added to a list** | A contact joins one of the chosen lists. | **Lists**; **When**, as for tags. |
| **Removed from a list** | A contact leaves one of the chosen lists. | **Lists**; **When**, as for tags. |
| **Contact is created** | A new contact is added, however they arrive. | None. |
| **Confirms their subscription** | A contact confirms their email subscription. | None. |
| **Unsubscribes** | A contact stops getting email. | **Because they**: **Unsubscribed** (the default), **Bounced**, **Reported spam**. |
| **A date on the contact** | Each year on a date the contact carries. | **Date field** (**Date of birth** or any custom field of type date), **Days before or after** (a minus sign means before, like -3), **At** (09:00 by default). |
| **Clicks an action link** | A contact clicks one of the chosen [action links](/settings/action-links/), in an email or on a page. | **Action links**. A click counts when the link was in one of your emails, or the contact is signed in. |

Some details worth knowing:

- A tag or list the contact already has starts nothing. Adding two of the chosen tags in one
  go starts one run, not two. Deleting a tag removes it from everyone silently — nobody
  counts as having had it removed.
- **Contact is created** fires after the new contact's tags, lists and fields are saved, so
  **Only if** rules can check them. Updating a contact never fires it.
- **Unsubscribes** only listens for **Bounced** and **Reported spam** when you tick them, so
  a goodbye email is never sent to an address that no longer works.
- **A date on the contact** is checked once a day. A contact without that date is skipped.
  Someone born on 29 February is counted on the 28th in other years.
- Tagging or listing many contacts at once from the Contacts list starts the automation for
  each of them. An [import](/contacts/import/) doesn't start automations unless you ask it to.

### Email

These appear only while tracking is on: **Track opens** and **Track clicks** under
[Settings → Email](/settings/email/). Turn tracking off and an automation already using them
is listed as unavailable.

| Trigger | Starts when | Settings |
|---|---|---|
| **Opens an email** | A contact opens an email. | **Any of these emails** — campaigns, and emails in automations (leave empty for any); **Ignore automated opens** (on by default). |
| **Clicks a link in an email** | A contact clicks a link in an email. | **Any of these emails**; **Only links containing**; **Ignore automated clicks** (on by default). |

Mail security scanners click every link in an email as it arrives, and Apple Mail fetches
every email's images whether or not anyone reads it. **Ignore automated opens** and **Ignore
automated clicks** leave those out, so a "clicked, tell sales" automation doesn't fire for
every business address. Leave them on unless you have a reason not to.

### Companies

Shown only while the companies module is on.

| Trigger | Starts when | Settings |
|---|---|---|
| **Joins a company** | A contact is added to a company. | **Any of these companies** (leave empty for any). |
| **Leaves a company** | A contact is removed from a company. | **Any of these companies**. |

Re-linking someone who is already in the company starts nothing. Deleting a company starts
nothing either.

### Automations

| Trigger | Starts when | Settings |
|---|---|---|
| **Finishes an automation** | A contact comes to the end of one of the chosen automations. | **Automations**; **When they**: **Reach the end** (the default), and optionally **Leave early, by a leave rule**. |
| **Finishes a sequence** | A contact has been sent every email in one of the chosen [sequences](/emails/sequences/). | **Sequences**. |

A contact who was taken out by hand, or whose run failed, does not count as finishing. An
automation can't start itself through a chain of others: if A starts B and B would start A
again, the second start is refused.

### WordPress

| Trigger | Starts when | Settings |
|---|---|---|
| **New user signs up** | Someone registers a WordPress account. | **Who**: **People who sign up themselves** (default) or **Anyone who gets an account**; **Only these roles**; **New contacts join as**: **Transactional** (default), **Pending — send a confirmation email**, or **Subscribed**; **If they are already a contact**: **Update them and start** or **Skip them**. |
| **User logs in** | A WordPress user signs in. | **Which logins**: **Every login**, **Their first login**, or **After being away** (with **Days away**, 30 by default); **Only these roles**; **If they are not a contact yet**: **Do nothing** (default), or add them as **Transactional**, **Pending** or **Subscribed**. |

**New user signs up** creates a contact for a newcomer. With **People who sign up
themselves**, an account an admin creates — or one made from WP-CLI — does not start it, so
adding staff doesn't send them a welcome series.

**New contacts join as** is the only place a sign-up's email status is chosen. Someone who
was already in the CRM keeps the status they had.

:::caution[Signing up is not consent to marketing]
Choose **Subscribed** only when your registration form asked for consent. Otherwise new users
join as **Transactional**, and a **Marketing** email in the automation skips them — use an
**Account** email for anything about their account.
:::

**Their first login** only counts accounts opened after Marker CRM started watching logins,
so people with older accounts don't get a welcome on their next visit.

## Triggers as goals and waits

Most triggers can also be used part-way through a flow: as a **Goal**, as the event in
**Wait for an event**, or as a reason to **Stop early**. See
[Actions, waits and paths](/automations/steps/).
