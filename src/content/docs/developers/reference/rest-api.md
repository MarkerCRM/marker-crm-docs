---
title: REST API
description: The markercrm/v2 REST namespace — authentication, the response envelope, errors, pagination and every endpoint.
sidebar:
  order: 2
---

The Marker CRM admin is a single-page app that talks to its own REST API. You can use the same
API from your add-on's admin screens, or from outside WordPress.

**Base URL:** `/wp-json/markercrm/v2/` — or `rest_url('markercrm/v2/…')` in PHP.

:::note
This is the API the admin uses, not a separate public API. Response fields not described on
this page may change between versions. From PHP inside WordPress, call the services and hooks
instead.
:::

## Authentication

Every endpoint except the few under `public/` needs a signed-in WordPress user who has access
to the CRM. Marker CRM has no API keys of its own; it accepts whatever WordPress authenticates
for its REST API.

**From the WordPress admin** (your add-on's own screen), send the logged-in cookie with a
`wp_rest` nonce:

```js
// Enqueue your script with 'wp-api-fetch' as a dependency; it sends the nonce for you.
const response = await wp.apiFetch({path: '/markercrm/v2/contacts?per_page=10'});
```

With plain `fetch`, send a nonce made by `wp_create_nonce('wp_rest')` in the `X-WP-Nonce`
header, with `credentials: 'same-origin'`.

**From outside WordPress**, use an
[application password](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/)
for a user with CRM access, over HTTPS:

```bash
curl -u "jane:abcd efgh ijkl mnop qrst uvwx" https://example.com/wp-json/markercrm/v2/contacts
```

### Who may do what

A user has access to the CRM when they are an administrator (`manage_options`) or have been
given at least one Marker CRM permission on **Settings → Users and permissions**. Inside, each endpoint
checks a capability named `marker_crm_{action}_{resource}`:

| Resource | Actions |
|---|---|
| `contacts` | `view` `edit` `delete` `import` `export` |
| `companies` | `view` `edit` `delete` `import` `export` (companies module on) |
| `segments` (tags, lists and segments) | `view` `edit` `delete` |
| `fields` (custom fields) | `view` `edit` `delete` |
| `campaigns` (campaigns and templates) | `view` `edit` `delete` `send` |
| `automations` | `view` `edit` `delete` |
| `logs` | `view` `delete` |
| `reports` | `view` |
| `deals` | `view` `edit` `delete` `import` `export` (Deals add-on on) |
| `pipelines` (pipelines and deal settings) | `manage` (Deals add-on on) |
| `tasks` | `view` `edit` `delete` `manage` (Tasks add-on on) |
| `dashboard` | `manage` |
| `settings` | `manage` |

`edit` implies `view`; `delete`, `import` and `send` imply `edit`; `export` implies `view`.
Administrators hold every capability. Add-ons can add resources through
`marker_crm/capabilities`.

## Requests

- Send JSON bodies with `Content-Type: application/json`.
- `PUT` and `DELETE` also work as a `POST` with an `X-HTTP-Method-Override` header, which is
  what the admin does.
- Arrays in a query string use brackets: `?ids[]=1&ids[]=2`. Where an endpoint takes `ids`, a
  comma-separated string works too.

## Responses

Every response is a JSON object with `success`:

```json
{
    "success": true,
    "data": [{"id": 42, "first_name": "Ada"}],
    "meta": {"total": 1, "page": 1, "per_page": 25}
}
```

| Key | |
|---|---|
| `success` | `true` or `false` |
| `data` | The resource, or a list of them |
| `meta` | On lists: `total`, and usually `page` and `per_page` |
| `message` | On writes: what happened, ready to show — "Tag created" |

A write answers with the saved resource in `data` and a `message`. A delete answers `200` with
only a `message`.

### Errors

```json
{"success": false, "message": "A contact needs an email address."}
```

| Status | When |
|---|---|
| `401` | Not signed in |
| `403` | Signed in without CRM access, or without the capability for this action |
| `404` | No such record, or a module that is switched off |
| `409` | An automation was saved by someone else since you loaded it |
| `422` | The input is not valid. `message` says why; some endpoints add `data.errors` |
| `429` | A public endpoint was called too often |


## Lists

List endpoints take the same parameters:

| Parameter | Default | |
|---|---|---|
| `page` | `1` | |
| `per_page` | `25` | At most `100` |
| `search` | | Free text, where the list supports it |
| `orderby` | `id` | Only the columns the list allows; anything else falls back to the default |
| `order` | `desc` | `asc` or `desc` |

`meta.total` is the number of matching rows across all pages.

## Endpoints

Paths are relative to `/wp-json/markercrm/v2/`. `{id}` is a numeric id.

### Contacts

| Method | Path | Does | Capability |
|---|---|---|---|
| `GET` | `contacts` | List contacts. Filters: `search`, `status`, `channel`, `contact_type[]`, `tags[]`, `lists[]`, `segment`, `conditions`, `owner_id`, `company_id[]`, `not_company_id[]` | `view_contacts` |
| `POST` | `contacts` | Create a contact, or update the one with the same address | `edit_contacts` |
| `GET` | `contacts/counts` | Counts by status | `view_contacts` |
| `POST` | `contacts/bulk` | Apply a bulk action to many contacts | `edit_contacts` |
| `POST` | `contacts/bulk-delete` | Delete many contacts | `delete_contacts` |
| `GET` | `contacts/{id}` | One contact | `view_contacts` |
| `PUT` | `contacts/{id}` | Update a contact | `edit_contacts` |
| `DELETE` | `contacts/{id}` | Delete a contact and everything it owns | `delete_contacts` |
| `GET` | `contacts/{id}/sends` | Emails sent to the contact | `view_campaigns` |
| `GET` | `contacts/{id}/links` | Links the contact clicked | `view_contacts` |
| `GET` | `contacts/{id}/automations` | The contact's automation runs | `view_contacts`, `view_automations` |
| `POST` | `contacts/{id}/automations` | Put the contact into an automation | `view_contacts`, `edit_automations` |
| `GET` · `POST` | `contacts/{id}/direct-email` | Check whether a one-off email can be sent; send one | `view_contacts`, `send_campaigns` |
| `POST` · `PUT` · `DELETE` | `contacts/{id}/companies` | Link a company, set the primary one, unlink | `edit_contacts` |
| `GET` | `messaging/contacts/{id}/messages` | SMS and WhatsApp both ways, newest first; `meta.consent` per channel. Cursor: `before`, `before_id`. Pro | `view_contacts` |
| `POST` | `messaging/contacts/{id}/messages` | Text the contact now: `channel`, `message`. Pro | `edit_contacts` |
| `PUT` | `messaging/contacts/{id}/consent` | Set a channel's consent: `channel`, `status`. Pro | `edit_contacts` |

The body of `POST contacts` and `PUT contacts/{id}` is what
`ContactService::createOrUpdate()` takes: contact fields, `subscriptions`, `tags`, `lists`,
`custom` and `company_id`.

### Tags and lists

| Method | Path | Does | Capability |
|---|---|---|---|
| `GET` | `terms` | List terms of one `type` (`tag`, `list`, or an add-on type). Filters: `search`, `include[]` | `view_segments` or `view_contacts` |
| `POST` | `terms` | Create a term | `edit_segments` |
| `PUT` | `terms/{id}` | Update a term | `edit_segments` |
| `DELETE` | `terms/{id}` | Delete a term and remove it from everyone | `delete_segments` |
| `POST` | `terms/bulk-delete` | Delete many terms | `delete_segments` |
| `POST` | `terms/{id}/visibility` | Make a list public or private | `edit_segments` |
| `POST` | `terms/{id}/optin` | Set a list's own double opt-in | `edit_segments` |

### Rule fields

| Method | Path | Does | Capability |
|---|---|---|---|
| `GET` | `rule-fields` | Every rule field, for building conditions (`segments/fields` answers the same) | `view_segments` or `edit_automations` |

### Search

| Method | Path | Does | Capability |
|---|---|---|---|
| `GET` | `search` | `search` (two characters or more) across every kind this user may view, up to 5 of each, as `[{kind, label, icon, items: [{id, title, subtitle, path}], more}]`; `kind` narrows to one, up to 20. `[]` for a shorter term, or a kind that does not exist or this user may not search | CRM access, then each kind's own |

### Segments (Marker CRM Pro)

| Method | Path | Does | Capability |
|---|---|---|---|
| `GET` | `segments` | List segments | `view_segments` |
| `POST` | `segments` | Create a segment | `edit_segments` |
| `GET` · `PUT` · `DELETE` | `segments/{id}` | Read, update, delete | `view_` · `edit_` · `delete_segments` |
| `POST` | `segments/preview` | Count and sample the contacts a `conditions` tree matches | `view_segments` |
| `GET` | `segments/counts` | Contact counts for up to 100 segment `ids` | `view_segments` |

### Custom fields

| Method | Path | Does | Capability |
|---|---|---|---|
| `GET` | `custom-fields` | List custom fields | `view_fields` or `view_contacts` |
| `GET` | `custom-fields/types` | The field types | `view_fields` |
| `POST` | `custom-fields` | Create a field | `edit_fields` |
| `POST` | `custom-fields/reorder` | Change the order | `edit_fields` |
| `PUT` · `DELETE` | `custom-fields/{key}` | Update, delete (by key) | `edit_fields` · `delete_fields` |

### Companies

Only while the companies module is on.

| Method | Path | Does | Capability |
|---|---|---|---|
| `GET` | `companies` | List companies | `view_companies` |
| `GET` | `companies/counts` | Counts | `view_companies` |
| `POST` | `companies` | Create a company | `edit_companies` |
| `POST` | `companies/bulk` | Bulk action | `edit_companies`, or `delete_companies` to delete |
| `GET` · `PUT` · `DELETE` | `companies/{id}` | Read, update, delete | `view_` · `edit_` · `delete_companies` |
| `GET` | `companies/{id}/contacts` | The company's contacts | `view_contacts` |

### Tasks

Only while the Tasks add-on is on. A task about records is reached through any of them the user may view, and is
changed only by whoever it is assigned to, whoever added it, or someone with `manage_tasks`. A task's response has
`status` (`open`, `in_progress`, `done`), `priority` (`low`, `medium`, `high`) and `records`: `{object_type,
object_id, title, path}` for each one it is about, the title and path empty for one this user may not see.

| Method | Path | Does | Capability |
|---|---|---|---|
| `GET` | `tasks` | List tasks, with `meta.total`. `view` is `today` (the default), `overdue`, `upcoming`, `done`, `open` or `all`; `mine` (default true; false is ignored without `manage_tasks`), `object_type` + `object_id` (every task about that record, whoever's; `view_` on it), `type`, `priority`, `search`, `page`, `per_page` (or `limit`; default 25, up to 100); `before` + `before_id` page `done` by completion time | `view_tasks` |
| `GET` | `tasks/counts` | `{overdue, today, upcoming, done}`, in the site's time zone | `view_tasks` |
| `GET` | `tasks/assignees` | The people who can be given a task | `view_tasks` |
| `POST` | `tasks` | Create a task: `title` (required), `type`, `status`, `priority`, `due` (`Y-m-d` or `Y-m-d H:i`, site time), `assigned_to`, `details`, `links` (`[{object_type, object_id}]`, one of each kind) | `edit_tasks` |
| `PUT` · `DELETE` | `tasks/{id}` | Update (`title`, `type`, `status`, `priority`, `due`, `assigned_to`, `details`, `links`, which replaces them) or delete | `edit_tasks` · `delete_tasks` |
| `POST` | `tasks/{id}/complete` · `tasks/{id}/reopen` | Mark done, or open again | `edit_tasks` |
| `POST` | `tasks/complete` · `tasks/delete` | Bulk, `ids` (the first 100 are used). `403` if any is one this user may not change. Answers `{completed: n}` · `{deleted: n}` | `edit_tasks` · `delete_tasks` |
| `GET` · `PUT` | `tasks/reminders` | The signed-in person's morning email: `{reminders: bool, hour: 8}`; `PUT` takes `reminders` | `view_tasks` |

### Files

Only while the Files add-on is on. A file is on up to one contact, one company and one deal, or on none (anyone with
CRM access may see that one; whoever added it, or someone with `manage_settings`, may change it). It is reached
through any of its records: `view_`, `edit_` or `delete_` on that record's kind (`contacts`, `companies`, `deals`), and a deal's
pipeline team. A file's response has `id`, `name`, `mime`, `size`, `inline` (whether it can open in place),
`note_id` (the activity it came with), `share_url`, `share_expires_at` (a date for display, empty unless it
expires), `created_by`, `created_at` (for display), `occurred_at`, `records` (`{object_type, object_id, title,
path}` for each one this user may see) and `added_by`. `records` and `added_by` are added after the
`marker_crm/file_response` filter.

| Method | Path | Does | Capability |
|---|---|---|---|
| `GET` | `files` | Every file on a record this user may see: `search`, `type` (`images`, `documents`, `spreadsheets`, `presentations`, `archives`, `audio`, `video`), `kind` (`contact`, `company`, `deal`), `orderby` (`created_at`, `name`, `size`), `order`, `page`, `per_page` | Any CRM access; rows only on kinds the user may view |
| `GET` | `files?object_type=…&object_id=…` | One record's files, with the same `search`, `type`, `orderby`, `order`, `page` and `per_page`. With `standalone=1` (leaves out those on an activity) or `before` + `before_id`, it pages by cursor instead (`limit`, `meta.more`), as the timeline reads it | `view_` on the record |
| `POST` | `files` | Upload, as `multipart/form-data`: `file`, `links` (`[{object_type, object_id}]`, one of each kind, or none; or `object_type` + `object_id` for one), and `note_id` for an activity on one of them. `422` with the reason when there is no file, its type or size is not allowed, or the activity is not on the record; `500` when storage fails | `edit_` on each record; CRM access for a file on none |
| `GET` | `files/{id}/download` | The file, as a download; `inline=1` opens images, PDFs, text, audio and video in place. A file in S3 or R2 answers with a redirect to a link valid for five minutes | `view_` on the record |
| `GET` | `files/{id}/text` | The first 100 KB of the file, as text: `{text, more}` | `view_` on the record |
| `POST` · `DELETE` | `files/{id}/share` | Turn the share link on, or set a new expiry, with `days` (`0` never expires, `1`, `7`, `30`; anything else is `0`), or turn it off | `edit_` on one of its records |
| `PUT` | `files/{id}` | Rename with `name` (it keeps its extension, whatever is typed; `422` when empty), or change its records with `links`, which replace them; a record the user cannot see stays. With both, only `links` is applied | `edit_` on one of its records, and on each one added |
| `DELETE` | `files/{id}` | Delete it, from every record and from storage | `delete_` on one of its records |
| `POST` | `files/delete` | Bulk, `ids` (the first 100 are used). Only those the user may delete go; the message says how many | `delete_` on one of each file's records |

A share link is the public address `?marker_crm=file&h={hash}`: anyone may open it until it expires or is turned
off, rate limited like the site's other public links.

### Imports and exports

Pass `type=contacts` or `type=companies`.

| Method | Path | Does | Capability |
|---|---|---|---|
| `GET` | `imports/sources` · `imports/fields` · `imports/sample` | Sources, mappable fields, a sample CSV in `data.csv` | `import_{type}` |
| `POST` | `imports` | Upload a CSV and open an import | `import_{type}` |
| `GET` · `PUT` · `DELETE` | `imports/{id}` | Read, save mapping and options, discard | `import_{type}` |
| `GET` | `imports/{id}/preview` | The first rows, as mapped | `import_{type}` |
| `POST` | `imports/{id}/start` · `imports/{id}/cancel` | Start, cancel | `import_{type}` |
| `GET` | `imports/{id}/errors` | The rows that failed, as CSV text in `data.csv` | `import_{type}` |
| `GET` | `exports/columns` | The columns an export can include | `export_{type}` |
| `POST` | `exports/count` | How many records an export would hold | `export_{type}` |
| `POST` | `exports` | Start an export | `export_{type}` |
| `GET` · `DELETE` | `exports/{id}` | Read, delete | `export_{type}` |
| `GET` | `exports/{id}/download` | Download the file | `export_{type}` |
| `POST` | `exports/{id}/cancel` | Cancel | `export_{type}` |

### Automations

| Method | Path | Does | Capability |
|---|---|---|---|
| `GET` | `automations` | List automations | `view_automations` |
| `GET` | `automations/counts` | Counts by status | `view_automations` |
| `POST` | `automations` | Create an automation | `edit_automations` |
| `POST` | `automations/bulk` | Activate, pause or delete many | `edit_automations`, or `delete_automations` to delete |
| `GET` | `automations/options/{source}` | Search an [option source](/developers/automations/fields/#option-sources) | `edit_automations` |
| `GET` | `automations/recipes` | Ready-made automations | `edit_automations` |
| `POST` | `automations/recipes/{key}` | Create one from a recipe | `edit_automations` |
| `GET` · `PUT` · `DELETE` | `automations/{id}` | Read, save, delete | `view_` · `edit_` · `delete_automations` |
| `POST` | `automations/{id}/status` | Turn on, pause, or set to draft | `edit_automations` |
| `PUT` · `DELETE` | `automations/{id}/draft` | Save or discard a live automation's draft | `edit_automations` |
| `POST` | `automations/{id}/publish` | Publish the draft | `edit_automations` |
| `POST` | `automations/{id}/duplicate` | Copy it | `edit_automations` |
| `POST` | `automations/{id}/test-email` · `automations/{id}/test-webhook` | Send a step as a test | `edit_automations` |
| `GET` | `automations/{id}/report` | Report numbers | `view_automations` |
| `GET` | `automations/{id}/sends` | Who got one of its emails (`step`) | `view_automations`, `view_contacts` |
| `GET` | `automations/{id}/subscribers` | Its runs | `view_automations`, `view_contacts` |
| `POST` | `automations/{id}/subscribers` | Add contacts by id, or by `audience` | `edit_automations`, `view_contacts` |
| `POST` | `automations/{id}/subscribers/preview` | Count who an `audience` would add | `edit_automations`, `view_contacts` |
| `GET` | `automations/{id}/subscribers/{run}` | One run's history | `view_automations`, `view_contacts` |
| `POST` | `automations/{id}/subscribers/cancel` | Take active runs out | `edit_automations` |
| `POST` | `automations/{id}/subscribers/remove` | Delete finished runs and their history | `delete_automations` |

### Campaigns

| Method | Path | Does | Capability |
|---|---|---|---|
| `GET` | `campaigns` | List campaigns. `channel` picks email (the default), `sms` or `whatsapp` | `view_campaigns` |
| `GET` | `campaigns/counts` | Counts by status | `view_campaigns` |
| `GET` | `campaigns/audience-counts` | How many an audience would reach | `edit_campaigns` |
| `POST` | `campaigns` | Create a campaign | `edit_campaigns` |
| `POST` | `campaigns/bulk-delete` | Delete many | `delete_campaigns` |
| `GET` · `PUT` · `DELETE` | `campaigns/{id}` | Read, save, delete | `view_` · `edit_` · `delete_campaigns` |
| `POST` | `campaigns/{id}/duplicate` | Copy it | `edit_campaigns` |
| `GET` | `campaigns/{id}/recipients` · `campaigns/{id}/sends` | Who it reaches; what was sent | `view_campaigns` |
| `GET` | `campaigns/{id}/report` · `campaigns/{id}/preview` | Report; rendered preview | `view_campaigns` |
| `POST` | `campaigns/{id}/test` | Send a test email | `edit_campaigns` |
| `POST` | `campaigns/{id}/send` | Send now or schedule | `send_campaigns` |
| `POST` | `campaigns/{id}/unschedule` · `pause` · `resume` · `cancel` | Change a send in progress | `send_campaigns` |
| `POST` | `campaigns/{id}/resend` | Send again to a group of recipients | `send_campaigns` |
| `POST` | `campaigns/{id}/ab/send-winner` | Send an A/B test's winner | `send_campaigns` |
| `POST` · `DELETE` | `campaigns/{id}/repeat` | Make it recurring; stop repeating | `send_campaigns` |
| `POST` | `campaigns/{id}/tag` | Tag or list a group of recipients | `view_campaigns`, `edit_contacts` |

### Emails, templates and patterns

These need `edit_campaigns` or `edit_automations`, except where noted.

| Method | Path | Does |
|---|---|---|
| `POST` | `emails/render` | Render an email body to HTML |
| `POST` | `emails/footer` | Render the footer |
| `GET` | `emails/action-links` | The action links an email can use |
| `GET` · `POST` | `templates` | List, create |
| `POST` | `templates/bulk` | Bulk action |
| `GET` | `templates/{key}` · `templates/{key}/preview` | Read, preview |
| `POST` | `templates/{key}/duplicate` | Copy |
| `PUT` · `DELETE` | `templates/{id}` | Save, delete |
| `GET` · `POST` | `email-patterns` | List, create |
| `GET` | `email-patterns/library` | The built-in patterns |
| `POST` | `email-patterns/bulk` | Bulk action |
| `GET` · `PUT` · `DELETE` | `email-patterns/{id}` | Read, save, delete |

### Send log

| Method | Path | Does | Capability |
|---|---|---|---|
| `GET` | `sends` | Every email sent, from any source | `view_logs` |
| `DELETE` | `sends` | Delete log entries | `delete_logs`, or delete on what sent them |
| `POST` | `sends/resend` · `sends/{id}/resend` | Send again | `send_campaigns` or `edit_automations`, by what sent them |
| `GET` | `sends/{id}/preview` | The email as sent | `view_logs`, or view on what sent it |

### Notes

| Method | Path | Does | Capability |
|---|---|---|---|
| `GET` | `notes` | Notes on a record: `object_type` and `object_id`; `manual=1` for only what people wrote. An entry is on every record it links to. Each carries `is_manual`, `fields`, `is_pinned` (on this record), `links` and `related`: the other records it is on that you may see, each with `title` and `path` | `view_` on that record type |
| `GET` | `notes/link-options` | What an entry on this record may also be about (a contact's or company's open deals, a deal's people): `object_type`, `object_id`, `title` | `edit_` on that record type |
| `POST` | `notes/{id}/pin` | Pin or unpin (`is_pinned`) on one record, `object_type` and `object_id` | `edit_` on that record type |
| `POST` | `notes` | Log a note, call or meeting; always `is_manual`. `fields` keeps only the kind's own (a call's `outcome`, an email's `direction`), each one of its options. `links` adds other records it is about, each `object_type` and `object_id` | `edit_` on that record type, and on each linked record |
| `PUT` · `DELETE` | `notes/{id}` | Update a manual one (an automatic one answers `422`; `links` replaces every record it is on), delete any | `edit_` · `delete_` on every record it is on |
| `POST` | `notes/delete` | Delete several at once: `ids`, at most 100. One record you may not delete on refuses them all | `delete_` on every record they are on |

### Reports

| Method | Path | Does | Capability |
|---|---|---|---|
| `GET` | `reports/contacts` · `reports/email` | Contact and email reports | `view_reports` |
| `GET` | `reports/dashboard` | The dashboard | `manage_dashboard` |

#### Store reports (Marker CRM Pro)

`{store}` is a store registered on `marker_crm/commerce_stores`: `woocommerce`, `edd`. Any other answers `404`.

| Method | Path | Does | Capability |
|---|---|---|---|
| `GET` | `stores/{store}/report` | Totals for all time, customer stages and health, cut-offs, and what the store has: `subscriptions`, `subscribers` (`active`, `monthly`), `emails`, `segments`, `extra` | `view_reports` |
| `GET` | `stores/{store}/report/sales` | Today and this month: revenue and orders, what emails earned (`null` where the store does not track it), carts won back | `view_reports` |
| `GET` | `stores/revenue` | What one `campaign`'s or `automation`'s emails sold in every store: `orders`, `value`, `currency` | `view_campaigns` or `view_automations` |
| `GET` | `stores/{store}/report/trend` | Per bucket of `from`–`to` (site dates): revenue, orders, subscriptions started and ended, and new and returning customers, beside the period `compare` names (`previous`, `month`, `quarter`, `year`, `custom` with `compare_from` and `compare_to`, `none`). `kind` (`all`, `subscriptions`, `subscription`, `renewal`, `one_time`) and `products` narrow revenue and orders | `view_reports` |
| `GET` | `stores/{store}/report/cards/{card}` | `emails`, `products` or `subscriptions` for `from`–`to`; a card the store has not got answers `404` | `view_reports` |
| `POST` | `stores/{store}/report/stages/{stage}` | Save a stage's customers as a segment, kept up to date, and return its `id` | `edit_segments` |
| `POST` | `stores/{store}/report/cutoffs` | Save `at_risk_days`, `lapsed_days`, `top_percent` | `manage_settings` |

### AI

`ai/status`, `ai/settings`, `ai/models` and `ai/test` answer whether the add-on is on or off, for its settings page; the rest only while it is on,
otherwise `404`. A request the AI cannot answer is `422` with its reason, and more than
the minute's allowance is `429`.

| Method | Path | Does | Capability |
|---|---|---|---|
| `GET` | `ai/status` | Whether it is `enabled`, whether the site supports WordPress AI, its connected `connectors` and their `models`, the other `providers`, and the settings, the API key masked | `manage_settings` |
| `POST` | `ai/settings` | Save `provider` (`wordpress`, `openai`, `anthropic`, `gemini`, `openrouter`), `model`, `api_key`, `brand_voice`, `summary_notes`. Any provider but `wordpress` needs a key and a model; the key is stored encrypted, and `••••••••` keeps the saved one. Answers as `ai/status` | `manage_settings` |
| `POST` | `ai/models` | The models of `provider` for `api_key` (`••••••••` for the saved one), as the provider lists them | `manage_settings` |
| `POST` | `ai/test` | One short request with `provider`, `model` and `api_key` as given, saved or not: `reply` | `manage_settings` |
| `POST` | `ai/improve` | `action` (`rewrite`, `shorten`, `expand`, `grammar`, `tone`, `translate`, `custom`), `text` (HTML), `tone`, `language`, `instruction` → `text`, `warnings` (merge tags lost or unknown) | `edit_campaigns`, `edit_automations` or `send_campaigns` |
| `POST` | `ai/draft` | `brief`, `tone`, `length` (`short`, `medium`, `long`) → `body` (HTML), `subjects` (up to five), `preview`, `warnings` | as `ai/improve` |
| `POST` | `ai/subjects` | `content` (the email), `subject`, `preview` → `subjects` (up to five), `previews` (up to three) | as `ai/improve` |
| `GET` · `POST` | `ai/summaries/{type}/{id}` | The saved summary of a `contact`, `company` or `deal`, or `null`; `POST` writes a new one. A record you may not see answers `404` | `view_` on that record type |

### Settings and administration

All need `manage_settings`, except `users`.

| Method | Path | Does |
|---|---|---|
| `GET` · `POST` | `settings/{group}` | Read, save a settings group |
| `POST` | `settings/email/test` | Send a test email |
| `GET` | `settings/email/bounces` | Bounce handling details |
| `GET` · `POST` | `action-links` | List, create action links |
| `PUT` · `DELETE` | `action-links/{id}` | Update, delete |
| `GET` · `POST` | `webhooks` | List, create incoming webhooks |
| `GET` | `webhooks/options` | What a webhook can do |
| `GET` · `PUT` · `DELETE` | `webhooks/{id}` | Read, update, delete |
| `POST` | `webhooks/{id}/reissue` | Issue a new URL token |
| `GET` | `modules` | List modules |
| `POST` | `modules/{slug}` | Switch a module on or off |
| `GET` · `POST` | `permissions` | List, grant CRM permissions to a user |
| `GET` | `permissions/capabilities` · `permissions/candidates` | The capability catalogue; users who can be granted |
| `PUT` · `DELETE` | `permissions/{id}` | Update, revoke |
| `GET` | `queue` | Queue status |
| `POST` | `queue/retry` · `queue/run` | Retry failed jobs; run the queue now |
| `GET` | `tools/report` | System report |
| `POST` | `tools/repair` | Repair the database indexes |
| `GET` · `DELETE` | `tools/logs` | Read, clear the system log |
| `GET` | `users` | WordPress users a record can be assigned to — needs `view_contacts` |

### Public endpoints

These need no sign-in. They are addressed by long random tokens, never by ids, rate limited,
and answer an unknown token the same way as a disabled one.

| Method | Path | Does |
|---|---|---|
| `POST` | `public/hooks/{token}` | An incoming webhook. The body is a JSON object; what it does is set on the webhook (**Settings → Webhooks**). Too many calls a minute answer `429` |
| `GET` · `POST` | `public/bounces/{provider}/{key}` | A mail provider reporting bounces and complaints |

Tracking pixels, click redirects, unsubscribe, preferences and opt-in confirmation are not REST
routes: they are front-end URLs (`?marker_crm=…`), so they work without pretty permalinks.
