import CharacterEstateEvidence from '../components/CharacterEstateEvidence.jsx';
import ProjectHero from '../components/ProjectHero.jsx';
import SiteLayout from '../components/SiteLayout.jsx';
import {
  annualUpdate,
  characterEstateEvidence,
  inputControls,
  knownLimits,
  proposedImprovements,
  supportingMetrics,
} from '../data/characterEstateEvidence.js';

export default function CharacterEstatePage() {
  return (
    <SiteLayout>
      <main id="main">
        <ProjectHero
          eyebrow="Spreadsheet systems case study"
          title="Character & Estate Automation"
          subtitle="Two property schedules. One estate view. A recurring yearly update."
          lede="I built the estate system to keep two properties, their income and upkeep, and the combined yearly picture connected. The workbook uses formulas to carry property values into an estate overview, with Apps Script handling selected annual updates."
          downloads={[{ url: 'https://docs.google.com/spreadsheets/d/1ccwO0CRXp3GgIX9eK9knxABlp-jBSh0P1N40G5VaaWo/edit?usp=sharing', label: 'Try the workbook in Google Sheets', external: true }]}
          downloadNoteLabel="About the spreadsheet"
          downloadNote="Selected cells have comments with extra detail. Other cells are mostly game-specific references or calculations; you can skip those and still follow the estate workflow. Make your own copy before testing changes so the shared original stays unchanged."
          meta={[
            `${characterEstateEvidence.landholdingSchedules} property schedules`,
            ...supportingMetrics,
          ]}
        />

        <CharacterEstateEvidence />

        <section className="section estate-visual-evidence" aria-labelledby="estate-evidence-title">
          <div className="section-heading">
            <p className="eyebrow">Workbook evidence</p>
            <h2 id="estate-evidence-title">One property schedule feeds the combined view</h2>
            <p>The reviewed workbook copy uses blank or zero example entries in these areas. The images show the structure of the records, not a populated estate scenario.</p>
          </div>
          <div className="estate-property-figures">
            <figure className="estate-figure estate-full-figure">
              <a href="/images/character-estate/estate-overview-full.webp" target="_blank" rel="noreferrer" aria-label="Open the full Estate Overview worksheet image">
                <img src="/images/character-estate/estate-overview-full.webp" alt="Full Estate Overview worksheet showing land details, estate glory, treasury, income overview, estate staff, lot damage, shortage results, standard of living, and annual-update controls. The example entries are blank or zero-valued." loading="lazy" />
              </a>
              <figcaption><strong>Full Estate Overview worksheet.</strong> This wide view shows how the estate&apos;s financial summary sits alongside resource, property, and yearly-update sections. <a href="/images/character-estate/estate-overview-full.webp" target="_blank" rel="noreferrer">Open full-size worksheet image</a>.</figcaption>
            </figure>
            <figure className="estate-figure">
              <a href="/images/character-estate/landholding-improvements.webp" target="_blank" rel="noreferrer" aria-label="Open the property improvements worksheet image">
                <img src="/images/character-estate/landholding-improvements.webp" alt="Property worksheet rows for improvement year, building or benefit, glory, income, and maintenance, with blank or zero example entries." loading="lazy" />
              </a>
              <figcaption><strong>Improvement records.</strong> Each row can hold a year, an improvement, its score contribution, income, and maintenance.</figcaption>
            </figure>
            <figure className="estate-figure">
              <a href="/images/character-estate/landholding-finances.webp" target="_blank" rel="noreferrer" aria-label="Open the property income and expense worksheet image">
                <img src="/images/character-estate/landholding-finances.webp" alt="Property income schedule separating directly held and vassal customary revenue, free income, assumed expenses, additional expenses, and annual totals." loading="lazy" />
              </a>
              <figcaption><strong>Property income and expenses.</strong> The schedule keeps directly held and vassal amounts separate through its annual result.</figcaption>
            </figure>
          </div>
          <figure className="estate-figure estate-overview-figure">
            <a href="/images/character-estate/estate-overview.webp" target="_blank" rel="noreferrer" aria-label="Open the estate overview finance worksheet image">
              <img src="/images/character-estate/estate-overview.webp" alt="Estate overview finance area consolidating customary revenue, additional land income, free income, expenses, and annual totals into separate directly held and vassal columns." loading="lazy" />
            </a>
            <figcaption><strong>Combined estate view.</strong> The same categories are brought together across both property schedules. This is a comparison view, not an automated reconciliation check.</figcaption>
          </figure>
        </section>

        <section className="section annual-process-section" aria-labelledby="annual-process-title">
          <div className="section-heading">
            <p className="eyebrow">Recurring update</p>
            <h2 id="annual-process-title">What the yearly script reads and changes</h2>
            <p>The script applies a sequence of updates across named sheets. The portfolio documents the reviewed source; it does not execute it.</p>
          </div>
          <dl className="annual-data-flow">
            <div>
              <dt>Reads</dt>
              <dd>{annualUpdate.reads}</dd>
            </div>
            <div>
              <dt>Updates</dt>
              <dd><ol>{annualUpdate.changes.map((item) => <li key={item}>{item}</li>)}</ol></dd>
            </div>
            <div>
              <dt>Resets</dt>
              <dd>{annualUpdate.clears}</dd>
            </div>
          </dl>
          <p className="separate-script-note"><strong>Separate function:</strong> {annualUpdate.separateFunction}</p>

          <div className="controls-and-limits">
            <section aria-labelledby="controls-title">
              <p className="eyebrow">Data-entry controls</p>
              <h3 id="controls-title">Dropdowns constrain selected choices</h3>
              <ul className="control-examples">
                {inputControls.map((control) => <li key={control.label}><strong>{control.label}</strong><span>{control.description}</span></li>)}
              </ul>
              <p className="control-caveat">These controls guide normal entry. They do not validate every numeric value or guarantee the script will stop safely for every unexpected value.</p>
            </section>
            <section className="review-limits" aria-labelledby="limits-title">
              <p className="eyebrow">What I would strengthen</p>
              <h3 id="limits-title">Safer updates and clearer records</h3>
              <ul>{knownLimits.map((item) => <li key={item}>{item}</li>)}</ul>
              <ol className="improvements-list">
                {proposedImprovements.map((item) => <li key={item.title}><strong>{item.title}</strong> {item.description}</li>)}
              </ol>
              <p className="proposed-note">These are proposed improvements based on reviewing the workbook and scripts, not reports of known data loss or failed updates.</p>
            </section>
          </div>
        </section>

        <section className="section estate-takeaway-section" aria-labelledby="estate-takeaway-title">
          <div className="estate-takeaway-copy">
            <p className="eyebrow">What this project demonstrates</p>
            <h2 id="estate-takeaway-title">A recurring process with visible calculation paths</h2>
            <p>This project demonstrates structured multi-record data modeling, calculation lineage, controlled data entry, consolidation, reconciliation, and automation of a recurring update process.</p>
            <p>Here, reconciliation means comparing property-level values with the consolidated result. The workbook does not run an automated reconciliation control.</p>
            <p className="private-boundary">The workbook and script sources remain private. The workbook export does not include Apps Script, and this page is not a runnable spreadsheet demo.</p>
          </div>
          <details className="character-context">
            <summary>How the estate connects to the character sheet</summary>
            <p>The estate is part of a larger workbook. Selected balances and calculated values also appear in the Back and Tracking sheets; this Front image is supporting context, not the focus of this case study.</p>
            <figure className="estate-figure">
              <a href="/images/character-estate/front-sheet.webp" target="_blank" rel="noreferrer" aria-label="Open the Front character worksheet image">
                <img src="/images/character-estate/front-sheet.webp" alt="Front character sheet with personal records, calculated attributes, skills, resources, equipment, and stable information." loading="lazy" />
              </a>
              <figcaption>Flattened, reviewed image from the larger character workbook.</figcaption>
            </figure>
          </details>
          <p className="case-study-caveat">The full workbook has {characterEstateEvidence.operationalWorksheets} working sheets and one overview. The formula, validation, and script counts above describe structure only; they do not measure accuracy, adoption, or time saved.</p>
        </section>
      </main>
    </SiteLayout>
  );
}
