import { ArrowRight, Github } from 'lucide-react';
import ProjectCard from '../components/ProjectCard.jsx';
import SiteLayout from '../components/SiteLayout.jsx';
import { projects } from '../data/projects.js';

export default function HomePage() {
  return (
    <SiteLayout>
      <main id="main">
        <section className="home-hero section">
          <p className="eyebrow">Entry-level data analyst</p>
          <h1>Analysis that can be checked, explained, and used.</h1>
          <p className="role">Alexander Morton</p>
          <p className="lede">I prepare data, define calculations, document limitations, and build clear tools around the result. My work spans Python, SQL, Excel, Google Sheets automation, and React.</p>
          <div className="actions">
            <a className="button primary" href="#work">View selected work <ArrowRight size={16} aria-hidden="true" /></a>
            <a className="button" href="https://github.com/Mortonas" target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" /> GitHub</a>
          </div>
        </section>

        <section id="work" className="section work-section" aria-labelledby="work-title">
          <div className="section-heading">
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title">Different projects, one careful way of working</h2>
            <p>Online Retail is a complete data analysis. Encounter Factory is an application I am still building. Character &amp; Estate Automation shows how I organize and automate a complex spreadsheet workflow.</p>
          </div>
          <div className="project-list">
            {projects.map((project, index) => <ProjectCard key={project.slug} project={project} featured={index === 0} />)}
          </div>
        </section>

        <section id="about" className="section about-section" aria-labelledby="about-title">
          <div>
            <p className="eyebrow">How I work</p>
            <h2 id="about-title">Method before decoration</h2>
            <p>I start by making the inputs, rules, and exceptions explicit. Then I reconcile the result and design the view around the questions a reviewer needs to answer.</p>
          </div>
          <div className="skill-groups">
            <article><h3>Analysis</h3><p>Python, SQL, SQLite, Excel, data preparation, reconciliation, descriptive analysis.</p></article>
            <article><h3>Automation</h3><p>Google Sheets, Apps Script, validation rules, linked calculations, repeatable exports.</p></article>
            <article><h3>Application development</h3><p>React, TypeScript, Express, schemas, background jobs, accessible interfaces.</p></article>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
