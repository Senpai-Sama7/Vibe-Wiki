# Synthesis Guide: Spec-Driven + Vibe-Driven Hybrid Framework

**Purpose:** This guide explains how Vibe-Wiki uses the hybrid framework to ship features fast while maintaining rock-solid quality.

---

## The Paradox We Solved

### Old Way: Pick One
- **Spec-driven teams:** Slow but stable. Lots of meetings. Motion without momentum.
- **Vibe-driven teams:** Fast but fragile. Ship quick, break things. Technical debt accumulates.

### New Way: Use Both
- **Specs:** Define non-negotiable contracts (types, performance, security, accessibility)
- **Vibes:** Freedom to explore, iterate, and ship within those boundaries
- **Result:** Fast iterations that don't break anything.

---

## The Three Layers

```
┌─────────────────────────────────────────────┐
│ VIBE LAYER                                  │
│ - AI agents generate code                   │
│ - Developers iterate on ideas              │
│ - Rapid prototyping and experimentation    │
└──────────────┬──────────────────────────────┘
               │
┌──────────────v──────────────────────────────┐
│ SYNTHESIS LAYER                             │
│ - Context engineering (assemble smart data) │
│ - Prompt optimization                       │
│ - Token budgeting                           │
└──────────────┬──────────────────────────────┘
               │
┌──────────────v──────────────────────────────┐
│ SPEC LAYER                                  │
│ - Immutable contracts (types, SLOs, etc)   │
│ - CI gates enforce compliance               │
│ - Hard validation, zero tolerance           │
└─────────────────────────────────────────────┘
```

---

## How It Works: Daily Workflow

### Step 1: Define Intent (5 minutes)
```
You: "Add dark mode toggle to Vibe Builder"
Team: "OK, that's feature-complete? Sure, let's do it."
```

### Step 2: Synthesize Context (automatic)
```
System extracts:
- What specs matter here?
  * ILearningMode contract (cosmetic change OK)
  * Performance SLO (dark mode shouldn't add >5kb)
  * Accessibility (dark mode must maintain WCAG AA)
  
- What examples exist?
  * Look for similar theme-switching code
  * Find CSS variable patterns
  * Fetch React hooks for preference detection
  
- What constraints?
  * Must ship in <15kb bundle delta
  * Must pass type-check without `any`
  * Must have 100% test coverage on critical paths
```

### Step 3: Generate with Agents (10-20 minutes)
```
CodeAgent writes:
  - React component for toggle
  - CSS variables for theme
  - localStorage persistence
  - prefers-color-scheme media query support

TestAgent writes:
  - Unit tests for toggle logic
  - Integration tests for theme switching
  - Accessibility tests (contrast ratios)

ReviewAgent checks:
  - No breaking changes to ILearningMode
  - No `any` types
  - No CSS bloat
  - Proper ARIA labels
```

### Step 4: Validate Against Specs (automatic in CI)
```
✅ TypeScript strict mode passes
✅ ESLint passes (no 'any' types)
✅ Tests pass (100% critical paths)
✅ Bundle delta: +3.2kb (under 5kb budget)
✅ Lighthouse accessibility: 95+
✅ No security violations
```

### Step 5: Measure & Learn (automatic)
```
Metrics captured:
- Performance delta: LCP +0.05s (acceptable)
- Bundle impact: +3.2kb gzipped
- Code patterns learned: prefer CSS variables over theme object
- Improvement: Next time, skip object approach
```

### Step 6: Commit & Ship (1 minute)
```bash
git commit -m "feat: dark mode toggle (spec-compliant, verified)"
git push
# CI runs automatically
# All checks pass → auto-merge if approved
```

---

## The Specs: What to Follow

### Type Safety Contract
**Rule:** No `any` types, ever.

```typescript
// ❌ WRONG
const handleThemeChange = (value: any) => { ... }

// ✅ RIGHT
type ThemeId = 'light' | 'dark';
const handleThemeChange = (value: ThemeId) => { ... }
```

**Why:** Types catch bugs at compile time, not production. Saves hours of debugging.

### Performance Contract
**Rule:** No feature exceeds bundle size budget.

```
Current budget: 5kb per feature
Dark mode: 3.2kb (✅)

If you add +8kb feature:
- CI fails
- Must optimize or defer
```

**Why:** LCP stays under 1.4s. Users see content fast.

### Accessibility Contract
**Rule:** WCAG AA compliance non-negotiable.

