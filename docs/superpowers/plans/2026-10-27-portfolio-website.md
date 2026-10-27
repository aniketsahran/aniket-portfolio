# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Aniket Sahran's static, scroll-animated personal portfolio website that reads as a warm, well-rounded person with deep technical chops, leading with his AI-agent infrastructure work.

**Architecture:** A React + Vite single-page app with client-side routing: one long animated home page composed of section components, plus a per-project detail route. All résumé-derived content lives in one data module (`src/data/content.js`) so every component renders from a single source of truth. Scroll animations come from Framer Motion reveal wrappers over a Lenis smooth-scroll context, degrading gracefully under `prefers-reduced-motion`. Output is a static bundle deployed to Netlify.

**Tech Stack:** React 18, Vite 5, React Router 6, Framer Motion, Lenis, plain CSS (CSS custom properties), Vitest + React Testing Library (+ jsdom) for tests.

**Spec:** `docs/superpowers/specs/2026-10-27-portfolio-website-design.md`

## Global Constraints

- Language: **plain JavaScript, no TypeScript.** `.jsx` for components.
- Stack is fixed: React + Vite, React Router, Framer Motion, Lenis, plain CSS. No Tailwind/CSS-in-JS.
- All rendered content comes from `src/data/content.js`. No content hardcoded in components (DRY). No invented facts, metrics, employers, or projects — résumé only.
- Palette as CSS variables: `--bg: #faf7f2`, `--ink: #1a1a1a`, `--accent: #c2663a`, plus a warm muted grey for secondary text. Builder refines exact values for **WCAG AA** contrast; the accent-on-paper and ink-on-paper pairs must pass AA for their text sizes.
- Single committed light theme. **No dark-mode toggle.**
- Hero tagline verbatim: `I turn hard systems problems into reliable software — and I'll happily learn whatever the next one needs.`
- Contact links (verbatim): email `aniketsahran3@gmail.com`, phone `+91-8700161082`, LinkedIn `https://www.linkedin.com/in/aniket-sahran-453586201/`, GitHub `https://github.com/aniketsahran`.
- All animations respect `prefers-reduced-motion: reduce` (no/minimal motion; content fully visible without scrolling-triggered reveals).
- Static build only; must deploy to Netlify with working deep links on the project route.
- Portrait asset: `public/assets/portrait.jpg` (copy from repo-root `assets/portrait.jpg`). CV asset: `public/Aniket_Resume.pdf` (may be absent at build time; link still points there).
- Placeholder images (project screenshots, Beyond Code photos) must be a one-file swap to replace later — referenced by stable paths under `public/assets/`.

## Review Focus

- **Unknown project slug** (`/projects/anything-wrong`): detail page shows a graceful "not found" with a link home, never a crash/blank. → Task 9.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, every section's content is present and visible without animation. → Task 3.
- **Mailto encoding:** contact form with spaces, newlines, and special characters (`&`, `?`, `#`) produces a correctly percent-encoded `mailto:` URL. → Task 12.
- **Netlify deep-link refresh:** loading/refreshing `/projects/:slug` directly serves the SPA (redirect rule), not a 404. → Task 13.
- **Accessibility of images & form:** portrait and content images have meaningful `alt` text; form fields have associated labels. → Tasks 5 and 12.

---

### Task 1: Project scaffold, tooling, and theme foundation

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/styles/theme.css`, `src/styles/global.css`
- Create: `src/test/setup.js`
- Create (assets): `public/assets/portrait.jpg` (copied from `assets/portrait.jpg`), placeholder images under `public/assets/` (see Task 8/11 for names)
- Test: `src/test/smoke.test.jsx`

**Interfaces:**
- Produces: a runnable Vite app; `App` default export rendered into `#root`; Vitest configured via `vite.config.js` `test` block with `jsdom` + `src/test/setup.js` (imports `@testing-library/jest-dom`).

- [ ] **Step 1: Write the failing test** — `smoke.test.jsx`: renders `<App />` inside a `MemoryRouter`, asserts the document contains text `Aniket Sahran`.
- [ ] **Step 2: Run test, verify it fails** — Run: `npm test -- --run`. Expected: FAIL (module/app not found).
- [ ] **Step 3: Scaffold the app** — Create a Vite React (JS) project; install `react-router-dom`, `framer-motion`, `lenis`; dev-install `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`. Add `"test": "vitest"` script. Configure `vite.config.js` test block. Define palette CSS variables in `theme.css` and base/reset + typography in `global.css`, imported from `main.jsx`. Minimal `App.jsx` renders `Aniket Sahran`. Copy portrait into `public/assets/`.
- [ ] **Step 4: Run test, verify it passes** — Run: `npm test -- --run`. Expected: PASS. Also run `npm run build`; expect a successful static build.
- [ ] **Step 5: Commit** — `chore: scaffold vite react app with theme + test setup`.

