import { slide, notes, frag, divider, FIELD_COLOR } from '../kit';
import { slot } from '../../components/slot';
import { bars } from '../../components/bars';
import { preparazioneFigure } from '../../components/figures/preparazioni';
import { margineFigure } from '../../components/figures/margine';
import { restauriFigure } from '../../components/figures/restauri';
import { biselloFigure } from '../../components/figures/bisello';

const photo = (code: string, caption: string) => slot({ src: `assets/clinical/01/${code}.webp`, code, caption });

export const s3 = [
  divider({ seg: 'S3', num: '03', short: 'Due scuole', title: 'Due scuole di preparazione', meta: 'min 13-29, il cuore della lezione', field: 'coral', notes: notes({ time: 'S3, min 13-29, 8 slide.' }) }),

  slide({ seg: 'S3', verify: 'La contrapposizione fra le due scuole è una costruzione didattica del corso: dichiararla.', notes: notes({
    say: '"Il modello che vi ho dato è mio; gli autori sono loro. Così potete non essere d\'accordo con me e restare d\'accordo con loro."',
    verify: 'Bottacchiari e Politano sono usati come esemplari di due filosofie. Nessuno dei due descrive il proprio lavoro in opposizione all\'altro.',
  }) }, `
  <header><h2 data-animate>La domanda che le separa</h2></header>
  <div class="body stack">
    <div class="pair" data-animate>
      <div><p class="tag">Scuola geometrica</p><h3>«Che forma deve avere la cavità perché il manufatto stia e il tecnico lavori?»</h3></div>
      <div><p class="tag">Scuola parametrica</p><h3>«Quanto spessore serve a questo materiale, e dove?»</h3></div>
    </div>
    ${frag('Non è vecchio contro nuovo. È <strong>cosa tiene il restauro in bocca</strong>.', { cls: 'callout' })}
  </div>`),

  slide({ seg: 'S3', notes: notes({
    say: 'Bottacchiari è la scuola degli intarsi in composito, e il testo di riferimento è del 2024. Non è "la vecchia scuola" per data: è un approccio geometrico maturo. Lo citiamo per la geometria cavitaria, non per il materiale.',
  }) }, `
  <header><h2 data-animate>La preparazione geometrica</h2></header>
  <div class="body">
    <div class="col">
      <ul class="list" data-animate>
        <li>Pareti divergenti, box prossimali, pavimento definito</li>
        <li>Angoli e spessori codificati</li>
        <li>Una sola via di inserzione</li>
      </ul>
      <p class="callout" data-animate>Il manufatto è stabile <strong>prima</strong> di essere incollato. La geometria contribuisce alla ritenzione, l'adesione la completa.</p>
      <p class="source" data-animate>Bottacchiari S. <i>Intarsi in composito.</i> Quintessenza, 2024</p>
    </div>
    <figure class="figure fig-col w-760" data-id="fig-prep">${preparazioneFigure('geometrica')}<figcaption class="schema-tag">onlay con copertura di una cuspide</figcaption></figure>
  </div>`),

  slide({ seg: 'S3', verify: 'Parametri numerici della preparazione non ritentiva: verificare riduzioni e spessori sull\'articolo originale.', notes: notes({
    verify: 'Full text di Politano non consultato direttamente: il concetto viene da fonti secondarie affidabili. Verificare riduzioni e spessori sull\'originale.',
  }) }, `
  <header><h2 data-animate>La preparazione parametrica</h2></header>
  <div class="body">
    <div class="col">
      <ul class="list tight" data-animate>
        <li>Superficie interna liscia e aperta, angoli arrotondati</li>
        <li>Nessun elemento ritentivo: niente box, pareti, spigoli</li>
        <li>Margini butt-joint, smalto periferico preservato</li>
        <li>I sottosquadri non si fresano: <strong>si bloccano in composito</strong></li>
        <li>IDS obbligatorio</li>
      </ul>
      <p class="callout" data-animate>L'adesione fa il lavoro che prima faceva la forma.</p>
      <p class="source" data-animate>Politano G, Van Meerbeek B, Peumans M. <i>J Adhes Dent</i> 2018;20(6):495-510</p>
    </div>
    <figure class="figure fig-col w-760" data-id="fig-prep">${preparazioneFigure('parametrica')}<figcaption class="schema-tag">overlay non ritentivo, stessa inquadratura</figcaption></figure>
  </div>`),

  slide({ seg: 'S3', notes: notes({ regia: 'L\'ultima riga arriva con un clic: è la lezione.' }) }, `
  <header><h2 data-animate>Il confronto</h2></header>
  <table class="tbl" data-animate>
    <thead><tr><th></th><th>Geometrica</th><th>Parametrica</th></tr></thead>
    <tbody>
      <tr><th>Cosa tiene il restauro</th><td>Geometria <strong>e</strong> adesione</td><td>Adesione</td></tr>
      <tr><th>Cosa guida la fresa</th><td>La forma da ottenere</td><td>Lo spessore minimo del materiale</td></tr>
      <tr><th>Sottosquadri</th><td>Si eliminano fresando</td><td>Si bloccano in composito</td></tr>
      <tr><th>Superficie interna</th><td>Pareti, box, angoli definiti</td><td>Liscia, aperta, arrotondata</td></tr>
      <tr><th>Margini</th><td>Chamfer, box prossimali</td><td>Butt-joint, smalto preservato</td></tr>
      <tr><th>Costo biologico</th><td>Maggiore</td><td>Minore</td></tr>
      <tr class="fragment key"><th>Cosa perdona</th><td>Un errore di adesione</td><td>Un errore di spessore</td></tr>
    </tbody>
  </table>`),

  slide({ seg: 'S3', layout: 'l-statement', stripes: FIELD_COLOR.coral, notes: notes({ extra: ['Uno studente che esce avendo capito questo ha capito la lezione.'] }) }, `
  <blockquote data-animate>Non c'è una scuola giusta. C'è una scuola che ti salva se sbagli a <em>incollare</em>, e una che ti punisce se sbagli a <em>misurare</em>.</blockquote>`),

  slide({ seg: 'S3', notes: notes({ regia: 'Le barre crescono da sole all\'ingresso.' }) }, `
  <header><h2 data-animate>Il costo biologico, in numeri</h2></header>
  <div class="body stack">
    <div data-animate>${bars([
      { label: 'Corona totale', value: [70, 75], text: '70-75%', tone: 'accent' },
      { label: 'Overlay, onlay', value: [32, 47], text: '32-47%' },
    ], { max: 100, mode: 'upto', axis: 'Struttura coronale rimossa, in peso. La banda chiara è l\'intervallo riportato.' })}</div>
    <ul class="list" data-animate>
      <li>I disegni ritentivi scaricano le forze sulle pareti, che si fratturano quando scendono <strong>sotto i 2 mm</strong>.</li>
      <li>L'IDS aumenta le forze adesive del <strong>400-600%</strong>: è il presupposto che rende praticabile la parametrica.</li>
    </ul>
  </div>`),

  slide({ seg: 'S3', notes: notes({
    ponte: '"La parametrica esiste solo perché l\'adesione tiene. E l\'adesione dipende da tre cose: dove metto il margine, che materiale scelgo, con cosa incollo. Sono i prossimi tre segmenti."',
  }) }, `
  <header><h2 data-animate>Quando la geometria serve ancora</h2><p class="lead muted" data-animate>La preparazione ritentiva non è superata: ha un dominio più stretto.</p></header>
  <ul class="list" data-animate>
    <li>Isolamento incerto</li>
    <li>Margini interamente in dentina</li>
    <li>Adesione compromessa: dentina sclerotica, devitalizzato con poco smalto residuo</li>
    <li>Manufatti in materiali non mordenzabili</li>
  </ul>`),
];

