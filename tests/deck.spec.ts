import { test, expect, type Page } from '@playwright/test';

const LESSON = '/lezioni/01/';

function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  return errors;
}

test('la home elenca le lezioni e apre la lezione 1', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Conservativa 4');
  await expect(page.locator('.lesson-list li')).toHaveCount(2);
  await page.locator('.lesson-list a').first().click();
  await expect(page).toHaveURL(/\/lezioni\/01\//);
  await expect(page.locator('.reveal.ready')).toBeVisible();
  expect(errors).toEqual([]);
});

test('la lezione si naviga da tastiera e ripristina il deep link', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto(LESSON);
  await expect(page.locator('.reveal.ready')).toBeVisible();
  await expect(page.locator('section.present h1')).toContainText('Il restauro indiretto');
  // Tema applicato dopo reveal.css anche nella build
  await expect(page.locator('.reveal .slides')).toHaveCSS('text-align', 'left');
  await expect(page.locator('.reveal-viewport')).toHaveCSS('background-color', 'rgb(14, 16, 19)');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('section.present h2')).toHaveText('Il caso');
  await expect(page).toHaveURL(/#\/1$/);
  await page.reload();
  await expect(page.locator('section.present h2')).toHaveText('Il caso');
  await expect(page.locator('section.present .chain [aria-current]')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('i frammenti guidano lo stato degli schemi e la catena segue il segmento', async ({ page }) => {
  await page.goto(`${LESSON}#/7`);
  await expect(page.locator('section.present h2')).toHaveText('Le soglie, e la cuspide-mensola');
  await expect(page.locator('section.present .chain [aria-current]')).toHaveText('Quando indiretto');
  const fig = page.locator('section.present [data-steps="mensola"]');
  await expect(fig).toHaveAttribute('data-step', '0');
  await page.keyboard.press('ArrowRight');
  await expect(fig).toHaveAttribute('data-step', '1');
  await page.keyboard.press('ArrowRight');
  await expect(fig).toHaveAttribute('data-step', '2');
  await page.keyboard.press('ArrowLeft');
  await expect(fig).toHaveAttribute('data-step', '1');
});

test('movimento ridotto: contenuto visibile senza animazioni', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(LESSON);
  await expect(page.locator('section.present h1')).toBeVisible();
  await expect(page.locator('section.present h1')).toHaveCSS('opacity', '1');
});

test('nessuna slide esce dalla tela 1600×900', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }); // niente morph in corso durante la misura
  await page.goto(LESSON);
  await expect(page.locator('.reveal.ready')).toBeVisible();
  const total = await page.locator('.reveal .slides > section').count();
  const overflowing: string[] = [];
  for (let i = 0; i < total; i++) {
    await page.evaluate(n => { location.hash = `#/${n}`; }, i);
    await page.waitForFunction(n => document.querySelectorAll('.reveal .slides > section')[n]?.classList.contains('present'), i);
    // Il telaio e ogni blocco flessibile (.body, .col) devono contenere i propri figli.
    const o = await page.locator('section.present .frame').evaluate(f => {
      const boxes = [f, ...f.querySelectorAll<HTMLElement>('.body, .col')];
      const h = Math.max(...boxes.map(b => b.scrollHeight - b.clientHeight));
      const w = Math.max(...boxes.map(b => b.scrollWidth - b.clientWidth));
      return { h, w, title: f.querySelector('h1,h2,blockquote')?.textContent?.slice(0, 40) ?? '' };
    });
    if (o.h > 1 || o.w > 1) overflowing.push(`#/${i} ${o.title} (+${o.h}px, +${o.w}px)`);
  }
  expect(overflowing).toEqual([]);
});

test('la stampa PDF ha una pagina per slide e gli schemi nello stato finale', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto(`${LESSON}?print-pdf`);
  await expect(page.locator('.reveal.ready')).toBeVisible();
  // In stampa Reveal avvolge ogni slide in una .pdf-page: una pagina per slide, niente pagine per frammento.
  const slides = await page.locator('.reveal .slides section[data-seg]').count();
  expect(slides).toBeGreaterThan(0);
  await expect(page.locator('.pdf-page')).toHaveCount(slides);
  await expect(page.locator('[data-steps="mensola"]')).toHaveAttribute('data-step', '2');
  await expect(page.locator('[data-steps="margine"]')).toHaveAttribute('data-step', '3');
  await expect(page.locator('[data-steps="restauri"]')).toHaveAttribute('data-step', '4');
  expect(errors).toEqual([]);
});
