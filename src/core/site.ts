/** Radice del sito relativa alla pagina corrente (letta da <meta name="site-root">). */
export function siteUrl(path: string): string {
  const root = document.querySelector<HTMLMetaElement>('meta[name="site-root"]')?.content ?? './';
  return new URL(root + path, location.href).href;
}
