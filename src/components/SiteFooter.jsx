import { siteProfile } from '../data/siteProfile.js';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>Alexander Morton · {siteProfile.role}</p>
      <a href={siteProfile.relatedUrl}>{siteProfile.relatedLabel}</a>
      <p>Project claims link to public evidence and current limitations.</p>
    </footer>
  );
}
