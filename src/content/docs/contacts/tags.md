---
title: Tags
description: Private, coloured labels for sorting contacts — how they differ from lists, and how to create, apply and delete them.
sidebar:
  order: 2
---

Tags are private labels for your own sorting. Contacts never see them. Use a tag for anything
you want to group people by — *Webinar attendee*, *VIP*, *Asked for a demo* — without building
a segment.

## Tags or lists?

| | Tags | [Lists](/contacts/lists/) |
|---|---|---|
| What it is | An internal label | Something people subscribe to |
| Seen by the contact | Never | When the list is shown on the preference page |
| Removing someone | The tag is deleted from them | They are marked unsubscribed from it, and the history is kept |
| Colour | Yes | No |
| Own double opt-in email | No | Optional |

If a contact should be able to leave it, make it a list. If it is a note to yourself, make it
a tag.

## The tags screen

Go to **Contacts → Tags**. Each tag shows its colour, its **Name**, how many **Contacts**
carry it, and when it was **Created**. Search with **Search tags…**, and sort by name.

![The Tags screen: a coloured dot and name for each tag, its contact count and its created date](/images/placeholder.svg)

Choose a tag's name or its count to open the contacts table filtered to that tag. The row
menu offers **View contacts**, **Edit** and **Delete**.

## Creating a tag

1. Choose **New tag**.
2. Enter a **Name**. The **Slug** fills itself in from the name; change it now if you want a
   different one, because it **cannot be changed after saving**.
3. Pick a **Colour** from the presets, or choose your own.
4. Choose **Add**.

You can also create a tag wherever you choose tags — in a contact's header, in the **New
contact** form, or in the import options — by typing a name that does not exist yet. Tags
named in a tags column of an imported CSV are created for you too.

## Applying tags

- **One contact:** on their record, use **Add tags** in the header, or the **Tags** field in
  **Edit**.
- **Many contacts:** tick them in the contacts table and choose **Add tags** or
  **Remove tags** in the bulk bar.
- **Everyone in an import:** choose tags under **Add tags** in the import options.
- **Automatically:** the automation steps **Add a tag** and **Remove a tag**, and the
  triggers **Tag is added** and **Tag is removed**.

## Where tags are used

- Filtering the contacts table, and as a condition in [segments](/contacts/segments/).
- Choosing who a campaign goes to, or who to leave out.
- Starting automations, and checking for a tag inside one.

## Editing and deleting

**Edit** lets you rename a tag or change its colour. The slug stays as it was.

**Delete** removes the tag from every contact. The contacts themselves are untouched. To
delete several at once, tick them and choose **Delete** in the bulk bar.

:::caution
A deleted tag cannot be restored. Automations or segments that relied on it no longer match
anyone through it.
:::
