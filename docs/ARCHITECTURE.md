# Architecture

## Static multi-page portfolio
- Last updated: 2026-09-20
- Responsibilities: publish one portfolio home and three independently addressable project documents with shared React presentation.
- Key files: `vite.config.js`, the four HTML entries, `src/main.jsx`, `netlify.toml`.
- Inputs: page identifier embedded in each physical HTML document.
- Outputs: directory `index.html` files under `dist`, root-absolute static assets, and a static `404.html`.
- Invariants: canonical project paths end in `/`; each route owns its metadata; there is no global home-page fallback; Netlify Pretty URLs owns slash normalization.

## Online Retail boundary
- Last updated: 2026-09-20
- Responsibilities: retain the existing version-1 dashboard contract and analytical calculations inside the portfolio shell.
- Key files: `src/features/online-retail/loadDashboard.js`, `DashboardContent.jsx`, `DashboardCharts.jsx`.
- Inputs: root-absolute `/data/dashboard-v1.json`.
- Outputs: KPIs, four charts, accessible summaries, and root-absolute evidence links.
- Invariants: invalid or incompatible data renders no findings or charts; Chart.js loads only after validation; the source repository remains the pipeline owner.
- Compatibility/versioning: contract major version 1 only.

## Project evidence boundary
- Last updated: 2026-09-20
- Responsibilities: present project claims without publishing restricted services or private workbook sources.
- Inputs: public project repositories plus locally reviewed workbook and Apps Script evidence.
- Outputs: approved screenshots, evidence-backed prose, repository links, and one sanitized fictional Encounter Factory HTML export.
- Invariants: the Encounter Factory service is never hosted here; its approved export is static, sandboxed in the page, stripped of external requests, and checked for scripts, forms, contact details, and credential-like text. Character workbook, ZIP, scripts, audit data, comments, embedded art, and calculation files never enter Git or `dist`; only two approved metadata-free workbook WebP derivatives may be published.
