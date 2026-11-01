---
title: Installation
description: What Marker CRM needs, how to install and activate it, and what activation sets up on your site.
sidebar:
  order: 2
---

Marker CRM is a regular WordPress plugin. You install it once, and everything it keeps —
contacts, emails, automations — is stored in your own site's database.

## Requirements

- **WordPress 6.4** or newer.
- **PHP 8.0** or newer.
- **A mailer plugin** to deliver email. Marker CRM sends through whatever WordPress is set
  up to use, so a plugin that connects a real sending service (SendGrail, FluentSMTP,
  WP Mail SMTP, Post SMTP or Easy WP SMTP) is what gets your mail into inboxes. Mail sent by
  your web server on its own is usually blocked or marked as spam.
- **A working scheduler.** Campaigns, automations and imports run in the background on
  WordPress cron, every minute. See [Background work](#background-work) below.

## Install and activate

1. In your WordPress admin, go to **Plugins → Add New Plugin**.
2. Choose **Upload Plugin**, select the Marker CRM `.zip` file and choose **Install Now**.
3. Choose **Activate Plugin**.

On a multisite network you can activate it for one site, or **Network Activate** it. Each site
gets its own CRM — its own tables and its own contacts. Sites added to the network later get
their tables when they are created.

## What activation sets up

Activating the plugin:

- Creates Marker CRM's own database tables (contacts, lists and tags, emails, automations
  and so on). Nothing is written into your posts or users tables.
- Schedules two background tasks: one that runs every minute to send email and work through
  automations and imports, and a daily one that tidies old logs and files.

Deactivating the plugin stops those background tasks. Your data stays where it is.

:::caution[Uninstalling]
Deleting the plugin keeps your CRM data unless you have turned on **Delete all CRM data when
the plugin is uninstalled** under **Settings → Privacy and data**. With that switch on,
uninstalling removes every Marker CRM table for good.
:::

## Finding it in the admin

After activation a **Marker CRM** item appears in the WordPress admin menu, with
**Dashboard**, **Contacts**, **Emails**, **Automations**, **Reports**, **Logs** and
**Settings** beneath it.

![The WordPress admin menu with Marker CRM and its sub-items expanded](/images/placeholder.svg)

The CRM opens full screen, covering the WordPress admin bar and menu so it has room to work.
Use the **Exit fullscreen** button in the CRM's header to bring the WordPress menu back; your
choice is remembered in that browser.

Administrators can use every part of the CRM. To let other WordPress users in — a sales
colleague, an editor — give them access under **Settings → Users and permissions**.

## First run

The CRM starts empty. A **Finish setting up** checklist sits in the CRM's sidebar until each
item is done:

- **Add your business details** — your business name and postal address, which go in the
  footer of every marketing email.
- **Connect a mailer** — the from name and address your email is sent as.
- **Import your contacts**
- **Create a list**
- **Send your first campaign**

Each unfinished item links to the screen that completes it. The checklist disappears once all
five are done. The [Quick start](/getting-started/quick-start/) walks through them in order.

![The Finish setting up checklist in the CRM sidebar, with two of five steps ticked](/images/placeholder.svg)

## Background work

WordPress cron only runs when someone visits your site. On a quiet site that means scheduled
campaigns, automation delays and imports can run late. If the scheduler falls behind, the
**Dashboard** shows a warning.

The fix is a real server cron job that calls WordPress every minute. The exact lines to paste
into your host's cron settings are under **Settings → Tools**.
