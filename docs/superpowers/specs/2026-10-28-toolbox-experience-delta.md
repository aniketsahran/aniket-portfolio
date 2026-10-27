# Toolbox Logo Grid + Experience Horizontal Scroll — Design Delta

**Date:** 2026-10-28
**Status:** Approved (directions chosen by Aniket)
**Builds on:** the v2 engineer redesign (dark + sage-teal accent).

## Why

Aniket asked for three things; the accent change (→ muted sage-teal `#7FAE9E`)
is already done. Remaining:
1. **Toolbox:** show real **logos** for his tools, as an **interactive
   magnetic grid** (chips lean/pull toward the cursor, like the hero name) —
   consistent with the site's interaction language.
2. **Experience:** a **horizontal scroll track** — scrolling down moves
   left→right through his Cloudera roles (pinned/sticky scrollytelling).

## Decided

### Toolbox → interactive magnetic logo grid
- Replace the current text-chip Skills section with a grid of **logo chips**;
  each chip = brand icon + tool name, and reacts to the cursor with a magnetic
  pull + slight tilt (reuse the hero/MagneticButton interaction language).
- Logos sourced from **Simple Icons** (open-source brand SVGs), fetched at build
  time into `public/assets/logos/<slug>.svg` by a script — **no runtime
  dependency**, fully static. Recolored to the theme via CSS mask (so they're
  legible on dark and can tint to ink/sage), with brand color optional on hover.
- Tools with a real brand icon get a logo; tools without one (e.g. Uber Cadence,
  Mockgen, Oracle LiveSQL, coursework/soft-skill items) render as a clean text
  chip fallback. Grouping by category (Languages, Frameworks, Deployment,
  Developer Tools, Cloud/DB) is kept; coursework stays as plain text.
- Under reduced motion: static grid, no magnetism (logos still shown).

### Experience → horizontal scroll track
- The Experience section becomes a **pinned horizontal scroller**: a tall
  section with a sticky inner track; vertical scroll progress drives a
  horizontal `translateX` through the role panels (Intern → SDE-II → now).
- Built with Framer Motion `useScroll`/`useTransform`. Each role is a panel with
  its bullets; a progress indicator shows position.
- **Reduced motion / small screens:** fall back to the normal vertical stacked
  timeline (no pinning/horizontal hijack) — horizontal scroll-hijacking is
  disabled where it would harm usability. Content identical either way.

## Constraints
- Plain JS, React + Vite, Framer Motion (existing). No new runtime deps; the
  logo-fetch script may use node built-ins only.
- Keep static/Netlify, AA contrast, reduced-motion + a11y (logos need
  accessible names; horizontal hijack must not trap keyboard users).
- Content still from `src/data/content.js` (add a `tools` dataset with logo
  slugs; keep résumé facts intact).

## Left to the builder
- Exact tool→slug mapping and which get logos vs. text fallback.
- Grid layout/columns, magnetic strength, tilt amount.
- Scroll distance/length for the horizontal track, progress UI, the mobile
  breakpoint for the vertical fallback.
