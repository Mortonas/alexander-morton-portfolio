# Alexander Morton Portfolio

Multi-project portfolio for Alexander Morton, Entry-Level Data Analyst.

## Project pages

- `/projects/online-retail/` — reproducible Python, SQL, SQLite, Excel, and React analysis project.
- `/projects/encounter-factory/` — unfinished D&D encounter-building application with structured intake, deterministic math, and validated AI-assisted writing.
- `/projects/character-estate-automation/` — evidence-reviewed spreadsheet automation project.
- `/projects/traveller-notes/` — private Python workflow that turns large fictional-world lists into linked preparation drafts.

Each route is a physical HTML entry. Vite development routing is not treated as release evidence; production preview and deployed Netlify requests verify page-specific documents and metadata.

## Local checks

```text
npm ci
VITE_SITE_ORIGIN=https://example.test npm run release:build
VITE_SITE_ORIGIN=https://example.test npm run verify:preview
```

`release:build` runs the tests, lint, production build, route and metadata checks, privacy checks, and bundle-size gate. PowerShell users can set `$env:VITE_SITE_ORIGIN = "https://example.test"` before running it.

## Deployment

The repository is configured for direct Netlify deployment through `netlify.toml`:

- Build command: `npm run release:build`
- Publish directory: `dist`
- Node.js: version 22 (also recorded in `.nvmrc`)

Import the repository in Netlify and deploy; Netlify's built-in `URL` environment variable supplies the production origin used by canonical and social metadata. If a custom domain should be canonical before it is assigned in Netlify, set `VITE_SITE_ORIGIN` to its full HTTPS origin and redeploy.

Pretty URLs normalize directory routes. Explicit redirects normalize `.html` and `/index.html` variants, while unknown routes use the static `404.html`. The configuration intentionally has no SPA catch-all rewrite.

Traveller Notes is served from `/projects/traveller-notes/` by a physical `projects/traveller-notes/index.html`. Its `.html` and `/index.html` aliases redirect to that canonical URL; there are no slash-only redirects.

## Evidence boundaries

- Online Retail calculations remain owned by [online-retail-performance-analysis](https://github.com/Mortonas/online-retail-performance-analysis).
- Encounter Factory remains a local evaluation project and is not run by this site.
- The character workbook and Apps Script sources are reviewed locally but are not committed or deployed. Only two redacted, metadata-free derivatives are public.
- Missing résumé, LinkedIn, and contact links remain hidden instead of using placeholders.

## Traveller Notes release checklist

- Keep the source checkout, every Obsidian vault (including any `ISS_VAULT_PATH`), `test_output/`, raw sector exports, full wiki pulls, backups, `.env`, and progress/state JSON private. Do not copy them into this repository or Vite's `public/` directory.
- The only approved Traveller Notes static evidence asset is `public/images/traveller-notes/fictional-workflow.svg`. Its names and details are wholly fictional. The source repository and real notes are not linked or downloaded.
- Run `npm run release:build` and `npm run verify:preview`. The release checks inspect Git-tracked or untracked candidate files and `dist` for private paths, notes, and data dumps. Review the SVG and page copy before pushing.
