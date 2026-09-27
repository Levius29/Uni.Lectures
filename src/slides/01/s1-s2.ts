import { slide, notes, frag, FIELD_COLOR } from '../kit';
import { slot } from '../../components/slot';
import { mensolaFigure } from '../../components/figures/mensola';

const photo = (code: string, caption: string, id?: string) =>
  slot({ src: `assets/clinical/01/${code}.webp`, code, caption, id });

export const cover = slide({ seg: 'cover', layout: 'l-cover', field: 'warm', notes: notes({
  time: '90 minuti, 86 di contenuto. Quattro di margine.',
  extra: ['Da dire una volta, all\'inizio: le figure riprodotte vengono da articoli citati in slide e servono per uso didattico.'],
}) }, `
  <p class="lead" data-animate>Francesco Motta</p>
  <h1 data-carry data-id="lesson-title">Il restauro indiretto parziale</h1>
  <p class="lead" data-animate>Dalla decisione strutturale alla cementazione.</p>`);

export const s1 = [
  slide({ seg: 'S1', notes: notes({
    time: 'S1, min 0-5.',
    extra: ['Nient\'altro sul caso: bruxismo, igiene ed esigenze estetiche sono stati tolti. Non entrano in nessuna decisione della lezione e costano attenzione.'],
  }) }, `
  <header><h2 data-animate>Il caso</h2></header>
  <div class="body">
    <div class="col narrow">
      <p class="big-num" data-animate>3.6</p>
      <p data-animate>Donna, 34 anni. Vecchio restauro in composito MOD, incrinatura visibile sulla cuspide linguale, dolore occasionale masticando cibi duri.</p>
    </div>
    <div class="col center-v">
      <table class="tbl" data-animate>
        <tbody>
          <tr><th>Vitalità</th><td>Vitale, risposta nella norma</td></tr>
          <tr><th>Rx</th><td>Nessuna lesione periapicale. Margine distale circa 1 mm sotto la giunzione amelo-cementizia</td></tr>
          <tr><th>Creste marginali</th><td>Entrambe assenti, dopo rimozione del vecchio restauro</td></tr>
          <tr><th>Cuspide mesio-linguale</th><td class="num">≈ 1,2 mm smalto-dentina</td></tr>
          <tr><th>Cuspidi vestibolari</th><td class="num">2,5-3 mm</td></tr>
        </tbody>
      </table>
    </div>
  </div>`),

  slide({ seg: 'S1', notes: notes({ regia: 'Due fotografie: occlusale iniziale, e dopo rimozione del vecchio restauro con le creste marginali assenti. La Rx come inserto piccolo.' }) }, `
  <header><h2 data-animate>Il caso in immagini</h2></header>
  <div class="slots two-one" data-animate>
    ${photo('F1', '3.6, occlusale iniziale: vecchio MOD con incrinatura', 'case-F1')}
    ${photo('F3', 'Dopo la rimozione: creste marginali assenti')}
    ${photo('F2', 'Rx endorale: margine distale sottogengivale')}
  </div>`),

  slide({ seg: 'S1', notes: notes({
    regia: 'Annotare la distribuzione alla lavagna. Non commentare, non correggere. Solo: "Ce lo riprendiamo alla fine, e vediamo chi cambia idea."',
    extra: ['Nessun inlay fra le opzioni: il corso non tratta restauri intracoronali. Se qualcuno lo propone a voce, è un\'occasione: una cavità che si accontenta di un inlay quasi sempre si accontenta anche di un diretto.'],
    ponte: '"Oggi seguiamo una catena: quando serve l\'indiretto, come si prepara, con quale materiale, con quale cemento. Ogni risposta dipende dalla precedente."',
  }) }, `
  <div class="body">
    <div class="col narrow">${photo('F1', '3.6, occlusale iniziale', 'case-F1')}</div>
    <div class="col center-v">
      <h2 data-animate>Cosa fate su questo dente?</h2>
      <p class="lead muted" data-animate>Alzate la mano.</p>
      <p class="options" data-animate><span>Composito diretto</span><span>Onlay</span><span>Overlay</span><span>Veneerlay</span><span>Corona</span></p>
    </div>
  </div>`),
];

