import { label, molarBody, molarDefs, MOLAR_VIEWBOX, nextId, toothRegion } from './molar';

const GEOMETRICA = 'M226 0 L238 222 Q240 228 246 228 L314 228 Q320 228 322 222 L330 132 L402 132 Q420 134 428 150 L560 150 L560 0 Z';
const PARAMETRICA = 'M0 150 L130 150 L152 128 C170 108 196 104 214 124 L246 170 Q280 204 314 170 L346 124 C364 104 390 108 408 128 L430 150 L560 150 L560 0 L0 0 Z';

/** Slide 11 e 12. Stessa inquadratura: forma che trattiene contro superficie calibrata sullo spessore. */
export function preparazioneFigure(kind: 'geometrica' | 'parametrica') {
  const id = nextId(`prep-${kind}`);
  const geo = kind === 'geometrica';
  const title = geo
    ? 'Sezione schematica di un onlay a preparazione geometrica: pareti divergenti, pavimento piatto, riduzione cuspidale piana.'
    : 'Sezione schematica di un overlay a preparazione parametrica: riduzione che segue l\'anatomia, superficie arrotondata, margini a 90 gradi, sottosquadro bloccato in composito.';
  const marks = geo
    ? `${label({ x: -180, y: 60, lines: ['pareti', 'divergenti'], from: [20, 84], to: [232, 120] })}
  ${label({ x: 476, y: 60, lines: ['riduzione', 'piana'], from: [400, 132], to: [470, 84] })}
  ${label({ x: 476, y: 300, lines: ['pavimento', 'piatto'], from: [300, 228], to: [470, 316] })}`
    : `<ellipse class="blockout" cx="300" cy="200" rx="24" ry="11"/>
  <g class="thick"><path d="M196 104 L196 146"/><path d="M364 104 L364 146"/><path d="M280 152 L280 196"/></g>
  ${label({ x: -180, y: 160, lines: ['butt joint'], from: [20, 152], to: [130, 150] })}
  ${label({ x: 476, y: 60, lines: ['spessore', 'costante'], from: [364, 112], to: [470, 84] })}
  ${label({ x: 476, y: 290, lines: ['sottosquadro', 'in composito'], from: [322, 206], to: [470, 306] })}`;
  return `<svg class="fig-molar" viewBox="${MOLAR_VIEWBOX}" role="img" aria-labelledby="${id}-t">
  <title id="${id}-t">${title}</title>
  <defs>${molarDefs(id)}</defs>
  ${molarBody(id)}
  ${toothRegion(id, geo ? GEOMETRICA : PARAMETRICA, 'resto on')}
  ${marks}
</svg>`;
}
