import { useRef, useState } from 'react';
import { ExternalLink, Menu, X } from 'lucide-react';
import { siteProfile } from '../data/siteProfile.js';
import FragmentNavigation from './FragmentNavigation.jsx';
import CaseStudyFooter from './CaseStudyFooter.jsx';
import SiteFooter from './SiteFooter.jsx';

export default function SiteLayout({ children }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  return (
    <>
      <FragmentNavigation />
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header" onKeyDown={(event) => {
        if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); }
      }}>
        <a className="brand" href="/">Alexander Morton</a>
        <button className="nav-toggle" ref={toggle} type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
          {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />} Menu
        </button>
        <nav id="main-navigation" className="nav-links" data-open={open} aria-label="Main navigation" onClick={() => setOpen(false)}>
          {siteProfile.navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          <a href="https://github.com/Mortonas" target="_blank" rel="noreferrer">GitHub <ExternalLink size={14} aria-hidden="true" /></a>
        </nav>
      </header>
      {children}
      <CaseStudyFooter />
      <SiteFooter />
    </>
  );
}
