/** Catalogo del corso. Una lezione diventa "pronta" quando esiste lezioni/NN/index.html e src/slides/NN/. */
export interface LessonEntry {
  id: string;
  title: string;
  minutes: number;
  status: 'bozza' | 'in preparazione';
}

export const course = {
  title: 'Conservativa 4',
  subtitle: 'Restaurativa indiretta. III anno, II semestre.',
  totalLessons: 16,
};

export const lessons: LessonEntry[] = [
  { id: '01', title: 'Il restauro indiretto parziale: dalla decisione strutturale alla cementazione', minutes: 90, status: 'bozza' },
  { id: '02', title: 'Il flusso digitale: dalla scansione al manufatto', minutes: 90, status: 'in preparazione' },
];
