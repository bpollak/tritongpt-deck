import { test, expect } from '@playwright/test';

test('Cabinet comparison separates task choices from access and review without changing the animation', async ({ page }) => {
  await page.goto('/?audience=cabinet#slide=cabinet-chat-and-harness');
  const comparison = page.locator('.cabinet-workflow-comparison');
  const controls = comparison.getByRole('navigation', { name: 'Comparison views' });
  await expect(controls.getByRole('button', { name: 'Website animation', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(comparison.locator('.cabinet-website-source .harness-anim-arc')).toBeVisible();

  await controls.getByRole('button', { name: 'Choose by task', exact: true }).click();
  const tasks = comparison.locator('.cabinet-workflow-adaptation:not([hidden])');
  await expect(tasks.getByRole('heading', { name: 'Choose the workspace for the task.', exact: true })).toBeVisible();
  await expect(tasks.getByRole('article')).toHaveCount(2);
  await expect(tasks.getByText('Best fit', { exact: true })).toHaveCount(2);
  await expect(tasks.getByText('Where you work', { exact: true })).toHaveCount(2);
  await expect(tasks.getByText('Typical result', { exact: true })).toHaveCount(2);
  await expect(tasks.getByText('Installed Mac/Windows workspace; a paired phone can direct the host.', { exact: true })).toBeVisible();
  await expect(tasks.getByText('A saved workbook, briefing deck, checked website change, or workflow to review.', { exact: true })).toBeVisible();

  await controls.getByRole('button', { name: 'Access & review', exact: true }).click();
  const details = comparison.locator('.cabinet-workflow-adaptation:not([hidden])');
  await expect(details.getByRole('row')).toHaveCount(5);
  for (const row of ['Files and actions', 'Connected systems', 'Where history lives', 'Review and approval']) {
    await expect(details.getByRole('rowheader', { name: row, exact: true })).toBeVisible();
  }
  await expect(details.getByText(/automatic deletion after 90 days/)).toBeVisible();
  await expect(details.getByText(/selected context goes to the model, and tools communicate with connected services/)).toBeVisible();
  await expect(details.getByText(/Full access can act without approval prompts/)).toBeVisible();
  await expect(details.getByText(/P1–P3 only within approved services and setups; P4 prohibited/)).toBeVisible();
  await expect(details.getByText(/Cabinet adaptation · Verified October 8, 2026/)).toBeVisible();
  await expect(details.getByRole('link', { name: 'Privacy policy', exact: true })).toHaveAttribute('href', 'https://tritonai.ucsd.edu/tritongpt/privacy.html');
  await page.evaluate(() => document.fonts.ready);
  expect(await details.evaluate(el => el.scrollHeight <= el.clientHeight + 1)).toBe(true);

  await controls.getByRole('button', { name: 'Website animation', exact: true }).click();
  await expect(comparison.locator('.cabinet-website-source').getByText('contract.docx', { exact: true })).toBeVisible();
  await expect(comparison.locator('.harness-anim-arc')).toHaveCSS('animation-duration', '16s');
});

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

test('Cabinet comparison controls and source footer remain reachable on a narrow screen', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/?audience=cabinet#slide=cabinet-chat-and-harness');
  const controls = page.getByRole('navigation', { name: 'Comparison views' });
  const tasksButton = controls.getByRole('button', { name: 'Choose by task', exact: true });
  await tasksButton.focus();
  await page.keyboard.press('Enter');
  await expect(tasksButton).toHaveAttribute('aria-pressed', 'true');
  await controls.getByRole('button', { name: 'Access & review', exact: true }).click();
  const details = page.locator('.cabinet-workflow-adaptation:not([hidden])');
  const policy = details.getByRole('link', { name: 'Privacy policy', exact: true });
  await policy.scrollIntoViewIfNeeded();
  await expect(policy).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  for (const button of await controls.getByRole('button').all()) {
    await expect(button).toBeInViewport();
  }
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
