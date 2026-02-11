# Phase 2: Interactive Mechanics - Research

**Researched:** 2026-02-11
**Domain:** Pointer Events, CSS Animations, Runaway Button Pattern
**Confidence:** HIGH

## Summary

The "runaway button" mechanic is a well-documented interactive pattern involving a button that evades user attempts to click/tap it. Implementation relies on the Pointer Events API for unified mouse and touch handling, CSS transforms for GPU-accelerated movement, and viewport boundary detection to keep the element visible.

The key insight is that Pointer Events (Level 3, Candidate Recommendation April 2025) provide a modern, unified interface for all pointing devices—eliminating the need to handle mouse and touch events separately. For smooth 60fps animations, only `transform` and `opacity` properties should be animated, as they trigger GPU compositing without layout recalculation.

For mobile, the challenge is detecting the approaching finger *before* the tap registers. This requires either proximity detection via `pointermove` events or pre-emptive movement based on pointer position. Viewport boundary constraints are essential to ensure the button never escapes the visible screen area.

**Primary recommendation:** Use React Pointer Events (`onPointerMove`, `onPointerEnter`) with CSS `transform: translate3d()` for GPU acceleration, implement viewport boundary checks using `getBoundingClientRect()`, and set `touch-action: none` on the button to prevent scroll interference.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Pointer Events API | W3C Level 3 (April 2025) | Unified mouse/touch/pen input | Modern standard, replaces separate mouse/touch handlers |
| CSS Transforms | CSS3 | Hardware-accelerated positioning | GPU compositing, 60fps performance |
| React Pointer Events | React 18+ | Declarative pointer event handling | Built-in, type-safe, cross-browser |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `will-change` CSS | CSS3 | GPU layer hint | When button moves frequently |
| `touch-action` CSS | Pointer Events spec | Disable default touch behaviors | Prevent scrolling while interacting |
| `requestAnimationFrame` | Web API | Smooth animation scheduling | When animating position changes |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Pointer Events | Separate mouse/touch handlers | More code, inconsistent behavior, harder maintenance |
| CSS transforms | `top`/`left` positioning | Layout recalculation, poor performance |
| Native JS events | React synthetic events | Less idiomatic, manual cleanup required |

**Installation:**
No additional packages required—all capabilities are built into modern browsers and React 18+.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── RunawayButton/       # Self-contained evasive button
│   │   ├── index.tsx
│   │   ├── styles.css
│   │   └── hooks/
│   │       └── useViewportBounds.ts
│   └── MessageDisplay/      # Humorous message rotation
├── hooks/
│   ├── usePointerPosition.ts # Track pointer coordinates
│   └── useEvasiveLogic.ts    # Calculate escape position
├── utils/
│   └── geometry.ts          # Boundary calculation helpers
└── constants/
    └── messages.ts          # 5+ humorous message variants
```

### Pattern 1: Pointer Event-Based Evasion
**What:** Use `onPointerMove` and `onPointerEnter` to detect approaching pointer and move button away
**When to use:** Desktop and mobile with unified handling
**Example:**
```typescript
// Source: MDN Pointer Events + React patterns
// https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events

import { useRef, useState, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

export function useEvasiveButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const buttonCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };

    // Calculate distance from pointer to button center
    const distance = Math.sqrt(
      Math.pow(e.clientX - buttonCenter.x, 2) +
      Math.pow(e.clientY - buttonCenter.y, 2)
    );

    // If pointer is within escape radius, move button
    const escapeRadius = 100;
    if (distance < escapeRadius) {
      const angle = Math.atan2(
        buttonCenter.y - e.clientY,
        buttonCenter.x - e.clientX
      );
      
      const escapeDistance = 150;
      const newX = position.x + Math.cos(angle) * escapeDistance;
      const newY = position.y + Math.sin(angle) * escapeDistance;
      
      setPosition({ x: newX, y: newY });
    }
  }, [position]);

  return { buttonRef, position, handlePointerMove };
}
```

### Pattern 2: Viewport Boundary Constraints
**What:** Ensure button never moves outside visible viewport
**When to use:** Always—critical for mobile where viewport is small
**Example:**
```typescript
// Source: Best practices from viewport handling

interface ViewportBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export function useViewportBounds(
  elementWidth: number,
  elementHeight: number
): ViewportBounds {
  // Account for safe areas and small screens (iPhone SE = 375px)
  const padding = 16;
  
  return {
    minX: padding,
    maxX: window.innerWidth - elementWidth - padding,
    minY: padding,
    maxY: window.innerHeight - elementHeight - padding
  };
}

export function clampPosition(
  position: Position,
  bounds: ViewportBounds
): Position {
  return {
    x: Math.max(bounds.minX, Math.min(bounds.maxX, position.x)),
    y: Math.max(bounds.minY, Math.min(bounds.maxY, position.y))
  };
}
```

### Pattern 3: CSS GPU-Accelerated Movement
**What:** Use `transform: translate3d()` for smooth movement
**When to use:** Always for position animations
**Example:**
```css
/* Source: web.dev animations guide */
/* https://web.dev/articles/animations-guide */

