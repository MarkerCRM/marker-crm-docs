---
title: AI Assistant
description: Writing emails, subject lines and record summaries with the AI connected to your WordPress site.
sidebar:
  order: 14
---

The AI Assistant helps you write emails and get up to speed on a contact, company or deal. It is free.

## Choose the AI

Under **Settings → AI Assistant** (in Connections), the **Connection** card's **Provider** is one of:

- **WordPress AI (Recommended).** WordPress 7.0 and newer has AI built in: connect a provider such as Anthropic, OpenAI
  or Google under **Settings → Connectors**, with that provider's connector plugin and API key. The key stays in
  WordPress, shared with every plugin that uses AI, and Marker CRM holds none.
- **OpenAI**, **Anthropic Claude**, **Google Gemini** or **OpenRouter**, with an API key of your own pasted here. Use
  one of these on a site older than WordPress 7.0, or to keep Marker CRM on a key of its own. The key is kept encrypted
  with your site's own security keys, and is never shown again once saved — the field shows dots. Choosing another
  provider starts without a key, and going back to WordPress AI forgets it.

Switch it on with the switch at the top, and the **Connection** card shows; it can also be switched on from
[Add-ons](/add-ons/). **Test connection**, on the right of the card, tries what is on the page before you save it.

## Settings

| Setting | What it does |
|---|---|
| **AI Assistant** (switch) | Turns it on or off everywhere, at once. While it is off, only this switch shows. |
| **Provider** | WordPress AI (Recommended), OpenAI, Anthropic Claude, Google Gemini or OpenRouter. |
| **Connected** | With WordPress AI: the providers WordPress is connected to. **Manage connectors** opens Settings → Connectors. |
| **API key** | With any other provider: its key, kept encrypted. **Get a key** links to where that provider gives one. |
| **Model** | With WordPress AI: **Default (let WordPress choose)** or one model of a connected provider. With another provider: one of the models its key can use, as the provider lists them. |
| **Brand voice** | How your emails should sound: tone, words to use or avoid, how you sign off. Sent with every writing request, and it wins over Marker CRM's own guidance. |
| **Summary notes** | What matters to your business when a record is summarised, such as renewal dates or a sign that a customer is going quiet. |

If the provider is not ready — WordPress AI on an older WordPress or with nothing connected, or another provider
without a key and a model — the page says so, and nothing of the AI Assistant shows anywhere else until it is.

## Writing in the block editor

**Improve text.** Select some words in a paragraph, heading, list or button, and click **✨** in its toolbar. With
nothing selected it works on the whole block. Choose what to do:

| Action | What it does |
|---|---|
| **Rewrite** | Fresh words, same meaning |
| **Shorten** | Keeps what matters |
| **Expand** | A little more detail, nothing made up |
| **Fix spelling and grammar** | Nothing else changes |
| **Change tone** | Same message, in the tone chosen at the top |
| **Translate** | Into the language you name |
| **Tell it what to do** | Your own instruction |

The tone, at the top of the menu, is one of Friendly, Professional, Casual, Persuasive, Formal or Urgent, and is
remembered for next time. The result shows first: **Replace** puts it in place of the text, **Insert below** adds it as
a new paragraph, **Try again** asks once more, and **Discard** keeps what you had. Bold, italics and links stay as they
were.

**Write an email.** Add the **Write with AI** block, describe the email — who it is for, what it should say, any offer
or code, and the link to send people to — choose a tone and a length, and click **Write it** (or press Ctrl+Enter). The
email takes the block's place, with its call to action as a button, and the subject line ideas open beside **Subject**.
A Write with AI block left in an email is never sent.

## Writing in the classic editor

The **✦ AI** button in the toolbar has the same actions, on the selected text or the whole email, and **Write the
email** from a short brief when the email is empty.

## Subject lines and preview text

The **✨** beside **Subject** — in campaigns, automation emails and emails to one contact — reads the email and suggests
five subject lines and three preview texts. Click one to use it; nothing is put in until you do. Write some of the email
first: the ideas come from what it says.

## Merge tags are checked

Merge tags such as `{{contact.first_name}}` and links such as `##unsubscribe_url##` are filled in for each reader when
the email is sent. The AI is told to keep them, and Marker CRM checks: when a result has lost one, or has one Marker CRM
does not know, it says which before you use it.

## AI summaries

The **AI summary** button at the top of a contact, a company or a deal writes a short briefing from what the record
holds, and ends with a suggested next step:

- **A contact:** their lists and tags, companies, email engagement and recent emails, their deals, the newest notes and
  activities, and — with Marker CRM Pro — what they have bought from each store.
- **A company:** its details, the people you know there, its deals, and its notes and activities.
- **A deal:** its stage and how long it has been there, whether it is going cold, its next step and close date, the
  people on it, and its notes and activities.

A summary is kept with the record, and anyone who can see the record sees it. **Write again** writes a fresh one, and
the copy button puts it on the clipboard as plain text. It is written in your site's language, and it goes when the
record is deleted.

## Limits and privacy

- Each person can make 20 AI requests a minute.
- What you send to the AI — the text you are writing, or a record's details for a summary — goes to the provider you
  chose, under that provider's terms.
- The AI can be wrong. Read what it writes before you send it, and check a summary before you act on it.
