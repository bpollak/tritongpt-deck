import { test, expect } from '@playwright/test';

const path = '/?audience=tech-community#slide=techcom-governance';

for (const width of [1440, 390]) {
  test(`Harness highlights show features, plugins, and skills together at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1, name: 'Key Harness features', exact: true })).toBeVisible();
    await expect(page.getByRole('tab')).toHaveCount(0);
    const features = page.getByRole('region', { name: 'Key features', exact: true });
    const plugins = page.getByRole('region', { name: 'Connected plugins', exact: true });
    const skills = page.getByRole('region', { name: 'Reusable skills', exact: true });
    await expect(features.getByRole('listitem')).toHaveCount(6);
    await expect(plugins.getByRole('article')).toHaveCount(9);
    await expect(skills.getByRole('listitem')).toHaveCount(6);
    await expect(features.getByRole('heading', { name: 'Ideas', exact: true })).toBeVisible();
    await expect(features.getByText('Suggestions for using the Harness', { exact: true })).toBeVisible();
    await expect(features.locator('.hrc-component-icon')).toHaveCount(6);
    expect(await page.locator('.hrc-card svg').count()).toBeGreaterThanOrEqual(24);
    await expect(plugins.getByRole('article', { name: 'Tableau', exact: true }).getByText('Nightly', { exact: true })).toBeVisible();
    await expect(plugins.getByRole('article', { name: 'UCSD Assistant', exact: true }).getByText('Stable only', { exact: true })).toBeVisible();
    await expect(skills.getByRole('heading', { name: 'Record your own skill', exact: true })).toBeVisible();
    if (width === 1440) {
      await page.evaluate(() => document.fonts.ready);
      for (const locator of [features, plugins, skills]) {
        expect(await locator.evaluate(el => el.scrollHeight <= el.clientHeight + 1 && el.scrollWidth <= el.clientWidth + 1)).toBe(true);
        await expect(locator).toBeInViewport({ ratio: 1 });
      }
      await expect(page.locator('.hrc-footer')).toBeInViewport({ ratio: 1 });
    } else {
      await page.getByText('Prod/Dev connections', { exact: true }).scrollIntoViewIfNeeded();
      await expect(page.getByText('Prod/Dev connections', { exact: true })).toBeInViewport();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole('button', { name: 'Next slide', exact: true }).click();
    await expect(page).toHaveURL(/#slide=techcom-harness-at-work$/);
  });
}

test('static Harness overview preserves keyboard slide navigation', async ({ page }) => {
  await page.goto(path);
  await page.getByRole('button', { name: 'Next slide', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#slide=techcom-harness-at-work$/);
  await page.getByRole('button', { name: 'Previous slide', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#slide=techcom-governance$/);
});
