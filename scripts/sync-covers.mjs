import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Jimp } from 'jimp';

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

async function convertToWebp(inputPath, outputPath) {
  const image = await Jimp.read(inputPath);
  await image.writeAsync(outputPath);
}

async function syncCovers() {
  console.log('🔄 Syncing and converting cover images...\n');

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
  let converted = 0;

  for (const novelName of novelDirs) {
    const srcNovelDir = path.join(srcDir, novelName);
    const publicNovelDir = path.join(publicDir, novelName);

    // Ensure public novel directory exists
    if (!fs.existsSync(publicNovelDir)) {
      fs.mkdirSync(publicNovelDir, { recursive: true });
    }

    const coverPath = getCoverFile(srcNovelDir);

    if (coverPath) {
      const srcExt = path.extname(coverPath);
      const destCoverPath = path.join(publicNovelDir, 'cover.webp');

      // Get source file stats
      const srcStats = fs.statSync(coverPath);
      const destExists = fs.existsSync(destCoverPath);

      // Check if we need to sync/convert
      let needsSync = !destExists;
      if (destExists) {
        const destStats = fs.statSync(destCoverPath);
        needsSync = destStats.mtimeMs < srcStats.mtimeMs;
      }

      if (needsSync) {
        if (srcExt === '.webp') {
          // For webp, convert via jimp and save as webp format
          const image = await Jimp.read(coverPath);
          await image.writeAsync(destCoverPath);
          console.log(`✅ Synced: ${novelName}/cover.webp (original webp)`);
        } else {
          // Convert to webp for png/jpg/jpeg
          await convertToWebp(coverPath, destCoverPath);
          console.log(`✅ Converted: ${novelName}/cover.webp (from ${srcExt})`);
          converted++;
        }
        synced++;
      } else {
        console.log(`⏭️  Up-to-date: ${novelName}/cover.webp`);
        skipped++;
      }
    } else {
      console.log(`⚠️  No cover found: ${novelName}`);
    }
  }

  console.log(`\n📊 Total: ${synced} synced, ${skipped} up-to-date, ${converted} converted to webp`);
}

syncCovers();