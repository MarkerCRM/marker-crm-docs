# Writing these docs

One site, two tabs: **Guides** (`src/content/docs/*`, for people running the CRM) and
**Developers** (`src/content/docs/developers/*`, for people building on it). The tab a page
belongs to is decided by its folder; the sidebar is generated from the folders, ordered by
`sidebar.order` in the front matter.

## When the docs change

With the plugin, not after it: when a module is finished, or a screen, setting, hook or route
changes, the pages for it are updated in the same piece of work and pushed to `main`, which
deploys the site. Guides cover what a user sees; Developers covers hooks, REST routes and
registry entries. The plugin's own rules (`.claude/rules/role.md`, §10) say the same.

## Addresses are a promise

The plugin's admin links straight to these pages (`resources/admin/common/docs.js` in the
plugin). Never move or rename these without changing that table in the same release:

`/` · `/contacts/` · `/contacts/tags/` · `/contacts/lists/` · `/contacts/companies/` ·
`/contacts/segments/` · `/contacts/custom-fields/` · `/contacts/import/` · `/contacts/export/` ·
`/emails/campaigns/` · `/emails/sequences/` · `/emails/templates/` · `/emails/patterns/` ·
`/automations/` · `/reports/contacts/` · `/reports/email/` · `/reports/woocommerce/` ·
`/logs/email/` · `/logs/sms/` · `/add-ons/` · `/settings/business-profile/` · `/settings/email/` ·
`/settings/general/` · `/settings/sms/` · `/settings/opt-in/` · `/settings/preference-page/` ·
`/settings/action-links/` · `/settings/abandoned-carts/` · `/settings/integrations/` ·
`/settings/webhooks/` · `/settings/permissions/` · `/settings/privacy/` · `/settings/tools/`

A section's landing page is its `index.md` (`contacts/index.md` → `/contacts/`).

## Voice

- Second person, present tense, short sentences. "Choose a list", not "The user may choose a list".
- Lead with what the reader is trying to do, then how. Explain *why* only where the behaviour
  would surprise someone (consent, re-entry, what happens to people already inside).
- Use the exact words on screen, in **bold**: **Contacts → Tags**, **Review**, **Slide to activate**.
- Say what happens when it goes wrong: what the reader sees, and what to do.
- No marketing language. No "simply", "just", "easily", "powerful", "seamless".
- Describe only what the plugin does today. If you are not sure, read the plugin's code — never guess.

## Pages

Every page has front matter:

```yaml
---
title: Tags
description: One sentence, used for search results and link previews.
sidebar:
  order: 2
---
```

Use `.md` unless you need components, then `.mdx` with
`import {Steps, Aside, Tabs, TabItem, Card, CardGrid, LinkCard} from '@astrojs/starlight/components';`.
Asides in plain Markdown: `:::note`, `:::tip`, `:::caution`, `:::danger`.

## Images

Until real screenshots exist, every image is the same placeholder:

```md
![The tags list, with the member count beside each tag](/images/placeholder.svg)
```

Write the alt text for the screenshot that *will* be there — it is what a screen reader hears,
and it tells whoever adds the real image what to capture.
