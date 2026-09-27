import { test, expect } from '@playwright/test';
test('deck loads, navigates by keyboard and restores a deep link', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/');
  await expect(page.locator('.reveal.ready')).toBeVisible();
  await expect(page.locator('section.present h1')).toContainText('Intarsi');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('section.present h2')).toHaveText('Dal caso alla scelta.');
  await expect(page).toHaveURL(/#\/1$/);
  await page.reload();
  await expect(page.locator('section.present h2')).toHaveText('Dal caso alla scelta.');
  expect(errors).toEqual([]);
});
test('reduced motion keeps slide content visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('section.present h1')).toBeVisible();
  await expect(page.locator('section.present h1')).toHaveCSS('opacity', '1');
});
