# Alexander Morton Portfolio

Multi-project portfolio for Alexander Morton, Entry-Level Data Analyst.

## Project pages

- `/projects/online-retail/` — reproducible Python, SQL, SQLite, Excel, and React case study.
- `/projects/encounter-factory/` — local application architecture and workflow case study.
- `/projects/character-estate-automation/` — evidence-reviewed spreadsheet automation case study.

Each route is a physical HTML entry. Vite development routing is not treated as release evidence; production preview and deployed Netlify requests verify page-specific documents and metadata.

## Local checks

```text
npm ci
npm test
npm run lint
VITE_SITE_ORIGIN=https://example.test npm run build
VITE_SITE_ORIGIN=https://example.test npm run verify:build
VITE_SITE_ORIGIN=https://example.test npm run verify:preview
```

PowerShell users can set `$env:VITE_SITE_ORIGIN = "https://example.test"` before the final three commands.

## Deployment

Netlify builds with `npm run build` and publishes `dist`. Set `VITE_SITE_ORIGIN` to the final HTTPS origin before building. Pretty URLs normalize directory routes. The configuration intentionally has no SPA catch-all rewrite.

## Evidence boundaries

- Online Retail calculations remain owned by [online-retail-performance-analysis](https://github.com/Mortonas/online-retail-performance-analysis).
- Encounter Factory remains a local evaluation project and is not run by this site.
- The character workbook and Apps Script sources are reviewed locally but are not committed or deployed. Only two redacted, metadata-free derivatives are public.
- Missing résumé, LinkedIn, and contact links remain hidden instead of using placeholders.