---

### Task 2: Content data module

**Files:**
- Create: `src/data/content.js`
- Test: `src/data/content.test.js`

**Interfaces:**
- Produces: a single default export `content` (and named exports) with this shape:
  - `profile`: `{ name, location, tagline, heroEyebrow, heroHeadline, heroSubline, email, phone, links: { linkedin, github }, resumePath }`
  - `about`: `{ paragraphs: string[], education: Array<{ degree, place, period, detail }> }`
  - `experience`: `Array<{ company, role, period, location, bullets: string[] }>`
  - `projects`: `Array<{ slug, name, kind, summary, tech: string[], highlights: string[], repoUrl, demoUrl?, images: string[] }>` — slugs: `filmpire`, `student-management-system`, `noterrrr`
  - `skills`: `Array<{ group, items: string[] }>` (Languages, Frameworks, Deployment, Developer Tools, Cloud/Databases, Coursework)
  - `beyondCode`: `{ volunteering: { org, role, period, items: string[], images: string[] }, leadership: { org, role, period, items: string[] } }`
  - `achievements`: `Array<{ title, year }>`
- Content values copied verbatim from the spec's Content Inventory. SMS `repoUrl` is a placeholder `#` for now; Filmpire/Noterrrr `repoUrl` point to `https://github.com/aniketsahran`.

- [ ] **Step 1: Write the failing test** — `content.test.js` asserts: `profile.name === 'Aniket Sahran'`; `profile.links.github === 'https://github.com/aniketsahran'`; `profile.tagline` equals the verbatim tagline from Global Constraints; `experience.length === 2`; `projects.map(p => p.slug)` equals `['filmpire','student-management-system','noterrrr']`; `beyondCode.volunteering.org === 'Cloudera Cares'`.
- [ ] **Step 2: Run test, verify it fails** — Run: `npm test -- --run content`. Expected: FAIL (no module).
- [ ] **Step 3: Implement `src/data/content.js`** — Fill every field from the spec's Content Inventory. No invented data.
- [ ] **Step 4: Run test, verify it passes** — Run: `npm test -- --run content`. Expected: PASS.
- [ ] **Step 5: Commit** — `feat: add résumé-sourced content data module`.

---

### Task 3: Smooth-scroll context + Reveal animation primitive

**Files:**
- Create: `src/components/SmoothScroll.jsx`, `src/components/Reveal.jsx`, `src/hooks/useReducedMotion.js`
- Test: `src/components/Reveal.test.jsx`

**Interfaces:**
- Consumes: `framer-motion`, `lenis`.
- Produces:
  - `SmoothScroll({ children })` — wraps app in a Lenis-driven smooth-scroll effect; disables smoothing under reduced motion; renders `children` directly.
  - `Reveal({ children, as, delay })` — wraps content in a Framer Motion element that animates from hidden (opacity 0, slight y-offset) to visible on scroll into view (`whileInView`, `viewport={{ once: true }}`). Under reduced motion it renders children with no transform/opacity animation (immediately visible). `as` defaults to `div`.
  - `useReducedMotion()` → `boolean`.

- [ ] **Step 1: Write the failing test** — `Reveal.test.jsx`: renders `<Reveal><p>hello</p></Reveal>`, asserts `hello` is in the document (children always render regardless of animation state).
- [ ] **Step 2: Run test, verify it fails** — Run: `npm test -- --run Reveal`. Expected: FAIL.
- [ ] **Step 3: Implement the three files** — `useReducedMotion` reads `matchMedia('(prefers-reduced-motion: reduce)')` and subscribes to changes. `Reveal` uses it to pick animated vs. static render. `SmoothScroll` initializes Lenis in an effect with RAF loop and cleans up.
- [ ] **Step 4: Run test, verify it passes** — Run: `npm test -- --run Reveal`. Expected: PASS.
- [ ] **Step 5: Commit** — `feat: add smooth-scroll context and Reveal animation primitive`.

---

### Task 4: Navigation bar + routing shell

