# Aniket Sahran — Portfolio Website Design

**Date:** 2026-10-27
**Status:** Awaiting approval

## Intent & Why

Aniket Sahran is a Software Engineer at Cloudera building Kubernetes and
AI-agent infrastructure. He is applying to Master's programs in Computer
Science and needs a personal portfolio website.

The site's single north star, in his words: a visitor (admissions reviewer or
recruiter) should walk away thinking he is **"not just a good worker or
researcher but also a good person, who has well-rounded skills and is ready to
learn anything and everything."**

This matters because a résumé alone reads as "good worker" but never conveys
"good person" or "well-rounded." The website exists to carry the human and
character dimension that the résumé cannot — while still demonstrating real
technical depth.

Inspiration: [aswin-shine.dev](https://aswin-shine.dev) — specifically (1) its
scroll animations, (2) the way each project gets its own detail page built
*around* the project, and (3) its overall section structure.

## Goals

- Convey a warm, human, well-rounded person alongside genuine technical depth.
- Lead with his current work: **AI agent infrastructure**.
- Foreground "ready to learn anything and everything" as a defining trait.
- Rich scroll-driven animations as the primary source of personality/polish.
- Dedicated detail page per project, built around the project.
- Downloadable CV (his résumé PDF).
- Pull all content from his résumé (see Content Inventory).

## Non-Goals

- No CMS, backend, database, or authentication. Fully static site. (The contact
  form is `mailto:`-based — no server.)
- No blog.
- No dark/light theme toggle — the single warm look is committed (see below).
- Not carrying over text from his old Netlify site (it was client-rendered and
  unreadable; he explicitly said to use the résumé as the source instead).

## Anti-Goals (what makes this a failure even if it "works")

- Reading as cold, corporate, or purely infra/ops (defeats the human goal).
- Feeling like a reformatted résumé (a flat list of bullets).
- Animations that are gratuitous, janky, or hurt readability/performance.
- Burying the volunteering and leadership — those are what sell "good person."

## Decisions Already Made (by Aniket)

### Structure (approved)

Single animated scrolling main page with 7 sections, plus breakout pages:

1. **Hero** — name, tagline, CTAs (View Work, Download CV).
2. **About** — short, human intro in his voice. Top-of-program / 9.39 CGPA woven
   in lightly, not as a brag.
3. **Experience** — Cloudera SDE-II and Intern as an animated timeline,
   highlighting the biggest hits (K8s operator, agent-sandbox integration,
   Git-style workflow versioning, Cadence upgrade infra).
4. **Selected Work / Projects** — Filmpire, Student Management System, Noterrrr
   as cards; each card links to its own detail page.
5. **Skills & Toolbox** — languages, frameworks, deploy tools, cloud/DB,
   grouped and animated in on scroll.
6. **Beyond Code** — the "good person" section: Cloudera Cares (braille cards,
   painting a government school, handmade cards for underprivileged children)
   and ISTE General Secretary leadership. This is the equivalent of the
   reference site's "Photographs" page.
7. **Contact** — email, LinkedIn, GitHub, closing line.

Breakout pages: one **project detail page** per project (×3), and the **CV**
(PDF download, linked from hero and nav).

### Visual direction (approved): Warm Paper + Terracotta

- Background: warm off-white / cream (approx `#faf7f2`).
- Ink: near-black (approx `#1a1a1a`).
- Accent: warm terracotta (approx `#c2663a`).
- Muted/secondary text: warm grey.
- Single committed light look. **No dark mode toggle.**
- Feel: approachable, thoughtful, human — but still crisp and modern.
- Exact hex values are the builder's call to refine for contrast/accessibility;
  the above are the agreed starting palette.

### Voice & hero (approved)

- Tagline voice: **"the curious generalist"** —
  *"I turn hard systems problems into reliable software — and I'll happily learn
  whatever the next one needs."*
- The hero headline leads with **AI agent infrastructure** (confirmed accurate —
  it's exactly what he works on now).
- Suggested hero copy (builder may refine wording, keep the voice and the
  AI-agent-infra lead):
  - Eyebrow: `ANIKET SAHRAN · BENGALURU`
  - Headline: something leading with building infrastructure that AI agents run
    on.
  - Subline: Software Engineer at Cloudera — Kubernetes operators, agent
    sandboxes, and the plumbing that makes complex systems quietly reliable.
  - CTAs: **View my work** (primary, terracotta) · **Download CV** (secondary).

### Tech stack (builder's/my call, Aniket approved handing it over; he asked only for a JS frontend)

- **React + Vite**, plain **JavaScript** (no TypeScript — kept approachable so
  he can tweak it).
- **Framer Motion** for scroll/reveal animations; **Lenis** for smooth scroll.
- Plain CSS (CSS variables for the palette). No Tailwind/CSS-in-JS unless the
  builder has a strong reason.
- Deploy target: **Netlify** (he used it before). Build must produce a static
  bundle deployable to Netlify.
- Responsive and mobile-friendly (see Open Items for how far to push mobile
  animation parity).

## Content Inventory (source: résumé)

**Identity:** Aniket Sahran · Bengaluru · aniketsahran3@gmail.com ·
LinkedIn · GitHub · +91-8700161082.

**Education:**
- B.E. Computer Science and Business Systems, Thapar Institute of Engineering
  and Technology, Patiala, 2020–24, **CGPA 9.39**.
- Senior Secondary (XII), Salwan Public School, Gurugram, 2020, 95.6%.

**Experience — Cloudera, Software Developer II (Jul 2024–Present), Bengaluru:**
- Integrated `kubernetes-sigs/agent-sandbox` into Cloudera's AI agent platform:
  7 container images across 3 registries, 6 Helm templates, 15 RBAC rules,
  CRD-driven sandbox isolation for secure agent tool execution.
- Built a Kubernetes operator in Go reconciling 2 custom resource types across
  12 reconciliation paths, managing up to 10 K8s resources per workload, with
  sandbox-aware session lifecycle and automated SandboxClaim cleanup to prevent
  orphaned warm-pool pods.
- Architected Git-style versioning for Agentic Workflows in Cloudera Agent
  Studio: branching, workflow persistence, end-to-end audit logging.
- Co-designed backup/restore upgrade infrastructure in Cadence with rollback,
  feature flags, preflight validations; zero-regression across Azure and AWS.
- Led design/onboarding of AI Workbench upgrade workflows to Uber Cadence;
  100% on-schedule delivery, reduced quarterly customer escalations.
- Built a Go/JavaScript microservice for User/Team synchronization; cut user
  sync escalations from ~3/quarter to 0.
- Built automated Helm chart generation using Consul Templates across Commercial
  and FedRAMP environments; eliminated manual chart edits.
- Automated CML Helm config generation/validation via GitHub Actions and
  Jenkins; schema snapshot management and version increment detection.

**Experience — Cloudera, Software Development Intern (Jan 2024–Jun 2024):**
- Idempotent workflow in EKS/AKS clusters to check internet-endpoint access;
  reduced chart install failures by 60% with diagnostic alerts.
- Migrated a micro-service CRUD app to automated Helm chart generation (Consul
  and Gonsul templates).
- Built a micro-service capturing user-generated events via gRPC, stored in a
  structured DB for analysis.

**Projects:**
- **Filmpire** — Movie Recommendation System. JavaScript, Node.js, React.js,
  Express.js, The Movie Database API. React frontend; movie API backend with
  ratings/cast; personalized recommendations, genre tabs, search.
- **Student Management System** — Backend Database Server. Golang, Mockgen,
  PostgreSQL, Docker, Kubernetes, Helm. CRUD API server; Docker/K8s for zero
  downtime and persistent DB; Helm for easy deployment.
- **Noterrrr** — Note-Making Application. JavaScript, Node.js, Express.js,
  React.js, MongoDB. Create/manage notes; login/auth; clean UI.

**Skills:**
- Languages: C, C++, Python, Golang, JavaScript, HTML, CSS.
- Frameworks: Node.js, Express.js, React.js, Protobuf, Uber Cadence, Mockgen.
- Deployment Tools: Docker, Kubernetes, Helm.
- Developer Tools: Command Line, Git, Postman, VS Code, Mongoose, Sanity.
- Cloud/Databases: AWS Basics, Azure Basics, MySQL, Oracle LiveSQL, PostgreSQL,
  MongoDB.
- Coursework: OOP, Data Structures, Operating Systems, Computer Networks.

**Positions of Responsibility:**
- ISTE Thapar Chapter, **General Secretary** (Sep 2020–May 2023): two technical
  projects with teams of ~30 each; organized three inter-college events
  (Colloquium, Hackonix, Quest of the Curious); social media graphics.
- **Cloudera Cares** Volunteer (2024–Present): braille cards for visually
  impaired individuals; painted a government school; handmade cards for
  underprivileged children.

**Achievements:**
- Merit Award, first position in program (2024).
- Academic Scholarship, top 5% students (2024).
- Kubernetes SIGs contributions to agent-sandbox project (2026).

**CV:** The résumé PDF (`Aniket_Resume.pdf`) ships as a downloadable asset.

## Animation Approach (the thing he cares about most)

Model the feel on aswin-shine.dev. Concretely:
- Lenis-powered smooth scrolling site-wide.
- Section and element reveal-on-scroll (fade + translate/mask) via Framer Motion
  `whileInView` / scroll-linked transforms.
- Hero with an entrance animation; subtle parallax or scroll-progress effects
  where tasteful.
- Experience timeline animates in as you scroll through it.
- Project cards with hover/press motion and a considered transition into the
  detail page.
- Respect `prefers-reduced-motion`: degrade gracefully to no/minimal motion.
- Performance budget: animations must stay smooth (target ~60fps) and must not
  block readability or first paint.

## Constraints

- Static build deployable to Netlify.
- Pure JS frontend (no TypeScript).
- Real résumé content only — no invented metrics, employers, or projects.
- Must be maintainable/tweakable by Aniket afterward.

## Left to the Builder

- Exact final hex values (refined for WCAG AA contrast on the warm palette).
- Typography choices (a warm, modern pairing — e.g. a characterful display face
  + clean body; builder picks, consistent with the vibe).
- Precise copy wording for each section (keep the approved voice; no invented
  facts).
- Exact layout within each section and each project detail page.
- Component/file structure of the React app.
- Specific animation parameters, easing, and which effects go where.
- Favicon/site metadata, OG tags.
- Placeholder vs. real imagery for projects (see Open Items).

## Resolved Content Decisions

- **Contact links (final):**
  - Email: `aniketsahran3@gmail.com`
  - Phone: `+91-8700161082`
  - LinkedIn: `https://www.linkedin.com/in/aniket-sahran-453586201/`
  - GitHub: `https://github.com/aniketsahran`
- **Portrait photo: INCLUDED.** Aniket supplied a square 1010×1010 headshot,
  saved at `assets/portrait.jpg`. Use it in the hero and/or About — an
  image-plus-text composition is now in scope (warm, friendly photo supports
  the "good person" goal directly).
- **Project detail pages: image-forward layout with placeholder screenshots.**
  Build the reference-site-style "built around the project" layout now, using
  tasteful **placeholder/sample screenshots** that are trivial to swap for real
  ones later. Aniket will supply real screenshots after launch. Make image
  slots obvious and easy to replace (clear file naming / single asset folder).
- **Project links:** all projects live on Aniket's GitHub
  (`https://github.com/aniketsahran`). The **Student Management System** repo
  does not exist yet — he will create it; use a placeholder/`#` link for that
  one until provided, link the others to his GitHub. Live demo links: use where
  available, otherwise GitHub-only.
- **Beyond Code imagery: placeholder photos now.** Build the photo-forward
  gallery layout using tasteful random/placeholder images (e.g. Unsplash or
  bundled placeholders) that Aniket will replace with his real volunteering
  photos later. Keep swap-in trivial.
- **CV:** `Aniket_Resume.pdf` to be placed in the project (not yet on disk). Ship
  it as a downloadable asset; if absent at build time, wire the download link to
  the expected path so dropping the file in "just works."

## Other Open Items (builder's call unless noted)

1. **Mobile animation parity** — builder's call toward simplified-but-polished
   motion on small screens.
2. **Contact form (mailto-based).** The Contact section includes a simple form
   (e.g. name / subject / message) that composes an email to
   `aniketsahran3@gmail.com` via a `mailto:` link on submit — no backend, stays
   fully static. Social/email links appear alongside it.
3. **Placeholder image strategy** — builder's call; prioritize images that are a
   one-file swap to replace later.
