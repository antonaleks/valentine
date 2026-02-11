# Architecture Patterns

**Domain:** Interactive Valentine Website (Static HTML/CSS/JS)
**Researched:** 2026-02-11
**Overall confidence:** HIGH

## Recommended Architecture

For a simple static interactive valentine website deployed on GitHub Pages, the architecture follows a classic **Single-Page Application with Multi-Page Navigation** pattern. This is intentionally simple — no frameworks, no build step, no backend.

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (Client)                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │   index.html    │  │   success.html  │  (Static Pages)   │
│  │  (Main Page)    │  │ (Celebration)   │                   │
│  └────────┬────────┘  └─────────────────┘                   │
│           │                                                  │
│  ┌────────▼─────────────────────────────────────────────┐   │
│  │              Shared Assets (Static)                   │   │
│  │  ┌──────────┐ ┌──────────┐ ┌─────────────────────┐   │   │
│  │  │ style.css│ │ app.js   │ │ /photos/            │   │   │
│  │  │(styles)  │ │(logic)   │ │ (couple images)     │   │   │
│  │  └──────────┘ └──────────┘ └─────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                    GitHub Pages (Hosting)                    │
│              (Static file serving, CDN-backed)               │
└─────────────────────────────────────────────────────────────┘
```

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| **index.html** | Renders main question page, contains Yes/No buttons | Links to success.html; Loads style.css, app.js |
| **success.html** | Renders celebration page with photos | Loads style.css, photos from /photos/ |
| **style.css** | All styling, responsive layouts, animations, Pinterest aesthetic | Loaded by both HTML pages |
| **app.js** | Runaway button logic, pointer event handling, humorous messages | Attached to index.html DOM |
| **/photos/** | Static image assets for success page | Referenced by success.html |

## Recommended Project Structure

```
valentine-site/
├── index.html              # Main page with question & buttons
├── success.html            # Celebration page (Yes clicked)
├── style.css               # All styles, responsive, animations
├── app.js                  # Interactive button logic
└── photos/                 # Couple photos folder
    ├── photo1.jpg
    ├── photo2.jpg
    └── ...
```

### Structure Rationale

- **index.html:** Entry point. Contains semantic HTML for the valentine question, Yes/No buttons. Mobile-first markup.
- **success.html:** Separate page for celebration (no need for SPA complexity). Loads photos from /photos/ folder.
- **style.css:** Single stylesheet for both pages. Uses CSS custom properties for consistent theming (Pinterest aesthetic).
- **app.js:** All interactivity isolated. Handles pointer events for "runaway" behavior on both mouse and touch.
- **photos/:** Dedicated folder makes GitHub Pages deployment cleaner and organizes assets logically.

## Patterns to Follow

### Pattern 1: Pointer Events (Unified Input Handling)

**What:** Use the Pointer Events API to handle both mouse and touch with a single code path. Pointer Events have been widely supported since July 2020.

**When to use:** When you need to support both mouse hover and touch interactions (like the "runaway button" feature).

**Trade-offs:** Simpler code than separate mouse/touch handlers, but requires `touch-action: none` CSS to prevent browser defaults.

**Example:**
```javascript
// Use pointermove instead of mousemove + touchmove
const noButton = document.getElementById('no-button');

// Track if pointer is near button
let isNearButton = false;

// CSS: noButton { touch-action: none; }

document.addEventListener('pointermove', (event) => {
  const rect = noButton.getBoundingClientRect();
  const distance = calculateDistance(event.clientX, event.clientY, rect);
  
  if (distance < threshold) {
    // Move button away (runaway behavior)
    moveButtonAway(event.clientX, event.clientY);
  }
});
```

### Pattern 2: Progressive Enhancement

**What:** Core functionality works without JavaScript; enhanced experience with JS.

**When to use:** Always for static sites — ensures accessibility and resilience.

**Trade-offs:** Slightly more HTML structure, but guarantees baseline functionality.

**Example:**
```html
<!-- No button is a real button that submits somewhere (fallback) -->
<!-- JS enhances it to run away instead -->
<button id="no-button" type="button" data-message="Nice try!">
  No
