---
phase: 02-interactive-mechanics
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/RunawayButton.tsx
  - src/components/RunawayButton.css
autonomous: true

must_haves:
  truths:
    - "RunawayButton moves away from pointer approach on desktop"
    - "RunawayButton relocates before touch registers on mobile"
    - "Button never moves outside visible viewport area"
    - "Different humorous message shown on each evasion (5+ variants)"
    - "Movement is smooth at 60fps on mobile devices"
  artifacts:
    - path: "src/components/RunawayButton.tsx"
      provides: "Button component with pointer event handling, boundary clamping, message rotation"
      exports: ["RunawayButton"]
      contains: ["onPointerMove", "onPointerEnter", "getBoundingClientRect", "transform", "useState"]
    - path: "src/components/RunawayButton.css"
      provides: "GPU-accelerated animations and touch-action rules"
      contains: ["transform", "touch-action: none", "transition"]
  key_links:
    - from: "src/components/RunawayButton.tsx"
      to: "DOM API"
      via: "getBoundingClientRect() for viewport boundaries"
      pattern: "getBoundingClientRect\\(\\)"
    - from: "src/components/RunawayButton.tsx"
      to: "CSS transform"
      via: "style={{ transform: translate3d(...) }}"
      pattern: "translate3d"
    - from: "Pointer Events"
      to: "RunawayButton"
      via: "onPointerMove/onPointerEnter handlers"
      pattern: "onPointer(Move|Enter)"
---

<objective>
Create the RunawayButton component that evades pointer approach using Pointer Events API, stays within viewport boundaries, rotates humorous messages, and uses GPU-accelerated CSS animations.

Purpose: This is the core "signature mechanic" of the valentine site — the playful "impossible to say no" interaction that creates delight.
Output: RunawayButton.tsx component with full pointer evasion logic + RunawayButton.css with GPU-accelerated animations.
</objective>

<execution_context>
@/Users/apalekseev/.config/opencode/get-shit-done/workflows/execute-plan.md
@/Users/apalekseev/.config/opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/01-foundation-setup/01-foundation-setup-01-SUMMARY.md
@.planning/phases/02-interactive-mechanics/02-interactive-mechanics-RESEARCH.md
@src/pages/HomePage.tsx
@src/index.css
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create RunawayButton component with pointer evasion and boundary logic</name>
  <files>src/components/RunawayButton.tsx</files>
  <action>
Create RunawayButton component with:

**Props interface:**
```typescript
interface RunawayButtonProps {
  children: React.ReactNode;
  className?: string;
}
```

**State management:**
- `position: { x: number, y: number }` — current transform offset (starts at 0,0)
- `message: string` — current humorous message
- `lastMessageIndex: number` — index of last shown message (for deduplication)

**Message array (5+ Russian variants):**
```typescript
const MESSAGES = [
  "Попробуй ещё раз! 😏",
  "Ты почти поймала меня! 🏃",
  "Я слишком быстрый! ⚡",
  "Ой, промахнулась! 😜",
  "Давай, ты сможешь! 💪",
  "Упс, я здесь был! 👻",
  "Почти! Но нет 😎"
];
```

**Pointer event handlers:**
- `onPointerMove`: Detect when pointer is approaching and move button away
- `onPointerEnter`: Same behavior for pointer entering button area
- Both handlers should:
  1. Calculate distance from pointer to button center
  2. If distance < threshold (e.g., 150px), move button in opposite direction
  3. Use pointer coordinates from `event.clientX`, `event.clientY`
  4. Get button position via `buttonRef.current.getBoundingClientRect()`

**Movement logic:**
- Calculate evasion vector: direction away from pointer
- Normalize and multiply by move distance (e.g., 100px)
- Add to current position

**Boundary clamping (CRITICAL):**
- After calculating new position, clamp to viewport:
  ```typescript
  const padding = 20; // px from edges
  const rect = buttonRef.current.getBoundingClientRect();
  const maxX = window.innerWidth - rect.width - padding;
  const maxY = window.innerHeight - rect.height - padding;
  
  newX = Math.max(padding, Math.min(newX, maxX));
  newY = Math.max(padding, Math.min(newY, maxY));
  ```
- This ensures button never leaves visible area (tested on iPhone SE 375px)

**Ref requirements:**
- `buttonRef: React.RefObject<HTMLButtonElement>` — for getBoundingClientRect()

**Return:**
```tsx
<button
  ref={buttonRef}
  className={`runaway-button ${className || ''}`}
  onPointerMove={handlePointerMove}
  onPointerEnter={handlePointerEnter}
  style={{
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    position: 'relative' // needed for transform to work
  }}
>
  {children}
</button>
```

Important: Use `transform: translate3d()` NOT `top/left` — translate3d triggers GPU compositor layer for 60fps performance.
  </action>
  <verify>
    - `cat src/components/RunawayButton.tsx` exists
    - File contains `onPointerMove` handler
    - File contains `getBoundingClientRect()` usage
    - File contains `translate3d` in style prop
    - File contains boundary clamping logic with Math.max/Math.min
    - File contains MESSAGES array with 7 Russian strings
    - TypeScript compiles: `npx tsc --noEmit` (0 errors)
  </verify>
  <done>
    RunawayButton.tsx exists with pointer event handling, boundary clamping using getBoundingClientRect(), transform: translate3d() for movement, and MESSAGES array with 7 humorous Russian variants.
  </done>
