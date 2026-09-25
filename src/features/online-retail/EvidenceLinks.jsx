import { Database, Download, ExternalLink, FileSpreadsheet, Fingerprint } from 'lucide-react';

export default function EvidenceLinks() {
  return (
    <section className="section" aria-labelledby="evidence-title">
      <div className="section-heading"><p className="eyebrow">Downloads and sources</p><h2 id="evidence-title">Check the numbers yourself</h2></div>
      <div className="artifact-grid">
        <a href="/artifacts/online-retail-case-study.xlsx" download><FileSpreadsheet aria-hidden="true" /><strong>Excel report</strong><span>Summary, analysis, quality, sample, and dictionary.</span><Download size={16} aria-hidden="true" /></a>
        <a href="/data/dashboard-v1.json" download><Database aria-hidden="true" /><strong>Dashboard data</strong><span>The checked JSON behind every chart and figure.</span><Download size={16} aria-hidden="true" /></a>
        <a href="/data/dashboard-v1.sha256" download><Fingerprint aria-hidden="true" /><strong>Data checksum</strong><span>Use this SHA-256 value to confirm the download has not changed.</span><Download size={16} aria-hidden="true" /></a>
        <a href="https://doi.org/10.24432/C5BW33" target="_blank" rel="noreferrer"><ExternalLink aria-hidden="true" /><strong>Source dataset</strong><span>UCI Online Retail, CC BY 4.0.</span></a>
      </div>
    </section>
  );
}
