import { lazy, Suspense } from 'react';
import EvidenceLinks from './EvidenceLinks.jsx';
import { selectFindings } from './dashboardFindings.js';
import './online-retail.css';

const DashboardCharts = lazy(() => import('./DashboardCharts.jsx'));
const money = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });
const moneyExact = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 });
const count = new Intl.NumberFormat('en-GB');
const pounds = (pence) => money.format(pence / 100);
const exactPounds = (pence) => moneyExact.format(pence / 100);
const percent = (bps) => `${(bps / 100).toFixed(1)}%`;

function Metric({ label, value, definition }) {
  return <article className="metric"><span>{label}</span><strong>{value}</strong>{definition && <small>{definition}</small>}</article>;
}

export default function DashboardContent({ data }) {
  const findings = selectFindings(data);
  const quality = data.quality;

  return (
    <>
      <section className="section dark-section" aria-labelledby="retail-summary-title">
        <div className="section-heading"><p className="eyebrow">What the data shows</p><h2 id="retail-summary-title">Where revenue came from—and what changes the picture</h2></div>
        <div className="insight-grid">
          <article><strong>{new Date(`${findings.highestCompleteMonth.month}-01T00:00:00Z`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })}</strong><span>Highest complete month at {pounds(findings.highestCompleteMonth.net_revenue_pence)}</span></article>
          <article><strong>{(findings.ukShareTenthsPercent / 10).toFixed(1)}%</strong><span>United Kingdom share of net revenue</span></article>
          <article><strong>{(findings.sixPlusCustomerShareTenthsPercent / 10).toFixed(1)}% → {(findings.sixPlusNetShareTenthsPercent / 10).toFixed(1)}%</strong><span>Customers in the 6+ order group and their share of identified-customer net revenue</span></article>
          <article><strong>{exactPounds(findings.sensitivityDeltaPence)}</strong><span>Net-revenue change when anomaly-flagged lines are excluded ({(findings.sensitivityDeltaBps / 100).toFixed(2)}%)</span></article>
        </div>
        <div className="recommendations"><h3>Questions worth checking next</h3><ul>
          <li>Look more closely at why customers with six or more orders keep returning.</li>
          <li>Compare orders, cancellations, and customer mix by country before making a case for expansion.</li>
          <li>Check extreme-value transactions and track cancellation value beside gross sales.</li>
          <li>Use the merchandise ranking to choose what to study next. This dataset has no inventory, margin, or cost data, so it cannot support stocking decisions on its own.</li>
        </ul></div>
      </section>

      <section className="section split narrative-section" aria-labelledby="retail-method-title">
        <div><p className="eyebrow">How I prepared the data</p><h2 id="retail-method-title">From source rows to checked results</h2><p>I gave each row an ID, cleaned its fields, classified it, and marked duplicates and unusual values. The audit database keeps duplicate copies, but only the first copy contributes to the published numbers.</p><p>The data does not link a cancellation to its original sale, so I report cancellation invoices as separate reversals.</p></div>
        <ol className="numbered-process"><li><strong>Prepare in Python</strong><span>Normalize, classify, fingerprint, and flag.</span></li><li><strong>Model in SQLite</strong><span>Build facts, invoices, dimensions, and aggregates.</span></li><li><strong>Reconcile</strong><span>Require exact Python–SQL agreement.</span></li><li><strong>Publish</strong><span>Validate a versioned JSON contract.</span></li></ol>
      </section>

      <section className="section" aria-labelledby="dashboard-title">
        <div className="section-heading"><p className="eyebrow">Dashboard</p><h2 id="dashboard-title">The main measures</h2><p>These values come from the checked dataset, version {data.metadata.contract_version}.</p></div>
        <div className="metrics">
          <Metric label="Net revenue" value={pounds(data.kpis.net_revenue_pence)} />
          <Metric label="Completed orders" value={count.format(data.kpis.completed_orders)} />
          <Metric label="Average order value" value={exactPounds(data.kpis.average_order_value_pence)} definition="Average initial value of completed orders before cancellations." />
          <Metric label="Cancellation rate" value={percent(data.kpis.cancellation_rate_bps)} />
          <Metric label="Identified customers" value={count.format(data.kpis.identified_customers)} />
        </div>
        <Suspense fallback={<div className="chart-loading" aria-live="polite">Loading charts…</div>}>
          <DashboardCharts data={data} />
        </Suspense>
      </section>

      <section className="section quality-section">
        <div><p className="eyebrow">Data quality</p><h2>What I kept track of</h2><p>I left {count.format(quality.duplicate_excluded_row_count)} duplicate copies out of the published measures but kept them in the audit database. I also recorded missing optional fields and unusually large values.</p></div>
        <dl><div><dt>Invalid rows</dt><dd>{count.format(quality.classification_counts.invalid)}</dd></div><div><dt>Missing customer IDs</dt><dd>{count.format(quality.missing_customer_count)}</dd></div><div><dt>Missing descriptions</dt><dd>{count.format(quality.missing_description_count)}</dd></div><div><dt>Multiple-timestamp invoices</dt><dd>{count.format(quality.invoice_conflict_counts.multiple_timestamps)}</dd></div></dl>
      </section>

      <EvidenceLinks />
    </>
  );
}
