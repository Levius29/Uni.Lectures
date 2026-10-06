# Lezione 1 · da fare (passaggio ad Astra)

Stato al 27 settembre 2026, lasciato da Claude. Contesto: `stato.md` (cosa c'è e cosa manca), `immagini.md` (prompt), `protocollo.md` (testo sorgente), `DESIGN_SYSTEM.md` (stile scuro con morph).

## 1. Allineare la repo

I primi 3 commit (struttura multi-lezione, lezione 1, stile Canva, fix build) arrivano come patch sopra `c58c726`, insieme a questo file:

```sh
git am *.patch
npm ci
npm run build && npm test
git push
```

Il push dalla sessione cloud di Claude non è autorizzato: va fatto dal Mac.

## 2. Immagini con GPT Image 2

Francesco vuole generare con GPT Image 2 molte delle immagini previste in `immagini.md`.

**Regole (AGENTS.md):**

- sempre etichetta «Schema illustrativo», mai presentarle come casi clinici;
- revisione dell'anatomia da parte del docente prima dell'uso;
- per ogni file, registrare in `docs/ASSETS.md` o in un file accanto: modello, prompt, data, finalità didattica.

**Stile, adattato al tema scuro.** La ricetta in `immagini.md` prevede un fondo chiaro, che stonerebbe sulle slide scure. Proposta:

- fondo trasparente (PNG con alfa, poi WebP), oppure fondo `#0E1013`;
- palette dei tessuti uguale agli schemi SVG: smalto `#F6F3EC`, dentina `#DCC9A0`, polpa `#CF8A7C`, gengiva `#CF9087`, osso `#7D766A`, contorni `#B8C0C4`;
- restauro in teal `#4FB8B1`, unico accento;
- nessun testo nell'immagine: le etichette le mette la slide.

Generare tutto nella stessa sessione, perché lo stile resti coerente.

**Dove vanno e come si collegano:**

1. File in `public/assets/ai/01/S2.webp` (codici S1-S11 di `immagini.md`). Questa cartella è in Git.
2. In `vite.config.ts` aggiungere `'public/assets/ai'` all'elenco `dirs` del plugin `localAssets`, così le immagini presenti vengono caricate e quelle mancanti restano segnaposto.
3. In slide: `slot({ src: 'assets/ai/01/S2.webp', code: 'S2', caption: '…' })`. La didascalia comincia con «Schema illustrativo». Per gli schemi va meglio `object-fit: contain` al posto di `cover` (classe dedicata in `theme.css`).

**Dove conviene l'immagine generata e dove tenere l'SVG animato:**

| Codice | Slide | Proposta |
|---|---|---|
| S1 cuspide non supportata | 7 | Tenere l'SVG animato: i tre passi sono la spiegazione |
| S2, S3 preparazione geometrica e parametrica | 11, 12 | Immagine generata, stessa inquadratura. Il morph fra le due slide funziona se entrambe usano lo stesso `data-id` sulla figura |
| S4 costo biologico | 15 | Immagine (tre sezioni) accanto alle barre, che restano |
| S5 margine e contatto | 20, 21 | Tenere l'SVG (livelli a clic). Generare la variante con matrice e cuneo per la slide 21 o 22 |
| S6 overlay, veneerlay, table-top, corona | 24 | Tenere l'SVG animato; eventualmente un'immagine di riepilogo con le quattro varianti |
| S7 disegni di Ferraris | 25 | Immagine generata accanto alla tabella |
| S8 butt joint e chamfer | 26 | Immagine dei tre profili accanto alle barre |
| S9 bisello | 27 | Immagine generata al posto dei due profili SVG |
| S10 chiave in silicone | 33 | Immagine generata (oggi manca) |
| S11 luce al cemento | 38 | Tenere l'SVG animato, oppure immagine se più chiara |

Facoltativo, nello stile Canva: immagini a tutto schermo non cliniche per copertina e divisori (blocchetto di ceramica, fresa, lampada fotopolimerizzatrice), dichiarate come illustrazioni.

## 3. Da validare con Francesco

I 5 punti in `stato.md`: soglie, spessori da IFU, parametri di Politano, tempi del fluoridrico, attribuzione delle due scuole. Più l'anatomia di tutti gli schemi. In revisione i badge si vedono con `?revisione` o con `npm run dev`.

## 4. Foto cliniche

Le fornisce Francesco. Passaggi: `clinical-originals/` → `npm run images:prepare` → controllo manuale → `public/assets/clinical/01/F1.webp`…`F14.webp` (fuori da Git). F8, F9, F13 non hanno ancora un posto in slide (vedi `stato.md`).

## 5. Verifiche tecniche

- Morph e ingressi su browser reale e proiettore. In Playwright headless funzionano; nell'anteprima artifact di Claude non sono stati osservati a finestra attiva.
- Proiettore 16:10: la tela è 16:9 a tutto schermo, controllare bande e titoli giganti dei divisori.
- Stampa PDF (`?print-pdf`): una pagina per slide, frammenti mostrati, schemi nello stato finale (coperto da test). Le foto cliniche, se presenti, finiscono nel PDF: non distribuirlo agli studenti senza controllo.
- CI: Playwright ora testa la build (`vite preview`).

## 6. Lezione 2

Il testo sorgente è nel progetto Claude (`claude/lezione-02-flusso-digitale.md`), non ancora nella repo. Stessa struttura: `lezioni/02/index.html`, `src/slides/02/`, voce in `src/lessons.ts`.
