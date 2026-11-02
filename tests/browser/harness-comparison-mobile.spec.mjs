import { test, expect } from '@playwright/test';

for (const width of [320, 390]) {
  test(`Harness diagram labels stay inside their panels at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/?audience=tech-community#slide=techcom-chat-and-harness');
    await expect(page.getByRole('heading', { level: 1, name: 'TritonGPT and the TritonAI Harness' })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const panels = page.locator('.cabinet-ha-panel');
    await expect(panels).toHaveCount(2);
    for (const panel of await panels.all()) {
      const overflow = await panel.evaluate(el => {
        const bounds = el.getBoundingClientRect();
        return [...el.querySelectorAll('.cabinet-ha-box,.cabinet-ha-out,.cabinet-ha-chips span')].filter(label => {
          const rect = label.getBoundingClientRect();
          return rect.left < bounds.left || rect.right > bounds.right;
        }).map(el => el.textContent);
      });
      expect(overflow).toEqual([]);
    }
    await page.getByText('ready to review', { exact: true }).scrollIntoViewIfNeeded();
    await expect(page.getByText('ready to review', { exact: true })).toBeInViewport();
    await page.getByRole('button', { name: 'Next slide', exact: true }).click();
    await expect(page).toHaveURL(/#slide=techcom-harness-at-work$/);
  });
}
