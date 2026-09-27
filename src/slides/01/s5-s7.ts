import { slide, notes, frag, divider } from '../kit';
import { slot } from '../../components/slot';
import { bars } from '../../components/bars';
import { luceFigure } from '../../components/figures/luce';
import { CHAIN } from './chain';

const photo = (code: string, caption: string) => slot({ src: `assets/clinical/01/${code}.webp`, code, caption });

export const s5 = [
  divider({ seg: 'S5', num: '5', title: 'Materiali: spessori, indicazioni, limiti', meta: 'min 47-62, disilicato e compositi CAD-CAM', chain: CHAIN, current: 2, notes: notes({
    time: 'S5, min 47-62, 7 slide.',
    extra: ['Divisione con la Lezione 2: qui quando lo scelgo e cosa mi limita. Lezione 2: come nasce il pezzo. La zirconia compare solo come paragone.'],
  }) }),

  slide({ seg: 'S5', notes: notes({ extra: ['La traslucenza è messa per ultima apposta: è la cerniera verso i cementi.'] }) }, `
  <header><h2 data-animate>Non un catalogo: sei assi</h2></header>
  <div class="body stack center-v">
    <ol class="steps cols3 big" data-animate>
      <li><span>Contenuto vetroso<span class="d">mordenzabile o no</span></span></li>
      <li><span>Modulo elastico<span class="d">ammortizza o trasmette</span></span></li>
      <li><span>Resistenza a flessione</span></li>
      <li><span>Riparabilità intraorale</span></li>
      <li><span>Usura dell'antagonista</span></li>
      <li class="key"><span>Traslucenza<span class="d">quanta luce passa: la cerniera verso i cementi</span></span></li>
    </ol>
  </div>`),

  slide({ seg: 'S5', notes: notes({}) }, `
  <header><h2 data-animate>Disilicato di litio</h2><p class="lead muted" data-animate>Il cavallo di battaglia.</p></header>
  <div class="body">
    <div class="col">
      <p data-animate>Mordenzabile perché contiene vetro. Resistente, esteticamente affidabile, rigido.</p>
      <p class="tag" data-animate>Limiti</p>
      <ul class="list" data-animate>
        <li>Chippa se va sotto spessore, soprattutto sui margini sottili</li>
        <li>Riparazione intraorale difficile</li>
        <li>La rigidità trasmette il carico all'interfaccia invece di ammortizzarlo</li>
      </ul>
    </div>
    <div class="col narrow" data-animate>${photo('F10', 'Manufatto in disilicato sul modello')}</div>
  </div>`),

  slide({ seg: 'S5', notes: notes({}) }, `
  <header><h2 data-animate>Compositi e ibride CAD-CAM</h2></header>
  <div class="body">
    <div class="col">
      <p data-animate>Modulo elastico vicino alla dentina: <strong>ammortizzano</strong>. Margini sottili fresabili senza chipping. Riparabili in bocca. Facili da rifinire e lucidare.</p>
      <p class="tag" data-animate>Limiti</p>
      <ul class="list" data-animate>
        <li>Si usurano, assorbono acqua, si discromano nel tempo</li>
        <li>Meno letteratura a lungo termine di quanta ne suggerisca il marketing</li>
        <li>Non si mordenzano con fluoridrico: si sabbiano</li>
      </ul>
    </div>
    <div class="col narrow" data-animate>${photo('F11', 'Manufatto in composito o ibrida CAD-CAM')}</div>
  </div>`),

  slide({ seg: 'S5', verify: 'Spessori minimi: allineare alle istruzioni d\'uso dei materiali della clinica del corso.', notes: notes({
    regia: 'Far girare in aula la chiave in silicone sezionata.',
    verify: 'Tabella spessori minimi: allineare alle IFU dei materiali effettivamente usati nella clinica del corso.',
  }) }, `
  <header><h2 data-animate>Gli spessori, con le loro condizioni</h2></header>
  <div class="body">
    <div class="col">
      <table class="tbl" data-animate>
        <thead><tr><th>Classe</th><th>Occlusale minimo</th></tr></thead>
        <tbody>
          <tr><th>Vetroceramica al disilicato</th><td class="num">1,0-1,5 mm</td></tr>
          <tr><th>Ceramica ibrida a matrice polimerica</th><td class="num">1,0-1,5 mm</td></tr>
          <tr><th>Composito CAD-CAM</th><td class="num">1,5 mm</td></tr>
          <tr class="dim"><th>Zirconia traslucente, paragone</th><td class="num">0,8-1,0 mm</td></tr>
        </tbody>
      </table>
      <p class="muted small" data-animate>Verifica pratica: chiave in silicone sezionata, presa <strong>prima</strong> della preparazione.</p>
    </div>
    <div class="col narrow">
      <p class="callout" data-animate>Il numero da solo non basta. Cambia con:</p>
      <ul class="list tight" data-animate>
        <li>area occlusale o cuspide coperta</li>
        <li>dente vitale o devitalizzato</li>
        <li>antagonista naturale o protesico</li>
        <li>parafunzione</li>
      </ul>
    </div>
  </div>`),

  slide({ seg: 'S5', layout: 'l-statement', notes: notes({}) }, `
  <p class="flow" data-animate><span>Spessore disponibile</span><i>→</i><span>antagonista</span><i>→</i><span>esigenza estetica</span><i>→</i><span>riparabilità</span></p>
  <p class="after" data-animate>Non «qual è il migliore». Quale regge <strong>in questo spazio</strong>, contro quell'antagonista, con quel margine.</p>`),

  slide({ seg: 'S5', notes: notes({
    ponte: '"Ultimo anello. Ho il dente preparato e il pezzo in mano. Con cosa li unisco, e perché la risposta dipende da quanto è spesso e quanto è traslucido quel pezzo."',
  }) }, `
  <header><h2 data-animate>Il dato che ridimensiona la discussione</h2><p class="muted" data-animate>Restauri parziali in ceramica.</p></header>
  <div class="body">
    <div class="col">
      <div class="pair" data-animate>
        <div><p class="big-num">95<small>%</small></p><p class="muted small">sopravvivenza a 5 anni</p></div>
        <div><p class="big-num">91<small>%</small></p><p class="muted small">sopravvivenza a 10 anni</p></div>
      </div>
      <p class="callout" data-animate>La prima causa di fallimento si previene in diagnosi e in preparazione, non scegliendo la marca.</p>
    </div>
    <div class="col">
      <p class="tag" data-animate>Cause di fallimento</p>
      <div data-animate>${bars([
        { label: 'Frattura, chipping', value: 4, text: '4%', tone: 'accent' },
        { label: 'Endodontiche', value: 3, text: '3%' },
        { label: 'Carie', value: 1, text: '1%' },
        { label: 'Decementazione', value: 1, text: '1%' },
      ], { max: 5 })}</div>
      <p class="source" data-animate>Morimoto S et al. <i>J Dent Res</i> 2016</p>
    </div>
  </div>`),
];

