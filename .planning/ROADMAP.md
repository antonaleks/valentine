# ROADMAP: Valentine Site for Fiancée

**Version:** 1.0
**Created:** 2025-02-11
**Depth:** Standard
**Stack:** React 18+, TypeScript, Vite, GitHub Pages

---

## Overview

This roadmap delivers an interactive "Will you be my valentine?" website featuring a playful "runaway No button" mechanic. The project follows a React + Vite stack with mobile-first design, Pinterest-inspired aesthetic, and automated GitHub Pages deployment.

**Core delivery order:** Foundation → Interactions → Design Polish → Deployment & Performance

---

## Phases

### Phase 1: Foundation Setup

**Goal:** Project scaffolded with React + TypeScript + Vite, basic page structure and routing functional

**Dependencies:** None (foundation phase)

**Requirements:**
- PAGE-01: Main page with "Will you be my valentine?" question
- PAGE-02: Success/celebration page  
- PAGE-03: React Router navigation between pages
- TECH-01: React 18+ with TypeScript
- TECH-02: Vite build tool configured
- TECH-05: Hot reload development environment

**Success Criteria:**
1. Developer can run `npm run dev` and see the main page load in browser
2. Navigation between main page and success page works via React Router
3. TypeScript compiles without errors, strict mode enabled
4. Project folder structure follows React best practices (components/, pages/, assets/)
5. Vite build completes successfully with `npm run build`

**Plans:** 1 plan (Complete)

Plans:
- [x] `01-foundation-setup-01-PLAN.md` — Scaffold React + TypeScript + Vite with React Router, folder structure, and verification

---

### Phase 2: Interactive Mechanics

**Goal:** The signature "runaway button" mechanic works flawlessly on both desktop and mobile

**Dependencies:** Phase 1 (requires page structure and routing)

**Requirements:**
- INTR-01: Stable "Yes" button that navigates to success page
- INTR-02: "No" button evades mouse cursor (hover events)
- INTR-03: "No" button evades touch on mobile (touch events)
- INTR-04: "No" button stays within viewport boundaries
- INTR-05: Humorous message rotation when attempting to click "No" (min 5 variants)
- INTR-06: Smooth CSS animations for button movement (GPU-accelerated)
- PERF-04: CSS animations use transform/opacity only

**Success Criteria:**
1. On desktop: Moving mouse toward "No" button causes it to move away smoothly
2. On mobile: Attempting to tap "No" button causes it to relocate before tap registers
3. "No" button never moves outside visible screen area (tested on iPhone SE 375px)
4. User sees at least 5 different humorous messages when chasing "No" button
5. Button movement stays at 60fps on mid-range mobile devices
6. "Yes" button is always clickable and navigates to success page reliably

**Plans:** 2 plans

Plans:
- [ ] `02-interactive-mechanics-01-PLAN.md` — Create RunawayButton component with pointer evasion, viewport boundaries, message rotation, and GPU-accelerated CSS
- [ ] `02-interactive-mechanics-02-PLAN.md` — Integrate RunawayButton into HomePage, add layout CSS, verify desktop/mobile flow and 60fps performance

---

### Phase 3: Visual Design & Photo Integration

**Goal:** Site has Pinterest-inspired fancy/minimalist aesthetic with photo placeholders ready

**Dependencies:** Phase 2 (requires working interactions to apply styles to)

**Requirements:**
- DSGN-01: Fancy/minimalist design in Pinterest style
- DSGN-02: Color scheme: pink/red/white tones
- DSGN-03: Mobile-first responsive design (320px+)
- DSGN-04: Touch-friendly button sizes (min 44x44px)
- DSGN-05: Decorative floating elements (hearts, sparkles)
- DSGN-06: Google Fonts with elegant heading typography
- PHOTO-01: `public/photos/` folder for couple photos
- PHOTO-02: Photo placeholder on success page
- PHOTO-03: Optimized image loading (lazy loading)
- PERF-03: Images optimized (WebP with fallback)

**Success Criteria:**
1. Site renders beautifully on mobile (320px+) with no horizontal scrolling
2. Visual design matches Pinterest "fancy minimalist" aesthetic (soft gradients, elegant typography)
3. All interactive elements are minimum 44x44px touch targets
4. Floating hearts/sparkles animate continuously without performance issues
5. Photo placeholder visible on success page with clear indication where user adds photos
6. All images use WebP format with fallbacks, loading lazily
7. Typography uses Google Fonts (e.g., Playfair Display or similar elegant font for headings)

