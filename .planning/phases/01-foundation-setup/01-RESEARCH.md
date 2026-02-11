# Phase 1: Foundation Setup - Research

**Researched:** 2026-02-11
**Domain:** React 18+ + TypeScript + Vite + React Router
**Confidence:** HIGH

## Summary

This research covers the foundational stack for a modern React application using Vite as the build tool, TypeScript for type safety, and React Router v7 for navigation. The stack is mature, well-documented, and represents the current industry standard for React SPA development as of early 2025.

Vite has replaced Create React App as the de facto standard for React project scaffolding due to its significantly faster dev server startup (near-instant vs. 10-30 seconds), lightning-fast Hot Module Replacement (HMR), and optimized production builds using Rollup. React Router v7, released in late 2024, merged with Remix and now offers multiple routing modes while maintaining backward compatibility.

**Primary recommendation:** Use `npm create vite@latest` with the `react-ts` template, then add React Router v7 in declarative mode for a lightweight SPA setup.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | ^18.2.0+ (or ^19.0.0) | UI library | Industry standard, React 19 released Nov 2024 |
| React DOM | ^18.2.0+ (or ^19.0.0) | DOM renderer | Paired with React |
| Vite | ^6.0.0+ | Build tool & dev server | 100x faster HMR than webpack, official React recommendation |
| TypeScript | ^5.0.0+ | Type system | De facto standard for React apps |
| React Router | ^7.0.0+ | Client-side routing | Most popular React routing solution, v7 merged Remix features |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @types/react | ^18.x / ^19.x | React type definitions | Always with TypeScript |
| @types/react-dom | ^18.x / ^19.x | ReactDOM type definitions | Always with TypeScript |
| @vitejs/plugin-react | ^4.0.0+ | Official Vite React plugin | Always (handles Fast Refresh) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Vite | Next.js | Next.js adds SSR complexity unnecessary for simple SPA |
| React Router v7 (declarative) | React Router v7 (framework mode) | Framework mode uses file-based routing, adds server features - overkill for 2-page app |
| React Router | TanStack Router | TanStack has better type safety but is newer, smaller ecosystem |

**Installation:**
```bash
# Create project with Vite template
npm create vite@latest my-app -- --template react-ts

# Install React Router v7
cd my-app
npm install react-router
```

## Architecture Patterns

### Recommended Project Structure
```
my-app/
├── public/              # Static assets (copied as-is)
│   └── vite.svg
├── src/
│   ├── assets/          # Imported assets (processed by Vite)
│   │   └── react.svg
│   ├── components/      # Reusable UI components
│   │   └── Button.tsx
│   ├── pages/           # Route-level page components
│   │   ├── HomePage.tsx
│   │   └── SuccessPage.tsx
│   ├── App.tsx          # Root component with routing
│   ├── main.tsx         # Application entry point
│   └── vite-env.d.ts    # Vite type declarations
├── index.html           # Entry HTML (Vite treats as source)
├── package.json
├── tsconfig.json        # TypeScript config (strict mode)
├── tsconfig.app.json    # App-specific TS config
├── tsconfig.node.json   # Vite config TS settings
└── vite.config.ts       # Vite configuration
```

### Pattern 1: Declarative Routing with React Router v7
**What:** Traditional component-based routing using BrowserRouter, Routes, Route
**When to use:** Simple SPAs with 2-5 pages, no server rendering needed
**Example:**
```typescript
// src/App.tsx
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

### Pattern 2: TypeScript Strict Configuration
**What:** Enable all strict type-checking options
**When to use:** Always for new projects
**Example:**
```json
// tsconfig.app.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

### Pattern 3: Path Aliases for Clean Imports
**What:** Use `@/` prefix for src directory imports
**When to use:** Projects with nested directories (avoids `../../` hell)
**Example:**
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

```json
// tsconfig.app.json (add to compilerOptions)
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Anti-Patterns to Avoid
- **Flat project structure:** Don't put all files in src/ root; use folder separation
- **Implicit any:** Never disable strict mode or use `any` type
- **Mixed module systems:** Stick to ES modules (type: "module" in package.json)
- **index.html in public/:** Vite requires index.html at project root, not in public/

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Module bundling | Custom webpack config | Vite | Vite is pre-configured, faster, better maintained |
| Dev server with HMR | Express + nodemon | Vite dev server | Vite's HMR is near-instant, preserves state |
| Type checking | Babel-only | TypeScript compiler | Need actual type checking, not just transpilation |
| Path resolution | Manual import maps | Vite resolve.alias + tsconfig paths | Must sync between Vite and TypeScript |
| Environment variables | process.env direct access | Vite's import.meta.env | Vite handles env variable substitution |

**Key insight:** Vite handles the entire build pipeline - bundling, dev server, HMR, and optimizations. Attempting to customize or replace parts of it typically results in configuration hell with no real benefit.

## Common Pitfalls

### Pitfall 1: React Router v7 Import Path Confusion
**What goes wrong:** Importing from `react-router-dom` instead of `react-router` causes issues or warnings
**Why it happens:** React Router v7 consolidated packages - `react-router-dom` is now just a re-export of `react-router`
**How to avoid:** Always import from `react-router` in v7+
```typescript
// CORRECT for v7:
import { BrowserRouter, Routes, Route } from 'react-router';

