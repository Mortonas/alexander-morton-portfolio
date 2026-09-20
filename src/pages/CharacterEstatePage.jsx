import ProjectHero from '../components/ProjectHero.jsx';
import SiteLayout from '../components/SiteLayout.jsx';

const workflow = ['User-facing sheets', 'Detailed records', 'Reference data', 'Calculations', 'Scripted updates'];

export default function CharacterEstatePage() {
  return (
    <SiteLayout>
      <main id="main">
        <ProjectHero
          eyebrow="Spreadsheet automation case study"
          title="Character & Estate Automation"
          subtitle="Google Sheets management system"
          lede="A linked workbook that organizes character, estate, landholding, follower, history, and resource information through formulas, validation, reference data, and two reviewed Apps Script workflows."
          meta={['11 visible worksheets', '974 formula cells', '17 validation objects', '2 reviewed scripts']}
        />

        <section className="section metric-strip" aria-label="Workbook evidence">
          <article><strong>11</strong><span>visible worksheets</span></article>
          <article><strong>974</strong><span>formula cells</span></article>
          <article><strong>17</strong><span>validation objects</span></article>
          <article><strong>2</strong><span>Apps Script files reviewed</span></article>
        </section>

        <section className="section narrative-section" aria-labelledby="workbook-architecture-title">
          <div className="section-heading"><p className="eyebrow">Workbook architecture</p><h2 id="workbook-architecture-title">Separate entry, records, calculations, and reference data</h2><p>The workbook uses dedicated views for input and review, detailed record sheets for operational information, a tracking layer for derived values, and centralized lists for lookups and validation.</p></div>
          <ol className="workflow" aria-label="Workbook data flow">{workflow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></li>)}</ol>
          <figure className="screenshot-frame workbook"><img src="/images/character-estate/project-overview.webp" alt="Workbook project overview describing sheets, calculation logic, validation, and automation" /><figcaption>The workbook’s portfolio overview documents the separation of responsibilities.</figcaption></figure>
        </section>

        <section className="section split calculation-section">
          <div>
            <p className="eyebrow">Calculation view</p>
            <h2>Inputs feed linked balances and annual totals</h2>
            <p>Cross-sheet formulas connect estate and landholding records to income, expenses, obligations, treasury values, and history views. Validation controls reduce inconsistent input without replacing visible formulas.</p>
            <div className="evidence-note"><strong>Evidence boundary</strong><p>The published image uses placeholder labels and zero-value examples. The source workbook is not downloadable from this site.</p></div>
          </div>
          <figure className="screenshot-frame workbook"><img src="/images/character-estate/estate-overview.webp" alt="Estate overview worksheet with land details, annual obligations, income, expenses, and treasury calculations" /><figcaption>A cropped calculation view from the cleaned portfolio workbook.</figcaption></figure>
        </section>

        <section className="section automation-section" aria-labelledby="automation-title">
          <div><p className="eyebrow">Reviewed automation</p><h2 id="automation-title">Multi-step updates remain explicit</h2></div>
          <div className="automation-grid">
            <article><h3>Annual and resource update</h3><p>The reviewed script advances the stored year and accumulated total, synchronizes the annual estate value, applies a transaction to the selected Goods, Libra, or Treasure resource, and resets the documented entry fields.</p></article>
            <article><h3>Income copy</h3><p>A second script copies the calculated annual income into the Goods balance using an explicit worksheet name.</p></article>
          </div>
        </section>

        <section className="section limitation" aria-labelledby="sheet-limit-title">
          <div><p className="eyebrow">Evidence and limitations</p><h2 id="sheet-limit-title">The export and automation are separate artifacts</h2></div>
          <p>The reviewed `.xlsx` export does not embed Google Apps Script. Script behavior was verified from two separate cleaned source files. The workbook, scripts, embedded artwork, comments, and calculation files are intentionally excluded from this public portfolio.</p>
        </section>
      </main>
    </SiteLayout>
  );
}
