// npm run compose: rigenera public/compositions/NN/index.html dalle lezioni in src/slides/.
import { createServer } from 'vite';
import { composeAll } from './compose-lib.mjs';

// Senza vite.config.ts: niente plugin di sviluppo né scansione delle dipendenze, solo il caricamento dei moduli TypeScript.
const server = await createServer({ configFile: false, server: { middlewareMode: true, hmr: false, watch: null }, appType: 'custom', logLevel: 'error', optimizeDeps: { noDiscovery: true, entries: [] } });
try {
  const ids = await composeAll(p => server.ssrLoadModule(p));
  console.log(`Composizioni HyperFrames generate: ${ids.map(id => `public/compositions/${id}/`).join(', ')}`);
} finally {
  await server.close();
}
