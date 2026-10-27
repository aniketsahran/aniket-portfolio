# Engineer Redesign (v2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the existing portfolio into a precise, polished "senior frontend engineer" aesthetic — cool dark palette, monospace labels, spring motion, an interactive cursor-reactive hero name — without changing content, structure, routing, or the mailto form.

**Architecture:** Iterate on the existing React + Vite app. Swap the theme tokens (`theme.css`/`global.css`) to a dark cool system; upgrade the shared motion primitive to springs and add a `MagneticButton` and an accessible `InteractiveName` component; rebuild the Hero around the interactive name (portrait moves to About); then a polish pass applies the new tokens, mono labels, hairline rules, dot-grid texture, and spring reveals across every section. All content continues to come from `src/data/content.js`.

**Tech Stack:** React 18, Vite 5, React Router 6, Framer Motion (springs — already a dependency), plain CSS (custom properties), Vitest + RTL. No new heavy dependencies; no WebGL/three.js.

**Spec:** `docs/superpowers/specs/2026-10-28-engineer-redesign-delta.md` (builds on `2026-10-27-portfolio-website-design.md`)

## Global Constraints

- Plain JavaScript, no TypeScript. React + Vite, Framer Motion, plain CSS. No new heavy deps; **no three.js/WebGL**.
- All rendered content still comes from `src/data/content.js`. No content/structure/routing/mailto changes. No invented facts.
- **Dark cool palette** as CSS variables (builder refines exact hex, all AA-verified on the dark base): base `#0B0D10`, raised `#141720`, sunken `#0E1014`; text `#EDEEF0`, muted `#9AA0AA`, faint `#6B7280`; hairline `#20242C`; accent iris `#7C6DFF` (+ brighter hover), with `--on-accent` chosen so `.btn--primary` passes AA.
- Single committed dark theme. No light/dark toggle.
- Add a **monospace** font (e.g. JetBrains Mono / IBM Plex Mono via Google Fonts) for eyebrows/labels/metadata; `--font-mono` token.
- **Spring-based** motion (Framer Motion `type: 'spring'`); keep all motion behind `prefers-reduced-motion: reduce` — content fully visible and the name legible with no motion.
- Static build, Netlify-deployable. Keep bundle lean.
- Preserve existing tests' intent; update only assertions tied to the old palette/markup (notably the Hero portrait moving to About).
- The hero name must expose the real text "Aniket Sahran" to assistive tech, not only as canvas/visual glyphs.

## Review Focus

- **Reduced motion:** hero interactive name, spring reveals, and magnetic buttons all degrade to static; the name renders as plain legible text and every section's content is visible. → Task 2 (Reveal), Task 3 (InteractiveName/Hero).
- **Interactive-name accessibility:** the component exposes "Aniket Sahran" as readable text (sr-only span or `aria-label`), visual glyphs `aria-hidden`. → Task 3.
- **Dark-palette contrast:** body text (`--ink` on `--bg`) and primary-button pair meet WCAG AA. → Task 1.
- **Magnetic buttons stay real activators:** a `MagneticButton` rendered as a link keeps its `href` and is keyboard-focusable; as a button keeps `onClick`; the transform never blocks activation. → Task 2.
- **Pointer-less / touch devices:** cursor-driven effects (name displacement, magnetism) have no pointer to follow — content stays put and usable, nothing stuck off-screen. → Task 3 (name rests at home with no pointer), Task 2 (button rests untransformed).

---

### Task 1: Dark "engineer" theme foundation

**Files:**
- Modify: `src/styles/theme.css` (palette tokens, `--font-mono`, spring/texture tokens), `src/styles/global.css` (body bg, mono usage for `.eyebrow`, dot-grid utility, font import)
- Modify: `src/styles/button-contrast.test.js` (extend to also assert body-text AA)
- Test: `src/styles/button-contrast.test.js`

**Interfaces:**
- Produces: dark palette tokens (`--bg`, `--bg-raised`, `--bg-sunken`, `--ink`, `--muted`, `--faint`, `--line`, `--accent`, `--accent-strong`/hover, `--on-accent`), `--font-mono`, and a `.dot-grid` (or `.texture`) background utility — consumed by all later tasks.

