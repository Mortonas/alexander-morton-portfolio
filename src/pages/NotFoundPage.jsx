import SiteLayout from '../components/SiteLayout.jsx';

export default function NotFoundPage() {
  return (
    <SiteLayout>
      <main id="main" className="status">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The requested portfolio page does not exist.</p>
        <a className="button primary" href="/">Return to portfolio</a>
      </main>
    </SiteLayout>
  );
}
