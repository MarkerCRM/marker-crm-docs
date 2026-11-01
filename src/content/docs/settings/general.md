---
title: General
description: How dates are shown in the CRM, and what a WordPress user account does to the contact that belongs to it.
sidebar:
  order: 3
---

The General screen covers two things: how dates read across the CRM, and how WordPress user
accounts and contacts stay connected.

Open it from **Settings → General**.

![The General screen, with Dates and times, WordPress users and Tags by role sections](/images/placeholder.svg)

## Dates and times

**Show dates as** decides how every date in the CRM reads:

- **Time since** — "3 hours ago", "last week". This is the default.
- **The date itself** — the actual date and time.

Three example rows (**A moment ago**, **Last week**, **Last year**) show the result as you
switch. The date format and the first day of the week come from WordPress. Change them
with **Date and time format in WordPress**, which opens **Settings → General** in WordPress.

## WordPress users

These settings decide what happens to a contact when the WordPress user account linked to it
changes. Changes only go one way: WordPress changes the contact, but editing a contact in the
CRM never changes the user account.

| Setting | What it does |
|---|---|
| **Create a contact when somebody registers** | Off by default. On, every new WordPress account gets a contact. |
| **Add to lists** | Appears when the setting above is on. Puts new contacts on these lists. |
| **Add tags** | Appears when the setting above is on. Adds these tags to new contacts. |
| **Keep names and email in step** | Off by default. On, changes to a user's name or email in their WordPress profile are copied to their contact. |
| **Delete the contact when the user is deleted** | Off by default. On, deleting a WordPress user also deletes their contact. |

:::note[Registering is not subscribing]
A contact created when someone registers is **Transactional**, not subscribed. Adding them
to a list does not send them anything until they subscribe. Tags are only labels, so they
don't send anything either.
:::

:::caution[It runs for every account]
**Create a contact when somebody registers** runs for every account the site creates — accounts
an admin adds, WooCommerce customer accounts, and so on — not only people who sign up
on your site.
:::

:::danger[Deleting a user deletes the contact for good]
With **Delete the contact when the user is deleted** on, the contact's timeline, custom field
values and subscriptions are deleted too. You can't undo this.
:::

## Tags by role

Give WordPress roles their own tags. The tags are added when somebody registers and again
whenever their role changes. When the role changes, the old role's tags come off and the new
role's tags go on. Tags you added by hand are left alone.

This only affects users who have a contact — for example, ones created by **Create a
contact when somebody registers**.

1. Choose a role from **Add a role**.
2. In the row that appears, use **Add a tag** to pick up to six existing tags.
3. Use the **×** button (**Remove this role**) to stop tagging that role.

If no role has a tag yet, the section says **No role carries a tag yet.**

This works well with [automations](/automations/): for example, tag everyone with the
`customer` role and start a welcome flow when that tag is added.

## Saving

Click **Save changes** in the bar at the top to keep your changes, or **Discard** to undo
them.