```typescript
// ❌ WRONG
<button onClick={...}>
  {isDark ? '🌙' : '☀️'}
</button>

// ✅ RIGHT
<button 
  onClick={...}
  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
>
  {isDark ? '🌙' : '☀️'}
</button>
```

**Why:** Everyone can use Vibe-Wiki, not just sighted keyboard users.

### Content Quality Contract
**Rule:** All three learning modes must exist.

```typescript
// ❌ WRONG
const content = {
  explanations: {
    elementary: "...",
    analogical: "..."
    // Missing technical!
  }
};

// ✅ RIGHT
const content = {
  explanations: {
    elementary: "...",
    analogical: "...",
    technical: "..."
  }
};
```

**Why:** Every user finds content at their level.

---

## What Specs DO NOT Prevent

✅ UI experiments (colors, layout, animations)  
✅ Content additions (new concepts, examples)  
✅ Feature experiments (A/B testing)  
✅ Refactoring for readability  
✅ Performance optimizations  

Specs only prevent:
❌ Breaking type contracts  
❌ Exceeding performance budgets  
❌ Violating accessibility standards  
❌ Security vulnerabilities  

---

## How CI Validates Specs

### `.github/workflows/spec-compliance.yml`
Runs on every PR and push:

```yaml
- Type check:      npm run type-check
- Lint:            npm run lint (no 'any' allowed)
- Tests:           npm test -- --coverage
- Build:           npm run build
- Bundle analysis: Check size delta
- Security scan:   npm audit
```

**If ANY check fails:** PR cannot merge. You fix the code, push again.

### Example CI Failure
```
❌ Type Check Failed
   src/components/ThemeToggle.tsx:15
   'value' is of type 'any', expected 'ThemeId'
   
Fix: Change parameter type from any to ThemeId
```

---

## Contracts as Documentation

Instead of:
> "Please make sure types are safe and performance doesn't regress"

We have:
```typescript
// CANONICAL CONTRACT (immutable)
interface ILearningMode {
  id: 'elementary' | 'analogical' | 'technical'; // Never changes
  complexity: 1 | 2 | 3;                         // Never changes
  // ...
}
```

**One source of truth.** No ambiguity.

---

## When You Violate a Spec (By Accident)

### Scenario 1: You added `any` type
```
CI says: ❌ ESLint: Unexpected 'any' type

You fix:
  - Add proper type definition
  - Push
  - ✅ CI passes
```

### Scenario 2: Your feature exceeds bundle budget
```
CI says: ❌ Bundle delta: +8kb (max 5kb)

You options:
  a) Optimize the code (remove unnecessary deps, tree-shake)
  b) Split into multiple PRs
  c) File ADR to increase budget (rare)
  
You pick (a), reduce to 4kb, push → ✅ CI passes
```

### Scenario 3: You're missing a learning mode
```
CI says: ❌ Content validation failed
         Missing explanation for mode: 'technical'

You fix:
  - Add technical explanation
  - Push
  - ✅ Validation passes
```

---

## When You INTENTIONALLY Want to Break a Spec

**Example:** You want to add dark mode, but it requires CSS variables library (+12kb)

### Process:
1. **File an ADR** (Architecture Decision Record)
   ```markdown
   Title: Add Tailwind Dark Mode with CSS Variables
   
   Problem: Dark mode requires CSS variable utilities
   Solution: Add tailwindcss-plugin (+12kb)
   
   Trade-off: +12kb bundle vs feature value
   
   Alternative: Write CSS variables manually (time cost)
   
   Decision: Accept +12kb, increase bundle SLO
   ```

2. **Get team approval** (usually async, <1 day)

3. **Update spec** (`.specs/performance.slo.json`)
   ```json
   {
     "per_route_overhead": {
       "max_delta": "20kb"  // Was 15kb, now 20kb
     }
   }
   ```

4. **Ship with confidence** (everyone knows the tradeoff)

---

## Tools at Your Fingertips

### Local Development
```bash
# Type check (fail fast on type errors)
npm run type-check

# Lint (enforce ESLint rules)
npm run lint

# Run tests
npm test

# VALIDATE EVERYTHING (before pushing)
npm run validate
```

### Git Hooks (Optional, But Recommended)
Add to `.git/hooks/pre-push`:
```bash
#!/bin/bash
echo "Running pre-push validation..."
npm run validate
if [ $? -ne 0 ]; then
  echo "❌ Validation failed. Fix and retry."
  exit 1
fi
echo "✅ All checks passed. Pushing..."
```

