# Marker CRM docs

The source of [docs.markercrm.com](https://docs.markercrm.com): guides for people running Marker CRM,
and the developer reference, in one Astro + Starlight site with a tab for each.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

Node 22.22 or newer (`.nvmrc`).

## Where things are

| | |
|---|---|
| `src/content/docs/` | Guides — one folder per admin menu |
| `src/content/docs/developers/` | Developer docs |
| `astro.config.mjs` | The two tabs and their sidebars |
| `src/styles/theme.css` | Font, colours, spacing |
| `public/images/placeholder.svg` | The stand-in for every screenshot until real ones land |

Before writing, read [CONTRIBUTING.md](CONTRIBUTING.md) — especially the list of addresses the
plugin links to, which must not move.

## Brand

Primary **#F6B51E** · Neutral **#171717** · secondary lettering **#7B7B7B**.
The kit lives in `public/brand/` and is served at `docs.markercrm.com/brand/…`:

| File | Use |
|---|---|
| `marker-crm-logo.svg` / `.png` | Logo on light backgrounds |
| `marker-crm-logo-inverse.svg` / `.png` | Logo on dark backgrounds |
| `marker-crm-mark.svg`, `marker-crm-mark-{16…512}.png` | The mark alone: favicons, app icons, avatars |
| `marker-crm-mark-inverse.svg`, `marker-crm-mark-inverse-512.png` | The mark on dark backgrounds |
| `marker-crm-social.png` | Link previews (1200 × 630) |

Yellow marks state — the current page, a selected choice, a step number. Text and links stay
neutral: yellow on white is too light to read.
