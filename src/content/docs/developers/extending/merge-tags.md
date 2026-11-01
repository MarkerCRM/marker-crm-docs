---
title: Merge tags
description: Add your own {{token}} to emails and automation text, including values from the trigger that started a run.
sidebar:
  order: 1
---

A merge tag is a `{{token}}` that is replaced per contact when an email is rendered. Register
your own on the `marker_crm/merge_tags` filter, and it appears in the editor's merge tag
picker beside the core ones.

```php
add_action('marker_crm/loaded', function () {
    add_filter('marker_crm/merge_tags', function (array $tags) {
        $tags['acme.points'] = [
            'label'    => __('Reward points', 'acme'),
            'fallback' => '0',
            'resolve'  => function (array $on) {
                $userId = (int) ($on['contact']->user_id ?? 0);

                return $userId ? (string) (int) get_user_meta($userId, 'acme_points', true) : '';
            },
        ];

        return $tags;
    });
});
```

In an email: `You have {{acme.points}} points.`

## The tag

The array key is the token. Use lowercase letters, numbers, `_` and `.`, and prefix it with
your plugin's slug.

| Key | | |
|---|---|---|
| `label` | Required | Shown in the merge tag picker |
| `resolve` | Required | `callable(array $on): string` — the value for this contact |
| `fallback` | | Used when `resolve` returns an empty string and the token gives no fallback of its own |
| `group` | | The picker heading: `contact`, `company`, `business`, `dates` or `other` (the default). Any other value becomes a heading of its own, titled with the value |

A tag without a callable `resolve` renders as an empty string.

### What `$on` holds

| Key | | Present |
|---|---|---|
| `contact` | `Models\Contact` | When a contact is known — not when rendering a footer on its own |
| `address` | `string`, the address the email goes to | With `contact` |
| `send` | `Models\Send`, the email being sent | When rendering an email |
| `run` | `Models\AutomationSubscriber`, the automation run | When the email was sent by an automation, or text is rendered through `RunContext::mergeData()` |

Any key can be missing. Read with `?? ''`, the way the core tags do.

## Fallbacks in the token

Whoever writes the email can give a fallback in the token itself, which wins over yours:

```text
Hi {{contact.first_name|friend}},
```

Values are trimmed. An empty value takes the token's fallback, then the tag's `fallback`,
then an empty string.

## Values from the trigger

An email sent from an automation carries its run as `$on['run']`. The run's `data['context']`
is the context the trigger fired with — merged with the context of any event that moved the
run since. That lets an integration offer tags for the event that started the automation:

```php
$tags['order.total'] = [
    'label'   => __('Order total', 'acme'),
    'resolve' => fn (array $on) => $on['run']->data['context']['total'] ?? '',
];
```

Outside an automation, `run` is missing and the tag renders empty, or its fallback.

## Escaping

You return plain text. `MergeTagService::render()`, used for email HTML, escapes every value
for HTML. `MergeTagService::text()`, used for plain-text places such as a field value or user
meta written by an automation, leaves it as it is — so *O'Brien* stays *O'Brien*. Do not
escape in `resolve`, or the value is escaped twice.

## Link tags

Unsubscribe and preference links are a separate kind, written `##unsubscribe_url##` and
registered on `marker_crm/merge_url_tags` as `token => callable(array $on): string`. The
result is passed through `esc_url()` and listed under **Links** in the picker. Core registers
`unsubscribe_url` and `manage_subscription_url`.

## Where tags are filled

- Campaign and automation emails: subject, preview text and body.
- The footer.
- Automation steps that write text: the team email, notes, **Update contact fields** values,
  user meta, webhook fields — through `RunContext::mergeData()`.
- Your own steps, with `MergeTagService::text($text, $run->mergeData($contact))`.

The `{{today}}` (`Y-m-d`) and `{{now}}` (`Y-m-d H:i`) tags are on the site's clock.
