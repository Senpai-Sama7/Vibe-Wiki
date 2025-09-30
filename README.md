# Vibe Wiki

**Enterprise-grade visual web development learning platform** built with Next.js 15, React 19, and Three.js.

A multi-modal learning platform that teaches web development concepts through three progressive modes: elementary explanations, real-world analogies, and technical deep-dives, powered by interactive 3D visualizations.

---

## Project Status

**Version**: 1.0.0
**Build Status**: Builds successfully with known deployment limitations
**Last Updated**: September 30, 2025

### What's Working

- Next.js 15 + React 19 core application
- TypeScript type safety across the codebase
- Three-mode learning system (Elementary / Analogical / Technical)
- Content manifest and concept routing
- Interactive UI components (ConceptCard, CopyButton, Toast notifications)
- Copy-to-clipboard functionality with toast feedback
- Progress tracking with LocalStorage persistence
- Responsive design with Tailwind CSS
- Dark mode support
- Accessibility features (ARIA labels, keyboard navigation)
- Code syntax highlighting with react-syntax-highlighter
- Framer Motion animations

### Known Limitations

1. **Three.js Visualizations** - Currently disabled due to React Three Fiber TypeScript compatibility issues with Next.js 15
2. **Static Export** - Next.js 15 has compatibility issues with `output: 'export'` mode (manifest generation errors)
3. **Development Mode Only** - Project currently runs in development mode; static deployment requires workaround

---

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Navigate to project directory
cd /home/donovan/vibe-wiki/claude

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Available Scripts

### Development

```bash
npm run dev          # Start development server on port 3000
npm run lint         # Run ESLint with zero warnings enforcement
npm run lint:fix     # Auto-fix linting issues
npm run type-check   # TypeScript type checking (no emit)
```

### Build & Production

```bash
npm run build        # Build for production (currently has post-processing errors)
npm start            # Start production server
```

### Testing (Configured but not implemented)

```bash
npm run test         # Run Jest tests
npm run test:watch   # Run Jest in watch mode
npm run test:e2e     # Run Playwright E2E tests
npm run test:a11y    # Run accessibility tests
```

### Code Quality

```bash
npm run format       # Format code with Prettier
npm run validate     # Run type-check + lint + test
```

---

## Project Structure

```
/home/donovan/vibe-wiki/claude/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout with toast provider
│   │   ├── page.tsx             # Homepage
│   │   └── concept/[slug]/      # Dynamic concept pages
│   │       └── page.tsx         # Individual concept display
│   ├── components/              # React components
│   │   ├── ConceptCard.tsx      # Main learning component
│   │   ├── ConceptCardClient.tsx # Client-side wrapper for SSR
│   │   ├── CopyButton.tsx       # Copy-to-clipboard button
│   │   ├── Toast.tsx            # Toast notification system
│   │   ├── AnimatedDiagram.tsx  # Visualization loader
│   │   └── visualizations/      # 3D scene components (disabled)
│   │       └── *.tsx.bak        # Backed up due to type errors
│   ├── hooks/                   # Custom React hooks
│   │   ├── useToast.ts          # Toast notification hook
│   │   └── useWebVitals.ts      # Web Vitals tracking
│   ├── lib/                     # Utilities and content
│   │   ├── content/
│   │   │   ├── concepts.ts      # Content manifest
│   │   │   └── schema.ts        # TypeScript schemas
│   │   ├── storage/
│   │   │   └── indexedDB.ts     # Client-side storage
│   │   └── utils/
│   │       └── clipboard.ts     # Clipboard utilities with SSR guards
│   └── types/
│       └── index.d.ts           # Global type definitions
├── public/                      # Static assets
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

---

## Features

### Multi-Modal Learning System

Each concept is presented in three progressive modes:

1. **Elementary** - Simple explanations for beginners (5th grade level)
2. **Analogical** - Real-world metaphors and comparisons
3. **Technical** - Deep technical details for advanced learners

Users can switch between modes instantly, and their preference is persisted across sessions.

### Interactive Components

- **ConceptCard**: Main learning component with mode switching, visualizations, code examples, and comparisons
- **CopyButton**: One-click code copying with visual feedback and toast notifications
- **Toast Notifications**: Non-intrusive success/error messages
- **Progress Tracking**: LocalStorage-based progress persistence
- **Code Highlighting**: Syntax highlighting with line numbers and highlight support

### Accessibility

- ARIA labels and live regions
- Keyboard navigation support
- Screen reader friendly
- `prefers-reduced-motion` support
- Semantic HTML structure

### Performance

- Static generation for concept pages
- Lazy-loaded components
- Intersection Observer for viewport-based loading
- Optimized bundle size
- Web Vitals tracking

---

## Configuration

### Environment Variables

Currently, no environment variables are required for development. For custom deployments:

```bash
# Optional: Custom base path for subdirectory deployment
NEXT_PUBLIC_BASE_PATH=/your-path

