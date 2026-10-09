import { startSession } from './rec.mjs';

const OUT = process.argv[2] || 'out/cabinet-class-planner-flow.mp4';
const s = await startSession({ storage: () => { try { localStorage.setItem('tritongpt-class-planner:theme', 'light'); } catch {} } });
const { page, click, type, pause, point } = s;

await page.goto('https://classplanner.apps.ucsd.edu/', { waitUntil: 'networkidle' });
await s.record();
await pause(1600);
await click(page.getByRole('link', { name: 'Open Class Planner' }).first(), { after: 300 });
await page.waitForURL(/workspace/);
await page.getByRole('radio', { name: 'Auto planning' }).waitFor();
await pause(900);
await click(page.getByRole('radio', { name: 'Auto planning' }));
await click(page.getByRole('button', { name: /Enter workspace/ }), { after: 900 });

// Preferences: ask for later starts
await click(page.getByRole('button', { name: /Later starts/ }), { after: 700 });
await click(page.getByRole('button', { name: /Save & find courses/ }), { after: 800 });

const search = page.getByPlaceholder('Course code or title');
for (const [q, code] of [['MATH 10A', 'MATH-010A'], ['CSE 8A', 'CSE-008A'], ['COGS 1', 'COGS-001']]) {
  await click(search, { after: 150 });
  await page.keyboard.press('Meta+A');
  await type(q, 85);
  const add = page.getByRole('button', { name: `Auto-plan ${code}` });
  await add.waitFor({ timeout: 15000 });
  await pause(700);
  await click(add, { after: 1100 });
}

await page.getByRole('button', { name: 'Next schedule' }).waitFor();
const condensed = page.getByRole('button', { name: 'Use condensed calendar view' });
if (await condensed.count()) await click(condensed, { after: 900 });
await point(page.getByRole('tab', { name: 'Calendar' }), { fy: 3.5 });
await pause(1800);

// Compare alternatives
for (let i = 0; i < 2; i++) {
  await click(page.getByRole('button', { name: 'Next schedule' }), { after: 600 });
  const c = page.getByRole('button', { name: 'Use condensed calendar view' });
  if (await c.count()) await click(c, { after: 1500 }); else await pause(1200);
}

// Details, then the walk between classes
await click(page.getByRole('tab', { name: 'Details' }), { after: 2600 });
await click(page.getByRole('tab', { name: /^Map/ }), { after: 1200 });
await page.waitForTimeout(1500);
await pause(3500);

await s.finish(OUT);
