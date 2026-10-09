import { test, expect } from '@playwright/test';

test('Cabinet opens with six aligned website-style comparison rows and retains the animation', async ({ page }, testInfo) => {
  await page.goto('/?audience=cabinet#slide=cabinet-chat-and-harness');
  const comparison = page.locator('.cabinet-workflow-comparison');
  const controls = comparison.getByRole('navigation', { name: 'Comparison views' });
  await expect(controls.getByRole('button', { name: 'Comparison', exact: true })).toHaveAttribute('aria-pressed', 'true');
  const matrix = comparison.locator('.cabinet-workflow-adaptation:not([hidden])');
  await expect(matrix.getByRole('heading', { name: 'TritonGPT and TritonAI Harness', exact: true })).toBeVisible();
  await expect(matrix.getByRole('row')).toHaveCount(7);
  for (const label of ['Where it runs', 'System access', 'Data storage', 'Connected tools', 'Human oversight', 'Data classification']) {
    const row = matrix.getByRole('row').filter({ has: page.getByRole('rowheader', { name: label, exact: true }) });
    await expect(row.getByRole('cell')).toHaveCount(2);
    const cells = await row.getByRole('cell').all();
    const boxes = await Promise.all(cells.map(cell => cell.boundingBox()));
    expect(boxes[0].y).toBeCloseTo(boxes[1].y, 0);
    expect(boxes[0].height).toBeCloseTo(boxes[1].height, 0);
  }
  await expect(matrix.getByText('Automatic deletion after 90 days.', { exact: true })).toBeVisible();
  await expect(matrix.getByText(/Selected context goes to the model; tools exchange data/)).toBeVisible();
  await expect(matrix.getByText(/Full access can act without prompts/)).toBeVisible();
  await expect(matrix.getByText(/P4 prohibited/)).toHaveCount(2);
  await page.evaluate(() => document.fonts.ready);
  expect(await matrix.evaluate(el => el.scrollHeight <= el.clientHeight + 1)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('cabinet-comparison-row-by-row.png') });

  await controls.getByRole('button', { name: 'Use cases', exact: true }).click();
  const tasks = comparison.locator('.cabinet-workflow-adaptation:not([hidden])');
  await expect(tasks.getByRole('row')).toHaveCount(4);
  await expect(tasks.getByRole('article')).toHaveCount(0);
  for (const label of ['Best fit', 'Where you work', 'Typical result']) {
    await expect(tasks.getByRole('rowheader', { name: label, exact: true })).toBeVisible();
  }
  await expect(tasks.getByText('A saved workbook, briefing deck, checked website change, or workflow to review.', { exact: true })).toBeVisible();
  await expect(tasks.getByText(/P1–P3 only within approved services and setups; P4 prohibited/)).toBeVisible();
  await expect(tasks.getByRole('link', { name: 'Privacy policy', exact: true })).toHaveAttribute('href', 'https://tritonai.ucsd.edu/tritongpt/privacy.html');

  await controls.getByRole('button', { name: 'Website animation', exact: true }).click();
  await expect(comparison.locator('.cabinet-website-source').getByText('contract.docx', { exact: true })).toBeVisible();
  await expect(comparison.locator('.harness-anim-arc')).toHaveCSS('animation-duration', '16s');
});

test('Cabinet Harness screenshots cover all seven plugins in separate stages', async ({ page }, testInfo) => {
  await page.goto('/?audience=cabinet#slide=cabinet-harness-mobile-demo');
  const overview = page.locator('.cabinet-harness-overview');
  await expect(overview.getByRole('button', { name: 'Plugins', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(overview.getByRole('status', { name: 'Feature availability', exact: true })).toHaveText(/Available in stable 0\.3\.6/);
  await expect(overview.locator('.cabinet-harness-version')).toContainText('Capture build: Nightly 0.3.6-nightly.20261008.63');
  const image = overview.locator('img');
  await expect(image).toHaveAttribute('src', /plugins-microsoft-n8n-current-excerpt\.png$/);
  await expect(image).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('cabinet-harness-release-availability.png') });
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
  const tasksButton = controls.getByRole('button', { name: 'Use cases', exact: true });
  await tasksButton.focus();
  await page.keyboard.press('Enter');
  await expect(tasksButton).toHaveAttribute('aria-pressed', 'true');
  await controls.getByRole('button', { name: 'Comparison', exact: true }).click();
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
  await page.getByRole('button', { name: 'Website animation', exact: true }).click();
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
  await page.getByRole('button', { name: 'Website animation', exact: true }).click();
  await expect(page.locator('.harness-anim-arc')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('.harness-anim-chat-dot')).toHaveCSS('display', 'none');
  await expect(page.locator('.harness-model-ring')).toBeVisible();
});
