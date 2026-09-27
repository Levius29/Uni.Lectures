/**
 * Molare schematico in sezione (viewBox 560×520). Base comune per gli schemi della lezione 1.
 * Schema illustrativo: forme semplificate, non anatomia di riferimento. Da validare dal docente.
 */
export const OUTER = 'M120 330 C104 262 108 172 148 112 C166 84 198 76 220 100 C238 122 258 150 280 152 C302 150 322 122 340 100 C362 76 394 84 412 112 C452 172 456 262 440 330 C432 390 404 452 386 505 L174 505 C156 452 128 390 120 330 Z';
const DENTIN = 'M121 338 C124 270 128 186 164 126 C178 104 200 102 214 120 C232 144 256 172 280 174 C304 172 328 144 346 120 C360 102 382 104 396 126 C432 186 436 270 439 338 C431 392 404 452 386 505 L174 505 C156 452 129 392 121 338 Z';
const PULP = 'M228 312 C224 282 228 250 240 246 C252 244 260 264 280 266 C300 264 308 244 320 246 C332 250 336 282 332 312 C326 336 304 356 298 396 L292 505 L268 505 L262 396 C256 356 234 336 228 312 Z';

/** Inquadratura comune: margini laterali per le etichette. */
export const MOLAR_VIEWBOX = '-190 -50 940 570';

let uid = 0;
/** Prefisso unico per id di clipPath e mask quando lo stesso schema compare più volte. */
export const nextId = (name: string) => `${name}-${++uid}`;

export function molarDefs(id: string) {
  return `<clipPath id="${id}-tooth"><path d="${OUTER}"/></clipPath>
  <linearGradient id="${id}-fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0.78" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <mask id="${id}-root" maskUnits="userSpaceOnUse" x="0" y="0" width="560" height="520"><rect width="560" height="520" fill="url(#${id}-fade)"/></mask>`;
}

/** Dente intero: smalto, dentina, polpa. La radice sfuma per indicare che è tagliata. */
export function molarBody(id: string) {
  return `<g class="tooth" mask="url(#${id}-root)">
    <path class="enamel" d="${OUTER}"/>
    <path class="dentin" d="${DENTIN}"/>
    <path class="pulp" d="${PULP}"/>
    <path class="outline" d="${OUTER}"/>
  </g>`;
}

/** Area del dente dentro una forma di ritaglio (preparazione, restauro, cavità). */
export function toothRegion(id: string, clip: string, cls: string, extra = '') {
  return `<g clip-path="url(#${id}-tooth)" class="${cls}"${extra}><path d="${clip}"/></g>`;
}

/** Etichetta con linea guida. lines: una o due righe; x,y: prima riga; from/to: linea guida. */
export function label(o: { x: number; y: number; lines: string[]; anchor?: 'start' | 'end' | 'middle'; from?: [number, number]; to?: [number, number]; cls?: string }) {
  const lead = o.from && o.to ? `<path d="M${o.from[0]} ${o.from[1]} L${o.to[0]} ${o.to[1]}"/>` : '';
  const text = o.lines.map((l, i) => `<tspan x="${o.x}" dy="${i ? '1.1em' : 0}">${l}</tspan>`).join('');
  return `<g class="lbl${o.cls ? ` ${o.cls}` : ''}">${lead}<text x="${o.x}" y="${o.y}" text-anchor="${o.anchor ?? 'start'}">${text}</text></g>`;
}
