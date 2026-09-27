# Gestione immagini

1. Conserva gli originali in clinical-originals/, fuori da public/. Non usare nomi paziente nei nuovi file.
2. Esegui npm run images:prepare. Le copie vanno in clinical-processed/, con nomi neutrali e metadati rimossi.
3. Controlla manualmente scritte, volti e altri elementi identificativi. La rimozione EXIF non equivale ad anonimizzazione.
4. Inserisci soltanto copie autorizzate e revisionate in public/assets/clinical/NN/, con il codice della slide come nome (es. public/assets/clinical/01/F1.webp). L'elenco dei codici è in docs/lezioni/NN/immagini.md. Il file sostituisce da solo il segnaposto.
5. Queste copie non entrano in Git, ma entrano nella build e sono visibili a chi riceve il sito. Prima di distribuire dist/, revisiona tutti gli asset e le note.

Gli altri collaboratori dovranno ricevere separatamente le copie approvate tramite canale appropriato. Per asset AI e Lottie registra origine, licenza e finalità didattica; evita servizi esterni per foto cliniche senza esplicita autorizzazione.

Figure da articolo (codici A1, A2...): public/assets/articoli/NN/A1.webp, escluse da Git per diritti d'autore. Citazione sempre in slide.
