---
title: Integrations
description: The plugins Marker CRM works with, where each one stands, and what WooCommerce gives you with and without Pro.
sidebar:
  order: 9
---

**Settings → Integrations** lists the plugins Marker CRM can work with, grouped by category, with what needs your
attention first. Search by name, or narrow the list with the category menu.

![The Integrations screen: WooCommerce under E-commerce, marked Active, with its Manage button](/images/placeholder.svg)

## What each row says

| Status | What it means |
|---|---|
| **Active** | The plugin is active and the integration is running. |
| **Not installed** | The plugin isn't on this site. Install it from **Plugins → Add New** and the integration starts on its own. |
| **Not active** | The plugin is installed but switched off. Activate it under **Plugins**. |
| **Pro** | The integration comes with Marker CRM Pro. |
| **Not connected** | It needs its keys first: open it and click **Connect**. |
| **Off** | It has a switch on its row, and the switch is off. |
| **Paused** | You paused it. Nothing new comes in until you resume it. |
| **Needs attention** | It failed ten times in a row. Click **Fix** to see what went wrong and try again. |

A failure never stops what the other plugin was doing: a WooCommerce checkout goes through even if Marker CRM
can't record it. The failure is written to the integration's log instead.

## Managing an integration

Click **Manage** to open an integration's page. It has its settings, if it has any, and **Elsewhere in Settings**
links to the Settings pages it adds options to.

## WooCommerce

The WooCommerce integration comes with Pro, and its row is marked **Pro** until you have it. Some of what Marker
CRM does with WooCommerce works without Pro all the same, because it reads your store directly.

### Without Pro

- **Customers who create an account** become contacts when **Create a contact when somebody registers** is on
  under [General](/settings/general/).
- **Billing addresses** a customer saves in their account are copied to their contact.
- **Purchase history** on each contact: their orders, guest orders placed with the same email included, and a
  summary of what they have spent beside the store's average. Their orders also show in the contact's activity.
- **The Product block** puts one of your products in an email, with its picture, price and a button. The price is
  the one in your shop when the email is sent.

Automations, reports and segments built on WooCommerce come with Pro. You can see them in the automation builder
marked **Pro**.

### With Pro

- **A consent box at checkout**, classic and block, set under **Checkout** on the WooCommerce **Manage** page:
  **Ask for consent at checkout**, its **Label**, **Ticked to begin with** (leave it off: consent has to be given,
  not assumed), **Leave it out for customers already subscribed**, and the lists and tags to add. A customer who
  ticks it is subscribed when the order is placed, or asked to confirm first when double opt-in is on. One who
  leaves it unticked is not subscribed.
- **Every customer becomes a contact** when they order, guests too if you choose, with the default lists, tags and
  status you set on the **Manage** page. **Import now** brings in customers who bought before.
- **Lifetime value, orders, and first and last order** on each contact, as columns in the contact list and as
  segment rules.
- **Automation triggers:** **New order (paid)**, **Order completed**, **Order status changed**, **Order is
  refunded**, **Hasn't ordered in a while**, **Lifetime value reached**, **Product reviewed**, and the
  WooCommerce Subscriptions events.
- **Automation steps:** **Create a coupon**, **Change the order's status**, **Add order note**.
- **A tab on each product** that tags its buyers when they pay and changes the tags when they are refunded.
- **Checkout filled in** with the name and email of a visitor who came from one of your emails.
- **Revenue** credited to the email the buyer came from, on campaign and automation reports and the dashboard.
- The [WooCommerce report](/reports/woocommerce/) and [abandoned carts](/settings/abandoned-carts/).

## SureCart

The SureCart integration comes with Pro, and its row is marked **Pro** until you have it. With Pro:

- **Everyone who pays becomes a contact**, with the **Default lists**, **Default tags** and **Status for new
  contacts** you set on the SureCart **Manage** page. New customers start as **Transactional**: a purchase is not
  permission to send them marketing. Contacts already in the CRM keep their status and their name; a purchase only
  fills in what is missing. A phone number is kept, with no consent to text.
- **Automation triggers:**
  - **New order (paid)** runs when an order is paid, once per order however many products it has.
  - **Purchase revoked** runs when SureCart revokes one, after a refund or when a subscription ends. It
    runs only for someone already in the CRM.

  Both can be narrowed with **With any of these products**; leave it empty for any product.

Other tools can also send contacts in through [Incoming webhooks](/settings/webhooks/).
