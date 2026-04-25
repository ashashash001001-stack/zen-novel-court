/**
 * Script to compress cover images to WebP format
 * Run: node scripts/compress-covers.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '../src/content/novels');
const publicDir = path.join(__dirname, '../public/content/novels');

// Target width for covers (maintain aspect ratio)
const TARGET_WIDTH = 600;
const QUALITY = 80;

async function compressFolder(folderName) {
  const srcPath = path.join(srcDir, folderName);
  const publicPath = path.join(publicDir, folderName);

  // Check if cover.png exists
  const pngPath = path.join(srcPath, 'cover.png');
  if (!fs.existsSync(pngPath)) {
    console.log(`  ⚠️  No cover.png in ${folderName}`);
    return;
  }

  // Ensure public folder exists
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true });
  }

  const webpPath = path.join(publicPath, 'cover.webp');

  console.log(`  📦 Compressing ${folderName}...`);

  try {
    await sharp(pngPath)
      .resize(TARGET_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(webpPath);

    const oldSize = fs.statSync(pngPath).size;
    const newSize = fs.statSync(webpPath).size;
    const savings = ((oldSize - newSize) / oldSize * 100).toFixed(1);

    console.log(`     ${(oldSize / 1024 / 1024).toFixed(1)}MB → ${(newSize / 1024 / 1024).toFixed(1)}MB (${savings}% smaller)`);

    // Also copy to src for reference
    const srcWebpPath = path.join(srcPath, 'cover.webp');
    fs.copyFileSync(webpPath, srcWebpPath);
  } catch (e) {
    console.error(`  ❌ Error: ${e.message}`);
  }
}

// Get all novel folders
const folders = fs.readdirSync(srcDir).filter(f => {
  try {
    return fs.statSync(path.join(srcDir, f)).isDirectory();
  } catch {
    return false;
  }
});

console.log('🎨 Compressing cover images to WebP...\n');

for (const folder of folders) {
  await compressFolder(folder);
}

console.log('\n✅ Done! Now update your code to use .webp instead of .png');