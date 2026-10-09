import { startSession } from './rec.mjs';

// TritonAI site -> "Learn to use TritonAI Harness" -> training player -> the real opening sequence plays.
const OUT = process.argv[2] || 'out/cabinet-harness-training-opening.mp4';
const PLAY_SECONDS = Number(process.argv[3] || 31);
const s = await startSession({ width: 1440, height: 810 });
const { page, click, pause, point } = s;

async function smoothScrollTo(locator, offset = 120) {
  const target = await locator.evaluate((el, off) => el.getBoundingClientRect().top + window.scrollY - off, offset);
  const start = await page.evaluate(() => window.scrollY);
  const steps = 40;
  for (let i = 1; i <= steps; i++) {
    const p = i / steps; const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    await page.evaluate(y => window.scrollTo(0, y), start + (target - start) * e);
    await page.waitForTimeout(22);
  }
}

await page.goto('https://tritonai.ucsd.edu/', { waitUntil: 'networkidle' });
await s.record();
await pause(1500);
const section = page.getByRole('heading', { name: 'Learn to use TritonAI Harness' });
await smoothScrollTo(section, 200);
await pause(900);
await click(page.getByRole('link', { name: 'Start TritonAI Harness training' }), { after: 200 });
await page.waitForURL(/training\/harness/);
await page.waitForLoadState('networkidle');
await pause(1200);
const player = page.getByRole('group', { name: /Training video screen/ });
await smoothScrollTo(player, 8);
await pause(600);
await click(page.getByRole('button', { name: 'Play training' }), { after: 200 });
await s.moveTo(1400, 790, 700); // park the cursor out of the picture
await pause(PLAY_SECONDS * 1000);

await s.finish(OUT);
