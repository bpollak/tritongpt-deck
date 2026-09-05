import { access, readFile } from 'node:fs/promises';
import { slides } from '../src/data/slideDeck.js';
import { getSlideThumbnailKey } from '../src/data/slideThumbnailKey.js';
import { getRendererKey } from './lib/slideThumbnails.mjs';

const manifest = JSON.parse(await readFile('src/data/slideThumbnails.json', 'utf8'));
const failures = [];
if (manifest.rendererKey !== await getRendererKey()) failures.push('Slide renderer changed.');
for (const slide of slides) {
  const entry = manifest.slides[slide.slug];
  if (entry?.contentKey !== getSlideThumbnailKey(slide)) {
    failures.push(`${slide.slug}: missing or outdated thumbnail.`);
  } else {
    try { await access(`public${entry.src}`); }
    catch { failures.push(`${slide.slug}: thumbnail image missing.`); }
  }
}
if (failures.length) {
  console.error(`${failures.join('\n')}\nRun npm run thumbnails to refresh the slide previews.`);
  process.exitCode = 1;
} else console.log(`Verified ${slides.length} current slide thumbnails.`);
