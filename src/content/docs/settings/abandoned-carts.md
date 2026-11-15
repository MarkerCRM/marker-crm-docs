---
title: Abandoned carts
description: Following up with shoppers who leave items in their WooCommerce or FluentCart cart, and winning the cart back.
sidebar:
  order: 8
---

Abandoned carts come with Marker CRM Pro and work with **WooCommerce** and **FluentCart**, while that store's
integration is on. Switch it on in [Add-ons](/add-ons/), then set it up under **Settings → Abandoned carts**.
Carts you are following up show under **Reports → Abandoned carts**.

## How a cart is followed

1. **Kept.** A cart is kept from the moment the shopper is known: they are signed in, or they type their email at
   checkout. What else they typed — name, phone, address — is kept with it, to fill their contact and the checkout again.
2. **Abandoned.** Left untouched for **A cart is abandoned after** (30 minutes to begin with), it counts as abandoned. The
   shopper becomes a contact if they were not one, and the **Abandons a cart** automation trigger runs.
3. **Won back.** When they pay for an order from it, the cart is **recovered**: the automation stops, the abandoned and
   lost tags and lists come off again, and the order counts in **Carts won back** on the dashboard. Someone who comes back
   another way, with a fresh cart, still wins their left cart back when they pay with the same email.
4. **Lost.** Abandoned for **A cart is lost after** (10 days) without an order, it stops counting as one that can be won
   back.

A reminder email's **Restore the cart** link puts the cart back as they left it and opens the checkout, their details filled
in. With FluentCart this is the very cart FluentCart kept; one FluentCart has since cleared starts again from its first
item.

## Settings

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