.runaway-button {
  /* GPU acceleration setup */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  
  /* Smooth transition */
  transition: transform 0.2s ease-out;
  
  /* Prevent touch scrolling interference */
  touch-action: none;
}

/* Dynamic positioning via CSS custom properties */
.runaway-button {
  transform: translate3d(
    var(--translate-x, 0),
    var(--translate-y, 0),
    0
  );
}
```

```typescript
// Apply position via CSS custom property
<button
  ref={buttonRef}
  className="runaway-button"
  style={{
    '--translate-x': `${position.x}px`,
    '--translate-y': `${position.y}px`
  } as React.CSSProperties}
  onPointerMove={handlePointerMove}
  onPointerEnter={handlePointerEnter}
>
  Нет
</button>
```

### Anti-Patterns to Avoid
- **Animating `top`/`left`:** Triggers layout recalculation, 60fps impossible on mobile
- **Separate mouse/touch handlers:** Duplicated logic, inconsistent behavior
- **Using `setState` in `mousemove` without throttling:** Causes excessive re-renders
- **Ignoring viewport boundaries:** Button can escape screen on mobile devices
- **Calling `getBoundingClientRect()` in render:** Forces synchronous layout, performance killer

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Mouse + touch event normalization | Custom detection logic | Pointer Events API | W3C standard, consistent across devices |
| Viewport boundary detection | Manual calculations | `getBoundingClientRect()` + clamping | Handles scroll, zoom, orientation changes |
| Smooth animations | `setInterval` + `top`/`left` | CSS `transform` + `transition` | GPU-accelerated, 60fps, battery-efficient |
| Mobile scroll prevention | JavaScript scroll blocking | `touch-action: none` CSS | Native, performant, accessible |
| Message rotation | Simple random selection | Weighted rotation with deduplication | Better UX (no immediate repeats) |

**Key insight:** The browser's Pointer Events implementation and CSS compositor are highly optimized. Custom solutions for input handling or animation scheduling will always be inferior to native implementations.

## Common Pitfalls

### Pitfall 1: Button Escapes Viewport on Mobile
**What goes wrong:** Button moves off-screen on small devices (iPhone SE 375px width)
**Why it happens:** No boundary constraints, or calculations based on initial viewport only
**How to avoid:** 
- Clamp all positions to `window.innerWidth - buttonWidth - padding`
- Re-calculate bounds on `resize` and `orientationchange` events
- Test on actual small devices, not just Chrome DevTools
**Warning signs:** Button becomes unreachable, horizontal scroll appears

### Pitfall 2: Touch Events Trigger Scrolling Instead of Evasion
**What goes wrong:** On mobile, touching the button causes page scroll instead of button movement
**Why it happens:** Default browser touch behavior (scrolling) takes precedence
**How to avoid:** Set `touch-action: none` on the button element via CSS
**Warning signs:** Button doesn't move on touch, page scrolls instead

### Pitfall 3: Janky Animations on Mid-Range Mobile
**What goes wrong:** Frame drops below 60fps during button movement
**Why it happens:** Animating non-composite properties (`top`, `left`, `margin`) or excessive React re-renders
**How to avoid:**
- Use `transform: translate3d()` exclusively for movement
- Batch position updates with `requestAnimationFrame`
- Use CSS custom properties to avoid React re-renders for position
**Warning signs:** Visual stutter, low frame rate in DevTools Performance panel

### Pitfall 4: Button Becomes Permanently Unclickable
**What goes wrong:** Button evades so aggressively that users can never click it
**Why it happens:** Escape radius too large or movement distance too great
**How to avoid:**
- Limit escape distance to reasonable jump (100-150px)
- Allow button to be cornered after 3-5 attempts
- Ensure "Yes" button is always stable and accessible
**Warning signs:** Users report inability to progress, frustration in testing

### Pitfall 5: Message Rotation Shows Same Message Repeatedly
**What goes wrong:** Random selection picks same message twice in a row
**Why it happens:** Pure random without deduplication
**How to avoid:** Track last N messages shown, exclude from next selection
**Warning signs:** Users see duplicate messages consecutively

## Code Examples

### Complete RunawayButton Component
```typescript
// Source: Best practices compilation
import { useRef, useState, useCallback, useEffect } from 'react';
import './RunawayButton.css';

const MESSAGES = [
  'Поймай меня, если сможешь!',
  'Слишком медленно!',
  'Почти попала!',
  'Не сегодня!',
  'Попробуй ещё раз!',
  'Ты точно хочешь нажать "Нет"?',
  'Я слишком быстрый для тебя!'
];

interface Position {
  x: number;
  y: number;
}

