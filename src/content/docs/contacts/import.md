---
title: Import contacts
description: Bring contacts in from a CSV file — mapping columns, choosing what happens to existing contacts, setting consent, and following the import in the background.
sidebar:
  order: 7
---

Import brings contacts in from a CSV file — any spreadsheet saved as `.csv`. The import runs
in the background, so a file of tens of thousands of rows is fine.

Go to **Contacts → Import**, or choose **Import** on the contacts screen. The import moves
through four steps: **Source**, **Map columns**, **Review** and **Import**.

## Where contacts can come from

**CSV file** is the source that works today. The **This site** and **Another service**
tiles list WordPress users, WooCommerce customers, FluentCRM, Groundhogg, Jetpack CRM,
Mailchimp, Kit, MailerLite and ActiveCampaign, each marked **Soon** — they cannot be chosen
yet. To bring those contacts in now, export them from the other tool as a CSV.

:::tip[New WordPress users]
To make every new site registration a contact as it happens, turn on **Create a contact when
somebody registers** under **Settings → General**.
:::

## 1. Upload the file

Drop the file on the upload area, or choose **Browse files**. The upload area then shows the
file name and how many rows it has.

- **The first row must be column headings.**
- Commas, semicolons, tabs and pipes are all recognised as separators.
- Files saved as UTF-8, UTF-16 or Latin-1 are converted for you.
- Only CSV is accepted. A spreadsheet (`.xlsx`), PDF or zip is refused even if renamed —
  open it in your spreadsheet program and save it as CSV first.

**Download a sample file** gives you a CSV with the usual columns to copy.

![The Import screen's Source step: a CSV file tile selected and a file dropped in, showing its name and row count](/images/placeholder.svg)

## 2. Map columns

Each column in your file is listed with a sample value. Beside it, choose the contact field it
fills, or leave it as **Not imported**. Columns with familiar headings — *E-mail*, *Surname*,
*Zip*, *Phone* — are matched for you; check them.

- **Email** must be mapped. It is how contacts are matched and deduplicated, and **Continue**
  stays disabled until it is.
- **SMS** takes a phone number.
- **Tags** and **Lists** take one or more names in a cell, separated by `|`, `;` or `,`.
  Names that do not exist yet are created.
- **Company** (when [Companies](/contacts/companies/) is on) links each contact to the
  company of that name, creating the company if there is none.
- Any [custom field](/contacts/custom-fields/) can be a target.

Each field can be chosen for only one column.

The options for the whole import sit beside the mapping.

## Import options

### Status for new contacts

The email status every **new** contact is given: **Subscribed**, **Pending**,
**Unsubscribed** or **Transactional**.

:::caution[Consent is yours to prove]
Only import as **Subscribed** if these people agreed to receive your email. Customers who
bought from you, or people from a list you were given, should come in as **Transactional** —
they can still be sent account and direct emails, but no campaigns or automations.
:::

If you choose **Pending**, tick **Email them a confirmation link** to send each one the
double opt-in email. They become Subscribed when they click it; the emails go out at your
sending speed. Leave it unticked and they stay Pending, unemailed, until something asks them
to confirm. If double opt-in is off for the site, nothing is sent and they stay Pending.

### Existing contacts

What to do when a row's email address already belongs to a contact:

- **Skip them** — contacts already here are left alone. The tags and lists you choose below
  are not applied to them either.
- **Update them** — every mapped column is written over what is there.
- **Only fill empty fields** — only fields that are empty are filled in.

When updating, **Update their status too** is off by default, so existing contacts keep the
status they have. Turn it on only if the file's status is the one you want — otherwise the
import would turn everybody who unsubscribed back into a subscriber.

### Add tags and Add to lists

Tags and lists here are added to every new contact, and to every updated one. You can type a
new name to create it.

### Let these contacts enter automations

Off by default. While it is off, imported contacts do not start any automation — no welcome
series fires for a list they were added to, no follow-up for a tag. Turn it on only when you
want that to happen; otherwise a large import would email everybody in it.

## 3. Review

Check the numbers — **Rows in file**, **Columns mapped**, **Columns skipped** — and the
**First rows, as they will be imported**. Choose **Back** to change anything, or
**Start import**.

## 4. Import

A progress bar shows how many rows are done and how many were created, updated, skipped or
failed so far.

**You can leave this page — the import continues in the background.** It works through 500
rows at a time on the CRM's background queue, which runs every minute. If an import seems
stuck, check that WordPress cron is running; see
[Installation](/getting-started/installation/#background-work).

**Stop the import** cancels it. Rows already imported stay; the rest are not read.

When it finishes you see four totals:

- **Created** — new contacts.
- **Updated** — existing contacts changed.
- **Skipped** — existing contacts left alone because of **Skip them**.
- **Failed** — rows that could not be saved, such as a missing or invalid email address.

If any rows failed, **Download failed rows** gives you a CSV of them with the reason for
each. Fix them and import that file.

![A finished import showing Created, Updated, Skipped and Failed totals, with a Download failed rows button](/images/placeholder.svg)

## Your uploaded file

The uploaded file is kept only as long as **Settings → Privacy and data → Uploaded files**
says — 24 hours unless you change it — and then deleted.
