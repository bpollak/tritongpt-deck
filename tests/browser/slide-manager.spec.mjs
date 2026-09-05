import { test, expect } from '@playwright/test';
import { slides } from '../../src/data/slideDeck.js';
import { readFile } from 'node:fs/promises';
import JSZip from 'jszip';

test('library, audience, search, and both export counts agree', async ({ page }) => {
  await page.goto('/manage', { waitUntil: 'domcontentloaded' });
  const rows = page.locator('.slide-library-row');
  await expect(rows).toHaveCount(slides.length);
  await expect(page.getByRole('button', { name: `Export PDF (${slides.length})`, exact: true })).toBeEnabled();
  await expect(page.getByRole('button', { name: `Download PowerPoint (${slides.length})`, exact: true })).toBeEnabled();
  await page.getByLabel('Presentation', { exact: true }).selectOption('all');
  const expectedDefaultCount = slides.filter((s) => s.audiences.includes('all')).length;
  await expect(rows).toHaveCount(expectedDefaultCount);
  await expect(page.getByRole('button', { name: `Export PDF (${expectedDefaultCount})`, exact: true })).toBeEnabled();
  await page.getByLabel('Search slides', { exact: true }).fill('~14K');
  await expect(rows).toHaveCount(1);
  await expect(rows).toHaveAttribute('data-slide-slug', 'class-planner-student-schedule');
  await expect(page.getByRole('button', { name: 'Export PDF (1)', exact: true })).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Download PowerPoint (1)', exact: true })).toBeEnabled();
  await expect(page.getByRole('link', { name: /Preview full default presentation/ })).toHaveAttribute('href', '/?audience=all');
  await page.getByLabel('Search slides', { exact: true }).fill('no-matching-slide-12345');
  await expect(rows).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Export PDF (0)', exact: true })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Download PowerPoint (0)', exact: true })).toBeDisabled();
});

test('rows expand with keyboard and thumbnail opens the exact audience slide', async ({ page }) => {
  await page.goto('/manage', { waitUntil: 'domcontentloaded' });
  await page.getByLabel('Search slides', { exact: true }).fill('class-planner-student-schedule');
  const row = page.locator('.slide-library-row');
  const summary = row.locator('.slide-library-row__summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(summary).toHaveAttribute('aria-expanded', 'true');
  await expect(row.getByText('Include this slide in these presentations:')).toBeVisible();
  const thumbnail = row.locator('.slide-library-thumbnail-link');
  await expect(thumbnail).toHaveAttribute('href', '/?audience=all#slide=class-planner-student-schedule');
  await expect(thumbnail.locator('img')).toBeVisible();
  await expect.poll(() => thumbnail.locator('img').evaluate((img) => img.complete && img.naturalWidth > 0)).toBeTruthy();
});

test('manager fits a phone viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/manage', { waitUntil: 'domcontentloaded' });
  await expect(page.getByLabel('Search slides', { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.getByLabel('Search slides', { exact: true }).fill('~14K');
  await expect(page.locator('.slide-library-row')).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('downloads contain only the searched slide, including slides outside the default presentation', async ({ page }) => {
  test.setTimeout(90000);
  await page.goto('/manage', { waitUntil: 'domcontentloaded' });
  await page.getByLabel('Search slides', { exact: true }).fill('lmu-title');
  await expect(page.locator('.slide-library-row')).toHaveCount(1);

  const pdfDownload = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export PDF (1)', exact: true }).click();
  const pdf = await readFile(await (await pdfDownload).path());
  expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
  expect(pdf.toString('latin1').match(/\/Type \/Page\b/g)).toHaveLength(1);

  const pptxDownload = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download PowerPoint (1)', exact: true }).click();
  const zip = await JSZip.loadAsync(await readFile(await (await pptxDownload).path()));
  const pages = Object.keys(zip.files).filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name));
  expect(pages).toHaveLength(1);
  const xml = await zip.file(pages[0]).async('string');
  expect(xml).toContain('The AI-Enabled University');
});
