import { ArrowLeft, ArrowRight, Download, ExternalLink } from 'lucide-react';
import { siteProfile } from '../data/siteProfile.js';
import CaseStudyNav from './CaseStudyNav.jsx';

export default function ProjectHero({ eyebrow, title, subtitle, lede, proof, repositoryUrl, repositoryLabel = 'View repository', downloads = [], downloadNote, downloadNoteLabel = 'Note', meta = [] }) {
  const links = siteProfile.studySections[document.body.dataset.page] || [];
  return (
    <>
      <section className="project-hero section">
        <a className="back-link" href="/"><ArrowLeft size={16} aria-hidden="true" /> Portfolio</a>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {subtitle && <p className="role">{subtitle}</p>}
        <p className="lede">{lede}</p>
        {proof && <p className="hero-proof">{proof}</p>}
        {meta.length > 0 && <ul className="hero-meta" aria-label="Project details">{meta.map((item) => <li key={item}>{item}</li>)}</ul>}
        <div className="actions project-actions" aria-label={`${title} links and downloads`}>
          {links[0] && <a className="button primary" href={links[0][1]}>{links[0][0]} <ArrowRight size={16} aria-hidden="true" /></a>}
          {repositoryUrl && <a className="button" href={repositoryUrl} target="_blank" rel="noreferrer">{repositoryLabel} <ExternalLink size={16} aria-hidden="true" /></a>}
          {downloads.map((item) => (
            <a className="button" href={item.url} key={item.label} download={item.download || undefined} target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined}>
              {item.label} {item.external ? <ExternalLink size={16} aria-hidden="true" /> : <Download size={16} aria-hidden="true" />}
            </a>
          ))}
          {downloadNote && <p className="project-download-note"><strong>{downloadNoteLabel}:</strong> {downloadNote}</p>}
        </div>
      </section>
      <CaseStudyNav links={links} />
    </>
  );
}
