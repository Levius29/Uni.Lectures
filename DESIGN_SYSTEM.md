# Sistema visivo

Formato 16:9, canvas 1600×900, margine 7%. Sfondo carta #F5F2EB, testo #18383D, accento terracotta #A55337, testo secondario #52696B. Font locali: Georgia per titoli, Arial per testo.

Titolo 125 px circa, titolo sezione 74 px, corpo 32 px, testo secondario almeno 25 px sul canvas. Una tesi per slide, massimo tre colonne; foto protagoniste e mai deformate. Didascalie neutrali, nessun identificativo paziente.

Motion: ingresso di 18 px in 450 ms, sequenza 80 ms. Evitare loop decorativi. Con prefers-reduced-motion: niente animazioni. Frecce e overlay devono restare leggibili senza colore o movimento.

Immagini AI: etichetta «Schema illustrativo», revisione anatomica del docente. Foto: annotazioni su copie, originali invariati. Verificare leggibilità sul proiettore e assenza di ritagli indesiderati.

## Tela e impaginazione
Reveal a 1600×900 con margine 7%, `center: false`: ogni slide è un telaio (`.frame`) con titolo in alto. Impaginazioni: copertina (`l-cover`), divisore di segmento (`l-divider`, numero grande e catena), affermazione (`l-statement`), contenuto (titolo + `.body` a una o due colonne). Titolo slide 74 px, max due righe. Tabelle 28 px, didascalie e fonti 25 px.

## Catena narrativa
In basso a sinistra, fuori dalla tela, la catena della lezione evidenzia l'anello corrente (lezione 1: Quando indiretto › Come preparo › Con che materiale › Con che cemento). Sostituisce le etichette sopra i titoli: niente occhielli numerati su ogni slide.

## Schemi SVG
Palette solo per gli schemi: restauro teal `#2F7A78` (il materiale di cui parla lo schema, coerente con la ricetta delle immagini AI), smalto `#FBF9F4`, dentina `#E7D9B8`, polpa `#D9A99B`, gengiva `#E2B4AA`, osso `#D6CEBD`, contorni `#52696B`, luce di polimerizzazione blu `#3D78C4`. Il terracotta resta l'accento: segnala ciò che va notato (carico, zona proibita, linea di finitura). Etichette nello schema ≥ 25 px sulla tela, con linea guida; didascalia «Schema illustrativo». Le forme sono semplificazioni, da validare dal docente.

## Movimento
Ingresso GSAP (18 px, 450 ms, sequenza 80 ms). Gli schemi cambiano stato a ogni frammento con transizioni di opacità e trasformazione (450-700 ms). Barre dati e luce crescono all'ingresso della slide. Con movimento ridotto tutto è istantaneo. In panoramica e stampa gli schemi mostrano lo stato finale.

## Dati
Barre solo con numeri presenti nel testo sorgente della lezione, con fonte in slide. Intervalli: barra piena fino al minimo e banda tratteggiata fino al massimo; intervalli di misura come barra flottante.

## Testo
Nessun trattino lungo nel testo visibile. Virgolette caporali «». Una sola idea per slide; il resto va nelle note relatore.
