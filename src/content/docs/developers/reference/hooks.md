---
title: Hooks
description: Every action and filter Marker CRM fires, with its parameters and when it runs.
sidebar:
  order: 1
---

Every hook is prefixed `marker_crm/`. Actions are named in the past tense and fire after the
change is saved; filters are nouns. Where a model exists, the hook passes the model, not an
array. Model classes are under `MarkerCRM\App\Models\`.

Once shipped, a hook's name and parameters do not change. A new parameter may be appended at
the end. Register with enough accepted arguments — `add_action('marker_crm/contact_unsubscribed',
$callback, 10, 3)` — to receive them.

:::caution
Wrap your callbacks. An exception thrown from a listener on, say, `marker_crm/contact_created`
reaches whatever created the contact — a form submission or a checkout.
:::

## Actions

### Lifecycle

| Hook | Parameters | Fires |
|---|---|---|
| `marker_crm/loaded` | `$app` | On `plugins_loaded`, once Marker CRM is set up. Register everything here |
| `marker_crm/tick` | — | Once a minute, from the queue's WP-Cron event. Check whether something of yours is due here |
| `marker_crm/module_enabled` | `string $slug` | A module (such as `companies`) was switched on |
| `marker_crm/module_disabled` | `string $slug` | A module was switched off |

### Contacts

| Hook | Parameters | Fires |
|---|---|---|
| `marker_crm/contact_created` | `Contact $contact` | A new contact was saved, with its tags, lists and custom fields |
| `marker_crm/contact_updated` | `Contact $contact` | An existing contact was saved through `ContactService::createOrUpdate()` |
| `marker_crm/contact_deleted` | `Contact $contact` | A contact and everything it owned were deleted. The model is no longer in the database |
| `marker_crm/subscription_pending` | `Contact $contact, string $channel` | A subscription became `pending`; the opt-in email is sent from here |
| `marker_crm/optin_requested` | `Contact $contact, string $channel` | An opt-in confirmation email was sent |
| `marker_crm/contact_confirmed` | `Contact $contact, string $channel` | A pending subscription was confirmed and is now `subscribed` |
| `marker_crm/contact_unsubscribed` | `Contact $contact, string $channel, string $reason` | A subscription stopped. `$reason` is `unsubscribed`, a hard reason such as `bounced` or `complained`, or the words given on the preference page |
| `marker_crm/contact_address_in_use` | `Contact $contact, string $channel, string $address, int $ownerId` | A save tried to give a contact an address another contact already holds. The address was not changed |
| `marker_crm/address_suppressed` | `Suppression $row` | An address was added to the suppression list |

### Tags and lists

| Hook | Parameters | Fires |
|---|---|---|
| `marker_crm/tag_added_to_contact` | `Contact $contact, Term $term` | A tag was put on one contact |
| `marker_crm/tag_removed_from_contact` | `Contact $contact, Term $term` | A tag was taken off one contact |
| `marker_crm/contact_added_to_list` | `Contact $contact, Term $term` | A contact joined a list, or rejoined one they had left |
| `marker_crm/contact_removed_from_list` | `Contact $contact, Term $term` | A contact left a list |
| `marker_crm/tag_added_to_contacts` | `int[] $contactIds, Term $term` | A bulk action tagged many contacts. Fires once per tag |
| `marker_crm/tag_removed_from_contacts` | `int[] $contactIds, Term $term` | A bulk action untagged many contacts |
| `marker_crm/contacts_added_to_list` | `int[] $contactIds, Term $term` | A bulk action added many contacts to a list |
| `marker_crm/contacts_removed_from_list` | `int[] $contactIds, Term $term` | A bulk action removed many contacts from a list |
| `marker_crm/term_attached` | `Model $object, Term $term` | A term of an [add-on type](/developers/extending/term-types/) was given to a contact |
| `marker_crm/term_detached` | `Model $object, Term $term` | A term of an add-on type was taken away |

A term the contact already holds fires nothing. After a bulk action, the per-contact hooks
still fire for every contact, so a listener that only needs one of the two may ignore the
other. Deleting a tag or list removes it from everyone without firing these.

### Companies

These fire only while the companies module is on.

| Hook | Parameters | Fires |
|---|---|---|
| `marker_crm/company_created` | `Company $company` | A company was created |
| `marker_crm/company_updated` | `Company $company` | A company was saved |
| `marker_crm/company_deleted` | `Company $company` | A company was deleted |
| `marker_crm/contact_joined_company` | `Contact $contact, Company $company` | A contact was linked to a company |
| `marker_crm/contact_left_company` | `Contact $contact, Company $company` | A contact was unlinked from a company |
| `marker_crm/contacts_joined_company` | `int[] $contactIds, Company $company` | A bulk action linked many contacts. Fires once per company |
| `marker_crm/contacts_left_company` | `int[] $contactIds, Company $company` | A bulk action unlinked many contacts |

### Notes

| Hook | Parameters | Fires |
|---|---|---|
| `marker_crm/note_created` | `Note $note` | A note, call, meeting or other activity was logged |
| `marker_crm/note_updated` | `Note $note` | One was edited |
| `marker_crm/note_deleted` | `Note $note` | One was deleted |

### Automations

| Hook | Parameters | Fires |
|---|---|---|
| `marker_crm/trigger` | `string $name, Contact\|int $contact, array $context` | **You fire this one** to raise a trigger by name. See [Triggers](/developers/automations/triggers/) |
| `marker_crm/automation_created` | `Automation $automation` | An automation was created or duplicated |
| `marker_crm/automation_updated` | `Automation $automation` | An automation's details were saved |
| `marker_crm/automation_deleted` | `Automation $automation` | An automation was deleted |
| `marker_crm/automation_activated` | `Automation $automation` | Its status moved to `active` |
| `marker_crm/automation_paused` | `Automation $automation` | Its status moved to `paused` |
| `marker_crm/automation_drafted` | `Automation $automation` | Its status moved to `draft` |
| `marker_crm/automation_published` | `Automation $automation` | A live automation's draft was published |
| `marker_crm/automation_saved` | `Automation $automation` | After any of the above, and after the steps are saved |
| `marker_crm/automation_entered` | `Automation $automation, Contact $contact, AutomationSubscriber $run` | A contact entered. Once per run, after the insert, also when many enter at once |
| `marker_crm/automation_step_executed` | `AutomationStep $step, Contact $contact, AutomationSubscriber $run, StepResult $result` | A step finished running for a contact |
| `marker_crm/automation_finished` | `AutomationSubscriber $run, string $status` | A run ended: `completed`, `left`, `cancelled` or `failed` |

### Campaigns

| Hook | Parameters | Fires |
|---|---|---|
| `marker_crm/campaign_created` | `Campaign $campaign` | A campaign was created or duplicated |
| `marker_crm/campaign_updated` | `Campaign $campaign` | A campaign was saved |
| `marker_crm/campaign_deleted` | `Campaign $campaign` | A campaign was deleted |
| `marker_crm/campaign_sending` | `Campaign $campaign, int $written` | A campaign was sent or scheduled. `$written` is how many sends were queued in that request |
| `marker_crm/campaign_sent` | `Campaign $campaign` | Every send of a campaign has gone |
| `marker_crm/campaign_paused` | `Campaign $campaign` | Sending was paused |
| `marker_crm/campaign_resumed` | `Campaign $campaign` | Sending was resumed |
| `marker_crm/campaign_cancelled` | `Campaign $campaign` | Sending was cancelled |
| `marker_crm/campaign_unscheduled` | `Campaign $campaign` | A scheduled campaign went back to draft |
| `marker_crm/campaign_test_sent` | `Campaign $campaign, string $address` | A test email was sent |
| `marker_crm/campaign_resent` | `Campaign $campaign, string $group, int $written` | Sends to a group of recipients were queued again |
| `marker_crm/campaign_recipients_tagged` | `Campaign $campaign, string $group, string $action, int[] $termIds, int $touched` | A group of recipients was tagged or listed from the report |
| `marker_crm/campaign_ab_decided` | `Campaign $campaign, $winner, int $released` | An A/B test picked its winner. `$released` is how many held sends were released |
| `marker_crm/campaign_stats_frozen` | `Campaign $campaign` | A finished campaign's report numbers were stored |
| `marker_crm/recurring_campaign_started` | `Campaign $campaign` | A campaign was set to repeat |
| `marker_crm/recurring_campaign_stopped` | `Campaign $campaign` | It stopped repeating |
| `marker_crm/recurring_campaign_ran` | `Campaign $parent, Campaign $child` | A repeat made its next campaign |

### Emails

| Hook | Parameters | Fires |
|---|---|---|
| `marker_crm/email_sent` | `Send $send` | An email was handed to the mailer |
| `marker_crm/email_failed` | `Send $send` | An email failed for the last time and will not be retried |
| `marker_crm/email_opened` | `Send $send, bool $machine, bool $first` | The first open, and again on the first open by a person. `$machine` is `true` for a mail privacy proxy or scanner |
| `marker_crm/email_clicked` | `Send $send, string $target, bool $machine` | A tracked link was clicked. `$machine` is `true` for a security scanner |
| `marker_crm/email_bounced` | `Send $send, string $address, string $type` | A bounce was reported. `$type` is `hard` once the address is stopped |
| `marker_crm/email_complained` | `Send $send, string $address` | A spam complaint was reported |
| `marker_crm/direct_email_queued` | `Send $send, Contact $contact` | A one-off email to a contact was queued |
| `marker_crm/send_batch_started` | `Collection $batch` | The queue claimed a batch of sends |
| `marker_crm/send_batch_finished` | `Collection $batch` | It finished that batch |
| `marker_crm/action_link_clicked` | `ActionLink $link, ?Contact $contact` | An action link was clicked and its effects applied. `$contact` is `null` when the clicker is unknown |
| `marker_crm/template_created` | `array $template` | An email template was created |
| `marker_crm/template_updated` | `array $template` | An email template was saved |
| `marker_crm/templates_deleted` | `int[] $ids` | Email templates were deleted |

### Queue

| Hook | Parameters | Fires |
|---|---|---|
| `marker_crm/job_dispatched` | `Job $job, int $id` | A job was put on the queue |
| `marker_crm/job_completed` | `Job $job, int $id` | A job finished |
| `marker_crm/job_failed` | `Job $job, int $id, Throwable $e` | A job failed for the last time |

`marker_crm/run_queue` and `marker_crm/maintenance` are WP-Cron event names (every minute, and
daily). Listen to `marker_crm/tick` instead of either.

### Admin

| Hook | Parameters | Fires |
|---|---|---|
| `marker_crm/before_enqueue_admin_assets` | — | Before the admin app's scripts are enqueued |

## Filters

### Automations

| Hook | Value | Extra parameters | Use |
|---|---|---|---|
| `marker_crm/automation_triggers` | `array $triggers` | — | Register triggers. See [Triggers](/developers/automations/triggers/) |
| `marker_crm/automation_actions` | `array $actions` | — | Register actions. See [Actions](/developers/automations/actions/) |
| `marker_crm/automation_option_sources` | `array $sources` | — | Register searchable pick lists. See [Settings fields](/developers/automations/fields/#option-sources) |
| `marker_crm/automation_before_step` | `bool $run` (`true`) | `AutomationStep $step, Contact $contact, AutomationSubscriber $run` | Return `false` to hold the step for 15 minutes |

### Contacts and fields

| Hook | Value | Extra parameters | Use |
|---|---|---|---|
| `marker_crm/segment_fields` | `array $fields` | — | Rule fields for segments and conditions. See [Segment fields](/developers/extending/segment-fields/) |
| `marker_crm/term_types` | `string[] $types` (`['tag', 'list']`) | — | Add a term type. See [Term types](/developers/extending/term-types/) |
| `marker_crm/stateful_term_types` | `string[] $types` (`['list']`) | — | Types whose removed relations are kept as `unsubscribed` |
| `marker_crm/term_boot_limit` | `int $limit` (`300`) | — | How many terms of a type the admin is sent before it searches the server |
| `marker_crm/require_contact_email` | `bool` (`true`) | — | Return `false` to allow contacts with only a phone number |
| `marker_crm/contact_channels` | `array $channels` | — | The subscription channels (`email`, `sms`): label, address normaliser and allowed statuses |
| `marker_crm/contact_statuses` | `array $statuses` | — | Status key → label |
| `marker_crm/starting_statuses` | `string[] $statuses` | — | The statuses a person may set by hand |
| `marker_crm/contact_types` | `array $types` | — | Contact type key → label (`lead`, `customer`) |
| `marker_crm/custom_field_types` | `array $types` | — | The custom field types, each with `label`, `has_options` and `sanitize` |
| `marker_crm/custom_field_scopes` | `array $scopes` | — | The record types custom fields can belong to |
| `marker_crm/note_types` | `array $kinds` | — | The kinds of note a person or automation may log, key → label |
| `marker_crm/note_object_types` | `array $types` | — | The record types that can hold notes |
| `marker_crm/import_fields` | `array $fields` | — | The contact fields an import can map a column to |
| `marker_crm/company_import_fields` | `array $fields` | — | The same, for companies |
| `marker_crm/export_columns` | `array $columns` | — | The columns a contact export can include |
| `marker_crm/company_export_columns` | `array $columns` | — | The same, for companies |
| `marker_crm/import_sources` | `array $sources` | — | The sources the importer lists. The admin can only run CSV imports today |
| `marker_crm/company_industries` | `string[]` | — | The industry choices for a company |
| `marker_crm/company_types` | `string[]` | — | The company type choices |
| `marker_crm/company_socials` | `array` | — | The social profile fields on a company |
| `marker_crm/shared_email_domains` | `string[]` | — | Domains (such as `gmail.com`) never used to link a contact to a company |

### Emails and sending

| Hook | Value | Extra parameters | Use |
|---|---|---|---|
| `marker_crm/merge_tags` | `array $tags` | — | Add `{{tokens}}`. See [Merge tags](/developers/extending/merge-tags/) |
| `marker_crm/merge_url_tags` | `array $tags` | — | Add `##url_tokens##`: token → `callable(array $on): string` |
| `marker_crm/merge_data` | `array $on` | `Send $send` | What merge tags read for one send |
| `marker_crm/email_before_send` | `bool` (`true`) | `Send $send, array $on` | Return `false` to stop one email; it is marked failed |
| `marker_crm/email_html` | `string $html` | `Send $send, array $on` | The finished HTML of an email |
| `marker_crm/email_footer_html` | `string $footer` | `Send $send` | The footer of a marketing email |
| `marker_crm/email_headers` | `string[] $headers` | `Send $send, string $kind` | Mail headers; `$kind` is the kind of email |
| `marker_crm/send_from` | `array $sender` | `Send $send` | `from_name`, `from_email`, `reply_to_name`, `reply_to` for one send |
| `marker_crm/send_subject` | `string $subject` | `Send $send` | The subject of a send that has no stored content |
| `marker_crm/send_body` | `string $body` | `Send $send` | The body of a send that has no stored content |
| `marker_crm/send_utm` | `array $tags` | `Send $send` | UTM parameters added to links |
| `marker_crm/optin_email_html` | `string $html` | `Contact $contact, ContactSubscription $subscription` | The double opt-in email |
| `marker_crm/mailers` | `array $mailers` | — | The SMTP plugins the email settings recognise |

