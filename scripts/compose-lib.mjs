// Genera le composizioni HyperFrames di tutte le lezioni in public/compositions/NN/ (ignorate da Git).
// Usato da scripts/compose.mjs (build, test) e dal plugin di vite.config.ts (sviluppo).
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ROOT = resolve(import.meta.dirname, '..');
export const OUT = join(ROOT, 'public/compositions');
const read = p => readFileSync(join(ROOT, p), 'utf8');

/** File da copiare in vendor/ accanto a ogni composizione: nessuna rete in aula. */
function vendorFiles() {
  const gsap = require.resolve('gsap/dist/gsap.min.js');
  const plugins = ['CustomEase', 'DrawSVGPlugin', 'SplitText'].map(p => [join(dirname(gsap), `${p}.min.js`), `${p}.min.js`]);
  const runtime = join(dirname(require.resolve('@hyperframes/core/package.json')), 'dist/hyperframe.runtime.iife.js');
  const fontCss = require.resolve('@fontsource-variable/inter/opsz.css');
  const fonts = [...readFileSync(fontCss, 'utf8').matchAll(/url\(\.\/files\/([^)]+)\)/g)].map(m => m[1]);
  return {
    files: [[gsap, 'gsap.min.js'], ...plugins, [runtime, 'hyperframe.runtime.iife.js'], ...fonts.map(f => [join(dirname(fontCss), 'files', f), `fonts/${f}`])],
    fontFaces: readFileSync(fontCss, 'utf8').replace(/url\(\.\/files\//g, 'url(vendor/fonts/'),
  };
}

export const lessonIds = () => readdirSync(join(ROOT, 'src/slides'), { withFileTypes: true })
  .filter(e => e.isDirectory() && existsSync(join(ROOT, 'src/slides', e.name, 'index.ts'))).map(e => e.name).sort();

/** loadModule: ssrLoadModule di Vite, per importare i sorgenti TypeScript delle lezioni. */
export async function composeAll(loadModule) {
  const { composeLesson } = await loadModule('/src/hyperframes/compose.ts');
  const vendor = vendorFiles();
  const css = [vendor.fontFaces, read('src/styles/tokens.css'), read('src/styles/slides.css'), read('src/styles/figures.css')].join('\n');
  const timelineJs = read('src/hyperframes/timeline.js');
  const written = [];
  for (const id of lessonIds()) {
    const lesson = (await loadModule(`/src/slides/${id}/index.ts`)).default;
    const dir = join(OUT, id);
    mkdirSync(join(dir, 'vendor/fonts'), { recursive: true });
    for (const [from, to] of vendor.files) copyFileSync(from, join(dir, 'vendor', to));
    writeFileSync(join(dir, 'index.html'), composeLesson(lesson, { css, timelineJs }).html);
    written.push(id);
  }
  return written;
}