export function RunawayButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
  const [message, setMessage] = useState<string>('Нет');
  const [messageIndex, setMessageIndex] = useState<number>(-1);

  // Handle pointer approaching button
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const buttonCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };

    // Distance from pointer to button center
    const distance = Math.hypot(
      e.clientX - buttonCenter.x,
      e.clientY - buttonCenter.y
    );

    const triggerDistance = 120;
    if (distance < triggerDistance) {
      // Calculate escape angle (away from pointer)
      const angle = Math.atan2(
        buttonCenter.y - e.clientY,
        buttonCenter.x - e.clientX
      );

      // Calculate new position with boundary constraints
      const jumpDistance = 150;
      let newX = offset.x + Math.cos(angle) * jumpDistance;
      let newY = offset.y + Math.sin(angle) * jumpDistance;

      // Clamp to viewport bounds
      const buttonWidth = rect.width;
      const buttonHeight = rect.height;
      const padding = 20;

      newX = Math.max(
        padding - rect.left,
        Math.min(window.innerWidth - rect.right - padding, newX)
      );
      newY = Math.max(
        padding - rect.top,
        Math.min(window.innerHeight - rect.bottom - padding, newY)
      );

      setOffset({ x: newX, y: newY });

      // Rotate message (avoid duplicates)
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * MESSAGES.length);
      } while (newIndex === messageIndex && MESSAGES.length > 1);
      
      setMessageIndex(newIndex);
      setMessage(MESSAGES[newIndex]);
    }
  }, [offset, messageIndex]);

  // Update viewport bounds on resize/orientation change
  useEffect(() => {
    const handleResize = () => {
      // Force boundary re-clamp if needed
      setOffset(prev => ({ ...prev }));
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className="runaway-button"
      style={{
        '--translate-x': `${offset.x}px`,
        '--translate-y': `${offset.y}px`
      } as React.CSSProperties}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerMove}
      onClick={(e) => {
        // If somehow clicked, prevent navigation
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {message}
    </button>
  );
}
```

```css
/* RunawayButton.css */
.runaway-button {
  /* GPU acceleration */
  will-change: transform;
  transform: translate3d(
    var(--translate-x, 0),
    var(--translate-y, 0),
    0
  );
  
  /* Smooth animation */
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Prevent touch scrolling */
  touch-action: none;
  
  /* Visual styling */
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  border: 2px solid #e74c3c;
  border-radius: 8px;
  background: white;
  color: #e74c3c;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}

/* Hover state for desktop */
@media (hover: hover) {
  .runaway-button:hover {
    background: #fee;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .runaway-button {
    transition: none;
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Separate mouse/touch handlers | Pointer Events API | 2020 (baseline support) | Unified code, fewer bugs |
| `top`/`left` animations | CSS `transform` | 2015+ | 60fps on mobile, GPU-accelerated |
| `setInterval` for animation | `requestAnimationFrame` | 2015+ | Synced with display refresh |
| Touch-specific libraries | Native Pointer Events | 2020+ | No library overhead, standard API |

**Deprecated/outdated:**
- **Mouse-only events (`onMouseMove`, `onMouseEnter`):** Don't work on touch devices
- **Touch libraries (Hammer.js, TouchSwipe):** Unnecessary overhead with Pointer Events
- **`translateZ(0)` hack:** Use `will-change` or `translate3d()` explicitly

## Open Questions

1. **Optimal escape trigger distance for mobile vs desktop**
   - What we know: Desktop works well with 100-120px, finger occlusion may require different value on mobile
   - What's unclear: Whether to adjust trigger radius based on `pointerType`
   - Recommendation: Start with 120px, test on actual devices, make adjustable via constant

2. **Message rotation frequency vs user annoyance**
   - What we know: 7 messages provided, must show 5 different ones
   - What's unclear: Whether to rotate on every evasion or only significant movements
   - Recommendation: Rotate on every successful escape, track shown messages in session

3. **Accessibility considerations for evasive button**
   - What we know: `prefers-reduced-motion` should be respected
   - What's unclear: How screen readers should handle button that moves
   - Recommendation: Add `aria-live` for message updates, disable evasion when reduced motion preferred

## Sources

### Primary (HIGH confidence)
- [W3C Pointer Events Level 3](https://www.w3.org/TR/2025/CR-pointerevents3-20250429/) - Event types, pointer capture, touch-action
- [MDN Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) - Browser support, event properties
- [web.dev Animations Guide](https://web.dev/articles/animations-guide) - GPU acceleration, transform/opacity recommendations
- [MDN CSS will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) - Proper usage patterns

### Secondary (MEDIUM confidence)
- [Stack Overflow: Runaway button implementation](https://stackoverflow.com/questions/77770326/how-to-create-a-button-that-runs-away-from-the-cursor) - Community patterns
- [GitHub: sparpo/runawayButton](https://github.com/sparpo/runawayButton) - Reference implementation
- [DEV Community: Mouse events in React](https://dev.to/cristiansifuentes/mastering-mouse-events-in-react-typescript-click-drag-hover-and-beyond-21a6) - React event patterns

### Tertiary (LOW confidence)
- [Medium: Pointer events guide](https://blog.carlosrojas.dev/the-complete-guide-to-pointer-events-21e44b2f9da0) - General concepts (marked for validation)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Pointer Events are W3C standard with baseline support since July 2020
- Architecture: HIGH - Patterns verified against official docs and multiple implementations
- Pitfalls: MEDIUM - Based on documented issues but limited real-world testing data

**Research date:** 2026-02-11
**Valid until:** 30 days (stable APIs, low churn expected)