</button>
```

### Pattern 3: CSS Custom Properties for Theming

**What:** Define colors, spacing, fonts as CSS variables for consistent Pinterest-style design.

**When to use:** For maintainable styling and easy theme adjustments.

**Trade-offs:** Minimal overhead, huge maintainability gain.

**Example:**
```css
:root {
  --primary-color: #ff6b8a;      /* Romantic pink */
  --secondary-color: #fff0f3;    /* Soft background */
  --accent-color: #ff8fa3;       /* Highlight */
  --font-heading: 'Playfair Display', serif;  /* Fancy */
  --font-body: 'Inter', sans-serif;           /* Clean */
}
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Separate Mouse and Touch Event Handlers

**What:** Writing duplicate code for `mousemove`/`touchmove`.

**Why bad:** Double the code, double the bugs. Easy to forget one path.

**Instead:** Use Pointer Events API — one handler for all input types.

### Anti-Pattern 2: Inline Event Handlers (onmouseover="...")

**What:** HTML attributes like `onmouseover="moveButton()"`.

**Why bad:** Harder to maintain, mixes concerns, doesn't scale to complex logic.

**Instead:** Add listeners in JavaScript with `addEventListener`.

### Anti-Pattern 3: Fixed Positioning for Mobile

**What:** Using `position: fixed` for the button without viewport consideration.

**Why bad:** Mobile browsers have dynamic toolbars; fixed elements can get obscured or cause layout shifts.

**Instead:** Use `position: absolute` within a full-viewport container, with proper viewport meta tag.

## Data Flow

### User Interaction Flow (Runaway Button)

```
┌────────────────────────────────────────────────────────────────┐
│                    User Moves Cursor/Finger                     │
│                          (pointermove)                          │
└────────────────────────────┬───────────────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────────┐
│              Document pointermove Listener                      │
│  1. Get current pointer position (clientX, clientY)             │
│  2. Calculate distance to "No" button                           │
│  3. If distance < threshold:                                    │
│     └── Move button to safe position                            │
│  4. Show humorous message (cycle through array)                 │
└────────────────────────────────────────────────────────────────┘
```

### Page Navigation Flow

```
┌──────────────┐      click Yes        ┌────────────────┐
│  index.html  │ ────────────────────► │  success.html  │
│  (question)  │  (simple link/form)   │ (celebration)  │
└──────────────┘                       └────────────────┘
       │                                         │
       │ click No                                │
       ▼                                         ▼
  Runaway behavior                          Photo gallery
  (JavaScript)                              (HTML/CSS)
```

## Build Order (Dependencies)

1. **index.html** (foundation)
   - No dependencies
   - Must be built first

2. **success.html** (celebration page)
   - No dependencies on index.html (separate page)
   - Can be built in parallel with index.html

3. **style.css** (shared styles)
   - No dependencies
   - Needed by both HTML files
   - Build after HTML structure is defined

4. **app.js** (interactivity)
   - Depends on index.html DOM elements
   - Must reference button IDs defined in index.html
   - Build after index.html

5. **photos/** folder
   - No dependencies
   - Can be populated anytime
   - Referenced by success.html

**Suggested Implementation Order:**
1. Create folder structure with photos/
2. Write index.html with semantic structure
3. Write success.html with photo gallery structure
4. Create style.css with mobile-first responsive styles
5. Implement app.js with runaway button logic
6. Add photos to photos/
7. Test on mobile device

## Scalability Considerations

For a valentine site, scaling considerations are minimal (it's a single-session experience), but consider:

| Concern | Approach |
|---------|----------|
| **Image loading** | Use lazy loading for photos: `<img loading="lazy">` |
| **Animation performance** | Use `transform` and `opacity` for button movement (GPU-accelerated) |
| **Touch responsiveness** | Use `requestAnimationFrame` for smooth button repositioning |
| **File size** | Optimize images before adding to photos/ folder |

## Mobile-Specific Considerations

### Touch Events vs Pointer Events

Use **Pointer Events** (recommended):
- Single API for mouse and touch
- Widely supported since 2020
- Future-proof for new input devices

Required CSS for Pointer Events to work properly:
```css
#no-button {
  touch-action: none;  /* Prevent browser scrolling/zooming */
}
```

### Viewport Configuration

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

This prevents zooming on double-tap and ensures consistent behavior.

## Sources

- MDN Web Docs: Using Pointer Events - https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Using_Pointer_Events (HIGH confidence, authoritative)
- W3C Pointer Events Level 3 Specification - https://www.w3.org/TR/pointerevents3/ (HIGH confidence, standard)
- MDN Web Docs: Touch Events - https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Using_Touch_Events (HIGH confidence, authoritative)

---
*Architecture research for: Interactive Valentine Website*
*Researched: 2026-02-11*
