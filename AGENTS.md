# Istruzioni condivise per Codex e Claude Code

- Usa caveman nelle risposte: italiano breve e chiaro. Codice e documenti completi.
- Leggi PROJECT_SPEC.md, DESIGN_SYSTEM.md e LESSON_STRUCTURE.md prima di modificare.
- Stack: Vite, TypeScript strict, Reveal.js, GSAP, dotLottie, Playwright, Sharp. Non aggiungere framework senza necessità.
- Slide in src/slides; animazioni in src/animations; componenti in src/components.
- Mai leggere, caricare o inviare clinical-originals a servizi esterni senza esplicita richiesta.
- Mai includere identificativi paziente, metadati clinici o fotografie non approvate in Git, note relatore, prompt o log.
- Gli asset AI devono essere dichiarati come schemi illustrativi; mai spacciarli per casi clinici.
- Non inventare protocolli, valori clinici, bibliografie o risultati. Segnala contenuti da validare dal docente.
- Rispetta prefers-reduced-motion. Animazioni devono chiarire un concetto.
- Dopo modifiche visive importanti, avvia il server locale e usa Playwright MCP per controllare slide e navigazione a 1920×1080. Non aprire immagini cliniche originali nel browser.
- Prima della consegna: npm run build e npm test; verifica git diff e file staged.
- Entrambi gli agenti usano lo stesso repository e lockfile. Evita modifiche simultanee sugli stessi file; usa worktree per lavoro parallelo.
- Nessuna pubblicazione o push impliciti. Verifica contenuto e destinazione prima di pubblicare.
