/**
 * Navigazione in aula sopra <hyperframes-slideshow> (versione bloccata in package.json).
 *
 * Il componente salta da una tappa all'altra con un seek istantaneo. Qui:
 * - animateSeeks: il seek percorre la timeline fino alla tappa, avanti a velocità reale e indietro
 *   più veloce, così ingressi, morph, frammenti e uscite si vedono in entrambe le direzioni;
 * - patchNavigation: indietro torna di un frammento (e sulla slide precedente atterra all'ultimo),
 *   l'indirizzo segue la posizione (#/slide/frammento) e la ripristina al caricamento.
 * Usa membri interni del componente (controller, bindController): verificarli quando si aggiorna
 * @hyperframes/player.
 */

interface Position { sequenceId: string; slideIndex: number; fragmentIndex: number }
interface ResolvedSlide { start: number; end: number; fragments: number[] }
export interface Controller {
  position: Position;
  show: { slides: ResolvedSlide[] };
  prev(): void;
  syncTo(sequenceId: string, slideIndex: number, fragmentIndex: number): void;
  goToSlide(index: number): void;
  onChange(cb: () => void): () => void;
}
interface Player { seek(t: number): void; readonly currentTime: number; readonly iframeElement: HTMLIFrameElement }
export type PlayerEl = Player & HTMLElement;
export interface SlideshowEl extends HTMLElement {
  bindController?(c: Controller): void;
}

const FORWARD_SPEED = 1;
const BACKWARD_SPEED = 2.2;
/** Oltre questa distanza (s) il salto resta istantaneo: indice, deep link, salti lunghi. */
const MAX_TRAVEL = 6;
let instant = false;

/** Esegue fn con seek istantanei (ripristino della posizione). */
const jump = (fn: () => void) => { instant = true; try { fn(); } finally { instant = false; } };

export function animateSeeks(player: Player) {
  const seek = player.seek.bind(player);
  let raf = 0;
  player.seek = (t: number) => {
    cancelAnimationFrame(raf);
    const from = player.currentTime;
    const dt = t - from;
    if (instant || Math.abs(dt) < 1e-3 || Math.abs(dt) > MAX_TRAVEL || document.hidden) { seek(t); return; }
    const ms = (Math.abs(dt) / (dt > 0 ? FORWARD_SPEED : BACKWARD_SPEED)) * 1000;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      seek(p < 1 ? from + dt * p : t);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };
}

const readHash = () => {
  const m = location.hash.match(/^#\/(\d+)(?:\/(\d+))?$/);
  return m ? { slide: Number(m[1]), fragment: Number(m[2] ?? 0) } : null;
};

export function patchNavigation(show: SlideshowEl) {
  let resolve!: (c: Controller) => void;
  const ready = new Promise<Controller>(r => { resolve = r; });
  const bind = show.bindController!.bind(show);
  const canUseHash = (() => { try { history.replaceState(history.state, '', location.href); return true; } catch { return false; } })();
  const audience = new URLSearchParams(location.search).get('mode') === 'audience';

  show.bindController = (c: Controller) => {
    const prev = c.prev.bind(c);
    c.prev = () => {
      const p = c.position;
      const slides = c.show.slides;
      if (p.sequenceId !== 'main') return prev();
      if (p.fragmentIndex > 0) c.syncTo('main', p.slideIndex, p.fragmentIndex - 1);
      else if (p.slideIndex > 0) c.syncTo('main', p.slideIndex - 1, Math.max(0, slides[p.slideIndex - 1]!.fragments.length - 1));
      else prev();
    };
    bind(c);
    if (!audience) {
      const target = readHash();
      const slides = c.show.slides;
      if (target && target.slide < slides.length) {
        jump(() => c.syncTo('main', target.slide, Math.min(target.fragment, slides[target.slide]!.fragments.length - 1)));
      }
      // Senza deep link la prima tappa è raggiunta dal controller con animateSeeks: la copertina entra.
      if (canUseHash) c.onChange(() => {
        const p = c.position;
        if (p.sequenceId !== 'main') return;
        history.replaceState(history.state, '', `#/${p.slideIndex}${p.fragmentIndex > 0 ? `/${p.fragmentIndex}` : ''}`);
      });
    }
    resolve(c);
  };
  return { ready };
}
