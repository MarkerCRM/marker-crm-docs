---
title: Email log
description: Every email Marker CRM has sent or is about to send, with its status, what it said, and who opened and clicked it.
sidebar:
  order: 1
---

The email log lists every email Marker CRM sends, one row per person: campaigns, sequence and
automation emails, emails written to one contact, and confirmation emails. Open **Logs**; the
**Email** tab is the first.

![The email log, with the contact, message, source, status and time of each email](/images/placeholder.svg)

Use it to answer "did this person get that email?", to see exactly what went out, and to send
something again.

## What is listed

The log shows emails in the date range at the top right, which starts at the last 30 days.
Each row has:

- **Contact** — who it went to. Click it to open their record.
- **Message** — the subject.
- **Source** — what sent it, with a link to that campaign or automation, and its kind:
  **Campaign**, **Automation**, **Direct** (written to one contact) or **System** (such as a
  double opt-in confirmation).
- **Status** — see below. A failed or bounced email shows the reason under its status.
- **Time** — when it was sent.
- **Engagement** — how many times it was opened and clicked, or **Unsubscribed**. This column
  is hidden at first; turn it on with the column picker.

Search by name or address, choose a kind under **Any source**, or use the status pills to
narrow the list.

## Statuses

| Status | Means |
|---|---|
| **Queued** | Waiting to go out: in the queue, scheduled, or paused with its campaign. |
| **Sent** | Your mailer accepted it. |
| **Delivered** | Your sending service confirmed it reached the inbox. Only shown when **Bounce handling** in [Settings → Email defaults](/settings/email/) is connected to a service that reports deliveries. |
| **Bounced** | The receiving server rejected it. |
| **Failed** | It could not be sent. Hover over the reason to read it. |
| **Cancelled** | It was not sent because its campaign was cancelled. |

A message that failed for a temporary reason is tried again later before it is marked
**Failed**.

## See what was sent

Click the eye icon (**See what we sent**) on a row. The email opens as that contact received
it, with the same subject, content and merge tags, even if the campaign or automation has been
edited since. Beside it you see its status, how many times it was opened, when it was
**first opened**, and which **Links clicked**.

![A sent email opened from the log, with its opens and the links that were clicked](/images/placeholder.svg)

Queued emails have nothing to show yet.

## Send it again

Click **Send it again** (the circular arrow) on a row, or select several rows and click
**Resend**. The email is queued again to the same person.

It is only sent again to contacts who can still receive it. Someone who has since unsubscribed,
or whose address is now suppressed, is skipped, and a queued email cannot be resent before it
has gone.

## Delete records

Select rows and use **Delete** in the bar that appears. The records are removed from the log
and from each contact's history, and their campaign's report stops counting them — useful for
clearing out test sends. Nothing is unsent. A campaign whose report has already been kept as a
summary (see below) is not affected.

## How long the log is kept

Emails are kept for the **Email history** period in
[Settings → Privacy and data](/settings/privacy/): 30 days, 90 days, 1 year, 2 years (the
default), 10 years or **Forever**. Each day, emails older than that are deleted with their opens
and clicks. Before that happens, each campaign's totals are saved, so campaign reports keep
their numbers.

:::note
Who opened and clicked a campaign goes with the deleted emails. That is what the setting is
for: keeping less personal data for less time.
:::
