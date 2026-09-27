import { ArrowRight, Download, ExternalLink } from 'lucide-react';

export default function ProjectCard({ project, featured = false }) {
  return (
    <article className={`project-card${featured ? ' featured' : ''}`}>
      <a className="project-image" href={project.href} aria-label={`Open ${project.title} project`}>
        <img src={project.image} alt="" loading={featured ? 'eager' : 'lazy'} style={project.imageFit ? { objectFit: project.imageFit } : undefined} />
      </a>
      <div className="project-card-copy">
        <p className="eyebrow">{project.label}</p>
        <h3><a href={project.href}>{project.title}</a></h3>
        <p>{project.summary}</p>
        <ul className="tag-list" aria-label={`${project.title} tools`}>
          {project.skills.map((skill) => <li key={skill}>{skill}</li>)}
        </ul>
        <a className="text-link" href={project.href}>{project.linkLabel} <ArrowRight size={16} aria-hidden="true" /></a>
        {project.sourceDownloadUrl && <a className="project-card-download" href={project.sourceDownloadUrl}>{project.sourceDownloadLabel || 'Download project ZIP'} <Download size={16} aria-hidden="true" /></a>}
        {project.demoUrl && <a className="project-card-download" href={project.demoUrl} target="_blank" rel="noreferrer">{project.demoLinkLabel || 'Open project demo'} <ExternalLink size={16} aria-hidden="true" /></a>}
        {project.downloadNote && <p className="project-card-download-note">{project.downloadNote}</p>}
      </div>
    </article>
  );
}
