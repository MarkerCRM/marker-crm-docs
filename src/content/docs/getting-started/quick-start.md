---
title: Quick start
description: From a fresh install to your first campaign and a running automation, in five steps.
sidebar:
  order: 3
---

This is the shortest path from an empty CRM to email going out. Each step links to the page
that covers it in full. The same steps appear in the **Finish setting up** checklist in the
CRM's sidebar, which ticks itself off as you go.

## 1. Set your business details and sending defaults

Every marketing email needs a real sender and a postal address in its footer.

1. Go to **Settings → Business profile** and fill in your business name and address.
2. Go to **Settings → Email defaults** and set the **From name** and **From address**.
   Use an address on your own domain — Gmail, Yahoo and Outlook reject or junk bulk mail
   sent as a free mailbox address from another server.
3. Under **Mailer**, check that a mailer plugin is connected. If none is, install the
   recommended one, then use **Send a test email** to see how your messages arrive.

More: [Email defaults](/settings/email/).

## 2. Add your contacts

Choose one:

- **Import a CSV.** Go to **Contacts → Import**, drop in your file, match its columns to
  contact fields and start the import. It runs in the background. See
  [Import contacts](/contacts/import/).
- **Add people by hand.** Go to **Contacts** and choose **New contact**. See
  [Contacts](/contacts/).

:::caution[Consent]
Only import people as **Subscribed** if they agreed to receive your email. Everyone else
should come in as **Transactional** or **Pending**.
:::

## 3. Create a list

Lists are what people subscribe to, and what an unsubscribe removes them from.

1. Go to **Contacts → Lists** and choose **New list**.
2. Give it a name, such as *Newsletter*. Turn on **Show on the preference page** if
   subscribers should be able to join or leave it themselves.
3. Add contacts to it — during an import with **Add to lists**, or from the contacts table
   with the bulk action **Add to lists**.

More: [Lists](/contacts/lists/).

![The Lists screen with one list, Newsletter, showing its contact count](/images/placeholder.svg)

## 4. Send your first campaign

1. Go to **Emails → Campaigns** and choose **New campaign**.
2. In **To**, choose the list you made. Only contacts whose status is **Subscribed** receive
   a campaign; the composer shows how many can be emailed.
3. Write a subject line and the email.
4. Open **Review**, fix anything marked in red, then **Slide to send**. To send later, choose
   **Schedule** first and pick a date and time.

More: [Campaigns](/emails/campaigns/).

## 5. Start an automation from a recipe

Automations look after one contact at a time, unattended.

1. Go to **Automations** and choose **New automation**.
2. Under **Or start from a recipe**, pick one — **Welcome series**, for example, sends three
   emails over a week to everyone who joins a list.
3. On the canvas, open the trigger and choose which list starts it. Read each email step and
   make the words yours.
4. **Slide to activate**. An automation with a required setting left empty will not turn on
   until you fill it in.

More: [Automations](/automations/).

:::tip[Nothing sending?]
Campaigns and automations run on WordPress cron. On a quiet site that can run late — the
**Dashboard** warns you when it does, and **Settings → Tools** has the server cron lines that
fix it.
:::