export const s4 = [
  divider({ seg: 'S4', num: '04', short: 'Il margine', title: 'Il margine: dove, come, perché', meta: 'min 29-47, il segmento più lungo', field: 'mint', notes: notes({
    time: 'S4, min 29-47, 12 slide.',
    extra: ['Contingenza: se a metà S4 sei in ritardo di 5 minuti, comprimi S7 a 3 minuti e togli la slide dei disegni di Ferraris. Non toccare S6.'],
  }) }),

  slide({ seg: 'S4', notes: notes({}) }, `
  <header><h2 data-animate>Il build-up non è «riempire»</h2></header>
  <div class="body">
    <ol class="steps col" data-animate>
      <li><span><strong>Eliminare i sottosquadri</strong><span class="d">Ogni sottosquadro riempito è dentina sana non fresata.</span></span></li>
      <li><span><strong>Ricostruire le pareti mancanti</strong><span class="d">Una geometria gestibile prima di preparare.</span></span></li>
      <li><span><strong>Ridurre la profondità</strong><span class="d">Lo spessore del manufatto entro valori sensati.</span></span></li>
    </ol>
    <div class="col narrow" data-animate>${photo('F4', 'Build-up in composito: sottosquadri eliminati, pareti ricostruite')}</div>
  </div>`),

  slide({ seg: 'S4', layout: 'l-statement', stripes: FIELD_COLOR.mint, notes: notes({}) }, `
  <blockquote data-animate>Il margine non va dove finisce la carie. Va dove riesci a <em>incollare</em>.</blockquote>`),

  slide({ seg: 'S4', notes: notes({ regia: 'Un livello per clic: il numero si accende sullo schema.' }) }, `
  <header><h2 data-animate>L'asse verticale</h2></header>
  <div class="body">
    <div class="col center-v">
      <table class="tbl">
        <thead><tr><th>Posizione</th><th>Conseguenza</th></tr></thead>
        <tbody>
          <tr class="fragment" data-step-of="margine" data-step="1"><th>1. Sopragengivale</th><td>Ideale: isoli, vedi, rifinisci, controlli</td></tr>
          <tr class="fragment" data-step-of="margine" data-step="2"><th>2. Intrasulculare accessibile</th><td>Gestibile con diga e filo di retrazione</td></tr>
          <tr class="fragment" data-step-of="margine" data-step="3"><th>3. Profondo, non accessibile</th><td>Non è difficile: è <strong>cieco</strong>. DME, o chirurgia</td></tr>
        </tbody>
      </table>
    </div>
    <figure class="figure fig-col w-700" data-steps="margine" data-id="fig-margine">${margineFigure('livelli')}<figcaption class="schema-tag">sezione mesio-distale</figcaption></figure>
  </div>`),

  slide({ seg: 'S4', notes: notes({}) }, `
  <header><h2 data-animate>Il punto di contatto, zona proibita</h2></header>
  <div class="body">
    <div class="col">
      <p class="callout" data-animate><strong>Mai un margine sul punto di contatto.</strong> O lo apri e lo superi, o resti coronale.</p>
      <ul class="list tight">
        ${frag('Accesso visivo nullo: non vedi l\'eccesso di cemento', { tag: 'li' })}
        ${frag('Accesso strumentale nullo: non rifinisci, il filo non passa', { tag: 'li' })}
        ${frag('Matrice inservibile: schiacciata contro il dente vicino', { tag: 'li' })}
      </ul>
      ${frag('<p class="muted">1 mm più coronale o 1 mm più cervicale è gestibile. Esattamente lì, no.</p>')}
    </div>
    <figure class="figure fig-col w-700" data-id="fig-margine">${margineFigure('contatto')}<figcaption class="schema-tag">sezione mesio-distale</figcaption></figure>
  </div>`),

  slide({ seg: 'S4', notes: notes({ extra: ['La funzione 2 è quella che decide il risultato a dieci anni, e quasi nessuno la nomina.'] }) }, `
  <header><h2 data-animate>DME: due funzioni, non una</h2></header>
  <div class="body">
    <div class="col">
      <div data-animate><p class="tag">Funzione 1</p><h3>Rendere il dente trattabile</h3><p class="muted">Diga, adattamento della matrice, rilevamento affidabile del margine.</p></div>
      ${frag('<p class="tag">Funzione 2</p><h3>Rendere la cementazione controllabile</h3><p class="muted">Il margine va dove puoi vedere l\'eccesso, raggiungerlo, rifinire, lucidare, passare il filo.</p>')}
      ${frag('La DME non è una tecnica di salvataggio. È una <strong>decisione di progetto</strong>.', { cls: 'callout' })}
    </div>
    <div class="col narrow slots" data-animate>
      ${photo('F5', 'Matrice sezionale e cuneo in posizione')}
      ${photo('F6', 'DME completata: margine rialzato e rifinito')}
    </div>
  </div>`),

  slide({ seg: 'S4', notes: notes({
    say: '"Un margine rialzato male è un difetto parodontale che vi siete costruiti da soli."',
    extra: ['Evidenza: sopravvivenza a 5 anni 95,9%. Profondità di sondaggio nel range della salute. Aumento transitorio del sanguinamento che si stabilizza con igiene adeguata.'],
  }) }, `
  <header><h2 data-animate>DME: protocollo e limite</h2></header>
  <div class="body">
    <div class="col">
      <p data-animate><strong>Come.</strong> Diga, matrice sezionale adattata con cuneo, adesivo, composito in incrementi ≤ 1 mm, rifinitura e lucidatura meticolose.</p>
      <p class="callout" data-animate><strong>Limite non negoziabile:</strong> margine rialzato a ≥ 2 mm dalla cresta ossea (riferimento 2,04 mm). Sotto: allungamento di corona o estrusione ortodontica.</p>
      <div data-animate><p class="big-num">95,9<small>%</small></p><p class="muted small">sopravvivenza a 5 anni dei restauri indiretti con DME</p></div>
    </div>
    <figure class="figure fig-col w-700" data-animate>${margineFigure('dme')}<figcaption class="schema-tag">distanza dalla cresta ossea</figcaption></figure>
  </div>`),

  slide({ seg: 'S4', notes: notes({
    regia: 'Una riga per clic: lo schema mostra il restauro corrispondente.',
    extra: ['Se hai la foto F9 (veneerlay in situ), vale il doppio: la differenza overlay/veneerlay si vede.'],
  }) }, `
  <header><h2 data-animate>L'asse vestibolare</h2><p class="muted" data-animate>Dove cade la linea di finitura <strong>nomina il restauro</strong>.</p></header>
  <div class="body">
    <div class="col">
      <table class="tbl">
        <thead><tr><th>La linea vestibolare</th><th>Restauro</th></tr></thead>
        <tbody>
          <tr class="fragment" data-step-of="restauri" data-step="1"><td>Resta occlusale al confine cuspidale</td><th>Overlay</th></tr>
          <tr class="fragment" data-step-of="restauri" data-step="2"><td>Scende sulla superficie vestibolare</td><th>Veneerlay (vonlay)</th></tr>
          <tr class="fragment" data-step-of="restauri" data-step="3"><td>Copre l'occlusale, non tocca le pareti assiali</td><th>Table-top</th></tr>
          <tr class="fragment" data-step-of="restauri" data-step="4"><td>Arriva al cervicale su tutta la circonferenza</td><th>Corona parziale</th></tr>
        </tbody>
      </table>
      ${frag('Due assi indipendenti: quanto scendi in verticale, dove cadi in vestibolare.', { cls: 'callout' })}
    </div>
    <figure class="figure fig-col w-700" data-steps="restauri" data-animate>${restauriFigure()}<figcaption class="schema-tag">stesso molare, quattro linee di finitura</figcaption></figure>
  </div>`),

  slide({ seg: 'S4', notes: notes({ extra: ['Slide sacrificabile in caso di ritardo: i disegni prossimali si dicono a voce.', 'Figura originale (A2) non inserita: la tabella copre lo stesso contenuto.'] }) }, `
  <header><h2 data-animate>I tre disegni di Ferraris</h2></header>
  <table class="tbl" data-animate>
    <thead><tr><th>Disegno</th><th>Dove</th><th>Perché</th></tr></thead>
    <tbody>
      <tr><th>Butt joint</th><td>Sull'occlusale, segue l'andamento cuspidale</td><td>Preparazione minima. Protezione cuspidale, abrasione, erosione</td></tr>
      <tr><th>Bevel</th><td>Superficie inclinata vestibolare, 2-3 mm, ≥ 8°</td><td>Integrazione estetica graduale, più smalto per l'adesione</td></tr>
      <tr><th>Shoulder</th><td>Spalla periferica arrotondata, circa 0,5 mm</td><td>Frattura cuspidale fino al terzo cervicale: serve presa cervicale</td></tr>
    </tbody>
  </table>
  <p class="muted small" data-animate>Prossimali: slot (spalla arrotondata circa 0,8 mm), bevel prossimale, ridge up con conservazione o copertura della cresta.</p>
  <p class="source" data-animate>Ferraris F. <i>Int J Esthet Dent</i> 2017;12(4):482-502. Classificazione adhesthetics</p>`),

  slide({ seg: 'S4', notes: notes({
    say: 'Il chamfer profondo costa riduzione periferica e lascia un margine di ceramica più sottile in una zona già caricata. Il butt joint dà spessore pieno fino al margine.',
    extra: ['Se hai la foto F8 (preparazione butt joint, occlusale) puoi mostrarla qui.'],
  }) }, `
  <header><h2 data-animate>Butt joint o chamfer? Il dato</h2><p class="muted small" data-animate>Occlusal veneer in disilicato, stessa riduzione occlusale di 1 mm. Studio in vitro.</p></header>
  <div class="body">
    <div class="col">
      <p class="tag" data-animate>Carico a frattura</p>
      <div data-animate>${bars([
        { label: 'Butt joint', value: 1107, text: '1107 N', tone: 'accent' },
        { label: 'Hollow chamfer 0,8', value: 784, text: '784 N' },
        { label: 'Deep chamfer 1 mm', value: 550, text: '550 N' },
      ], { max: 1200 })}</div>
      <p class="tag" data-animate>Gap marginale, più basso è meglio</p>
      <div data-animate>${bars([
        { label: 'Butt joint', value: 99, text: '99 µm', tone: 'accent' },
        { label: 'Hollow chamfer 0,8', value: 105, text: '105 µm', tone: 'soft' },
        { label: 'Deep chamfer 1 mm', value: 118, text: '118 µm', tone: 'soft' },
      ], { max: 130 })}</div>
    </div>
  </div>
  ${frag('Il chamfer peggiora man mano che si approfondisce: fra butt joint e deep chamfer il carico a frattura si dimezza.', { cls: 'callout' })}
  <p class="source" data-animate>Hassan et al. <i>BMC Oral Health</i> 2025;25:793</p>`),

  slide({ seg: 'S4', notes: notes({
    extra: ['Questa slide previene la contraddizione che altrimenti si crea in aula.', 'Angoli interni arrotondati: se lasciate uno spigolo acuto, il software lo arrotonda comunque e il pezzo non seggerà.'],
  }) }, `
  <header><h2 data-animate>Il bisello: due oggetti, un nome</h2></header>
  <figure class="figure w-900" data-animate>${biselloFigure()}<figcaption class="schema-tag">profili semplificati</figcaption></figure>
  <div class="pair" data-animate>
    <p><strong>Vietato:</strong> sottile, a lama di coltello, al margine. Ceramica fragile, illeggibile per lo scanner, irriproducibile dal CAM.</p>
    <p><strong>Di Ferraris:</strong> superficie ampia su smalto vestibolare. Diluisce la giunzione ottica e aumenta la superficie adesiva.</p>
  </div>
  ${frag('Angoli interni tutti arrotondati: il CAM non fresa un raggio più piccolo della sua fresa.', { cls: 'callout quiet' })}`),

  slide({ seg: 'S4', notes: notes({
    extra: ['Perché: dentina fresca, migliore ibridizzazione, nessun collasso del collagene. L\'adesivo polimerizza libero, non compresso sotto un manufatto rigido. Nessuna contaminazione da cemento provvisorio. Meno sensibilità post-operatoria.', 'Il limite inferiore si alza di cinque volte: cambia la prevedibilità, non solo la media.'],
    ponte: '"Il dente è pronto. Adesso: di cosa lo faccio, quel pezzo?"',
  }) }, `
  <header><h2 data-animate>Immediate Dentin Sealing</h2></header>
  <div class="body">
    <div class="col">
      <p data-animate>Sigillare la dentina con l'adesivo <strong>subito dopo la preparazione</strong>, prima del rilevamento.</p>
      <div data-animate>${bars([
        { label: 'IDS', value: [11, 66], text: '11-66 MPa', tone: 'accent' },
        { label: 'Sigillatura ritardata', value: [2, 41], text: '2-41 MPa' },
      ], { max: 70, axis: 'Forze di adesione: il limite inferiore sale di cinque volte' })}</div>
      <ol class="steps" data-animate>
        <li>Adesivo caricato, non assottigliato con l'aria</li>
        <li>Via lo strato inibito dall'ossigeno: glicerina, pomice</li>
        <li>Prima di cementare: sabbiatura Al₂O₃ 27-50 µm o pomice</li>
      </ol>
    </div>
    <div class="col narrow" data-animate>${photo('F7', 'IDS eseguito: superficie sigillata e lucida')}</div>
  </div>`),
];
