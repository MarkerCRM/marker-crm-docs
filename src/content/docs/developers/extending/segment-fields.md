---
title: Segment fields
description: Add a rule that segments, automation conditions, Only if and Leave when can all use, answered by your own query.
sidebar:
  order: 3
---

Segments, **If / else** steps, a trigger's **Only if** rules and **Leave when** all draw their
fields from one registry. Add a field to `marker_crm/segment_fields` and it is offered in all
four places, so a rule built anywhere is one the engine can answer.

```php
use MarkerCRM\App\Models\ContactMeta;

add_action('marker_crm/loaded', function () {
    add_filter('marker_crm/segment_fields', function (array $fields) {
        $fields['acme_level'] = [
            'label'     => __('Member level', 'acme'),
            'group'     => 'Acme',
            'type'      => 'select',
            'options'   => [
                ['value' => 'gold', 'label' => __('Gold', 'acme')],
                ['value' => 'silver', 'label' => __('Silver', 'acme')],
            ],
            'operators' => ['=', '!='],
            'source'    => [
                'type'    => 'callback',
                'resolve' => function ($query, string $operator, $value, array $field) {
                    $holders = ContactMeta::query()
                        ->select('contact_id')
                        ->where('meta_key', 'acme_level')
                        ->where('meta_value', (string) $value);

                    $operator === '!=' ? $query->whereNotIn('id', $holders) : $query->whereIn('id', $holders);
                },
            ],
        ];

        return $fields;
    });
});
```

## The field

The array key is the field's key, stored in every rule that uses it. Use lowercase letters,
numbers and underscores, prefixed with your plugin's slug.

| Key | | |
|---|---|---|
| `label` | | Shown in the field picker. Defaults to the key |
| `group` | | The picker tab it sits on. The core tabs are *Contact*, *Segmentation*, *Email activity*, *WordPress* and *Company*; any other name adds a tab |
| `section` | | A heading inside the tab |
| `type` | | `text` (the default), `number`, `select`, `multiselect`, `date` or `boolean`. Decides the input and the default operators |
| `options` | | `[['value' => …, 'label' => …], …]` for `select` and `multiselect` |
| `operators` | | A subset of the type's operators, when not all of them make sense |
| `source` | Required | Where the value is read from: `['type' => 'callback', 'resolve' => callable]`, or `['type' => 'meta', 'key' => …]` — see [below](#values-in-contact-meta) |

### Operators

| `type` | Operators |
|---|---|
| `text` | `=` `!=` `contains` `not_contains` `starts_with` `ends_with` `is_set` `is_not_set` |
| `number` | `=` `!=` `>` `<` `between` `is_set` `is_not_set` |
| `select` | `=` `!=` `in` `not_in` `is_set` `is_not_set` |
| `multiselect` | `in` `not_in` `all_of` `is_set` `is_not_set` |
| `date` | `before` `after` `between` `within_days` `more_than_days_ago` `is_set` `is_not_set` |
| `boolean` | `=` `!=` |

A rule using an operator the field does not allow is refused before your resolver runs.

## The resolver

```php
function ($query, string $operator, $value, array $field): void
```

| Argument | |
|---|---|
| `$query` | The contacts query (`Models\Contact`). Constrain it; return nothing |
| `$operator` | One of the operators the field allows |
| `$value` | Cleaned to scalars: a string or number, an array of them for `in`, `not_in`, `all_of` and `between`, or `null` for `is_set` and `is_not_set` |
| `$field` | Your field definition, after defaults are filled in |

The rule runs against the whole contacts table — a segment of 200,000 contacts, a campaign's
audience, an **Only if** check on every entry. So the resolver must stay a query:

- Constrain with `whereIn('id', <subquery>)` / `whereNotIn`, as above. Never load contacts and
  filter them in PHP.
- Use bindings. Never interpolate `$value` into SQL.
- Query your own indexed table, or `ContactMeta` by `meta_key`. A search by meta *value* across
  a large table is slow; if you need to filter by value often, keep your own table.
- Handle the negative operators (`!=`, `not_in`, `is_not_set`) so that a contact with no value
  is counted in, the way the core fields do.

## Values in contact meta

If the value is stored in the contact meta table (`{prefix}marker_crm_contact_meta`, model
`Models\ContactMeta`) under one key, you need no resolver. The built-in `meta` source handles
every operator of the field's type, including counting contacts with no value into the
negative ones:

```php
$fields['acme_level'] = [
    'label'   => __('Member level', 'acme'),
    'group'   => 'Acme',
    'type'    => 'select',
    'options' => [['value' => 'gold', 'label' => __('Gold', 'acme')]],
    'source'  => ['type' => 'meta', 'key' => 'acme_level'],
];
```

## When it cannot answer

A rule whose field is gone from the registry — your add-on was deactivated — or whose resolver
throws is not treated as the contact's failure:

- a segment or preview using it answers with a 422 error naming the field;
- an automation run at a condition or **Leave when** rule holds 15 minutes at a time without
  using up an attempt, and the automation is listed as unavailable;
- an **Only if** rule lets nobody in.

Each case is logged under *automations* when debug logging is on. A `callback` source without
a callable `resolve` is treated the same way.

## Changing core fields

The filter receives every core field, already built — contact columns, subscriptions, email
activity, automations, WordPress, company, tags, lists and custom fields. You may relabel or
`unset()` one, but a rule already saved with a removed field stops being answerable.

The field list is built once per request. If you add fields after the first segment has been
read in that request, call `MarkerCRM\App\Services\Segment\SegmentFieldRegistry::flush()`.
