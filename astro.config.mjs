import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL || 'https://ashashash001001-stack.github.io',
  base: process.env.BASE_PATH || '/zen-novel-court',
});