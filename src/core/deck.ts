import Reveal from 'reveal.js';
import Notes from 'reveal.js/plugin/notes';
import 'reveal.js/reveal.css';
import '../styles/theme.css';
import '../styles/figures.css';
import type { Lesson } from './types';
import { animateSlide } from '../animations/entrance';
import { syncSteps } from '../animations/steps';
import { createChain } from '../components/chain';
import { loadSlots } from '../components/slot';

const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

export async function mountLesson(lesson: Lesson) {
  const root = document.querySelector<HTMLElement>('.reveal .slides')!;
  root.innerHTML = lesson.slides;
  document.title = `Lezione ${Number(lesson.id)} · ${lesson.title}`;

  // Contenuti da validare: badge in sviluppo o con ?revisione, mai nella build per l'aula.
  if (import.meta.env.DEV || new URLSearchParams(location.search).has('revisione')) {
    root.querySelectorAll<HTMLElement>('section[data-verify]').forEach(s => {
      s.querySelector('.frame')?.insertAdjacentHTML('beforeend', `<p class="verify-badge"><b>Da validare</b>${esc(s.dataset.verify!)}</p>`);
    });
  }
  loadSlots(root);

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const setChain = createChain(lesson.chain);
  const deck = new Reveal({
    hash: true, controls: true, progress: true, slideNumber: 'c/t',
    width: 1600, height: 900, margin: 0.07, center: false,
    transition: reducedMotion ? 'none' : 'fade', transitionSpeed: 'fast', backgroundTransition: 'none',
    plugins: [Notes],
  });
  const refresh = () => {
    const slide = deck.getCurrentSlide();
    setChain(slide?.dataset.seg);
    syncSteps(slide);
  };
  deck.on('slidechanged', () => { refresh(); animateSlide(deck.getCurrentSlide(), reducedMotion); });
  deck.on('fragmentshown', refresh);
  deck.on('fragmenthidden', refresh);
  await deck.initialize();
  if (import.meta.env.DEV) Object.assign(window, { deck });
  refresh();
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
