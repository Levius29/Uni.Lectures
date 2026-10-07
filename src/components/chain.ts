import type { ChainLink } from '../core/types';

/**
 * Striscia in alto di ogni slide: corso e lezione a sinistra, a destra solo l'anello della catena
 * narrativa che si sta presentando, più grande. Nei segmenti fuori catena (copertina, apertura, chiusura) resta vuota.
 */
export function metaStrip(o: { left: string; chain: ChainLink[]; segment?: string }) {
  const current = o.chain.find(l => o.segment && l.segments.includes(o.segment));
  const link = current ? `<span aria-current="step">${current.label}</span>` : '';
  return `<div class="meta" data-id="meta"><span>${o.left}</span><nav class="chain" aria-label="Catena della lezione">${link}</nav></div>`;
}
