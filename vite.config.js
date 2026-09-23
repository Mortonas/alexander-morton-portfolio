import { resolve } from 'node:path';
import process from 'node:process';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteOrigin = (env.VITE_SITE_ORIGIN || process.env.VITE_SITE_ORIGIN || process.env.URL || '').replace(/\/$/, '');
  if (command === 'build' && !siteOrigin) {
    throw new Error('A production origin is required. Set VITE_SITE_ORIGIN locally; Netlify supplies URL automatically.');
  }

  return {
    base: '/',
    plugins: [
      {
        name: 'canonical-site-origin',
        enforce: 'pre',
        transformIndexHtml: {
          order: 'pre',
          handler(html) {
            return html.replaceAll('%VITE_SITE_ORIGIN%', siteOrigin);
          },
        },
      },
      react(),
    ],
    build: {
      manifest: true,
      rollupOptions: {
        input: {
          home: resolve(import.meta.dirname, 'index.html'),
          onlineRetail: resolve(import.meta.dirname, 'projects/online-retail/index.html'),
          encounterFactory: resolve(import.meta.dirname, 'projects/encounter-factory/index.html'),
          characterEstate: resolve(import.meta.dirname, 'projects/character-estate-automation/index.html'),
          travellerNotes: resolve(import.meta.dirname, 'projects/traveller-notes/index.html'),
          notFound: resolve(import.meta.dirname, '404.html'),
        },
      },
    },
  };
});