**Files:**
- Create: `src/components/Nav.jsx`, `src/components/Nav.css`
- Modify: `src/App.jsx` (add `BrowserRouter` routes: `/` → `Home` placeholder, `/projects/:slug` → `ProjectDetail` placeholder), wrap in `SmoothScroll`
- Test: `src/components/Nav.test.jsx`

**Interfaces:**
- Consumes: `content.profile` (resumePath, section anchor ids).
- Produces: `Nav()` renders brand `AS` and links to in-page anchors (`#work`, `#about`, `#beyond`) plus a CV link (`<a href={resumePath} download>`). On non-home routes, anchor links navigate to `/#anchor`.

- [ ] **Step 1: Write the failing test** — `Nav.test.jsx`: render `<Nav />` in a router; assert a link with text matching `CV` has `href` ending `Aniket_Resume.pdf`; assert links for `Work`, `About`, `Beyond Code` exist.
- [ ] **Step 2: Run test, verify it fails** — Run: `npm test -- --run Nav`. Expected: FAIL.
- [ ] **Step 3: Implement `Nav` and wire routes** — Build the nav; add routes and `SmoothScroll` wrapper in `App.jsx` with placeholder page components so routing resolves.
- [ ] **Step 4: Run test, verify it passes** — Run: `npm test -- --run Nav`. Expected: PASS.
- [ ] **Step 5: Commit** — `feat: add nav and routing shell`.

---

### Task 5: Hero section

**Files:**
- Create: `src/sections/Hero.jsx`, `src/sections/Hero.css`
- Test: `src/sections/Hero.test.jsx`

**Interfaces:**
- Consumes: `content.profile` (heroEyebrow, heroHeadline, heroSubline/tagline, links, resumePath), portrait at `/assets/portrait.jpg`.
- Produces: `Hero()` — eyebrow, headline leading with AI-agent infrastructure, the verbatim tagline, portrait `<img alt="Aniket Sahran">`, two CTAs: primary "View my work" (anchors `#work`) and secondary "Download CV" (`resumePath`, `download`). Entrance animation via Framer Motion; reduced-motion safe.

- [ ] **Step 1: Write the failing test** — `Hero.test.jsx`: assert the verbatim tagline text renders; assert an `img` with accessible name `Aniket Sahran`; assert a "Download CV" link to the resume path and a "View my work" control to `#work`.
- [ ] **Step 2: Run test, verify it fails** — Run: `npm test -- --run Hero`. Expected: FAIL.
- [ ] **Step 3: Implement `Hero`** — Layout is image-plus-text; builder sets exact composition/responsive behavior.
- [ ] **Step 4: Run test, verify it passes** — Run: `npm test -- --run Hero`. Expected: PASS.
- [ ] **Step 5: Commit** — `feat: add hero section`.

---

### Task 6: About section

**Files:**
- Create: `src/sections/About.jsx`, `src/sections/About.css`
- Test: `src/sections/About.test.jsx`

**Interfaces:**
- Consumes: `content.about` (paragraphs, education), `content.achievements`.
- Produces: `About()` with `id="about"` — warm intro paragraphs in the curious-generalist voice, education entries (Thapar B.E. with CGPA 9.39, Salwan XII), and a compact achievements highlights strip (Merit Award, top-5% scholarship, K8s SIGs contributions), each block wrapped in `Reveal`.

- [ ] **Step 1: Write the failing test** — `About.test.jsx`: assert `id="about"` present; assert text `9.39` and `Thapar Institute of Engineering and Technology` render; assert an achievement containing `Merit Award` renders.
- [ ] **Step 2: Run test, verify it fails** — Run: `npm test -- --run About`. Expected: FAIL.
- [ ] **Step 3: Implement `About`** — Prose from `content.about` (written in approved voice, no invented facts).
- [ ] **Step 4: Run test, verify it passes** — Run: `npm test -- --run About`. Expected: PASS.
- [ ] **Step 5: Commit** — `feat: add about section`.

---

### Task 7: Experience timeline

**Files:**
- Create: `src/sections/Experience.jsx`, `src/sections/Experience.css`
- Test: `src/sections/Experience.test.jsx`

**Interfaces:**
- Consumes: `content.experience`.
- Produces: `Experience()` — an animated vertical timeline; one node per role (Cloudera SDE-II, Cloudera Intern) with period, location, and bullets; each node wrapped in `Reveal`.

