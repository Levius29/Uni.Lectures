// Lint HyperFrames di ogni composizione generata: gli errori bloccano npm test.
import { execFileSync } from 'node:child_process';
import { lessonIds } from './compose-lib.mjs';

for (const id of lessonIds()) {
  execFileSync('npx', ['--no-install', 'hyperframes', 'lint', `public/compositions/${id}`], { stdio: 'inherit', env: { ...process.env, HYPERFRAMES_NO_TELEMETRY: '1', DO_NOT_TRACK: '1' } });
}
