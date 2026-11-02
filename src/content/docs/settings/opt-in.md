---
title: Opt-in & unsubscribe
description: Double opt-in, the confirmation email, cleaning up unconfirmed contacts, and what happens when someone clicks Unsubscribe.
sidebar:
  order: 5
---

This screen decides how people join your list and how they leave it: whether new
subscribers must confirm their address, what the confirmation email says, and what the
unsubscribe link does.

Open it from **Settings → Opt-in & unsubscribe**.

![The Opt-in & unsubscribe screen, with Double opt-in switched on, the confirmation email row, and the two unsubscribe choices](/images/placeholder.svg)

## Double opt-in

With **Double opt-in** on, new subscribers get an email asking them to confirm before they
receive anything else. It is on by default.

It grows your list more slowly. In return, every address on it is real and belongs to someone
who asked to hear from you. That keeps bounces and spam complaints down.

While a contact hasn't confirmed, their status is **Pending** and campaigns skip them. The link
in the email opens a page with a **Confirm my subscription** button; when they press it they
become **Subscribed**. Opening the link alone confirms nothing, so a mail scanner that follows
every link can't sign someone up. The time and the
[part of their IP address](/settings/privacy/) are saved as proof that they agreed.

:::note[Turning it off]
With double opt-in off, the confirmation email is never sent and new subscribers are not
asked to confirm. The preview beside the form says so: **Double opt-in is
off, so this email is not sent.**
:::

### The confirmation email

The **Confirm your subscription** row shows the email new subscribers receive. Click **Edit**
to change:

| Field | What it does |
|---|---|
| **Subject** | The subject line. Default: "Please confirm your subscription". |
| **Preview text** | The line an inbox shows after the subject. |
| **What it says** | The body. Insert the **Confirm button**, **Confirm link**, **First name** and **Business name** from the variables menu. |

Keep the confirm button or link in the body. Without it, nobody can confirm. Use the
preview button in the editor to see **What recipients see**, then click **Done** and save
the screen.

A list can have its own confirmation email, set on that list under
[Contacts → Lists](/contacts/lists/). If someone joins one list with its own email, they get
that email. Otherwise they get the one set here.

### Contacts who never confirm

An address nobody confirms is often a typo or fake. **Contacts who never confirm** deletes
these pending sign-ups after **7**, **14**, **30** or **90** days. The default is **Keep them**.

The daily maintenance run does the clean-up. If a contact has no other subscription left, the
whole contact is deleted.

### Once they confirm

Choose what people see after they click the confirm button:

- **Show a message** — a short message on a plain page. Edit it under **Message**.
- **Send them to a page** — go to a page of your own. Enter its full address under **Page**.

## Unsubscribing

An easy way to leave keeps people from reporting your email as spam instead.

**When someone clicks Unsubscribe** offers two choices:

- **Let them choose** — the unsubscribe page also links to the
  [preference page](/settings/preference-page/), so people can keep the lists they want
  instead of leaving everything.
- **Unsubscribe from everything** — they confirm once and get no more marketing email.

Either way, clicking **Unsubscribe** on that page marks the contact **Unsubscribed** for
email, and campaigns skip them from then on.

**One-click unsubscribe** is **Always on**. Gmail and Yahoo show their own **Unsubscribe**
button beside your email and require it from bulk senders. A click there unsubscribes the
contact straight away, without opening a page.

To send people to a page of your own after they unsubscribe, set **Where they land** under
[Preference page](/settings/preference-page/).

## Saving

Click **Save changes** in the bar at the top. The **Confirmation email** preview beside the
form updates as you edit.
