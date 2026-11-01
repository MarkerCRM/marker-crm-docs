---
title: Email reports
description: How much email went out in a period, how much was opened, clicked, bounced and unsubscribed, and where those numbers come from.
sidebar:
  order: 2
---

The email report adds up every email sent in a period: campaigns, sequences, automation emails
and emails sent to a single contact. Open **Reports → Email**.

![The email report, with rate cards, the email activity chart and the campaigns table](/images/placeholder.svg)

Choose the period with the date range at the top right. It starts at the last 30 days. An email
belongs to the day it was sent.

## The totals

- **Sent** — every email sent in the period.
- **Delivered** — the share your mailer accepted. This is not proof it reached the inbox; a
  bounce reported later by your sending service moves it out.
- **Open rate** — opened, out of the emails whose opens were tracked.
- **Click rate** — clicked, out of the emails whose clicks were tracked.
- **Bounce rate** — bounced, out of sent. It turns red above 2%.
- **Unsubscribe rate** — unsubscribed, out of delivered. It turns red above 0.5%.

:::caution[Opens are approximate]
An open is recorded when the email's images load. Apple Mail and some security scanners load
every email's images by themselves, which counts as an open, so open rates read high. Mail
apps that block images never count an open at all. A click on a tracked email also counts it
as opened. Clicks are the more reliable number.
:::

Emails sent while tracking was off in [Settings → Email defaults](/settings/email/) are left
out of the open and click rates rather than counted as unopened.

## Email activity

**Email activity** charts **Sent**, **Opened**, **Clicked** and **Unsubscribed** over the
period. Pick a campaign from **All campaigns** to see only that one.

## Campaigns

The **Campaigns** table lists up to ten campaigns sent in the period, newest first, with how
many were **Sent** and their **Opened**, **Clicked** and **Unsubscribed** rates. Click a name to
open the campaign's own report. See [Campaigns](/emails/campaigns/#after-sending) for what the
campaign report shows.

## Where the numbers come from

Every email Marker CRM sends is one entry in its send log, the same one you see under
[Logs](/logs/email/). Opens come from a tiny tracking image in the email; clicks come from
links that pass through your site first. The report counts those entries, so a new open or
click shows up at once.

:::note[Older periods]
Past the **Email history** period in [Settings → Privacy and data](/settings/privacy/) (two
years by default), sent emails and their opens and clicks are deleted. A date range older than
that comes back empty here. Each campaign keeps its own totals in its report.
:::
