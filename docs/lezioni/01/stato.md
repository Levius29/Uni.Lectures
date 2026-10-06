# Lezione 1 · stato

Bozza completa in `src/slides/01/`: 47 slide del testo sorgente più la copertina (48). Dal 6 ottobre 2026 la lezione è una composizione HyperFrames (`public/compositions/01/`, generata con `npm run compose`) al posto di Reveal.js: stessi testi, slide, schemi e note; cambiano motore e navigazione (vista relatore con P, niente panoramica con Esc). Fonte: `protocollo.md` (copia del documento nel progetto Claude «Conservativa 4», 13 settembre 2026).

## Da validare prima di erogare

Nelle slide compaiono come badge giallo in sviluppo o con `?revisione`.

| # | Slide | Cosa | Perché |
|---|---|---|---|
| 1 | 12 · Preparazione parametrica | Riduzioni e spessori della preparazione non ritentiva | Full text di Politano non consultato direttamente |
| 2 | 33 · Spessori | Tabella degli spessori minimi | Allineare alle IFU dei materiali della clinica del corso |
| 3 | 7 · Soglie | 1,5-2 mm e 2,5-3 mm | Coerenza con la convenzione usata nel resto del corso |
| 4 | 42 · Condizionamento | Tempi di mordenzatura con fluoridrico | Variano per marchio e concentrazione |
| 5 | 10 · Due scuole | Contrapposizione Bottacchiari / Politano | Costruzione didattica del corso, da dichiarare in aula |
| 6 | Tutti gli schemi SVG | Anatomia semplificata (molare in sezione, due denti a contatto, profili di margine) | Schemi illustrativi disegnati in codice, non anatomia di riferimento |

## Foto e figure

Segnaposto già presenti in slide (file in `public/assets/clinical/01/` e `public/assets/articoli/01/`, esclusi da Git):

| Codice | Slide | Contenuto |
|---|---|---|
| F1, F2, F3 | 2 | 3.6 occlusale iniziale, Rx endorale, dopo rimozione del restauro |
| F4 | 18 | Build-up in composito |
| F5, F6 | 22 | Matrice sezionale e cuneo; DME completata |
| F7 | 28 | IDS eseguito |
| F10, F11 | 31, 32 | Manufatto in disilicato; in composito o ibrida CAD-CAM |
| F12 | 42 | Mordenzato e non mordenzato affiancati |
| F14 | 46 | Restauro finito |
| A1 | 4 | Fichera, Devoto, Re, QDT 2006, fig. 1-2 |

Non inseriti (indicati nelle note relatore): F8 butt joint occlusale (slide 26), F9 veneerlay in situ (slide 24), F13 cementazione in corso (slide 43), A2 figura di Ferraris (slide 25, sostituita dalla tabella).

## Schemi al posto delle immagini generate

La lista immagini prevedeva 11 schemi da generare con un modello di immagini. Nella versione web sono disegnati in SVG e animati:

| Schema | Slide | Stato |
|---|---|---|
| S1 cuspide-mensola | 7 | SVG, tre passi: dentina interassiale, cavità, carico e flessione |
| S2, S3 preparazione geometrica e parametrica | 11, 12 | SVG, stessa inquadratura |
| S4 costo biologico | 15 | Barre con i dati (70-75%, 32-47%) |
| S5 margine e punto di contatto | 20, 21, 23 | SVG: tre livelli del margine, fascia di contatto, DME e distanza dalla cresta ossea |
| S6 overlay, veneerlay, table-top, corona parziale | 24 | SVG, un restauro per clic |
| S7 disegni di Ferraris | 25 | Solo tabella |
| S8 butt joint e chamfer | 26 | Barre con carico a frattura e gap marginale |
| S9 bisello | 27 | SVG, due profili |
| S10 chiave in silicone | 33 | Non disegnato: la chiave vera gira in aula |
| S11 luce al cemento | 38 | SVG animato, tre manufatti |
| G1, G2, G3 grafiche dati | 26, 35, 40 | Barre HTML con i numeri del testo sorgente |

## Differenze dal testo sorgente

- Copertina aggiunta (slide 0).
- Titoli accorciati dove superavano due righe: «L'asse verticale», «L'asse vestibolare», «Il punto di contatto, zona proibita», «Condizionare il manufatto», «Due evidenze, direzioni opposte», «Il bisello: due oggetti, un nome».
- Testi lunghi della slide spostati nelle note relatore (vista relatore, tasto P): regia, frasi da dire, ponti fra segmenti, contingenza.
- Nomi commerciali assenti, come nel sorgente.