- [ ] **Step 1: Extend the test** — in `button-contrast.test.js` add an assertion that the body-text pair `--ink` on `--bg` has contrast ≥ 4.5 (reuse `tokenHex`/`contrast`). Keep the `.btn--primary` AA check (which resolves whatever background token the button uses against `--on-accent`).
- [ ] **Step 2: Swap to the dark palette with a deliberately naive accent foreground** — rewrite `theme.css` to the dark tokens; set `.btn--primary` to use the iris `--accent` with `--on-accent: #ffffff` as a first guess; add `--font-mono` + mono import in `global.css`; set `body` background to `--bg`; `.eyebrow` → `--font-mono`; add a `.dot-grid` utility and hairline styling.
- [ ] **Step 3: Run test, verify it fails** — Run: `npm test -- --run button-contrast`. Expected: FAIL — white on iris `#7C6DFF` is ≈3.8:1, below AA 4.5. (The body-text pair passes; the button pair fails, proving the guard bites.)
- [ ] **Step 4: Fix the accent foreground, verify it passes** — set `--on-accent` to an AA-safe value on the iris (e.g. a near-black `#0B0D10`, ≈5:1) or use a darker accent for button fills. Run: `npm test -- --run button-contrast`. Expected: PASS. Then `npm run build`. Expected: success.
- [ ] **Step 5: Commit** — `feat: dark engineer theme palette, mono labels, texture`.

---

### Task 2: Spring motion primitives + MagneticButton

**Files:**
- Modify: `src/components/Reveal.jsx` (spring transition)
- Create: `src/components/MagneticButton.jsx`, `src/hooks/useMagnetic.js`
- Test: `src/components/Reveal.test.jsx` (existing, keep green), `src/components/MagneticButton.test.jsx`

**Interfaces:**
- Consumes: `framer-motion`, `useReducedMotion`.
- Produces:
  - `Reveal({ children, as, delay, className })` — unchanged API; transition now a Framer Motion spring (momentum + settle). Reduced-motion branch unchanged (renders plain, fully visible).
  - `MagneticButton({ as, href, children, className, strength, onClick, ...rest })` — renders a motion `<a>` when `href` is given (keeps `href`, `download`, focusable) else a motion `<button>` (keeps `onClick`, `type`). On hover/pointer-move it translates toward the cursor via a spring and springs back on leave. Under reduced motion (or no hover/pointer), it stays untransformed. Default `as` follows presence of `href`.

- [ ] **Step 1: Write the failing tests** — `MagneticButton.test.jsx`: (a) with `href="/x"` renders an anchor whose `href` is `/x` and is reachable by role `link`; (b) **[Review Focus]** without `href`, renders a `button` and calls `onClick` when clicked; (c) renders its children text. (Keep existing `Reveal.test.jsx` cases incl. reduced-motion — they must stay green.)
- [ ] **Step 2: Run tests, verify they fail** — Run: `npm test -- --run MagneticButton`. Expected: FAIL (no module).
- [ ] **Step 3: Implement** — `useMagnetic` returns handlers + a motion value (spring) for x/y offset given a strength, no-op under reduced motion. `MagneticButton` wires it to a `motion.a`/`motion.button`. Switch `Reveal`'s transition to a spring.
- [ ] **Step 4: Run tests, verify they pass** — Run: `npm test -- --run MagneticButton Reveal`. Expected: PASS.
- [ ] **Step 5: Commit** — `feat: spring Reveal and MagneticButton primitive`.

---

### Task 3: Interactive hero name + hero rebuild

**Files:**
- Create: `src/components/InteractiveName.jsx`, `src/components/InteractiveName.css`
- Modify: `src/sections/Hero.jsx`, `src/sections/Hero.css` (remove portrait; add interactive name; CTAs become `MagneticButton`)
- Test: `src/components/InteractiveName.test.jsx`, `src/sections/Hero.test.jsx` (update)

**Interfaces:**
- Consumes: `content.profile`, `MagneticButton`, `useReducedMotion`, framer-motion springs.
- Produces: `InteractiveName({ text, className })` — renders the name with per-letter visual glyphs that displace from the cursor and spring back to home; the container carries the accessible name (an sr-only `<span>{text}</span>`; visual glyphs `aria-hidden`). Under reduced motion / no pointer, glyphs rest at home (static, legible). `Hero()` renders eyebrow (mono), `InteractiveName text={profile.name}` as the centerpiece, headline, tagline (verbatim), subline, and two `MagneticButton` CTAs ("View my work" → `#work`, "Download CV" → `resumePath`, download). **No portrait in the hero.**

- [ ] **Step 1: Write the failing tests** —
  - `InteractiveName.test.jsx`: **[Review Focus: a11y]** `render(<InteractiveName text="Aniket Sahran" />)` → `screen.getByText('Aniket Sahran')` is in the document (sr-readable full text); and at least one `aria-hidden` glyph node exists.
  - `Hero.test.jsx` (update): still asserts the verbatim tagline and both CTAs (CV link → résumé path with `download`; "View my work" → `#work`); assert the name "Aniket Sahran" is present; assert **no** `img` with name "Aniket Sahran" remains in the hero (portrait moved out).
