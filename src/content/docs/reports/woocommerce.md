---
title: WooCommerce reports
description: Revenue, orders, customers and what your emails sold, from your WooCommerce store, tied to the contacts who bought them.
sidebar:
  order: 3
---

The WooCommerce report shows what the CRM can tell that your store cannot: which customers are new, returning, at
risk or gone, and what your emails sold. Open **Reports → WooCommerce**. It needs Marker CRM Pro and the
[WooCommerce integration](/settings/integrations/#woocommerce) turned on.

## The totals

The cards at the top are for all time, whatever period you choose below.

- **Revenue** — every paid order, net of refunds, guests' too.
- **Orders** and **Average order** — the same orders, and revenue per order.
- **Customers** — customers who are contacts, and how many ordered more than once.
- **Spend per customer** — what a customer has spent on average. Guest checkouts are left out unless **Include
  guest checkouts** is on.
- **Active subscriptions**, with WooCommerce Subscriptions — subscriptions active right now.
- **Email revenue** — what was ordered after clicking one of your emails, and its share of all revenue.

When syncing is paused, a notice says so. New orders are not synced while it is, so customers, stages and email
revenue stop where they were; **Revenue** still counts every order. **Resume syncing** turns it back on.

## The chart

Pick **Revenue**, **Orders**, **Customer growth** (new against returning) or, with WooCommerce Subscriptions,
**Subscriptions** (started against ended). Choose the period with the date range; the chart sets it against the
period you pick from **vs**: **Previous period**, the same days last month, quarter or year, **A range I choose**,
or **No comparison**. Narrow revenue and orders to a few products with **All products**, or with WooCommerce
Subscriptions to one kind of order: **Subscription revenue**, **New subscriptions**, **Renewals only** or
**One-time items**.

Below the chart, **Comparison** lists the same numbers day by day (or week or month on a long period), with the
change from the compared period. **Export CSV** downloads it.

## The cards

Each has a date range of its own.

- **Email revenue** — the campaigns and automations whose emails led to orders, with revenue, orders, emails sent,
  revenue per email and how many clickers went on to order.
- **Top selling products** — revenue and units per product.
- **Subscriptions**, with WooCommerce Subscriptions — active now, new, ended with churn, and renewal revenue.

## Customer stages

Every customer is in a stage: **New** (first order in the last 30 days), **Repeat**, **Top** (the share of customers
who have spent the most), **At risk**, **Lapsed** and **One-time**. Click a stage to open its customers as a segment
in **Contacts**, kept up to date as orders come in, to email them or start an automation for them. The segment is
named after the store and the stage, such as *WooCommerce: Customers at risk*.

The cut-offs — **At risk after**, **Lapsed after**, **Top customers** — are set with **Stage cut-offs** on the card,
or under **Customer stages** on the WooCommerce **Manage** page.

**Customer health** shows the repeat rate, the typical lifetime value, the typical wait for a second order and how
customers spread across lifetime value.
