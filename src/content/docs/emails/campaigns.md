---
title: Campaigns
description: Write one email, choose who gets it, check it and send it now, later or on a repeating schedule.
sidebar:
  order: 1
---

A campaign is one email sent to an audience you choose: once, at a time you pick, or on a
repeating schedule. Campaigns live under **Emails → Campaigns**.

![The campaigns list, with status, audience, recipients and open and click rates for each campaign](/images/placeholder.svg)

The list shows each campaign's **Status**, **Audience**, **Recipients**, and the **Opened** and
**Clicked** rates. The pills along the top filter it: **All**, **Recurring**, **Drafts**,
**Scheduled**, **Sending** (which includes paused campaigns) and **Sent** (which includes
cancelled ones). While anything is sending or scheduled, the list refreshes itself every ten
seconds.

## Create a campaign

1. Click **New campaign**.
2. Click the title in the header (**Untitled campaign**) and give it a name. Only you see the
   name; recipients see the subject.
3. Fill in the email details and write the email, as described below.

There is no Save button. Your changes are saved a few seconds after you stop typing, and the
header shows *Saving…* or *Unsaved changes* while that happens. If you leave the page with
unsaved changes, they are saved on the way out.

## Email details

Click **Email details** in the editor bar to open the rows above the email. A red dot means
something is still missing. A new campaign with no subject opens them by itself.

### From

The campaign is sent from the name and address in
[Settings → Email defaults](/settings/email/). To use a different sender for this campaign
only, open the **From** row and tick **Use a different sender for this campaign**, then set the
**From name**, **From address**, **Reply-to name** and **Reply-to address**. Your mailer has to
be set up to send from that address, or the message bounces.

If the address is on a free mailbox such as Gmail or Yahoo, the row shows **Free mailbox · Fix**.
Those providers often junk bulk mail sent as their address from another server, so send from
an address on your own domain.

### To: lists, tags, segments or everyone

Open the **To** row and choose any mix of lists, tags and segments. A contact in any one of
them gets the email once. To send to all your subscribers, turn on **Everyone subscribed**;
the count beside it is how many contacts are subscribed.

To leave people out, click **+ Except** and choose lists, tags or segments. Anyone in any of
those is left out, even if they are also in the audience.

The number at the end of the **To** row is how many people **can be emailed**. Contacts who are
not subscribed, or whose address is on the suppression list, are not counted and do not
receive the campaign. Hover over the number to see how many were left out for that reason.

:::note
An empty **To** row sends to nobody. Marker CRM never treats "nothing chosen" as "everyone".
:::

### Subject and preview text

Write the **Subject**. The counter under it says whether it is a good length or may be cut off;
most inboxes show about sixty characters, and phones fewer. Click **+ Preview text** to add the
line inboxes show after the subject. Without it, inboxes show the first line of the email.

