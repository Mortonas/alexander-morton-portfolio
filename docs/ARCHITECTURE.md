# Architecture

## Static multi-page portfolio
- Last updated: 2026-09-22
- Responsibilities: publish one portfolio home and four independently addressable project documents with shared React presentation.
- Key files: `vite.config.js`, the five HTML entries, `src/main.jsx`, `netlify.toml`.
- Inputs: page identifier embedded in each physical HTML document.
- Outputs: directory `index.html` files under `dist`, root-absolute static assets, and a static `404.html`.
- Invariants: canonical project paths end in `/`; each route owns its metadata; there is no global home-page fallback; Netlify Pretty URLs owns slash normalization.
- Traveller Notes route: `/projects/traveller-notes/` is served by physical `projects/traveller-notes/index.html`; `.html` and `/index.html` aliases redirect to that URL, with no slash-only redirect.

## Online Retail boundary
- Last updated: 2026-09-20
- Responsibilities: verify and present source-generated version-1 artifacts without reimplementing analytical calculations.
- Key files: `src/features/online-retail/loadDashboard.js`, `dashboardFindings.js`, `DashboardContent.jsx`, `DashboardCharts.jsx`.
- Inputs: root-absolute JSON, checksum, schema, and workbook URLs.
- Outputs: KPIs, four charts, accessible summaries, and root-absolute evidence links.
- Invariants: exact JSON bytes pass SHA-256 before decoding; unsupported majors fail before schema validation; Draft 2020-12 validation, canonical ordering, and reconciliation pass before analytical UI mounts; Ajv and Chart.js stay outside the home route; the source repository remains the schema, pipeline, and artifact owner.
- Compatibility/versioning: valid 1.0 and 1.1 documents are accepted; unsupported major versions fail clearly. Schema and artifact mirrors must be byte-identical to the source release.

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

## Character & Estate evidence presentation
- Last updated: 2026-09-26
- Responsibilities: present the estate as a plain-language multi-record model: property schedules, calculation lineage, estate consolidation, input controls, and a recurring scripted update.
- Key files: `src/data/characterEstateEvidence.js`, `src/components/CharacterEstateEvidence.jsx`, `src/styles/character-estate.css`.
- Authoritative inputs: the locally reviewed `Ultimate_Character_Sheet_Portfolio_Clean.xlsx` workbook and cleaned Apps Script ZIP, checked by an uncommitted release audit before presentation data changes.
- Outputs: estate-first flow and lineage explanations, visible User-entered/Reference/Calculated/Script-written categories, the annual script's reads/updates/resets, limitations, and five workbook-derived WebP images (`estate-overview.webp`, `estate-overview-full.webp`, `landholding-improvements.webp`, `landholding-finances.webp`, and `front-sheet.webp`). The Character & Estate project links to the owner-provided Google Sheet for visitors to explore. The original `.xlsx` and Apps Script sources stay outside Git and `dist`; the page advises visitors to make their own copy before testing edits. Public code projects offer a prominent repository ZIP download.
- Invariants: public data contains no raw formulas, comments, workbook artwork, scripts, source hashes, audits, or evidence maps; displayed metrics are structural counts only; estate totals are described as comparable to property values, not as an automated reconciliation control; script updates are not described as atomic, reversible, or fully validated; the site never executes the workbook or scripts. Workbook images must be privacy-reviewed, flattened WebP files with metadata stripped and approved by Alexander before commit or deployment. The full Estate Overview screenshot is provisional pending that review.
- Compatibility/versioning: a source-hash or audited-metric mismatch blocks publication. Presentation data and tests may change only after the private evidence review is repeated and approved.

## Traveller Notes presentation and privacy
- Last updated: 2026-09-24
- Responsibilities: explain a Python workflow that selects worlds from Traveller Map, optionally fetches Traveller RPG Wiki context, and writes draft linked notes for human review. Link the separate curated public code showcase without exposing the private source checkout or vault.
- Source boundary: the bulk workflow uses world names and subsector identifiers for selection/grouping; coordinates support separate jump exploration. Other available sector fields are not asserted as prompt inputs. Imported records, community lore, and generated draft fiction have separate text labels on the page.
- Public outputs: one physical project page, route-specific code and styles, and exactly six project-specific visual assets: `idle-menu.webp`, `captain-eva-rostova-note.webp`, `regina-master-note.webp`, `regina-starport-note.webp`, `regina-system-authority-note.webp`, and `vargr-infiltration-note.webp`. The terminal image remains the home-card image and the Open Graph/Twitter preview.
- Public code boundary: `https://github.com/Mortonas/traveller-notes-showcase` is a fresh, allowlisted snapshot with a standalone history, release guard, tests, and setup documentation. It is linked from the page and project registry; it is not an input to this site's build. The older `Mortonas/traveller-notes` repository stays private.
- Screenshot provenance: the five note WebPs render the pinned saved Regina master and four linked single-world test notes, with frontmatter and return-path text omitted, wiki-link markup rendered as visible labels, and minor heading/callout formatting repaired for legibility. The master image is an excerpt; the Starport image omits a disputed Regina Prime hazard line; the Captain image predates the other four renders. These are reviewed archival AI-generated draft excerpts, not untouched output, verified lore, or evidence of a completed bulk run. `idle-menu.webp` renders the application's idle menu without starting a job or calling an API. Raw notes, the local rendering helper, and private provenance remain outside the repository.
- Regina example owner: `src/data/reginaShowcase.js` contains reviewed, abridged presentation text, four stable IDs, and metadata for the master and four detail images, not source Markdown or a live generator. `TravellerNotesPage.jsx` renders the text-first master/detail selector with supplemental images. Initial selection is Captain; selection persists only while the page component stays mounted. The sector batch creates initial world notes, while optional detail notes belong to the single-world workflow.
- Evidence boundary: a local-only verifier outside both public repositories reads the pinned Regina archive in place, checks source hashes, link/parent/type mapping, source spans, and reviewed presentation hashes. Its private mapping and provenance record never enter the portfolio build. Standard tests and Netlify builds require no private archive; they do not grant evidence-review or publication approval. A missing archive, failed local check, or pending Alexander review blocks publication.
- Private inputs: the `C:\Projects\Traveller Notes` checkout, every configured Obsidian vault (`ISS_VAULT_PATH`), `vault/`, `custom_vault/`, `notes/`, `test_output/`, raw sector/world exports, full wiki pulls, backups, `.env`, `zettel_state.json` or other progress/state JSON, and related `.md`, `.json`, `.csv`, `.tsv`, or `.txt` material. These are never Vite inputs or public assets.
- Invariants: Git and `dist` privacy checks fail on private paths, raw note/data exports, private-content markers, or unapproved Traveller visuals. All six WebP images have no EXIF, XMP, or ICC chunks and require visual review for vault paths, usernames, plugins, status bars, and unrelated content. Progress is kept in the private workflow. The portfolio does not run the importer or approve game-master drafts.
