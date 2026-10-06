# Lezione 1 — Lista delle immagini

> Adattata da `claude/lezione-01-lista-immagini.md` del progetto Claude «Conservativa 4» (13 settembre 2026). Nella versione web gli schemi S1-S11 e le grafiche G1-G3 sono già disegnati in codice (vedi `stato.md`); i prompt restano qui se serve una versione generata, da dichiarare come «Schema illustrativo» e da validare.

## Dove mettere i file

- Foto cliniche approvate: `public/assets/clinical/01/F1.webp` … `F14.webp` (fuori da Git, vedi `docs/ASSETS.md`).
- Figure da articolo: `public/assets/articoli/01/A1.webp`, `A2.webp` (fuori da Git, citazione in slide).

Il file sostituisce da solo il segnaposto con lo stesso codice.

## 📷 Foto cliniche

| # | Slide | Cosa serve | Note |
|---|---|---|---|
| F1 | 2 | **3.6 occlusale iniziale**, vecchio restauro MOD con incrinatura | Il caso portante della lezione |
| F2 | 2 | **Rx endorale** dello stesso, margine distale sottogengivale | Inserto piccolo |
| F3 | 2 | **Dopo rimozione del restauro**, creste marginali assenti | Il momento della diagnosi strutturale |
| F4 | 18 | **Build-up in composito**: sottosquadri eliminati, pareti ricostruite | Gesto che non hanno mai visto |
| F5 | 22 | **DME: matrice sezionale in posizione**, cuneo | |
| F6 | 22 | **DME completata**, margine rialzato e rifinito | Meglio se dello stesso caso di F5 |
| F7 | 28 | **IDS eseguito**: superficie sigillata, lucida | |
| F8 | 26 | **Preparazione con margine butt joint**, vista occlusale | Non ancora in slide |
| F9 | 24 | **Un veneerlay in situ** o la sua preparazione | Non ancora in slide: lo schema regge da solo, ma una foto vera vale il doppio |
| F10 | 31 | **Manufatto in disilicato** appoggiato sul modello | |
| F11 | 32 | **Manufatto in composito/ibrida CAD-CAM** | Accanto a F10, per il confronto visivo |
| F12 | 42 | **Due manufatti affiancati: uno mordenzato, uno no** | Anche i due campioni fisici da far girare in aula |
| F13 | 43 | **Cementazione in corso**: diga, manufatto in posizione, eccessi | Non ancora in slide |
| F14 | 46 | **Restauro finito**, dopo rifinitura e lucidatura | Chiude il cerchio col caso di apertura |

## 📄 Figure da articolo

| # | Slide | Figura | Fonte da citare in slide |
|---|---|---|---|
| A1 | 4 | Modello strutturale, vista occlusale e vestibolo-linguale (Fig. 1–2) | Fichera, Devoto, Re · QDT 2006 |
| A2 | 25 | I disegni di finitura della classificazione adhesthetics | Ferraris · Int J Esthet Dent 2017 (non in slide: sostituita dalla tabella) |

## 🎨 Schemi generati: avvertenze

1. **Niente testo nell'immagine.** I modelli sbagliano le etichette e inventano parole che sembrano termini veri. Schema muto, etichette nella slide.
2. **L'anatomia dentale va verificata a occhio.** Numero di cuspidi, forma delle radici e rapporti di contatto sono spesso sbagliati. Meglio sezioni e figure stilizzate.
3. **Genera tutto nella stessa sessione**, con la ricetta di stile come primo messaggio, perché lo stile resti coerente.

### Ricetta di stile

```
I need a series of schematic dental illustrations for a university lecture.
Keep this exact visual style for every image in this conversation:

- Flat vector illustration, clean editorial diagram style
- Neutral off-white background, no gradients, no drop shadows
- Limited palette: warm off-white enamel, pale ochre dentin, muted red
  for pulp, medium grey outlines, ONE accent colour (teal) used only to
  highlight the element the diagram is about
- Line weight consistent and fairly thin
- No text, no labels, no lettering, no numbers, no arrows with words
- No photorealism, no 3D rendering, no glossy highlights
- Cross-sections drawn straight-on, not in perspective
- Square or 4:3 format

Confirm you understand, then I'll send the diagrams one at a time.
```

### S1 · Slide 7 — La cuspide non supportata

```
A schematic bucco-lingual cross-section of a lower molar, shown twice
side by side for comparison.

LEFT: an intact molar — both marginal ridges present, the central
dentin core continuous, connecting the buccal and lingual walls.

RIGHT: the same molar after the proximal walls have been lost — the
central connecting core is gone, and the buccal cusp now stands alone
like a cantilever beam anchored only at its base. Show a downward
occlusal load on the tip of that free-standing cusp and a subtle
bending deformation at its base.

Highlight in teal only the free-standing cusp on the right.
Same style as established. No text, no labels, no lettering.
```

