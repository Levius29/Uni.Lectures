import { gsap } from 'gsap';
let active: gsap.core.Tween | undefined;
export function animateSlide(slide: HTMLElement, reducedMotion: boolean) {
  active?.progress(1).kill();
  const targets = slide.querySelectorAll('[data-animate]');
  if (reducedMotion) { gsap.set(targets, { clearProps: 'all' }); return; }
  active = gsap.fromTo(targets, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, clearProps: 'all' });
}
