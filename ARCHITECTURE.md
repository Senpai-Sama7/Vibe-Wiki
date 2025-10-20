# Vibe Wiki Architecture Documentation

## Overview

Vibe Wiki is an enterprise-grade visual web development learning platform built with Next.js 15, React 19, and modern web technologies. This document outlines the architectural decisions, design patterns, and technical implementation details.

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Static Generation                         │
│                   (Next.js Static Export)                     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Routing    │  │  Components  │  │    Hooks     │      │
│  │  (App Dir)   │  │   (React)    │  │   (State)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Data Layer                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Content    │  │  IndexedDB   │  │ LocalStorage │      │
│  │  Manifest    │  │   (Cache)    │  │  (Progress)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Infrastructure                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    CDN       │  │Service Worker│  │  Analytics   │      │
│  │  (GitHub     │  │    (PWA)     │  │  (Tracking)  │      │
│  │   Pages)     │  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Homepage (concept list)
│   ├── concept/[slug]/           # Dynamic concept pages
│   │   └── page.tsx              # Individual concept view
│   ├── search/                   # Search functionality
│   │   └── page.tsx              # Search results page
│   ├── not-found.tsx             # 404 page
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── ConceptCard.tsx           # Main learning component
│   ├── ConceptCardClient.tsx     # Client-side wrapper
│   ├── ErrorBoundary.tsx         # Error handling
│   ├── Loading.tsx               # Loading states
│   ├── SEO.tsx                   # SEO & metadata
│   ├── Toast.tsx                 # Notifications
│   ├── CopyButton.tsx            # Code copying
│   ├── ProgressIndicator.tsx     # Learning progress
│   ├── PWAInstallPrompt.tsx      # PWA installation
│   ├── PWAStatus.tsx             # PWA status
│   ├── WebVitalsDashboard.tsx    # Performance metrics
│   ├── AnimatedDiagram.tsx       # Visualization loader
│   ├── ComparisonTable.tsx       # Feature comparison
│   ├── SearchBox.tsx             # Search input
│   ├── SearchResults.tsx         # Search display
│   ├── SearchSuggestions.tsx     # Search autocomplete
│   ├── HeroEnhanced.tsx          # Hero section
│   ├── HeroBackground.tsx        # Background effects
│   └── HeroOrbitalScene.tsx      # 3D animations
│
├── hooks/                        # Custom React hooks
│   ├── useToast.ts               # Toast notifications
│   ├── useProgress.ts            # Progress tracking
│   ├── usePWA.ts                 # PWA functionality
│   └── useWebVitals.ts           # Performance monitoring
│
├── lib/                          # Core libraries
│   ├── content/                  # Content management
│   │   ├── concepts.ts           # Content manifest
│   │   └── schema.ts             # TypeScript schemas
│   │
│   ├── storage/                  # Data persistence
│   │   ├── indexedDB.ts          # IndexedDB wrapper
│   │   └── progressStore.ts      # Progress state
│   │
│   ├── search/                   # Search engine
│   │   ├── index.ts              # Search interface
│   │   └── fuzzyMatch.ts         # Fuzzy matching
│   │
│   ├── performance/              # Performance
│   │   └── webVitals.ts          # Web Vitals tracking
│   │
│   ├── pwa/                      # PWA utilities
│   │   └── installPrompt.ts      # Install handling
│   │
│   └── utils/                    # Utility functions
│       ├── clipboard.ts          # Clipboard operations
│       ├── helpers.ts            # General utilities
│       ├── analytics.ts          # Event tracking
│       ├── accessibility.ts      # A11y helpers
│       └── testing.ts            # Test utilities
│
└── types/                        # TypeScript types
    ├── index.d.ts                # Global types
    └── react-syntax-highlighter.d.ts  # Library types
```

## Key Design Patterns

### 1. Multi-Modal Learning System

Each concept is presented in three progressive modes:

- **Elementary**: 5th-grade level explanations
- **Analogical**: Real-world metaphors
- **Technical**: Deep technical details

Implementation:
```typescript
interface ConceptExplanation {
  readonly elementary: string;
  readonly analogical: string;
  readonly technical: string;
}
```

### 2. Content-First Architecture

All content is statically compiled at build time:

```typescript
// Content is defined as TypeScript objects
const concept: ConceptDefinition = {
  id: 'concept-001',
  explanations: { ... },
  visualization: { ... },
  codeExamples: [ ... ]
};