- [ ] **Step 2: Run tests, verify they fail** — Run: `npm test -- --run InteractiveName Hero`. Expected: FAIL (new module; Hero still has portrait/old CTAs).
- [ ] **Step 3: Implement** — build `InteractiveName` (DOM letters + Framer Motion springs driven by a shared pointer position; reduced-motion → plain text). Rebuild `Hero` per the interface; remove the portrait markup and its CSS.
- [ ] **Step 4: Run tests, verify they pass** — Run: `npm test -- --run InteractiveName Hero`. Expected: PASS.
- [ ] **Step 5: Commit** — `feat: interactive cursor-reactive hero name`.

---

### Task 4: Portrait moves into About (engineer treatment)

**Files:**
- Modify: `src/sections/About.jsx`, `src/sections/About.css` (add portrait with sharp/mono-leaning framing on dark)
- Test: `src/sections/About.test.jsx` (update)

**Interfaces:**
- Consumes: `content.about`, `content.achievements`, portrait at `/assets/portrait.jpg`.
- Produces: `About()` unchanged in content, now rendering the portrait `<img alt="Aniket Sahran">` with an engineer-leaning treatment (crisp square or subtle monochrome/duotone, hairline frame).

- [ ] **Step 1: Update the failing test** — `About.test.jsx`: add an assertion that a portrait `img` with accessible name `Aniket Sahran` renders within About; keep existing education/achievement assertions.
- [ ] **Step 2: Run test, verify it fails** — Run: `npm test -- --run About`. Expected: FAIL (no portrait yet in About).
- [ ] **Step 3: Implement** — add the portrait to `About` with dark-palette styling.
- [ ] **Step 4: Run test, verify it passes** — Run: `npm test -- --run About`. Expected: PASS.
- [ ] **Step 5: Commit** — `feat: move portrait into about with engineer framing`.

---

### Task 5: Section polish pass (dark palette + motion across the site)

**Files:**
- Modify: `src/components/Nav.jsx`/`.css`, `src/components/Footer.css`, `src/components/ProjectCard.jsx`, `src/sections/Experience.css`, `src/sections/Projects.css`, `src/sections/Skills.css`, `src/sections/BeyondCode.css`, `src/sections/Contact.jsx`/`.css`, `src/pages/ProjectDetail.css`, `src/sections/Hero.css` as needed
- Test: all existing section tests (must stay green); no new behavior tests (visual polish)

**Interfaces:**
- Consumes: Task 1 tokens, `MagneticButton` (swap primary CTAs: Contact submit, ProjectDetail repo/demo, Nav CV where appropriate), `Reveal` springs.
- Produces: every section restyled to the dark palette — mono eyebrows/labels, hairline rules, `.dot-grid` accents, refined spacing, accent iris for interactive cues; project/beyond placeholder images restyled or regenerated for dark if needed (`scripts/make-placeholders.mjs` palette update, re-run).

- [ ] **Step 1: Apply the polish** — update the section/component CSS and swap key CTAs to `MagneticButton`. Content/markup/ids/links unchanged so existing tests hold. If placeholder SVGs clash on dark, update `scripts/make-placeholders.mjs` colors and re-run `node scripts/make-placeholders.mjs`.
- [ ] **Step 2: Run the full suite** — Run: `npm test -- --run`. Expected: all green (existing section tests assert content/ids/links, which are unchanged).
- [ ] **Step 3: Build and visual review** — Run: `npm run build` (success). Review responsiveness, reduced-motion (DevTools emulate), and that the dark palette is cohesive; adjust CSS as needed (no behavior change).
- [ ] **Step 4: Commit** — `feat: dark palette + spring motion polish across sections`.

---

### Task 6: Final integration + reduced-motion/meta sweep

**Files:**
- Modify: `index.html` (theme-color to dark; OG description unchanged), `src/styles/global.css` (ensure reduced-motion still neutralizes the new springs/transform animations), `public/favicon.svg` (dark/iris variant — optional)
- Test: full suite

**Interfaces:**
- Consumes: everything above.

- [ ] **Step 1: Reduced-motion sweep** — confirm the global `prefers-reduced-motion` block neutralizes spring/transform animations introduced in Tasks 2–3; add any missing guards. Update `index.html` `theme-color` to the dark base.
- [ ] **Step 2: Verify** — Run: `npm test -- --run` (full suite PASS) and `npm run build` (success, `dist/_redirects` present).
- [ ] **Step 3: Commit** — `chore: dark theme-color and reduced-motion sweep`.

---

## Notes for the executor

- This is a restyle of a tested app: lean on the existing section tests as a safety net; only Hero (portrait removed) and About (portrait added) have assertion changes, plus the extended contrast test.
- Keep placeholder images a one-file swap; if recolored for dark, keep the same paths.
- Do not add a 3D engine. "3D-ish" depth is CSS perspective/parallax only.
