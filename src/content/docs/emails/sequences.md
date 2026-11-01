---
title: Sequences
description: A series of emails with waits between them, which each contact receives on their own clock from the moment they are added.
sidebar:
  order: 3
---

A sequence is a series of emails with gaps between them: a seven-day course, a welcome series,
a follow-up after a demo. You write it once. Each contact you add gets the first email, then
the next after its wait, and so on, counted from when *they* were added.

Sequences live under **Emails → Sequences**.

## Sequences and automations

A sequence is a simpler kind of [automation](/automations/):

| | Sequence | Automation |
|---|---|---|
| How contacts get in | You add them, or an automation does | A trigger, such as a tag being added |
| What it holds | Emails and waits, in one line | Any steps: conditions, branches, tags, emails |
| Who it emails | The contact, as marketing email | Anyone the step names |

Use a sequence when the order of emails is the whole plan. Use an automation when something
should start it by itself, or when it needs to decide or act along the way. The two work
together: an automation's **Add to a sequence** step puts someone into a sequence, and the
**Finishes a sequence** trigger starts an automation when someone has had every email.

## Create a sequence

Click **New sequence**. The sequence opens straight into writing its first email.

![The sequence editor, a timeline of emails with the wait before each and the day it lands on](/images/placeholder.svg)

The editor is a timeline. Each card is one email, showing its subject, the day it is sent
(counted from when the contact was added) and, once the sequence is running, its numbers.
Changes save themselves.

### Add emails and waits

- **Add an email** adds one at the end. It starts with the sender, sending hours and UTM
  settings of the email before it, so you set those once.
- The **Wait** above each card is how long after the previous email it is sent (for the first
  email, after the contact is added), in **Hours**, **Days** or **Weeks**. The first email can
  have no wait: it shows **Right away**, and **add a wait** gives it one.
- Each card's menu has **Move up**, **Move down**, **Duplicate** and **Delete**. An email moves
  with the wait before it.
- The eye icon previews an email; **Edit** opens it.

### Write each email

**Edit** opens the email full screen in the [email editor](/emails/editor/), with these rows
above it:

- **When** — the wait before it, with the day it lands on.
- **From** — sent as [Settings → Email defaults](/settings/email/) says, unless you tick
  **Use a different sender for this email**.
- **Send** — **As soon as it’s reached**, **Only within certain hours** (choose the **Days**
  and the hours **From** and **To**), or **On a specific date** (and, **If that date has
  passed**, either **Send right away** or **Skip this email**).
- **UTM** — tags the email's links for your analytics.

Click **Test email** to send it to an address. When the address belongs to a contact, their
details fill the merge tags. Click **Done** to keep your changes.

### If someone is added again

Above the timeline, **If someone is added again** decides what happens to a contact who is
added while they are in it, or after they have finished:

- **Skip them**
- **Let them go through it again once they finish**
- **Let them go through it again after** a number of **days after they last started**
- **Start them over from the first step**

## Turn it on

A new sequence is a **Draft**: nobody can be added. Click the status beside the name and
choose **Active** to start accepting contacts, or **Paused** to hold everyone where they are
and send nothing until it is on again. You can also activate or pause several from the list.

## Put contacts in

A sequence has to be **Active** before anyone can be added. Then add contacts from:

- **The sequence's report** — click **Add contacts**, choose lists, tags or segments (or
  **Every contact**) under **Who**, and confirm. The dialog says how many are already in it or
  kept out by the re-entry setting.
- **The contacts list** — select contacts and choose **Add to a sequence**.
- **A contact's page** — use **Add to an automation or sequence**.
- **An automation** — the **Add to a sequence** step.

Each email is marketing email, so it goes only to contacts who are subscribed. When a contact
unsubscribes from email, they are taken out of every sequence they are in.

:::caution[Editing a sequence people are in]
Changes reach the people already going through it. A new email at the end is sent to everyone
still going, and a changed wait counts from when they got the email before it.
:::

## Take contacts out

On the report's **Contacts** tab, select people and **Take them out**: they stop where they are
and receive nothing more. **Remove from automation** goes further, deleting their history in the
sequence so they can enter it again. The emails they received stay in the
[email log](/logs/email/).

An automation can also take people out with the **Take out of a sequence** step.

## See how it is doing

The **Sequences** list shows, for each sequence, how many are **In progress**, how many
**Completed**, and the open rate. More columns, such as **Entered** and **Clicked**, are under
the column picker.

In the editor, each email's card shows how many were **Sent**, **Opened**, **Clicked** and
**Unsubscribed**. The report (**Report** in the editor bar, or **View report** in the list) has
three tabs:

- **Performance** — how many entered, are in progress and completed, and how far they get.
- **Steps** — each email's numbers. Click a count to see who it is.
- **Contacts** — everyone who entered, where they are and what comes next.

## Delete a sequence

Choose **Delete sequence** from the editor's menu, or **Delete** in the list. Its emails and
report are removed, and anyone part-way through gets nothing more. The emails already sent stay
in the email log.