export const s2 = [
  slide({ seg: 'S2', notes: notes({
    time: 'S2, min 5-13. Segmento ridotto: Fichera qui è il criterio d\'ingresso, non il baricentro.',
    extra: ['Usciti dalla lezione e rimasti in dispensa: aree di transizione, otto configurazioni, 64 combinazioni, griglia delle nove unità, scarpatura e cappatura, algoritmo diagnostico.'],
  }) }, `
  <header><h2 data-animate>«Cavità grande, quindi indiretto» è falso</h2></header>
  <div class="body">
    <div class="col">
      <p class="lead" data-animate>La dimensione è un indizio, non un criterio. Il criterio è <strong>quale struttura</strong> è stata persa. E non valgono tutte uguale.</p>
      <div class="pair" data-animate>
        <div><p class="tag">Strutture centrali</p><p>Dentina interassiale, il nucleo che connette le pareti assiali.</p><p>Tetto della camera pulpare.</p></div>
        <div><p class="tag">Strutture periferiche</p><p>Cresta marginale.</p><p>Complesso smalto-dentina della cuspide integra.</p></div>
      </div>
    </div>
    <div class="col narrow" data-animate>
      ${slot({ src: 'assets/articoli/01/A1.webp', code: 'A1', hint: 'figura da articolo', caption: 'Modello strutturale. Fichera, Devoto, Re. <i>QDT</i> 2006, fig. 1-2' })}
    </div>
  </div>`),

  slide({ seg: 'S2', notes: notes({ regia: 'Una struttura per clic, dalla più importante.' }) }, `
  <header><h2 data-animate>La gerarchia</h2></header>
  <div class="body stack center-v">
    <ol class="steps big">
      ${frag('Dentina interassiale', { tag: 'li' })}
      ${frag('Cresta marginale', { tag: 'li' })}
      ${frag('Tetto della camera pulpare', { tag: 'li' })}
      ${frag('Complesso smalto-dentina della cuspide integra', { tag: 'li' })}
    </ol>
  </div>
  <p class="source">Fichera G, Devoto W, Re D. <i>QDT</i> 2006;29:55-67</p>`),

  slide({ seg: 'S2', notes: notes({
    say: '"Un devitalizzato con creste marginali integre sta strutturalmente meglio di un vitale con una MOD. Se avete in testa l\'equazione devitalizzato uguale fragile uguale corona, questo dato la rompe."',
    extra: ['In slide solo Reeh: il dato è controintuitivo e vogliono sapere da dove viene. Mondelli, Larson e Hood si dicono a voce.'],
  }) }, `
  <header><h2 data-animate>Due risultati controintuitivi</h2></header>
  <div class="body stack">
    <div class="pair" data-animate>
      <div><p class="tag">A</p><h3>La cresta marginale persa, da sola, non indebolisce in modo significativo</h3><p class="muted">Se la dentina interassiale resta integra. È la preparazione della sola dentina interassiale a indebolire.</p></div>
      <div><p class="tag">B</p><h3>Il tetto della camera conta meno della cresta marginale</h3><p class="muted">Reeh: perdere il tetto con entrambe le creste conservate indebolisce meno che perdere una o due creste in un dente vitale.</p></div>
    </div>
    ${frag('Un devitalizzato con le creste integre sta meglio di un vitale con una MOD.', { cls: 'callout' })}
  </div>`),

  slide({ seg: 'S2', verify: 'Soglie 1,5-2 mm e 2,5-3 mm: coerenti con la convenzione del resto del corso?', notes: notes({
    regia: 'Primo clic: sparisce la dentina interassiale. Secondo clic: carico sulla cuspide, che flette.',
    verify: 'Soglie di spessore smalto-dentina: verificare che coincidano con la convenzione usata altrove nel corso.',
  }) }, `
  <header><h2 data-animate>Le soglie, e la cuspide-mensola</h2></header>
  <div class="body">
    <div class="col">
      <table class="tbl" data-animate>
        <thead><tr><th>Condizione</th><th>Smalto-dentina minimo</th></tr></thead>
        <tbody>
          <tr><th>Dente vitale</th><td class="num">&gt; 1,5-2 mm</td></tr>
          <tr><th>Trattato endodonticamente</th><td class="num">&gt; 2,5-3 mm</td></tr>
        </tbody>
      </table>
      <p class="muted small" data-animate>Sotto soglia la parete è sostenuta dal solo smalto: il rinforzo del build-up non è affidabile.</p>
      ${frag('<p>Persa la cresta adiacente, la cuspide perde <strong>tutti</strong> i legami con la parete opposta.</p>', { of: 'mensola', step: 1 })}
      ${frag('<p class="callout">Si comporta da mensola anche se è spessa. Si copre, salvo spessore superiore a 2,5-3 mm.</p>', { of: 'mensola', step: 2 })}
    </div>
    <figure class="figure fig-col w-760" data-steps="mensola" data-animate>
      ${mensolaFigure()}
      <figcaption class="schema-tag">sezione vestibolo-linguale</figcaption>
    </figure>
  </div>`),

  slide({ seg: 'S2', layout: 'l-statement', stripes: FIELD_COLOR.blue, notes: notes({
    extra: ['Il corollario è il caso più frequente: molare devitalizzato, una cresta persa e l\'altra intatta, cuspidi ben sostenute. Copertura parziale.'],
    ponte: '"Sappiamo cosa coprire. Adesso la domanda vera: come si prepara? E qui non c\'è una risposta sola: ce ne sono due, e vengono da due modi diversi di pensare al restauro."',
  }) }, `
  <blockquote data-animate>La cresta marginale basta a decidere se <em>coprire</em> la cuspide adiacente.</blockquote>
  <p class="after" data-animate>Una cresta persa, l'altra intatta, cuspidi ben sostenute: <strong>copertura parziale</strong>. Si coprono le cuspidi adiacenti alla cresta perduta.</p>
  ${frag('<p class="after">Non «corona perché è devitalizzato». Non «overlay così stiamo tranquilli».</p>')}`),
];
