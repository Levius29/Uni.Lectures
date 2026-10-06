/* Timeline della lezione, eseguita dentro la composizione HyperFrames.
   Inserita in linea da src/hyperframes/compose.ts: si modifica qui, mai nella copia generata in public/compositions/.

   Ogni scena (una slide) ha data-start, data-duration e data-holds: le tappe dove la navigazione si ferma
   (ingresso completato, poi un frammento per tappa). Tutto il movimento vive in un'unica timeline GSAP in pausa,
   registrata su window.__timelines: la navigazione la percorre in avanti e all'indietro (src/lesson.ts).

   - Ingresso: [data-animate] sale e compare in sequenza; tabelle ed elenchi entrano riga per riga;
     le affermazioni salgono parola per parola (SplitText); i numeri grandi contano fino al valore;
     gli schemi si costruiscono (contorni disegnati con DrawSVG, tessuti, restauro, linee guida, etichette),
     salvo che arrivino per morph; la parola gigante dei divisori entra da destra; barre e fasci di luce crescono.
   - Frammenti: .fragment sale di poco e compare alla tappa successiva; con data-step-of imposta data-step sulla figura
     data-steps corrispondente (il CSS disegna ogni stato).
   - Morph: un elemento con lo stesso data-id della slide precedente parte dalla posizione e dimensione
     di quello e arriva alla propria (FLIP). La striscia in alto (data-id="meta") resta ferma.
   - Continuità: gli elementi [data-carry] si copiano, tagliati e tenui, in cima alla slide successiva.
   - Uscita: prima del cambio di scena il contenuto che non prosegue sfuma; il campo sfumato
     si dissolve se la slide successiva ne ha un altro.
   - Stampa (?print-pdf nell'indirizzo della composizione): niente uscite, timeline alla fine,
     una pagina per scena (slides.css). */