### Campaigns

| Hook | Value | Extra parameters | Use |
|---|---|---|---|
| `marker_crm/campaign_before_send` | `bool` (`true`) | `Campaign $campaign` | Return `false` to refuse sending a campaign |
| `marker_crm/campaign_recipients` | contacts query | `Campaign $campaign` | The query that selects a campaign's recipients |
| `marker_crm/campaign_audience_batch` | `int` (`1000`) | — | How many recipients are queued per job |
| `marker_crm/campaign_stats` | `array $stats` | `int[] $ids` | Report totals per campaign id |

### REST responses

Each resource passes its response array through a filter before it is sent. Add fields; do
not remove documented ones.

| Hook | Extra parameter |
|---|---|
| `marker_crm/contact_response` | `Contact $contact` |
| `marker_crm/company_response` | `Company $company` |
| `marker_crm/term_response` | `Term $term` |
| `marker_crm/segment_response` | `$segment` |
| `marker_crm/custom_field_response` | `$field` |
| `marker_crm/note_response` | `Note $note` |
| `marker_crm/automation_response` | `Automation $automation` |
| `marker_crm/campaign_response` | `Campaign $campaign` |
| `marker_crm/campaign_summary_response` | `Campaign $campaign` |
| `marker_crm/send_response` | `Send $send` |
| `marker_crm/send_log_response` | `Send $send` |
| `marker_crm/action_link_response` | `ActionLink $link` |
| `marker_crm/webhook_response` | `$webhook` |
| `marker_crm/import_response` | `$import` |
| `marker_crm/export_response` | `$export` |

