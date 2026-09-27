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
- The original character workbook and Apps Script sources are not committed or copied into `dist`. The Character & Estate project links to Alexander's shared Google Sheet so visitors can explore the workbook; the page asks them to make their own copy before testing changes. The working-tree image allowlist is `front-sheet.webp`, `estate-overview.webp`, `estate-overview-full.webp`, `landholding-improvements.webp`, and `landholding-finances.webp`. The full-sheet image and new landholding crops remain subject to Alexander's privacy and legibility review before publication. All image derivatives must be flattened WebP files with metadata stripped. Public code projects link to a source ZIP near the top of both the project card and project page.
- Missing résumé, LinkedIn, and contact links remain hidden instead of using placeholders.

## Traveller Notes release checklist

- Keep the source checkout, every Obsidian vault (including any `ISS_VAULT_PATH`), `test_output/`, raw sector exports, full wiki pulls, backups, `.env`, and progress/state JSON private. Do not copy them into this repository or Vite's `public/` directory.
- The only approved Traveller Notes visual assets are `public/images/traveller-notes/idle-menu.webp`, `captain-eva-rostova-note.webp`, `regina-master-note.webp`, `regina-starport-note.webp`, `regina-system-authority-note.webp`, and `vargr-infiltration-note.webp`. These six WebPs show the idle menu and reviewed renders of saved single-world test-note excerpts; the master is an excerpt. The notes are generated draft fiction, not verified Traveller lore or evidence of a completed bulk run. The separate [public code showcase](https://github.com/Mortonas/traveller-notes-showcase) contains a curated source snapshot and tests, not the private source checkout or its history. No raw Markdown, demo vault, rendering helper, or real campaign note is published.
- Keep all screenshots as WebP without EXIF, XMP, or ICC metadata. Visually check every pixel for vault paths, system usernames, Obsidian plugins or status bars, private notes, and unrelated workspace details. Keep the past-test, no-new-run, and human-review captions accurate.
- Regina's text-first master/detail example is reviewed, abridged archival AI-assisted draft material, not verified canon, a live campaign, an untouched model response, or evidence of a completed regional batch. Its four public IDs and presentation copy live in a data-only module; the private archive, mapping, and edit record do not.
- Before publication, run the **local-only Regina evidence verifier** from the separate private-review directory with explicit absolute `--archive-root`, `--mapping`, and `--presentation` arguments. The command and approval record are held there, not in this repository or Netlify CI. If the archive is unavailable, the check fails, or Alexander has not approved the reviewed excerpts and images, do not commit, push, or deploy this showcase. A green Netlify build is not evidence of that private review.
- Run `npm run release:build` and `npm run verify:preview`. The release checks inspect Git-tracked or untracked candidate files and `dist` for private paths, notes, data dumps, private text markers, unapproved images, and WebP metadata. Alexander reviews all note images, source wording, and page readability before any push or deployment.
