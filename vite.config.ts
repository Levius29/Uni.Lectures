import { defineConfig, type Plugin } from 'vite';
import { existsSync, readdirSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { composeAll } from './scripts/compose-lib.mjs';

// Ogni cartella lezioni/NN con un index.html diventa una pagina della build.
const lessons = readdirSync('lezioni').filter(id => existsSync(resolve('lezioni', id, 'index.html'))).sort();
const input = Object.fromEntries([
  ['home', resolve('index.html')],
  ...lessons.map(id => [`lezione-${id}`, resolve('lezioni', id, 'index.html')]),
]);

/**
 * Elenco delle immagini locali (foto cliniche approvate, figure da articolo) presenti in public/.
 * Le slide caricano solo i file elencati: niente richieste 404 per i segnaposto.
 * I file restano fuori da Git; qui passano solo i nomi (neutri, es. 01/F1.webp).
 */
function localAssets(): Plugin {
  const id = 'virtual:local-assets';
  const dirs = ['public/assets/clinical', 'public/assets/articoli'].map(d => resolve(d));
  const walk = (dir: string): string[] => existsSync(dir)
    ? readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(dir, e.name)) : /\.(webp|jpe?g|png|avif)$/i.test(e.name) ? [join(dir, e.name)] : [])
    : [];
  return {
    name: 'local-assets',
    resolveId: s => (s === id ? `\0${id}` : undefined),
    load: s => (s === `\0${id}` ? `export default ${JSON.stringify(dirs.flatMap(walk).map(f => relative(resolve('public'), f).split('\\').join('/')))};` : undefined),
    configureServer(server) {
      server.watcher.add(dirs);
      const refresh = (file: string) => {
        if (!dirs.some(d => file.startsWith(d))) return;
        const mod = server.moduleGraph.getModuleById(`\0${id}`);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', refresh);
      server.watcher.on('unlink', refresh);
    },
  };
}

/**
 * In sviluppo rigenera le composizioni HyperFrames (public/compositions/NN/) all'avvio
 * e a ogni modifica di slide, componenti, stili o timeline, poi ricarica la pagina.
 * In build lo fa scripts/compose.mjs prima di vite build.
 */
function compositions(): Plugin {
  const watched = ['src/slides', 'src/components', 'src/styles', 'src/hyperframes'].map(d => resolve(d));
  return {
    name: 'hyperframes-compositions',
    apply: 'serve',
    async configureServer(server) {
      const run = () => composeAll((p: string) => server.ssrLoadModule(p)).catch((e: unknown) => server.config.logger.error(String(e)));
      await run();
      let timer: ReturnType<typeof setTimeout> | undefined;
      server.watcher.on('change', file => {
        if (!watched.some(d => file.startsWith(d))) return;
        clearTimeout(timer);
        timer = setTimeout(async () => { await run(); server.ws.send({ type: 'full-reload' }); }, 80);
      });
    },
  };
}

export default defineConfig({
  base: './',
  appType: 'mpa',
  plugins: [localAssets(), compositions()],
  server: { host: '127.0.0.1' },
  preview: { host: '127.0.0.1' },
  build: { rollupOptions: { input } },
});