export const s6 = [
  divider({ seg: 'S6', num: '6', title: 'Cementi e cementazione', meta: 'min 62-81, il segmento che non si taglia', chain: CHAIN, current: 3, notes: notes({
    time: 'S6, min 62-81, 9 slide.',
    extra: ['La cementazione è l\'unico segmento di cui gli studenti non vedranno mai una dimostrazione altrove.'],
  }) }),

  slide({ seg: 'S6', layout: 'l-statement', notes: notes({}) }, `
  <blockquote data-animate>Non è cementazione. È <em>incollaggio</em>.</blockquote>
  <p class="after" data-animate>Un cemento riempie uno spazio. Un adesivo trasferisce carichi. Il restauro parziale sta in bocca perché è incollato, non perché è ritenuto.</p>`),

  slide({ seg: 'S6', notes: notes({ regia: 'La luce scende da sola: più il manufatto è spesso e opaco, meno arriva al cemento.' }) }, `
  <header><h2 data-animate>Un criterio solo: quanta luce arriva</h2><p class="muted" data-animate>Le classi non si imparano a memoria. Si ordinano su <strong>spessore e traslucenza</strong> del manufatto.</p></header>
  <div class="body">
    <div class="col">
      <table class="tbl" data-animate>
        <thead><tr><th>Materiale da incollaggio</th><th>Quando</th></tr></thead>
        <tbody>
          <tr><th>Composito preriscaldato o iniettabile</th><td>Sottili e traslucidi</td></tr>
          <tr><th>Cemento resinoso foto</th><td>Sottili, luce garantita</td></tr>
          <tr><th>Cemento resinoso duale</th><td>Spessi, opachi, zone d'ombra</td></tr>
          <tr class="dim"><th>Autoadesivo</th><td>Non per un restauro parziale adesivo</td></tr>
          <tr class="dim"><th>Vetroionomerico, RMGI</th><td>Fuori tema: non incolla, ritiene</td></tr>
        </tbody>
      </table>
    </div>
    <figure class="figure fig-col w-700" data-animate>${luceFigure()}<figcaption class="schema-tag">luce che raggiunge il cemento</figcaption></figure>
  </div>`),

  slide({ seg: 'S6', notes: notes({}) }, `
  <header><h2 data-animate>I limiti, uno per uno</h2></header>
  <ul class="list" data-animate>
    <li><strong>Duale.</strong> Ammine terziarie: instabilità cromatica nel tempo, discolorazione marginale.</li>
    <li><strong>Preriscaldato.</strong> Finestra brevissima: perde il 45-61% della temperatura in 15 secondi. Con dentina residua sottile, attenzione alla polpa: oltre 5,5 °C è danno.</li>
    <li><strong>Autoadesivo.</strong> Non mordenza, non ibridizza davvero. Adesione a smalto e dentina inferiore.</li>
    <li><strong>Tutti.</strong> La luce che attraversa il manufatto è sempre meno di quella che credi.</li>
  </ul>`),

  slide({ seg: 'S6', notes: notes({ say: 'Uno misura quanto il materiale polimerizza. L\'altro come appare il margine dopo un anno e mezzo. Un materiale può polimerizzare meglio e invecchiare peggio. Tenere insieme due evidenze discordanti vale più di qualunque tabella di prodotti.' }) }, `
  <header><h2 data-animate>Due evidenze, direzioni opposte</h2></header>
  <div class="pair" data-animate>
    <div>
      <p class="tag">In vitro, 2026</p>
      <p>Spessori simulati 1,5, 2,5 e 3,5 mm: il <strong>duale</strong> batte il composito preriscaldato per conversione e microdurezza <strong>a ogni spessore</strong>. L'irradianza crolla con lo spessore.</p>
      <p class="source">Souza L et al. <i>BMC Oral Health</i> 2026</p>
    </div>
    <div>
      <p class="tag">RCT a 18 mesi, onlay in ceramica ibrida</p>
      ${bars([
        { label: 'Iniettabile', value: 92, text: '92%', tone: 'accent' },
        { label: 'Duale', value: 57, text: '57%' },
      ], { max: 100, axis: 'Punteggi eccellenti per discolorazione marginale (p = 0,038). Nessun fallimento.' })}
      <p class="source"><i>BMC Oral Health</i> 2025</p>
    </div>
  </div>
  ${frag('Non è una contraddizione: <strong>misurano cose diverse</strong>.', { cls: 'callout' })}`),

  slide({ seg: 'S6', layout: 'l-statement', notes: notes({ extra: ['La scelta del cemento non è indipendente dalla preparazione. È la stessa decisione, presa due ore dopo.'] }) }, `
  <p class="after" data-animate>Gli autoadesivi sono pensati per restauri ritentivi.</p>
  <blockquote data-animate>Se prepari alla Politano hai rinunciato alla ritenzione. Non puoi rinunciare anche all'<em>adesione</em>.</blockquote>`),

  slide({ seg: 'S6', verify: 'Tempi di mordenzatura con fluoridrico: variano per marchio e concentrazione.', notes: notes({
    regia: 'Far vedere accostati un manufatto mordenzato e uno no.',
    extra: ['Il passaggio più trascurato: la pulizia in ultrasuoni dopo il mordenzaggio. Il fluoridrico lascia precipitati di sali di silicio che riducono l\'adesione.'],
    verify: 'Tempi di mordenzatura con fluoridrico: variano per marchio e concentrazione.',
  }) }, `
  <header><h2 data-animate>Condizionare il manufatto</h2></header>
  <div class="body stack">
    <table class="tbl" data-animate>
      <thead><tr><th>Classe</th><th>Protocollo</th></tr></thead>
      <tbody>
        <tr><th>Vetroceramiche</th><td>Fluoridrico circa 5%: 20 s disilicato, 60 s feldspatica. Risciacquo, <strong>ultrasuoni</strong>, silano o primer universale</td></tr>
        <tr><th>Ceramica ibrida</th><td>Fluoridrico a tempi ridotti oppure sabbiatura, secondo IFU. Silano, adesivo</td></tr>
        <tr><th>Composito CAD-CAM</th><td>Sabbiatura Al₂O₃ a bassa pressione. Silano, adesivo. <strong>Mai fluoridrico</strong></td></tr>
        <tr class="dim"><th>Zirconia, paragone</th><td>Mai fluoridrico. Sabbiatura, primer con MDP</td></tr>
      </tbody>
    </table>
    <div class="body">
      <div class="col" data-animate><p class="callout">Il fluoridrico scioglie la <strong>fase vetrosa</strong>. Senza vetro non fa nulla di utile, e dà la falsa sensazione di aver condizionato.</p></div>
      <div class="col narrow" data-animate>${photo('F12', 'Mordenzato e non mordenzato, affiancati')}</div>
    </div>
  </div>`),

  slide({ seg: 'S6', notes: notes({ extra: ['Se hai la foto F13 (cementazione in corso con diga) mostrala a voce o nella slide successiva.'] }) }, `
  <header><h2 data-animate>La sequenza, in nove passaggi</h2></header>
  <ol class="steps cols" data-animate>
    <li><span><strong>Prova</strong>, senza forzare. Non l'occlusione</span></li>
    <li><span><strong>Diga</strong> obbligatoria, filo se il margine è cervicale</span></li>
    <li><span>Condizionamento del <strong>manufatto</strong></span></li>
    <li><span>Condizionamento del <strong>dente</strong>: smalto con ortofosforico 37% 30 s; dentina con IDS: sabbiatura, etch selettivo, adesivo</span></li>
    <li><span>Scelta del materiale da incollaggio</span></li>
    <li><span>Materiale sul manufatto, non nella cavità. Eccessi via <strong>prima</strong> di polimerizzare</span></li>
    <li><span>Tack cure 2-3 s, <strong>glicerina</strong> sui margini, 20-40 s per superficie, doppio attraverso il manufatto</span></li>
    <li><span>Rifinitura, e <strong>ora</strong> l'occlusione: carta 8-12 µm, statica e dinamica</span></li>
    <li><span>Controlli: Rx se il margine è prossimale o profondo</span></li>
  </ol>`),

  slide({ seg: 'S6', notes: notes({}) }, `
  <header><h2 data-animate>I cinque errori che vedrete più spesso</h2></header>
  <div class="body stack center-v">
    <ol class="steps big">
      ${frag('Cementare senza diga', { tag: 'li' })}
      ${frag('Non pulire i precipitati dopo il fluoridrico', { tag: 'li' })}
      ${frag('Niente glicerina sui margini', { tag: 'li' })}
      ${frag('Sottopolimerizzare attraverso il manufatto', { tag: 'li' })}
      ${frag('Controllare l\'occlusione prima di incollare, e non ricontrollarla dopo', { tag: 'li' })}
    </ol>
  </div>`),
];

