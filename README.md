# The Elastic Playbook site

This is the root site for `bharats.com`, with *The Elastic Playbook* living under
`/elastic-playbook`.

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

## URL structure

- `https://bharats.com/` is the personal homepage
- `https://bharats.com/elastic-playbook` is the book companion
- `https://bharats.com/elastic-playbook/articles/...` serves the flagship posts
- `https://bharats.com/elastic-playbook/resources/...` serves the checklists
