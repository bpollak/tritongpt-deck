import { startSession } from './rec.mjs';

// Local demo copy (127.0.0.1:5218) backed by a throwaway SQLite copy. Fictional visitor only.
const OUT = process.argv[2] || 'out/cabinet-passport-flow.mp4';
const s = await startSession({ width: 1280, height: 720 });
const { page, click, type, pause } = s;

await page.goto('http://127.0.0.1:5218/', { waitUntil: 'networkidle' });
await s.record();
await pause(1500);
await click(page.getByRole('button', { name: 'Start' }).first(), { after: 900 });
await click(page.getByRole('button', { name: 'Start' }).first(), { after: 900 });

// Visit type
await click(page.getByRole('button', { name: /Walk-In/ }), { after: 600 });
await click(page.getByRole('button', { name: /^Next/ }), { after: 900 });

// Contact details
const inputs = page.locator('input.form-control');
const fill = async (i, text) => { await click(inputs.nth(i), { after: 120 }); await type(text, 60); await pause(250); };
await fill(0, 'Jordan');
await fill(1, 'Rivera');
await fill(2, '858-555-0142');
await fill(4, '1');
await click(page.locator('[role=button]').filter({ hasText: /^\s*Passport\s*$/ }), { after: 700 });
await click(page.getByRole('button', { name: /^Next/ }), { after: 1000 });

// Readiness checks
await click(page.getByRole('button', { name: /Yes/ }).first(), { after: 800 });
for (let i = 1; i <= 4; i++) {
  const yes = page.getByRole('button', { name: /Yes/ }).nth(i);
  if (await yes.count()) await click(yes, { after: 500 });
}
await pause(800);
await click(page.getByRole('button', { name: /Complete Check-In/ }), { after: 600 });
await page.getByText('Check-In Complete!').waitFor({ timeout: 10000 });
await pause(3500);

await s.finish(OUT);
