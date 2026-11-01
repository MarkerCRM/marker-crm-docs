---
title: Companies
description: Turn on the Companies add-on, keep the businesses your contacts work for, and link contacts to them.
sidebar:
  order: 4
---

Companies keep the businesses your contacts work for, so you can see everyone at one of them
together. It is optional, and off until you turn it on.

## Turning Companies on or off

1. In the CRM's sidebar, open **Add-ons**.
2. Switch on **Companies**. The page reloads, and **Companies** appears as a tab under
   **Contacts**.

Switching it off hides companies everywhere — the tab, the **Company** column and filter on
contacts, company conditions in segments, the company field on imports. The data stays, and
comes back when you switch it on again.

![The Add-ons screen with the Companies switch turned on](/images/placeholder.svg)

## The companies screen

Go to **Contacts → Companies**. Pills above the table filter by company type — **All**,
**Prospect**, **Customer**, **Partner**, **Vendor**, **Other** — with a count for each.

- **Search name or domain…** finds a company by either.
- Filter buttons narrow by **Industry** and by number of **Employees**.
- The default columns are **Company**, **Owner**, **Industry**, **Type**, **Employees** and
  **Contacts**. The column picker adds **Added**, **Revenue**, **Email**, **Phone**,
  **Website**, **Domain**, the address fields, **Description** and any company custom
  fields.
- Tick companies to **Set industry**, **Set type** or **Delete** them in bulk.
- The download button exports companies; **Import** brings them in from a CSV.

## Adding a company

Choose **New company** and fill in what you know:

- **Basic information** — **Logo**, **Name** (required), **Website**, **Email**, **Phone**,
  and an **Owner** from your WordPress users.
- **Business details** — **Industry**, **Type** (what they are to you, not what they do),
  **Employees**, **Annual revenue** and a **Description**.
- **Add address info**, **Add social profiles** and **Add custom fields** open more fields.

Choose **Add**. If you give a website, its domain is stored with the company — that domain
is what links new contacts to it automatically.

## A company's record

Open a company to see its header — logo, name, **Type**, email, when it was **Added**, and
how many **People** work there — and a **Company** panel with its industry, details,
address and social links.

The tabs are:

- **People** — the contacts at this company. Search them, add with **Add existing** or
  **New contact**, and use the bulk bar to tag them, add them to lists, change their status,
  export them, **Remove from company** or delete them.
- **Activity** and **Notes** — notes, calls and meetings logged against the company.

## Linking contacts to companies

A contact can belong to more than one company. One of them is their **Primary** company.

- **From the contact:** on the contact's record, the **Companies** panel lists their
  companies. Choose **+** to add one, or **Create a company** from the same picker. Each
  company's menu has **Edit**, **Open record**, **Make primary** and **Remove from
  company**.
- **From the company:** in its **People** tab, **Add existing** picks contacts who are not
  there yet; **New contact** creates one already linked.
- **In the contact form:** the **Company** field in **New contact** and **Edit**.
- **Automatically, by email domain:** when a contact is created and their email domain
  matches a company's domain, they are linked to it. Shared mailbox domains such as
  gmail.com, outlook.com and icloud.com are never matched.
- **On import:** map a CSV column to **Company**. A company with that name (matched without
  regard to capitals) is used, or created if there is none.

Removing a contact from a company leaves both the contact and the company in place.

![A contact record's Companies panel listing two companies, one marked Primary](/images/placeholder.svg)

## Importing and exporting companies

**Import** on the companies screen opens the CSV import for companies. **Name** is required,
and companies are matched by name, so an existing company is skipped or updated rather than
duplicated. Two columns are special:

- **Owner email** sets the company's owner to the WordPress user with that address.
- With **Add the owner as a contact** ticked, the owner email and **Owner name** also create
  a contact linked to the company. They start as **Transactional** — a column in a file is
  not consent to market to them.

The rest works like [importing contacts](/contacts/import/). Exports work like
[exporting contacts](/contacts/export/), with company columns.

## Deleting a company

Delete from the row menu, the bulk bar, or **More actions → Delete company** on its record.
The company is removed; its contacts stay, without a company. This cannot be undone.
