/**
 * Pagina di una lezione: monta la composizione HyperFrames (public/compositions/NN/, generata da
 * src/hyperframes/compose.ts) dentro <hyperframes-slideshow> + <hyperframes-player>.
 * Il componente fornisce navigazione, contatore, schermo intero e vista relatore con note (P).
 * Qui si aggiunge ciò che serve in aula: movimento fra le tappe, indietro di un frammento, deep link,
 * foto presenti in public/assets, badge dei contenuti da validare.
 */
import '@hyperframes/player';
import '@hyperframes/player/slideshow';
import './styles/tokens.css';
import './styles/lesson.css';
import available from 'virtual:local-assets';
import { siteUrl } from './core/site';
import { animateSeeks, patchNavigation, type PlayerEl, type SlideshowEl } from './hyperframes/navigation';

/**
 * Versione in un solo file (npm run standalone): la composizione arriva in linea, non da public/compositions.
 * Serve per aprire e commentare la lezione fuori dal sito, per esempio come pagina nel pannello di Claude.
 */
declare global {
  interface Window { __LESSON_STANDALONE__?: { id: string; composition: string; review: boolean } }
}
const standalone = window.__LESSON_STANDALONE__;

// Stampa PDF (?print-pdf): la composizione si apre da sola, una pagina per slide, tutto nello stato finale.
if (!standalone && /[?&]print-pdf/i.test(location.search)) {
  location.replace(siteUrl(`compositions/${document.body.dataset.lesson}/index.html?print-pdf`));
  await new Promise(() => {});
}

const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const id = standalone?.id ?? document.body.dataset.lesson ?? '';
const src = siteUrl(`compositions/${id}/index.html`);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
// Badge «Da validare» solo su richiesta: ?revisione nell'indirizzo.
const review = standalone?.review || new URLSearchParams(location.search).has('revisione');

async function loadComposition() {
  if (standalone) return standalone.composition;
  const res = await fetch(src);
  if (!res.ok) throw new Error(`Composizione della lezione ${id} assente: esegui npm run compose`);
  return res.text();
}
const compositionHtml = await loadComposition();
// L'isola JSON va duplicata nel componente: <hyperframes-slideshow> la legge dal proprio contenuto.
const composition = new DOMParser().parseFromString(compositionHtml, 'text/html');
const island = composition.querySelector('script[type="application/hyperframes-slideshow+json"]')!;
document.title = composition.title || document.title;

const show = document.createElement('hyperframes-slideshow') as SlideshowEl;
show.className = 'lesson';
show.tabIndex = 0;
show.setAttribute('aria-label', composition.title);
const player = document.createElement('hyperframes-player') as PlayerEl;
player.setAttribute('interactive', '');
if (standalone) player.setAttribute('srcdoc', standalone.composition);
else player.setAttribute('src', src);
const islandCopy = document.createElement('script');
islandCopy.type = island.getAttribute('type')!;
islandCopy.textContent = island.textContent;
show.append(player, islandCopy);

// Prima di collegarlo al documento: il componente costruisce il controller subito dopo.
const nav = patchNavigation(show);
if (!reducedMotion) animateSeeks(player);
document.body.append(show);
show.focus();

/** Collega i segnaposto ai file presenti in public/ (elenco generato da vite.config.ts). */
function loadSlots(doc: Document) {
  const present = new Set(available);
  doc.querySelectorAll<HTMLElement>('.slot[data-src]').forEach(fig => {
    if (!present.has(fig.dataset.src!)) return;
    const img = fig.querySelector('img')!;
    img.addEventListener('load', () => { img.hidden = false; fig.classList.add('loaded'); fig.querySelector<HTMLElement>('.slot-ph')!.hidden = true; }, { once: true });
    img.src = siteUrl(fig.dataset.src!);
  });
}

// Contenuti da validare: badge in sviluppo o con ?revisione, mai nella build per l'aula.
function addBadges(doc: Document) {
  doc.querySelectorAll<HTMLElement>('.scene[data-verify]').forEach(s => {
    if (s.querySelector('.verify-badge')) return;
    s.querySelector('.frame')?.insertAdjacentHTML('beforeend', `<p class="verify-badge"><b>Da validare</b>${esc(s.dataset.verify!)}</p>`);
  });
}

player.addEventListener('ready', () => {
  const doc = player.iframeElement.contentDocument;
  if (!doc) return;
  loadSlots(doc);
  if (review) addBadges(doc);
  document.documentElement.classList.add('lesson-ready');
});
const controller = await nav.ready;

/**
 * Salto a una slide: clic sul contatore in basso (casella, numero e Invio),
 * oppure numero digitato sulla tastiera seguito da Invio.
 */
const jump = document.createElement('form');
jump.className = 'jump';
jump.hidden = true;
jump.innerHTML = '<input type="text" inputmode="numeric" aria-label="Vai alla slide" placeholder="Vai alla slide: numero e Invio">';
const jumpInput = jump.querySelector('input')!;
document.body.append(jump);
const goTo = (n: number) => {
  const total = controller.show.slides.length;
  if (Number.isInteger(n) && n >= 1 && n <= total) controller.goToSlide(n - 1);
};
const closeJump = () => { jump.hidden = true; jumpInput.value = ''; show.focus(); };
jump.addEventListener('submit', e => { e.preventDefault(); goTo(Number(jumpInput.value.trim())); closeJump(); });
jumpInput.addEventListener('keydown', e => { if (e.key === 'Escape') closeJump(); });
jumpInput.addEventListener('blur', () => { if (!jump.hidden) closeJump(); });
show.addEventListener('click', e => {
  if (!e.composedPath().some(el => el instanceof Element && el.hasAttribute('data-hf-counter'))) return;
  jump.hidden = false;
  jumpInput.focus();
});
let typed = '';
window.addEventListener('keydown', e => {
  if (!jump.hidden || e.metaKey || e.ctrlKey || e.altKey) return;
  if (/^\d$/.test(e.key)) typed = (typed + e.key).slice(-3);
  else if (e.key === 'Enter' && typed) { goTo(Number(typed)); typed = ''; }
  else typed = '';
});
