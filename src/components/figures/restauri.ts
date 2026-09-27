import { label, molarBody, molarDefs, MOLAR_VIEWBOX, nextId, toothRegion } from './molar';

/** Forme di ritaglio: la parte del dente sopra la linea diventa restauro. */
const TYPES = {
  overlay: 'M0 0 L560 0 L560 152 L424 152 L404 128 L378 118 L352 128 L326 160 L300 188 L280 192 L260 188 L234 160 L208 128 L182 118 L156 128 L136 152 L0 152 Z',
  veneerlay: 'M0 0 L560 0 L560 152 L424 152 L404 128 L378 118 L352 128 L326 160 L300 188 L280 192 L260 188 L234 160 L208 128 L182 118 L162 130 L152 152 L142 200 L138 250 L137 292 L0 292 Z',
  tabletop: 'M178 0 L382 0 L382 70 L366 98 L346 120 L324 148 L302 170 L280 172 L258 170 L236 148 L214 120 L194 98 L178 70 Z',
  corona: 'M0 0 L560 0 L560 318 L420 318 L422 260 L418 200 L408 152 L390 122 L364 108 L338 128 L310 166 L280 188 L250 166 L222 128 L196 108 L170 122 L152 152 L142 200 L138 260 L140 318 L0 318 Z',
} as const;
/** Punto della linea di finitura vestibolare (a sinistra) per ciascun tipo. */
const FINISH: Record<keyof typeof TYPES, [number, number]> = {
  overlay: [134, 152], veneerlay: [114, 292], tabletop: [182, 78], corona: [116, 318],
};

/** Slide 24. Passi 1-4: overlay, veneerlay, table-top, corona parziale sullo stesso molare. */
export function restauriFigure() {
  const id = nextId('restauri');
  const keys = Object.keys(TYPES) as (keyof typeof TYPES)[];
  return `<svg class="fig-molar" viewBox="${MOLAR_VIEWBOX}" role="img" aria-labelledby="${id}-t">
  <title id="${id}-t">Sezione schematica dello stesso molare con quattro restauri: overlay, veneerlay, table-top e corona parziale. Cambia solo dove cade la linea di finitura vestibolare.</title>
  <defs>${molarDefs(id)}</defs>
  ${molarBody(id)}
  ${keys.map((k, i) => toothRegion(id, TYPES[k], `resto type-${i + 1}`)).join('\n  ')}
  ${keys.map((k, i) => `<circle class="finish type-${i + 1}" cx="${FINISH[k][0]}" cy="${FINISH[k][1]}" r="9"/>`).join('\n  ')}
  ${label({ x: 96, y: 336, lines: ['vestibolare'], anchor: 'end', cls: 'side' })}
  ${label({ x: 464, y: 336, lines: ['linguale'], cls: 'side' })}
</svg>`;
}
