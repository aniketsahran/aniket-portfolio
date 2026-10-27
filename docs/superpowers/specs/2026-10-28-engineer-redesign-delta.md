# Portfolio Redesign v2 — "Engineer" Aesthetic + Interactive Hero

**Date:** 2026-10-28
**Status:** Awaiting approval
**Builds on:** `2026-10-27-portfolio-website-design.md` (v1, already built)

## Why this revision

The v1 site (Warm Paper + Terracotta) is built and works, but Aniket found
the warm/editorial look — and a first pass at playful interactions — "tacky,
2010-ish." He wants the site to read as a **professional, modern frontend
engineer's** work: precise, restrained, polished. Reference points he endorsed:
**Linear, Vercel, Stripe, Rauno Freiberg**. He also wants a **playable,
cursor-interactive hero** (his name, breakable/reactive) and subtle depth —
but done with engineered precision, not cartoonish physics. He explicitly chose
a **cooler/darker palette** over keeping the warm one.

The north star, content, structure, and section set from v1 are unchanged. This
revision changes **look, motion, and the hero interaction** only.

## Goals

- Reads unmistakably as a senior frontend engineer's site: precise, calm, polished.
- A signature **interactive hero**: Aniket's name reacts to the cursor with
  deliberate, spring-based motion and snaps back — satisfying, never tacky.
- Cohesive spring-based motion system and refined micro-interactions site-wide.
- Keep the site fast and lean — **no heavy 3D/WebGL engine** (Aniket preferred
  the lightweight direction over three.js). "3D-ish" = subtle CSS depth/parallax.

## Non-Goals / Anti-Goals

- No WebGL/three.js engine; no large dependency for the hero effect.
- No bouncy, cartoonish, or "fun-house" physics (the thing that read as tacky).
- Don't change content, section structure, routing, or the mailto form behavior.
- Don't regress accessibility (reduced-motion, contrast, labels) or test coverage.

## Decided (Aniket's calls + my calls, noted)

### Palette — cool dark "engineer" (my calls on exact hex, AA-verified)
- Background: near-black with a slight blue tint (not pure `#000`), e.g. base
  `#0B0D10`, raised `#141720`, sunken `#0E1014`.
- Text: off-white `#EDEEF0`; muted `#9AA0AA`; faint `#6B7280`. All AA on base.
- Hairline borders: `#20242C` / low-opacity white.
- **Accent: electric iris/indigo** ~`#7C6DFF` with a brighter hover; used for
  key highlights, focus rings, interactive cues. Builder refines for AA where
  used as text (use a lighter tint for small accent text on dark).
- Single committed dark theme. No light/dark toggle (consistent with v1's
  single-theme decision).

### Typography
- Body/UI: a clean grotesk sans (e.g. Inter — already loaded).
- Labels/eyebrows/metadata/code-ish bits: a **monospace** (e.g. IBM Plex Mono,
  JetBrains Mono, or Geist Mono) — the "engineer" signal.
- Headings: tighter tracking, large and confident; builder picks the display
  face (may keep a refined serif or move to a grotesk — builder's call toward
  whatever reads most "Linear/Vercel").

### Texture & layout
- Subtle **dot-grid or fine noise** background, hairline rules, generous
  negative space, precise alignment. Restraint over decoration.

### Motion system
- **Spring-based** transitions (Framer Motion springs with momentum + settle),
  replacing linear/eased slides where it matters.
- **Magnetic buttons** (subtle pull toward cursor), cursor-aware hover states,
  scroll-linked reveals that feel composed.
- Everything still respects `prefers-reduced-motion` (hard requirement).

### Signature hero interaction
- Aniket's name rendered as individual letters/glyphs in the site type.
- On cursor proximity, letters **displace** (repel/scatter on a grid) and
  **magnetically spring back** to their home positions — weighty, precise,
  continuous (no "fall to floor + manual reset" gimmick). Optional subtle
  per-letter weight/scale response.
- Built with lightweight canvas or DOM + Framer Motion springs; no 3D engine.
- Degrades to a static, crisp wordmark under reduced motion.

### "3D-ish" depth (lightweight)
- Tasteful CSS perspective/parallax on select elements (e.g. hero layers,
  cards) — subtle, not a tilting-toy. Builder's discretion on where.

## Constraints

- Keep it static, Netlify-deployable, plain JS, React + Vite (as v1).
- Keep bundle lean — reuse Framer Motion already in the project; avoid new heavy
  deps. A tiny helper lib for the hero is acceptable only if small.
- Preserve all v1 tests' intent; update tests that assert old palette/markup.
- Maintain AA contrast on the new dark palette; keep reduced-motion + a11y.

## Left to the builder

- Exact final hex values (AA-verified on dark), the monospace + display faces,
  dot-grid vs. noise, spring constants, magnetic strength, and which elements
  get depth/parallax.
- Precise hero interaction implementation (canvas vs. DOM) and tuning so it
  feels "engineered," not bouncy.
- Which micro-interactions each section gets.

## Resolved

- **Portrait placement:** Move the portrait **out of the hero and into the
  About section** (Aniket's call). The hero becomes a pure interactive-name
  moment with no photo. In About, give the portrait a sharp, engineer-leaning
  treatment on the dark palette (crisp square or subtle monochrome/duotone,
  hairline frame — builder's discretion), not the round warm-paper look.
