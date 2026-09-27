# Uni.Lectures — Intarsi posteriori

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

Apri questa stessa cartella come progetto in entrambi. AGENTS.md contiene le regole comuni; CLAUDE.md le richiama. Evita due agenti sullo stesso file contemporaneamente.

Playwright MCP è configurato per Codex in `.codex/config.toml` e per Claude Code in `.mcp.json`. Usa la versione installata da `npm ci`, un browser isolato e una finestra di 1920×1080. Dopo l'installazione, avvia `npm run dev` e chiedi all'agente di controllare `http://127.0.0.1:5173/`. Claude Code può chiedere di approvare il server della repo al primo avvio. I test automatici restano disponibili con `npm test`.

Leggi PROJECT_SPEC.md, DESIGN_SYSTEM.md, LESSON_STRUCTURE.md e docs/ASSETS.md. Le quattro slide iniziali sono una demo editoriale; la lezione clinica va completata e validata.

## GitHub

Repository condivisa: https://github.com/Levius29/Uni.Lectures

Per lavorare su un altro computer:

```sh
git clone https://github.com/Levius29/Uni.Lectures.git
cd Uni.Lectures
npm ci
npx playwright install chromium
npm run dev
```

Il remote origin punta alla repository condivisa. Prima di ogni push controlla `git status` e `git diff --cached`. Gli originali e le copie cliniche restano esclusi da Git.

GitHub Actions verifica installazione, build e test Chromium. Il workflow Jekyll iniziale è stato rimosso perché questo progetto usa Vite. Nessun deployment Pages automatico configurato.

Nessuna licenza assegnata; i materiali clinici non sono inclusi.
