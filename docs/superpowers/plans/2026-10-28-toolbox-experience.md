# Toolbox Logo Grid + Experience Horizontal Scroll — Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the Skills/Toolbox section into an interactive magnetic logo grid with real brand logos, and turn Experience into a pinned horizontal scroll track — on the existing dark + sage-teal engineer theme.

**Architecture:** Add a build-time script that vendors Simple Icons SVGs into `public/assets/logos/`. Add a `tools` dataset to the content module. Build a `ToolGrid` (magnetic logo chips, reusing the cursor-interaction language) replacing the Skills chips, and rebuild Experience as a Framer Motion `useScroll`-driven horizontal track with a vertical/reduced-motion fallback.

**Tech Stack:** React + Vite, Framer Motion (existing), plain CSS (CSS mask for logo tinting), Vitest + RTL. No new runtime deps.

**Spec:** `docs/superpowers/specs/2026-10-28-toolbox-experience-delta.md`

## Global Constraints

- Plain JS; no new runtime dependencies. Logo-fetch script uses node built-ins only.
- Logos vendored locally under `public/assets/logos/`; recolor via CSS mask (`background: currentColor`/token), never baked-in black.
- Every logo chip has an accessible name (the tool name as text, not icon-only).
- Content from `src/data/content.js`; résumé facts unchanged.
- Preserve AA contrast, `prefers-reduced-motion`, keyboard accessibility. The horizontal scroll must NOT trap keyboard/scroll on reduced motion or small screens — fall back to the vertical stack there.
- Static build, Netlify-deployable.

## Review Focus

- **Reduced motion / small screens:** Experience falls back to a normal vertical stack (no pinning/horizontal hijack); ToolGrid is static (no magnetism). All content present. → Tasks 3, 4.
- **Logo accessibility:** each tool chip exposes the tool name as text; decorative SVG is `aria-hidden`. → Task 2 (ToolGrid).
- **Missing-logo fallback:** a tool with no vendored SVG still renders as a labeled text chip, never a broken image. → Task 2.
- **Keyboard/scroll safety:** the pinned horizontal section doesn't trap focus or prevent scrolling past it. → Task 3.

---

### Task 1: Vendor tool logos + tools dataset

**Files:**
- Create: `scripts/fetch-logos.mjs` (downloads Simple Icons SVGs to `public/assets/logos/<slug>.svg`)
- Create (assets): the fetched SVGs under `public/assets/logos/`
- Modify: `src/data/content.js` (add `tools`)
- Test: `src/data/content.test.js` (extend)

**Interfaces:**
- Produces: `content.tools` = `Array<{ group, items: Array<{ name, slug|null }> }>` mirroring the skill groups, where `slug` names a vendored logo file (`/assets/logos/<slug>.svg`) or is `null` for text-only fallback. `fetch-logos.mjs` fetches each referenced slug from `https://cdn.jsdelivr.net/npm/simple-icons/icons/<slug>.svg`.

- [ ] **Step 1: Write the failing test** — in `content.test.js`: assert `content.tools` exists, is non-empty, includes a Go entry with a non-null `slug`, and every item has a `name` string.
- [ ] **Step 2: Run test, verify it fails** — Run: `npm test -- --run content`. Expected: FAIL.
- [ ] **Step 3: Implement** — add `tools` to `content.js` mapping résumé tools to Simple Icons slugs (go, docker, kubernetes, react, nodedotjs, express, postgresql, mongodb, mysql, python, javascript, html5, css, git, helm, amazonwebservices, microsoftazure, postman, c, cplusplus, grpc, protobuf, visualstudiocode, …), `slug: null` where no brand icon exists (Uber Cadence, Mockgen, Oracle LiveSQL, Mongoose/Sanity if absent, coursework). Write `fetch-logos.mjs` and run it to vendor the SVGs; verify files land in `public/assets/logos/`.
- [ ] **Step 4: Run test, verify it passes** — Run: `npm test -- --run content`. Expected: PASS. Confirm `ls public/assets/logos/` shows the fetched SVGs.
- [ ] **Step 5: Commit** — `feat: vendor tool logos and add tools dataset`.

---

### Task 2: ToolGrid — interactive magnetic logo grid

