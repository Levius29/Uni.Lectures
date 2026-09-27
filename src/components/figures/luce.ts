import { nextId } from './molar';

const CASES = [
  { h: 34, op: 0.35, reach: 0.95, label: ['sottile', 'traslucido'] },
  { h: 84, op: 0.62, reach: 0.5, label: ['medio'] },
  { h: 150, op: 0.92, reach: 0.14, label: ['spesso', 'opaco'] },
];

/** Slide 38. La luce attraversa il manufatto e arriva al cemento sempre meno. */
export function luceFigure() {
  const id = nextId('luce');
  const panels = CASES.map((c, i) => {
    const x = i * 300;
    const top = 250 - c.h;
    return `<g class="lamp-case" style="--i:${i}" transform="translate(${x} 0)">
    <rect class="lamp" x="70" y="0" width="120" height="22" rx="4"/>
    <rect class="beam" x="80" y="22" width="100" height="${top - 22}" fill="url(#${id}-beam)"/>
    <rect class="resto on" x="40" y="${top}" width="180" height="${c.h}" style="fill-opacity:${c.op}"/>
    <rect class="beam-out" x="80" y="${top}" width="100" height="${c.h}" fill="url(#${id}-beam)" style="opacity:${(c.reach * 0.8).toFixed(2)}"/>
    <rect class="cement" x="40" y="250" width="180" height="8" style="--reach:${c.reach}"/>
    <rect class="dentin" x="40" y="258" width="180" height="62"/>
    <text class="cap" x="130" y="356" text-anchor="middle">${c.label.map((l, j) => `<tspan x="130" dy="${j ? '1.1em' : 0}">${l}</tspan>`).join('')}</text>
  </g>`;
  }).join('\n');
  return `<svg class="fig-luce" viewBox="0 0 860 420" role="img" aria-labelledby="${id}-t">
  <title id="${id}-t">Tre manufatti di spessore e traslucenza crescenti: la luce della lampada arriva al cemento abbondante, ridotta, quasi assente.</title>
  <defs><linearGradient id="${id}-beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3d78c4" stop-opacity="0.75"/><stop offset="1" stop-color="#3d78c4" stop-opacity="0.35"/></linearGradient></defs>
  ${panels}
</svg>`;
}
