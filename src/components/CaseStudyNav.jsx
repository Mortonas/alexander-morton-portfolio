export default function CaseStudyNav({ links }) {
  if (!links?.length) return null;
  return (
    <nav className="case-study-nav" aria-label="On this page">
      <span>On this page</span>
      {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
    </nav>
  );
}
