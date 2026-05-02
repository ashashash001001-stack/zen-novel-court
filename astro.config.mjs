import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL || 'https://ashashash001001-stack.github.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  integrations: [
    sitemap()
  ]
});