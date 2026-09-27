import available from 'virtual:local-assets';
import { siteUrl } from '../core/site';

const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

/**
 * Spazio per una foto clinica o una figura da articolo.
 * Il file (es. public/assets/clinical/01/F1.webp) resta fuori da Git: se manca, compare il segnaposto.
 */
export function slot(o: { src: string; code: string; caption: string; hint?: string; alt?: string }) {
  return `<figure class="slot" data-src="${esc(o.src)}">
  <div class="slot-box"><img alt="${esc(o.alt ?? o.caption)}" hidden decoding="async"><span class="slot-ph"><b>${esc(o.code)}</b>${esc(o.hint ?? 'da inserire')}</span></div>
  <figcaption>${o.caption}</figcaption>
</figure>`;
}

/** Collega i segnaposto ai file presenti in public/ (elenco generato da vite.config.ts). */
export function loadSlots(root: ParentNode) {
  const present = new Set(available);
  root.querySelectorAll<HTMLElement>('.slot[data-src]').forEach(fig => {
    if (!present.has(fig.dataset.src!)) return;
    const img = fig.querySelector('img')!;
    img.addEventListener('load', () => { img.hidden = false; fig.classList.add('loaded'); fig.querySelector<HTMLElement>('.slot-ph')!.hidden = true; }, { once: true });
    img.src = siteUrl(fig.dataset.src!);
  });
}
