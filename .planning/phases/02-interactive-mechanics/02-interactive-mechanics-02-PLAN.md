---
phase: 02-interactive-mechanics
plan: 02
type: execute
wave: 2
depends_on: ["02-interactive-mechanics-01"]
files_modified:
  - src/pages/HomePage.tsx
  - src/App.css
autonomous: true

must_haves:
  truths:
    - "HomePage displays both Yes and No buttons"
    - "Yes button navigates to /success when clicked"
    - "No button is RunawayButton that evades pointer approach"
    - "Runaway button shows humorous messages below it"
    - "Both buttons work on desktop and mobile"
  artifacts:
    - path: "src/pages/HomePage.tsx"
      provides: "Updated page with RunawayButton integration"
      contains: ["RunawayButton", "useNavigate", "handleYes"]
    - path: "src/App.css"
      provides: "Layout styles for button positioning"
      contains: [".home-page", ".buttons", "flex", "gap"]
  key_links:
    - from: "HomePage.tsx"
      to: "RunawayButton"
      via: "import and JSX usage"
      pattern: "import RunawayButton"
    - from: "HomePage.tsx"
      to: "/success"
      via: "navigate('/success')"
      pattern: "navigate\\(['\"]/success['\"]\\)"
---

<objective>
Integrate the RunawayButton component into HomePage, ensuring the Yes button remains stable and functional, verify the complete interactive flow works on both desktop and mobile, and validate 60fps performance.

Purpose: Complete the core valentine interaction — the playful "impossible to say no" experience that brings a smile.
Output: Updated HomePage with working RunawayButton, verified on desktop and mobile.
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
@.planning/phases/02-interactive-mechanics/02-interactive-mechanics-01-SUMMARY.md
@src/components/RunawayButton.tsx
@src/components/RunawayButton.css
@src/pages/SuccessPage.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Integrate RunawayButton into HomePage</name>
  <files>src/pages/HomePage.tsx</files>
  <action>
Update HomePage.tsx to integrate RunawayButton component:

**Add imports:**
```typescript
import { useNavigate } from 'react-router';
import RunawayButton from '../components/RunawayButton';
import '../components/RunawayButton.css';
```

**Keep existing Yes button logic:**
```typescript
const navigate = useNavigate();

const handleYes = () => {
  navigate('/success');
};
```

**Update JSX structure:**
```tsx
return (
  <div className="home-page">
    <h1>Будешь моей валентинкой?</h1>
    <div className="buttons">
      <button className="yes-button" onClick={handleYes}>
        Да
      </button>
      <RunawayButton className="no-button">
        Нет
      </RunawayButton>
    </div>
  </div>
);
```

**Important:**
- Keep handleYes function exactly as is (INTR-01 requirement)
- Replace static "Нет" button with RunawayButton component
- Import the CSS file so styles are applied
- Use className prop to pass styling classes to RunawayButton

The Yes button should remain a simple button that navigates to /success on click.
  </action>
  <verify>
    - File contains `import RunawayButton from '../components/RunawayButton'`
    - File contains `import '../components/RunawayButton.css'`
    - handleYes function unchanged
    - Static "Нет" button replaced with `<RunawayButton>Нет</RunawayButton>`
    - TypeScript compiles: `npx tsc --noEmit` (0 errors)
  </verify>
  <done>
    HomePage.tsx imports and uses RunawayButton component, with stable Yes button that navigates to /success.
  </done>
</task>

<task type="auto">
  <name>Task 2: Add layout CSS for button positioning</name>
  <files>src/App.css</files>
  <action>
Update App.css to add proper layout for HomePage buttons:

**Add to existing App.css:**
```css
/* HomePage layout */
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
}

.home-page h1 {
  margin-bottom: 2rem;
  font-size: 2.5rem;
  line-height: 1.2;
}

.buttons {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
}

/* Yes button specific styles */
.yes-button {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 0.8em 2em;
  font-size: 1.1em;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.yes-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
}

.yes-button:active {
  transform: scale(0.98);
}

/* No button wrapper styling */
.no-button {
  background-color: #e0e0e0;
  color: #333;
  border: 2px solid #ccc;
}

/* Mobile adjustments */
@media (max-width: 480px) {
  .home-page h1 {
    font-size: 2rem;
  }
  
  .buttons {
    flex-direction: column;
    gap: 1rem;
  }
  
  .yes-button,
  .no-button {
    width: 100%;
    max-width: 200px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .yes-button {
    background-color: #ff5252;
  }
  
  .no-button {
    background-color: #444;
    color: #fff;
    border-color: #666;
  }
}
```

