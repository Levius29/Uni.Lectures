# Conservativa 4 · specifica

## Obiettivo e perimetro
Corso di restaurativa indiretta (III anno, II semestre, 16 lezioni) in forma di presentazioni web in italiano, condivise fra Francesco, Codex e Claude Code. Ogni lezione è una pagina Reveal.js con note relatore, animazioni che chiariscono un concetto e segnaposto per le foto cliniche approvate. La lezione 1 è una bozza completa; le altre si aggiungono con la stessa struttura.

## Architettura
Vite multipagina + TypeScript strict. `index.html` è la home del corso; `lezioni/NN/index.html` carica `src/lesson.ts`, che importa solo `src/slides/NN/index.ts`. `src/core/deck.ts` monta Reveal (1600×900 a tutto schermo, note, deep link, striscia con catena narrativa, morph Auto-Animate, badge di revisione). Font Inter locale via npm. GSAP per gli ingressi; transizioni CSS per gli stati degli schemi guidati dai frammenti; dotLottie caricato solo se una slide lo usa. Un plugin Vite elenca le immagini locali presenti in `public/assets/`, così i segnaposto non generano richieste mancanti. Sharp prepara copie WebP senza metadati. Playwright verifica home, navigazione, deep link, stati degli schemi, movimento ridotto e assenza di contenuti fuori dalla tela. Nessun backend, tracciamento o font remoto.

## Cartelle
- src/slides/NN: contenuto della lezione per segmenti; src/slides/kit.ts: mattoni comuni.
- src/components: slot foto/figure, barre dati, catena narrativa, schemi SVG (figures/).
- src/animations: ingressi e stati degli schemi.
- src/core: montaggio del deck, tipi, percorsi del sito.
- src/styles: tema, schemi, home.
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
Installazione riproducibile con npm ci; build senza errori; test Chromium verdi; navigazione da tastiera; nessuna slide oltre la tela 1600×900; nessun dato identificativo nel repository; cartelle cliniche escluse da Git; contenuti da validare segnalati.

## Limiti
Non crea casi clinici reali, non valida raccomandazioni terapeutiche, non anonimizza scritte impresse nelle fotografie. Gli schemi SVG sono semplificazioni didattiche da validare. Nessuna pubblicazione GitHub o Pages automatica.
