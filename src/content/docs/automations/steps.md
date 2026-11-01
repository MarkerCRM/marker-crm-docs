---
title: Actions, waits and paths
description: Every step you can add to an automation — actions, waits, goals, If / else and A/B split paths, ending early — and how to take contacts out with Stop early.
sidebar:
  order: 4
---

Steps are what happens to a contact after the trigger. Click any **+** on the canvas (or press
<kbd>B</kbd>) and **Add a step** opens in the right-hand panel. Its tabs are **All**,
**Actions**, **Goals** and **Conditions**; type in **Search steps — e.g. wait, tag, email**
to filter the tab you're on.

![The Add a step panel on the Actions tab, with Contact, Email and Timing sections](/images/placeholder.svg)

Every card on the canvas summarises what the step will do — *Wait 3 days*, *Tag is added —
Lead · within 3 days*, *VIP / Everyone else*, *50% / 50%* — so you can read the flow without
opening each one.

## Actions

Actions do something to or for the contact. On the **Actions** tab they are grouped into
**Contact**, **Email**, **Timing**, **Automation** and **WordPress & developer**, followed by
any integrations you have installed.

### Contact

| Action | What it does |
|---|---|
| **Add a tag** / **Remove a tag** | Puts the chosen tags on the contact, or takes them off. |
| **Add to a list** / **Remove from a list** | Adds the contact to the chosen lists, or takes them off. |
| **Change contact email status** | Sets **New status** to **Subscribed**, **Pending**, **Unsubscribed** or **Transactional**. |
| **Update contact fields** | Writes new values into one or more fields. Each row has **Field**, **How** and **New value**; **Add another field** adds a row. |
| **Add a note or activity** | Leaves a note, call or meeting on the contact's timeline: **Kind**, **Title** and **What it says**. |
| **Add to a company** / **Remove from a company** | Links the contact to a company (optionally **Make it their primary company**), or unlinks them. Only while the companies module is on. |

Some actions refuse on purpose, and the step is skipped with the reason in the contact's
history rather than failing:

- **Add to a list** never puts someone back on a list they unsubscribed from. It adds the
  other lists it names.
- **Change contact email status** never moves someone who unsubscribed, bounced or complained
  to anything but **Unsubscribed** — only the contact can bring themselves back. Choose
  **Subscribed** only when the trigger itself was their consent, like clicking an opt-in
  link; the change is recorded on their timeline.
- **Update contact fields** values can use merge tags, including `{{today}}` and `{{now}}`.
  A multi-choice field lets you replace, add to or remove from what is there; a number field
  lets you set, increase or decrease it.

### Email

| Action | What it does |
|---|---|
| **Send an email** | Sends an email you write in this step. |
| **Send a campaign's email** | Sends the email of an existing campaign, with that campaign's subject, content and sender. A contact who has already had that campaign is skipped. |
| **Add to a sequence** | Starts the contact on a [sequence](/emails/sequences/) from its first email. The sequence must be on. |
| **Take out of a sequence** | Stops the chosen sequences for this contact (leave empty for every sequence). |

For **Send an email**, click **Write the email** in the panel. The editor opens with the
envelope above the content:

- **From** — the site's sender, or tick **Use a different sender for this email**.
- **To** — **The contact** or **Other people**. Other people (a sales inbox, an account
  manager) get the email at once, without tracking or an unsubscribe link, and it ends with a
  link to the contact in the CRM.
- **Kind of email**, for the contact: **Marketing — subscribed contacts only**, or **Account —
  logins, receipts, onboarding**. An account email also reaches contacts who never subscribed
  or have yet to confirm. Never use it to promote anything. Nobody who unsubscribed gets
  either kind.
- **Subject** and **Preview text**.
- **Send** — **As soon as it's reached**, **Only within certain hours** (days and a time
  window), or **On a specific date**, with **Send right away** or **Skip this email** if that
  date has passed when the contact gets there. Times are in your site's timezone.

**Send a test** sends the email as it stands to one address. If that address belongs to a
contact, their details fill the merge tags.

### Automation

| Action | What it does |
|---|---|
| **Take them out of other automations** | Ends the contact's runs in the chosen automations (leave empty for every other automation). |
| **Start another automation** | Puts the contact into another automation at its first step. It has to be on, and its own re-entry setting decides whether they may start it again. |
| **End the automation** | Takes the contact out here. The card reads *Contacts stop here*, and they count as **Completed**. |

