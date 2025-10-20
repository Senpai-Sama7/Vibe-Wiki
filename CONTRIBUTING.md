# Contributing to Vibe Wiki

Thank you for your interest in contributing to Vibe Wiki! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Testing Guidelines](#testing-guidelines)
6. [Commit Guidelines](#commit-guidelines)
7. [Pull Request Process](#pull-request-process)
8. [Adding New Concepts](#adding-new-concepts)
9. [Component Development](#component-development)
10. [Accessibility Requirements](#accessibility-requirements)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful and professional in all interactions.

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Setup

1. **Fork the repository**

```bash
# Click the "Fork" button on GitHub
```

2. **Clone your fork**

```bash
git clone https://github.com/YOUR_USERNAME/Vibe-Wiki.git
cd Vibe-Wiki
```

3. **Add upstream remote**

```bash
git remote add upstream https://github.com/Senpai-Sama7/Vibe-Wiki.git
```

4. **Install dependencies**

```bash
npm install
```

5. **Start development server**

```bash
npm run dev
```

Visit http://localhost:3000 to see the app.

## Development Workflow

### Creating a Feature Branch

```bash
# Update your fork
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name
```

### Making Changes

1. Make your changes in the feature branch
2. Test your changes locally
3. Commit with descriptive messages
4. Push to your fork
5. Open a pull request

### Keeping Your Fork Updated

```bash
git checkout main
git pull upstream main
git push origin main
```

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Avoid `any` types (use `unknown` if necessary)
- Define explicit return types for functions
- Use interface over type when possible
- Use readonly for immutable properties

```typescript
// ✅ Good
interface ConceptProps {
  readonly concept: ConceptDefinition;
  readonly onComplete?: (id: string) => void;
}

function formatTitle(title: string): string {
  return title.trim();
}

// ❌ Bad
function formatTitle(title: any) {
  return title.trim();
}
```

### React Components

- Use functional components with hooks
- Add TypeScript types for props
- Use meaningful component names
- Extract complex logic to custom hooks
- Add JSDoc comments for exported components

```typescript
/**
 * ConceptCard: Displays a learning concept with three modes
 * 
 * @param concept - The concept definition to display
 * @param initialMode - Starting learning mode
 */
export function ConceptCard({ 
  concept, 
  initialMode = 'elementary' 
}: ConceptCardProps) {
  // Component implementation
}
```

### File Organization

- One component per file
- Related components in same directory
- Index files for public exports
- Utilities in `lib/utils/`
- Types in `src/types/`

### Naming Conventions

- **Components**: PascalCase (`ConceptCard.tsx`)
- **Utilities**: camelCase (`helpers.ts`)
- **Hooks**: camelCase with `use` prefix (`useToast.ts`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_ITEMS`)
- **Types**: PascalCase (`ConceptDefinition`)

## Testing Guidelines

### Unit Tests

Test individual functions and utilities:

```typescript
// helpers.test.ts
import { formatBytes } from './helpers';

describe('formatBytes', () => {
  it('converts bytes to KB correctly', () => {
    expect(formatBytes(1024)).toBe('1 KB');
  });

  it('handles zero bytes', () => {
    expect(formatBytes(0)).toBe('0 Bytes');
  });
});
```

### Component Tests

Test React components with React Testing Library:

```typescript
// ConceptCard.test.tsx
import { render, screen } from '@testing-library/react';
import { ConceptCard } from './ConceptCard';
import { createMockConcept } from '@/lib/utils/testing';

describe('ConceptCard', () => {
  it('renders concept title', () => {
    const concept = createMockConcept({ title: 'Test Concept' });
    render(<ConceptCard concept={concept} />);
    expect(screen.getByText('Test Concept')).toBeInTheDocument();
  });
});
```

### E2E Tests

Test critical user flows with Playwright:

```typescript
// concept-navigation.spec.ts
import { test, expect } from '@playwright/test';

test('user can navigate to concept page', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Vibe Coding');
  await expect(page).toHaveURL(/\/concept\/vibe-coding/);
});
```

### Running Tests

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# E2E tests
npm run test:e2e

# Accessibility tests
npm run test:a11y
```

## Commit Guidelines

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(concept): add TypeScript advanced concept

- Add comprehensive TypeScript concept
- Include code examples and comparisons
- Add visualization component

Closes #123
```

```bash
fix(toast): prevent duplicate toast notifications

Fixed issue where multiple toasts could appear
simultaneously for the same event.
```

## Pull Request Process

### Before Submitting

1. **Ensure all tests pass**

```bash
npm run validate  # Runs type-check, lint, and tests
```

2. **Update documentation** if needed

3. **Add tests** for new features

4. **Check accessibility** compliance

5. **Verify build** succeeds

```bash
npm run build
```

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style
- [ ] Documentation updated
- [ ] Tests pass
- [ ] Build succeeds
- [ ] Accessibility verified
```

### Review Process

1. Automated checks run (lint, test, build)
2. Code review by maintainers
3. Address review feedback
4. Approval and merge

## Adding New Concepts

### Concept Structure

Create a new concept in `src/lib/content/concepts.ts`:

```typescript
const myNewConcept: ConceptDefinition = {
  id: 'unique-concept-id',
  slug: 'url-friendly-slug',
  title: 'Concept Title',
  subtitle: 'Brief subtitle',
  category: 'patterns', // or other category
  
  explanations: {
    elementary: 'Simple 5th-grade explanation...',
    analogical: 'Real-world metaphor...',
    technical: 'Technical deep-dive...',
  },
  
  visualization: {
    type: 'diagram-flow',
    component: 'MyVisualizationComponent',
    animation: {
      duration: 2,
      easing: 'ease-in-out',
    },
    fallback: 'Text description of visualization',
  },
  
  codeExamples: [
    {
      language: 'typescript',
      code: `// Your code example here`,
      title: 'Example Title',
      highlightLines: [1, 2, 3],
    },
  ],
  
  comparison: [
    {
      name: 'Approach A',
      pros: ['Benefit 1', 'Benefit 2'],
      cons: ['Drawback 1'],
      useCase: 'When to use this',
      performance: 'Performance notes',
    },
  ],
  
  relatedConcepts: ['related-slug-1', 'related-slug-2'],
  prerequisites: ['prereq-slug'],
  difficultyLevel: 3, // 1-5
  estimatedTime: 15, // minutes
  tags: ['tag1', 'tag2'],
  metaDescription: 'SEO meta description',
  lastUpdated: new Date().toISOString(),
};
```

### Concept Guidelines

1. **Explanations**
   - Elementary: Use simple language, no jargon
   - Analogical: Real-world comparisons
   - Technical: Precise, detailed, with sources

2. **Code Examples**
   - Keep examples concise
   - Include comments
   - Show practical usage
   - Highlight key lines

3. **Visualizations**
   - Always provide text fallback
   - Ensure accessibility
   - Test on low-end devices

## Component Development

### Component Checklist

- [ ] TypeScript types defined
- [ ] Props interface documented
- [ ] Accessibility attributes added
- [ ] Keyboard navigation supported
- [ ] Responsive design implemented
- [ ] Loading states handled
- [ ] Error states handled
- [ ] Tests written

### Example Component

```typescript
'use client';

import { useState } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  /**
   * Button text content
   */
  children: React.ReactNode;
  
  /**
   * Visual style variant
   */
  variant?: 'primary' | 'secondary';
  
  /**
   * Loading state
   */
  loading?: boolean;
  
  /**
   * Click handler
   */
  onClick?: () => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Button: Accessible button component
 * 
 * Features:
 * - Multiple variants
 * - Loading state
 * - Keyboard accessible
 * - ARIA labels
 */
export function Button({
  children,
  variant = 'primary',
  loading = false,
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={clsx(
        'px-4 py-2 rounded font-medium',
        'focus:outline-none focus:ring-2',
        variant === 'primary' && 'bg-blue-600 text-white',
        variant === 'secondary' && 'bg-gray-200 text-gray-900',
        loading && 'opacity-50 cursor-not-allowed',
        className
      )}
      aria-busy={loading}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}
```

## Accessibility Requirements

### Required Attributes

- Semantic HTML elements
- ARIA labels for interactive elements
- Alt text for images
- Focus indicators
- Keyboard navigation
- Screen reader support

### Testing Accessibility

```bash
# Run accessibility tests
npm run test:a11y

# Manual testing
- Test with keyboard only
- Test with screen reader
- Test with high contrast mode
- Test with zoom at 200%
```

### Accessibility Checklist

- [ ] Semantic HTML used
- [ ] ARIA labels added where needed
- [ ] Keyboard navigation works
- [ ] Focus visible on all interactive elements
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader tested
- [ ] Alternative text for images
- [ ] Forms have labels
- [ ] Error messages are accessible
- [ ] Dynamic content announced

## Getting Help

- **Issues**: Check existing issues or create new one
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Read ARCHITECTURE.md and README.md

## Recognition

Contributors will be recognized in:

- GitHub contributors list
- Release notes
- CONTRIBUTORS.md file

## License

By contributing, you agree that your contributions will be licensed under the project's license.

---

Thank you for contributing to Vibe Wiki! 🎉
