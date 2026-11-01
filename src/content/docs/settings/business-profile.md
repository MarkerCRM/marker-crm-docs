---
title: Business profile
description: Your business name, contact details, logo and postal address, which the CRM uses in every email footer.
sidebar:
  order: 1
---

The business profile says who your email is from. Your name, address and logo show up in
email footers, in the opt-in confirmation and in merge tags, so fill this in before you send
anything.

Open it from **Settings → Business profile**. It is the first screen under **Settings**.

![The Business profile screen, with the logo, business details and address on the left and a live email preview on the right](/images/placeholder.svg)

## Business profile

| Setting | What it does |
|---|---|
| **Company logo** | Your logo. Use a square image — 512×512px, PNG or JPG. |
| **Business name** | Required. Used for the `{{business.name}}` merge tag, the default footer and the opt-in confirmation email. |
| **Email address** | Required. Your public business email address. The sender address is set separately, under [Email defaults](/settings/email/). |
| **Phone** | Optional. Starts with the dialling code of the country you choose below. |
| **Website** | Optional. Enter the full address, starting with `https://`. |

## Address

Marketing email has to carry a real postal address. Anti-spam laws require it, and email
without one is more likely to be marked as spam.

| Setting | What it does |
|---|---|
| **Street address** | The first line of your postal address. |
| **City** | Your town or city. |
| **State or region** | Optional. |
| **Postcode** | Your postal or ZIP code. |
| **Country** | The country, which also sets the default dialling code for **Phone**. |

The address fields are combined into the `{{business.address}}` merge tag, leaving out any
that are empty. The default email footer uses that tag.

:::caution[Leave the address empty and the footer has none]
If you never fill in the address, `{{business.address}}` comes out empty. The footer still
gets an unsubscribe link, but your email will not carry the postal address the law asks for.
:::

## The live preview

On a wide screen, a **Live preview** panel sits beside the form and shows a sample email
using the logo, name and address you entered. It updates as you type. On a narrow screen,
open it with **Show preview**.

## Saving

Your changes are not saved as you type. A bar appears at the top of the screen with
**Save changes** and **Discard**. Leave the screen without saving and the changes are lost.

## What to do next

- Set the sender name, reply-to address and footer under [Email defaults](/settings/email/).
- Decide how new subscribers confirm under [Opt-in & unsubscribe](/settings/opt-in/).