### S2 · Slide 11 — Preparazione geometrica

```
A schematic mesio-distal cross-section of a lower molar prepared for a
conventional RETENTIVE ONLAY with cuspal coverage. This is NOT an
intracoronal inlay: the preparation includes coverage of a cusp.

Show clearly:
- one cusp reduced with a FLAT, planar reduction that cuts straight
  across the cusp and ignores the original cusp morphology
- a defined chamfer finish line where that cuspal coverage ends
- a flat pulpal floor and clearly defined internal line angles
- axial walls that diverge occlusally at a slight, visible taper
- a distinct proximal box with a defined cervical seat and squared
  internal corners

The whole preparation must read as a deliberate geometric FORM: a shape
that has been cut, with walls that could hold the restoration in place
on their own, before any adhesive is used. A single obvious path of
insertion should be visually implied by the converging walls.

Draw the prepared tooth surface in teal, the remaining tooth in the
neutral palette. Same style as established. No text, no labels.
```

### S3 · Slide 12 — Preparazione parametrica

Da generare subito dopo S2, con la stessa inquadratura.

```
Same molar, same cross-section angle and same framing as the previous
image, but now prepared for a NONRETENTIVE OVERLAY covering the whole
occlusal surface and both cusps. Again, this is not an inlay: there is
no intracoronal retentive cavity at all.

Show instead:
- cuspal reduction that FOLLOWS the original cusp anatomy, producing an
  even layer of restorative space over the whole occlusal surface,
  rather than a flat planar cut
- a smooth, open, continuously rounded internal surface, with NO boxes,
  NO defined axial walls, NO sharp internal line angles
- margins as flat BUTT JOINTS at 90 degrees, with full material
  thickness right up to the edge — no chamfer anywhere
- peripheral enamel visibly preserved, the preparation staying high and
  away from the cervical area
- one small undercut area filled with a distinct composite block-out
  instead of being cut away: show it as a separate lighter-toned region
  inside the tooth

The whole preparation must read as the OPPOSITE of a geometric form:
nothing here could retain a restoration mechanically. It is a smooth
surface calibrated to give the material the thickness it needs.

Draw the prepared surface in teal. Same style. No text, no labels.
```

### S4 · Slide 15 — Il costo biologico

```
Three schematic cross-sections of the same lower molar in a row,
showing progressively more tooth structure removed.

FIRST: intact tooth. SECOND: prepared for a partial coverage onlay —
occlusal surface and one cusp reduced, axial walls largely preserved.
THIRD: prepared for a full coverage crown — the entire coronal
circumference reduced to a stump.

Render the REMOVED tooth structure as a pale ghosted outline so the
viewer can see at a glance how much is gone in each case; the remaining
structure solid.

Same style as established. No text, no labels, no percentages.
```

### S5 · Slide 20-21 — Il margine e il punto di contatto

```
A schematic mesio-distal cross-section showing TWO adjacent posterior
teeth in contact, with the interdental gingiva and a hint of alveolar
bone crest below.

On the left tooth, mark three possible positions for a restoration
margin at three different heights on the proximal wall:
- one clearly above the gingival margin
- one just inside the gingival sulcus
- one deep, well below the gingival margin and close to the bone crest

Separately, highlight in teal a horizontal band at the level of the
contact point between the two teeth — the zone where the two crowns
actually touch. This band is the element the diagram is about: make it
the most visible feature.

Same style as established. No text, no labels, no lettering.
```

Variante con la matrice:

```
Same two adjacent posterior teeth in cross-section, now with a
sectional matrix band inserted interproximally and a wedge below it.
Show how the matrix band is compressed and cannot adapt closely at the
level of the contact point, while it adapts well below it.
Highlight in teal the gap between matrix and tooth at the contact level.
Same style. No text, no labels.
```

### S6 · Slide 24 — Overlay, veneerlay, table-top, corona parziale

```
Four schematic bucco-lingual cross-sections of the same lower molar in
a row, each showing a different indirect partial restoration in place.
Draw the restoration in teal and the remaining tooth in the neutral
palette, in all four.

1 — OVERLAY: restoration covers the whole occlusal surface and the cusp
tips, but its buccal finish line stops at the level of the cusp
transition, high up, without descending onto the buccal surface.

2 — VENEERLAY: same occlusal coverage, but the restoration continues
down over the buccal surface, its finish line reaching the cervical
third of the buccal wall.

3 — TABLE-TOP / OCCLUSAL VENEER: a thin restoration covering only the
occlusal surface, finishing right at the cusp tips, without engaging
the axial walls at all.

4 — PARTIAL CROWN: restoration covering occlusal surface and the full
circumference of the axial walls down to a cervical finish line.

Keep all four at exactly the same scale, orientation and framing.
Same style as established. No text, no labels, no numbers.
```

