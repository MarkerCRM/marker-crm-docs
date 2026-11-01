---
title: Privacy and data
description: What the CRM records about contacts, how long it keeps history, how it answers data requests, and what happens on uninstall.
sidebar:
  order: 12
---

This screen controls the personal data the CRM keeps beyond what contacts gave you, how long
history is kept, whether the CRM joins WordPress's export and erase requests, and what is
left behind when the plugin is removed.

Open it from **Settings → Privacy and data**.

![The Privacy and data screen, with Data collection, Data retention, Data requests and the uninstall switch](/images/placeholder.svg)

## Data collection

| Setting | Default | What it does |
|---|---|---|
| **Store only part of the IP address** | On | The CRM saves an IP address as proof of consent (when someone confirms a subscription, for example) and reads it for the country in reports. On, only three of the four parts are stored. That still shows the country, but no longer points to one person. |
| **Show contact photos from Gravatar** | Off | On, contact photos are looked up on Gravatar by email address. Off, contacts are shown with their initials, and no data about them leaves your site. Gravatar also has to be on under **Settings → Discussion** in WordPress. |

## Data retention

Old data is deleted by the daily maintenance run, oldest first. **Contacts are never
deleted by these settings.**

| Setting | Choices | Default | What is deleted |
|---|---|---|---|
| **Finished jobs** | 1 day – 1 year | 7 days | Background jobs that already ran. Failed jobs are kept for 30 days, so you can look into them. |
| **System logs** | 1 day – 1 year | 30 days | Entries in the [system log](/settings/tools/). |
| **Uploaded files** | 1 hour – 30 days | 24 hours | Import and export files. These hold everything about the contacts in them, so keep this short. |
| **Email history** | 30 days – 10 years, or **Forever** | 2 years | Who each email went to, and who opened and clicked it. |
| **Automation history** | 30 days – 10 years | 1 year | The steps a finished automation run went through. |

:::note[What Email history keeps]
When email history is deleted, each campaign still keeps its totals, its link clicks and its
opens over time, so reports stay correct. What goes is the detail of which contact got which
email.
:::

For **Automation history**, the run itself and the record of whether a contact may enter the
automation again are kept. Only the step-by-step detail is deleted.

To run the clean-up now, use **Maintenance → Run now** under [Tools](/settings/tools/).

## Data requests

When someone asks for a copy of their data, or asks you to delete it, WordPress handles it
under **Tools → Export Personal Data** and **Tools → Erase Personal Data**. These settings
decide whether the CRM is included.

| Setting | Default | What it does |
|---|---|---|
| **Include CRM data in exports** | On | Adds the person's CRM contact to the export, under **CRM contact**: name, status, source, created date, email address, tags and lists, and custom field values. |
| **Erase CRM data on request** | Off | Deletes the contact and everything filed under it when you run an erase request. |

The CRM finds the contact by the email address in the request.

:::danger[Erasing can't be undone]
With **Erase CRM data on request** on, running an erase request deletes the contact for
good: their timeline, custom fields, subscriptions and history. Turn it on when you are
ready to answer erasure requests, and check each request before you run it.
:::

## Delete all CRM data when the plugin is uninstalled

Off by default. With it off, your contacts are kept when you delete the plugin, so if you
install it again later, everything is still there. Deactivating the plugin never removes
anything.

When you turn it on, the screen lists what deleting the plugin would remove:

- Every contact, with their tags, lists and custom field values
- Every log entry and background job
- All CRM settings, including this one

Your WordPress users, posts and settings are not touched.

:::caution
Turn this on only when you are about to delete the plugin and want nothing left behind.
Export your contacts first if you might need them.
:::

## Saving

Click **Save changes** in the bar at the top, or **Discard** to undo.
