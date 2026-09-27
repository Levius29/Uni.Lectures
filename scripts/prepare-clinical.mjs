import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
const source = path.resolve('clinical-originals');
const destination = path.resolve('clinical-processed');
await mkdir(source, { recursive: true });
await mkdir(destination, { recursive: true });
const files = (await readdir(source)).filter(name => /\.(jpe?g|png|tiff?|webp)$/i.test(name)).sort();
if (!files.length) { console.log('Nessuna immagine da elaborare in clinical-originals/.'); process.exit(0); }
// Unique batch directory avoids overwriting previously reviewed images.
const batch = path.join(destination, new Date().toISOString().replace(/[:.]/g, '-'));
await mkdir(batch);
for (const [index, file] of files.entries()) {
  await sharp(path.join(source, file)).rotate().resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true }).webp({ quality: 88 }).toFile(path.join(batch, `image-${String(index + 1).padStart(3, '0')}.webp`));
}
console.log(`${files.length} immagini elaborate in clinical-processed/. Revisionare dati visibili prima di inserirle nelle slide. Metadati rimossi; anonimizzazione visiva non automatica.`);
