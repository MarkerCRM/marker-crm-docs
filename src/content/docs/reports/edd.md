---
title: Easy Digital Downloads reports
description: Revenue, orders, customers, subscriptions and licences from your Easy Digital Downloads store, tied to the contacts who bought them.
sidebar:
  order: 4
---

Open **Reports → EDD**. It needs Marker CRM Pro and the
[Easy Digital Downloads integration](/settings/integrations/#easy-digital-downloads) turned on. It is the same report
as the [WooCommerce report](/reports/woocommerce/) — totals, chart and comparison, top selling products, customer
stages and customer health — read from your Easy Digital Downloads orders. What differs:

- **Every buyer counts.** Easy Digital Downloads keeps a customer for every order, so **Spend per customer** and the
  stages include people who bought without an account.
- **Revenue** counts completed orders and renewals, net of refunds. A fully refunded order counts for nothing.
- **There is no email revenue card yet.** Orders from Easy Digital Downloads are not yet credited to the email the
  buyer came from.
- **With EDD Recurring Payments**, the chart has **Subscriptions** and the kinds of order, and the **Subscriptions**
  card appears. **Active subscriptions** at the top shows what they bring in a month: each one's recurring amount,
  brought to a month by its billing period (a yearly $120 counts as $10). A first subscription order is the one that started a subscription; a renewal is a renewal payment.
  A subscription counts as ended on its expiration date once it is cancelled or has expired — the day its access
  stops.
- **With EDD Software Licensing**, two more cards at the top: **Valid licences** (active or not yet activated), with
  the sites they are activated on (local test sites left out), and **Expiring licences** in the next 30 days, with
  how many have already expired.

A stage opens as a segment named *Easy Digital Downloads: …*. Its cut-offs are set on the card or under **Customer
stages** on the Easy Digital Downloads **Manage** page.
