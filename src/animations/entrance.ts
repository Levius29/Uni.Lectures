import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(CustomEase, DrawSVGPlugin, SplitText);
// Stesse curve dei token CSS --ease-out e --ease-in-out (theme.css).
CustomEase.create('ui-out', '0.23, 1, 0.32, 1');
CustomEase.create('ui-in-out', '0.77, 0, 0.175, 1');

let active: gsap.core.Timeline | undefined;
const isPrint = () => /[?&]print-pdf/i.test(location.search);

/** Elementi che hanno uno stato guidato dai frammenti: li governa il CSS, non l'ingresso. */
const STEP_CONTROLLED = '.core, .cavity, .free-cusp, .load, .strain, .lbl-core, .lbl-free, .level, .finish, [class*="type-"]';

/**
 * Blocchi che entrano voce per voce invece che tutti insieme: righe di tabella, voci di elenco.
 * I frammenti restano fuori: entrano al clic.
 */
function pieces(target: Element): Element[] {
  const children = target.matches('table')
    ? [...target.querySelectorAll(':scope > thead > tr, :scope > tbody > tr')]
    : target.matches('ul, ol') ? [...target.children] : [];
  const items = children.filter(c => !c.classList.contains('fragment'));
  return items.length > 1 ? items : [target];
}

/** Il blockquote delle affermazioni sale parola per parola, ognuna dalla sua maschera. */
function words(quote: HTMLElement) {
  if (!quote.dataset.split) {
    SplitText.create(quote, { type: 'words', mask: 'words', wordsClass: 'w' });
    quote.dataset.split = '1';
  }
  return quote.querySelectorAll('.w');
}

/** Numero grande che conta fino al valore scritto (virgola decimale italiana). */
function countUp(tl: gsap.core.Timeline, el: HTMLElement, at: number) {
  const node = [...el.childNodes].find(n => n.nodeType === Node.TEXT_NODE && /\d/.test(n.textContent ?? ''));
  if (!node) return;
  const text = node.textContent!.trim();
  const target = Number(text.replace(',', '.'));
  if (!Number.isFinite(target)) return;
  const decimals = text.includes(',') ? text.split(',')[1].length : 0;
  const state = { v: 0 };
  tl.to(state, {
    v: target, duration: 1.1, ease: 'ui-out',
    onUpdate: () => { node.textContent = state.v.toFixed(decimals).replace('.', ','); },
    onComplete: () => { node.textContent = text; },
  }, at);
}

/**
 * Schema SVG che si costruisce: contorni disegnati, tessuti, restauro, poi le etichette.
 * Saltato se lo schema arriva per morph dalla slide precedente (è già sullo schermo).
 */
function buildFigure(tl: gsap.core.Timeline, svg: SVGSVGElement, at: number) {
  const q = (sel: string) => [...svg.querySelectorAll<SVGElement>(sel)].filter(el => !el.closest(STEP_CONTROLLED));
  const outlines = q('path.outline, .crest-line');
  const tissues = q('.enamel, .dentin, .pulp, .gingiva, .bone');
  const parts = q('.resto.on, .blockout, .thick, .dme, .contact-band, .crack');
  const leaders = q('.lbl path, .dim path');
  const texts = q('.lbl text, .dim text, text.side, text.cap');
  // Durante la costruzione le transizioni CSS degli stati non devono rincorrere i valori di GSAP.
  svg.classList.add('building');
  tl.call(() => svg.classList.remove('building'), [], at + 1.6);
  if (outlines.length) tl.fromTo(outlines, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1, ease: 'ui-in-out', stagger: 0.12, clearProps: 'strokeDasharray,strokeDashoffset' }, at);
  if (tissues.length) tl.fromTo(tissues, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: 'ui-out', stagger: 0.08, clearProps: 'opacity' }, at + 0.25);
  if (parts.length) tl.fromTo(parts, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'ui-out', stagger: 0.08, clearProps: 'opacity,transform' }, at + 0.7);
  if (leaders.length) tl.fromTo(leaders, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, ease: 'ui-out', stagger: 0.06, clearProps: 'strokeDasharray,strokeDashoffset' }, at + 0.9);
  if (texts.length) tl.fromTo(texts, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'ui-out', stagger: 0.06, clearProps: 'opacity' }, at + 1.05);
}

/**
 * Ingresso della slide.
 * - Titoli e blocchi [data-animate] salgono in sequenza; tabelle ed elenchi entrano riga per riga.
 * - Le affermazioni salgono parola per parola. I numeri grandi contano fino al valore.
 * - Gli schemi si costruiscono: contorno, tessuti, restauro, etichette.
 * - La parola gigante dei divisori entra da destra, solo andando avanti (all'indietro c'è il morph).
 * Con movimento ridotto o in stampa: nessuna animazione, stato finale subito.
 */
export function animateSlide(slide: HTMLElement, reducedMotion: boolean, forward = true, previous?: Element | null) {
  active?.progress(1).kill();
  document.querySelectorAll('.figure svg.building').forEach(svg => svg.classList.remove('building'));
  if (reducedMotion || isPrint()) return;
  const tl = gsap.timeline({ defaults: { ease: 'ui-out' } });
  active = tl;

  const marquees = slide.querySelectorAll('.l-divider .marquee .main');
  if (forward && marquees.length) tl.fromTo(marquees, { x: 220, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1, clearProps: 'opacity,transform' }, 0);

  const quotes = [...slide.querySelectorAll<HTMLElement>('.l-statement blockquote[data-animate]')];
  const blocks = [...slide.querySelectorAll<HTMLElement>('[data-animate]')].filter(el => !quotes.includes(el));
  const rising = blocks.flatMap(pieces);
  const flat = rising.filter(el => el.matches('figure') && el.querySelector('svg'));
  const moving = rising.filter(el => !flat.includes(el));
  if (moving.length) tl.fromTo(moving, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, clearProps: 'opacity,transform' }, 0.12);
  if (flat.length) tl.fromTo(flat, { opacity: 0 }, { opacity: 1, duration: 0.4, clearProps: 'opacity' }, 0.12);

  quotes.forEach((quote, i) => {
    tl.fromTo(words(quote), { yPercent: 100 }, { yPercent: 0, duration: 0.8, stagger: 0.035, clearProps: 'transform' }, 0.1 + i * 0.2);
  });

  slide.querySelectorAll<HTMLElement>('.big-num').forEach(el => countUp(tl, el, 0.3));

  // La luce (slide dei cementi) ha già il suo movimento: fasci che scendono all'ingresso.
  slide.querySelectorAll<SVGSVGElement>('.figure svg:not(.fig-luce)').forEach(svg => {
    const id = svg.closest<HTMLElement>('[data-id]')?.dataset.id;
    if (id && previous?.querySelector(`[data-id="${id}"]`)) return;
    buildFigure(tl, svg, 0.25);
  });
}