---

### Phase 4: Deployment & Performance Optimization

**Goal:** Site deployed to GitHub Pages with optimized performance metrics

**Dependencies:** Phase 3 (requires complete site before deployment)

**Requirements:**
- TECH-03: GitHub Actions CI/CD workflow
- TECH-04: GitHub Pages deployment configured
- TECH-06: Optimized production build
- PERF-01: First Contentful Paint < 1.5s on mobile
- PERF-02: Bundle size < 200KB (gzipped)
- PHOTO-04: README with photo addition instructions

**Success Criteria:**
1. Push to `main` branch triggers automatic deployment via GitHub Actions
2. Site is live and accessible at `https://[username].github.io/[repo-name]`
3. Lighthouse audit shows First Contentful Paint < 1.5s on mobile simulation
4. Production bundle size is under 200KB gzipped (verified via build analyzer)
5. README.md includes clear instructions for adding photos to `public/photos/`
6. All assets load correctly from GitHub Pages (no 404s for CSS/JS/images)

---

## Progress

| Phase | Goal | Requirements | Success Criteria | Status |
|-------|------|--------------|------------------|--------|
| 1 | Foundation Setup | 6 | 5 | ✅ Complete |
| 2 | Interactive Mechanics | 7 | 6 | ⏳ In Progress |
| 3 | Visual Design & Photos | 10 | 7 | ⏳ Pending |
| 4 | Deployment & Performance | 6 | 6 | ⏳ Pending |

---

## Requirement Coverage

| Requirement | Phase | Status |
|-------------|-------|--------|
| PAGE-01 | Phase 1 | Pending |
| PAGE-02 | Phase 1 | Pending |
| PAGE-03 | Phase 1 | Pending |
| INTR-01 | Phase 2 | Pending |
| INTR-02 | Phase 2 | Pending |
| INTR-03 | Phase 2 | Pending |
| INTR-04 | Phase 2 | Pending |
| INTR-05 | Phase 2 | Pending |
| INTR-06 | Phase 2 | Pending |
| DSGN-01 | Phase 3 | Pending |
| DSGN-02 | Phase 3 | Pending |
| DSGN-03 | Phase 3 | Pending |
| DSGN-04 | Phase 3 | Pending |
| DSGN-05 | Phase 3 | Pending |
| DSGN-06 | Phase 3 | Pending |
| PHOTO-01 | Phase 3 | Pending |
| PHOTO-02 | Phase 3 | Pending |
| PHOTO-03 | Phase 3 | Pending |
| PHOTO-04 | Phase 4 | Pending |
| TECH-01 | Phase 1 | Pending |
| TECH-02 | Phase 1 | Pending |
| TECH-03 | Phase 4 | Pending |
| TECH-04 | Phase 4 | Pending |
| TECH-05 | Phase 1 | Pending |
| TECH-06 | Phase 4 | Pending |
| PERF-01 | Phase 4 | Pending |
| PERF-02 | Phase 4 | Pending |
| PERF-03 | Phase 3 | Pending |
| PERF-04 | Phase 2 | Pending |

**Coverage Summary:**
- Total v1 requirements: 24
- Mapped to phases: 24
- Unmapped: 0 ✓

---

## Notes

### Stack Decision Context

While research recommended vanilla JS for simplicity, this project uses React + Vite + TypeScript as specified in PROJECT.md constraints. This provides:
- Component reusability for buttons and decorative elements
- Type safety with TypeScript
- Modern development experience with Vite HMR
- Scalability for potential v2 enhancements (confetti, gallery, etc.)

### Phase Ordering Rationale

1. **Foundation First:** React setup and routing must work before any features
2. **Core Mechanics Before Polish:** Runaway button is the signature feature; must be functional before visual enhancements
3. **Design After Functionality:** Applying CSS/styling to broken interactions wastes effort
4. **Deployment Last:** Only deploy working, polished product

### Mobile-First Priority

Per research, 70%+ of traffic will be mobile. Every phase includes mobile-specific success criteria:
- Phase 1: Responsive base
- Phase 2: Touch event handling
- Phase 3: Touch-friendly sizing and mobile performance
- Phase 4: Mobile performance metrics (FCP < 1.5s)

---

*Last updated: 2025-02-11*
