# Claude Code

Leggi e applica AGENTS.md: fonte unica delle istruzioni condivise.
Leggi anche PROJECT_SPEC.md, DESIGN_SYSTEM.md e LESSON_STRUCTURE.md.

Comandi: npm ci; npm run dev; npm run compose; npm run lint:hf; npm run build; npm test. Le lezioni sono composizioni HyperFrames: vedi AGENTS.md.
Usa lo stesso package-lock.json di Codex. Non creare copie del progetto o configurazioni globali.
Le skill condivise sono in `.claude/skills/` e puntano agli stessi file letti da Codex in `.agents/skills/`. Apri questa repo come directory di progetto per renderle disponibili. Eccezione: `impeccable` ha copie separate per Claude e Codex; aggiornale solo con `npm run skills:sync` (vedi AGENTS.md).
