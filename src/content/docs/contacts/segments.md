---
title: Segments
description: Save a set of conditions as a segment that keeps itself up to date, and use it to filter contacts, choose campaign audiences and export.
sidebar:
  order: 5
---

A segment is a filter you save once and reuse. It holds rules, not people: anyone who matches
the rules is in, and anyone who stops matching drops out. You never add a contact to a
segment by hand.

Use a segment when the group is described by facts about the contact — *subscribed customers
in Germany who opened an email in the last 30 days*. Use a [tag](/contacts/tags/) or
[list](/contacts/lists/) when you decide who is in.

## The segments screen

Go to **Contacts → Segments**. Each segment shows how many **Contacts** match it right now,
how many **Rules** it has, and when it was **Updated**.

![The Segments screen listing saved segments with their live contact counts and number of rules](/images/placeholder.svg)

Choose a segment's name or count to open the contacts table filtered to it. The row menu
offers **View contacts**, **Edit**, **Duplicate** and **Delete**.

If a warning icon appears instead of a count, the rules can no longer be answered — usually
because a field they use was deleted or switched off. Edit the segment and replace that rule.

## Building a segment

1. Choose **New segment**.
2. Give it a name in the title at the top (it starts as *Untitled segment*).
3. Build the rules (below).
4. Choose **Preview** in the **Matching contacts** panel to see how many contacts match and
   who the first of them are. Choose **Refresh** after changing a rule.
5. Choose **Save segment**.

### Rules

Each rule reads as a sentence: a field, a comparison and a value — *Country* *is* *Germany*,
*Last email opened* *is within the last* *30* *days*. The comparisons offered depend on the
field:

- **Text** — **is**, **is not**, **contains**, **does not contain**, **starts with**,
  **ends with**.
- **Numbers** — **is**, **is not**, **is greater than**, **is less than**, **is between**.
- **Choices** — **is**, **is not**, **is any of**, **is none of**; for tags, lists and
  multi-choice fields also **is all of**.
- **Dates** — **is before**, **is after**, **is between**, **is within the last** so many
  days, **is older than** so many days.
- Most fields also offer **is empty** and **is not empty**.

### All or any

At the top, **Contacts matching All / Any of the following** decides how the rules combine.
**All** means every rule must be true; **Any** means one is enough.

To mix the two, choose **Add group**. A group has its own **Match All / Any** switch, so you
can say "subscribed **and** (in Germany **or** in Austria)". Groups can hold groups, up to
three levels deep.

![The segment builder with two rules joined by "and" and a nested group matching any of two countries](/images/placeholder.svg)

### Fields you can use

- **Contact** — name, email, phone, job title, prefix, address, **Country**,
  **Date of birth**, **Source**, **Created**, **Status changed**, and your
  [custom fields](/contacts/custom-fields/).
- **Segmentation** — **Status**, **Type**, **Tags**, **Lists**, and when consent was given.
- **Email activity** — **Last email sent**, **Last email opened**, **Last email clicked**.
- **Automations** and **Sequences** — whether a contact entered, is in, completed or left one
  early.
- **WordPress** — **Last login** and **WordPress role**, for contacts who are site users.
- **Company** — company name, domain, industry, type, country and custom fields, when
  [Companies](/contacts/companies/) is on.

## Saving a filter from the contacts table

You can also build rules on **Contacts** itself: turn on **Advanced filter**, add your rules
and choose **Apply** to see who matches. If you want to keep them, choose **Save as segment**
and give it a name.

## Where segments are used

- **The contacts table** — open a segment to see its members, with a bar naming it above
  the table.
- **Campaigns** — choose segments alongside lists and tags in **To**, or under **Except** to
  leave people out.
- **Automations** — when you add contacts to an automation by hand, you can pick a segment.
- **Export** — choose **A segment** under **Who to export**.

Because a segment is worked out when it is used, a campaign sent to it reaches the people
who match at the moment it goes out.

## Editing, duplicating and deleting

**Edit** reopens the builder. **Duplicate** makes a copy named *(copy)* to change without
touching the original.

**Delete** removes the segment. The contacts it matched are untouched.
