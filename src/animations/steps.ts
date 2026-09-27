/**
 * Stato delle figure guidato dai frammenti Reveal.
 * Una figura con data-steps="nome" riceve data-step = indice più alto fra i frammenti
 * visibili con data-step-of="nome". Il CSS disegna ogni stato; con movimento ridotto il cambio è istantaneo.
 */
export function syncSteps(slide: Element | undefined) {
  if (!slide) return;
  slide.querySelectorAll<HTMLElement>('[data-steps]').forEach(fig => {
    let step = 0;
    slide.querySelectorAll<HTMLElement>(`.fragment.visible[data-step-of="${fig.dataset.steps}"]`).forEach(f => {
      step = Math.max(step, Number(f.dataset.step ?? 0));
    });
    fig.dataset.step = String(step);
  });
}
