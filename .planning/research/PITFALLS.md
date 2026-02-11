# Domain Pitfalls: Interactive Valentine/Runaway Button Websites

**Domain:** Interactive "Will You Be My Valentine?" website with runaway "No" button
**Researched:** 2026-02-11
**Overall Confidence:** HIGH

---

## Critical Pitfalls

Mistakes that can ruin the experience or make the site unusable on mobile.

### Pitfall 1: Mouse-Only Implementation (Mobile Death Sentence)

**What goes wrong:**
The "No" button only responds to `mouseenter`/`mouseover` events. On mobile devices, these events never fire, so the button stays completely still. The user taps the button easily, breaking the playful interaction and potentially selecting "No" accidentally.

**Why it happens:**
- Developers test only on desktop/laptop with mouse
- CSS `:hover` states don't work the same way on touch devices
- Mobile browsers delay/convert touch events to mouse events (300ms delay in some cases)

**Consequences:**
- Mobile users (primary target) get broken experience
- Button doesn't "run away" — kills the fun
- User may accidentally tap "No" and get wrong outcome
- Site feels broken and unprofessional

**Prevention:**
- Use **Pointer Events** (`pointermove`, `pointerenter`) instead of mouse-only events — they handle both mouse AND touch in a unified API
- Always handle both `touchstart`/`touchmove` AND `mouseenter`/`mousemove` 
- Test on actual mobile devices, not just DevTools simulation
- Use `@media (hover: hover)` to conditionally apply hover-only behaviors

**Warning signs:**
- Button works on laptop but not on phone
- Button works when using mouse on desktop, but not when touching screen
- Button feels "sticky" or unresponsive on mobile

**Phase to address:** Phase 1 — Core Interaction

---

### Pitfall 2: Button Escapes Too Fast or Off-Screen

**What goes wrong:**
The button moves too far, too fast, or escapes the viewport entirely. On mobile, the button can jump off-screen or into unreachable corners, making it impossible to interact with.

**Why it happens:**
- Using raw pixel values for movement instead of viewport-relative calculations
- Not checking boundaries before moving
- Movement speed not adjusted for screen size
- No maximum distance constraints

**Consequences:**
- Button becomes completely unreachable
- User gets frustrated instead of amused
- Broken experience on smaller screens
- User has to reload page to reset

**Prevention:**
- Constrain button movement to viewport boundaries with padding
- Use relative units (vw/vh) or calculate based on `window.innerWidth/Height`
- Set maximum escape distance (e.g., max 200px movement)
- Ensure button stays at least 20px from all edges
- Test on smallest target screen size (iPhone SE: 375px wide)

**Warning signs:**
- Button disappears from view
- Button hugs the very edge of screen
- Button jumps erratically on small screens

**Phase to address:** Phase 1 — Core Interaction

---

### Pitfall 3: Touch Event Interference with Scroll/Gestures

**What goes wrong:**
Touching the button area triggers unintended browser behaviors — page scrolls, zoom activates, or the button doesn't respond because the browser interprets the touch as a gesture.

**Why it happens:**
- Not calling `preventDefault()` on touch events
- Missing `touch-action: none` CSS property
- Browser default gestures (pinch-zoom, pull-to-refresh) interfere
- Touch targets too small (less than 44x44px)

**Consequences:**
- Page scrolls when user tries to tap button
- Button feels unresponsive
- Accidental zoom breaks layout
- Pull-to-refresh interrupts interaction

**Prevention:**
- Add `touch-action: none` CSS to button and interaction area
- Call `event.preventDefault()` in touch handlers (when appropriate)
- Ensure minimum 44x44px touch target (Apple HIG) or 48x48dp (Material Design)
- Consider `overscroll-behavior: contain` on body to prevent pull-to-refresh

**Warning signs:**
- Page scrolls when trying to tap button
- Button requires multiple attempts to work
- Accidental zoom happens when tapping rapidly

**Phase to address:** Phase 1 — Core Interaction

---

### Pitfall 4: Animation Jank on Low-End Mobile Devices

**What goes wrong:**
Smooth 60fps animations on desktop become stuttery/janky on older or budget mobile devices. Battery drain becomes noticeable.

