---
title: Tools
description: Check that scheduled work is running, retry failed jobs, read the system report, repair indexes and turn on the system log.
sidebar:
  order: 13
---

Tools is where you check that the CRM is healthy. It shows whether background work is
running, what failed, what your server looks like, and what the CRM logged.

Open it from **Settings → Tools**.

![The Tools screen, with four status cards above the Background jobs, Diagnostics and System log tabs](/images/placeholder.svg)

## Status cards

| Card | What it shows |
|---|---|
| **Scheduled tasks** | **Running**, **Waiting** (jobs are waiting and nothing is running them), or **Late** (nothing has run the schedule recently). Also when it last ran. |
| **Sending queue** | How many jobs are waiting, and how many failed. |
| **Delivery** | The mailer plugin sending your email, or **WordPress default** if there isn't one. See [Email defaults](/settings/email/). |
| **Server** | PHP version, WordPress version, and memory used against the limit. |

## Background jobs

Campaigns, automations, imports and exports all run in the background. This tab shows
whether that is working.

### Is the schedule running?

The box at the top says one of:

- **Scheduled work is running** — all is well.
- **Jobs are waiting and nothing is running them** — WordPress cron only runs when somebody
  visits the site, so a quiet site can stall.
- **Nothing has run the schedule recently** — campaigns, automations and imports are waiting.

WordPress cron only runs when someone visits the site, so timed sends can go out late. A
server cron runs it every minute. The box gives two commands to copy into your host's cron
settings:

- **Server cron, every WordPress task** — recommended. After adding it, add
  `define('DISABLE_WP_CRON', true);` to `wp-config.php`.
- **Server cron, Marker only** — runs only Marker CRM's queue. Leave WP-Cron on with this
  one, because other plugins still need it.

:::tip
If campaigns go out late or imports stall, set up a server cron. It fixes most queue problems.
Your host's control panel (cPanel, Plesk and so on) usually has a **Cron jobs** screen.
:::

### Scheduled work

Two tasks, each showing when it runs next, with **Run now**:

- **Background jobs** — sends what is waiting, a batch at a time.
- **Maintenance** — runs daily. Deletes finished jobs, old log entries and uploaded files,
  following the times set under [Privacy and data](/settings/privacy/).

### Queues and failed jobs

**Queues** lists each queue with how many jobs are **Waiting**, **Running** and **Failed**,
and when the **Oldest** one was added.

If anything failed, **Failed jobs** lists the 25 most recent with the job, the **Error** and
the number of **Attempts**. Click **Retry** on one, or **Retry all**, to queue them again.
Fix whatever caused the error first, such as a mailer that rejects your login, or the job
will fail again.

## Diagnostics

- **System** — details of your server and site. Use **Copy system report** and
  paste it into a support request.
- **Indexes** — the database indexes sending and lookups depend on. If an upgrade was
  interrupted, one can go missing. Nothing breaks, but things get slower. When any are
  **Missing**, click **Repair** to recreate them safely. **Re-check** reads them again.
- **Tables** — each CRM table with its row count and size.

## System log

**Record what the CRM does** turns on debug logging. It's off by default. When on, the CRM
logs failures it would otherwise hide. It never logs email content. Entries are deleted
after the time set under **System logs** on [Privacy and data](/settings/privacy/).

Filter the log by **All**, **Error**, **Warning** or **Info**, search it with **Search the
log…**, and use **Refresh** to load new entries. **Clear** deletes every entry. Anything
logged after that is still recorded.

:::note
Turn logging on while you look into a problem, and off again afterwards. With it off, the
log stays empty: **Failures appear here while logging is on.**
:::

The debug logging switch saves with **Save changes** in the bar at the top.
