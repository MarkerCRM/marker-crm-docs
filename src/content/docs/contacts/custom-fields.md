---
title: Custom fields
description: Add your own fields to contacts and companies — the field types, groups, and everywhere a custom field shows up.
sidebar:
  order: 6
---

Custom fields hold whatever a contact has no built-in place for — a renewal date, a lead
source, an account tier. Once you add one, it appears on every contact's record, in the
contacts table, in segments, imports and exports, and in automations.

## The custom fields screen

Go to **Contacts → Custom Fields**. Each field shows its **Label**, **Slug**, **Group**,
**Type** and when it was **Created**. A red asterisk marks a required field. Search with
**Search fields…**.

When [Companies](/contacts/companies/) is on, a switch at the top chooses whether you are
looking at the fields for **Contacts** or for **Companies**. Each has its own set.

![The Custom Fields screen with fields grouped as General, Marketing and Sales, and a drag handle on each row](/images/placeholder.svg)

The order here is the order fields appear in on a record. Drag a row by its handle to move
it, or use **Move up** and **Move down** in its menu.

You can also manage fields without leaving a contact: choose **Configure** in the custom
fields section of the contact's **Overview** tab.

## Adding a field

1. Choose **New field**.
2. Enter a **Label** — what people see, such as *Renewal date*.
3. Check the **Slug**. It is made from the label and **cannot be changed after saving**. It
   cannot be the name of a field the CRM already has, such as `first_name` or `email`.
4. Choose a **Type** (below).
5. Optionally choose a **Group** — pick an existing one, or type a new name and choose
   **Create group**.
6. Add **Help text** if the field needs explaining; it is shown under the field.
7. For a type with choices, fill in the **Options** — one box per option, with
   **Add option** for another.
8. Tick **Required** to mark the field as required in the contact form.
9. Choose **Add**.

## Field types

| Type | Holds |
|---|---|
| **Single line text** | A short piece of text |
| **Paragraph** | Longer text over several lines |
| **Number** | A number |
| **Date** | A date |
| **Dropdown** | One choice from a list of options |
| **Multi-select** | Several choices from a list of options |
| **Radio buttons** | One choice, shown as buttons |
| **Checkboxes** | Several choices, shown as checkboxes |
| **Yes / no** | A single tick box |
| **Email** | An email address |
| **URL** | A web address |
| **Phone** | A phone number |

## Groups

Groups gather related fields under a heading — *Sales*, *Support* — on a contact's record and
in the **New contact** form. A group exists while at least one field uses it; there is
nothing else to create or delete.

## Where custom fields appear

- **A contact's record** — in the **Overview** tab, under their group headings. Choose
  **Edit** there to change the values in place.
- **The New contact and Edit forms** — under **Add custom fields**.
- **The contacts table** — add any custom field as a column with the column picker.
- **Segments** — every custom field can be used as a rule, with comparisons that suit its
  type. See [Segments](/contacts/segments/).
- **Import** — map a CSV column to a custom field. See [Import](/contacts/import/).
- **Export** — choose custom fields as columns. See [Export](/contacts/export/).
- **Automations** — the **Update contact fields** step can set a custom field's value, and
  a **Date** field can start the **A date on the contact** trigger, such as a renewal
  reminder a few days before the date.

:::note
Custom fields are not available as merge tags in emails today.
:::

## Editing, duplicating and deleting

**Edit** changes everything except the slug. **Duplicate** makes a copy with *(copy)* added
to the label.

**Delete** removes the field and every value stored against it, from all contacts. This
cannot be undone. Check any segment or automation that used the field.