**Why it happens:**
- Animating expensive properties (width, height, top, left) triggers layout recalculation
- Too many simultaneous animations (floating hearts + button movement + transitions)
- Not using `transform` and `opacity` (GPU-accelerated properties)
- Missing `will-change` hints
- iOS Safari throttles `requestAnimationFrame` in low power mode to 30fps

**Consequences:**
- Animation feels choppy and unprofessional
- Battery drain on mobile
- User perceives site as slow/broken
- Touch responsiveness degrades

**Prevention:**
- **ONLY animate `transform` and `opacity`** — these are GPU-accelerated
- Use `translate3d(x, y, 0)` instead of `top`/`left` for movement
- Add `will-change: transform` to buttons before animation, remove after
- Limit concurrent animations (max 3-5 floating elements on mobile)
- Use CSS animations where possible (more performant than JS)
- Test on mid-range Android device, not just flagship iPhone

**Warning signs:**
- Animations skip frames
- Phone gets warm during use
- Frame rate drops below 30fps on DevTools Performance panel

**Phase to address:** Phase 2 — Polish & Animation

---

### Pitfall 5: Hover State Stuck on Mobile After Tap

**What goes wrong:**
After tapping the button on mobile, it stays in `:hover` state (different color/visual) until user taps elsewhere on the page.

**Why it happens:**
- Mobile browsers emulate hover on first tap
- CSS `:hover` styles persist until next touch elsewhere
- No distinction between hover-capable and non-hover-capable devices

**Consequences:**
- Visual confusion — button looks "selected" when it's not
- Looks like a bug to users
- Breaks minimalist aesthetic

**Prevention:**
- Use `@media (hover: hover)` media query to only apply hover styles on hover-capable devices
- Or use `:active` state for immediate visual feedback on both mouse and touch
- Consider `:focus-visible` for keyboard accessibility

```css
/* Only apply hover on devices that support it */
@media (hover: hover) {
  .btn:hover {
    background: #ff6b6b;
  }
}

/* Apply active state to both */
.btn:active {
  transform: scale(0.95);
}
```

**Warning signs:**
- Button stays highlighted after tap on mobile
- Visual state doesn't match interaction

**Phase to address:** Phase 2 — Polish & Animation

---

## Moderate Pitfalls

### Pitfall 6: Button Traps Itself in Corners

**What goes wrong:**
Button consistently runs to corners and gets "stuck" there because there's nowhere else to go when cursor approaches from center.

**Why it happens:**
- Simple "move away from cursor" algorithm doesn't account for boundaries
- No randomization or multiple escape directions
- Movement is always in opposite direction of cursor

**Presequences:**
- Predictable, less fun interaction
- Button clings to edges

**Prevention:**
- Add random angle variation (±30° from escape vector)
- Implement "bounce" behavior when hitting walls
- Occasionally move perpendicular to escape direction
- Add minimum distance from last position to prevent micro-movements

**Phase to address:** Phase 1 — Core Interaction

---

### Pitfall 7: Text Messages Get Cut Off on Small Screens

**What goes wrong:**
Humorous rejection messages ("Nice try!", "Can't catch me!") get truncated or overflow on narrow mobile screens.

**Why it happens:**
- Fixed-width message containers
- Font sizes not responsive
- Long words don't break properly
- Absolute positioning without viewport checks

**Consequences:**
- Messages unreadable or cut off
- Humor lost
- Layout breaks

**Prevention:**
- Use `max-width: 90vw` for message containers
- Responsive font sizing (`clamp()` or viewport units)
- `word-wrap: break-word` for long text
- Test all messages on 320px wide screen (iPhone SE)

**Phase to address:** Phase 2 — Polish & Animation

---

### Pitfall 8: Auto-Play Audio Without User Gesture

**What goes wrong:**
Background music tries to auto-play, but browsers block it. Console shows errors, or music never starts.

**Why it happens:**
- Modern browsers require user interaction before playing audio
- Auto-play policy blocks sound until first click/tap
- Not handling the `NotAllowedError` exception

**Consequences:**
- Music doesn't play (broken expectation)
- Console errors
- Confusion about whether site has sound

**Prevention:**
- Start audio only after first user interaction (button click)
- Provide explicit "Play Music" button
- Handle autoplay failure gracefully — don't throw errors
- Consider site works fine without audio (progressive enhancement)

**Phase to address:** Phase 3 — Success Page & Extras

---

## Minor Pitfalls

