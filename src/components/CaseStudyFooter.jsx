import { ArrowRight } from 'lucide-react';
import { siteProfile } from '../data/siteProfile.js';
import EmployerActions from './EmployerActions.jsx';

export default function CaseStudyFooter() {
  const pageId = document.body.dataset.page;
  if (pageId === 'home' || pageId === 'not-found') return null;
  const index = siteProfile.projects.findIndex((project) => project.pageId === pageId);
  const next = siteProfile.projects[(index + 1) % siteProfile.projects.length];
  return (
    <section className="section case-study-footer" aria-labelledby="continue-title">
      <p className="eyebrow">Continue exploring</p>
      <h2 id="continue-title">Discuss the work or explore another project</h2>
      <EmployerActions />
      <a className="text-link" href={next.href}>Next: {next.title} <ArrowRight size={16} aria-hidden="true" /></a>
    </section>
  );
}
