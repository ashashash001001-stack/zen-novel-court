# Build Scripts for Multiple Deployments

## The Problem

The site has two deployment targets with different base paths:
- **GitHub Pages**: `BASE_PATH=/zen-novel-court`
- **Cloudflare Pages**: `BASE_PATH=/`

## Solution: Environment-Aware Build

The config now uses environment variables:
```typescript
// src/config.ts
export const config = {
  base: import.meta.env.BASE_PATH || '/zen-novel-court',
  site: import.meta.env.SITE_URL || 'https://ashashash001001-stack.github.io'
} as const;
```

## Build Commands

### For GitHub Pages (default)
```bash
npm run build
# Uses: BASE_PATH=/zen-novel-court, SITE_URL=https://ashashash001001-stack.github.io
```

### For Cloudflare Pages
```bash
BASE_PATH=/ SITE_URL=https://zen-novel-court.pages.dev/ npm run build
```

## Automated Build Script

Create `scripts/build.mjs`:

```javascript
import { execSync } from 'child_process';
import fs from 'fs';

const builds = [
  {
    name: 'github',
    env: { BASE_PATH: '/zen-novel-court', SITE_URL: 'https://ashashash001001-stack.github.io' },
    output: 'dist-github'
  },
  {
    name: 'cloudflare',
    env: { BASE_PATH: '/', SITE_URL: 'https://zen-novel-court.pages.dev' },
    output: 'dist-cloudflare'
  }
];

for (const build of builds) {
  console.log(`\n📦 Building for ${build.name}...`);
  
  // Set env vars and build
  const env = { ...process.env, ...build.env };
  execSync('npm run build', { env, stdio: 'inherit' });
  
  // Rename dist folder
  fs.renameSync('dist', build.output);
}

console.log('\n✅ Build complete!');
console.log('dist-github/  - Ready for GitHub Pages');
console.log('dist-cloudflare/  - Ready for Cloudflare Pages');
```

## Or: GitHub Actions for Both

Create `.github/workflows/deploy-both.yml`:

```yaml
name: Deploy to Both Platforms

on:
  push:
    branches: [main]

jobs:
  build-github:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  build-cloudflare:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm install
      - run: BASE_PATH=/ SITE_URL=https://zen-novel-court.pages.dev/ npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
```

## Quick Fix: Just Build Cloudflare Version

If you want to deploy only to Cloudflare now:

```bash
BASE_PATH=/ SITE_URL=https://zen-novel-court.pages.dev/ npm run build
```

Then deploy the `dist/` folder to Cloudflare Pages.