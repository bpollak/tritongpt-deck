import { test, expect } from '@playwright/test';

test('focused navigation buttons and slide links retain normal keyboard activation', async ({ page }) => {
  await page.goto('/?audience=all', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(/#slide=the-ai-enabled-university$/);
  await page.getByRole('button', { name: 'Next slide', exact: true }).click();
  await expect(page).toHaveURL(/#slide=ai-strategy-and-engagement$/);
  await page.getByRole('button', { name: 'Previous slide', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#slide=the-ai-enabled-university$/);
  await page.getByRole('button', { name: 'Next slide', exact: true }).focus();
  await page.keyboard.press('Space');
  await expect(page).toHaveURL(/#slide=ai-strategy-and-engagement$/);
  // A prior click or key activation may leave the navigation button focused.
  await page.keyboard.press('ArrowRight');
  await expect(page).toHaveURL(/#slide=uc-san-diego$/);
  await page.goBack();
  await expect(page).toHaveURL(/#slide=ai-strategy-and-engagement$/);
});

test('invalid and missing audience links preserve the requested slide without showing a deck', async ({ page }) => {
  for (const prefix of ['', '?audience=does-not-exist']) {
    await page.goto(`/${prefix}#slide=llm-api-usage-attribution`, { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(prefix ? 'This audience link is not recognized.' : 'Open your audience presentation link.');
    await expect(page.getByRole('navigation', { name: 'Slide navigation' })).toHaveCount(0);
    await expect(page).toHaveURL(/#slide=llm-api-usage-attribution$/);
  }
  await page.goto('/?audience=lmu#slide=lmu-title', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('navigation', { name: 'Slide navigation' })).toBeVisible();
  await expect(page).toHaveURL(/#slide=lmu-title$/);
});

test('retired audience stays empty', async ({ page }) => {
  await page.goto('/?audience=cabinet', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('No slides are available for this audience filter.')).toBeVisible();
  await expect(page.locator('[data-slide-slug]')).toHaveCount(0);
});

for (const width of [390, 767]) {
  test(`dense content is readable to its end at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    for (const [slug, lastText] of [
      ['cabinet-harness-08b-component-framework', 'For bigger jobs, planning, building, and verification can run as separate focused sub-agents.'],
      ['class-planner-student-schedule', 'A saved plan opens matching course pages in TSS. Students still confirm sections and complete booking there.'],
      ['llm-api-usage-attribution', 'Self-hosted models served 95.3% of recorded tokens across the measurement period.']
    ]) {
      await page.goto(`/?audience=all#slide=${slug}`, { waitUntil: 'domcontentloaded' });
      const stage = page.locator(`[data-slide-slug="${slug}"]`);
      await expect(stage).toBeVisible();
      await page.waitForTimeout(1600);
      const last = stage.getByText(lastText, { exact: true });
      await last.scrollIntoViewIfNeeded();
      const box = await last.boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width + 1);
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.y + box.height).toBeLessThanOrEqual(844);
      expect(await stage.evaluate((el) => el.scrollWidth - el.clientWidth)).toBeLessThanOrEqual(1);
      if (slug !== 'cabinet-harness-08b-component-framework') {
        const note = stage.locator('.presentation-claim-note');
        await note.scrollIntoViewIfNeeded();
        expect(await note.evaluate((el) => getComputedStyle(el).position)).toBe('relative');
      }
    }
  });
}
