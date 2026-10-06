/** Mattoni condivisi per scrivere le slide in HTML. Ogni slide diventa una scena HyperFrames. */
import type { Field, Slide } from '../core/types';

export type { Field };

export const FIELD_COLOR: Record<Field, string> = { warm: '#ff8f5e', blue: '#6f8dff', coral: '#ff7a59', amber: '#f2b64a', mint: '#6fd9c0' };

export const slide = (o: Omit<Slide, 'body'>, body: string): Slide => ({ ...o, body });

/** Note relatore in testo semplice: tempo, regia, frasi da dire, ponte al segmento successivo. */
export function notes(n: { time?: string; say?: string; regia?: string; ponte?: string; extra?: string[]; verify?: string }) {
  return [
    n.time && `Tempo: ${n.time}`,
    n.regia && `Regia: ${n.regia}`,
    n.say && `Da dire: ${n.say}`,
    ...(n.extra ?? []),
    n.verify && `DA VALIDARE: ${n.verify}`,
    n.ponte && `Ponte: ${n.ponte}`,
  ].filter(Boolean).join('\n\n');
}

/**
 * Frammento: compare al clic successivo (una tappa della timeline HyperFrames).
 * Con step+of pilota anche lo stato di una figura (data-steps).
 */
export const frag = (html: string, o: { tag?: string; cls?: string; step?: number; of?: string } = {}) => {
  const tag = o.tag ?? 'div';
  const data = o.of ? ` data-step-of="${o.of}" data-step="${o.step}"` : '';
  return `<${tag} class="fragment${o.cls ? ` ${o.cls}` : ''}"${data}>${html}</${tag}>`;
};

/**
 * Divisore di segmento: campo sfumato e titolo gigante ripetuto che esce dai bordi, sotto il titolo completo.
 * Il titolo prosegue, tagliato in alto, nella slide successiva (morph). Minuti e regia vanno nelle note, non in slide.
 */
export function divider(o: { seg: string; short: string; title: string; field: Field; notes: string }): Slide {
  const rep = (n: number) => Array.from({ length: n }, () => o.short).join('&nbsp;- ');
  return slide({ seg: o.seg, layout: 'l-divider', field: o.field, notes: o.notes }, `
  <div class="marquee-wrap" aria-hidden="true"><p class="marquee" data-carry data-id="marquee-${o.seg}"><span class="main"><span class="pre">${o.short}&nbsp;-&nbsp;</span>${rep(4)}</span></p></div>
  <h2 data-animate>${o.title}</h2>`);
}
