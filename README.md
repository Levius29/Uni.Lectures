# Uni.Lectures · Conservativa 4

Corso di restaurativa indiretta (III anno, II semestre) in forma di presentazioni web animate: fondo scuro con grana, campi sfumati, Inter, transizioni morph (Reveal Auto-Animate). Vite + TypeScript, Reveal.js, GSAP, dotLottie, Playwright e Sharp. Nessuna foto clinica inclusa.

## Struttura

- `index.html` + `src/home.ts`: pagina del corso con l'elenco delle lezioni (`src/lessons.ts`).
- `lezioni/NN/index.html`: una pagina per lezione. Vite le trova da sola (`vite.config.ts`).
- `src/slides/NN/`: contenuto della lezione, diviso per segmenti. `index.ts` esporta titolo, catena narrativa e slide.
- `src/slides/kit.ts`: mattoni comuni (`slide`, `notes`, `frag`, `divider`).
- `src/components/`: foto e figure (`slot`), barre dati (`bars`), striscia in alto con la catena (`chain`), schemi SVG in `figures/`.
- Morph: elementi con lo stesso `data-id` in slide consecutive si trasformano; `data-carry` porta un titolo, tagliato, nella slide successiva. Vedi `DESIGN_SYSTEM.md`.
- `src/animations/`: ingresso degli elementi e stati degli schemi guidati dai frammenti (`steps.ts`).
- `docs/lezioni/NN/`: testo sorgente della lezione, lista immagini, bibliografia, stato e punti da validare.

### Aggiungere una lezione

1. Copia `lezioni/01/index.html` in `lezioni/NN/index.html` e cambia `data-lesson` e titolo.
2. Crea `src/slides/NN/index.ts` sul modello della lezione 1.
3. Aggiorna la voce in `src/lessons.ts` (stato `bozza`).
4. `npm run build` e `npm test`.

### Foto cliniche e figure da articolo

Le slide contengono segnaposto con un codice (F1, F2, A1...). Metti le copie approvate in `public/assets/clinical/NN/F1.webp` e le figure da articolo in `public/assets/articoli/NN/A1.webp`: compaiono da sole al posto del segnaposto. Entrambe le cartelle sono escluse da Git. Vedi `docs/ASSETS.md`.

### Revisione dei contenuti

In sviluppo (`npm run dev`) le slide con contenuti da validare mostrano un badge giallo. Nella build il badge compare solo aggiungendo `?revisione` all'indirizzo. L'elenco completo è in `docs/lezioni/NN/stato.md`.

## Avvio

Node 24 (file .nvmrc), npm e Git.

```sh
npm ci
npx playwright install chromium
npx --no-install playwright-cli install-browser chromium
npm run dev
```

Apri l'indirizzo locale mostrato: la home elenca le lezioni. Frecce: navigazione. F: fullscreen. S: note relatore. Esc: panoramica. Per le note relatore, consenti l'apertura della finestra locale.

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

Le skill richieste sono in `.agents/skills/` e visibili a Claude tramite `.claude/skills/`: `design-taste-frontend`, `web-design-guidelines`, `image-to-code`, `playwright-cli`, `apple-design`, `impeccable` (senza hook; copie distinte in `.agents/skills/` e `.claude/skills/`, agenti ausiliari in `.claude/agents/`). Per l'ispezione browser con Playwright CLI usa `npx --no-install playwright-cli open http://127.0.0.1:5173/`, poi `npx --no-install playwright-cli snapshot` e `npx --no-install playwright-cli close`. `web-design-guidelines` include una copia locale delle regole. La raccolta [awesome-design-md](docs/design-references/README.md) fornisce due riferimenti offline; `DESIGN_SYSTEM.md` resta la guida del progetto. [Provenienza e licenze](docs/third-party-licenses/NOTICE.md).

`image-to-code` può partire da immagini già disponibili in entrambi gli agenti; la fase di generazione richiede che la sessione disponga di uno strumento per creare immagini.

Leggi PROJECT_SPEC.md, DESIGN_SYSTEM.md, LESSON_STRUCTURE.md e docs/ASSETS.md. La lezione 1 è una bozza completa: i contenuti marcati «da validare» richiedono la revisione del docente.

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
