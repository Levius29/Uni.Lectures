/** Mattoni condivisi per scrivere le slide in HTML. */
const attr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

export interface SlideOpts {
  /** Segmento della lezione (es. "S3"): pilota la catena narrativa. "cover" la nasconde. */
  seg: string;
  /** Classe di impaginazione del telaio: l-cover, l-divider, l-statement o vuota. */
  layout?: string;
  /** Contenuto da validare dal docente: compare come badge solo in revisione. */
  verify?: string;
  /** Note relatore (tasto S). */
  notes: string;
}

export const slide = (o: SlideOpts, body: string) => `<section data-seg="${o.seg}"${o.verify ? ` data-verify="${attr(o.verify)}"` : ''}>
<div class="frame${o.layout ? ` ${o.layout}` : ''}">${body}</div>
<aside class="notes">${o.notes}</aside>
</section>`;

/** Note relatore: tempo, regia, frasi da dire, ponte al segmento successivo. */
export function notes(n: { time?: string; say?: string; regia?: string; ponte?: string; extra?: string[]; verify?: string }) {
  return [
    n.time && `<p><strong>Tempo:</strong> ${n.time}</p>`,
    n.regia && `<p><strong>Regia:</strong> ${n.regia}</p>`,
    n.say && `<p><strong>Da dire:</strong> ${n.say}</p>`,
    ...(n.extra ?? []).map(e => `<p>${e}</p>`),
    n.verify && `<p><strong>DA VALIDARE:</strong> ${n.verify}</p>`,
    n.ponte && `<p><strong>Ponte:</strong> ${n.ponte}</p>`,
  ].filter(Boolean).join('\n');
}

/** Frammento Reveal. Con step+of pilota anche lo stato di una figura (data-steps). */
export const frag = (html: string, o: { tag?: string; cls?: string; step?: number; of?: string } = {}) => {
  const tag = o.tag ?? 'div';
  const data = o.of ? ` data-step-of="${o.of}" data-step="${o.step}"` : '';
  return `<${tag} class="fragment${o.cls ? ` ${o.cls}` : ''}"${data}>${html}</${tag}>`;
};

/** Divisore di segmento con la catena narrativa in grande. */
export function divider(o: { seg: string; num: string; title: string; meta: string; chain: string[]; current: number; notes: string }) {
  const chain = o.chain.map((c, i) => `<span${i === o.current ? ' aria-current="step"' : ''}>${c}</span>`).join('<span aria-hidden="true">›</span>');
  return slide({ seg: o.seg, layout: 'l-divider', notes: o.notes }, `
  <p class="seg-num" data-animate>${o.num}</p>
  <h2 data-animate>${o.title}</h2>
  <p class="seg-meta" data-animate>${o.meta}</p>
  <p class="chain-big" data-animate>${chain}</p>`);
}