### Queue

| Hook | Value | Extra parameters | Use |
|---|---|---|---|
| `marker_crm/queue_runners` | `int` (`1`) | — | How many queue runners may work at once |
| `marker_crm/queue_queues` | `string[]` | — | The queues, in the order they are drained: `default`, `imports`, `emails`, `automations`. A queue not listed never runs |
| `marker_crm/queue_time_limit` | `int` (`20`) | `string $queue` | Seconds a runner may spend |
| `marker_crm/queue_limit` | `int` (`0`) | `string $queue` | Jobs per hour on a queue; `0` is no limit |
| `marker_crm/queue_retain_completed` | `int` days | — | How long finished jobs are kept |
| `marker_crm/queue_retain_failed` | `int` (`30`) days | — | How long failed jobs are kept |
| `marker_crm/import_retain_hours` | `int` hours | — | How long an import's files are kept |

### Admin and plumbing

| Hook | Value | Extra parameters | Use |
|---|---|---|---|
| `marker_crm/capabilities` | `array $config` | — | The capability catalogue (`prefix`, `actions`, `resources`) shown on the Permissions screen |
| `marker_crm/settings` | `array $schema` | — | The settings groups and their fields |
| `marker_crm/admin_localized_data` | `array $data` | — | The boot data handed to the admin app |
| `marker_crm/before_render_submenus` | `array $menus` | — | The admin submenu: slug → `label`, `cap` |
| `marker_crm/webhook_types` | `array $types` | — | What an incoming webhook can do: type → `label`, `handler` |
| `marker_crm/public_routes` | `array $routes` | — | Public front-end routes (`?marker_crm=…`): name → `callable(Request): ?string` returning a URL to redirect to |
