const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

/**
 * Spazio per una foto clinica o una figura da articolo.
 * Il file (es. public/assets/clinical/01/F1.webp) resta fuori da Git: se manca, compare il segnaposto.
 * Il collegamento ai file presenti avviene nel browser (src/lesson.ts), non nella composizione.
 */
export function slot(o: { src: string; code: string; caption: string; hint?: string; alt?: string; id?: string }) {
  return `<figure class="slot" data-src="${esc(o.src)}"${o.id ? ` data-id="${esc(o.id)}"` : ''}>
  <div class="slot-box"><img alt="${esc(o.alt ?? o.caption)}" hidden decoding="async"><span class="slot-ph"><b>${esc(o.code)}</b>${esc(o.hint ?? 'da inserire')}</span></div>
  <figcaption>${o.caption}</figcaption>
</figure>`;
}
