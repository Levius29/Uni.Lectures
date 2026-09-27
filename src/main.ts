import Reveal from 'reveal.js';
import Notes from 'reveal.js/plugin/notes';
import 'reveal.js/reveal.css';
import './styles/theme.css';
import { createLottie } from './components/lottie';
import { slides } from './slides';
import { animateSlide } from './animations/entrance';

const root = document.querySelector<HTMLElement>('.slides')!;
root.innerHTML = slides;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const deck = new Reveal({ hash: true, controls: true, progress: true, slideNumber: 'c/t', width: 1600, height: 900, margin: 0.07, transition: reducedMotion ? 'none' : 'fade', plugins: [Notes] });
deck.on('slidechanged', () => animateSlide(deck.getCurrentSlide(), reducedMotion));
await deck.initialize();
animateSlide(deck.getCurrentSlide(), reducedMotion);

// Add a canvas with data-lottie="assets/lottie/file.lottie" to opt in.
const players = [...root.querySelectorAll<HTMLCanvasElement>('canvas[data-lottie]')].map(canvas => ({
  canvas, player: createLottie(canvas, canvas.dataset.lottie!),
}));
function syncPlayers() {
  for (const { canvas, player } of players) {
    if (!reducedMotion && deck.getCurrentSlide().contains(canvas)) player.play();
    else player.pause();
  }
}
players.forEach(({ player }) => player.addEventListener('load', syncPlayers));
deck.on('slidechanged', syncPlayers);
syncPlayers();
if (import.meta.hot) import.meta.hot.dispose(() => { players.forEach(({ player }) => player.destroy()); deck.destroy(); });
