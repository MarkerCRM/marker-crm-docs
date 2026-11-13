---
title: General
description: How dates and amounts read in the CRM, and what a WordPress user account does to the contact that belongs to it.
sidebar:
  order: 3
---

The General screen covers how dates and amounts read across the CRM, and how WordPress user
accounts and contacts stay connected.

Open it from **Settings → General**.

![The General screen, with Dates and times, Currency, WordPress users and Tags by role sections](/images/placeholder.svg)

## Dates and times

**Show dates as** decides how every date in the CRM reads. Each choice shows an example beside it:

| Choice | Example |
|---|---|
| **Time since** (the default) | 3 days ago |
| **M j, Y** | Mar 2, 2026 |
| **M j, Y g:i a** | Mar 2, 2026 2:30 pm |
| **F j, Y** | March 2, 2026 |
| **F j, Y g:i a** | March 2, 2026 2:30 pm |
| **Y-m-d** | 2026-03-02 |
| **Y-m-d H:i** | 2026-03-02 14:30 |
| **m/d/Y** | 03/02/2026 |
| **d/m/Y** | 02/03/2026 |
| **d.m.Y H:i** | 02.03.2026 14:30 |

A choice without a time shows only the date in lists. Where a time matters, such as a scheduled
send, it is added after the date. With **Time since**, those places use **M j, Y g:i a**. Month
names come from the site's language.

## Currency

How amounts read in Deals: deal values, reports and emails.

| Setting | What it does |
|---|---|
| **Currency** | The one currency the CRM uses. While none is chosen and WooCommerce is active, the store's currency is used. Changing it relabels every amount already recorded; nothing is converted, and the screen warns you before you save. |
| **Symbol position** | **Left** ($100), **Right** (100$), **Left with space** ($ 100) or **Right with space** (100 $). |
| **Thousand separator** | The character between thousands, such as `,` in 1,000. It can be a space, or left empty. |
| **Decimal separator** | The character before the decimals, such as `.` in 10.50. |
| **Number of decimals** | How many decimals an amount shows, from 0 to 4. |

A store's own amounts, such as WooCommerce orders and carts, always read in that store's currency
and format, not these.

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
