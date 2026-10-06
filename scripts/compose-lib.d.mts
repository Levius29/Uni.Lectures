export const OUT: string;
export function lessonIds(): string[];
export function composeAll(loadModule: (path: string) => Promise<Record<string, any>>): Promise<string[]>;
