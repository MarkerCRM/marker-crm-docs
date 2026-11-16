---
title: Abandoned carts
description: Following up with shoppers who leave items in their WooCommerce or FluentCart cart, and winning the cart back.
sidebar:
  order: 8
---

Abandoned carts come with Marker CRM Pro and work with **WooCommerce** and **FluentCart**. It is an add-on: open
**Settings → Add-ons → Abandoned carts** and turn it on. The page has a card for each store you run, with its own switch,
**Keep abandoned carts for WooCommerce** (or FluentCart), and the order statuses that count as bought there; everything
below the store cards — timing, privacy, who is left out, and what happens to the contact — is shared by every store.
Carts from every store show together under **Reports → Abandoned carts**; while no store is switched on, the report says
so, with a button to the settings.

## How a cart is followed

1. **Kept.** A cart is kept from the moment the shopper is known: they are signed in, or they type their email at
   checkout. What else they typed — name, phone, address — is kept with it, to fill their contact and the checkout again.
2. **Abandoned.** Left untouched for **A cart is abandoned after** (30 minutes to begin with), it counts as abandoned. The
   shopper becomes a contact if they were not one, and the store's **Abandons a cart** automation trigger runs — it
   sits with that store's other triggers, under FluentCart or WooCommerce, with a ready-made reminder for each store.
3. **Won back.** When they pay for an order from it, the cart is **recovered**: the automation stops, the abandoned and
   lost tags and lists come off again, and the order counts in **Carts won back** on the dashboard. Someone who comes back
   another way, with a fresh cart, still wins their left cart back when they pay with the same email.
4. **Lost.** Abandoned for **A cart is lost after** (10 days) without an order, it stops counting as one that can be won
   back.

A reminder email's **Restore the cart** link puts the cart back as they left it and opens the checkout, their details filled
in. With FluentCart this is the very cart FluentCart kept; one FluentCart has since cleared starts again from its first
item.

## Settings

For each store, on its card:

| Setting | What it does |
|---|---|
| **Keep abandoned carts for WooCommerce** / **FluentCart** | Keeps that store's carts. Off, the store keeps none and its **Abandons a cart** trigger cannot start. |
| **A cart is recovered when its order is** | The order statuses that win a cart back. Processing and Completed to begin with; tick **On hold** if you take bank transfers, cheques or other offline payments, so the reminders stop once they order. WooCommerce also offers **Pending payment**. |

Shared by every store:

| Setting | What it does |
|---|---|
| **A cart is abandoned after** | Minutes a cart can sit untouched before it counts as left behind. |
| **A cart is lost after** | Days an abandoned cart can still be won back. |
| **Cool-off after an order** | Someone who ordered this recently is not reminded about a cart they left. 0 reminds everyone. |
| **Tell shoppers at checkout, with a way to opt out** | A line under the checkout's email field. Recommended where privacy law such as GDPR applies. |
| **Message** | Its words. `{{opt_out label="No thanks"}}` is the link that lets them opt out: put it where it should go and change its words as you like. Left out, a "No thanks" link follows the message. A shopper who opts out has that cart dropped and no other kept on that browser. |
| **Signed-in users with these roles** | Their carts are never kept, such as your own staff testing the store. |
| **Status for new contacts** | For shoppers new to the CRM. Leaving a cart is not consent to marketing, so it starts at **Transactional**. |
| **Add to these lists / Tag them when a cart is abandoned**, **… is lost** | Taken off again when they order. |
