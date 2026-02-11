---
phase: 01-foundation-setup
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - package.json
  - vite.config.ts
  - tsconfig.json
  - tsconfig.app.json
  - index.html
  - src/main.tsx
  - src/App.tsx
  - src/vite-env.d.ts
  - src/pages/HomePage.tsx
  - src/pages/SuccessPage.tsx
  - src/components/.gitkeep
  - src/assets/.gitkeep
autonomous: true
user_setup:
  - task: "Node.js version check"
    why: "Vite 6+ requires Node 20.19+ or 22.12+"
    command: "node --version"
    expected: ">= 20.19.0 or >= 22.12.0"

must_haves:
  truths:
    - "Developer can run `npm run dev` and see main page load in browser"
    - "Navigation between main page and success page works via React Router"
    - "TypeScript compiles without errors with strict mode enabled"
    - "Project folder structure follows React best practices (components/, pages/, assets/)"
    - "Vite build completes successfully with `npm run build`"
  artifacts:
    - path: "package.json"
      provides: "Dependencies: react, react-dom, react-router, vite, typescript"
      contains: '"react": "^18"'
    - path: "vite.config.ts"
      provides: "Vite configuration with path aliases"
      contains: "alias: { '@':"
    - path: "tsconfig.app.json"
      provides: "TypeScript strict configuration"
      contains: '"strict": true'
    - path: "src/App.tsx"
      provides: "React Router setup with two routes"
      exports: ["default"]
    - path: "src/pages/HomePage.tsx"
      provides: "Main page with valentine question"
      exports: ["default"]
    - path: "src/pages/SuccessPage.tsx"
      provides: "Success celebration page"
      exports: ["default"]
  key_links:
    - from: "src/App.tsx"
      to: "src/pages/HomePage.tsx"
      via: "Route element prop"
      pattern: "element={<HomePage />}"
    - from: "src/App.tsx"
      to: "src/pages/SuccessPage.tsx"
      via: "Route element prop"
      pattern: "element={<SuccessPage />}"
    - from: "src/pages/HomePage.tsx"
      to: "/success"
      via: "useNavigate hook"
      pattern: "navigate\\('/success'\\)"
    - from: "vite.config.ts"
      to: "tsconfig.app.json"
      via: "Path alias sync"
      pattern: "@/.*src"
---

<objective>
Scaffold a complete React + TypeScript + Vite project with React Router navigation between two pages. Set up development environment with hot reload, strict TypeScript, and proper folder structure.

Purpose: Establish the foundation for all subsequent development - if this doesn't work, nothing else can be built.
Output: Working dev server at http://localhost:5173 with navigable main and success pages.
</objective>

<execution_context>
@/Users/apalekseev/.config/opencode/get-shit-done/workflows/execute-plan.md
@/Users/apalekseev/.config/opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/01-foundation-setup/01-RESEARCH.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Scaffold Vite + React + TypeScript project</name>
  <files>package.json, tsconfig.json, tsconfig.app.json, tsconfig.node.json, index.html, src/main.tsx, src/vite-env.d.ts</files>
  <action>
    Run `npm create vite@latest . -- --template react-ts` to scaffold the project in current directory.
    
    This creates:
    - package.json with React 18+, TypeScript, Vite dependencies
    - index.html at project root (Vite requirement)
    - src/main.tsx entry point
    - src/App.tsx root component (to be modified in Task 2)
    - TypeScript configs with strict mode
    - vite.config.ts with React plugin
    
    IMPORTANT: Use current directory (.) not a subfolder - the project should be at repo root.
    
    After scaffolding, install dependencies with `npm install`.
    
    Verify files exist:
    - index.html at root (not in public/)
    - src/main.tsx with React 18 createRoot
    - tsconfig.app.json with "strict": true
  </action>
  <verify>ls package.json index.html src/main.tsx src/App.tsx vite.config.ts</verify>
  <done>package.json exists, node_modules/ populated, index.html at project root</done>
</task>

<task type="auto">
  <name>Task 2: Configure path aliases and install React Router</name>
  <files>vite.config.ts, tsconfig.app.json</files>
  <action>
    Install React Router v7: `npm install react-router`
    
    Configure path aliases in BOTH files (common pitfall - must match):
    
    1. Update vite.config.ts:
    ```typescript
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import path from 'path'
    
    export default defineConfig({
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
    })
    ```
    
    2. Update tsconfig.app.json (add to compilerOptions):
    ```json
    {
      "compilerOptions": {
        "baseUrl": ".",
        "paths": {
          "@/*": ["./src/*"]
        }
      }
    }
    ```
    
    WHY: Path aliases allow clean imports like `@/components/Button` instead of `../../components/Button`.
    WARNING: Must configure in BOTH vite.config.ts AND tsconfig.app.json or imports will fail.
  </action>
  <verify>cat vite.config.ts | grep -A5 "alias:" && cat tsconfig.app.json | grep -A3 '"paths"'</verify>
  <done>Both vite.config.ts and tsconfig.app.json have @/ alias pointing to ./src</done>
