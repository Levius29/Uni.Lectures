# Uni.Lectures — Intarsi posteriori

Base per una presentazione universitaria di Francesco. Vite + TypeScript, Reveal.js, GSAP, dotLottie, Playwright e Sharp. Nessuna foto clinica inclusa.

## Avvio

Node 24 (file .nvmrc), npm e Git.

```sh
npm ci
npx playwright install chromium
npx --no-install playwright-cli install-browser chromium
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

Playwright CLI è lo strumento principale per controllare le slide. Playwright MCP resta configurato per Codex in `.codex/config.toml` e per Claude Code in `.mcp.json` quando serve una sessione browser più interattiva. Entrambi usano le versioni installate da `npm ci`, un browser isolato e una finestra di 1920×1080. Claude Code può chiedere di approvare il server MCP della repo al primo avvio. I test automatici restano disponibili con `npm test`.

Le skill richieste sono in `.agents/skills/` e visibili a Claude tramite `.claude/skills/`: `design-taste-frontend`, `web-design-guidelines`, `image-to-code`, `playwright-cli`. Per l'ispezione browser con Playwright CLI usa `npx --no-install playwright-cli open http://127.0.0.1:5173/`, poi `npx --no-install playwright-cli snapshot` e `npx --no-install playwright-cli close`. `web-design-guidelines` include una copia locale delle regole. La raccolta [awesome-design-md](docs/design-references/README.md) fornisce due riferimenti offline; `DESIGN_SYSTEM.md` resta la guida del progetto. [Provenienza e licenze](docs/third-party-licenses/NOTICE.md).

`image-to-code` può partire da immagini già disponibili in entrambi gli agenti; la fase di generazione richiede che la sessione disponga di uno strumento per creare immagini.

Leggi PROJECT_SPEC.md, DESIGN_SYSTEM.md, LESSON_STRUCTURE.md e docs/ASSETS.md. Le quattro slide iniziali sono una demo editoriale; la lezione clinica va completata e validata.

## GitHub

Repository condivisa: https://github.com/Levius29/Uni.Lectures

Per lavorare su un altro computer:

```sh
git clone https://github.com/Levius29/Uni.Lectures.git
cd Uni.Lectures
npm ci
npx playwright install chromium
npx --no-install playwright-cli install-browser chromium
npm run dev
```

Il remote origin punta alla repository condivisa. Prima di ogni push controlla `git status` e `git diff --cached`. Gli originali e le copie cliniche restano esclusi da Git.

GitHub Actions verifica installazione, build e test Chromium. Il workflow Jekyll iniziale è stato rimosso perché questo progetto usa Vite. Nessun deployment Pages automatico configurato.

Nessuna licenza assegnata; i materiali clinici non sono inclusi.
