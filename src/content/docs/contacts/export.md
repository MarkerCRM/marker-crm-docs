---
title: Export contacts
description: Download contacts as a CSV or JSON file — everyone, a segment or a selection — with the columns you choose.
sidebar:
  order: 8
---

Export builds a file of your contacts to download — for a spreadsheet, a backup or another
tool. You choose who goes in, which columns, and the format. Exporting needs the export
permission, which administrators have.

## Opening Export

- From **Contacts**, choose the download button in the table's toolbar. If the table is
  filtered by a segment, the export starts with that segment chosen.
- From **Contacts → Import**, choose **Export contacts**.
- From a company's **People** tab, tick contacts and choose **Export** to export only those.

![The Export screen with Who to export, the Columns checklist grouped by Contact, Address, Organise and Record, and the Format choice](/images/placeholder.svg)

## Who to export

Choose one:

- **Every contact**
- **A segment** — then pick the **Segment**. See [Segments](/contacts/segments/).
- **The contacts you selected** — offered when you came from a selection.

The number that will be exported is shown beside your choice.

To take a slice, fill in **Export at most** and **Skip the first**. Leave both empty for
everyone. Together they are how a very large list is exported in pieces — for example, the
first 50,000, then **Skip the first** 50,000 for the next file.

## Columns

Tick the columns you want, or **All columns**. They are grouped:

- **Contact** — **Email**, **SMS** (the phone number), **First name**, **Last name**,
  **Prefix**, **Job title**, **Status**, **Contact type**, **Source**.
- **Address** — the address lines, **City**, **State**, **Postal code**, **Country** and
  **Date of birth**.
- **Organise** — **Tags**, **Lists**, and **Company** when [Companies](/contacts/companies/)
  is on.
- **Record** — **ID**, **Created**, **Updated**.
- Your [custom fields](/contacts/custom-fields/).

Tick a group's name to take all of its columns. **Reset** goes back to the default set:
**Email**, **First name**, **Last name**, **Status** and **Tags**.

## Format

- **CSV — opens in any spreadsheet.** Tags, lists and multi-choice fields are written in one
  cell, separated by commas.
- **JSON — keeps tags and multi-value fields as lists.** Use it when the file is going into
  another program.

In a CSV, a cell that starts with `=`, `+`, `-` or `@` is written with a leading apostrophe,
so a spreadsheet shows it as text instead of running it as a formula. Marker CRM's own import
removes the apostrophe again.

## Running the export

Choose **Export**. The file is built in the background, and a progress bar shows how far it
has got. **You can leave this page — the file is built in the background.**

When it is done, **Your file is ready** shows how many contacts and columns it holds.
Choose the file name — such as `contacts-2026-11-01.csv` — to download it, or **Export
something else** to start another.

**Stop the export** cancels it. Nothing is kept; start again when you are ready.

:::caution[The file holds personal data]
An export contains everything you ticked about every contact in it. Store and share it
accordingly. The copy on your server is deleted after the time set under
**Settings → Privacy and data → Uploaded files** — 24 hours unless you change it.
:::

## Exporting companies

With [Companies](/contacts/companies/) on, **Export companies** on the companies screen opens
the same page for companies, with **Every company** or **The companies you selected** and
company columns.
