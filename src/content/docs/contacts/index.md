---
title: Contacts
description: Find, add, edit and delete contacts, read a contact's record, and understand what each email status means for sending.
sidebar:
  order: 1
---

A contact is one person, identified by their email address. Everything else in the CRM —
lists, tags, segments, campaigns, automations — is about contacts. Open **Contacts** in the
CRM's sidebar to see them all.

## The contacts table

![The Contacts table with status pills above it, a search box, filter buttons and columns for Email, Tags, Lists, Status and Added](/images/placeholder.svg)

The header shows how many contacts you have. Above the table, status pills — **All**,
**Subscribed**, **Pending**, **Unsubscribed** and so on — show a count for each
[email status](#email-statuses). Choose one to show only those contacts.

### Columns

By default the table shows **Email**, **Tags**, **Lists**, **Status** and **Added**. Use the
column picker in the toolbar to add others: **Type**, **Name**, **Phone**, **Prefix**,
**Job title**, **Company** (when [Companies](/contacts/companies/) is on), **Date of birth**,
the address fields, **Source**, and any [custom fields](/contacts/custom-fields/) you have
made. **Email** is always shown. Next to the column picker, the density toggle makes rows
tighter or roomier.

You can sort by **Name**, **Status** and **Added**.

### Search and filters

- **Search name or email…** matches first name, last name or address.
- The filter buttons narrow the table by **Type**, **Tags**, **Lists** and, with Companies
  on, **Company**. A tag or list filter shows contacts currently in it — someone who has
  unsubscribed from a list is not counted as in it.
- **Advanced filter** swaps the quick filters for the full condition builder — the same one
  [segments](/contacts/segments/) use. Build your conditions, choose **Apply**, and the table
  shows who matches. **Save as segment** keeps the conditions under a name so you can come
  back to them.

Filters are kept in the page address, so you can bookmark a filtered view or share the link
with a colleague.

When the table is filtered by a segment, a bar above it names the segment and its count.
Choose the **×** in that bar to clear it.

### Bulk actions

Tick contacts to open the bulk bar. It offers:

- **Add tags** / **Remove tags**
- **Add to lists** / **Remove from lists**
- **Change status** — sets the email status of every selected contact.
- **Change type** — **Lead** or **Customer**.
- **Add to an automation** / **Add to a sequence** — puts them into one that is switched on.
  Shown to people who can edit automations.
- **Delete**

### Exporting from the table

The download button in the toolbar opens [Export](/contacts/export/). If the table is
filtered by a segment, the export starts with that segment chosen; otherwise it starts with
every contact.

## Adding a contact

1. Choose **New contact**.
2. Fill in **Email** — it is the only required field — and whatever else you know: **Prefix**,
   **First name**, **Last name**, **Phone**, **Date of birth**, and **Company** when Companies
   is on.
3. Under **Segmentation**, set the **Status** and add **Tags** and **Lists**. You can type a
   new tag or list name to create it on the spot.
4. Open **Add address info** or **Add custom fields** if you need them.
5. Choose **Add**.

The status starts as **Subscribed**, or as **Pending** when double opt-in is switched on
under **Settings → Opt-in & unsubscribe**. A Pending contact is sent the confirmation email
and becomes Subscribed when they click its link.

If someone says the confirmation never arrived, open their page and choose **Send double
opt-in email** under their stats. It is offered only while they are Pending, needs permission
to edit contacts, and is refused if double opt-in has been switched off or the address is on
the suppression list.

If the address already belongs to a contact, that contact is updated rather than duplicated.
Each email address belongs to one contact only.

When Companies is on and the new contact's email domain matches a company's domain, the
contact is linked to that company. Shared mailbox domains such as gmail.com are never
matched.

## A contact's record

Choose a contact's email in the table, or **View** from its row menu, to open their record.
The arrows in the header step to the previous and next contact in the list you came from.

![A contact record: name and status badges at the top, engagement figures, tag and list chips, and the Overview tab below](/images/placeholder.svg)

### The header

- **Name** and three badges you can change in place: the **Email status**, the
  **Contact type**, and — when they have a phone number — the **SMS status**. Hover a status
  that stops email to see why, and when it changed.
- The email address (choose it to copy), the date they were **Added**, and their WordPress
  role if they are a registered user.
- Engagement once they have been emailed: how many emails they **received**, **opened** and
  **clicked**, with rates, and their **Last activity**. Choose the clicked count to see which
  links they followed.
- **Tags** and **Lists** as chips. Add or remove them right here; type a new name to create
  one.

### Tabs

- **Overview** — basic information, address and [custom fields](/contacts/custom-fields/).
  Edit custom field values in place, or choose **Configure** to manage the fields themselves.
- **Activity** — one timeline of notes, emails sent and bounced, and status changes, newest
  first. Filter it by **Notes**, **Email** or **System**.
- **Notes** — write a **Note**, or log a **Call**, **Meeting** or **Email** that happened
  outside the CRM, with **When it happened**. Notes can be pinned to the top, edited and
  deleted.
- **Emails** — every email sent to them, with opens and clicks. **See what we sent** shows
  the email as they received it. Shown to people who can view logs.
- **Automations** — the automations and sequences they are in, or have been through.

With Companies on, an **Additional information** panel beside the tabs lists the contact's
companies. See [Companies](/contacts/companies/).

### Sending a direct email

**Send email** opens a composer addressed to this one contact. Write a subject and the
message, preview it, and choose **Send**. It goes out within the minute, through the same
queue as every other email, and appears in their **Emails** tab.

A direct email can only go to a contact whose status is **Subscribed** or **Transactional**.
If they cannot be emailed, the composer tells you why — no address, not subscribed, or an
address that stopped taking email after a bounce or complaint.

## Editing a contact

Choose **Edit** on the record, or from the row menu in the table. The same form opens with
their details filled in; choose **Save**. Status, type, tags and lists can also be changed
directly in the record's header.

## Email statuses

A contact's email status decides what they can be sent.

| Status | What it means | Campaigns and automations | Direct and account emails |
|---|---|---|---|
| **Subscribed** | They agreed to hear from you. | Yes | Yes |
| **Pending** | Waiting for confirmation — they have not clicked the opt-in link yet. | No | Account emails only |
| **Transactional** | A customer or user who never opted in to marketing. | No | Yes |
| **Unsubscribed** | They unsubscribed. | No | No |
| **Bounced** | Their address bounced, so email to it is not delivered. | No | No |
| **Complained** | They marked one of your emails as spam. | No | No |
| **Spammed** | Marked as a spam sign-up. | No | No |

**Bounced** and **Complained** also put the address on a suppression list. If you change one
of these contacts back to a sending status, the CRM asks **Email this contact again?** first,
because emailing an address that bounced or complained can hurt your sending reputation.
Confirming releases the address.

### Contact type

Each contact is a **Lead** or a **Customer**. The type is a label for you; it does not change
what they are sent.

## Deleting contacts

Delete one contact from its row menu or from **More actions → Delete contact** on its record.
Delete several by ticking them and choosing **Delete** in the bulk bar.

:::danger[Deleting is permanent]
There is no trash. Deleting a contact removes them together with their tags, lists,
subscriptions, custom field values, notes, company links and automation history. It cannot
be undone. If you only want to stop emailing someone, change their status to
**Unsubscribed** instead.
:::
