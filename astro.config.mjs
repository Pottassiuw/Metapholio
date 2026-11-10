// @ts-check
import { defineConfig } from 'astro/config';

// `site` e `base` vêm do ambiente no deploy do GitHub Pages; em desenvolvimento ficam na raiz.
export default defineConfig({
  site: process.env.SITE_URL ?? 'http://localhost:4321',
  base: process.env.BASE_PATH ?? '/',
  build: { inlineStylesheets: 'auto' },
});
