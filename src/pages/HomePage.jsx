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
          <h1>I make messy information easier to trust and use.</h1>
          <p className="role">Alexander Morton</p>
          <p className="lede">I use Python, SQL, and spreadsheets to organize data, check the numbers, and explain what they mean. I also build tools that turn those results into something people can work with.</p>
          <div className="actions">
            <a className="button primary" href="#work">View selected work <ArrowRight size={16} aria-hidden="true" /></a>
            <a className="button" href="https://github.com/Mortonas" target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" /> GitHub</a>
          </div>
        </section>

        <section id="work" className="section work-section" aria-labelledby="work-title">
          <div className="section-heading">
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title">Four projects, each with a different problem to solve</h2>
            <p>Online Retail is my full data-analysis project. The others show how I structure a spreadsheet system, build an application, and turn a large set of world records into useful draft notes.</p>
          </div>
          <div className="project-list">
            {projects.map((project, index) => <ProjectCard key={project.slug} project={project} featured={index === 0} />)}
          </div>
        </section>

        <section id="about" className="section about-section" aria-labelledby="about-title">
          <div>
            <p className="eyebrow">How I work</p>
            <h2 id="about-title">I want the work to hold up to questions</h2>
            <p>I write down where the data came from, decide how to handle exceptions, and check the result against the source. Then I present the parts that help someone make sense of it.</p>
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
