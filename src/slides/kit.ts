/** Mattoni condivisi per scrivere le slide in HTML. */
const attr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

/** Campi sfumati disponibili (variabili in theme.css). */
export type Field = 'warm' | 'blue' | 'coral' | 'amber' | 'mint';

export interface SlideOpts {
  /** Segmento della lezione (es. "S3"): pilota la catena nella striscia in alto. "cover" per la copertina. */
  seg: string;
  /** Classe di impaginazione del telaio: l-cover, l-divider, l-statement o vuota. */
  layout?: string;
  /** Campo sfumato a tutto schermo come sfondo. */
  field?: Field;
  /** Righe decorative orizzontali (colore del segmento). */
  stripes?: string;
  /** Contenuto da validare dal docente: compare come badge solo in revisione. */
  verify?: string;
  /** Note relatore (tasto S). */
  notes: string;
}

export const FIELD_COLOR: Record<Field, string> = { warm: '#ff8f5e', blue: '#6f8dff', coral: '#ff7a59', amber: '#f2b64a', mint: '#6fd9c0' };

export const slide = (o: SlideOpts, body: string) => {
  const bg = o.field ? ` data-background-gradient="var(--field-${o.field})"` : '';
  const stripes = o.stripes ? `<div class="stripes" aria-hidden="true" style="--stripe:${o.stripes}"></div>` : '';
  return `<section data-seg="${o.seg}"${bg}${o.verify ? ` data-verify="${attr(o.verify)}"` : ''}>
<div class="frame${o.layout ? ` ${o.layout}` : ''}">${stripes}${body}</div>
<aside class="notes">${o.notes}</aside>
</section>`;
};

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

/**
 * Divisore di segmento: campo sfumato e titolo gigante ripetuto che esce dai bordi, sotto il titolo completo.
 * Il titolo prosegue, tagliato in alto, nella slide successiva (morph). Minuti e regia vanno nelle note, non in slide.
 */
export function divider(o: { seg: string; short: string; title: string; field: Field; notes: string }) {
  const rep = (n: number) => Array.from({ length: n }, () => o.short).join('&nbsp;- ');
  return slide({ seg: o.seg, layout: 'l-divider', field: o.field, notes: o.notes }, `
  <div class="marquee-wrap" aria-hidden="true"><p class="marquee" data-carry data-id="marquee-${o.seg}"><span class="main"><span class="pre">${o.short}&nbsp;-&nbsp;</span>${rep(4)}</span></p></div>
  <h2 data-animate>${o.title}</h2>`);
}