// Manifest is exported for type-safe access
export const contentManifest: ContentManifest = {
  version: '1.0.0',
  concepts: [concept1, concept2, ...],
  categories: { ... }
};
```

### 3. Progressive Enhancement

Features are layered for maximum compatibility:

1. **Base**: Semantic HTML + CSS
2. **Enhanced**: JavaScript interactivity
3. **Advanced**: 3D visualizations, PWA features

### 4. Error Boundaries

React error boundaries catch and handle component errors:

```typescript
<ErrorBoundary fallback={<ErrorUI />}>
  <ConceptCard concept={concept} />
</ErrorBoundary>
```

### 5. Code Splitting & Lazy Loading

Heavy components are dynamically imported:

```typescript
const HeroEnhanced = dynamic(() => import('@/components/HeroEnhanced'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});
```

## Data Flow

### Learning Mode Persistence

```
User selects mode → Local storage update → Event broadcast → 
All ConceptCards sync → Mode preference persisted
```

### Progress Tracking

```
Concept viewed → Time tracked → LocalStorage updated → 
IndexedDB backup → Progress indicator updated
```

### Code Copying

```
Copy button clicked → Text copied → Success toast → 
Analytics event → Clipboard API fallback if needed
```

## Performance Optimizations

### 1. Static Generation

- All pages pre-rendered at build time
- No server required for deployment
- Instant page loads from CDN

### 2. Bundle Optimization

- Code splitting by route
- Tree shaking unused code
- Minification and compression
- Production console removal

### 3. Lazy Loading

- Images lazy loaded
- Components dynamically imported
- Intersection Observer for viewport detection

### 4. Caching Strategy

Service Worker implements multi-tier caching:

- **Static Cache**: HTML, CSS, JS, images
- **Dynamic Cache**: API responses, user data
- **Network-First**: Fresh content priority
- **Cache-First**: Static assets priority

## Accessibility Features

### WCAG 2.1 AA Compliance

- Semantic HTML structure
- ARIA labels and live regions
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance
- Focus management
- Skip links

### Reduced Motion

Respects `prefers-reduced-motion`:

```typescript
const shouldAnimate = !prefersReducedMotion();
```

### High Contrast

Supports high contrast mode detection:

```typescript
const highContrast = prefersHighContrast();
```

## Security Measures

### 1. Content Security Policy

Prevents XSS and injection attacks:

```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
```

### 2. No Server-Side Secrets

Static export eliminates server vulnerabilities:

- No database
- No API keys
- No authentication tokens
- Client-side only

### 3. CodeQL Analysis

Automated security scanning:

- Zero known vulnerabilities
- Continuous monitoring
- Dependency auditing

## Testing Strategy

### Unit Tests

Test individual utilities:

```typescript
import { formatBytes } from '@/lib/utils/helpers';

test('formatBytes converts correctly', () => {
  expect(formatBytes(1024)).toBe('1 KB');
});
```

### Component Tests

Test React components:

```typescript
import { render } from '@testing-library/react';
import { ConceptCard } from '@/components/ConceptCard';

test('ConceptCard renders', () => {
  const { getByText } = render(<ConceptCard concept={mockConcept} />);
  expect(getByText('Test Concept')).toBeInTheDocument();
});
```

### E2E Tests

Playwright tests for critical flows:

```typescript
test('user can switch learning modes', async ({ page }) => {
  await page.goto('/concept/vibe-coding');
  await page.click('[aria-label="Technical mode"]');
  await expect(page.locator('.technical-content')).toBeVisible();
});
```

### Accessibility Tests

Automated a11y auditing:

```typescript
test('no accessibility violations', async () => {
  const results = await axe(page);
  expect(results.violations).toHaveLength(0);
});
```

## Deployment Pipeline

### Build Process

1. **Type Check**: `tsc --noEmit`
2. **Lint**: `eslint . --max-warnings 0`
3. **Build**: `next build` (static export)
4. **Test**: `jest --coverage`
5. **Deploy**: Upload to GitHub Pages

### GitHub Pages Deployment

```yaml
# .github/workflows/deploy.yml
- name: Build
  run: npm run build
  
- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./out
```

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Modern mobile browsers

## Performance Budgets

- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- INP (Interaction to Next Paint): < 200ms
- TTFB (Time to First Byte): < 800ms

## Future Enhancements

1. **Three.js Visualizations**: Re-enable when R3F types are compatible
2. **Offline-First**: Enhanced PWA with background sync
3. **Internationalization**: Multi-language support
4. **Advanced Search**: Full-text search with filters
5. **User Accounts**: Progress sync across devices
6. **AI Integration**: Personalized learning paths
7. **Mobile Apps**: React Native versions

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

See [LICENSE](./LICENSE) for details.

---

*Last Updated: October 20, 2025*
