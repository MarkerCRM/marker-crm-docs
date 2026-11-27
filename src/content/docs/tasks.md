---
title: Tasks
description: Plan what to do next for a contact, company or deal, see everything due in one list, and get a short email each morning.
sidebar:
  order: 45
---

An activity is something that happened: a call, a meeting, a note. A task is something that still has to
happen: *call Ada back on Thursday*. Tasks is an add-on: turn it on under **Add-ons** (see
[Add-ons](/add-ons/)). It is free.

![The Tasks page, with the Status filter set to All above a list of open and done tasks](/images/placeholder.svg)

## What a task is

![The New task drawer: the task name, the records it is about, then its status, assignee, due date, priority and type](/images/placeholder.svg)

| On the form | What it means | If you leave it |
|---|---|---|
| **Task name…** | What needs doing. The only thing you must fill in. | — |
| **Associate with** | The **Contact**, **Company** and **Deal** it is about, one of each at most. Company shows while the Companies add-on is on, Deal while Deals is on, and each only if you may view that kind of record. | The record you added it on |
| **Status** | **Open**, **In progress** or **Done**. | **Open** |
| **Assignee** | Who should do it. Only people who can use tasks are listed. Clear it to leave the task **Unassigned**. | You |
| **Due date** | A date, and a time if you click **Add a time**. A date alone is due by the end of that day. Clear it for no due date. | Tomorrow |
| **Priority** | **Low**, **Medium** or **High**. | **Low** |
| **Type** | **To-do**, **Call**, **Meeting** or **Email**. Shown as an icon. | **To-do** |
| **Description** | Anything else. | Empty |

A task about several records shows on each of them.

## Add a task to a contact, company or deal

Open the record, go to its **Activity** tab, click **Add activity** and choose **Task** as the **Kind**. The form
above appears, already associated with the record. Fill in a name and click **Create task**.

The record's open tasks are listed above its activity, soonest first, with their due date (red once it has
passed), who they are for, **In progress** when they are, and a coloured dot for medium or high priority. Three
show; **Show all** lists the rest.

![A contact's Activity tab, with two open tasks above the activity feed](/images/placeholder.svg)

## Mark a task done

Click the circle in front of it, on the record or on the Tasks page, or set its **Status** to **Done**. It
appears in the activity of each record it is about as **Task completed**. To reopen it, click its tick on the
Tasks page.

When you tick off a **Call** or **Meeting** task on a record, you are asked **Log the call?** (or **Log the
meeting?**). **Log it** opens **Add activity** with that kind chosen and the task's name in the text, so you can
note how it went and save it. **Skip** logs nothing.

## The Tasks page

**Tasks** in the Marker CRM menu lists your tasks. **New task** at the top right adds one.

Beside the search, the filters narrow the list:

- **Status**: **All** (where the page starts: open tasks first, soonest due, then done ones), **Open** (every task
  not yet done, the overdue first), **Overdue**, **Due today**, **Upcoming** (after today, then tasks with no due
  date) or **Done**. Each shows how many tasks it holds, whatever the other filters.
- **Priority** and **Type**.
- **Assigned to**, for people with the **Manage** permission for tasks: **Anyone** (where they start) or **Mine**.
  Everyone else sees only their own: tasks assigned to them or added by them, so a task you gave a colleague
  stays in view.

Today and overdue are worked out in your site's time zone (**Settings → General** in WordPress).

- **Search tasks…** finds tasks by name.
- Click a name to edit the task. **⋯ → Delete** deletes it.
- Tick tasks in the first column to **Mark done** or **Delete selected** at once.

**Related to** links to each record the task is about. A record you cannot see is left out.

## Morning email

Each morning after 08:00 site time, everyone with tasks assigned to them that are overdue or due today gets one
email, **Your tasks for today**, listing them (up to 20, overdue ones marked), with a link to the Tasks page.
Nobody with nothing due gets anything. It goes from the **From name** and **From address** in
[Settings → Email defaults](/settings/email/), and needs the CRM's
[background work](/getting-started/installation/#background-work) running.

To stop it for yourself: open the menu under your name at the bottom of the sidebar, choose **Task reminders**, and
turn off **Email me my tasks each morning**.

## Dashboard

The dashboard shows a **My tasks** panel: your **Overdue**, **Due today** and **Upcoming** counts, and **Open
tasks**, which goes to the Tasks page.

## Automations

- **Create a task** (action): adds a task on the contact with the **Type** and **Priority** you choose, due in the
  number of days you choose, for **The contact's owner** or **Someone else**. Merge tags work in the title: *Call
  {{contact.first_name}}*. A contact with no owner, or someone who cannot use tasks, gets an unassigned task: it
  shows on the contact, and on the Tasks page only to people with **Manage**.
- **Complete tasks** (action): marks the contact's open tasks done, all or one type.
- **Task is created** and **Task is completed** (triggers): run when a task about a contact is added or marked
  done, optionally only for one type. Both also work as a goal or a wait.

See [Steps](/automations/steps/) and [Triggers](/automations/triggers/).

## Who can do what

Under **Settings → Users and permissions**, **Tasks** has four permissions (shown while the add-on is on):

- **View**: see your own tasks and the tasks on records you can see.
- **Edit**: add tasks, and change or complete those assigned to you or added by you. Includes **View**.
- **Delete**: delete those same tasks. Includes **Edit**.
- **Manage**: see and change everyone's tasks. It adds to the others rather than replacing them: someone with
  **Manage** still needs **Delete** to delete a task.

A task about records is visible to people who can see at least one of them.

## When a record or person goes

- Deleting a contact, company or deal takes it off its tasks. A task about nothing else is deleted with it; one
  also about another record stays there.
- Deleting a WordPress user leaves their tasks unassigned.
- Turning the Tasks add-on off hides its screens; the tasks stay, and come back when you turn it on.