- [ ] **Step 1: Write the failing test** — `Experience.test.jsx`: assert both `Software Developer - II` and `Software Development Intern` render; assert a bullet containing `Kubernetes operator` renders.
- [ ] **Step 2: Run test, verify it fails** — Run: `npm test -- --run Experience`. Expected: FAIL.
- [ ] **Step 3: Implement `Experience`** — Map `content.experience`; builder designs the timeline visual.
- [ ] **Step 4: Run test, verify it passes** — Run: `npm test -- --run Experience`. Expected: PASS.
- [ ] **Step 5: Commit** — `feat: add experience timeline`.

---

### Task 8: Projects section + ProjectCard

**Files:**
- Create: `src/sections/Projects.jsx`, `src/components/ProjectCard.jsx`, `src/sections/Projects.css`
- Create (assets): placeholder images referenced by `content.projects[].images` under `public/assets/projects/`
- Test: `src/sections/Projects.test.jsx`

**Interfaces:**
- Consumes: `content.projects`.
- Produces: `Projects()` with `id="work"`; `ProjectCard({ project })` renders name, kind, summary, tech chips, a thumbnail image, and a `Link` to `/projects/${project.slug}`.

- [ ] **Step 1: Write the failing test** — `Projects.test.jsx`: render in a router; assert 3 cards; assert a link with `href` `/projects/filmpire` and one `/projects/noterrrr`; assert `id="work"` present.
- [ ] **Step 2: Run test, verify it fails** — Run: `npm test -- --run Projects`. Expected: FAIL.
- [ ] **Step 3: Implement `Projects` and `ProjectCard`** — Add placeholder project images; hover/press motion on cards.
- [ ] **Step 4: Run test, verify it passes** — Run: `npm test -- --run Projects`. Expected: PASS.
- [ ] **Step 5: Commit** — `feat: add projects section with cards`.

---

### Task 9: Project detail page

**Files:**
- Create: `src/pages/ProjectDetail.jsx`, `src/pages/ProjectDetail.css`
- Modify: `src/App.jsx` (replace placeholder with real `ProjectDetail`)
- Test: `src/pages/ProjectDetail.test.jsx`

**Interfaces:**
- Consumes: `content.projects`, `useParams()`.
- Produces: `ProjectDetail()` — looks up project by `slug`; renders a page built around the project (hero title/kind, summary, tech stack, highlights, placeholder screenshots, repo/demo links, back-to-home link). For an unknown slug, renders a "Project not found" message with a link to `/`.

- [ ] **Step 1: Write the failing tests** — `ProjectDetail.test.jsx`: (a) at route `/projects/filmpire`, assert the project name `Filmpire` and a repo link render; (b) **[Review Focus: unknown slug]** at `/projects/nope`, assert text `not found` (case-insensitive) and a link to `/` render, with no throw.
- [ ] **Step 2: Run tests, verify they fail** — Run: `npm test -- --run ProjectDetail`. Expected: FAIL.
- [ ] **Step 3: Implement `ProjectDetail`** — Guard the lookup; render not-found branch when missing.
- [ ] **Step 4: Run tests, verify they pass** — Run: `npm test -- --run ProjectDetail`. Expected: PASS.
- [ ] **Step 5: Commit** — `feat: add project detail page with not-found guard`.

---

### Task 10: Skills section

**Files:**
- Create: `src/sections/Skills.jsx`, `src/sections/Skills.css`
- Test: `src/sections/Skills.test.jsx`

**Interfaces:**
- Consumes: `content.skills`.
- Produces: `Skills()` — grouped skill lists as animated chips/columns; each group wrapped in `Reveal`.

