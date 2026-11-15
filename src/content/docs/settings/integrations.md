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

## FluentCart

The FluentCart integration comes with Pro, and its row is marked **Pro** until you have it. With Pro:

- **Everyone who pays becomes a contact**, with the **Default lists**, **Default tags** and **Status for new contacts**
  you set on its **Manage** page. New customers start as **Subscribed**; **Transactional** (order emails only),
  **Pending** (sends a double opt-in email) and **Unsubscribed** are the other choices. Contacts already in the CRM keep their status and their name. **Import now** brings in customers who
  bought before, quietly: their past orders start no automations.
- **What each customer has spent**, kept net of refunds and with renewals counted: orders, lifetime value, first and last
  order, as columns in the contact list and as segment rules under **FluentCart** (with **Bought products**, **Bought
  from categories** and **Used coupons**), and two ready segments: **FluentCart customers** and **FluentCart repeat
  customers**.
- **Their orders** in the contact's **Purchases** tab, with **Re-sync** to work them out again, and their FluentCart
  subscriptions under it.
- **A consent box at checkout**, set under **Checkout** on the **Manage** page as for WooCommerce: ticking it subscribes
  them when the order is placed, through double opt-in when that is on. **Fill in checkout for people who came from an
  email** puts their name and email in for a visitor who clicked one of your emails.
- **Automation triggers:** **New order (paid)** — narrowed by **Who**, **Which orders**, products, categories and
  **Order total at least** — **Order refunded** (any, full or partial), **Order cancelled**, **Order shipped**,
  **Order delivered**, **No order in a while**, **Lifetime value reached**, and **Subscription started**,
  **Subscription renewal paid**, **Subscription cancelled**, **Subscription expired**.
- **Automation steps:** **Create a coupon** — a FluentCart coupon of the contact's own, for a later email as
  `{{coupon.…}}` — and **Add order note**, which writes in the order's activity.
- **Marker CRM in FluentCart's integrations.** FluentCart edits products in its own screens, so lists and tags per
  product are set there: **FluentCart → Integrations → Add Integration → Marker CRM**, on every order or on one product.
  Choose **Add to lists**, **Add tags**, **Remove from lists**, **Remove tags**, a **Note** for the contact (FluentCart's
  order fields can go in it), the **Event Trigger**, and on a product, **Run on Selected Variations Only**.
  **Take the added lists and tags off again on a refund or when a subscription's access ends** undoes them.
  **Subscribe the buyer to marketing emails** is off to begin with, since a purchase is not consent: tick it where buying
  is how people sign up. With double opt-in on, they are emailed to confirm first.
- **Revenue** credited to the email the buyer came from, on campaign and automation reports and the dashboard, and the
  [FluentCart report](/reports/fluentcart/).
- [Abandoned carts](/settings/abandoned-carts/) for FluentCart's checkout.

## SureCart

The SureCart integration comes with Pro, and its row is marked **Pro** until you have it. With Pro:

- **Everyone who pays becomes a contact**, with the **Default lists**, **Default tags** and **Status for new
  contacts** you set on the SureCart **Manage** page. New customers start as **Subscribed**; **Transactional** (order
  emails only), **Pending** and **Unsubscribed** are the other choices. Contacts already in the CRM keep their status and their name; a purchase only
  fills in what is missing. A phone number is kept, with no consent to text.
- **Their SureCart orders** in the contact's **Purchases** tab, read from SureCart when you open it: number and
  date, status, total, and a link to the order for people who can edit SureCart orders.
- **Automation triggers:**
  - **New order (paid)** runs when an order is paid, once per order however many products it has.
  - **Purchase revoked** runs when SureCart revokes one, after a refund or when a subscription ends. It
    runs only for someone already in the CRM.

  Both can be narrowed with **With any of these products**; leave it empty for any product.
  **New order (paid)** also has **Who**: **Anyone**, or **Only people new to the CRM** (not a contact before this
  order), for a welcome meant only for first-time customers. Whether someone can go through the automation again is
  the automation's **Re-entry** setting, and emails in it go only to contacts whose status allows them.

## Easy Digital Downloads

The Easy Digital Downloads integration comes with Pro, and its row is marked **Pro** until you have it. With Pro:

- **Everyone whose order is completed becomes a contact**, with the **Default lists**, **Default tags** and **Status
  for new contacts** you set on its **Manage** page. New customers start as **Subscribed**; **Transactional** (order
  emails only), **Pending** (sends a double opt-in email) and **Unsubscribed** are the other choices. Contacts already in the CRM keep their status and their name; their name is taken from the
  Easy Digital Downloads customer.
- **Import now** on the **Manage** page brings in customers who bought before the integration was on, in the
  background. It starts no automations for their past purchases.
- **What each customer has spent**, kept net of refunds and with renewals counted: their orders, lifetime value and
  first and last order, as segment rules under **Easy Digital Downloads** — with **Bought products** and **Bought
  from categories** — and in the [Easy Digital Downloads report](/reports/edd/).
- **Their orders** in the contact's **Purchases** tab: number and date, status, total, and a link to the order for
  people who can edit payments in Easy Digital Downloads.
- **A Marker CRM box on each download** (Downloads → edit a download): **Add tags** and **Remove tags** for **When it is
  bought** and for **When the order is refunded in full**. A partial refund changes no tags. They apply while syncing
  is on, for every download in the order.
- **Automation triggers:**
  - **New order (paid)** runs when an order is completed, once per order. **Who** can limit it to people new to the
    CRM, and **Which orders** to a customer's first order or their repeat orders.
  - **Order refunded** runs when an order is refunded, in full or in part, for someone already in the CRM.
  - With **EDD Recurring Payments**: **Subscription renewal paid** runs when a subscription renews and its payment
    goes through, and **Subscription expired** when one reaches its end without renewing.
  - With **EDD Software Licensing**: **License expired** runs when a license expires.

  Each can be narrowed with **With any of these products**, the downloads in your store; **New order (paid)** and
  **Subscription renewal paid** also with **Or a product in these categories**. The renewal, expiry and
  license triggers run for someone already in the CRM, and appear only while their add-on is active.

## Voxel

The Voxel integration comes with Pro, and its row is marked **Pro** until you have it. It turns on by itself while
Voxel is your theme, with nothing to set up.

- **Automation trigger: Order placed** runs when a customer places an order in Voxel. Narrow it with **With any of
  these product types**; leave it empty for any order. It runs only for a customer who is already a contact, matched by
  the email on their account: Voxel orders do not add people to the CRM.

Other tools can also send contacts in through [Incoming webhooks](/settings/webhooks/).
