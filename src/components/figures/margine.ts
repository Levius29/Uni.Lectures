import { label, nextId } from './molar';

/** Due denti in sezione mesio-distale (viewBox 800×520), contatto a x=400. */
const CROWN = 'M90 300 C80 230 84 140 118 100 C140 74 170 70 190 88 C205 100 215 112 230 112 C245 112 255 100 270 88 C292 70 330 74 352 100 C386 140 398 190 400 200 C398 236 386 272 372 300 C366 360 350 430 340 505 L120 505 C112 430 96 360 90 300 Z';
const LEVELS = [
  { y: 245, x: 391, n: 1 },
  { y: 292, x: 375, n: 2 },
  { y: 345, x: 366, n: 3 },
];

/**
 * Slide 20, 21, 23.
 * mode "livelli": tre posizioni verticali del margine (passi 1-3).
 * mode "contatto": banda del punto di contatto evidenziata.
 * mode "dme": margine rialzato in composito e distanza minima dalla cresta ossea.
 */
export function margineFigure(mode: 'livelli' | 'contatto' | 'dme') {
  const id = nextId(`margine-${mode}`);
  const titles = {
    livelli: 'Due denti posteriori in sezione con gengiva e cresta ossea: tre posizioni del margine sul dente di sinistra, sopragengivale, intrasulculare e profonda.',
    contatto: 'Due denti posteriori a contatto: la fascia del punto di contatto, dove il margine non va mai messo.',
    dme: 'Margine profondo rialzato con composito: fra il nuovo margine e la cresta ossea devono restare almeno 2 mm.',
  };
  const levels = mode === 'livelli'
    ? LEVELS.map(l => `<g class="level level-${l.n}"><path d="M${l.x - 34} ${l.y} L${l.x + 4} ${l.y}"/><circle cx="${l.x - 52}" cy="${l.y}" r="17"/><text x="${l.x - 52}" y="${l.y + 7}" text-anchor="middle">${l.n}</text></g>`).join('')
    : '';
  const contact = mode === 'contatto'
    ? `<rect class="contact-band" x="330" y="182" width="140" height="36"/>${label({ x: 400, y: 40, lines: ['punto di contatto'], anchor: 'middle', from: [400, 52], to: [400, 180] })}`
    : '';
  const dme = mode === 'dme'
    ? `<path class="dme" d="M366 345 L334 345 Q338 312 344 292 Q348 280 356 272 L388 266 Q380 290 373 306 Q368 326 366 345 Z"/>
  <g class="dim"><path d="M300 345 L300 382"/><path d="M288 345 L312 345"/><path d="M288 382 L312 382"/><text x="282" y="374" text-anchor="end">≥ 2 mm</text></g>
  ${label({ x: 400, y: 40, lines: ['margine rialzato in composito'], anchor: 'middle', from: [400, 52], to: [372, 262] })}`
    : '';
  return `<svg class="fig-margine" viewBox="0 0 800 520" role="img" aria-labelledby="${id}-t">
  <title id="${id}-t">${titles[mode]}</title>
  <defs><linearGradient id="${id}-fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0.8" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <mask id="${id}-m" maskUnits="userSpaceOnUse" x="0" y="0" width="800" height="520"><rect width="800" height="520" fill="url(#${id}-fade)"/></mask></defs>
  <g mask="url(#${id}-m)">
    <path class="bone" d="M0 392 L60 392 C80 392 96 388 104 384 L120 505 L0 505 Z M372 382 Q400 364 428 382 L460 505 L340 505 Z M800 392 L740 392 C720 392 704 388 696 384 L680 505 L800 505 Z"/>
    <path class="gingiva" d="M372 282 Q400 236 428 282 L432 382 Q400 364 368 382 Z M0 282 L88 282 L98 330 L104 384 C96 388 80 392 60 392 L0 392 Z M800 282 L712 282 L702 330 L696 384 C704 388 720 392 740 392 L800 392 Z"/>
    <g class="tooth"><path class="enamel" d="${CROWN}"/><path class="outline" d="${CROWN}"/></g>
    <g class="tooth" transform="translate(800 0) scale(-1 1)"><path class="enamel" d="${CROWN}"/><path class="outline" d="${CROWN}"/></g>
  </g>
  <path class="crest-line" d="M372 382 Q400 364 428 382"/>
  ${levels}${contact}${dme}
  <text class="side" x="400" y="515" text-anchor="middle">cresta ossea</text>
</svg>`;
}
