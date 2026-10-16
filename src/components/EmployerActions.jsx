import { Download, FileText, Github, Mail } from 'lucide-react';
import { siteProfile } from '../data/siteProfile.js';

export default function EmployerActions() {
  return (
    <div className="actions employer-actions">
      <a className="button primary" href="mailto:mortonscout12@gmail.com"><Mail size={16} aria-hidden="true" /> Email Alexander</a>
      <a className="button" href={siteProfile.resumePdf} target="_blank" rel="noreferrer"><FileText size={16} aria-hidden="true" /> View {siteProfile.resumeLabel} résumé (PDF)</a>
      <a className="button" href="https://github.com/Mortonas" target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" /> View GitHub</a>
      <a className="text-link resume-word" href={siteProfile.resumeWord} download><Download size={16} aria-hidden="true" /> Download Word résumé</a>
    </div>
  );
}
