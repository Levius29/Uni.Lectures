import { mountLesson } from './core/deck';
import type { Lesson } from './core/types';

// Ogni lezione vive in src/slides/NN/index.ts ed è caricata solo dalla sua pagina.
const modules = import.meta.glob<{ default: Lesson }>('./slides/*/index.ts');
const id = document.body.dataset.lesson ?? '';
const load = modules[`./slides/${id}/index.ts`];
if (!load) throw new Error(`Lezione ${id} non trovata in src/slides/`);
await mountLesson((await load()).default);