You can put [merge tags](/emails/editor/#merge-tags) in both, such as `{{contact.first_name}}`.

### A/B testing the subject

Click **A/B** beside the subject to test up to four subject lines (and, if you use preview
text, a preview text for each).

- **Split** sets how the test group is shared between the versions. **Split evenly** puts them
  back to equal shares.
- **Test on** chooses how much of the audience is in the test: 10% to 50%, or
  **Everyone (compare only)**.
- **Winner by** picks the winner on **Opens** or **Clicks**.
- **Decide after** sets how many hours the test runs before the winner is chosen. The winning
  version then goes to everyone who was not in the test. With **Everyone (compare only)** the
  setting reads **Compare after**, and nobody is left to send a winner to.

Open or click tracking has to be on in [Settings → Email defaults](/settings/email/) for the
test to pick a winner.

### UTM

Open the **UTM** row and turn on **Add UTM parameters to links** to tag every link with
**Campaign source**, **Campaign medium** and **Campaign name** (required), and optionally
**Campaign term** and **Campaign content**. Analytics tools such as Google Analytics read these
to tell which visits came from this campaign. The unsubscribe and preference links never get
UTM parameters.

## Write the email

The email is written in the [email editor](/emails/editor/), below the details. You can start
from a [template](/emails/templates/), insert [patterns](/emails/patterns/), and show blocks to
some contacts only.

To see the email as it will go out, click **Preview** (the eye icon). The preview fills merge
tags with the first contact in the audience. If nobody is in the audience yet, merge tags show
their fallbacks.

## Send a test

Click **Test email**, enter an address in **Send to**, and click **Send**. The test is what is
on screen now, sent as the campaign would be. It is not counted in the campaign's report, and
its links are left untracked so you can follow them.

## Review and send

Click **Review**. The panel shows how many people will receive the email, when, from which
address and how many were left out, followed by a list of checks.

![The Review panel, with the recipient count, a list of checks and the Slide to send control](/images/placeholder.svg)

**Red items block sending.** They include:

- **Add a subject line** and **Write the email**.
- **Set a From address**.
- **Choose who gets this**, or **Nobody in this audience can be emailed**.
- **Complete the UTM parameters**, when UTM tagging is on.
- **Pick a date and time to schedule**, or **That send time has already passed**.
- **A link has no address**.
- For A/B tests: **Give every version a subject**, or tracking is off so the test cannot pick a
  winner.

**Other items are warnings.** You can send anyway, but read them: no postal address in the
footer, no preview text, a free mailbox as the sender, **No test sent yet**, a subject that will
be cut off, reads as shouting or uses a merge tag without a fallback, nothing to click,
insecure `http://` links, or an A/B test with too few people to pick a reliable winner.

Each item has a button that takes you to the field to fix. When nothing red is left, drag
**Slide to send** (or **Slide to schedule**, or **Slide to start repeating**) to the end.

## Schedule it

The **When** row chooses when the campaign goes out:

- **Send now** — goes out as soon as you slide to send.
- **Schedule** — pick a date and time in **Send at**. Tick **Deliver gradually** and choose a
  window in **Over** (30 minutes to 24 hours): each person is given their own time inside that
  window, so a large list does not arrive in one burst.
- **Recurring** — sends again **Daily**, **Weekly** (pick **Which day**) or **Monthly** (pick a
  **Day of the month**), at **What time**. Months too short for the chosen day send on their
  last day. With **Send each one automatically** off, each run waits as a draft for you to
  check and send.

A scheduled campaign cannot be edited. Click **Unschedule to edit** to turn it back into a
draft. To end a recurring campaign, choose **Stop repeating**; runs already sent keep their
reports.

## While it sends

Sending happens in the background, in batches, through Marker CRM's queue. The pace follows
**Emails per second** and **Emails per hour** in [Settings → Email defaults](/settings/email/),
so a large campaign takes a while. The list shows a progress bar, and the report shows how
many have gone and roughly when it will finish.

A message that fails for a temporary reason is tried again later, up to three times in all.

From the list's row menu, or the report, you can:

- **Pause** — nobody else receives it until you **Resume**.
- **Cancel sending** — what has already gone cannot be recalled; the rest is not sent.

:::caution
The queue is run by WordPress cron, which only fires when someone visits your site. On a quiet
site, sends can start late. See [Settings → Tools](/settings/tools/) to set up a server cron.
:::

## After sending

Once a campaign has started, its name opens the report instead of the editor. The report has
the totals at the top (**Sent**, **Opened**, **Clicked**, **Unsubscribed**, **Failed**) and these
tabs:

- **Overview** — what was sent, when people first opened it, and which links were clicked.
- **Recipients** — everyone it went to, filtered by **All**, **Opened**, **Clicked**,
  **Did not open**, **Unsubscribed**, **Failed** and **Not sent yet**. **Tag these people** adds
  or removes tags for the whole group. On **Did not open** and **Failed**, **Resend to these**
  sends the email again to that group.
- **A/B test** — how each version did, which won and whether the result can be trusted.
- **Links & UTM** — every link in the email with its clicks, and the UTM parameters used.
- **Runs** — for a recurring campaign, each run and its numbers.
- **Email** — the email as it was sent.

Opens are approximate: some mail apps open every email automatically. See
[Email reports](/reports/email/) for what the numbers mean.

:::note
Past the **Email history** period in [Settings → Privacy and data](/settings/privacy/) (two
years by default), who opened and clicked is deleted. The campaign keeps its totals, links and
opens over time.
:::

## Duplicate a campaign

Choose **Duplicate** from the row menu, or from the **⋮** menu in the editor. The copy is a new
draft named "(copy)" with the same audience, content and settings, and none of the original's
numbers.

## Delete a campaign

Choose **Delete** from the row menu, or **Delete campaign** from the editor's **⋮** menu. To
delete several, tick them in the list and use the bar that appears. The campaign and its report
are removed; the emails each contact received stay on their record. A campaign that is sending
cannot be deleted: pause or cancel it first.
