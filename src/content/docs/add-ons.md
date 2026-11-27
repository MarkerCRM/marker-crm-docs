---
title: Add-ons
description: Turn optional parts of the CRM on and off, and what happens to their data when you do.
sidebar:
  order: 90
---

Some parts of Marker CRM are optional. You turn them on when you need them, and off when you
do not, so the menus show only what your team uses. Open **Add-ons** in the Marker CRM menu.
You need permission to manage settings to see it.

![The Add-ons page, with a switch beside each optional part of the CRM](/images/placeholder.svg)

Each row names an optional part, says what it does, and has a switch.

## What you can turn on

| Add-on | What it adds |
|---|---|
| **Companies** | Keep the businesses your contacts work for, and see everyone at one of them together. Adds the **Companies** tab under **Contacts**. See [Companies](/contacts/companies/). |
| **Deals** | Track what you are selling through pipelines of your own stages, from first talk to won or lost. Adds **Deals** to the menu. Its pipelines, general settings, lost reasons and contact roles are under **Settings → Add-ons → Deals**; people with only the **Manage pipelines** permission see just that page in Settings. |
| **Tasks** | Plan what to do next for a contact, company or deal, with a due date and who it is for, and see every task in one list. Adds **Tasks** to the menu and **Task** to **Add activity** on each record. See [Tasks](/tasks/). |
| **Files** | Keep proposals, contracts and other files on contacts, companies and deals, preview them, and share them by link. Adds **Files** to the menu and a **Files** tab on each record. Stored in your uploads folder, Amazon S3 or Cloudflare R2. See [Files](/files/). |
| **Frontend portal** | Open the whole CRM at an address on your site, such as `yoursite.com/markercrm`, without the WordPress dashboard around it. See [Frontend portal](#frontend-portal) below. |
| **SMS & WhatsApp** | Pro. Text contacts from campaigns, automations and their own page, and see their replies, through Twilio, Amazon or the WhatsApp Business API. See [SMS & WhatsApp](/settings/sms/). |
| **AI Assistant** | Write and improve emails, suggest subject lines, and summarise contacts, companies and deals, with the AI connected to your WordPress site. Free; needs WordPress 7.0 or newer. Also switched on in **Settings → AI Assistant**. See [AI Assistant](/settings/ai/). |
| **Abandoned carts** | Pro. Win back shoppers who gave their email at checkout but left without buying. Needs WooCommerce or FluentCart. See [Abandoned carts](/settings/abandoned-carts/). |

Each is off on a new site.

## Turn one on or off

Click the switch.

- **Turning one on** brings in its screens and menus. Most appear at once; a few, such as Deals, reload the page first.
- **Turning one off** hides it everywhere: its menu items, tabs and screens.

## Settings of an add-on

An add-on with settings of its own opens them inside **Settings**: click **Configure** on its row, or its name under
**Settings → Add-ons**. The page starts with the add-on's own switch; its settings show while it is on.

**Settings → Add-ons** always lists **SMS & WhatsApp** and **Abandoned carts**, on or off; the other add-ons appear there once you turn them
on. **More add-ons** at the bottom comes back to this page. The AI Assistant sits under **Settings → Connections**
instead, as the connection to your AI.

:::note[Nothing is deleted]
Turning an add-on off only hides it. Its data stays in your database and comes back, as it was,
when you turn it on again.
:::

If the page says **The modules could not be read**, click **Try again**. If it keeps failing,
check that you are still signed in.

## Add-ons and integrations

This page is for parts of Marker CRM itself. Connections to other plugins and services, such as
WooCommerce, are set up under
[Settings → Add-ons and integrations](/settings/integrations/).

## Frontend portal

With **Frontend portal** on, the CRM opens at an address on your site: `yoursite.com/markercrm` unless you change it. It is
the same CRM, with the same data and permissions, on a page of its own: no WordPress menus, toolbar or theme.

Use it for a team who only need the CRM, or when your site keeps some people out of the WordPress dashboard (stores and
membership sites often do). Give them a WordPress account with CRM access and the portal's address.

- **Configure** (or **Settings → Add-ons → Frontend portal**) sets the **Address**: what comes after your site's
  address, one word or several joined by hyphens, `markercrm` if left empty. A page of your own already at that
  address stays as it is, so choose an address nothing else uses. **Open the portal at** shows the full address,
  with buttons to copy it and to open it, and **Open the frontend portal** opens it in a new tab. Save a new
  address before you open it.
- It needs pretty permalinks (**Settings → Permalinks** in WordPress, anything but *Plain*); the settings say so when
  your site has plain ones.
- Someone who is not logged in is sent to the login page and back. Someone without CRM access sees **Your account does not have access to the CRM. Ask the site owner to give you access.**
- While it is on, people with CRM access find **Open the CRM portal** under your site's name in the WordPress toolbar.

If you are already in the dashboard, full screen (the icon at the top right of the CRM) gives much the same view.