function buildLessonTimeline(T) {
  var root = document.getElementById('root');
  var compositionId = root.getAttribute('data-composition-id');
  var scenes = Array.prototype.slice.call(root.querySelectorAll(':scope > .scene'));
  var all = function (el, sel) { return Array.prototype.slice.call(el.querySelectorAll(sel)); };
  var frameOf = function (scene) { return scene.querySelector(':scope > .frame'); };
  var holdsOf = function (scene) { return scene.getAttribute('data-holds').split(',').map(Number); };
  var print = /[?&]print-pdf/i.test(location.search);
  if (print) document.documentElement.classList.add('print-pdf');

  gsap.registerPlugin(CustomEase, DrawSVGPlugin, SplitText);
  // Stesse curve dei token CSS --ease-out e --ease-in-out (tokens.css).
  CustomEase.create('ui-out', '0.23, 1, 0.32, 1');
  CustomEase.create('ui-in-out', '0.77, 0, 0.175, 1');

  /** Elementi con uno stato guidato dai frammenti: li governa il CSS, non l'ingresso. */
  var STEP_CONTROLLED = '.core, .cavity, .free-cusp, .load, .strain, .lbl-core, .lbl-free, .level, .finish, [class*="type-"]';

  /** Blocchi che entrano voce per voce: righe di tabella, voci di elenco. I frammenti entrano al clic. */
  var pieces = function (el) {
    var children = el.matches('table') ? all(el, ':scope > thead > tr, :scope > tbody > tr')
      : el.matches('ul, ol') ? Array.prototype.slice.call(el.children) : [];
    var items = children.filter(function (c) { return !c.classList.contains('fragment'); });
    return items.length > 1 ? items : [el];
  };

  // Affermazioni divise in parole prima di misurare: ognuna sale dalla sua maschera.
  all(root, '.l-statement blockquote[data-animate]').forEach(function (q) {
    SplitText.create(q, { type: 'words', mask: 'words', wordsClass: 'w' });
  });

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

    /** Numero grande che conta fino al valore scritto (virgola decimale italiana). */
    var countUp = function (el, at) {
      var node = Array.prototype.find.call(el.childNodes, function (n) { return n.nodeType === 3 && /\d/.test(n.textContent); });
      if (!node) return;
      var text = node.textContent.trim();
      var target = Number(text.replace(',', '.'));
      if (!isFinite(target)) return;
      var decimals = text.indexOf(',') >= 0 ? text.split(',')[1].length : 0;
      var state = { v: 0 };
      tl.fromTo(state, { v: 0 }, {
        v: target, duration: T.count.duration, ease: 'ui-out', immediateRender: false,
        onUpdate: function () { node.textContent = state.v >= target ? text : state.v.toFixed(decimals).replace('.', ','); },
      }, at);
    };

    /** Schema SVG che si costruisce: contorni disegnati, tessuti, restauro, linee guida, etichette. */
    var buildFigure = function (svg, at) {
      var q = function (sel) { return all(svg, sel).filter(function (el) { return !el.closest(STEP_CONTROLLED); }); };
      var outlines = q('path.outline');
      var fades = q('.crest-line, .enamel, .dentin, .pulp, .gingiva, .bone');
      var parts = q('.resto.on, .blockout, .thick, .dme, .contact-band, .crack');
      var leaders = q('.lbl path, .dim path');
      var texts = q('.lbl text, .dim text, text.side, text.cap');
      // Le transizioni CSS degli stati non devono rincorrere i valori della timeline.
      [].concat(outlines, fades, parts, leaders, texts).forEach(function (el) { el.style.transition = 'none'; });
      var F = T.figure;
      if (outlines.length) tl.fromTo(outlines, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1, ease: 'ui-in-out', stagger: 0.12 }, at);
      if (fades.length) tl.fromTo(fades, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: 'ui-out', stagger: 0.08 }, at + F.tissues);
      if (parts.length) tl.fromTo(parts, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'ui-out', stagger: 0.08 }, at + F.parts);
      if (leaders.length) tl.fromTo(leaders, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, ease: 'ui-out', stagger: 0.06 }, at + F.leaders);
      if (texts.length) tl.fromTo(texts, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'ui-out', stagger: 0.06 }, at + F.texts);
    };
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
      var t0 = start;
      var free = function (el) { return targets.indexOf(el) < 0 && !hasInside(el, targets) && !isInside(el, targets); };
      var quotes = all(scene, '.l-statement blockquote[data-animate]').filter(free);
      var blocks = all(scene, '[data-animate]').filter(function (el) { return free(el) && quotes.indexOf(el) < 0; });
      var rising = [].concat.apply([], blocks.map(pieces));
      var flat = rising.filter(function (el) { return el.matches('figure') && el.querySelector('svg'); });
      var moving = rising.filter(function (el) { return flat.indexOf(el) < 0; });
      if (moving.length) tl.fromTo(moving, { opacity: 0, y: T.rise },
        { opacity: 1, y: 0, duration: T.enter, stagger: T.stagger, ease: 'ui-out' }, t0 + T.delay);
      if (flat.length) tl.fromTo(flat, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'ui-out' }, t0 + T.delay);
      quotes.forEach(function (q, k) {
        tl.fromTo(all(q, '.w'), { yPercent: 100 },
          { yPercent: 0, duration: T.words.duration, stagger: T.words.stagger, ease: 'ui-out' }, t0 + T.words.delay + k * 0.2);
      });
      all(scene, '.big-num').filter(free).forEach(function (el) { countUp(el, t0 + T.count.delay); });
      // Gli schemi si costruiscono, salvo che arrivino per morph (sono già sullo schermo).
      all(scene, '.figure svg:not(.fig-luce)').forEach(function (svg) {
        if (!free(svg)) return;
        buildFigure(svg, t0 + T.figure.delay);
      });
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
        tl.fromTo(f, { opacity: 0, y: T.fragRise }, { opacity: 1, y: 0, duration: T.frag, ease: 'ui-out' }, at);
        var of = f.getAttribute('data-step-of');
        var fig = of && scene.querySelector('[data-steps="' + of + '"]');
        if (fig) tl.set(fig, { attr: { 'data-step': f.getAttribute('data-step') } }, at);
      });

      // Uscita: sfuma ciò che non prosegue nella slide successiva.
      if (next && !print) {
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
    if (!print) { window.__timelines[compositionId] = tl; return; }
    // In stampa la timeline non si registra: il runtime la riporterebbe all'inizio.
    tl.seek(tl.duration());
    // Foto presenti: in stampa la composizione è aperta da sola, senza la pagina della lezione.
    all(root, '.slot[data-src]').forEach(function (fig) {
      var img = fig.querySelector('img');
      img.addEventListener('load', function () { img.hidden = false; fig.classList.add('loaded'); fig.querySelector('.slot-ph').hidden = true; });
      img.src = '../../' + fig.getAttribute('data-src');
    });
  }

  (document.fonts ? document.fonts.ready : Promise.resolve()).then(build);
}
