---
title: Reports and runs
description: Read an automation's report, see where contacts drop off, follow one contact's path through it, add contacts by hand and take them out.
sidebar:
  order: 6
---

Every automation that has been turned on has a report: how many contacts entered, where they
are now, how far they get, and what each email did. Open it by clicking a live or paused
automation on the **Automations** list, from **View report** in a row's menu, or from
**Reports** in the builder header.

Each time a contact goes through an automation is one **run**. A contact who enters twice has
two runs.

![An automation report on the Performance tab, with the Where they are, Goals and Emails cards above the How far they get chart](/images/placeholder.svg)

## The header

The report shows the automation's name, its state and its trigger, with two buttons:

- **Add contacts** — put contacts in by hand (below). Only shown while the automation is
  **Active**.
- **Edit** — open it in the builder.

Until somebody enters, the report says **Nobody has entered yet**, with a button to open the
builder or add contacts.

## Performance

The **Performance** tab has up to three cards:

- **Where they are** — everyone who entered, with a trend over recent days, split into **In
  progress**, **Completed**, and, when there are any, **Left**, **Taken out** and **Failed**.
  Click a row to see those contacts on the **Contacts** tab.
- **Goals** — the share of contacts who reached any goal, and each goal on its own. Shown when
  the flow has goals. A contact who passed a goal without doing its event isn't counted.
- **Emails** — across every email in the flow: **Opened**, **Clicked** and **Unsubscribed**.

Below them, **How far they get** draws the flow with its width following the number of
contacts, so you can see where people drop away. Click a step to list the contacts who reached
it.

### What each run status means

| Status | Meaning |
|---|---|
| **Active** | Still going — on a step, or waiting. |
| **Completed** | Reached the end, or an **End the automation** step. |
| **Left** | Taken out by a **Stop early** event or rule. |
| **Taken out** | Taken out by hand, by **Take them out of other automations**, or by **Start them over from the first step** re-entry. |
| **Failed** | A step failed three times in a row. The run stops there. |

## Steps

The **Steps** tab lists every step in order, with paths indented under the step that splits
them and the share of contacts who took each path.

For each step you see how many contacts **Reached** it, what share of everyone who entered
that is, and how many are **waiting** there now. Where a step reaches fewer contacts than the
one before it, the drop is shown beside it — in red when a quarter or more fall away. Email
steps also show the share **opened** and **clicked**.

Click any step to see who reached it on the **Contacts** tab.

When the flow has emails, switch from **All steps** to **Emails** to see only the emails, with
how many were **Sent** and the share who **left** (unsubscribed). Each email has two buttons:

- **Preview** — the email as written.
- **Who got it** — every contact it was sent to, newest first, with their **Opens**,
  **Clicks** and when it was **Sent**. Narrow the list to **Everyone**, **Opened**, **Not
  opened** or **Clicked**.

:::note[Machine opens and clicks]
Open and click rates leave out opens and clicks made by mail scanners and privacy proxies, so
they reflect what people did. Emails sent while tracking was off don't count toward the rates.
:::

## Contacts

The **Contacts** tab lists every run: **Contact**, **Status**, **Current step**, **Next** (when
a waiting contact moves on) and **Entered**. Use **Search contacts…** and **Any status** to
narrow it. When you came from a step, a **Reached** chip at the top shows which; close the chip
to see everyone again.

### A contact's history

Click a row to open that run's history in a drawer, oldest first:

- How they came in — the trigger, added by hand, or the automation that started them.
- Each step they passed, with the path it was on. A goal they passed without doing its event
  says **Passed without doing it**.
- For each email, whether it was **Opened**, **Clicked**, or led to them **Unsubscribed**.
- Where they are now and when it **Moves on**, or how the run ended.
- **Still ahead** — the steps they will still pass. A goal there is marked **Goal · not
  reached yet**.

**Open contact** goes to their contact record.

![The run history drawer for one contact, listing Entered, two emails with Opened and Clicked, and a wait with its Moves on date](/images/placeholder.svg)

### Taking contacts out

To stop a contact who is still going, click the exit icon on their row (**Take them out**), or
select several rows and click **Take them out**. They stop where they are and receive nothing
further from this automation. They stay on the list as **Taken out**, so what already ran for
them is still on record.

### Removing finished runs

**Remove from automation** (the bin icon on the row, or the bulk button) deletes a finished
run — completed, left, taken out or failed — and its history. The contact leaves the report,
and because the run no longer exists, they can enter again even under **Skip them** re-entry.
The emails they were sent stay in the [email log](/logs/email/). Runs still going can't be
removed; take them out first. You need permission to delete automations to see this option.

## Adding contacts by hand

Click **Add contacts** at the top of the report. Under **Who**, choose any mix of lists, tags
and segments, or **Every contact**.

The dialog counts as you choose: how many contacts will join, and how many are already in it
or kept out by its re-entry setting. Click the confirm button (**Add** *N* **contacts**) to
start them. Large selections are added in the background, a few hundred at a time.

Contacts added by hand start at the first step. They skip the trigger's **Only if** rules, but
the re-entry setting still applies. The automation must be **Active**; a paused or draft
automation can't take anyone.

### From a contact's record

Open a contact and go to their **Automations** tab to see every automation and sequence they
are in, how they got there (**Trigger fired** or **Added by hand**), their status, current step
and what happens next. From there you can:

- **Add to an automation or sequence** — pick one that is on. They start at the first step.
- **Take them out** of any run still going. Their history stays.

## How long history is kept

The step-by-step history of finished runs is deleted after the period set in **Automation
history** under [Settings → Privacy](/settings/privacy/) (a year by default). The run
itself stays, so it still counts in the report totals and for re-entry, and still shows on the
contact's **Automations** tab. Per-step counts only include runs whose history is still kept.
Runs still going keep their history however old they are.
