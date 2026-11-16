---
title: SMS & WhatsApp
description: Texting contacts from campaigns, automations and their own page, and hearing back from them, through Twilio, Amazon or the WhatsApp Business API.
sidebar:
  order: 4
---

**SMS & WhatsApp** comes with Marker CRM Pro. Open **Settings → Add-ons → SMS & WhatsApp** and turn it on. The page has
a tab for each channel; each has its own switch and its own provider, so you can use SMS, WhatsApp or both.

## SMS

| Setting | What it does |
|---|---|
| **Send SMS** | Turns texting on. Texts reach contacts whose SMS status is **Subscribed**. |
| **Provider** | **Twilio** or **Amazon (AWS End User Messaging)**. |
| **Account SID**, **Auth token** | Twilio: from your Twilio console. The token is stored encrypted and never shown again. |
| **From number** | Twilio: the number texts come from, in international format with the country code, such as `+14155550123`. |
| **Access key ID**, **Secret access key** | Amazon: an IAM user's key that may call `sms-voice:SendTextMessage`. The secret is stored encrypted. |
| **Region** | Amazon: the region your phone number or sender ID is in. |
| **Origination identity** | Amazon: the phone number, sender ID or pool texts come from — a number in international format, or its ID or ARN. |
| **Message type** | Amazon: **Promotional** or **Transactional**. Carriers in some countries treat them differently; promotional suits campaigns. |
| **Incoming messages URL** | Twilio: copy it into your number's **A message comes in** webhook. Amazon: subscribe it (HTTPS) to the SNS topic your number sends incoming messages and delivery events to; the subscription confirms itself. Replies, STOP and delivery receipts come back through it. |

## WhatsApp

| Setting | What it does |
|---|---|
| **Send WhatsApp messages** | Turns WhatsApp on. Messages reach contacts whose WhatsApp status is **Subscribed**. |
| **Provider** | **WhatsApp Business (Meta Cloud API)** or **Twilio**. |
| **Phone number ID**, **Access token**, **App secret** | Meta: from your app's WhatsApp → API Setup and App settings → Basic. Use a system user's permanent token; the temporary one expires within a day. |
| **Verify token** | Meta: paste it beside the callback URL when you set up the webhook, and subscribe to **messages**. |
| **Account SID**, **Auth token**, **WhatsApp sender** | Twilio: your account and the WhatsApp-enabled number. |
| **Callback URL** | Paste it as the webhook in Meta, or as your Twilio sender's incoming message URL. |

### The 24-hour window

WhatsApp delivers free text only to someone who messaged you in the last 24 hours. Everyone else can only be sent an
**approved template**. A WhatsApp campaign or automation step therefore has both: the message, sent to anyone who wrote
in the last day, and a template, sent to everyone else. Name the template as Meta knows it (or its Content SID on
Twilio), its language such as `en_US`, and its variables one per line in order; merge tags work in them. A message with
no template for someone outside the window is not sent, and the log says why.

## Consent

SMS and WhatsApp each have their own status on a contact — **Subscribed**, **Pending**, **No consent** or
**Unsubscribed** — set on the contact's **Messages** tab. Agreeing to one says nothing about the other, or about email.
A number you hold is never texted until its status is **Subscribed**.

When someone replies **STOP** (or stopall, unsubscribe, cancel, end, quit, optout, revoke), they are unsubscribed from
that channel straight away. **START** (or unstop, subscribe) subscribes them again.

## Text campaigns

Text campaigns sit in the same list as email ones, under **Campaigns → Campaigns**. Once SMS or WhatsApp is on, the list
gains a **Channel** column and a channel filter, and **New campaign** asks what it should go out as: **Email**, **SMS**
or **WhatsApp**. A channel that is on but not yet connected says **Set it up first**, with a link to its settings.

An SMS or WhatsApp campaign then asks who it goes to (lists, tags, or everyone who agreed), the message — the counter
shows its length and how many SMS segments a carrier bills — and whether to send it now or at a time you choose. Once it
has gone, the campaign shows how many were sent, delivered, failed and still waiting.

## Inbox

**Inbox** in the menu lists everyone who texted you in the last 90 days, the latest first, with their last message
either way. A dot marks someone waiting for a reply — their message is the last one — and **Needs reply** shows only
them. Search by name or number. Pick someone to read the whole conversation and answer them, as on their own page.

## On a contact

The **Messages** tab shows every text to and from the contact on both channels, oldest at the top, each with its status.
**Send a message** texts them there and then on a channel they agreed to. The SMS and WhatsApp dropdowns at the top set
their consent.

## Automations

- **Send an SMS** and **Send a WhatsApp message** text the contact, if they agreed to that channel. Otherwise the step is
  skipped and the run's history says why.
- **Message received** starts an automation when a contact texts you, on either channel or one. **Only when the
  message is** narrows it to a keyword, such as INFO; capitals do not matter.

## Logs

**Logs → SMS** and **Logs → WhatsApp** list every message both ways: what it said, where it came from (a campaign, an
automation, one sent by hand, or a reply), and its status. **Send it again** re-sends one that failed or went out.

## When something goes wrong

- **A campaign will not send** and says the channel is not set up: turn the channel on and fill in its provider.
- **Nobody in that audience has agreed to messages on this channel**: the chosen lists or tags hold no one whose status
  on that channel is Subscribed.
- **A message failed**: the log shows the provider's own reason, such as an unverified number on a Twilio trial account.
- **Replies do not arrive**: check the incoming URL is pasted exactly; a webhook whose signature does not match is
  refused and noted in **Logs → System**.