export const s7 = [
  slide({ seg: 'S7', notes: notes({
    time: 'S7, min 81-86.',
    extra: ['Nomi commerciali tolti: cambiano, e in aula sono pubblicità involontaria.', 'Il PMMA fresato è il ponte verso la Lezione 2.'],
  }) }, `
  <header><h2 data-animate>Il provvisorio</h2></header>
  <div class="pair" data-animate>
    <div>
      <p class="tag">Quattro compiti</p>
      <ul class="list tight">
        <li>Proteggere l'IDS</li>
        <li>Mantenere i punti di contatto: i denti migrano in pochi giorni</li>
        <li>Mantenere lo spazio occlusale</li>
        <li>Proteggere il complesso dentino-pulpare</li>
      </ul>
    </div>
    <div>
      <p class="tag">Tre regole</p>
      <ol class="steps">
        <li><span><strong>Cementi provvisori senza eugenolo.</strong> L'eugenolo inibisce la polimerizzazione dei compositi.</span></li>
        <li><span><strong>Fase breve</strong>, 1-2 settimane al massimo. Con IDS ancora meno.</span></li>
        <li><span><strong>Pulizia meticolosa</strong> alla rimozione: sabbiatura Al₂O₃ 27-50 µm o pomice.</span></li>
      </ol>
    </div>
  </div>
  <p class="muted small" data-animate>Tecnica diretta in composito, oppure fresato in PMMA.</p>`),

  slide({ seg: 'S7', notes: notes({
    regia: 'Rivotare prima di mostrare le risposte. Poi una riga per clic.',
    extra: ['Linea vestibolare: dipende dall\'estetica richiesta.'],
  }) }, `
  <header><h2 data-animate>Si rivota</h2><p class="muted" data-animate>Stesso 3.6. Non «che restauro», ma quale preparazione, linea di finitura, materiale, cemento.</p></header>
  <div class="body">
    <ul class="checks col">
      ${frag('<span>Creste perse, cuspide mesio-linguale a 1,2 mm sotto soglia</span><b>copertura</b>', { tag: 'li' })}
      ${frag('<span>Cuspidi vestibolari spesse ma senza cresta adiacente: mensole</span><b>copertura</b>', { tag: 'li' })}
      ${frag('<span>Margine distale 1 mm sottogengivale, distanza dalla cresta ossea verificata</span><b>DME</b>', { tag: 'li' })}
      ${frag('<span>Linea vestibolare, secondo l\'estetica</span><b>overlay butt joint, o veneerlay bevel</b>', { tag: 'li' })}
      ${frag('<span>Spessore disponibile dopo la copertura</span><b>disilicato o ibrida</b>', { tag: 'li' })}
      ${frag('<span>Manufatto spesso e coprente, oppure sottile e traslucido</span><b>duale, o iniettabile</b>', { tag: 'li' })}
    </ul>
    <div class="col narrow">${frag(photo('F14', 'Restauro finito, rifinito e lucidato'), { cls: 'slot-wrap' })}</div>
  </div>
  ${frag('Non è cambiato il dente. È cambiato il numero di decisioni che sapete vedere.', { cls: 'callout' })}`),

  slide({ seg: 'S7', notes: notes({
    say: '"Abbiamo deciso, preparato, scelto il materiale e incollato. Manca il pezzo in mezzo: come quel manufatto è nato. La prossima volta partiamo dal dente preparato e arriviamo all\'oggetto finito attraverso il flusso digitale."',
    extra: ['Bibliografia completa distribuita a parte.'],
  }) }, `
  <header><h2 data-animate>La prossima volta: come nasce il pezzo</h2><p class="lead muted" data-animate>Lezione 2. Dal dente preparato al manufatto finito, attraverso il flusso digitale.</p></header>
  <div class="body stack">
    <p class="tag" data-animate>Letture di riferimento</p>
    <ul class="list tight small" data-animate>
      <li>Fichera G, Devoto W, Re D. Cavity configurations for indirect partial-coverage adhesive-cemented restorations. <i>QDT</i> 2006;29:55-67</li>
      <li>Politano G, Van Meerbeek B, Peumans M. Nonretentive bonded ceramic partial crowns. <i>J Adhes Dent</i> 2018;20(6):495-510</li>
      <li>Bottacchiari S. <i>Intarsi in composito. Aspetti strutturali, parodontali ed endodontici.</i> Quintessenza, 2024</li>
      <li>Ferraris F. Posterior indirect adhesive restorations (PIAR). <i>Int J Esthet Dent</i> 2017;12(4):482-502</li>
    </ul>
  </div>`),
];