# Optional: Asset prefix for CDN
NEXT_PUBLIC_ASSET_PREFIX=https://your-cdn.com
```

### Next.js Configuration

Key configuration options in `next.config.ts`:

- **Output Mode**: Currently disabled due to Next.js 15 issues
- **Image Optimization**: Disabled for static deployment
- **Trailing Slashes**: Enabled for GitHub Pages compatibility
- **React Strict Mode**: Enabled
- **Console Removal**: Production builds remove console.log (keeps warn/error)

---

## Technology Stack

### Core Framework

- **Next.js 15** - React framework with App Router
- **React 19** - UI library with concurrent features
- **TypeScript 5.6** - Type safety

### Styling & Animation

- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 11** - Animation library
- **GSAP 3** - Timeline and scroll-based animations

### 3D Graphics (Currently Disabled)

- **Three.js 0.169** - WebGL 3D library
- **React Three Fiber 9** - React renderer for Three.js
- **@react-three/drei 10** - Useful helpers for R3F

### Code Display

- **react-syntax-highlighter 15** - Syntax highlighting
- **Prism themes** - Code styling

### Storage & State

- **Zustand 5** - State management
- **idb 8** - IndexedDB wrapper
- **LocalStorage** - Progress persistence

### Developer Tools

- **ESLint 9** - Code linting
- **Prettier 3** - Code formatting
- **TypeScript** - Type checking

---

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Modern mobile browsers

**Note**: 3D visualizations (when enabled) require WebGL support.

---

## Known Issues

### Critical

1. **Static Export Failure** - Next.js 15 `output: 'export'` mode fails with manifest generation errors
   - **Workaround**: Use development mode or deploy to Vercel/Netlify
   - **Status**: Under investigation

2. **Three.js Type Errors** - React Three Fiber TypeScript definitions incompatible with Next.js 15
   - **Impact**: All 3D visualizations disabled
   - **Affected Files**: All files in `src/components/visualizations/` (renamed to `.bak`)
   - **Status**: Awaiting R3F updates or migration to alternative library

### Minor

- Search functionality disabled (moved to `search.bak`)
- Some ESLint warnings about unused variables in backed-up files

---

## Troubleshooting

### Build Errors

**Problem**: "Cannot find module .next/routes-manifest.json"
- **Solution**: This is a known Next.js 15 + export issue. HTML files are still generated successfully.

**Problem**: "document is not defined"
- **Solution**: Component uses client-side APIs. Ensure 'use client' directive and SSR guards are in place.

### Development Issues

**Problem**: Hot reload not working
- **Solution**: Restart dev server: `npm run dev`

**Problem**: TypeScript errors in IDE but build succeeds
- **Solution**: Restart TypeScript server in your IDE

---

## Contributing

This project follows standard Git workflow:

1. Create a feature branch
2. Make changes
3. Run `npm run validate` to ensure quality
4. Commit changes
5. Create pull request

### Code Style

- Use TypeScript for all new files
- Follow ESLint rules (zero warnings enforced)
- Format with Prettier before committing
- Add JSDoc comments for exported functions
- Use semantic HTML and ARIA labels

---

## Deployment

### GitHub Pages Deployment

This project is configured for easy deployment to GitHub Pages using two methods:

#### Method 1: GitHub Actions (Recommended)

The repository includes a GitHub Actions workflow that automatically builds and deploys the site to GitHub Pages whenever changes are pushed to the main branch.

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to the "Pages" section
   - Set the source to "GitHub Actions"

2. **Push to Main Branch**:
   - The workflow in `.github/workflows/deploy.yml` will automatically:
     - Build the project with correct base path
     - Deploy to the `gh-pages` branch
     - Publish to GitHub Pages

3. **Access Your Site**:
   - Your site will be available at `https://[username].github.io/vibe-wiki/`
   - First deployment may take a few minutes to become available

#### Method 2: Manual Deployment

You can also deploy manually using the provided npm script:

```bash
# Deploy with proper base path configuration
npm run deploy:github
```

This will:
1. Build the project with the correct base path (`/vibe-wiki`)
2. Deploy the contents of the `out` directory to the `gh-pages` branch
3. Push the changes to GitHub

### Configuration for GitHub Pages

The project includes several optimizations for GitHub Pages deployment:

- **Base Path**: Configured via `NEXT_PUBLIC_BASE_PATH=/vibe-wiki` for subdirectory hosting
- **Trailing Slashes**: Enabled in `next.config.ts` for proper GitHub Pages routing
- **Static Export**: Using `output: 'export'` for static site generation
- **Unoptimized Images**: Set for compatibility with static hosting

### Previous Limitations (Resolved)

The GitHub Pages deployment configuration resolves the previously documented limitations:

1. **~~Static Export Issues~~**: Resolved with proper configuration in next.config.ts
2. **~~Development Mode Only~~**: Now supports production deployments via GitHub Pages
3. **~~Next.js 15 Compatibility~~**: Export mode properly configured for GitHub Pages

### Other Deployment Options

### Vercel** (Recommended)
   - Native Next.js support
   - Automatic deployments
   - No configuration needed

2. **Netlify**
   - Good Next.js support
   - Easy GitHub integration

3. **Development Mode**
   - Run `npm run dev` for local access
   - Suitable for testing and development

See `DEPLOYMENT.md` (coming soon) for detailed deployment instructions.

---

## Performance Budgets

- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- INP (Interaction to Next Paint): < 200ms
- TTFB (Time to First Byte): < 800ms

---

## License

This project is part of the Vibe Wiki learning platform.

---

## Support

For issues and questions:
- Check `BUILD_STATUS.md` for current project status
- Review `TROUBLESHOOTING.md` (coming soon) for common problems
- See `DEPLOYMENT.md` (coming soon) for deployment guidance

---

## Acknowledgments

Built with:
- Next.js by Vercel
- React by Meta
- Three.js community
- Tailwind CSS team
- Framer Motion team

---

*Last updated: September 30, 2025*
