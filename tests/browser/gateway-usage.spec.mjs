import { test, expect } from '@playwright/test';

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 723, height: 409 }, { width: 818, height: 511 }]) {
  test(`refreshed Gateway chart has a readable plot and reachable source at ${viewport.width}×${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    for (const [audience, slug] of [['cabinet', 'cabinet-scale'], ['all', 'llm-api-usage-attribution']]) {
      await page.goto(`/?audience=${audience}#slide=${slug}`);
      const stage = page.locator(`[data-slide-slug="${slug}"]`);
      await expect(stage.getByText('527.0B', { exact: true })).toBeVisible();
      await expect(stage.getByText('157.0M', { exact: true })).toBeVisible();
      await expect(stage.getByText('90.6%', { exact: true })).toBeVisible();
      const chart = stage.locator('.slide-stacked-columns');
      await expect(chart.getByText('Sep 2026', { exact: true })).toBeVisible();
      await expect(chart.getByText(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep) 2026$/)).toHaveCount(9);
      await page.waitForTimeout(1800); // Let the column entry animation finish before measuring geometry.
      const labels = chart.getByText(/^\d+\.\dB$/);
      const boxes = await Promise.all((await labels.all()).map(label => label.boundingBox()));
      expect(boxes).toHaveLength(9);
      for (let i = 1; i < boxes.length; i++) {
        expect(boxes[i].x).toBeGreaterThanOrEqual(boxes[i - 1].x + boxes[i - 1].width - 1);
      }
      const value = await chart.getByText('71.7B', { exact: true }).boundingBox();
      const month = await chart.getByText('Sep 2026', { exact: true }).boundingBox();
      expect(month.y - value.y).toBeGreaterThan(120); // The chart must not collapse in a natural-height dashboard.
      const source = stage.locator('.presentation-claim-note');
      await source.scrollIntoViewIfNeeded();
      await expect(source).toBeInViewport();
      if (viewport.width < 768 || viewport.height <= 650) {
        const sourceBox = await source.boundingBox();
        const navBox = await page.getByRole('navigation', { name: 'Slide navigation' }).boundingBox();
        expect(sourceBox.y + sourceBox.height).toBeLessThanOrEqual(navBox.y);
      }
      expect(await stage.evaluate(el => el.scrollWidth - el.clientWidth)).toBeLessThanOrEqual(1);
    }
  });
}
