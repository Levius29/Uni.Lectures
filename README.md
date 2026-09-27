# Intarsi posteriori

Base per una presentazione universitaria di Francesco. Vite + TypeScript, Reveal.js, GSAP, dotLottie, Playwright e Sharp. Nessuna foto clinica inclusa.

## Avvio

Node 24 (file .nvmrc), npm e Git.

```sh
npm ci
npx playwright install chromium
npm run dev
```

Apri l'indirizzo locale mostrato. Frecce: navigazione. F: fullscreen. S: note relatore. Esc: panoramica. Per le note relatore, consenti l'apertura della finestra locale.

```sh
npm run build
npm run preview
npm test
npm run images:prepare
```

Build in dist/. Gli asset clinici presenti in public/ saranno inclusi nella build: revisionarli prima della distribuzione. Originali sempre fuori da public/.

## Codex e Claude Code

Apri questa stessa cartella come progetto in entrambi. AGENTS.md contiene le regole comuni; CLAUDE.md le richiama. Nessun MCP necessario per avvio o test: Playwright funziona da terminale. Evita due agenti sullo stesso file contemporaneamente.

Leggi PROJECT_SPEC.md, DESIGN_SYSTEM.md, LESSON_STRUCTURE.md e docs/ASSETS.md. Le quattro slide iniziali sono una demo editoriale; la lezione clinica va completata e validata.

## GitHub

Repository locale inizializzata, nessun remote impostato e nessun push eseguito. Crea una repository GitHub **privata e vuota**, senza README generato, poi sostituisci OWNER con il tuo account:

```sh
git remote add origin https://github.com/OWNER/intarsi-lecture.git
git push -u origin main
```

Controlla prima `git status` e `git ls-files`. Workflow GitHub Actions incluso: installazione, build e test Chromium; nessun deployment automatico. Nessuna licenza assegnata: scegliere prima di rendere pubblico il codice.
