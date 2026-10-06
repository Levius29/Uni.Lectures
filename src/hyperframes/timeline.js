/* Timeline della lezione, eseguita dentro la composizione HyperFrames.
   Inserita in linea da src/hyperframes/compose.ts: si modifica qui, mai nella copia generata in public/compositions/.

   Ogni scena (una slide) ha data-start, data-duration e data-holds: le tappe dove la navigazione si ferma
   (ingresso completato, poi un frammento per tappa). Tutto il movimento vive in un'unica timeline GSAP in pausa,
   registrata su window.__timelines: la navigazione la percorre in avanti e all'indietro (src/lesson.ts).

   - Ingresso: [data-animate] sale e compare in sequenza; la parola gigante dei divisori entra da destra;
     barre e fasci di luce crescono.
   - Frammenti: .fragment compare alla tappa successiva; con data-step-of imposta data-step sulla figura
     data-steps corrispondente (il CSS disegna ogni stato).
   - Morph: un elemento con lo stesso data-id della slide precedente parte dalla posizione e dimensione
     di quello e arriva alla propria (FLIP). La striscia in alto (data-id="meta") resta ferma.
   - Continuità: gli elementi [data-carry] si copiano, tagliati e tenui, in cima alla slide successiva.
   - Uscita: prima del cambio di scena il contenuto che non prosegue sfuma; il campo sfumato
     si dissolve se la slide successiva ne ha un altro. */
