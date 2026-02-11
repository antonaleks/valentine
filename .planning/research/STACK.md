# Technology Stack

**Project:** Interactive Valentine Website  
**Researched:** 2026-02-11  
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| HTML5 | Living Standard | Page structure | Native, zero overhead, perfect for static sites. No build step needed. |
| CSS3 (Custom) | 2025+ features | Styling & animations | Modern CSS features (container queries, logical properties, `text-wrap: balance`) eliminate need for frameworks on simple sites. Direct control over Pinterest-style aesthetics. |
| Vanilla JavaScript | ES2022+ | Interactivity | Zero dependencies, perfect for touch/mouse event handling. 2025 best practices favor vanilla JS for simple interactive sites over React/Vue per industry consensus. |

### Infrastructure

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| GitHub Pages | Latest | Hosting & deployment | Free, supports custom domains, automatic HTTPS, integrates with GitHub Actions. Ideal for static single-page sites. |
| GitHub Actions | Latest | CI/CD (optional) | Automate deployments if using a build step later. Not required for MVP. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| modern-normalize | 3.0+ | CSS reset | Always. Cross-browser consistency without the bloat of older resets. |
| Google Fonts | Latest | Typography | For Pinterest-style elegant fonts (Playfair Display + Inter combination). Load via `display=swap` for performance. |

## Alternatives Considered

| Category | Recommended | Alternative | When to Use Alternative |
|----------|-------------|-------------|-------------------------|
| CSS Framework | Custom CSS | Tailwind CSS | Use Tailwind if you plan to add many pages later. For single-page valentine site, custom CSS is lighter and more controllable. |
| Animation | CSS Transitions | GSAP | Use GSAP only if adding complex sequenced animations. CSS transitions are GPU-accelerated and sufficient for button movement. |
| Touch Handling | Native JS | Hammer.js | Hammer.js adds 15KB for gesture recognition you don't need. Native touch events handle the runaway button perfectly. |
| Styling | CSS Variables | CSS-in-JS | CSS custom properties (variables) are native, work without build steps, and are perfect for theme colors. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| **React/Vue/Angular** | Massive overhead for a 2-page static site. React alone is 40KB+ gzipped. Adds build complexity unnecessary for GitHub Pages. | Vanilla JS with ES modules |
| **jQuery** | Obsolete in 2025. Modern `querySelector` and `fetch` replace all jQuery use cases. Adds 30KB for no benefit. | Native DOM APIs |
| **Bootstrap/Bulma** | Heavy frameworks (150KB+ CSS) designed for admin dashboards, not aesthetic single-page sites. Forces generic design. | Custom CSS with CSS Grid/Flexbox |
| **Framer Motion/GSAP** | Overkill for simple button movement. GSAP is 25KB+, Framer Motion requires React. Both unnecessary for translate/transform animations. | CSS `transform` + `transition` or `requestAnimationFrame` |
| **Eric Meyer's Reset (2008)** | Aggressively strips useful defaults (list bullets, form styles). Creates more work than it saves. | modern-normalize (preserves semantic defaults) |
| **CSS-in-JS libraries** | Require build step, runtime overhead, and don't work with static GitHub Pages hosting. | CSS custom properties in external stylesheet |

## Stack Patterns by Variant

**If you want the absolute lightest site:**
- Single HTML file with inline CSS (eliminates HTTP request)
- Inline critical CSS, defer non-critical
- Target: < 50KB total transfer

**If you want maintainable code:**
- Separate `index.html`, `styles.css`, `app.js`
- Use CSS custom properties for colors (easy theming)
- Structure: `src/` folder with HTML/CSS/JS

**If you want TypeScript later:**
- Add `tsconfig.json` with `target: ES2020`
- Use `tsc` to compile to JS before GitHub Pages deployment
- Not needed for MVP - vanilla JS is perfectly type-safe for this scope

## Recommended CSS Reset

```css
@layer reset {
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    color-scheme: light dark;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: none;
    text-size-adjust: none;
    hanging-punctuation: first allow-end last;
  }

  h1, h2, h3, h4, h5, h6 {
    text-wrap: balance;
  }

  p {
    text-wrap: pretty;
  }

  ul, ol {
    list-style: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    html {
      interpolate-size: allow-keywords;
    }
  }
}
```

**Source:** pawelgrzybek.com (2025) - modern CSS reset best practices

## Project Structure

```
valentine-site/
├── index.html          # Main page with "Will you be my valentine?"
├── yes.html           # Success page (or single-page with hidden sections)
├── css/
│   └── styles.css     # All styles, custom properties for theming
├── js/
│   └── app.js         # Runaway button logic, touch event handling
└── .github/
    └── workflows/
        └── deploy.yml # Optional: GitHub Actions auto-deployment
```

## Installation

```bash
# No npm install needed for MVP!
# Just create files and push to GitHub

# Optional: Add modern-normalize via CDN
# In HTML <head>:
# <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/modern-normalize@3.0.0/modern-normalize.min.css">

# Optional: Add Google Fonts
# <link rel="preconnect" href="https://fonts.googleapis.com">
# <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
```

## GitHub Pages Configuration

1. **Repository Settings:**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `root`

2. **For single-page routing:**
   - GitHub Pages handles this natively
   - No special configuration needed for 2-page static site

3. **Custom Domain (optional):**
   - Add `CNAME` file with your domain
   - Configure DNS A records to GitHub Pages IPs

## Touch Event Implementation Pattern

```javascript
// Native touch event handling - no library needed
const button = document.getElementById('no-button');
let isTouch = false;

// Detect touch capability
if ('ontouchstart' in window) {
  isTouch = true;
  button.addEventListener('touchstart', handleTouchStart, { passive: false });
  button.addEventListener('touchmove', handleTouchMove, { passive: false });
} else {
  button.addEventListener('mousemove', handleMouseMove);
}

// Both handlers use transform: translate() for GPU acceleration
```

**Why this works:** Native touch events provide all capabilities needed for the runaway button mechanic without adding library overhead.

## Performance Targets

| Metric | Target | How to Achieve |
|--------|--------|----------------|
| First Contentful Paint | < 1.0s | Inline critical CSS, use `display=swap` for fonts |
| Total Page Size | < 100KB | No frameworks, optimized images, SVG where possible |
| Time to Interactive | < 2.0s | Vanilla JS loads instantly, no hydration needed |
| Lighthouse Score | > 95 | Static site, proper meta tags, compressed assets |

## Sources

- **MDN Web Docs** (https://developer.mozilla.org/en-US/docs/Web/API/Touch_events) - Official touch event documentation, last modified Dec 9, 2025
- **pawelgrzybek.com** (https://pawelgrzybek.com/the-css-reset-again/) - Modern CSS reset patterns, Oct 2025
- **GitHub Docs** (https://docs.github.com/en/pages) - GitHub Pages deployment, Aug 2025
- **Motion.dev** (https://motion.dev/magazine/web-animation-performance-tier-list) - Animation performance best practices, Nov 2025
- **Multiple 2025 JavaScript ecosystem articles** - Vanilla JS recommended for simple interactive sites

---
*Stack research for: Interactive Valentine Website*  
*Researched: 2026-02-11*  
*Confidence: HIGH - All recommendations verified against 2025 sources*
