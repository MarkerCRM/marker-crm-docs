---
title: The email editor
description: The block, classic and HTML editors, merge tags, blocks for some contacts only, templates, patterns, the footer and preview.
sidebar:
  order: 2
---

The same editor is used wherever you write an email: campaigns, sequences, automation emails,
templates, and emails to a single contact. It has three modes, and the email's design, footer
and merge tags work in all of them.

![The block editor, with the block library on the left, the email in the middle and the Email settings on the right](/images/placeholder.svg)

## Choose an editor

The editor bar shows the current editor's name in the middle. Click it to choose another:

- **Blocks** — WordPress's block editor, set up for email. New emails start here.
- **Classic** — the classic WordPress editor, with a toolbar for text, links and images.
- **HTML** — write the HTML yourself, with a live preview beside the code.

Switching between **Classic** and **HTML**, or switching an email that is still empty, happens at
once and keeps what you wrote. Any other switch asks first (**Switch editor?**): the email
starts blank in the other editor. Nothing is converted to or from blocks. If you switch back
before leaving the page, what you wrote comes back.

:::note
HTML written by someone without WordPress's *unfiltered HTML* permission is filtered when it is
saved, the same way WordPress filters post content. Administrators keep their HTML as written.
:::

## Write with blocks

The block editor works like WordPress's own. Click **+** (**Add a block**) to open the block
library, or **+** in the email to insert a block where you are. The blocks available are those
that can be sent by email: paragraph, heading, list, image, buttons, separator, spacer,
columns, group, quote, pullquote, code, preformatted, verse, table, media and text, and custom
HTML, plus Marker CRM's **Conditional section** and synced patterns.

Columns, groups, buttons and media and text are rebuilt as tables when the email is sent,
because mail apps cannot lay things side by side any other way.

The bar also has:

- **Undo** and **Redo**.
- **List view**, with an **Outline** tab listing the email's headings and its **Characters**,
  **Words** and **Minutes to read**.
- **Preview width** — **Desktop**, **Tablet** (768 pixels) and **Mobile** (375 pixels). This
  is a preview only; the email is the same everywhere.
- **Settings**, which opens the sidebar with the **Email** and **Block** tabs.
- The **⋮** menu: **Top toolbar**, **Spotlight mode**, **Visual editor** / **Code editor**,
  **Copy all blocks**, and **Save as template**.

Images come from your WordPress media library. The image crop tool is not available in the
email editor.

### The email's design

The sidebar's **Email** tab sets how the whole email looks:

- **Layout** — **Boxed** (a card on a background), **Plain**, or **Full width**.
- **Colors** — **Page background**, **Content background**, **Headings**, **Text** and
  **Links**.
- **Size and spacing** — **Content width**, **Corner radius** and **Padding**.

An email keeps only what you change; everything else follows the site's design. **Use the site
design** clears your changes.

### Action links

Select some text and use **Action link**, beside the link button in the block toolbar, to link
it to one of your [action links](/settings/action-links/), such as "add me to this list". With
nothing selected, it inserts the link's name.

## Merge tags

Merge tags put each contact's details into the email, such as their first name. Type `{{` in
any text to open the list, or click **{ }** (**Insert a variable**) in the bar. Keep typing to
narrow the list, then press Enter or click one.

The tags are grouped as **Contact** (first name, last name, full name, email address, city),
**Company**, **Your business** (business name, postal address), **Dates** and **Links**
(**Unsubscribe**, **Manage preferences**). Add-ons can add more; the list always shows
everything available.

When a contact has no value for a tag, the email shows its fallback. Some tags have one already
(first name falls back to "there"). To set your own, write it after a `|`:

```
Hi {{contact.first_name|friend}},
```

## Show a block to some contacts only

Any block can be shown only to contacts who have, or do not have, certain tags or lists.
Select the block, open **Block** in the sidebar and use **Visibility**:

1. **Show to** — **Everyone**, **Contacts who have** or **Contacts who don’t have**.
2. Choose the **Tags** and **Lists**.
3. **Match** — **Any of these** or **All of these**.

A block with a rule gets a dashed outline and a label saying who it is for. To put several
blocks under one rule, insert a **Conditional section** and put them inside it.

![A conditional section in the editor, labelled with the tags it is shown to](/images/placeholder.svg)

The rule is checked for each contact when the email is sent. Previews and test emails show
every section, because they have no contact to check. If a tag or list in a rule is deleted,
"have it" then matches nobody and "don't have it" matches everybody.

## Templates and patterns

In the block editor, click the **Templates** icon beside the editor name to choose a
[template](/emails/templates/) with **Use this template**. It replaces what is written; the
subject, audience and schedule stay. To keep the current email as a template, choose
**Save as template** from the **⋮** menu.

[Patterns](/emails/patterns/) are in the block library's **Patterns** tab, grouped by category.

## The footer

Every marketing email ends with a footer holding the unsubscribe link and your postal address.
By default it is the site footer, set in [Settings → Email defaults](/settings/email/).

To give one email its own footer:

- **Blocks:** in the **Email** tab, under **Footer**, choose **This email only**, or click the
  footer under the email (**Click to edit footer**).
- **Classic or HTML:** click the gear beside the editor name and choose **This email only**.

Then click **Edit footer**, write it, and click **Use this footer**. The site footer is not
changed. If your footer leaves out the unsubscribe link or the postal address, they are added
for you, because the law requires both.

## Preview

The composer's **Preview** (the eye icon) shows the email exactly as it will be sent, with its
design and footer. In a campaign, merge tags are filled with the first contact in the
audience, or show their fallbacks while the audience is empty. To check it in a real inbox,
send a test (**Test email**). See [Campaigns](/emails/campaigns/#send-a-test).
