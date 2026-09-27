# Intarsi posteriori — specifica

## Obiettivo e perimetro
Base condivisa per Francesco, Codex e Claude Code: presentazione web universitaria in italiano sugli intarsi posteriori. La prima versione include quattro slide dimostrative, non una lezione clinica completa.

## Architettura
Vite + TypeScript strict; Reveal.js per navigazione, fullscreen, note relatore; GSAP per ingressi; dotLottie per asset locali opzionali. Sharp prepara copie WebP senza conservare metadati. Playwright verifica avvio, navigazione, deep link e movimento ridotto. Nessun backend, tracciamento o font remoto.

## Cartelle
- src/slides: contenuto e composizione slide.
- src/animations: timeline e transizioni.
- src/components: componenti riutilizzabili, incluso player Lottie.
- src/styles: tema e token.
- clinical-originals: originali locali ignorati da Git, fuori dalla directory pubblica.
- clinical-processed: copie locali da revisionare, ignorate da Git.
- public/assets/clinical: solo copie approvate per la presentazione; ignorate da Git, incluse nella build quando presenti.
- public/assets/ai: schemi AI con descrizione, provenienza e validazione.
- public/assets/lottie: animazioni locali autorizzate.
- docs: flusso di lavoro, fonti e gestione asset.
- scripts: preparazione immagini.
- tests: controlli browser.

## Accettazione
Installazione riproducibile con npm ci; build senza errori; test Chromium verdi; navigazione da tastiera; nessun dato identificativo nel repository iniziale; cartelle originali escluse da Git e dalla build; documenti condivisi presenti; Git locale inizializzato.

## Limiti
Non crea casi clinici reali, non valida raccomandazioni terapeutiche, non anonimizza scritte impresse nelle fotografie. Nessuna pubblicazione GitHub o Pages automatica. Dipendenze installate via npm; runtime della presentazione locale.