### CI Dashboard
Visit: `https://github.com/Senpai-Sama7/Vibe-Wiki/actions`

See:
- All spec compliance checks
- Performance trends
- Type coverage over time
- Test coverage timeline

---

## Real Example: Adding a Feature

### Feature: "Code copy button on all examples"

**Step 1: Intent**
```
"Add one-click copy button to code examples"
```

**Step 2: Context**
```
Specs affected:
- ICodeExample (add copyable field? No, keep simple)
- Performance SLO (button adds +0.5kb)
- Accessibility (button needs aria-label)
- Type safety (button state must be typed)
```

**Step 3: Implementation**
```typescript
interface CopyButtonProps {
  code: string;
  language: CodeLanguage;
}

function CopyButton({ code, language }: CopyButtonProps) {
  const [copied, setCopied] = useState<boolean>(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : `Copy ${language} code`}
      className="copy-button"
    >
      {copied ? '✓' : '📋'}
    </button>
  );
}
```

**Step 4: Tests**
```typescript
describe('CopyButton', () => {
  test('copies code to clipboard when clicked', async () => {
    const code = 'console.log("test");';
    render(<CopyButton code={code} language="javascript" />);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(code);
  });
  
  test('shows "Copied!" feedback after copy', async () => {
    render(<CopyButton code="test" language="javascript" />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('✓')).toBeInTheDocument();
    
    // After 2s, should revert
    await waitFor(() => {
      expect(screen.queryByText('✓')).not.toBeInTheDocument();
    }, { timeout: 2500 });
  });
});
```

**Step 5: Validate**
```bash
$ npm run validate
✅ TypeScript: Strict mode passed
✅ ESLint: No violations
✅ Tests: 94% coverage (✓ critical paths at 100%)
✅ Build: +0.4kb (under budget)
✅ Lighthouse: 96 (maintained)
✅ Accessibility: 95 (maintained)

🎉 Ready to ship!
```

**Step 6: Commit**
```bash
$ git add .
$ git commit -m "feat: add copy button to code examples

- One-click copy to clipboard
- 2s success feedback
- Accessible with aria-labels
- Full test coverage (100% critical paths)
- Bundle delta: +0.4kb (under 5kb budget)

Verified against specs:
✅ Type safety (no 'any')
✅ Performance SLO
✅ Accessibility (WCAG AA)
✅ Code quality (>95% type coverage)"

$ git push origin feature/copy-button
```

**Step 7: PR → CI → Auto-merge → Ship**
```
(CI runs automatically)
✅ All checks pass
(Code reviewer approves)
(PR auto-merges)
(Deployed to production in 2 minutes)
```

---

## The Flywheel Effect

As you ship more features, you:
1. Accumulate patterns in the codebase
2. Prompts improve (LearnAgent optimizes)
3. Code generation gets faster and more accurate
4. Specs become more refined
5. CI gates catch bugs earlier
6. Bundle size stabilizes
7. Performance metrics improve
8. Team velocity accelerates

**Result:** Month 1 = 2 features. Month 3 = 8 features. Month 6 = 20+ features.

All while **maintaining or improving** quality.

---

## FAQ

**Q: What if a spec doesn't make sense for my feature?**  
A: File an ADR. There's a process for everything. Specs exist to prevent chaos, not creativity.

**Q: Can I ignore the bundle size spec if feature is important?**  
A: No. But you can file an ADR to increase the budget. Be transparent about tradeoffs.

**Q: What if I don't have 100% test coverage?**  
A: Critical paths must have 100%. Other code must have 80%+. Test your happy path and edge cases.

**Q: Does this slow us down?**  
A: No. It *accelerates* us. Types catch bugs before code review. CI gates prevent rework. You ship faster, with fewer hotfixes.

---

## Next Steps

1. **Read:** `.specs/types.canonical.ts` (see the actual contracts)
2. **Understand:** `docs/SPEC_CONTRACTS.md` (deep dive on each contract)
3. **Try it:** Make a PR, watch CI validate your code
4. **Share:** Help the team understand the framework
5. **Iterate:** As you find what works, refine the specs

---

**Questions?** Open an issue. We're serious about this framework, but it's not dogma—it evolves with the team.

🚀 Ship fast. Break nothing. 🚀
