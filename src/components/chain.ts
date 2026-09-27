import type { ChainLink } from '../core/types';

/** Catena narrativa fissa: evidenzia l'anello della slide corrente. */
export function createChain(links: ChainLink[]) {
  const el = document.createElement('nav');
  el.className = 'chain';
  el.setAttribute('aria-label', 'Catena della lezione');
  el.innerHTML = links.map(l => `<span data-segments="${l.segments.join(' ')}">${l.label}</span>`).join('<i aria-hidden="true">›</i>');
  document.body.append(el);
  return (segment: string | undefined) => {
    el.querySelectorAll<HTMLElement>('span').forEach(span => {
      const on = !!segment && span.dataset.segments!.split(' ').includes(segment);
      if (on) span.setAttribute('aria-current', 'step'); else span.removeAttribute('aria-current');
    });
    el.hidden = !segment || segment === 'cover';
  };
}