:::note[Automations can't send someone round in circles]
A contact is never sent back into an automation they came from. That holds whether one
automation starts another directly with **Start another automation**, or indirectly — say
automation A adds a tag that starts B, and B adds the tag that starts A. They go round once and
stop. A loop for itself is also stopped: an automation can't start itself.
:::

### WordPress & developer

| Action | What it does |
|---|---|
| **Create a WordPress user** | Gives the contact an account if they have none: **Role** (empty for the site's default), **Username** (made from their email if empty or taken), user meta, and **Email them their login details**. |
| **Change their WordPress role** | Gives their user the chosen role — replacing their current roles, or keeping them and adding this one. |
| **Remove a WordPress role** | Takes the chosen role off their user. Someone left with no role gets the site's default. |
| **Update WordPress user meta** | Writes key and value rows to their user meta. Values can use merge tags. |
| **Send a webhook** | Sends the contact to an address you choose. |

**Create a WordPress user** and **Change their WordPress role** only offer roles that cannot
take over the site — never administrator, editor or shop manager. An administrator's roles are
never changed by any of these steps. To add or change these
steps you need the WordPress permission to create users (for **Create a WordPress user**) or
to promote users (for the other three).

**Send a webhook** takes a **Remote URL** and a **Method** (**POST**, **PUT** or **GET**).
Under **Send**, choose **The whole contact** or **Fields you choose** (name and value rows,
with merge tags). **Format** is **JSON** or **Form data**, and **Headers** adds header rows,
such as an `Authorization` token. **Send a test** sends the step with your newest contact's
details and tells you what the receiving end answered. Any answer other than success is
retried.

## Waits

Find these under **Timing**.

**Wait** holds the contact before they move on. Choose what to wait for under **Wait for**:

| Wait for | Settings | They move on |
|---|---|---|
| **A length of time** | **How long** and a unit, from **Minutes** to **Months** (3 days by default) | After that long. A month is a calendar month. |
| **A date and time** | **Until** | At that moment. |
| **The next day of the week** | **On these days** (none ticked means any day), **At** | At the next such day and time. |
| **A date on the contact** | **Date field**, **Days before or after**, **At**, and **Wait for the next anniversary** | On that date, or its next anniversary. |

A contact whose date is missing, or already past, doesn't wait at all — they carry straight
on. A wait until a date that has already passed shows as a warning in the checklist.

### Wait for an event

**Wait for an event** holds the contact until they do something, for at most a time limit.
Click **Choose an event** to pick the event (any trigger), fill in its settings, and set
**Give up after**.

When a contact arrives, the event is checked first. If it already happened since they entered
— they already have the tag, they already clicked — they move on at once. Otherwise they wait
until it happens or the time runs out, whichever comes first.

By default everyone carries on to the same next step either way. Turn on **Do something
different if it doesn't happen** to split it into two paths, **It happened** and **Time ran
out**. You can't turn the switch off again while either path has steps on it.

## Goals

A goal marks what the automation is for. Pick one from the **Goals** tab — each card is an
event, such as **Tag is added** or **Clicks a link in an email**.

When a contact does the goal's event while they are anywhere above it on their path, they
jump straight to the goal and skip what lay between. Someone who already bought doesn't get
the "still thinking it over?" email.

- A goal never does the thing itself. To add a tag, use **Add a tag**; a goal on **Tag is
  added** only notices it.
- An event caused by an earlier action in the same automation doesn't count as the contact
  reaching the goal early.
- A goal inside a path only moves contacts on that path.
- **Someone who gets here without having done it** — **Carries on** (the default) or **Waits
  here until they do it**, with no time limit.
- **Let others join here** — someone who does this without being in the automation joins at
  this goal and gets the steps after it. The re-entry setting still applies.

Goals reached show on the report's **Goals** card.

## Paths

Find these on the **Conditions** tab.

### If / else

**If / else** checks the contact's data when they arrive. Those who match the first path's
rules go one way; **Everyone else** goes the other. Rename either path in the panel. The rules
are the same as [segment](/contacts/segments/) rules.

### A/B split

**A/B split** shares contacts between paths at random, by the weights you set. Each path has
a name and a percentage. **Share evenly** splits 100 between them, **Add a path** adds
another, and the bin icon removes one when there are more than two. The weights must add up
to 100% before you can go live. A path at 0% shows **Nobody will take this path**.

A contact always lands on the same path, however many times they are checked.

On either kind, a path with no steps is allowed — contacts on it go straight to whatever
follows the split. The checklist points these out in case it was a mistake.

## Stop early

**Stop early** takes someone out part-way, and they skip the rest. Open **Settings** in the
builder header:

- **When they do something** — pick an event, such as **Unsubscribes** or **Tag is added**.
  The moment it happens to a contact in the automation, their run ends.
- **When they match rules** — rules checked before every step. A contact who matches as they
  move on to the next step leaves.

Contacts taken out this way are counted as **Left**. **Finishes an automation**, with **Leave
early, by a leave rule** ticked, can start another automation for them.

:::tip[Unsubscribing doesn't end the run]
When a contact unsubscribes, the emails to them are skipped but the rest of the flow
carries on — tags, fields and webhooks still happen. Add **Unsubscribes** under **Stop early**
if you'd rather they left altogether.
:::
