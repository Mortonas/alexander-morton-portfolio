import { useEffect, useState } from 'react';
import ProjectHero from '../components/ProjectHero.jsx';
import SiteLayout from '../components/SiteLayout.jsx';
import DashboardContent from '../features/online-retail/DashboardContent.jsx';
import { loadDashboard } from '../features/online-retail/loadDashboard.js';

export default function OnlineRetailPage() {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({ status: 'loading' });

  useEffect(() => {
    let active = true;
    setState({ status: 'loading' });
    loadDashboard()
      .then((data) => active && setState({ status: 'ready', data }))
      .catch((error) => active && setState({ status: 'error', error }));
    return () => { active = false; };
  }, [attempt]);

  return (
    <SiteLayout>
      <main id="main">
        <ProjectHero
          eyebrow="Data analyst case study"
          title="Online Retail Performance Analysis"
          subtitle="Python · SQL · SQLite · Excel · React"
          lede="How did sales, cancellations, product mix, geography, and customer frequency shape realized revenue from December 2010 through December 2011?"
          repositoryUrl="https://github.com/Mortonas/online-retail-performance-analysis"
          meta={['541,909 source rows', 'GBP', 'UCI Online Retail', 'CC BY 4.0']}
        />
        {state.status === 'loading' && <section className="status compact" aria-live="polite">Loading the validated case study…</section>}
        {state.status === 'error' && (
          <section className="status compact error" role="alert">
            <h2>Dashboard data could not be loaded</h2>
            <p>{state.error.message}</p>
            <div className="actions">
              <button className="button primary" type="button" onClick={() => setAttempt((value) => value + 1)}>Try again</button>
              <a className="button" href="https://github.com/Mortonas/online-retail-performance-analysis">View source repository</a>
            </div>
          </section>
        )}
        {state.status === 'ready' && <DashboardContent data={state.data} />}
      </main>
    </SiteLayout>
  );
}