### S7 · Slide 25 — I tre disegni di finitura di Ferraris

```
Three schematic cross-sections of the buccal cusp region of a posterior
tooth, side by side, each showing a different finish line design where
the restoration meets the tooth. Draw the restoration in teal.

1 — BUTT JOINT: the restoration ends in a flat 90 degree junction on
the occlusal surface, following the cusp contour, with full material
thickness at the margin.

2 — BEVEL: the tooth surface is prepared as a long inclined plane on
the buccal enamel, roughly 2 to 3 millimetres long at a shallow angle,
and the restoration tapers gradually along it.

3 — SHOULDER: a shallow rounded shoulder about half a millimetre deep
is prepared peripherally, and the restoration seats into it.

Same scale and framing for all three. Same style as established.
No text, no labels, no measurements.
```

### S8 · Slide 26 — Butt joint contro chamfer

```
Three schematic cross-sections of the occlusal margin region of a
posterior tooth with a ceramic occlusal veneer in place, side by side.
All three have the same 1 mm occlusal reduction. Draw the ceramic in
teal so its varying thickness at the margin is immediately visible.

1 — BUTT JOINT: flat 90 degree margin, ceramic keeps full thickness
right to the edge.

2 — HOLLOW CHAMFER: a shallow concave chamfer finish line, the ceramic
thinning slightly toward the margin.

3 — DEEP CHAMFER: a deeper concave chamfer, the ceramic clearly thinner
and more tapered at the margin than in the other two.

The point of the image is the ceramic thickness AT the margin getting
progressively thinner from left to right. Same style. No text.
```

### S9 · Slide 27 — Il bisello: due oggetti diversi

```
Two schematic cross-sections side by side, comparing two very different
things that share the same name.

LEFT — A THIN KNIFE-EDGE BEVEL at a restoration finish line: the
ceramic tapers to a very fine, sharp, feather-thin edge where it meets
the tooth. Show the extreme thinness of that ceramic tip clearly; it
should look visibly fragile.

RIGHT — A WIDE FLAT BEVEL as a transition surface: a long shallow
inclined plane prepared on the buccal enamel, roughly 2 to 3 mm long,
with the restoration lying over it at consistent, adequate thickness.
This one should look robust and deliberate, a surface rather than an
edge.

Draw the restoration in teal in both. The contrast between a fragile
thin tip and a broad solid transition surface is the entire point of
the image. Same style. No text, no labels.
```

### S10 · Slide 33 — Spessori e chiave in silicone

```
A schematic bucco-lingual cross-section of a prepared posterior tooth
with a sectioned silicone index seated over it — the index shown as a
distinct outer layer following the original tooth contour, cut through
so that the gap between the prepared tooth surface and the inner
surface of the index is clearly visible.

Highlight that gap in teal: it represents the space available for the
restoration. Show the gap being generous in one area and visibly
narrow in another, over one cusp.

Same style as established. No text, no labels, no measurements.
```

### S11 · Slide 38 — Quanta luce arriva al cemento

```
Three schematic cross-sections of a posterior tooth with an indirect
restoration seated on it, side by side, illustrating light transmission
during curing. In each, a curing light is positioned above and light is
shown travelling down through the restoration to the thin cement layer
underneath.

1 — Thin, highly translucent restoration: light passes through
abundantly and reaches the cement layer strongly.

2 — Medium thickness, moderate translucency: light noticeably reduced.

3 — Thick, opaque restoration: very little light reaches the cement
layer at the bottom.

Represent the light as a soft downward gradient that fades
progressively more in each successive image. Keep the cement layer
visible as a distinct thin line at the interface, in teal.

Same style as established. No text, no labels.
```

## 📊 Grafiche dati

Mai generate come immagini: i numeri vanno disegnati dai dati. Nella versione web sono barre HTML.

| # | Slide | Contenuto |
|---|---|---|
| G1 | 26 | Carico a frattura: butt joint 1107 N, hollow chamfer 784 N, deep chamfer 550 N |
| G2 | 35 | Sopravvivenza 5 anni 95%, 10 anni 91%; cause di fallimento: frattura 4%, endo 3%, carie 1%, decementazione 1% |
| G3 | 40 | Due evidenze affiancate e non unite: conversione per spessore (in vitro) e discolorazione marginale 92% / 57% (RCT) |

## Slide senza immagini

5, 6, 8, 10, 13, 14, 16, 19, 29, 30, 34, 37, 39, 41, 44, 45, 47 e i divisori: slide di ragionamento, tipografia grande e nient'altro.
