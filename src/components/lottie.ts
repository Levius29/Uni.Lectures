import { DotLottie } from '@lottiefiles/dotlottie-web';
import wasmUrl from '@lottiefiles/dotlottie-web/dotlottie-player.wasm?url';
import { siteUrl } from '../core/site';
DotLottie.setWasmUrl(wasmUrl);
/** Local assets only. Caller must invoke destroy() when removing the component. */
export function createLottie(canvas: HTMLCanvasElement, relativePath: string) {
  if (!/^assets\/lottie\/[\w./-]+$/.test(relativePath) || relativePath.includes('..')) throw new Error('Use a local assets/lottie path');
  return new DotLottie({ canvas, src: siteUrl(relativePath), autoplay: !matchMedia('(prefers-reduced-motion: reduce)').matches, loop: false });
}
