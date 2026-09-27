# Sistema visivo

Riferimento di stile scelto da Francesco: presentazione Canva «Gradient Texture UI Morph Slides» (SlidesCarnival), vista il 27 settembre 2026. Se ne riprendono linguaggio e movimento, non contenuti, immagini o marchi.

## Tela
Formato 16:9, tela 1600×900 a tutto schermo (margine Reveal 0). Margini interni del telaio: 92 px in alto (sotto la striscia), 88 px ai lati, 44 px in basso. `center: false`: titolo sempre in alto.

## Colore
Fondo quasi nero `#0E1013` con grana leggera su tutto. Testo `#F3F1EC`, secondario `#9CA3A7`, superfici `#171A1F` e `#20242A`, filetti bianco al 14%. Un solo accento, corallo `#FF8F5E`: parole chiave, righe chiave delle tabelle, numeri delle liste.

Il colore pieno vive solo nei **campi sfumati** a tutto schermo (sfondi Reveal): copertina e divisori di segmento. Cinque campi, variabili in `src/styles/theme.css`: `warm` (arancio-rosa), `blue` (blu-viola), `coral`, `amber`, `mint`. Lezione 1: copertina e S1/S7 warm, S3 coral, S4 mint, S5 amber, S6 blue. Le affermazioni restano scure, con righe orizzontali sfumate nel colore del segmento.

## Tipografia
Inter variabile (locale, OFL, nessun font remoto). Titoli 700 con spaziatura stretta: copertina 150 px, slide 72 px, affermazioni 84 px, titolo gigante dei divisori 190 px. Corpo 32 px, tabelle 27 px, didascalie e fonti 22-24 px, striscia in alto 20 px. Enfasi con il colore d'accento, non con un secondo carattere.

## Impaginazioni
- Copertina (`l-cover`): campo sfumato, titolo enorme in basso a sinistra.
- Divisore (`l-divider`): campo sfumato, parola breve ripetuta in grande che esce dai bordi («Due scuole - Due scuole - …»), sotto il titolo completo e i minuti.
- Affermazione (`l-statement`): testo grande su fondo scuro, righe decorative a destra.
- Contenuto: titolo + `.body` a una o due colonne. Blocchi affiancati (`.pair`) come schede con angoli di 18 px.
- Striscia in alto su ogni slide: corso e lezione a sinistra, catena narrativa a destra con l'anello corrente sottolineato.

## Movimento
- **Morph** (Reveal Auto-Animate) fra slide consecutive: gli elementi con lo stesso `data-id` si spostano e si ridimensionano (0,8 s). Esempi: la foto del caso da grande a pannello, lo schema che resta fermo mentre cambia il testo.
- **Continuità**: il titolo della copertina e la parola gigante dei divisori (`data-carry`) salgono e restano, tagliati e tenui, in cima alla slide successiva.
- **Ingresso**: gli elementi `data-animate` salgono di 28 px in 0,6 s, in sequenza di 80 ms; la parola gigante dei divisori entra da destra.
- Schemi: stati guidati dai frammenti (450-700 ms). Barre e luce crescono all'ingresso.
- Con `prefers-reduced-motion` tutto è istantaneo e il morph è spento. Niente loop decorativi.

## Schemi SVG
Su fondo scuro: restauro teal `#4FB8B1`, smalto `#F6F3EC`, dentina `#DCC9A0`, polpa `#CF8A7C`, gengiva `#CF9087`, osso `#7D766A`, contorni `#B8C0C4`, luce di polimerizzazione blu `#5B9CFF`. Il corallo segnala ciò che va notato (carico, zona proibita, linea di finitura). Etichette ≥ 25 px sulla tela, didascalia «Schema illustrativo». Forme semplificate, da validare dal docente.

## Foto
Segnaposto a scheda scura con codice (F1…). Le foto approvate riempiono la scheda (`object-fit: cover`), angoli 18 px, nessuna scritta sopra. Didascalie neutrali, nessun identificativo paziente.

## Dati
Barre solo con numeri del testo sorgente, fonte in slide. Intervalli: barra piena fino al minimo e banda tratteggiata fino al massimo; intervalli di misura come barra flottante.

## Testo
Nessun trattino lungo nel testo visibile. Virgolette caporali «». Una sola idea per slide; il resto nelle note relatore.