</task>

<task type="auto">
  <name>Task 3: Create folder structure and page components</name>
  <files>src/pages/HomePage.tsx, src/pages/SuccessPage.tsx, src/components/.gitkeep, src/assets/.gitkeep, src/App.tsx</files>
  <action>
    Create folder structure following React best practices:
    ```
    src/
    ├── components/     # Reusable UI components
    ├── pages/          # Route-level components  
    └── assets/         # Static assets
    ```
    
    Create src/pages/HomePage.tsx:
    ```typescript
    import { useNavigate } from 'react-router';
    
    export default function HomePage() {
      const navigate = useNavigate();
      
      const handleYes = () => {
        navigate('/success');
      };
      
      return (
        <div className="home-page">
          <h1>Будешь моей валентинкой?</h1>
          <div className="buttons">
            <button onClick={handleYes}>Да</button>
            <button>Нет</button>
          </div>
        </div>
      );
    }
    ```
    
    Create src/pages/SuccessPage.tsx:
    ```typescript
    export default function SuccessPage() {
      return (
        <div className="success-page">
          <h1>Ура! ❤️</h1>
          <p>Ты согласилась быть моей валентинкой!</p>
        </div>
      );
    }
    ```
    
    Update src/App.tsx with routing:
    ```typescript
    import { BrowserRouter, Routes, Route } from 'react-router';
    import HomePage from './pages/HomePage';
    import SuccessPage from './pages/SuccessPage';
    
    function App() {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </BrowserRouter>
      );
    }
    
    export default App;
    ```
    
    WHY: React Router v7 uses `react-router` import (not react-router-dom). BrowserRouter enables clean URLs without hash.
    NOTE: This is basic structure only - styling and runaway button mechanics come in Phase 2.
  </action>
  <verify>ls src/pages/HomePage.tsx src/pages/SuccessPage.tsx src/components/.gitkeep src/assets/.gitkeep</verify>
  <done>Folder structure exists: components/, pages/, assets/; HomePage and SuccessPage created; App.tsx has routing</done>
</task>

<task type="auto">
  <name>Task 4: Verify development environment and build</name>
  <files>All project files</files>
  <action>
    Verify TypeScript compiles without errors:
    ```bash
    npx tsc --noEmit
    ```
    
    Must pass with 0 errors. If strict mode is enabled, this catches type errors early.
    
    Verify Vite build completes successfully:
    ```bash
    npm run build
    ```
    
    Must create dist/ folder with production assets:
    - dist/index.html
    - dist/assets/ (JS and CSS bundles)
    
    WHY: Build verification ensures production deployment will work. GitHub Actions runs this same command.
    
    Start dev server to verify hot reload works:
    ```bash
    timeout 5 npm run dev || true
    ```
    
    Should start without errors (timeout kills after 5s, that's expected).
    
    FINAL VERIFICATION CHECKLIST:
    ✓ package.json has all dependencies
    ✓ tsconfig.app.json has "strict": true
    ✓ vite.config.ts has @/ alias configured
    ✓ src/pages/ has HomePage.tsx and SuccessPage.tsx
    ✓ src/App.tsx has BrowserRouter with two routes
    ✓ TypeScript compiles (npx tsc --noEmit)
    ✓ Build completes (npm run build creates dist/)
  </action>
  <verify>npx tsc --noEmit && ls dist/index.html dist/assets/</verify>
  <done>TypeScript compiles with 0 errors, build creates dist/ folder with index.html and assets/</done>
</task>

</tasks>

<verification>
After completing all tasks, verify:

1. **TypeScript strict mode**: `npx tsc --noEmit` returns exit code 0
2. **Development server**: `npm run dev` starts without errors, accessible at http://localhost:5173
3. **Routing works**: 
   - http://localhost:5173/ shows "Будешь моей валентинкой?"
   - Clicking "Да" navigates to /success showing "Ура! ❤️"
4. **Build output**: `npm run build` creates dist/ folder with index.html and assets/
5. **Folder structure**: src/components/, src/pages/, src/assets/ exist
6. **Hot reload**: Editing a file triggers automatic browser refresh
</verification>

<success_criteria>
All must be true:
- [ ] Developer can run `npm run dev` and see the main page load in browser
- [ ] Navigation between main page (/) and success page (/success) works via React Router
- [ ] TypeScript compiles without errors (`npx tsc --noEmit` passes)
- [ ] Strict mode is enabled in tsconfig.app.json
- [ ] Project has src/components/, src/pages/, src/assets/ folders
- [ ] Vite build completes successfully (`npm run build` creates dist/)
- [ ] Path aliases (@/) work in both dev and build
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation-setup/01-foundation-setup-01-SUMMARY.md`

Summary must include:
- Stack: React 18, TypeScript 5, Vite 6, React Router 7
- Folder structure created
- Key configuration: strict TypeScript, path aliases
- Verified: dev server works, routing works, build succeeds
</output>
