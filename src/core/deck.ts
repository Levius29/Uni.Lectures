import Reveal from 'reveal.js';
import Notes from 'reveal.js/plugin/notes';
import 'reveal.js/reveal.css';
import '../styles/theme.css';
import '../styles/figures.css';
import '../styles/deck.css';
import type { Lesson } from './types';
import { animateSlide } from '../animations/entrance';
import { syncSteps } from '../animations/steps';
import { metaStrip } from '../components/chain';
import { loadSlots } from '../components/slot';

const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

export async function mountLesson(lesson: Lesson) {
  const root = document.querySelector<HTMLElement>('.reveal .slides')!;
  root.innerHTML = lesson.slides;
  document.title = `Lezione ${Number(lesson.id)} · ${lesson.title}`;
  const sections = [...root.querySelectorAll<HTMLElement>(':scope > section')];

  sections.forEach((s, i) => {
    const frame = s.querySelector<HTMLElement>('.frame');
    if (!frame) return;
    // Striscia in alto, identica in ogni slide: resta ferma durante il morph.
    frame.insertAdjacentHTML('afterbegin', metaStrip({ left: `Conservativa 4 · Lezione ${Number(lesson.id)}`, chain: lesson.chain, segment: s.dataset.seg }));
    // Morph fra slide consecutive (Reveal Auto-Animate): gli elementi con lo stesso data-id si trasformano.
    if (s.dataset.autoAnimate !== 'false') s.setAttribute('data-auto-animate', '');
    // Elementi data-carry: una copia fantasma, tagliata in alto, apre la slide successiva.
    const next = sections[i + 1]?.querySelector<HTMLElement>('.frame');
    const carried = [...s.querySelectorAll<HTMLElement>('[data-carry]')];
    if (next && carried.length) {
      const layer = document.createElement('div');
      layer.className = 'ghost-layer';
      layer.setAttribute('aria-hidden', 'true');
      carried.forEach((el, k) => {
        el.dataset.id ||= `carry-${i}-${k}`;
        const ghost = el.cloneNode(true) as HTMLElement;
        ghost.removeAttribute('data-carry');
        ghost.removeAttribute('data-animate');
        ghost.removeAttribute('aria-label');
        layer.append(ghost);
      });
      next.prepend(layer);
    }
  });

  // Contenuti da validare: badge in sviluppo o con ?revisione, mai nella build per l'aula.
  if (import.meta.env.DEV || new URLSearchParams(location.search).has('revisione')) {
    root.querySelectorAll<HTMLElement>('section[data-verify]').forEach(s => {
      s.querySelector('.frame')?.insertAdjacentHTML('beforeend', `<p class="verify-badge"><b>Da validare</b>${esc(s.dataset.verify!)}</p>`);
    });
  }
  loadSlots(root);

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canUseHash = (() => { try { history.replaceState(history.state, '', location.href); return true; } catch { return false; } })();
  const deck = new Reveal({
    hash: canUseHash, controls: true, progress: true, slideNumber: 'c/t',
    width: 1600, height: 900, margin: 0, center: false,
    transition: reducedMotion ? 'none' : 'fade', transitionSpeed: 'fast', backgroundTransition: reducedMotion ? 'none' : 'fade',
    autoAnimate: !reducedMotion, autoAnimateDuration: 0.8, autoAnimateEasing: 'cubic-bezier(0.22, 0.8, 0.2, 1)', autoAnimateUnmatched: false,
    // Stampa (?print-pdf): una pagina per slide, frammenti già mostrati.
    pdfSeparateFragments: false,
    plugins: [Notes],
  });
  const refresh = () => {
    syncSteps(deck.getCurrentSlide());
  };
  deck.on('slidechanged', (e: Event) => {
    const ev = e as Event & { indexh: number; previousSlide?: HTMLElement };
    const prev = ev.previousSlide ? [...root.children].indexOf(ev.previousSlide) : -1;
    refresh();
    animateSlide(deck.getCurrentSlide(), reducedMotion, ev.indexh > prev);
  });
  deck.on('fragmentshown', refresh);
  deck.on('fragmenthidden', refresh);
  await deck.initialize();
  if (import.meta.env.DEV) Object.assign(window, { deck });
  refresh();
  // In stampa ogni schema va nel suo stato finale, come i frammenti che lo accompagnano.
  // Reveal entra in stampa con ?print-pdf (stesso controllo che fa Reveal).
  if (/[?&]print-pdf/i.test(location.search)) root.querySelectorAll<HTMLElement>('[data-steps]').forEach(fig => {
    const steps = [...root.querySelectorAll<HTMLElement>(`[data-step-of="${fig.dataset.steps}"]`)].map(f => Number(f.dataset.step ?? 0));
    fig.dataset.step = String(Math.max(0, ...steps));
  });
  animateSlide(deck.getCurrentSlide(), reducedMotion);

  // Lottie opzionale: <canvas data-lottie="assets/lottie/file.lottie">. Caricato solo se serve.
  const canvases = [...root.querySelectorAll<HTMLCanvasElement>('canvas[data-lottie]')];
  if (canvases.length) {
    const { createLottie } = await import('../components/lottie');
    const players = canvases.map(canvas => ({ canvas, player: createLottie(canvas, canvas.dataset.lottie!) }));
    const syncPlayers = () => players.forEach(({ canvas, player }) => {
      if (!reducedMotion && deck.getCurrentSlide().contains(canvas)) player.play(); else player.pause();
    });
    players.forEach(({ player }) => player.addEventListener('load', syncPlayers));
    deck.on('slidechanged', syncPlayers);
    if (import.meta.hot) import.meta.hot.dispose(() => players.forEach(({ player }) => player.destroy()));
  }
  if (import.meta.hot) import.meta.hot.dispose(() => deck.destroy());
  return deck;
}