// OLD v6 way (still works but not recommended):
import { BrowserRouter, Routes, Route } from 'react-router-dom';
```
**Warning signs:** Console warnings about deprecated imports or duplicate router context

### Pitfall 2: Path Alias Resolution Mismatch
**What goes wrong:** TypeScript recognizes `@/components` but Vite throws "Failed to resolve import"
**Why it happens:** TypeScript and Vite have separate module resolution - must configure both
**How to avoid:** Configure aliases in BOTH `vite.config.ts` AND `tsconfig.json`
**Warning signs:** Build works but dev server fails, or vice versa

### Pitfall 3: index.html Location
**What goes wrong:** 404 errors or blank page after build
**Why it happens:** Vite expects `index.html` at project root (not in public/), unlike Create React App
**How to avoid:** Keep `index.html` at project root, reference assets with relative paths
**Warning signs:** `Cannot GET /` errors in dev, or blank page in production build

### Pitfall 4: Node Version Requirements
**What goes wrong:** cryptic errors during `npm install` or build
**Why it happens:** Vite 6+ requires Node.js 20.19+ or 22.12+
**How to avoid:** Check Node version before starting: `node --version`
**Warning signs:** "EBADENGINE" warnings or esbuild-related errors

### Pitfall 5: Environment Variable Naming
**What goes wrong:** Environment variables not available in client-side code
**Why it happens:** Vite only exposes env vars prefixed with `VITE_` to client code
**How to avoid:** Rename variables: `API_KEY` → `VITE_API_KEY`
```typescript
// In code:
const apiKey = import.meta.env.VITE_API_KEY; // Works
const secret = import.meta.env.API_KEY; // undefined
```
**Warning signs:** `undefined` values for env variables at runtime

## Code Examples

Verified patterns from official sources:

### Basic Page Component
```typescript
// src/pages/HomePage.tsx
interface HomePageProps {
  onYesClick: () => void;
}

export default function HomePage({ onYesClick }: HomePageProps) {
  return (
    <div className="home-page">
      <h1>Will you be my valentine?</h1>
      <button onClick={onYesClick}>Yes</button>
    </div>
  );
}
```

### Navigation Programmatically
```typescript
// Navigate from a component
import { useNavigate } from 'react-router';

function HomePage() {
  const navigate = useNavigate();
  
  const handleYes = () => {
    navigate('/success');
  };
  
  return <button onClick={handleYes}>Yes</button>;
}
```

### Vite Config for Production Build
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Create React App | Vite | 2023-2024 | 10-100x faster dev server |
| React Router v6 | React Router v7 | Nov 2024 | Merged with Remix, new framework mode |
| `react-router-dom` imports | `react-router` imports | Nov 2024 | Single consolidated package |
| webpack bundling | Vite (esbuild + Rollup) | 2020+ | Instant HMR, faster builds |
| TypeScript 4.x | TypeScript 5.x | 2023+ | Better performance, new features |
| `.jsx` extensions | `.tsx` extensions | Always | Full type safety |

**Deprecated/outdated:**
- Create React App: No longer maintained by React team, slow builds
- `React.FC` type: No longer recommended, implicit children caused issues
- Class components: Functional components with hooks are standard
- `process.env`: Use `import.meta.env` in Vite

## Open Questions

1. **React 19 vs React 18 for this project?**
   - What we know: React 19 was released November 2024, Vite templates now offer both
   - What's unclear: Whether any dependencies will have compatibility issues with React 19
   - Recommendation: Use React 18.2+ for maximum compatibility, or React 19 if using latest Vite template

2. **React Router v7 declarative vs framework mode?**
   - What we know: v7 has two modes - declarative (like v6) and framework (like Remix with file-based routing)
   - What's unclear: Whether framework mode adds unnecessary complexity for 2-page SPA
   - Recommendation: Use declarative mode for simplicity (`BrowserRouter` + `Routes`)

3. **GitHub Actions runner Node version?**
   - What we know: Need Node 20.19+ for Vite 6+
   - What's unclear: Default Node version on `ubuntu-latest` GitHub Actions runner
   - Recommendation: Explicitly set Node version in CI workflow using `actions/setup-node`

## Sources

### Primary (HIGH confidence)
- Vite Official Documentation (vitejs.dev) - Setup, configuration, templates
- React Router v7 Documentation - Routing patterns, API reference
- TypeScript 5.x Documentation - tsconfig options, strict mode

### Secondary (MEDIUM confidence)
- LogRocket Blog "How to build a React + TypeScript app with Vite" (May 2025) - Verified Vite setup patterns
- Medium "Complete Guide to Setting up React with TypeScript and Vite" (2026) - Project structure patterns
- DEV Community "Set up a new React project: Vite, TypeScript, ESLint, Prettier" (May 2025) - Configuration best practices

### Tertiary (LOW confidence)
- Various blog posts on React Router v7 migration patterns - Cross-referenced with official docs

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Vite + React + TS is well-established, documented in official sources
- Architecture: HIGH - Standard patterns from Vite templates and React docs
- Pitfalls: MEDIUM-HIGH - Common issues well-documented in community, some based on personal experience patterns

**Research date:** 2026-02-11
**Valid until:** 2026-04-11 (30 days for stable tech stack)

**Note:** No CONTEXT.md exists for this phase, so all research decisions were made based on current best practices. Prior decisions from user: React + Vite + TypeScript, GitHub Actions CI/CD, mobile-first approach, Pointer Events for interactions.
