/** Barre orizzontali in HTML. Valori sempre presi dal documento della lezione; value può essere un intervallo [da, a]. */
export interface BarRow { label: string; value: number | [number, number]; text: string; tone?: 'ink' | 'accent' | 'soft' }

/**
 * mode "range": [da, a] è un intervallo di valori misurati (barra flottante).
 * mode "upto": [min, max] è una stima con incertezza (barra piena fino a min, banda chiara fino a max).
 */

export function bars(rows: BarRow[], o: { max: number; axis?: string; label?: string; mode?: 'range' | 'upto' }) {
  const body = rows.map((r, i) => {
    const [from, to] = Array.isArray(r.value) ? r.value : [0, r.value];
    const tone = r.tone && r.tone !== 'ink' ? ` ${r.tone}` : '';
    const pct = (n: number) => `${((n / o.max) * 100).toFixed(2)}%`;
    const fill = o.mode === 'upto' && Array.isArray(r.value)
      ? `<span class="fill${tone}" style="left:0;width:${pct(to)};--i:${i}"><span class="band" style="left:${((from / to) * 100).toFixed(2)}%"></span></span>`
      : `<span class="fill${tone}" style="left:${pct(from)};width:${pct(to - from)};--i:${i}"></span>`;
    return `<div class="bar-row"><span>${r.label}</span><span class="track">${fill}</span><span class="val">${r.text}</span></div>`;
  }).join('');
  return `<div class="bars" role="img" aria-label="${o.label ?? rows.map(r => `${r.label}: ${r.text}`).join('; ')}">${body}${o.axis ? `<p class="axis">${o.axis}</p>` : ''}</div>`;
}
