# The Elastic Playbook site

This is the companion site for *The Elastic Playbook*.

## Stack

- Astro
- Markdown content collections
- Static deploy target for Vercel

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Vercel setup

Recommended Vercel settings when this `site/` directory is its own repository:

- Framework preset: `Astro`
- Root directory: `.`
- Build command: `npm run build`
- Output directory: `dist`

If you later keep this inside a larger monorepo, set the Vercel root directory to `site` instead.

## Base path

This site is configured with:

- `site`: `https://bharats.com`
- `base`: `/elastic-playbook`

That means all internal routes are generated for:

- `https://bharats.com/elastic-playbook`

## Important deployment note

Vercel projects map cleanly to domains and subdomains. Path-based mounting like
`bharats.com/elastic-playbook` usually means one of these must be true:

1. The root `bharats.com` site is also controlled by Vercel and rewrites traffic to this app.
2. The current root host can reverse-proxy or rewrite `/elastic-playbook` to this deployment.

If neither is true, a subdomain such as `elastic-playbook.bharats.com` is the simpler fallback.
