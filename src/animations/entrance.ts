import { gsap } from 'gsap';

let active: gsap.core.Timeline | undefined;

/**
 * Ingresso della slide: gli elementi [data-animate] salgono e compaiono in sequenza.
 * Il titolo gigante dei divisori entra da destra, solo andando avanti (all'indietro c'è il morph di Reveal).
 */
export function animateSlide(slide: HTMLElement, reducedMotion: boolean, forward = true) {
  active?.progress(1).kill();
  const targets = slide.querySelectorAll('[data-animate]');
  const marquees = slide.querySelectorAll('.l-divider .marquee .main');
  if (reducedMotion) { gsap.set([...targets, ...marquees], { clearProps: 'opacity,transform' }); return; }
  active = gsap.timeline({ defaults: { ease: 'power3.out' } });
  if (forward && marquees.length) active.fromTo(marquees, { x: 220, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1, clearProps: 'opacity,transform' }, 0);
  if (targets.length) active.fromTo(targets, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, clearProps: 'opacity,transform' }, 0.12);
}
