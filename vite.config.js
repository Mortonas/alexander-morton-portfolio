import { resolve } from 'node:path';
import process from 'node:process';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (command === 'build' && !env.VITE_SITE_ORIGIN) {
    throw new Error('VITE_SITE_ORIGIN is required for production canonical metadata.');
  }

  return {
    base: '/',
    plugins: [react()],
    build: {
      manifest: true,
      rollupOptions: {
        input: {
          home: resolve(import.meta.dirname, 'index.html'),
          onlineRetail: resolve(import.meta.dirname, 'projects/online-retail/index.html'),
          encounterFactory: resolve(import.meta.dirname, 'projects/encounter-factory/index.html'),
          characterEstate: resolve(import.meta.dirname, 'projects/character-estate-automation/index.html'),
          notFound: resolve(import.meta.dirname, '404.html'),
        },
      },
    },
  };
});
