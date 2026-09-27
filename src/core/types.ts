/** Contratto di una lezione: HTML delle slide più la catena narrativa mostrata in basso. */
export interface ChainLink { label: string; segments: string[] }
export interface Lesson {
  id: string;
  title: string;
  chain: ChainLink[];
  slides: string;
}
