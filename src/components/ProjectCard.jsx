import { ArrowRight } from 'lucide-react';

export default function ProjectCard({ project, featured = false }) {
  return (
    <article className={`project-card${featured ? ' featured' : ''}`}>
      <a className="project-image" href={project.href} aria-label={`Open ${project.title} project`}>
        <img src={project.image} alt="" loading={featured ? 'eager' : 'lazy'} />
      </a>
      <div className="project-card-copy">
        <p className="eyebrow">{project.label}</p>
        <h3><a href={project.href}>{project.title}</a></h3>
        <p>{project.summary}</p>
        <ul className="tag-list" aria-label={`${project.title} tools`}>
          {project.skills.map((skill) => <li key={skill}>{skill}</li>)}
        </ul>
        <a className="text-link" href={project.href}>{project.linkLabel} <ArrowRight size={16} aria-hidden="true" /></a>
      </div>
    </article>
  );
}
