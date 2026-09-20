import { useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { selectFindings } from './dashboardFindings.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);
const money = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });
const count = new Intl.NumberFormat('en-GB');
const pounds = (pence) => money.format(pence / 100);
const percent = (bps) => `${(bps / 100).toFixed(1)}%`;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const chartOptions = (currency = true, horizontal = false) => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8 } },
    tooltip: { callbacks: currency ? { label: (item) => `${item.dataset.label}: ${pounds(item.raw)}` } : {} },
  },
  indexAxis: horizontal ? 'y' : 'x',
  scales: horizontal ? {
    x: { beginAtZero: true, ticks: currency ? { callback: (value) => money.format(value / 100) } : {} },
    y: { grid: { display: false } },
  } : {
    y: { beginAtZero: true, ticks: currency ? { callback: (value) => money.format(value / 100) } : {} },
    x: { grid: { display: false } },
  },
  animation: reducedMotion ? false : { duration: 450 },
});

function Figure({ title, note, summary, supplement, children }) {
  return <figure className="figure-card"><figcaption><h3>{title}</h3><p>{note}</p></figcaption><div className="chart" aria-hidden="true">{children}</div>{supplement}<details><summary>Accessible chart summary</summary><p>{summary}</p></details></figure>;
}

export default function DashboardCharts({ data }) {
  const { charts, peak, uk } = useMemo(() => {
    const topCountries = data.countries.slice(0, 8);
    const ukRow = data.countries.find((item) => item.country === 'United Kingdom');
    const international = data.countries.filter((item) => item.country !== 'United Kingdom').reduce((sum, item) => sum + item.net_revenue_pence, 0);
    const topProducts = data.merchandise_products;
    const findings = selectFindings(data);
    return {
      peak: findings.highestCompleteMonth,
      uk: ukRow,
      charts: {
        monthly: { labels: data.monthly.map((row) => `${row.month}${row.is_complete_month ? '' : '*'}`), datasets: [{ label: 'Gross sales', data: data.monthly.map((row) => row.gross_sales_pence), borderColor: '#0f766e', backgroundColor: '#0f766e', tension: .25 }, { label: 'Cancellation value', data: data.monthly.map((row) => row.cancellation_value_pence), borderColor: '#c2410c', backgroundColor: '#c2410c', tension: .25 }, { label: 'Net revenue', data: data.monthly.map((row) => row.net_revenue_pence), borderColor: '#17324d', backgroundColor: '#17324d', tension: .25 }] },
        countries: { labels: ['United Kingdom', 'International'], datasets: [{ label: 'Net revenue', data: [ukRow?.net_revenue_pence || 0, international], backgroundColor: ['#17324d', '#14b8a6'] }] },
        countryDetail: topCountries,
        products: { labels: topProducts.map((row) => row.stock_code), datasets: [{ label: 'Net revenue', data: topProducts.map((row) => row.net_revenue_pence), backgroundColor: '#0f766e' }] },
        customers: { labels: data.customers.frequency_bands.map((row) => row.band), datasets: [{ label: 'Customers', data: data.customers.frequency_bands.map((row) => row.customer_count), backgroundColor: ['#99f6e4', '#5eead4', '#2dd4bf', '#0f766e'] }] },
      },
    };
  }, [data]);

  return <div className="chart-grid">
    <Figure title="Monthly revenue" note={<>Gross sales, cancellation value, and net revenue. <strong>*Partial month through 9 December 2011.</strong></>} summary={`The highest complete month was ${peak.month} at ${pounds(peak.net_revenue_pence)}. December 2011 is a partial month through 9 December. The chart covers ${data.monthly.length} months in chronological order.`}><Line data={charts.monthly} options={chartOptions()} /></Figure>
    <Figure title="UK and international contribution" note="Net revenue split, with leading countries listed below." summary={`The United Kingdom generated ${pounds(uk.net_revenue_pence)} in net revenue. The next leading countries were ${charts.countryDetail.slice(1, 4).map((row) => row.country).join(', ')}.`} supplement={<ul className="mini-list" aria-label="Leading countries by net revenue">{charts.countryDetail.slice(0, 5).map((row) => <li key={row.country}><span>{row.country}</span><strong>{pounds(row.net_revenue_pence)}</strong></li>)}</ul>}><Bar data={charts.countries} options={chartOptions()} /></Figure>
    <Figure title="Top merchandise by net revenue" note="Ten merchandise codes ranked independently. Fulfilment services, adjustments and fees, and vouchers are excluded." summary={`The merchandise ranking contains ten codes, led by ${data.merchandise_products[0].stock_code} at ${pounds(data.merchandise_products[0].net_revenue_pence)}. Service, adjustment, fee, and voucher codes are excluded.`} supplement={<ol className="product-list" aria-label="Top merchandise by net revenue">{data.merchandise_products.map((row) => <li key={row.stock_code}><span className="product-rank">{row.rank}</span><strong>{row.stock_code}</strong><span>{row.description}</span><span>{pounds(row.net_revenue_pence)}</span></li>)}</ol>}><Bar data={charts.products} options={chartOptions(true, true)} /></Figure>
    <Figure title="Customer purchase frequency" note="Identified customers grouped by completed-order count." summary={`${count.format(data.customers.repeat_customers)} of ${count.format(data.customers.identified_customers)} identified customers placed at least two completed orders, a ${percent(data.customers.repeat_rate_bps)} repeat rate.`}><Bar data={charts.customers} options={chartOptions(false)} /></Figure>
  </div>;
}
