import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/site.css';

const pageLoaders = {
  home: () => import('./pages/HomePage.jsx'),
  'online-retail': () => import('./pages/OnlineRetailPage.jsx'),
  'encounter-factory': () => import('./pages/EncounterFactoryPage.jsx'),
  'character-estate': () => import('./pages/CharacterEstatePage.jsx'),
  'traveller-notes': () => import('./pages/TravellerNotesPage.jsx'),
  'not-found': () => import('./pages/NotFoundPage.jsx'),
};

const pageId = document.body.dataset.page;
const loader = pageLoaders[pageId] || pageLoaders['not-found'];

loader()
  .then(({ default: Page }) => {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <Page />
      </React.StrictMode>,
    );
  })
  .catch(() => {
    document.getElementById('root').innerHTML =
      '<main class="status error" role="alert"><h1>This page could not be loaded</h1><p>Please refresh the page or return to the portfolio.</p><a class="button" href="/">Return to portfolio</a></main>';
  });
