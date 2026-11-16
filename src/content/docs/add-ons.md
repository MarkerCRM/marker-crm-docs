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
| **AI Assistant** | Write and improve emails, suggest subject lines, and summarise contacts, companies and deals, with the AI connected to your WordPress site. Free; needs WordPress 7.0 or newer. Also switched on in **Settings → AI Assistant**. See [AI Assistant](/settings/ai/). |
| **Abandoned carts** | Pro. Win back shoppers who gave their email at checkout but left without buying. Needs WooCommerce or FluentCart. See [Abandoned carts](/settings/abandoned-carts/). |

Companies is off on a new site.

## Turn one on or off

Click the switch.

- **Turning one on** brings in its screens and menus. Most appear at once; a few, such as Deals, reload the page first.
- **Turning one off** hides it everywhere: its menu items, tabs and screens.

## Settings of an add-on

An add-on with settings of its own opens them inside **Settings**: click **Configure** on its row, or its name under
**Settings → Add-ons**. The page starts with the add-on's own switch; its settings show while it is on.

**Settings → Add-ons** always lists **Abandoned carts**, on or off; the other add-ons appear there once you turn them
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
