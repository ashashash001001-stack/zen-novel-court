import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src', 'content', 'novels');
const publicDir = path.join(rootDir, 'public', 'content', 'novels');

// Cover image extensions to look for (in priority order)
const COVER_EXTENSIONS = ['.webp', '.png', '.jpg', '.jpeg'];

function getCoverFile(dir) {
  for (const ext of COVER_EXTENSIONS) {
    const coverPath = path.join(dir, `cover${ext}`);
    if (fs.existsSync(coverPath)) {
      return coverPath;
    }
  }
  return null;
}

function syncCovers() {
  console.log('🔄 Syncing cover images...\n');

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Get all novel directories
  const novelDirs = fs.readdirSync(srcDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  console.log(`Found ${novelDirs.length} novels\n`);

  let synced = 0;
  let skipped = 0;

  for (const novelName of novelDirs) {
    const srcNovelDir = path.join(srcDir, novelName);
    const publicNovelDir = path.join(publicDir, novelName);

    // Ensure public novel directory exists
    if (!fs.existsSync(publicNovelDir)) {
      fs.mkdirSync(publicNovelDir, { recursive: true });
    }

    const coverPath = getCoverFile(srcNovelDir);

    if (coverPath) {
      const ext = path.extname(coverPath);
      const destCoverPath = path.join(publicNovelDir, `cover${ext}`);

      // Copy file (only if different to avoid unnecessary rebuilds)
      const srcStats = fs.statSync(coverPath);
      const destExists = fs.existsSync(destCoverPath);

      if (!destExists || fs.statSync(destCoverPath).mtimeMs < srcStats.mtimeMs) {
        fs.copyFileSync(coverPath, destCoverPath);
        console.log(`✅ Synced: ${novelName}/cover${ext}`);
        synced++;
      } else {
        console.log(`⏭️  Up-to-date: ${novelName}/cover${ext}`);
        skipped++;
      }
    } else {
      console.log(`⚠️  No cover found: ${novelName}`);
    }
  }

  console.log(`\n📊 Total: ${synced} synced, ${skipped} up-to-date`);
}

syncCovers();