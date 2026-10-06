# Sistema visivo

Riferimento di stile scelto da Francesco: presentazione Canva «Gradient Texture UI Morph Slides» (SlidesCarnival), vista il 27 settembre 2026. Se ne riprendono linguaggio e movimento, non contenuti, immagini o marchi.

Rifinitura (27 settembre 2026) con la disciplina di `docs/design-references/awesome-design-md/apple/DESIGN.md` e i controlli della skill `design-taste-frontend`: pesi tipografici 400/600, niente schede né ombre, lo schema o la foto al centro, un solo accento. I campi sfumati restano: sono la scelta di Francesco, anche se Apple non usa gradienti.

## Tela
Formato 16:9, tela 1600×900 (composizione HyperFrames, scalata a tutto schermo dal player). Margini interni del telaio: 92 px in alto (sotto la striscia), 88 px ai lati, 44 px in basso. `center: false`: titolo sempre in alto.

## Colore
Fondo quasi nero `#0E1013` con grana leggera su tutto. Testo `#F3F1EC`, secondario `#9CA3A7`, superfici `#171A1F` e `#20242A`, filetti bianco al 14%. Un solo accento, corallo `#FF8F5E`: parole chiave, righe chiave delle tabelle, numeri delle liste.

Il colore pieno vive solo nei **campi sfumati** a tutto schermo (livello `.bg` della scena): copertina e divisori di segmento. Cinque campi, variabili in `src/styles/theme.css`: `warm` (arancio-rosa), `blue` (blu-viola), `coral`, `amber`, `mint`. Lezione 1: copertina e S1/S7 warm, S3 coral, S4 mint, S5 amber, S6 blue. Le affermazioni restano scure, con righe orizzontali sfumate nel colore del segmento.

## Tipografia
Inter variabile (locale, OFL, nessun font remoto). Pesi 400 e 600 (700 solo per la parola gigante dei divisori), niente 500. Titoli 600 con spaziatura stretta: copertina 150 px, slide 72 px, affermazioni 84 px, titolo gigante dei divisori 190 px. Corpo 32 px con interlinea 1,44, tabelle 27 px (31 px con `.tbl.lg` quando sono poche righe), didascalie e fonti 22-24 px, striscia in alto 20 px. Enfasi con il colore d'accento, non con un secondo carattere.

## Impaginazioni
- Copertina (`l-cover`): campo sfumato, titolo enorme in basso a sinistra.
- Divisore (`l-divider`): campo sfumato, parola breve ripetuta in grande che esce dai bordi («Due scuole - Due scuole - …»), sotto il titolo completo. Niente numero di segmento (la catena in alto orienta già) e niente minuti in slide: vanno nelle note.
- Affermazione (`l-statement`): testo grande su fondo scuro, righe decorative a destra.
- Contenuto: titolo + `.body` a una o due colonne. Blocchi affiancati (`.pair`) come due colonne separate da un filetto verticale, senza schede; `.pair.big` per due domande o tesi a confronto.
- Voci senza ordine (`.items`): griglia a 2 o 3 colonne (`style="--cols:3"`), titolo della voce e riga di spiegazione, filetto sopra; `.items.big` quando le voci sono poche. I numeri (`ol.steps`, 1, 2, 3 senza zero iniziale) solo quando l'ordine conta: gerarchia, sequenze, passaggi.
- Slide leggere: niente metà inferiore vuota. Si alza la scala (`.big`, `.lg`) o si centra il blocco sotto il titolo (`.center-v`), non si aggiunge testo.
- Striscia in alto su ogni slide: corso e lezione a sinistra, catena narrativa a destra con l'anello corrente sottolineato.

## Movimento
Tutto il movimento vive in un'unica timeline GSAP della composizione HyperFrames (`src/hyperframes/timeline.js`). Ogni slide ha delle tappe: ingresso completato, poi un frammento per tappa. Andando avanti la timeline si percorre a velocità reale, all'indietro a velocità 2,2: ogni animazione si vede anche al contrario. Salti oltre 6 s (deep link) sono istantanei.
- **Morph** fra slide consecutive: gli elementi con lo stesso `data-id` partono da posizione e dimensione della slide precedente e arrivano alla propria (FLIP, 0,8 s). La striscia in alto resta ferma. Esempi: la foto del caso da grande a pannello, lo schema che resta fermo mentre cambia il testo.
- **Continuità**: il titolo della copertina e la parola gigante dei divisori (`data-carry`) salgono e restano, tagliati e tenui, in cima alla slide successiva.
- **Ingresso**: gli elementi `data-animate` salgono di 24 px in 0,7 s, in sequenza di 60 ms; tabelle ed elenchi entrano riga per riga; le affermazioni salgono parola per parola (SplitText con maschera); i numeri grandi contano fino al valore; gli schemi si costruiscono (contorni disegnati con DrawSVG, tessuti, restauro, linee guida, etichette), salvo che arrivino per morph; la parola gigante dei divisori entra da destra. Curve `--ease-out` (entrate) e `--ease-in-out` (spostamenti), uguali in CSS e GSAP (`ui-out`, `ui-in-out`).
- **Uscita**: prima del cambio di scena (0,4 s) sfuma ciò che non prosegue; il campo sfumato si dissolve se la slide successiva non lo condivide.
- Frammenti: salgono di 14 px mentre compaiono (0,6 s). Schemi: stati guidati dai frammenti (`data-step` impostato in timeline, disegno con transizioni CSS 450-700 ms). Barre e luce crescono all'ingresso.
- Con `prefers-reduced-motion` la navigazione salta da tappa a tappa senza percorrere la timeline; dei cambi di stato degli schemi restano brevi dissolvenze (200 ms).
- Stampa (`?print-pdf`): la composizione si apre da sola, una pagina per slide, frammenti e schemi nello stato finale. Niente loop decorativi.

## Schemi SVG
Su fondo scuro: restauro teal `#4FB8B1`, smalto `#F6F3EC`, dentina `#DCC9A0`, polpa `#CF8A7C`, gengiva `#CF9087`, osso `#7D766A`, contorni `#B8C0C4`, luce di polimerizzazione blu `#5B9CFF`. Il corallo segnala ciò che va notato (carico, zona proibita, linea di finitura). Etichette ≥ 25 px sulla tela, didascalia «Schema illustrativo». Forme semplificate, da validare dal docente.

## Foto
Segnaposto: cornice tratteggiata trasparente con codice (F1…) in piccolo, così non sembra un elemento grafico. Le foto approvate riempiono la cornice (`object-fit: cover`), angoli 18 px, nessuna scritta sopra, nessuna ombra. Didascalie neutrali, nessun identificativo paziente.

## Dati
Barre solo con numeri del testo sorgente, fonte in slide. Intervalli: barra piena fino al minimo e banda tratteggiata fino al massimo; intervalli di misura come barra flottante.

## Testo
Nessun trattino lungo nel testo visibile. Virgolette caporali «». Una sola idea per slide; il resto nelle note relatore. Niente etichette generiche («A», «B», «Fase 1»): il titolo della voce è l'etichetta.

## Raggi
Una sola scala: 18 px per foto, segnaposto e schemi; pillola piena per le opzioni di voto. Nessuna scheda con fondo.
