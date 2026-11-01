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
given at least one Marker CRM permission on **Settings → Permissions**. Inside, each endpoint
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

### Segments

| Method | Path | Does | Capability |
|---|---|---|---|
| `GET` | `segments` | List segments | `view_segments` |
| `POST` | `segments` | Create a segment | `edit_segments` |
| `GET` · `PUT` · `DELETE` | `segments/{id}` | Read, update, delete | `view_` · `edit_` · `delete_segments` |
| `GET` | `segments/fields` | Every rule field, for building conditions | `view_segments` or `edit_automations` |
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
| `GET` | `campaigns` | List campaigns | `view_campaigns` |
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
| `GET` | `notes` | Notes on a record: `object_type` and `object_id` | `view_` on that record type |
| `POST` | `notes` | Log a note, call or meeting | `edit_` on that record type |
| `PUT` · `DELETE` | `notes/{id}` | Update, delete | `edit_` · `delete_` on that record type |

### Reports

| Method | Path | Does | Capability |
|---|---|---|---|
| `GET` | `reports/contacts` · `reports/email` | Contact and email reports | `view_reports` |
| `GET` | `reports/dashboard` | The dashboard | `manage_dashboard` |

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
