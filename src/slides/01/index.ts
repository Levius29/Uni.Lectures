import type { Lesson } from '../../core/types';
import { CHAIN_LINKS } from './chain';
import { cover, s1, s2 } from './s1-s2';
import { s3, s4 } from './s3-s4';
import { s5, s6, s7 } from './s5-s7';

/** Lezione 1. Fonte: docs/lezioni/01/protocollo.md (46 slide più copertina; «Si rivota» tolta, vedi rivoto in s5-s7.ts). */
const lesson: Lesson = {
  id: '01',
  title: 'Il restauro indiretto parziale',
  chain: CHAIN_LINKS,
  slides: [cover, ...s1, ...s2, ...s3, ...s4, ...s5, ...s6, ...s7],
};
export default lesson;
