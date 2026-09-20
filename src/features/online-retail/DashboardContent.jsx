import { lazy, Suspense } from 'react';
import EvidenceLinks from './EvidenceLinks.jsx';

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
  const peak = data.monthly.reduce((best, row) => row.net_revenue_pence > best.net_revenue_pence ? row : best, data.monthly[0]);
  const uk = data.countries.find((item) => item.country === 'United Kingdom');
  const topProduct = data.products[0];
  const quality = data.quality;

  return (
    <>
      <section className="section dark-section" aria-labelledby="retail-summary-title">
        <div className="section-heading"><p className="eyebrow">Executive summary</p><h2 id="retail-summary-title">Revenue remained highly concentrated</h2></div>
        <div className="insight-grid">
          <article><strong>{peak.month}</strong><span>Highest monthly net revenue at {pounds(peak.net_revenue_pence)}</span></article>
          <article><strong>{percent(Math.round(uk.net_revenue_pence * 10000 / data.kpis.net_revenue_pence))}</strong><span>United Kingdom share of net revenue</span></article>
          <article><strong>{topProduct.stock_code}</strong><span>Highest net-revenue product at {pounds(topProduct.net_revenue_pence)}</span></article>
        </div>
        <p><strong>Recommendation:</strong> protect availability for the leading products and monitor cancellation value alongside gross sales. Treat international growth as diversification, not a replacement for the core UK market.</p>
      </section>

      <section className="section split narrative-section" aria-labelledby="retail-method-title">
        <div><p className="eyebrow">Problem and preparation</p><h2 id="retail-method-title">An audit trail from workbook to dashboard</h2><p>Each source row receives a stable ID, normalized fields, one mutually exclusive class, a duplicate rank, and independent quality flags. Exact duplicate copies remain auditable, but only the first source row contributes to metrics.</p><p>Cancellation invoices remain standalone reversals because the source does not identify the original order.</p></div>
        <ol className="numbered-process"><li><strong>Prepare in Python</strong><span>Normalize, classify, fingerprint, and flag.</span></li><li><strong>Model in SQLite</strong><span>Build facts, invoices, dimensions, and aggregates.</span></li><li><strong>Reconcile</strong><span>Require exact Python–SQL agreement.</span></li><li><strong>Publish</strong><span>Validate a versioned JSON contract.</span></li></ol>
      </section>

      <section className="section" aria-labelledby="dashboard-title">
        <div className="section-heading"><p className="eyebrow">Dashboard</p><h2 id="dashboard-title">Performance at a glance</h2><p>Every displayed value comes from contract version {data.metadata.contract_version}.</p></div>
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
        <div><p className="eyebrow">Data quality</p><h2>Exceptions stay visible</h2><p>{count.format(quality.duplicate_excluded_row_count)} duplicate copies were excluded from metrics while retained in the audit database. Missing optional fields and extreme values remain documented.</p></div>
        <dl><div><dt>Invalid rows</dt><dd>{count.format(quality.classification_counts.invalid)}</dd></div><div><dt>Missing customer IDs</dt><dd>{count.format(quality.missing_customer_count)}</dd></div><div><dt>Missing descriptions</dt><dd>{count.format(quality.missing_description_count)}</dd></div><div><dt>Multiple-timestamp invoices</dt><dd>{count.format(quality.invoice_conflict_counts.multiple_timestamps)}</dd></div></dl>
      </section>

      <EvidenceLinks />
    </>
  );
}
