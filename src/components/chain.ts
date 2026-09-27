import type { ChainLink } from '../core/types';

/** Striscia in alto di ogni slide: corso e lezione a sinistra, catena narrativa a destra. */
export function metaStrip(o: { left: string; chain: ChainLink[]; segment?: string }) {
  const links = o.chain.map(l => `<span${o.segment && l.segments.includes(o.segment) ? ' aria-current="step"' : ''}>${l.label}</span>`).join('');
  return `<div class="meta" data-id="meta"><span>${o.left}</span><nav class="chain" aria-label="Catena della lezione">${links}</nav></div>`;
}
