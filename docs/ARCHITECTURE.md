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

## Encounter Factory workflow case-study mapping
- Last updated: 2026-09-20
- Responsibilities: translate the service's ten canonical orchestration stages into a six-phase, employer-readable systems diagram without claiming the portfolio executes the workflow.
- Key files: `src/data/encounterWorkflow.js`, `src/components/EncounterWorkflow.jsx`, `src/styles/encounter-workflow.css`.
- Authoritative input: `PIPELINE_SEQUENCE` in `server/services/orchestrator.ts` from `Mortonas/Encounter-Factory`, verified at commit `a41c3f2eb15c0159dcd67c0c3500fd728f3735f9`.
- Output: one semantic ordered list of six phases, with each phase's ordered stages nested inside its phase list item, plus visible safeguard and category explanations.
- Phase mapping: Intake and structure = Briefing Officer; Model the party = Party Profiler; Ground the mechanics = Balance Analyst; Design the encounter = Lead Mechanist, Tactical Cartographer, Narrative Architect; Verify and summarize = Editor / Auditor, Tactical Summarist; Publish and export = Desktop Publisher, Cinematic Stylist.
- Invariants: the ten stage labels and their order match the pinned source definition; the portfolio build has no sibling-checkout dependency; audit repair, persistence checkpoints, resumption, and stylist fallback are explanatory evidence rather than live orchestration tests; the service repository remains the behavior owner.
- Compatibility/versioning: any upstream `PIPELINE_SEQUENCE` change requires reviewing the six-phase mapping and public wording, updating the portfolio tests, and advancing the recorded source commit before publication.
