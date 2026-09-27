import { nextId } from './molar';

/** Slide 27. Sinistra: bisello a lama di coltello. Destra: bevel ampio di transizione. */
export function biselloFigure() {
  const id = nextId('bisello');
  return `<svg class="fig-bisello" viewBox="0 0 900 340" role="img" aria-labelledby="${id}-t">
  <title id="${id}-t">A sinistra un margine a lama di coltello, sottile e fragile. A destra un bevel ampio, una superficie inclinata di 2-3 mm su smalto con restauro di spessore adeguato.</title>
  <g class="panel">
    <path class="dentin" d="M20 150 L400 150 L400 330 L20 330 Z"/>
    <path class="enamel" d="M20 110 L250 110 L300 104 L400 104 L400 150 L20 150 Z"/>
    <path class="resto on" d="M20 40 L240 40 L300 104 L250 110 L20 110 Z"/>
    <path class="outline" d="M20 40 L240 40 L300 104 M20 110 L250 110 L300 104 L400 104"/>
    <path class="crack" d="M262 76 L270 86 L264 92 M280 90 L286 98"/>
    <text class="cap" x="20" y="24">lama di coltello: un margine</text>
  </g>
  <g class="panel" transform="translate(480 0)">
    <path class="dentin" d="M20 150 L400 150 L400 330 L20 330 Z"/>
    <path class="enamel" d="M20 110 L140 110 L330 70 L400 64 L400 150 L20 150 Z"/>
    <path class="resto on" d="M20 40 L200 40 L330 58 L330 70 L140 110 L20 110 Z"/>
    <path class="outline" d="M20 40 L200 40 L330 58 L400 64 M20 110 L140 110 L330 70"/>
    <g class="dim"><path d="M140 128 L330 88"/><text x="250" y="190" text-anchor="middle">2-3 mm</text></g>
    <text class="cap" x="20" y="24">bevel di Ferraris: una superficie</text>
  </g>
</svg>`;
}
