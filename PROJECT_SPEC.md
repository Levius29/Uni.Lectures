# Conservativa 4 · specifica

## Obiettivo e perimetro
Corso di restaurativa indiretta (III anno, II semestre, 16 lezioni) in forma di presentazioni web in italiano, condivise fra Francesco, Codex e Claude Code. Ogni lezione è una composizione HyperFrames navigabile in HTML (avanti e indietro, slide e frammenti, componenti animati), con note relatore, animazioni che chiariscono un concetto e segnaposto per le foto cliniche approvate. Nessun video: l'uscita è la pagina. La lezione 1 è una bozza completa; le altre si aggiungono con la stessa struttura.

## Architettura
Vite multipagina + TypeScript strict + HyperFrames. `index.html` è la home del corso. Le slide di `src/slides/NN/` sono compilate da `src/hyperframes/compose.ts` (`npm run compose`, eseguito anche da dev, build e test) in `public/compositions/NN/index.html`: una composizione HyperFrames 1600×900 con una scena per slide, isola slideshow (ordine, note, tappe), CSS e timeline in linea, GSAP, runtime HyperFrames e font Inter copiati in `vendor/` (nessuna rete). `src/hyperframes/timeline.js` costruisce un'unica timeline GSAP in pausa: ingressi, frammenti, stati degli schemi, morph fra slide (FLIP sugli elementi con lo stesso data-id), uscite. `lezioni/NN/index.html` carica `src/lesson.ts`, che monta `<hyperframes-slideshow>` + `<hyperframes-player>` (navigazione, contatore, schermo intero, vista relatore con note e finestra pubblico sincronizzata) e aggiunge con `src/hyperframes/navigation.ts` il movimento fra le tappe (la timeline si percorre avanti e indietro), indietro di un frammento e deep link `#/slide/frammento`; collega le foto presenti e i badge di revisione dentro la composizione. Le transizioni CSS degli stati degli schemi restano (avviso del lint HyperFrames, irrilevante perché non si esporta video). Un plugin Vite elenca le immagini locali presenti in `public/assets/`, così i segnaposto non generano richieste mancanti. Sharp prepara copie WebP senza metadati. `npm run lint:hf` valida le composizioni con il lint HyperFrames. Playwright verifica home, struttura della composizione, navigazione, deep link, frammenti e stati degli schemi, movimento ridotto e assenza di contenuti fuori dalla tela. Nessun backend, tracciamento o font remoto.

## Cartelle
- src/slides/NN: contenuto della lezione per segmenti; src/slides/kit.ts: mattoni comuni.
- src/hyperframes: compilatore della composizione, timeline, navigazione.
- src/components: slot foto/figure, barre dati, catena narrativa, schemi SVG (figures/).
- src/core: tipi, percorsi del sito.
- src/styles: token, slide, schemi (in linea nella composizione), pagina lezione, home.
- public/compositions/NN: composizioni generate (ignorate da Git).
- lezioni/NN: pagina di ogni lezione.
- docs/lezioni/NN: testo sorgente, immagini, bibliografia, stato.
- clinical-originals: originali locali ignorati da Git, fuori dalla directory pubblica.
- clinical-processed: copie locali da revisionare, ignorate da Git.
- public/assets/clinical/NN: copie approvate (F1.webp...), ignorate da Git, incluse nella build quando presenti.
- public/assets/articoli/NN: figure da articolo (A1.webp...), ignorate da Git.
- public/assets/ai: schemi AI con descrizione, provenienza e validazione.
- public/assets/lottie: animazioni locali autorizzate.
- scripts: preparazione immagini. tests: controlli browser.

## Accettazione
Installazione riproducibile con npm ci; build senza errori; lint HyperFrames senza errori; test Chromium verdi; navigazione da tastiera; nessuna slide oltre la tela 1600×900; nessun dato identificativo nel repository; cartelle cliniche escluse da Git; contenuti da validare segnalati.

## Limiti
Non crea casi clinici reali, non valida raccomandazioni terapeutiche, non anonimizza scritte impresse nelle fotografie. Gli schemi SVG sono semplificazioni didattiche da validare. Nessuna pubblicazione GitHub o Pages automatica.
