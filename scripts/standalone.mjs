// npm run standalone: la lezione in un solo file HTML (player, composizione, script, font in linea).
// Uscita: dist/standalone/Conservativa4-LezioneNN.html, pronto da aprire o pubblicare come pagina da commentare.
// Le foto cliniche non entrano mai: l'elenco delle immagini locali qui è vuoto, restano i segnaposto.
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { build } from 'vite';

const ROOT = resolve(import.meta.dirname, '..');
const id = process.argv[2] ?? '01';
const compDir = join(ROOT, 'public/compositions', id);
const tmp = join(ROOT, 'dist/.standalone-build');
const outDir = join(ROOT, 'dist/standalone');
const noClose = s => s.replace(/<\/script/gi, '<\\/script');

// 1. Composizione autonoma: script di vendor/ in linea, font come data URI.
let comp = readFileSync(join(compDir, 'index.html'), 'utf8');
comp = comp.replace(/<script src="vendor\/([^"]+)"><\/script>/g, (_, f) => `<script>${noClose(readFileSync(join(compDir, 'vendor', f), 'utf8'))}</script>`);
// Solo i sottoinsiemi latini di Inter: bastano all'italiano e ai simboli usati.
comp = comp.replace(/\/\* inter-(?!latin)[\s\S]*?\}\s*/g, '');
comp = comp.replace(/url\(vendor\/fonts\/([^)]+)\)/g, (_, f) => `url(data:font/woff2;base64,${readFileSync(join(compDir, 'vendor/fonts', f)).toString('base64')})`);
if (/vendor\//.test(comp)) throw new Error('Riferimenti a vendor/ rimasti nella composizione');

// 2. Pagina della lezione in un solo modulo, senza foto locali.
rmSync(tmp, { recursive: true, force: true });
await build({
  configFile: false, root: ROOT, logLevel: 'warn',
  plugins: [{ name: 'no-local-assets', resolveId: s => (s === 'virtual:local-assets' ? '\0virtual:local-assets' : undefined), load: s => (s === '\0virtual:local-assets' ? 'export default [];' : undefined) }],
  build: {
    outDir: tmp, emptyOutDir: true, assetsInlineLimit: 100_000_000, cssCodeSplit: false, modulePreload: false,
    lib: { entry: join(ROOT, 'src/lesson.ts'), formats: ['es'], fileName: () => 'lesson.js' },
    rollupOptions: { output: { codeSplitting: false } },
  },
});
const js = readFileSync(join(tmp, 'lesson.js'), 'utf8');
const css = readdirSync(tmp).filter(f => f.endsWith('.css')).map(f => readFileSync(join(tmp, f), 'utf8')).join('\n');
rmSync(tmp, { recursive: true, force: true });

// 3. File unico. Niente doctype né head: va bene aperto da solo e come pagina pubblicata.
const title = comp.match(/<title>([^<]*)<\/title>/)?.[1] ?? `Lezione ${Number(id)}`;
const html = `<title>${title}</title>
<meta name="theme-color" content="#0e1013">
<style>
${css}
:root { padding: 0 !important; }
</style>
<script>window.__LESSON_STANDALONE__ = ${noClose(JSON.stringify({ id, composition: comp, review: true }))};</script>
<script type="module">
${noClose(js)}
</script>
`;
mkdirSync(outDir, { recursive: true });
const file = join(outDir, `Conservativa4-Lezione${id}.html`);
writeFileSync(file, html);
console.log(`${file.slice(ROOT.length + 1)} (${(html.length / 1024 / 1024).toFixed(1)} MB)`);
