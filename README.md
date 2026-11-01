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
