import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function ProjectHero({ eyebrow, title, subtitle, lede, repositoryUrl, repositoryLabel = 'View repository', meta = [] }) {
  return (
    <section className="project-hero section">
      <a className="back-link" href="/"><ArrowLeft size={16} aria-hidden="true" /> Portfolio</a>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {subtitle && <p className="role">{subtitle}</p>}
      <p className="lede">{lede}</p>
      {meta.length > 0 && <ul className="hero-meta" aria-label="Project details">{meta.map((item) => <li key={item}>{item}</li>)}</ul>}
      {repositoryUrl && <a className="button" href={repositoryUrl} target="_blank" rel="noreferrer">{repositoryLabel} <ExternalLink size={16} aria-hidden="true" /></a>}
    </section>
  );
}
