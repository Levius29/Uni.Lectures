// npm run compose: rigenera public/compositions/NN/index.html dalle lezioni in src/slides/.
import { createServer } from 'vite';
import { composeAll } from './compose-lib.mjs';

const server = await createServer({ server: { middlewareMode: true, hmr: false, watch: null }, appType: 'custom', logLevel: 'error' });
try {
  const ids = await composeAll(p => server.ssrLoadModule(p));
  console.log(`Composizioni HyperFrames generate: ${ids.map(id => `public/compositions/${id}/`).join(', ')}`);
} finally {
  await server.close();
}
