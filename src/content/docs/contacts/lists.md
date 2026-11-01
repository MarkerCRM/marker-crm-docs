---
title: Lists
description: Lists are what contacts subscribe to and unsubscribe from — create them, show them on the preference page, give one its own opt-in email, and delete them.
sidebar:
  order: 3
---

A list is something a contact subscribes to — your newsletter, product updates, a course.
Unlike a [tag](/contacts/tags/), a list is about the contact's choice: they can leave it, and
the CRM remembers that they did.

## How lists differ from tags

- **Leaving keeps a record.** Removing a contact from a list marks them as unsubscribed from
  it rather than erasing the link, so you can see who left and when. Removing a tag deletes
  it from the contact outright.
- **Contacts can see them.** A list shown on the preference page appears to contacts when
  they manage their subscription, and they can join or leave it there.
- **A list can have its own opt-in email.** See [Double opt-in for a list](#double-opt-in-for-a-list).
- **No colour.** Lists have a description instead.

## The lists screen

Go to **Contacts → Lists**.

![The Lists screen: each list's name and description, an On preference page badge, the contact count and the unsubscribed count with its rate](/images/placeholder.svg)

Each row shows:

- **Name**, with the description beneath it, and badges: **On preference page** when
  contacts can see it, **Own opt-in** when it sends its own confirmation email.
- **Contacts** — how many are currently in the list.
- **Unsubscribed** — how many have left it, and that as a share of everyone who has ever been
  in it.
- **Created**

Choose a list's name or count to open the contacts table filtered to its current members.
The row menu offers **View contacts**, **Edit**, **Double opt-in** and **Delete**.

## Creating a list

1. Choose **New list**.
2. Enter a **Name**. The **Slug** is filled in from it and **cannot be changed after
   saving**.
3. Add a **Description** (optional, up to 200 characters). It is shown to contacts when they
   choose which emails to receive.
4. Turn on **Show on the preference page** if contacts should be able to join or leave the
   list from the link in your emails. Leave it off for a list you manage yourself.
5. Choose **Add**.

You can also create a list by typing a new name wherever lists are chosen, and lists named in
an imported CSV's lists column are created for you.

## Adding people to a list

- **One contact:** **Add to lists** in their record's header, or the **Lists** field in
  **Edit**.
- **Many contacts:** tick them in the contacts table and choose **Add to lists** or
  **Remove from lists**.
- **On import:** choose lists under **Add to lists** in the import options.
- **New WordPress users:** **Settings → General** can add everyone who registers to chosen
  lists.
- **Automatically:** the automation steps **Add to a list** and **Remove from a list**; the
  triggers **Added to a list** and **Removed from a list** start an automation.

:::note[Being on a list is not the same as being emailable]
A campaign sent to a list reaches only the members whose email status is **Subscribed**.
Someone on the list who is Pending, Transactional or Unsubscribed is left out. See
[Email statuses](/contacts/#email-statuses).
:::

## Double opt-in for a list

When double opt-in is on under **Settings → Opt-in & unsubscribe**, a new contact starts as
**Pending** and is sent a confirmation email. By default that email is the site's own.

To give a list different words — for a course, say, or an event — choose **Double opt-in**
from the list's row menu:

1. Under **Which confirmation email this list sends**, choose **Its own email and
   thank-you**.
2. Write the **Subject**, the **Preview text** and **What it says**. Keep
   `{{confirm_button}}` in the body: it is the button they confirm with.
3. Under **Once they confirm**, choose **Show a message** and write it, or **Send them to a
   page** and enter its address.
4. Choose **Save**.

Choose **The site's double opt-in** to go back to the shared email.

![The Double opt-in dialog for a list, with Its own email and thank-you selected and the subject and body fields below](/images/placeholder.svg)

Confirmation covers the contact's email address, not one list at a time, so one email is
sent however many lists they join. A list's own email is used only when it is the one list
with its own email that the contact is in; if they are in two such lists, the site's email
is sent instead.

If double opt-in is off for the site, the dialog says so. What you set is kept and used once
it is turned on.

## Editing and deleting

**Edit** changes the name, description and preference-page setting. The slug stays as it was.

**Delete** removes the list from every contact, along with its subscription history. The
contacts themselves stay. To delete several, tick them and choose **Delete** in the bulk bar.

:::danger
Deleting a list cannot be undone. Its unsubscribe history goes with it, so you can no longer
tell who left it.
:::
