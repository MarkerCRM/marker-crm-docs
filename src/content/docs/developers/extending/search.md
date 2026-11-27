---
title: Search
description: Add your own kind of record to the header's search, and your own entry under Create.
sidebar:
  order: 4
---

The search at the top of the CRM asks one endpoint, `GET search`, which runs every **search
kind** this user may see. Add your own on the `marker_crm/search_kinds` filter:

```php
add_action('marker_crm/loaded', function () {
    add_filter('marker_crm/search_kinds', function (array $kinds) {
        $kinds['acme_invoices'] = [
            'label' => __('Invoices', 'acme'),
            'icon'  => 'file-text',
            'cap'   => 'view_contacts',
            'find'  => function (string $term, int $limit) {
                return array_map(fn ($invoice) => [
                    'id'       => $invoice->id,
                    'title'    => $invoice->number,
                    'subtitle' => $invoice->customer,
                    'path'     => "/acme/invoices/{$invoice->id}",
                ], acme_find_invoices($term, $limit));
            },
        ];

        return $kinds;
    });
});
```

The array key names the kind: lowercase letters, digits, `_` and `-`, since `GET search?kind=`
passes through `sanitize_key`.

| Key | |
|---|---|
| `label` | The group's name, translated |
| `icon` | A [lucide](https://lucide.dev/icons) icon name the admin knows (`users`, `tag`, `file-text`, `handshake`, …); an unknown one shows a magnifier |
| `cap` | A Marker CRM capability without its prefix (`view_contacts`); left out, anyone with CRM access may search it |
| `module` | An add-on slug; the kind is searched only while it is on |
| `find` | `callable(string $term, int $limit): array` returning items, best first |

Each item is `id` (an integer), `title`, `subtitle` (optional) and `path`, the admin route it
opens (`/contacts/7`, `/contacts?tags=3`). Return at most `$limit`: search asks for one more than it
shows, to know whether there are more.

`$term` is what was typed, trimmed and at least two characters. Use bindings, never
interpolation. `MarkerCRM\App\Services\SearchService::like($term)` returns the pattern for a
`LIKE`, with `%` and `_` escaped: `%term%`, or `term%` with `like($term, false)`.
`SearchService::startingFirst($query, 'title', $term)` orders rows whose column starts with the
term first; the column goes into the SQL as it is, so pass only a column name of your own.

**Check access inside `find`.** `cap` decides whether the kind is searched at all; which rows
this user may see within it is yours to narrow, as the deals kind narrows to the user's
pipelines.

A `find` that throws is logged and left out; the other kinds still answer.

Search runs on every pause in typing, so `find` must be one or two queries whatever it finds:
load what the items need with the rows, never per row.

## An entry under Create

Before anything is typed, search offers things to create. Add one from your admin script:

```js
import {FilePlus} from 'lucide-vue-next';

const {addons} = window.markerCRM;

addons.searchAction({label: 'New invoice', path: '/acme/invoices?new=1', icon: FilePlus, cap: 'marker_crm_edit_contacts', module: 'acme'});
```

`label` is looked up in the admin's strings, `icon` is a Vue component, `cap` is the full
capability, with its `marker_crm_` prefix (unlike the PHP kind's), and `module` hides it while
that add-on is off. Left without `cap`, everyone with CRM access sees it.
