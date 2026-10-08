import { test, expect } from '@playwright/test';

test('Cabinet Harness screenshots cover all seven plugins in separate stages', async ({ page }) => {
  await page.goto('/?audience=cabinet#slide=cabinet-harness-mobile-demo');
  const overview = page.locator('.cabinet-harness-overview');
  await expect(overview.getByRole('button', { name: 'Plugins', exact: true })).toHaveAttribute('aria-pressed', 'true');
  const image = overview.locator('img');
  await expect(image).toHaveAttribute('src', /plugins-microsoft-n8n-current-excerpt\.png$/);
  await expect(image).toBeVisible();
  const stages = overview.getByRole('group', { name: 'Plugins screenshot stages', exact: true });
  for (const [label, filename] of [
    ['GitHub · Google Workspace · Kuali Build', 'plugins-campus-current-excerpt.png'],
    ['Microsoft 365 · n8n', 'plugins-microsoft-n8n-current-excerpt.png'],
    ['Lucid · Tableau', 'plugins-lucid-tableau-current-excerpt.png']
  ]) {
    await stages.getByRole('button', { name: label, exact: true }).click();
    await expect(image).toHaveAttribute('src', new RegExp(`${filename.replaceAll('.', '\\.')}\$`));
    await expect.poll(() => image.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
  }
  await overview.getByRole('button', { name: 'Skills', exact: true }).click();
  await expect(image).toHaveAttribute('src', /skills-accessibility-current-excerpt\.png$/);
  await expect(overview.getByRole('button', { name: 'Skills', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await overview.getByRole('button', { name: 'Branding', exact: true }).click();
  await expect(image).toHaveAttribute('src', /skills-branding-current-excerpt\.png$/);
  await overview.getByRole('button', { name: 'Functions', exact: true }).click();
  await expect(image).toHaveAttribute('src', /browser-access-current-excerpt\.png$/);
  await overview.getByRole('button', { name: 'Model & permissions', exact: true }).click();
  await expect(image).toHaveAttribute('src', /model-permissions-current-excerpt\.png$/);
  await expect(overview.getByText('Captured with GLM and Full access on fictional files.', { exact: true })).toBeVisible();
  await expect(overview.getByText(/Nightly 0\.3\.6-nightly\.20261008\.63/)).toBeVisible();
  await expect.poll(() => image.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
});

test('original website diagrams keep their animations and respect reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/?audience=cabinet#slide=cabinet-chat-and-harness');
  const source = page.locator('.cabinet-website-source');
  await expect(source.getByRole('heading', { name: 'The harness is everything around the model', exact: true })).toBeVisible();
  await expect(source.getByText('contract.docx', { exact: true })).toBeVisible();
  const arc = source.locator('.harness-anim-arc');
  await expect(arc).toHaveCSS('animation-duration', '16s');
  const before = await arc.evaluate(el => getComputedStyle(el).strokeDashoffset);
  await page.waitForTimeout(400);
  expect(await arc.evaluate(el => getComputedStyle(el).strokeDashoffset)).not.toBe(before);
  const fontReady = await page.evaluate(async () => {
    await document.fonts.ready;
    return document.fonts.check('16px CabinetSiteRoboto') && document.fonts.check('600 40px CabinetSiteTeko');
  });
  expect(fontReady).toBe(true);

  await page.goto('/?audience=cabinet#slide=cabinet-subagents');
  const flow = page.locator('.cabinet-website-source .harness-anim-dash').first();
  await expect(flow).toHaveCSS('animation-duration', '2.8s');
  const flowBefore = await flow.evaluate(el => getComputedStyle(el).strokeDashoffset);
  await page.waitForTimeout(400);
  expect(await flow.evaluate(el => getComputedStyle(el).strokeDashoffset)).not.toBe(flowBefore);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(flow).toHaveCSS('animation-name', 'none');
  await page.goto('/?audience=cabinet#slide=cabinet-chat-and-harness');
  await expect(page.locator('.harness-anim-arc')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('.harness-anim-chat-dot')).toHaveCSS('display', 'none');
  await expect(page.locator('.harness-model-ring')).toBeVisible();
});
