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

const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const id = document.body.dataset.lesson ?? '';
const src = siteUrl(`compositions/${id}/index.html`);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const review = import.meta.env.DEV || new URLSearchParams(location.search).has('revisione');

// L'isola JSON va duplicata nel componente: <hyperframes-slideshow> la legge dal proprio contenuto.
const res = await fetch(src);
if (!res.ok) throw new Error(`Composizione della lezione ${id} assente: esegui npm run compose`);
const composition = new DOMParser().parseFromString(await res.text(), 'text/html');
const island = composition.querySelector('script[type="application/hyperframes-slideshow+json"]')!;
document.title = composition.title || document.title;

const show = document.createElement('hyperframes-slideshow') as SlideshowEl;
show.className = 'lesson';
show.tabIndex = 0;
show.setAttribute('aria-label', composition.title);
const player = document.createElement('hyperframes-player') as PlayerEl;
player.setAttribute('interactive', '');
player.setAttribute('src', src);
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
await nav.ready;