</task>

<task type="auto">
  <name>Task 2: Add message rotation system with deduplication</name>
  <files>src/components/RunawayButton.tsx</files>
  <action>
Add message rotation logic to RunawayButton component:

**Message rotation function:**
```typescript
const getNextMessage = (currentIndex: number): { message: string; index: number } => {
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * MESSAGES.length);
  } while (nextIndex === currentIndex && MESSAGES.length > 1);
  
  return { message: MESSAGES[nextIndex], index: nextIndex };
};
```

**State update on movement:**
- When button moves (in handlePointerMove/handlePointerEnter), call:
  ```typescript
  const { message, index } = getNextMessage(lastMessageIndex);
  setMessage(message);
  setLastMessageIndex(index);
  ```

**Message display:**
- Add a message display element below/next to button:
  ```tsx
  <div className="message-container">
    <span className="runaway-message">{message}</span>
  </div>
  ```

**Component structure:**
```tsx
return (
  <div className="runaway-button-wrapper">
    <button
      ref={buttonRef}
      className={`runaway-button ${className || ''}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        position: 'relative'
      }}
    >
      {children}
    </button>
    <span className="runaway-message">{message}</span>
  </div>
);
```

**Initial state:**
- Set `message` initial state to first message (e.g., MESSAGES[0])
- Set `lastMessageIndex` to 0

This ensures users see different messages when chasing the button (requirement INTR-05).
  </action>
  <verify>
    - File contains `getNextMessage` function with do-while loop
    - File contains `setLastMessageIndex` state setter
    - Message display element exists in JSX
    - Initial message state is set to MESSAGES[0]
    - TypeScript compiles: `npx tsc --noEmit` (0 errors)
  </verify>
  <done>
    RunawayButton shows different humorous message on each evasion, with deduplication to avoid repeating the same message consecutively.
  </done>
</task>

<task type="auto">
  <name>Task 3: Create CSS for GPU-accelerated animations and mobile touch handling</name>
  <files>src/components/RunawayButton.css</files>
  <action>
Create RunawayButton.css with GPU-accelerated animations and mobile touch support:

```css
.runaway-button-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.runaway-button {
  /* GPU-accelerated transition for smooth movement */
  transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
  
  /* Prevent default touch actions (scrolling, zooming) */
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  
  /* Button styling */
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  border-radius: 8px;
  border: 1px solid transparent;
  background-color: #f9f9f9;
  cursor: pointer;
  font-family: inherit;
}

.runaway-button:hover {
  border-color: #ff6b6b;
}

.runaway-button:focus,
.runaway-button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .runaway-button {
    background-color: #1a1a1a;
    color: rgba(255, 255, 255, 0.87);
  }
}

.runaway-message {
  font-size: 0.9rem;
  color: #666;
  min-height: 1.2em;
  text-align: center;
  transition: opacity 0.2s ease;
}

@media (prefers-color-scheme: dark) {
  .runaway-message {
    color: #aaa;
  }
}
```

**Key properties explained:**
- `transition: transform 0.2s` — smooth animation for position changes (GPU-accelerated)
- `will-change: transform` — hints browser to optimize transform layer
- `touch-action: none` — CRITICAL for mobile: prevents browser from scrolling when touching button
- `-webkit-tap-highlight-color: transparent` — removes blue highlight on tap (iOS)
- `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — ease-out-quad for natural deceleration feel

This satisfies PERF-04 (CSS animations use transform/opacity only) and enables INTR-03 (mobile touch handling).
  </action>
  <verify>
    - `cat src/components/RunawayButton.css` exists
    - File contains `transition: transform` (NOT top/left)
    - File contains `will-change: transform`
    - File contains `touch-action: none`
    - File contains dark mode media query
  </verify>
  <done>
    CSS file exists with GPU-accelerated transform transitions, touch-action: none for mobile, and smooth cubic-bezier easing for natural movement.
  </done>
</task>

</tasks>

<verification>
**Code verification:**
- [ ] `npx tsc --noEmit` passes with 0 errors
- [ ] RunawayButton.tsx exports default component
- [ ] Component accepts children and optional className props
- [ ] Pointer event handlers use onPointerMove and onPointerEnter
- [ ] Boundary clamping uses getBoundingClientRect() and window.innerWidth/Height
- [ ] Transform uses translate3d() for GPU acceleration
- [ ] MESSAGES array has 7 Russian humorous strings
- [ ] Message rotation uses do-while to avoid consecutive duplicates

**Manual verification:**
- [ ] Button has smooth transition when moving (not instant)
- [ ] On desktop: moving mouse toward button causes it to move away
- [ ] Button never leaves visible viewport area
- [ ] Different message shown each time button moves
</verification>

<success_criteria>
**Observable outcomes:**
1. RunawayButton component exists with proper TypeScript types
2. Pointer Events API used (onPointerMove, onPointerEnter)
3. Viewport boundary clamping prevents button from leaving screen
4. Message rotation shows 5+ different humorous messages
5. CSS uses transform/opacity only for 60fps performance
6. Mobile touch handling prevents scrolling interference
</success_criteria>

<output>
After completion, create `.planning/phases/02-interactive-mechanics/02-interactive-mechanics-01-SUMMARY.md`
</output>
