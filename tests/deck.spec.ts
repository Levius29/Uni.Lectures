import { test, expect, type Page } from '@playwright/test';

const LESSON = '/lezioni/01/';

function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  return errors;
}

/** Documento della composizione HyperFrames dentro il player. */
const comp = (page: Page) => page.frameLocator('hyperframes-player iframe');

async function open(page: Page, url = LESSON) {
  await page.goto(url);
  await expect(page.locator('html.lesson-ready')).toHaveCount(1);
  // Controller pronto: la posizione compare nell'indirizzo o il contatore è disegnato.
  await expect(page.locator('hyperframes-slideshow')).toBeVisible();
}

/** Scena visibile (decisa dal runtime HyperFrames) e tempo del player. */
async function state(page: Page) {
  return page.evaluate(() => {
    const player = document.querySelector('hyperframes-player') as HTMLElement & { iframeElement: HTMLIFrameElement; currentTime: number };
    const doc = player.iframeElement.contentDocument!;
    const scene = [...doc.querySelectorAll<HTMLElement>('.scene')].find(s => getComputedStyle(s).visibility === 'visible');
    return {
      time: player.currentTime,
      scene: scene?.id ?? '',
      title: scene?.querySelector('.frame > header h2, .frame > h1, .frame > h2, .body h2, blockquote')?.textContent?.trim() ?? '',
      chain: scene?.querySelector('.chain [aria-current]')?.textContent ?? '',
      step: scene?.querySelector<HTMLElement>('[data-steps]')?.dataset.step ?? '',
    };
  });
}

/** Attende che la navigazione animata arrivi alla tappa. */
async function settle(page: Page) {
  let last = -1;
  await expect.poll(async () => {
    const t = (await state(page)).time;
    const still = t === last;
    last = t;
    return still;
  }, { intervals: [150] }).toBe(true);
}

test('la home elenca le lezioni e apre la lezione 1', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Conservativa 4');
  await expect(page.locator('.lesson-list li')).toHaveCount(2);
  await page.locator('.lesson-list a').first().click();
  await expect(page).toHaveURL(/\/lezioni\/01\//);
  await expect(page.locator('html.lesson-ready')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('la lezione è una composizione HyperFrames con isola slideshow e tela 1600×900', async ({ page }) => {
  await open(page);
  const root = comp(page).locator('#root');
  await expect(root).toHaveAttribute('data-composition-id', 'lezione-01');
  await expect(root).toHaveAttribute('data-width', '1600');
  await expect(root).toHaveAttribute('data-height', '900');
  const slides = await page.evaluate(() => JSON.parse(document.querySelector('hyperframes-slideshow script[type="application/hyperframes-slideshow+json"]')!.textContent!).slides.length);
  await expect(comp(page).locator('#root > .scene')).toHaveCount(slides);
  await expect(comp(page).locator('#s00 .bg')).toHaveCSS('opacity', '1');
});

test('si naviga da tastiera, avanti e indietro, e il deep link si ripristina', async ({ page }) => {
  const errors = trackErrors(page);
  await open(page);
  await settle(page);
  expect((await state(page)).scene).toBe('s00');
  await page.keyboard.press('ArrowRight');
  await settle(page);
  await expect(page).toHaveURL(/#\/1$/);
  expect((await state(page)).title).toBe('Il caso');
  expect((await state(page)).chain).toBe('');
  await page.keyboard.press('ArrowLeft');
  await settle(page);
  expect((await state(page)).scene).toBe('s00');
  await page.keyboard.press('ArrowRight');
  await settle(page);
  await page.reload();
  await expect(page.locator('html.lesson-ready')).toHaveCount(1);
  await settle(page);
  expect((await state(page)).title).toBe('Il caso');
  expect(errors).toEqual([]);
});

test('i frammenti guidano lo stato degli schemi; indietro torna di un frammento', async ({ page }) => {
  await open(page, `${LESSON}#/7`);
  await settle(page);
  let s = await state(page);
  expect(s.title).toBe('Le soglie, e la cuspide-mensola');
  expect(s.chain).toBe('Quando indiretto');
  expect(s.step).toBe('0');
  await page.keyboard.press('ArrowRight');
  await settle(page);
  expect((await state(page)).step).toBe('1');
  await expect(page).toHaveURL(/#\/7\/1$/);
  await page.keyboard.press('ArrowRight');
  await settle(page);
  expect((await state(page)).step).toBe('2');
  await page.keyboard.press('ArrowLeft');
  await settle(page);
  s = await state(page);
  expect(s.step).toBe('1');
  expect(s.title).toBe('Le soglie, e la cuspide-mensola');
});

test('movimento ridotto: contenuto visibile senza animazioni', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await open(page);
  const h1 = comp(page).locator('#s00 h1');
  await expect(h1).toBeVisible();
  await expect(h1).toHaveCSS('opacity', '1');
  await expect(comp(page).locator('#s00 .lead').first()).toHaveCSS('opacity', '1');
});

test('nessuna slide esce dalla tela 1600×900', async ({ page }) => {
  await open(page);
  // Ogni scena si misura all'ultima tappa, a ingresso e frammenti completati.
  const overflowing = await page.evaluate(() => {
    const frame = (document.querySelector('hyperframes-player') as HTMLElement & { iframeElement: HTMLIFrameElement }).iframeElement;
    const doc = frame.contentDocument!;
    const tl = (frame.contentWindow as unknown as { __timelines: Record<string, { seek(t: number): void }> }).__timelines['lezione-01']!;
    return [...doc.querySelectorAll<HTMLElement>('.scene')].flatMap(scene => {
      tl.seek(Number(scene.dataset.holds!.split(',').pop()));
      const f = scene.querySelector<HTMLElement>('.frame')!;
      const boxes = [f, ...f.querySelectorAll<HTMLElement>('.body, .col')];
      const h = Math.max(...boxes.map(b => b.scrollHeight - b.clientHeight));
      const w = Math.max(...boxes.map(b => b.scrollWidth - b.clientWidth));
      const title = f.querySelector('h1,h2,blockquote')?.textContent?.slice(0, 40) ?? '';
      return h > 1 || w > 1 ? [`${scene.id} ${title} (+${h}px, +${w}px)`] : [];
    });
  });
  expect(overflowing).toEqual([]);
});
