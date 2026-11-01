---
title: Term types
description: Add a new kind of named group beside tags and lists, and what Marker CRM does with it.
sidebar:
  order: 2
---

Tags and lists are both **terms**, told apart by their `type`. The set of types is a filter,
so an add-on can add its own — a membership tier, a course cohort — and contacts can hold
terms of that type the way they hold tags.

```php
add_action('marker_crm/loaded', function () {
    add_filter('marker_crm/term_types', function (array $types) {
        $types[] = 'acme_tier';

        return $types;
    });
});
```

Use a key of lowercase letters, numbers and underscores, prefixed with your plugin's slug.

:::caution
There is no admin screen for a new type. **Contacts → Tags** and **Contacts → Lists** manage
only those two. Your add-on creates the terms and assigns them, through the REST API or the
services below.
:::

## What you get

Once the type is registered:

| | |
|---|---|
| REST | `GET terms?type=acme_tier` lists them and `POST terms` with `type` creates one; `PUT` and `DELETE terms/{id}` work on any term. An unregistered type is read as `tag`, and the success messages use the tag wording |
| Contacts | `ContactService::createOrUpdate()` and the contacts REST endpoints accept `acme_tiers` (the type plus `s`): an array of term ids |
| Contact responses | Each contact carries `acme_tiers`, the ids it holds, when its terms are loaded |
| Segments and conditions | A rule field `acme_tiers` on the **Segmentation** tab, with *is any of*, *is none of*, *has all of*, *is set* and *is not set* |
| Admin boot data | The type's terms are sent to the admin with the tags and lists, up to the boot limit |
| Events | `marker_crm/term_attached` and `marker_crm/term_detached` |

## Creating terms

```php
use MarkerCRM\App\Services\Contact\TermService;

$gold = TermService::createOrUpdate(['type' => 'acme_tier', 'name' => 'Gold']);
```

A slug is made from the name and kept unique within the type. Colours belong to tags and
public/private visibility to lists, so a term of a new type has neither.

Over REST: `POST /wp-json/markercrm/v2/terms` with `type` and `name`. It needs the
`edit_segments` capability.

## Assigning terms

Pass the full set of the type's term ids for the contact:

```php
use MarkerCRM\App\Services\Contact\ContactService;

ContactService::createOrUpdate(['id' => $contact->id, 'acme_tiers' => [$gold->id]]);
```

The array **replaces** the contact's terms of that type: ids left out are removed. Leave the
key out entirely to leave them alone. Ids that belong to a different type are ignored.

For each term added and each removed, Marker CRM fires:

| Hook | Arguments |
|---|---|
| `marker_crm/term_attached` | `Model $object, Term $term` |
| `marker_crm/term_detached` | `Model $object, Term $term` |

`$object` is the contact. Check `$term->type` — these hooks fire for every add-on type, not
only yours. Tags and lists fire their own names instead (`tag_added_to_contact`,
`contact_added_to_list` and the rest).

## Remembering who left

By default, removing a term deletes the relation, as with tags. A list instead keeps it with
`status: unsubscribed`, so the CRM remembers the person opted out. To give your type the same
behaviour, add it to `marker_crm/stateful_term_types`:

```php
add_filter('marker_crm/stateful_term_types', function (array $types) {
    $types[] = 'acme_tier';

    return $types;
});
```

## Naming the segment field

The segment field is labelled with the type key, capitalised (*Acme_tier*). Give it a proper
label on `marker_crm/segment_fields`, which runs after the field is built:

```php
add_filter('marker_crm/segment_fields', function (array $fields) {
    if (isset($fields['acme_tiers'])) {
        $fields['acme_tiers']['label'] = __('Membership tier', 'acme');
    }

    return $fields;
});
```

## Many terms

Past 300 terms of a type, the admin is sent only the newest 300 and searches the server for
the rest. `marker_crm/term_boot_limit` changes that number for every type.

## What it does not do

- No automation triggers. *Tag is added* and *Added to a list* are for tags and lists only;
  register your own trigger on `marker_crm/term_attached` if you need one.
- No filter on the contacts list screen, and no bulk add or remove from it.
- Deleting a term (`TermService::delete()`) removes it from every contact silently. Nothing is
  fired per contact.
