/** Contratto di una lezione: slide più la catena narrativa mostrata nella striscia in alto. */
export interface ChainLink { label: string; segments: string[] }

/** Campi sfumati disponibili (variabili in src/styles/tokens.css). */
export type Field = 'warm' | 'blue' | 'coral' | 'amber' | 'mint';

/** Una slide: diventa una scena della composizione HyperFrames (vedi src/hyperframes/compose.ts). */
export interface Slide {
  /** Segmento della lezione (es. "S3"): pilota la catena nella striscia in alto. "cover" per la copertina. */
  seg: string;
  /** Classe di impaginazione del telaio: l-cover, l-divider, l-statement o vuota. */
  layout?: string;
  /** Campo sfumato a tutto schermo come sfondo. */
  field?: Field;
  /** Righe decorative orizzontali (colore del segmento). */
  stripes?: string;
  /** Contenuto da validare dal docente: compare come badge solo in revisione. */
  verify?: string;
  /** Note relatore in testo semplice (vista relatore, tasto P). */
  notes: string;
  /** HTML del telaio. */
  body: string;
}

export interface Lesson {
  id: string;
  title: string;
  chain: ChainLink[];
  slides: Slide[];
}