**Files:**
- Create: `src/sections/ToolGrid.jsx`, `src/sections/ToolGrid.css`, `src/components/ToolChip.jsx`
- Modify: `src/pages/Home.jsx` (render `ToolGrid` in place of `Skills`)
- Delete: `src/sections/Skills.jsx`/`.css`/`.test.jsx` (replaced) — or keep `Skills` data usage via `tools`
- Test: `src/sections/ToolGrid.test.jsx`

**Interfaces:**
- Consumes: `content.tools`, `useMagnetic`, `useReducedMotion`.
- Produces: `ToolGrid()` with `id="skills"` (keep the anchor so Nav still works) — grouped grids of `ToolChip`. `ToolChip({ name, slug })` renders a chip with an accessible name `name`; when `slug` is set, a mask-tinted logo (`aria-hidden`) from `/assets/logos/<slug>.svg`, else a text-only chip. Chips are magnetic (cursor pull + tilt) unless reduced motion.

- [ ] **Step 1: Write the failing tests** — `ToolGrid.test.jsx`: assert `id="skills"` present; assert group label `Languages` and a chip with accessible name `Go`; **[Review Focus: fallback]** assert a known no-logo tool (e.g. `Uber Cadence`) renders as text with no `<img>`/mask element that points at a missing file (its chip has no logo node).
- [ ] **Step 2: Run tests, verify they fail** — Run: `npm test -- --run ToolGrid`. Expected: FAIL.
- [ ] **Step 3: Implement** — `ToolChip` + `ToolGrid`; swap into `Home`; remove the old `Skills` section and its test.
- [ ] **Step 4: Run tests, verify they pass** — Run: `npm test -- --run ToolGrid`. Expected: PASS. Then `npm test -- --run` (full suite) — update/remove the old Skills test reference.
- [ ] **Step 5: Commit** — `feat: interactive magnetic tool logo grid`.

---

### Task 3: Experience → horizontal scroll track

**Files:**
- Modify: `src/sections/Experience.jsx`, `src/sections/Experience.css`
- Create: `src/hooks/useIsSmallScreen.js` (matchMedia helper for the fallback)
- Test: `src/sections/Experience.test.jsx` (keep/extend)

**Interfaces:**
- Consumes: `content.experience`, Framer Motion `useScroll`/`useTransform`, `useReducedMotion`, `useIsSmallScreen`.
- Produces: `Experience()` with `id="experience"` — on large screens with motion allowed, a tall section with a sticky inner track translated horizontally by scroll progress (role panels Intern→now) plus a progress indicator. On reduced motion OR small screens, the existing vertical stacked list (all roles/bullets visible, no pinning). Content identical in both.

- [ ] **Step 1: Write/extend the failing test** — `Experience.test.jsx`: keep existing assertions (both roles + a signature bullet render); add **[Review Focus]** that with `matchMedia` stubbed to reduced-motion the component renders all roles in the static fallback (no throw, both roles present). (jsdom has no layout/scroll, so assert content presence, not transforms.)
- [ ] **Step 2: Run test, verify it fails** — Run: `npm test -- --run Experience`. Expected: FAIL (new fallback assertion / refactor).
- [ ] **Step 3: Implement** — refactor `Experience` into a horizontal scroller with the vertical fallback gated by `useReducedMotion() || useIsSmallScreen()`. Ensure the pinned section has bounded height and does not trap scroll.
- [ ] **Step 4: Run test, verify it passes** — Run: `npm test -- --run Experience`. Expected: PASS.
- [ ] **Step 5: Commit** — `feat: horizontal scroll track for experience`.

---

### Task 4: Integration + verify

**Files:**
- Modify: `src/pages/Home.test.jsx` if section anchors changed (skills anchor retained, so likely no change)
- Test: full suite

- [ ] **Step 1: Verify** — Run: `npm test -- --run` (full suite PASS) and `npm run build` (success, `dist/_redirects` present). Confirm `public/assets/logos/` SVGs copied into `dist/assets/logos/`.
- [ ] **Step 2: Visual review** — check the magnetic grid, horizontal scroll, reduced-motion fallbacks, and mobile by review; adjust CSS (no behavior change).
- [ ] **Step 3: Commit** — `chore: integrate toolbox grid + experience scroll`.

---

## Notes for the executor
- Keep the `#skills` anchor id on the new ToolGrid so the Nav link still resolves.
- Vendored logos are swap-safe; if a slug 404s at fetch time, drop it to a text fallback (`slug: null`) rather than shipping a broken icon.