### Pitfall 9: GitHub Pages Caching Issues

**What goes wrong:**
After deployment, changes don't appear immediately. Browser shows old version due to aggressive caching.

**Why it happens:**
- GitHub Pages sets long cache headers
- Browser caches HTML/CSS/JS aggressively
- No cache-busting strategy

**Prevention:**
- Add version query strings to assets (`style.css?v=2`)
- Or use content hash in filenames (if using build tool)
- Hard refresh (Ctrl+Shift+R) during development
- Wait 5-10 minutes after deployment for CDN propagation

**Phase to address:** Phase 4 — Deployment

---

### Pitfall 10: Missing Viewport Meta Tag

**What goes wrong:**
Site renders zoomed out on mobile, showing desktop layout instead of mobile-optimized view.

**Why it happens:**
- Forgetting `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Copy-paste from desktop-only templates

**Consequences:**
- Site unusable on mobile without zooming
- Text too small to read
- Buttons too small to tap accurately

**Prevention:**
- ALWAYS include viewport meta tag in `<head>`
- Test on actual mobile device immediately

**Phase to address:** Phase 1 — Core Structure

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical mobile pieces:

- [ ] **Touch Events:** Tested on actual touch device, not just mouse + DevTools
- [ ] **Hover Fallbacks:** Site works without hover capability
- [ ] **Small Screen:** Tested on 375px wide screen (iPhone SE)
- [ ] **Slow Device:** Tested on mid-range Android (not just flagship iPhone)
- [ ] **Battery Saver Mode:** Animations still smooth when phone is in low power mode
- [ ] **Portrait & Landscape:** Works in both orientations
- [ ] **Touch Targets:** All interactive elements are at least 44x44px
- [ ] **No Scroll Interference:** Page doesn't scroll when interacting with button
- [ ] **Audio:** Either has user-initiated playback or graceful degradation
- [ ] **Loading:** Site loads in under 3 seconds on 3G connection

---

## Phase-Specific Warnings

| Phase | Likely Pitfall | Mitigation |
|-------|---------------|------------|
| Phase 1: Core Structure | Missing viewport meta tag | Include `<meta viewport>` from day one |
| Phase 1: Core Interaction | Mouse-only events | Use Pointer Events API or dual mouse/touch handlers |
| Phase 1: Core Interaction | Button escapes viewport | Add boundary constraints with padding |
| Phase 2: Polish | Animation jank on mobile | Only animate `transform` and `opacity` |
| Phase 2: Polish | Hover states stuck on mobile | Use `@media (hover: hover)` |
| Phase 3: Success Page | Auto-play audio blocked | Add "Play" button, handle autoplay failure |
| Phase 4: Deployment | GitHub Pages caching | Add cache-busting query strings |

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|--------------|----------------|
| Mouse-only implementation | MEDIUM | Refactor to Pointer Events, test on device |
| Button off-screen | LOW | Add boundary checks, deploy fix |
| Animation jank | MEDIUM | Rewrite animations using transform/opacity only |
| Auto-play blocked | LOW | Add user-initiated play button |
| Caching issues | LOW | Add version query strings, wait for CDN |

---

## Sources

- [MDN: Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events) — Touch event handling best practices
- [MDN: Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) — Unified mouse/touch handling
- [web.dev: Animation Performance](https://web.dev/articles/animations-overview) — GPU-accelerated properties
- [MDN: Animation Performance](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Animation_performance_and_frame_rate) — 60fps optimization
- [Motion.dev: requestAnimationFrame throttling](https://motion.dev/blog/when-browsers-throttle-requestanimationframe) — Browser throttling behavior
- [Stack Overflow: Buttons stay in hover mode on mobile](https://stackoverflow.com/questions/39898524/buttons-stay-in-hover-mode-after-clicking-touching-mobile) — Hover state issues
- [GitHub: End2EndAI/valentine-website-2025](https://github.com/End2EndAI/valentine-website-2025) — Real-world example with 140 open issues (likely pitfalls in the wild)
- [DEV Community: Button Will React](https://dev.to/iamovi/i-made-buttons-that-run-away-from-you-prank-projects-5ej0) — Button escape implementation patterns

---

*Research completed: 2026-02-11*
*Confidence: HIGH (based on authoritative MDN docs, web.dev, and real-world issue analysis)*
