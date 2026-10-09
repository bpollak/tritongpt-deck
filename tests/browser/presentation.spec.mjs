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

test('Cabinet keeps the PK opening and plays the revised demos without banners', async ({ page }) => {
  await page.goto('/?audience=cabinet', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(/#slide=ai-operating-review-title$/);
  await expect(page.getByRole('heading', { name: 'TritonAI Operating Review', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Next slide', exact: true }).click();
  await expect(page).toHaveURL(/#slide=cabinet-citizen-developer-story$/);
  for (const [slug, stem, seconds, width] of [
    ['cabinet-training-website-demo', 'cabinet-enablement-combined', 60.733, 2560],
    ['cabinet-personal-productivity-demo', 'cabinet-daily-briefing-debrief', 16.367, 1686],
    ['cabinet-inbox-priority-sorter', 'cabinet-inbox-priority-sorter', 11.9, 2564]
  ]) {
    await page.goto(`/?audience=cabinet#slide=${slug}`);
    const stage = page.locator(`[data-slide-slug="${slug}"]`);
    await expect(stage.getByRole('status', { name: 'Demo release status', exact: true })).toHaveCount(0);
    await expect(stage.getByRole('heading')).toHaveCount(0);
    const video = stage.locator('video.deck-video');
    await expect(video).toBeVisible();
    await expect(video).toHaveAttribute('src', `/media/cabinet/${stem}.mp4`);
    await expect.poll(() => video.evaluate(v => v.duration)).toBeCloseTo(seconds, 1);
    expect(await video.evaluate(v => v.videoWidth)).toBe(width);
    expect(await video.evaluate(v => v.videoHeight)).toBeGreaterThanOrEqual(1052);
  }
});

test('citizen developer sequence keeps utilization and Passport before cash receipts', async ({ page }) => {
  await page.goto('/?audience=cabinet#slide=cabinet-class-planner-demo');
  await page.getByRole('button', { name: 'Next slide', exact: true }).click();
  await expect(page).toHaveURL(/#slide=cabinet-class-planner-utilization$/);
  await page.getByRole('button', { name: 'Next slide', exact: true }).click();
  await expect(page).toHaveURL(/#slide=cabinet-passport-demo$/);
  const stage = page.locator('[data-slide-slug="cabinet-passport-demo"]');
  await expect(stage.getByRole('status', { name: 'Demo release status', exact: true })).toHaveCount(0);
  const video = stage.locator('video.deck-video');
  await expect(video).toHaveAttribute('src', '/media/cabinet/cabinet-passport-wide.mp4');
  await expect.poll(() => video.evaluate(v => v.videoWidth)).toBeGreaterThanOrEqual(2500);
  await page.getByRole('button', { name: 'Next slide', exact: true }).click();
  await expect(page).toHaveURL(/#slide=cabinet-department-builders$/);
  await page.getByRole('button', { name: 'Next slide', exact: true }).click();
  await expect(page).toHaveURL(/#slide=cabinet-cash-receipts-demo$/);
  await expect(page.getByRole('region', { name: 'Apply received cash faster' }).getByRole('heading', { level: 2 })).toHaveCount(6);
});

for (const width of [390, 767]) {
  test(`dense content is readable to its end at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    for (const [slug, lastText] of [
      ['cabinet-harness-08b-component-framework', 'For bigger jobs, planning, building, and verification can run as separate focused sub-agents.'],
      ['class-planner-student-schedule', 'A saved plan opens matching course pages in TSS. Students still confirm sections and complete booking there.'],
      ['llm-api-usage-attribution', 'Gateway-recorded input plus output tokens. Request records include successful and failed calls.']
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
