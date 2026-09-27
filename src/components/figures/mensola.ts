import { label, molarBody, molarDefs, MOLAR_VIEWBOX, nextId, toothRegion } from './molar';

const CORE = 'M206 40 L354 40 L348 226 Q346 238 334 238 L226 238 Q214 238 212 226 Z';
const CUSP = 'M354 20 L560 20 L560 244 L354 244 Z';

/**
 * Slide 7. Passi: 0 dente integro con dentina interassiale evidenziata,
 * 1 dentina interassiale persa, 2 carico sulla cuspide libera che flette come una mensola.
 */
export function mensolaFigure() {
  const id = nextId('mensola');
  return `<svg class="fig-molar" viewBox="${MOLAR_VIEWBOX}" role="img" aria-labelledby="${id}-t">
  <title id="${id}-t">Sezione schematica di un molare: senza dentina interassiale la cuspide resta libera e flette sotto carico come una mensola.</title>
  <defs>${molarDefs(id)}</defs>
  ${molarBody(id)}
  ${toothRegion(id, CORE, 'core')}
  ${toothRegion(id, CORE, 'cavity')}
  ${toothRegion(id, CUSP, 'free-cusp')}
  <g class="load">
    <path d="M392 -30 L392 62" class="arrow-line"/>
    <path d="M380 48 L392 70 L404 48" class="arrow-head"/>
  </g>
  <path class="strain" d="M334 262 Q352 246 366 262"/>
  ${label({ x: -180, y: 60, lines: ['dentina', 'interassiale'], from: [30, 84], to: [250, 160], cls: 'lbl-core' })}
  ${label({ x: 476, y: 196, lines: ['mensola'], from: [446, 186], to: [470, 186], cls: 'lbl-free' })}
</svg>`;
}