function buildLessonTimeline(T) {
  var root = document.getElementById('root');
  var compositionId = root.getAttribute('data-composition-id');
  var scenes = Array.prototype.slice.call(root.querySelectorAll(':scope > .scene'));
  var all = function (el, sel) { return Array.prototype.slice.call(el.querySelectorAll(sel)); };
  var frameOf = function (scene) { return scene.querySelector(':scope > .frame'); };
  var holdsOf = function (scene) { return scene.getAttribute('data-holds').split(',').map(Number); };

  // Continuità: copia fantasma degli elementi data-carry in cima alla slide successiva.
  scenes.forEach(function (scene, i) {
    var next = scenes[i + 1];
    var carried = all(scene, '[data-carry]');
    if (!next || !carried.length || next.querySelector(':scope > .frame > .ghost-layer')) return;
    var layer = document.createElement('div');
    layer.className = 'ghost-layer';
    layer.setAttribute('aria-hidden', 'true');
    carried.forEach(function (el) {
      var ghost = el.cloneNode(true);
      ['data-carry', 'data-animate', 'aria-label', 'id'].forEach(function (a) { ghost.removeAttribute(a); });
      layer.appendChild(ghost);
    });
    frameOf(next).insertBefore(layer, frameOf(next).firstChild);
  });

  function build() {
    var tl = gsap.timeline({ paused: true });
    var box = function (el, scene) {
      var r = el.getBoundingClientRect(), s = scene.getBoundingClientRect();
      return { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height };
    };
    // Coppie per il morph, misurate prima di creare qualunque tween.
    var plans = scenes.map(function (scene, i) {
      var prev = scenes[i - 1];
      var pairs = [];
      if (prev) all(scene, '[data-id]').forEach(function (el) {
        var src = prev.querySelector('[data-id="' + CSS.escape(el.getAttribute('data-id')) + '"]');
        if (src) pairs.push({
          el: el, src: src, a: box(src, prev), b: box(el, scene),
          oa: Number(getComputedStyle(src).opacity), ob: Number(getComputedStyle(el).opacity),
        });
      });
      return { scene: scene, pairs: pairs };
    });
    // Opacità di riposo dei figli diretti dei telai (es. righe decorative a 0,55), per le uscite.
    var rest = new Map();
    scenes.forEach(function (scene) {
      all(scene, ':scope > .frame *').forEach(function (el) { rest.set(el, Number(getComputedStyle(el).opacity)); });
    });
    var hasInside = function (el, set) { return set.some(function (t) { return t !== el && el.contains(t); }); };
    var isInside = function (el, set) { return set.some(function (t) { return t !== el && t.contains(el); }); };

    plans.forEach(function (plan, i) {
      var scene = plan.scene;
      var start = Number(scene.getAttribute('data-start'));
      var holds = holdsOf(scene);
      // Fine della scena dalle tappe: il runtime HyperFrames riscrive data-duration.
      var end = holds[holds.length - 1] + T.exit;
      var prev = plans[i - 1], next = plans[i + 1];
      var field = scene.getAttribute('data-field') || '';
      var bg = scene.querySelector(':scope > .bg');
      var targets = plan.pairs.map(function (p) { return p.el; });
      var sources = next ? next.pairs.map(function (p) { return p.src; }) : [];

      // Campo sfumato: entra se la slide precedente ne aveva un altro.
      if (bg && prev && (prev.scene.getAttribute('data-field') || '') !== field) {
        tl.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: T.bg, ease: 'power1.out', immediateRender: false }, start);
      }

      // Morph dalla slide precedente.
      plan.pairs.forEach(function (p) {
        var dx = p.a.x - p.b.x, dy = p.a.y - p.b.y;
        var sx = p.b.w ? p.a.w / p.b.w : 1, sy = p.b.h ? p.a.h / p.b.h : 1;
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && Math.abs(sx - 1) < 0.005 && Math.abs(sy - 1) < 0.005 && p.oa === p.ob) return;
        tl.fromTo(p.el,
          { x: dx, y: dy, scaleX: sx, scaleY: sy, opacity: p.oa, transformOrigin: '0 0' },
          { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: p.ob, duration: T.morph, ease: 'power3.inOut' }, start);
      });

      // Ingresso.
      var rising = all(scene, '[data-animate]').filter(function (el) {
        return targets.indexOf(el) < 0 && !hasInside(el, targets) && !isInside(el, targets);
      });
      if (rising.length) tl.fromTo(rising, { opacity: 0, y: T.rise },
        { opacity: 1, y: 0, duration: T.enter, stagger: T.stagger, ease: 'power3.out' }, start + T.delay);
      var marquees = all(scene, '.l-divider .marquee .main');
      if (marquees.length) tl.fromTo(marquees, { x: 220, opacity: 0 },
        { x: 0, opacity: 1, duration: T.marquee, ease: 'power3.out' }, start);
      var fills = all(scene, '.bars .fill');
      if (fills.length) tl.fromTo(fills, { scaleX: 0 },
        { scaleX: 1, duration: T.bars.duration, stagger: T.bars.stagger, ease: 'power3.out' }, start + T.bars.delay);
      [['.beam', T.beam.delay], ['.beam-out', T.beamOut.delay]].forEach(function (b) {
        var els = all(scene, b[0]);
        if (els.length) tl.fromTo(els, { scaleY: 0 },
          { scaleY: 1, duration: T.beam.duration, stagger: T.beam.stagger, ease: 'power3.out' }, start + b[1]);
      });

      // Frammenti: uno per tappa, nell'ordine del documento.
      all(scene, '.fragment').forEach(function (f, k) {
        var at = holds[k] + 0.05;
        tl.fromTo(f, { opacity: 0 }, { opacity: 1, duration: T.frag, ease: 'power1.out' }, at);
        var of = f.getAttribute('data-step-of');
        var fig = of && scene.querySelector('[data-steps="' + of + '"]');
        if (fig) tl.set(fig, { attr: { 'data-step': f.getAttribute('data-step') } }, at);
      });

      // Uscita: sfuma ciò che non prosegue nella slide successiva.
      if (next) {
        var fading = [];
        var collect = function (el) {
          if (sources.indexOf(el) >= 0) return;
          if (!hasInside(el, sources)) { fading.push(el); return; }
          Array.prototype.forEach.call(el.children, collect);
        };
        Array.prototype.forEach.call(frameOf(scene).children, collect);
        // fromTo con l'opacità di riposo misurata: un semplice to() leggerebbe il valore iniziale
        // al primo render, che dipende dall'ordine dei seek.
        fading.forEach(function (el) {
          tl.fromTo(el, { opacity: rest.get(el) }, { opacity: 0, duration: T.exit, ease: 'power1.in', immediateRender: false }, end - T.exit);
        });
        if (bg && (next.scene.getAttribute('data-field') || '') !== field) {
          tl.fromTo(bg, { opacity: 1 }, { opacity: 0, duration: T.exit, ease: 'power1.in', immediateRender: false }, end - T.exit);
        }
      }
    });
    window.__timelines[compositionId] = tl;
  }

  (document.fonts ? document.fonts.ready : Promise.resolve()).then(build);
}
