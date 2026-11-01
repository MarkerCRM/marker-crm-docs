---
title: Action links
description: Links that tag or list the contact who clicks them, then send them on to a page you choose.
sidebar:
  order: 7
---

An action link is a link that does something before it takes the reader anywhere. When
a contact clicks one in an email, they get the tags and lists you chose, and then go
on to your page.

Use them to let readers sort themselves: "Interested in the webinar? Click here" adds a
`webinar-interest` tag, and an [automation](/automations/) can follow up from there.

Open them from **Settings → Action links**.

![The Action links list, showing each link's name, action URL, target URL, clicks and created date](/images/placeholder.svg)

## Create an action link

1. Click **New action link**.
2. Under **Where it goes**, fill in:
   - **Name** — required. Only you see it.
   - **Target URL** — required. The page the contact lands on after the link has run. Enter
     the full address, starting with `http://` or `https://`.
3. Under **What it does**, choose any of **Add tags**, **Remove tags**, **Add to lists** and
   **Remove from lists**.
4. Optionally add **Notes** for your team.
5. Click **Add**.

You can't add and remove the same tag or list in one link. If you try, the link isn't saved
and you see an error.

A link that adds and removes nothing still works as a plain redirect. The list calls it
**Redirect only**.

## Put it in an email

In the email editor, select some text or a button, then use the **Action link** button in
the toolbar beside the usual link button. Search for the link by name and pick it. With
no text selected, the link's name is inserted as the link text.

You can also copy the link's address with **Copy link** from the row's menu, or by
clicking the **Action URL**, and paste it anywhere.

## Who gets tagged

When the link is sent in an email, the CRM adds a code to it that says which contact it was sent
to. When that contact clicks, they get the tags and lists, and the click is saved on
their record.

If someone clicks the link without that code — on a web page or forwarded on social
media — the CRM tries the signed-in WordPress user's contact. If it can't tell who clicked,
the link still redirects but tags nobody. That click is counted as **from the public**.

:::caution[Forwarded emails]
The link inside an email belongs to the person it was sent to. If they forward the email
and someone else clicks, the tags go on the original recipient.
:::

## The list

| Column | What it shows |
|---|---|
| **Name** | Click it to see what the link does: **Tags added**, **Tags removed**, **Lists added**, **Lists removed**, its **Clicks** and any **Notes**. |
| **Action URL** | The link to use. Click to copy it. |
| **Target URL** | Where people end up. |
| **Clicks** | All clicks. The summary under **Name** splits them into **from contacts** and **from the public**. |
| **Created** | When the link was made. |

Each row's menu has **Edit**, **Copy link** and **Delete**.

:::danger[Deleting breaks emails already sent]
An action link's address doesn't change when you edit it, so you can change the target or
the tags at any time. If you delete the link, every email that already contains it sends
readers to your home page instead, and tags nobody.
:::

## Who can use them

Managing action links on this screen needs the **Settings** permission. Inserting them into
emails needs permission to edit campaigns or automations. See
[Users and permissions](/settings/permissions/).
