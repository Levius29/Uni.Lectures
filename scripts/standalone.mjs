// npm run standalone: la lezione in un solo file HTML (script e font in linea), in due versioni.
// - dist/standalone/Conservativa4-LezioneNN.html: presentazione navigabile (player e slideshow HyperFrames).
// - dist/standalone/Conservativa4-LezioneNN-revisione.html: tutte le slide nella pagina, una sotto l'altra,
//   nello stato finale, con note relatore e badge «Da validare». Niente iframe: ogni elemento si può
//   selezionare e commentare (pagina pubblicata nel pannello di Claude).
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

// 3. File unico, documento completo: si apre con doppio clic, senza server né rete.
const title = comp.match(/<title>([^<]*)<\/title>/)?.[1] ?? `Lezione ${Number(id)}`;
const html = `<!doctype html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="theme-color" content="#0e1013">
<style>
${css}
:root { padding: 0 !important; }
</style>
<script>window.__LESSON_STANDALONE__ = ${noClose(JSON.stringify({ id, composition: comp, review: true }))};</script>
<script type="module">
${noClose(js)}
</script>
</head>
<body></body>
</html>
`;
mkdirSync(outDir, { recursive: true });
const file = join(outDir, `Conservativa4-Lezione${id}.html`);
writeFileSync(file, html);
console.log(`${file.slice(ROOT.length + 1)} (${(html.length / 1024 / 1024).toFixed(1)} MB)`);

// 4. Revisione: la composizione direttamente nella pagina.
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const style = comp.match(/<style>([\s\S]*?)<\/style>/)[1];
const vendorScripts = [...comp.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
// Ordine in compose.ts: gsap, CustomEase, DrawSVG, SplitText, runtime HyperFrames, poi la timeline.
// La revisione non usa il runtime: niente orologio, le scene restano tutte visibili.
const timeline = vendorScripts.pop();
const manifest = JSON.parse(comp.match(/<script type="application\/hyperframes-slideshow\+json">([\s\S]*?)<\/script>/)[1].replace(/<\\\//g, '</'));
let root = comp.match(/<div id="root"[\s\S]*?\n<\/div>\n(?=<script>)/)[0];
let n = 0;
root = root.replace(/<section id="(s\d+)" class="scene[^>]*>[\s\S]*?\n<\/section>/g, (scene, sid) => {
  const i = n++;
  const label = scene.match(/data-label="([^"]*)"/)?.[1] ?? '';
  const verify = scene.match(/data-verify="([^"]*)"/)?.[1];
  const notes = manifest.slides.find(x => x.sceneId === sid)?.notes ?? '';
  const badge = verify ? `<p class="review-verify"><b>Da validare</b>${verify}</p>\n` : '';
  return `<h2 class="review-head" id="slide-${i + 1}"><span>${i + 1}</span>${label}</h2>
${badge}${scene}
${notes ? `<aside class="review-notes"><b>Note relatore</b>${esc(notes)}</aside>` : ''}`;
});
const total = n;
const reviewHtml = `<title>${title} · revisione</title>
<style>
${style}
html, body { background: var(--bg); color: var(--ink); }
html.print-pdf, html.print-pdf body { width: auto; overflow-x: hidden; }
:root { padding: 0 !important; }
.review-bar { position: sticky; top: env(safe-area-inset-top, 0px); z-index: 30; display: flex; flex-wrap: wrap; gap: 4px 16px; align-items: baseline; padding: 12px 16px; background: rgba(14, 16, 19, 0.92); border-bottom: 1px solid var(--rule); font: 15px/1.4 var(--font); color: var(--muted); }
.review-bar b { color: var(--ink); font-weight: 600; }
html.print-pdf #root { width: 1600px; zoom: var(--k, 1); margin: 0 auto; padding: 24px 0 96px; }
.review-head { display: flex; gap: 20px; align-items: baseline; margin: 72px 0 18px !important; font: 600 34px/1.2 var(--font) !important; letter-spacing: -0.02em !important; color: var(--ink); }
.review-head span { color: var(--accent); font-variant-numeric: tabular-nums; }
html.print-pdf .scene { border-radius: 18px; }
.review-verify { display: flex; flex-wrap: wrap; gap: 4px 14px; align-items: baseline; margin: 0 0 18px; padding: 12px 18px; font: 24px/1.35 var(--font); background: #3a2e12; color: #ffd98a; border: 1px solid #8a6a26; border-radius: 10px; }
.review-verify b { letter-spacing: 0.06em; text-transform: uppercase; font-size: 20px; }
.review-notes { display: flex; flex-direction: column; gap: 10px; max-width: 1400px; margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--rule); white-space: pre-line; font: 26px/1.5 var(--font); color: var(--muted); }
.review-notes b { color: var(--ink); font-weight: 600; font-size: 22px; letter-spacing: 0.02em; }
</style>
<header class="review-bar"><b>${title}</b><span>${total} slide nello stato finale, con note relatore. Seleziona un elemento per commentarlo.</span></header>
${root}
${vendorScripts.slice(0, -1).map(s => `<script>${s}</script>`).join('\n')}
<script>
window.__timelines = {};
window.__LESSON_REVIEW__ = true;
(function () {
  var fit = function () { document.documentElement.style.setProperty('--k', String(Math.min(1, (innerWidth - 32) / 1600))); };
  fit();
  addEventListener('resize', fit);
})();
${timeline}
</script>
`;
const reviewFile = join(outDir, `Conservativa4-Lezione${id}-revisione.html`);
writeFileSync(reviewFile, reviewHtml);
console.log(`${reviewFile.slice(ROOT.length + 1)} (${(reviewHtml.length / 1024 / 1024).toFixed(1)} MB, ${total} slide)`);
