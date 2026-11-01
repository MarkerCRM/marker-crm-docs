---
title: Settings fields
description: The field schema the automation builder renders for a trigger or action — types, layout, conditional fields, repeating rows and searchable option sources.
sidebar:
  order: 3
---

A trigger or action describes its settings panel as data, in `fields`. The automation builder
draws it with the same components every core step uses, so an add-on ships no JavaScript and
its panel looks like the rest of the product.

```php
'fields' => [
    ['key' => 'any', 'label' => __('Any level', 'acme'), 'type' => 'checkbox'],
    [
        'key'         => 'level',
        'label'       => __('Level', 'acme'),
        'type'        => 'select',
        'source'      => 'acme_levels',
        'placeholder' => __('Pick a level', 'acme'),
        'description' => __('Searched as you type.', 'acme'),
        'required'    => true,
        'show_if'     => ['field' => 'any', 'equals' => false],
    ],
],
```

What the person chooses is saved as the step's settings, keyed by each field's `key`, and
handed to your callables as `$settings`.

## Field keys

| Key | | |
|---|---|---|
| `key` | Required | The settings key. A field without one is dropped |
| `label` | | The field's label |
| `type` | | One of the [types below](#types). An unknown type is drawn as a text input |
| `options` | | For `select`, `multiselect`, `radio` and `checkboxes`: `[['value' => …, 'label' => …], …]`. An option may carry `group` to sit under a heading in a select |
| `required` | | The automation cannot be turned on while this is empty. See [Required](#required) |
| `default` | | What a new step starts with |
| `placeholder` | | Placeholder text |
| `description` | | Help text under the field |
| `empty` | | On an action's first field: what the step's card says when it is left blank, such as *Any product* |
| `row` | | Fields next to each other with the same `row` value share one line, under the first one's label — a number and its unit |
| `source` | | The name of an [option source](#option-sources) to search instead of `options` |
| `show_if` | | Show the field only when another field has a given value. See [Conditional fields](#conditional-fields) |

Translate labels, descriptions, placeholders and option labels with `__()` in PHP. A
`placeholder`, `description`, `source` or `row` that is not a string is dropped.

**Make `default` what your code assumes when the key is missing.** A step saved before you
added a field has no value for it, and the screen should never show a blank that your code
reads as something else.

## Types

| `type` | Drawn as | Saved as |
|---|---|---|
| `text` · `email` · `url` | A text input | `string` |
| `textarea` | A three-line text area | `string` |
| `number` | A number input | `int`, `float` or `null` |
| `phone` | A phone number input | `string` |
| `date` | A date picker | `string`, `Y-m-d` |
| `datetime` | A date and time picker | `string`, `Y-m-d H:i` |
| `time` | A time picker, every 15 minutes | `string`, `HH:MM` |
| `select` | A searchable dropdown of `options`, or of a `source` | One value |
| `multiselect` | The same, choosing several | An array of values |
| `radio` | Radio buttons | One value |
| `checkboxes` | A set of checkboxes | An array of values |
| `checkbox` | An on/off switch | `true` or `false`; `''` if never touched and no `default` |
| `editor` | An HTML editor | `string` of HTML |
| `rows` | A repeating group of fields. See [Rows](#rows) | An array of arrays |
| `note` | No input — shows `description` as a line of help text | Nothing |

:::caution
Without a `sanitize` callable, settings are cleaned field by field: `html` and `body` go
through `wp_kses_post()`, and everything else through `sanitize_text_field()`, which strips
tags. An `editor` field under any other key loses its HTML unless your `sanitize` keeps it.
:::

## Conditional fields

`show_if` hides a field unless another field in the same block holds a value:

```php
['key' => 'days', 'label' => __('Days away', 'acme'), 'type' => 'number',
    'show_if' => ['field' => 'which', 'equals' => 'away']],
```

- `equals` may be a list, which matches any of its values:
  `'equals' => ['weekday', 'field']`.
- To follow a `checkbox`, compare with `true` or `false`.
- A `show_if` that names a field not in the block, or whose `equals` holds nothing scalar, is
  dropped and the field always shows.

A hidden field is not checked by `required`.

## Rows

A `rows` field repeats a group of fields. Its own `fields` key is a schema like this one:

```php
[
    'key'      => 'updates',
    'label'    => __('Fields', 'acme'),
    'type'     => 'rows',
    'required' => true,
    'add'      => __('Add another field', 'acme'),
    'fields'   => [
        ['key' => 'field', 'label' => __('Field', 'acme'), 'type' => 'select', 'required' => true, 'options' => [/* … */]],
        ['key' => 'value', 'label' => __('New value', 'acme'), 'type' => 'text'],
    ],
]
```

Saved as `['updates' => [['field' => …, 'value' => …], …]]`.

| Key | |
|---|---|
| `fields` | The schema of one row |
| `add` | Label of the button that adds a row. Defaults to *Add another* |
| `layout` | `'table'` draws one heading per column and a line of inputs per row — suits key → value pairs. Without it, each row is a stacked card |
| `toggle` | The settings key of an on/off switch shown above the table; the rows show only while it is on. Use with `layout: table` |

A new step starts with one empty row.

## Option sources

A pick list too big to send with every admin page — products, forms, courses — is an **option
source**, searched on the server as the person types. Register it on
`marker_crm/automation_option_sources`:

```php
add_filter('marker_crm/automation_option_sources', function (array $sources) {
    $sources['acme_products'] = [
        'search'  => fn (string $search, int $page) => [
            'items' => acme_products($search, $page),   // [['value' => 7, 'label' => 'Hat'], …]
            'more'  => acme_has_more($search, $page),
        ],
        'resolve' => fn (array $values) => acme_products_named($values),   // same shape, for the chosen values
    ];

    return $sources;
});
```

Then name it in a field:

```php
['key' => 'product', 'label' => __('Product', 'acme'), 'type' => 'select', 'source' => 'acme_products']
```

- `type => 'select'` chooses one; `multiselect` chooses several.
- `search` gets the search text (empty for the first page) and a page number from 1. Return at
  most 25 items a page; more are cut off. Set `more` to `true` while there is another page.
- `resolve` gets the saved values (at most 100) and returns their labels, so the field can show
  what is already chosen. It is optional, but without it a saved choice shows as its raw value.
- Values may be integers or strings. Values and labels are cleaned to plain text on the way
  out.
- A source that throws answers an empty list, and the failure is logged under *automations*.
- A source whose name is not lowercase letters, numbers, dashes and underscores, whose
  `search` is not callable, or whose `resolve` is given but not callable, is skipped with a
  `_doing_it_wrong()` notice.

The builder reads a source through
`GET /wp-json/markercrm/v2/automations/options/{source}` with `search` and `page`, or with
`values[]` to label what is chosen. The endpoint needs the `edit_automations` capability.

### Built-in sources

These need no registration and can be named in any field: `tags`, `lists`, `companies`,
`campaigns`, `automations`, `sequences`, `roles` and `grantable_roles` (roles that cannot run
the site). `tags` and `lists` also let the person create a new one from the field.

## Required

A field with `'required' => true` that is left empty stops the automation being turned on and
a draft being published. The builder lists it in its review, and the server makes the same
check, so nothing can activate an automation around it.

Empty means `null`, `''`, `false`, `0` or `[]`. A `number` field where `0` is a valid answer
should not be required. For a `rows` field, required means at least one row, and every row's
own required fields filled. Hidden fields (`show_if`) are not checked.

A step that becomes unfinished after the automation is live — its chosen tag deleted — is not
caught here. Your `run` sees the empty value and should answer with `skipped()` or `fail()`.
