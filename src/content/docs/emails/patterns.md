---
title: Patterns
description: Blocks you save once and reuse in any email — copied in, or synced so one change updates every email that holds them.
sidebar:
  order: 5
---

A pattern is a few blocks you save once and reuse in any email: a sign-off, a social links row,
an offer box, a header. Where a [template](/emails/templates/) is a whole email to start from,
a pattern is a piece you drop into one.

Patterns live under **Emails → Patterns**.

![The patterns list, with each pattern's category and whether it is synced](/images/placeholder.svg)

The list shows each pattern's **Name**, **Category**, whether it is **Synced** or **Copied**,
and when it was **Last modified**. Marker CRM ships no built-in patterns; every pattern in the
list is one your team made.

## Copied and synced

When you make a pattern, the **Synced** box decides how it behaves in emails:

- **Copied** (Synced off) — inserting the pattern copies its blocks into the email. The email
  owns them from then on: you can edit them there, and later changes to the pattern do not
  reach that email.
- **Synced** (Synced on) — the email holds a link to the pattern. Change the pattern, and every
  email that holds it changes too, including emails already scheduled and automation emails.
  The email takes the pattern's content at the moment each message is sent.

Use synced patterns for things that must stay the same everywhere, such as a legal notice or
your current offer. Use copied ones as a starting point you will adapt.

:::caution
A synced change also reaches campaigns that are scheduled but not yet sent, and every future
email in your sequences and automations. Check before you change one that is in use.
:::

## Make a pattern

1. Click **New pattern**.
2. Give it a name in the header (**Untitled pattern**).
3. Choose or type a **Category**. Typing a new one creates it.
4. Tick **Synced** if it should stay linked.
5. Build it in the block editor and click **Save pattern**.

The pattern editor has no email design or footer of its own. A pattern takes on the design of
whichever email it is put in.

## Use a pattern

In the block editor, open the block library (**+**) and go to the **Patterns** tab. Patterns
are grouped by their category; those without one are under **Uncategorized**. Click one to
insert it.

![The block library's Patterns tab, with patterns grouped by category](/images/placeholder.svg)

A synced pattern in an email shows its current content but cannot be edited there. Select it to
see **Synced pattern** in the sidebar, with an **Edit pattern** link that opens the pattern
itself.

You can still set **Visibility** on a synced pattern, to show it only to contacts with certain
tags or lists. See [Show a block to some contacts only](/emails/editor/#show-a-block-to-some-contacts-only).

Patterns are offered only in the block editor, not in the classic or HTML editors.

## Edit a pattern

Click its name, or choose **Edit** from the row menu, then **Save pattern**. A synced pattern's
change reaches every email holding it. A copied pattern's change only affects emails it is
inserted into from now on.

## Delete a pattern

Choose **Delete** from the row menu, or tick several and use the bar that appears.

- Copies already inserted into emails stay where they are.
- Emails that hold it as a **synced** pattern lose that section: it is sent as nothing.

Deleting cannot be undone. In the editor, a synced pattern that no longer exists says
**This pattern no longer exists.**