**Key layout considerations:**
- `align-items: flex-start` in .buttons — allows RunawayButton to move upward
- `flex-wrap: wrap` — handles small screens gracefully
- Yes button has prominent styling (red background, larger padding)
- Mobile breakpoint at 480px — stacks buttons vertically on phones
- Dark mode support matches system preference

This ensures buttons are properly positioned and visually distinct.
  </action>
  <verify>
    - File contains `.home-page` with flex column layout
    - File contains `.buttons` with flex row and gap
    - File contains `.yes-button` with red background styling
    - File contains `@media (max-width: 480px)` mobile breakpoint
    - File contains dark mode media query
  </verify>
  <done>
    CSS added for home page layout, button positioning, mobile responsiveness, and dark mode support.
  </done>
</task>

<task type="auto">
  <name>Task 3: Verify complete flow and performance</name>
  <files>src/pages/HomePage.tsx</files>
  <action>
Verify the complete interactive flow works correctly:

**1. TypeScript compilation:**
```bash
npx tsc --noEmit
```
Expected: 0 errors

**2. Development server test:**
```bash
npm run dev
```
Then open http://localhost:5173 in browser.

**Desktop verification checklist:**
- [ ] Page loads with "Будешь моей валентинкой?" heading
- [ ] Two buttons visible: "Да" (red) and "Нет" (gray)
- [ ] Yes button is clickable and navigates to /success
- [ ] Success page shows "Ура! ❤️" message
- [ ] Moving mouse toward No button causes it to move away
- [ ] Button movement is smooth (not instant)
- [ ] Button never leaves visible viewport area
- [ ] Different humorous message appears each time button moves
- [ ] Can see at least 5 different messages by moving mouse multiple times

**Mobile verification checklist (DevTools or actual device):**
- [ ] Open DevTools → Toggle device toolbar → Select iPhone SE (375px)
- [ ] Page layout adjusts to vertical button stack
- [ ] Touch No button causes it to move before tap registers
- [ ] No button never goes off-screen
- [ ] Page doesn't scroll when touching button area
- [ ] Yes button is tappable and navigates to success

**Performance verification:**
- [ ] Open DevTools → Performance tab
- [ ] Record while moving mouse over No button rapidly
- [ ] Check that frame rate stays at 60fps
- [ ] Verify no layout thrashing (no purple bars in performance timeline)

**Fix any issues found during verification.**
  </action>
  <verify>
    - `npx tsc --noEmit` returns 0 errors
    - Dev server starts without errors: `npm run dev` outputs "Local: http://localhost:5173/"
    - Browser loads HomePage successfully
    - Yes button navigates to /success
    - RunawayButton moves on pointer approach
  </verify>
  <done>
    Complete flow verified: TypeScript compiles, dev server runs, Yes button navigates, RunawayButton evades pointer, messages rotate, mobile works, performance at 60fps.
  </done>
</task>

</tasks>

<verification>
**Functional verification:**
- [ ] HomePage renders with both buttons
- [ ] Yes button is stable and clickable
- [ ] Yes button navigates to /success route
- [ ] RunawayButton component is imported and used
- [ ] No button moves on pointer approach (desktop)
- [ ] No button moves on touch approach (mobile)
- [ ] Button stays within viewport boundaries
- [ ] Humorous messages rotate (5+ different messages visible)

**Performance verification:**
- [ ] Movement is smooth at 60fps
- [ ] No layout thrashing in performance profile
- [ ] CSS uses transform/opacity only

**Code quality:**
- [ ] TypeScript compiles with 0 errors (strict mode)
- [ ] No console errors or warnings
- [ ] Components properly typed
</verification>

<success_criteria>
**Observable outcomes:**
1. User sees HomePage with "Будешь моей валентинкой?" and two buttons
2. Clicking "Да" navigates to success page reliably
3. Moving mouse toward "Нет" causes smooth evasion
4. On mobile, attempting to tap "Нет" causes it to relocate
5. Button never leaves visible screen area (tested on iPhone SE)
6. User sees at least 5 different humorous messages
7. Movement stays at 60fps on mid-range mobile devices
8. No console errors or TypeScript compilation errors
</success_criteria>

<output>
After completion, create `.planning/phases/02-interactive-mechanics/02-interactive-mechanics-02-SUMMARY.md`
</output>
