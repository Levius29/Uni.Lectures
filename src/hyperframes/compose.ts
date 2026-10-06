/**
 * Compilatore: da una lezione (src/slides/NN) a una composizione HyperFrames navigabile.
 * Ogni slide diventa una scena (data-composition-id) con tempi espliciti; l'isola JSON
 * application/hyperframes-slideshow+json dichiara ordine, note relatore e tappe (fragments).
 * Le animazioni sono costruite nel browser da src/hyperframes/timeline.js, con le costanti di TIMING.
 */
import type { Lesson, Slide } from '../core/types';
import { metaStrip } from '../components/chain';

export const CANVAS = { width: 1600, height: 900 };

/** Durate in secondi. Le stesse costanti calcolano qui le tappe e guidano timeline.js. */
export const TIMING = {
  delay: 0.12, enter: 0.6, stagger: 0.08, rise: 28,
  marquee: 1.1, morph: 0.8, bg: 0.5,
  bars: { delay: 0.25, duration: 0.9, stagger: 0.12 },
  beam: { delay: 0.2, duration: 0.7, stagger: 0.18 },
  beamOut: { delay: 0.7 },
  frag: 0.5, step: 0.7, exit: 0.4, minEnter: 0.9,
};

const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const count = (s: string, re: RegExp) => (s.match(re) ?? []).length;
const round = (n: number) => Math.round(n * 1000) / 1000;
const text = (html: string) => html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

/** Tempo necessario all'ingresso della slide, prima della prima tappa. */
export function enterTime(body: string) {
  const T = TIMING;
  const n = count(body, /\sdata-animate(?=[\s>=])/g);
  const fills = count(body, /class="fill[\s"]/g);
  const beams = count(body, /class="beam"/g);
  return Math.ceil(Math.max(
    T.minEnter, T.morph + 0.05,
    n ? T.delay + T.enter + T.stagger * (n - 1) : 0,
    body.includes('class="marquee"') ? T.marquee : 0,
    fills ? T.bars.delay + T.bars.duration + T.bars.stagger * (fills - 1) : 0,
    beams ? T.beamOut.delay + T.beam.duration + T.beam.stagger * (beams - 1) : 0,
  ) * 20) / 20;
}

export interface SceneTiming { id: string; start: number; duration: number; holds: number[] }

/** Tappe di ogni scena: ingresso completato, poi una per frammento; in coda l'uscita. */
export function sceneTimings(slides: Slide[]): SceneTiming[] {
  // Calcolo in centesimi interi: scene contigue senza sovrapposizioni da arrotondamento.
  const cs = (n: number) => Math.round(n * 100);
  let t = 0;
  return slides.map((s, i) => {
    const start = t;
    const frags = count(s.body, /class="fragment[\s"]/g);
    const holds = Array.from({ length: frags + 1 }, (_, k) => start + cs(enterTime(s.body)) + k * cs(TIMING.step));
    const end = holds[holds.length - 1]! + cs(TIMING.exit);
    t = end;
    // In virgola mobile 12.8 + 2.8 supera 15.6: in quel caso si accorcia di un millesimo.
    const duration = start / 100 + (end - start) / 100 > end / 100 ? round((end - start) / 100 - 0.001) : (end - start) / 100;
    return { id: `s${String(i).padStart(2, '0')}`, start: start / 100, duration, holds: holds.map(h => h / 100) };
  });
}

const label = (s: Slide, i: number) => {
  const m = s.body.match(/<(h1|h2|blockquote)[^>]*>([\s\S]*?)<\/\1>/);
  return m ? text(m[2]!) : `Slide ${i + 1}`;
};

export interface ComposeAssets {
  /** CSS in linea: @font-face locali, token, slide, schemi. */
  css: string;
  /** Sorgente di src/hyperframes/timeline.js. */
  timelineJs: string;
}

/** HTML completo della composizione, autonomo: script e font in vendor/, accanto al file. */
export function composeLesson(lesson: Lesson, assets: ComposeAssets) {
  const n = Number(lesson.id);
  const timings = sceneTimings(lesson.slides);
  const total = timings.length ? round(timings[timings.length - 1]!.start + timings[timings.length - 1]!.duration) : 0;
  const manifest = {
    slides: lesson.slides.map((s, i) => ({ sceneId: timings[i]!.id, notes: s.notes, fragments: timings[i]!.holds })),
  };
  const strip = (seg: string) => metaStrip({ left: `Conservativa 4 · Lezione ${n}`, chain: lesson.chain, segment: seg });
  const scenes = lesson.slides.map((s, i) => {
    const t = timings[i]!;
    const stripes = s.stripes ? `<div class="stripes" aria-hidden="true" style="--stripe:${s.stripes}"></div>` : '';
    // Le figure guidate dai frammenti partono dallo stato 0.
    const body = s.body.replace(/data-steps="([^"]+)"(?![^>]*\sdata-step=)/g, 'data-steps="$1" data-step="0"');
    return `<section id="${t.id}" class="scene clip" data-composition-id="${t.id}" data-start="${t.start}" data-duration="${t.duration}" data-track-index="0" data-label="${esc(label(s, i))}" data-width="${CANVAS.width}" data-height="${CANVAS.height}" data-holds="${t.holds.join(',')}" data-seg="${s.seg}"${s.field ? ` data-field="${s.field}"` : ''}${s.verify ? ` data-verify="${esc(s.verify)}"` : ''}>
${s.field ? `<div class="bg" style="background: var(--field-${s.field})"></div>\n` : ''}<div class="frame${s.layout ? ` ${s.layout}` : ''}">${strip(s.seg)}${stripes}${body}</div>
</section>`;
  }).join('\n');

  const html = `<!doctype html>
<!-- Generato da src/hyperframes/compose.ts (npm run compose). Non modificare: si rigenera da src/slides/${lesson.id}/. -->
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=${CANVAS.width}, height=${CANVAS.height}">
<title>Lezione ${n} · ${esc(lesson.title)}</title>
<script src="vendor/gsap.min.js"></script>
<script src="vendor/hyperframe.runtime.iife.js"></script>
<style>
${assets.css}
</style>
</head>
<body>
<script type="application/hyperframes-slideshow+json">
${JSON.stringify(manifest, null, 2).replace(/<\//g, '<\\/')}
</script>
<div id="root" class="deck" data-composition-id="lezione-${lesson.id}" data-start="0" data-duration="${total}" data-width="${CANVAS.width}" data-height="${CANVAS.height}" aria-label="Lezione ${n}">
${scenes}
</div>
<script>
${assets.timelineJs.trim()}
buildLessonTimeline(${JSON.stringify(TIMING)});
</script>
</body>
</html>
`;
  return { html, manifest, timings };
}
