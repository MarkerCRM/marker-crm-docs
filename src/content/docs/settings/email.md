---
title: Email defaults
description: The sender name and address, reply-to, footer, sending speed, open and click tracking, and bounce handling for every email.
sidebar:
  order: 2
---

Email defaults control how every email from the CRM is sent: who it comes from, where
replies go, the footer at the bottom, how fast emails go out, what is tracked and what
happens when an address bounces.

Open it from **Settings → Email defaults**.

![The Email defaults screen, with From and reply-to, Footer, Mailer, Tracking and Bounce handling sections, and an email preview beside them](/images/placeholder.svg)

## From and reply-to

| Setting | What it does |
|---|---|
| **From name** | Required. The name recipients see as the sender. Usually your business name. |
| **From address** | Required. The address emails are sent from. Use an address your mailer is set up to send from. |
| **Reply-to name** | Optional. The name on the reply-to address. Empty, it uses the from name. |
| **Reply-to address** | Optional. Where replies go. Use an inbox that someone reads. |

:::caution[Don't send from a Gmail, Yahoo or Outlook address]
If the from address is on a free mailbox such as gmail.com, the screen shows a warning.
Gmail, Yahoo and Outlook reject or junk bulk email sent as their own domains from another
server. Send from an address on your own domain.
:::

## Footer

The footer is added to the bottom of every campaign. Use the **{ }** button in the editor to
place the unsubscribe link, the manage-subscription link and your
[business address](/settings/business-profile/).

If you leave out the unsubscribe link or the address, they are added for you, because the law
requires both. The default footer has your business name, your address, and links to
**Unsubscribe** and **update your preferences**.

## Mailer

Marker CRM doesn't deliver email itself. It sends through whatever WordPress is set up to use,
and an SMTP plugin holds the connection and the login for your email service.

- If a supported mailer plugin is active (SendGrail, FluentSMTP, WP Mail SMTP, Post SMTP or
  Easy WP SMTP), its name is shown as **Connected**. Use **Configure** to open its settings.
- If none is active, the screen recommends SendGrail and offers **Install**. Without a mailer,
  email goes out from your web server, where it is usually blocked or marked as spam.

Use **Send a test email** to check that the from name, reply-to and footer arrive as you
wrote them. The test goes through your mailer.

### Sending speed

| Setting | What it does |
|---|---|
| **Emails per second** | The rate your email service allows, from 1 to 200. Default 15. Amazon SES starts accounts at 14 — check your provider's limits. |
| **Emails per hour** | A cap per hour, up to 100,000. Leave it at **0** (no cap) unless your host limits outgoing email. |

Campaigns are sent in batches by the background queue, about once a minute. Each batch is
**Emails per second** × 60. If you set **Emails per hour**, each batch is made smaller so the
total stays under that cap, and the campaign takes longer to finish.

:::tip[Set the hourly cap if you send through your host]
If you send through your web host's own mail server instead of a service like SES or
Mailgun, set **Emails per hour** to your host's limit. Going over it can get your hosting
account suspended.
:::

## Tracking

| Setting | What it does |
|---|---|
| **Track opens** | Counts opens. Both are on by default. Apple Mail opens every email it receives, so open rates read high. |
| **Track clicks** | Links go through your site first so the click is counted, then on to their real address. The unsubscribe link is never tracked. |

Open and click numbers appear in [email reports](/reports/email/).

## Bounce handling

Your email service can tell Marker CRM when an address bounces or someone reports your
email as spam. Marker CRM then stops emailing that address.

1. Choose your provider under **Email service provider**: Amazon SES, Mailgun, PepiPost,
   Postmark, SendGrid, SparkPost, Elastic Email, Postal Server, SMTP2GO, Brevo (formerly
   Sendinblue) or Resend.
2. Copy the webhook URL that appears.
3. Paste it into your provider's webhook settings and choose the bounce and spam complaint
   events. For Amazon SES, add it as an HTTPS subscription to the Amazon SNS topic that
   receives your SES bounces and complaints.

What happens next:

- **A hard bounce** (the address doesn't exist) stops email to that address straight away.
- **A spam complaint** stops email to that address straight away.
- **A soft bounce** (a full mailbox, a server that's temporarily down) only stops email after
  three soft bounces in a row.

:::caution[Keep the webhook URL private]
The URL has a secret key built in. Anyone who has it can report bounces for your site, so
only paste it into your email provider.
:::

## Saving

Changes are kept when you click **Save changes** in the bar at the top. **Discard** undoes
them. The **Preview** panel beside the form shows a sample email with your sender and footer,
and **Send a test to** sends it to your own address.
