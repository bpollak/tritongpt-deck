import { test, expect } from '@playwright/test';

const path = '/?audience=tech-community#slide=techcom-governance';

for (const width of [1440, 390]) {
  test(`Harness inventory labels release availability and exposes every tab at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1, name: 'What’s in the TritonAI Harness', exact: true })).toBeVisible();
    const panel = page.getByRole('tabpanel');
    await expect(panel.locator('li')).toHaveCount(41);
    await expect(panel.locator('li').filter({ hasText: 'Guided getting-started tour' }).getByText('Nightly', { exact: true })).toBeVisible();
    await expect(panel.locator('li').filter({ hasText: 'Recurring scheduled tasks' }).getByText('Stable', { exact: true })).toBeVisible();
    if (width === 1440) {
      expect(await panel.evaluate(el => el.scrollHeight <= el.clientHeight + 1)).toBe(true);
    }

    await page.getByRole('tab', { name: 'Plugins 9', exact: true }).click();
    await expect(panel.locator('article')).toHaveCount(9);
    await expect(panel.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Tableau', exact: true }) }).getByText('Nightly', { exact: true })).toBeVisible();
    await expect(panel.getByRole('article').filter({ has: page.getByRole('heading', { name: 'UCSD Assistant', exact: true }) }).getByText('Stable only', { exact: true })).toBeVisible();

    await page.getByRole('tab', { name: 'Skills 31', exact: true }).click();
    await expect(panel.locator('li')).toHaveCount(31);
    await expect(panel.getByText('Optional public library; updates separately from the app.', { exact: true })).toBeVisible();
    const lastSkill = panel.getByText('Use and manage memory', { exact: true });
    await lastSkill.scrollIntoViewIfNeeded();
    await expect(lastSkill).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole('button', { name: 'Next slide', exact: true }).click();
    await expect(page).toHaveURL(/#slide=techcom-personal-productivity-list$/);
  });
}

test('Harness catalog tabs support arrow keys without navigating to a different slide', async ({ page }) => {
  await page.goto(path);
  await page.getByRole('tab', { name: 'Features 41', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Plugins 9', exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(page).toHaveURL(/#slide=techcom-governance$/);
  await page.keyboard.press('End');
  await expect(page.getByRole('tab', { name: 'Skills 31', exact: true })).toBeFocused();
  await expect(page.getByRole('tabpanel').locator('li')).toHaveCount(31);
  await page.keyboard.press('Home');
  await expect(page.getByRole('tab', { name: 'Features 41', exact: true })).toBeFocused();
  await expect(page.getByRole('tabpanel').locator('li')).toHaveCount(41);
});
