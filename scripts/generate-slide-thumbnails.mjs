import { mkdir, readFile, readdir, unlink, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import { chromium } from '@playwright/test';
import { slides } from '../src/data/slideDeck.js';
import { getSlideThumbnailKey } from '../src/data/slideThumbnailKey.js';
import { getRendererKey } from './lib/slideThumbnails.mjs';

await mkdir('public/slide-thumbnails', { recursive: true });
const rendererKey = await getRendererKey();
const manifest = { rendererKey, slides: {} };
const force = process.argv.includes('--force');
const progressPath = '.slide-thumbnail-progress.json';
let previous = {};
try { previous = JSON.parse(await readFile('src/data/slideThumbnails.json', 'utf8')); } catch { /* First run. */ }
try {
  const progress = JSON.parse(await readFile(progressPath, 'utf8'));
  if (progress.rendererKey === rendererKey) previous = { rendererKey, slides: { ...(previous.rendererKey === rendererKey ? previous.slides : {}), ...progress.slides } };
} catch { /* No interrupted capture to resume. */ }
const server = await createServer({ server: { host: '127.0.0.1', port: 0 } });
let browser;
try {
  await server.listen();
  const address = server.httpServer.address();
  browser = await chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined });
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, reducedMotion: 'reduce' });
  let completed = 0;
  for (const slide of slides) {
    const contentKey = getSlideThumbnailKey(slide);
    const entry = previous.slides?.[slide.slug];
    let reusable = !force && previous.rendererKey === rendererKey && entry?.contentKey === contentKey;
    if (reusable) {
      try { await readFile(`public${entry.src}`); } catch { reusable = false; }
    }
    const src = reusable ? entry.src : `/slide-thumbnails/${slide.slug}-${contentKey}-${rendererKey.slice(0, 8)}.jpg`;
    if (!reusable) {
      await page.goto(`http://127.0.0.1:${address.port}/__thumbnail?slide=${encodeURIComponent(slide.slug)}`, { waitUntil: 'domcontentloaded' });
      await page.locator(`[data-thumbnail-slide="${slide.slug}"]`).waitFor();
      await page.evaluate(async () => {
        await Promise.race([
          Promise.all([document.fonts.ready, ...[...document.images].map((img) => img.decode().catch(() => {}))]),
          new Promise((resolve) => setTimeout(resolve, 12000))
        ]);
      });
      await page.addStyleTag({ content: '[data-thumbnail-slide] * { opacity: 1 !important; animation: none !important; transition: none !important; }' });
      // Let React motion finish its entrance and local videos reveal their poster/frame.
      await page.waitForTimeout(1800);
      await page.screenshot({ path: `public${src}`, type: 'jpeg', quality: 55, animations: 'disabled' });
    }
    manifest.slides[slide.slug] = { contentKey, src };
    await writeFile(progressPath, JSON.stringify(manifest));
    completed += 1;
    if (completed % 10 === 0 || completed === slides.length) console.log(`Thumbnails ${completed}/${slides.length}`);
  }
  await writeFile('src/data/slideThumbnails.json', `${JSON.stringify(manifest, null, 2)}\n`);
  await unlink(progressPath);
  const currentImages = new Set(Object.values(manifest.slides).map((entry) => entry.src.split('/').pop()));
  for (const name of await readdir('public/slide-thumbnails')) {
    if (/^[a-z0-9-]+-[a-f0-9]{16}(?:-[a-f0-9]{8})?\.jpg$/.test(name) && !currentImages.has(name)) {
      await unlink(`public/slide-thumbnails/${name}`);
    }
  }
} finally {
  await browser?.close();
  await server.close();
}