- [ ] **Step 1: Write the failing test** — `Skills.test.jsx`: assert group label `Languages` and item `Golang` render; assert group `Deployment` (or spec's label) with `Kubernetes`.
- [ ] **Step 2: Run test, verify it fails** — Run: `npm test -- --run Skills`. Expected: FAIL.
- [ ] **Step 3: Implement `Skills`** — Map `content.skills`.
- [ ] **Step 4: Run test, verify it passes** — Run: `npm test -- --run Skills`. Expected: PASS.
- [ ] **Step 5: Commit** — `feat: add skills section`.

---

### Task 11: Beyond Code section

**Files:**
- Create: `src/sections/BeyondCode.jsx`, `src/sections/BeyondCode.css`
- Create (assets): placeholder photos under `public/assets/beyond/` referenced by `content.beyondCode.volunteering.images`
- Test: `src/sections/BeyondCode.test.jsx`

**Interfaces:**
- Consumes: `content.beyondCode`.
- Produces: `BeyondCode()` with `id="beyond"` — a photo-forward gallery for Cloudera Cares volunteering (placeholder images, meaningful `alt`) plus the ISTE General Secretary leadership block; `Reveal`-animated.

- [ ] **Step 1: Write the failing test** — `BeyondCode.test.jsx`: assert `id="beyond"`; assert `Cloudera Cares` and `General Secretary` render; assert at least one gallery `img` has non-empty `alt`.
- [ ] **Step 2: Run test, verify it fails** — Run: `npm test -- --run BeyondCode`. Expected: FAIL.
- [ ] **Step 3: Implement `BeyondCode`** — Gallery + leadership; placeholder images swap-ready.
- [ ] **Step 4: Run test, verify it passes** — Run: `npm test -- --run BeyondCode`. Expected: PASS.
- [ ] **Step 5: Commit** — `feat: add beyond code section`.

---

### Task 12: Contact section + mailto form

**Files:**
- Create: `src/sections/Contact.jsx`, `src/sections/Contact.css`, `src/lib/mailto.js`
- Test: `src/lib/mailto.test.js`, `src/sections/Contact.test.jsx`

**Interfaces:**
- Consumes: `content.profile` (email, links).
- Produces:
  - `buildMailto({ to, subject, body })` → a `mailto:` URL string with `subject` and `body` percent-encoded via `encodeURIComponent`.
  - `Contact()` with `id="contact"` — labelled fields (name, subject, message), social/email links, and a submit that navigates to `buildMailto(...)` composing to `aniketsahran3@gmail.com`.

- [ ] **Step 1: Write the failing tests** — `mailto.test.js` **[Review Focus: mailto encoding]**: `buildMailto({to:'a@b.com', subject:'Hi & bye?', body:'line1\nline2 #x'})` starts with `mailto:a@b.com?` and contains `subject=Hi%20%26%20bye%3F` and a body with `%0A` and `%23`. `Contact.test.jsx`: assert fields have associated labels (query by label text) and social links render.
- [ ] **Step 2: Run tests, verify they fail** — Run: `npm test -- --run mailto Contact`. Expected: FAIL.
- [ ] **Step 3: Implement `buildMailto` and `Contact`** — Form state → `buildMailto` on submit; builder decides submit mechanism (e.g. `window.location.href`).
- [ ] **Step 4: Run tests, verify they pass** — Run: `npm test -- --run mailto Contact`. Expected: PASS.
- [ ] **Step 5: Commit** — `feat: add contact section with mailto form`.

---

### Task 13: Assemble home page, polish, and Netlify deploy config

**Files:**
- Create: `src/pages/Home.jsx`, `public/_redirects`, `netlify.toml`
- Modify: `src/App.jsx` (use real `Home`), `index.html` (title, meta description, Open Graph tags, favicon), `src/sections/*` ordering
- Create (assets): `public/favicon.svg`
- Test: `src/pages/Home.test.jsx`

**Interfaces:**
- Consumes: all section components.
- Produces: `Home()` composing Hero → About → Experience → Projects → Skills → BeyondCode → Contact in order. `public/_redirects` contains `/*    /index.html   200` for SPA deep links on Netlify.

- [ ] **Step 1: Write the failing test** — `Home.test.jsx`: render `<Home />` in a router; assert presence of anchors `#about`, `#work`, `#beyond`, `#contact` (one element each) confirming all sections mount in order.
- [ ] **Step 2: Run test, verify it fails** — Run: `npm test -- --run Home`. Expected: FAIL.
- [ ] **Step 3: Implement `Home` + polish** — Compose sections; set page `<title>`/meta/OG/favicon; add `_redirects` **[Review Focus: Netlify deep-link refresh]** and `netlify.toml` build config (`npm run build`, publish `dist`). Verify responsive layout and reduced-motion behavior by review.
- [ ] **Step 4: Verify** — Run: `npm test -- --run` (full suite PASS) and `npm run build` (successful). Expected: all green, `dist/` produced, `_redirects` copied into `dist`.
- [ ] **Step 5: Commit** — `feat: assemble home page and add netlify deploy config`.

---

## Notes for the executor

- Replaceable assets: keep every placeholder image at a stable path under `public/assets/` and named by project slug / topic, so Aniket can drop real files over them without code changes.
- When the real `Aniket_Resume.pdf` and Student Management System repo URL arrive, they are a content-data / asset swap only (edit `src/data/content.js` and drop the PDF into `public/`), no component changes.
