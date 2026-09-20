import { Database, Download, ExternalLink, FileSpreadsheet, Fingerprint } from 'lucide-react';

export default function EvidenceLinks() {
  return (
    <section className="section" aria-labelledby="evidence-title">
      <div className="section-heading"><p className="eyebrow">Evidence</p><h2 id="evidence-title">Review the work behind the dashboard</h2></div>
      <div className="artifact-grid">
        <a href="/artifacts/online-retail-case-study.xlsx" download><FileSpreadsheet aria-hidden="true" /><strong>Excel report</strong><span>Summary, analysis, quality, sample, and dictionary.</span><Download size={16} aria-hidden="true" /></a>
        <a href="/data/dashboard-v1.json" download><Database aria-hidden="true" /><strong>Validated data contract</strong><span>Canonical JSON used by every dashboard view.</span><Download size={16} aria-hidden="true" /></a>
        <a href="/data/dashboard-v1.sha256" download><Fingerprint aria-hidden="true" /><strong>Contract checksum</strong><span>SHA-256 for the published JSON bytes.</span><Download size={16} aria-hidden="true" /></a>
        <a href="https://doi.org/10.24432/C5BW33" target="_blank" rel="noreferrer"><ExternalLink aria-hidden="true" /><strong>Source dataset</strong><span>UCI Online Retail, CC BY 4.0.</span></a>
      </div>
    </section>
  );
}
