---
title: Files
description: Keep proposals, contracts and other files on contacts, companies and deals, preview them, and share them by link.
sidebar:
  order: 46
---

Files keeps the documents that belong to a record with it: a proposal on a deal, a signed contract on a company, a
screenshot on a contact. Files is an add-on: turn it on under **Add-ons** (see [Add-ons](/add-ons/)). It is free.

![The Files page, listing every file with the record it is on, its size, who added it and when](/images/placeholder.svg)

## Add a file

A file can be on one contact, one company and one deal at the same time, like a signed contract on the deal, the
company and the person who signed it. It is stored once, and shows on each of them.

Open a contact, company or deal, click its **Files** tab and click **Upload**. Under **Associate with**, the record
you are on is filled in; add a **Contact**, **Company** or **Deal** too if the file belongs on them. Then drop the
files in, or click **Browse files**. You can add several at once.

Dropping files straight onto the tab adds them to that record only.

You can also attach files to an activity: in **Add activity** (or when editing one), click **Attach files** before
you save. They show with the activity on the timeline, and on the record's **Files** tab marked **On an activity**.
Deleting the activity deletes them too.

A file you add on its own also shows on the record's **Activity** tab as **File added**.

If a file is refused, you see its name and why: above the list when you dropped it on the tab, in the drawer when
you used **Upload**, or in a message when you attached it to an activity. For example:

- **This type of file is not allowed.** Its type is not ticked in [Settings → Add-ons → Files](#settings).
- **Files can be up to 10 MB.** It is larger than the **Largest file** setting, which this message names.

## Preview a file

Click a file's name. The preview opens on the right with:

- **JPEG, PNG, GIF, WebP and BMP images, PDFs, video and audio** shown in place.
- **Plain text and CSV files**: the first 100 KB.
- **Anything else** (Word, Excel, archives, HEIC or TIFF images): **No preview for this kind of file** and a
  **Download** button. Your computer opens it.

A PDF fills the drawer so it can be read; scroll down for its details. Under the preview, on one line: its type,
size, and when it was added and by whom. **Related to** lists the records it is on; click **Change** to add or remove
one, then **Save**. **Download** saves it; **Delete** removes it from every record and from storage. There is no
undo. A file opened from an activity on the timeline only shows and downloads; change it from the **Files** tab.

## Share a file by link

In the preview, turn on **Share link**. Anyone with the link can open the file without signing in, so send it only
to people who should have it. You need the right to edit the file to see this.

- A new link expires in 7 days. The menu beside it sets a new expiry from today: **Never expires**, **1 day**,
  **7 days** or **30 days**. Changing it keeps the same link; point at the switch to see the date it ends.
- The copy button at the end of the link puts it on your clipboard.
- Turn **Share link** off to stop the link working at once. Turning it on again makes a new link.

A shared file shows a link icon beside its name, until you turn **Share link** off; an expired link keeps it.
Someone who opens an expired or switched-off link sees **This link has expired**. While the Files add-on is off,
share links do not work.

## The Files page

**Files** in the menu lists every file on a record you may see, newest first.

To add files here, click **Add files**, choose under **Associate with** the contact, company and deal they go on, and
drop the files in. You can also leave them on no record for now, like a price list or a handbook, and associate them
later with **Change** in the preview.

- **Search files…** finds a file by its name.
- **Type** narrows to images, documents, spreadsheets, presentations, archives, audio or video.
- **Related to** narrows to files on contacts, companies or deals (shown when more than one is on). The **Related to**
  column names every record a file is on; on a record's tab, **Also related to** names the others.
- Click a column heading to sort by **Name**, **Size** or **Added**.
- Click a file's name to preview it.

A file shows by its name; its icon says its type. The menu at the end of each row (⋮) has:

- **Preview**.
- **Rename**: type the new name and press Enter (Esc cancels). The file keeps its type: renaming
  *brief* to *Signed brief* makes it *Signed-brief*, still a PDF.
- **Download**.
- **Delete**: asks first, then removes it from every record and from storage. There is no undo.

Tick the boxes beside files to act on several: **Delete selected** deletes them all at once. A file you may not
delete has no box.

## Who can see a file

Someone who can see any of a file's records can see, preview and download it. Adding a file to a record takes the
right to edit that kind of record. Renaming, sharing or changing its records takes the right to edit one of the
records it is on; deleting it, the right to delete one of them, and it goes from all of them. A deal in a pipeline
your team cannot see keeps its files hidden too, and changing a file's records never removes one you cannot see.

A file on no record can be seen by everyone who uses the CRM; only whoever added it, or someone who manages
settings, can rename, share or delete it.

When a record is deleted, its files stay on their other records. A file on no other record is deleted with it.

## Settings

Open **Settings → Add-ons → Files**.

### Storage

Where new files are kept: **Uploads folder**, **Amazon S3** or **Cloudflare R2**. Files already added stay where they
were stored, so changing this moves nothing.

| Storage | What it needs |
|---|---|
| **Uploads folder** | Nothing. Files go in `wp-content/uploads/marker-crm/files`, under names nobody can guess, and the CRM hands them out only to someone allowed to see them. The folder is closed to direct visits on Apache servers; on others, such as nginx, the random names are what keeps it private. |
| **Amazon S3** | **Region** (chosen from the list), **Bucket**, and the **Access key ID** and **Secret access key** of a user allowed to put, get and delete objects in that bucket. |
| **Cloudflare R2** | **Account ID** (on the R2 overview page in Cloudflare), **Bucket**, and the **Access key ID** and **Secret access key** of an R2 API token with Object Read & Write on that bucket. |

With S3 or R2 chosen, click **Test connection** beside the choice before you save: it writes a small file to the
bucket, reads it and deletes it. It says **Connected. Files can be stored there.**, or **The storage answered**
with the storage's own reason, such as *The AWS Access Key Id you provided does not exist in our records*. A field
left empty gives **Fill in every field of the storage first.**

The secret access key is stored encrypted and never shown again; leave the dots as they are to keep it.

:::caution
If you remove the credentials of a storage that still holds files, those files cannot be opened until you add
them back.
:::

### Uploads

- **Allowed types**: tick the kinds of file people may add. Images, Documents, Spreadsheets and Presentations are
  ticked on a new site. Anything a browser could run, such as HTML, SVG or scripts, is never allowed.
- **Largest file**: in MB. Your server has its own limit, shown under the field; a larger setting stops there.
