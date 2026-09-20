import { ExternalLink } from 'lucide-react';

export default function SiteLayout({ children }) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="/">Alexander Morton</a>
        <nav aria-label="Main navigation">
          <a href="/#work">Work</a>
          <a href="/#about">About</a>
          <a href="https://github.com/Mortonas" target="_blank" rel="noreferrer">
            GitHub <ExternalLink size={14} aria-hidden="true" />
          </a>
        </nav>
      </header>
      {children}
    </>
  );
}
