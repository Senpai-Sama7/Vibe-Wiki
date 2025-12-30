# Vibe-Wiki Specification Contracts

> **Date:** 2025-12-29 | **Version:** 1.0.0 | **Status:** ACTIVE

This document defines the immutable contracts that govern Vibe-Wiki's architecture. Breaking any of these contracts requires an **Architecture Decision Record (ADR)** and team approval.

---

## 1. Learning Mode Contract

**What it is:** The three pillars of Vibe-Wiki's pedagogy.

**Immutable guarantees:**
- IDs: `elementary`, `analogical`, `technical` (forever)
- Each has exactly one explanation in content
- Users can switch modes instantly without data loss
- All three modes must be available for every public content

**Current Implementation:** `.specs/types.canonical.ts`

```typescript
type LearningModeId = 'elementary' | 'analogical' | 'technical';

interface ILearningMode {
  id: LearningModeId;
  displayName: string;
  complexity: 1 | 2 | 3;
  // ... rest of contract
}
```

**What can change:**
- Display names, descriptions, colors (cosmetic)
- Order in UI
- Target audience descriptions

**What CANNOT change (without migration):**
- The three mode IDs
- The `complexity` scale (1-3 for elementary/analogical/technical)
- The requirement that each content has all three explanations

---

## 2. Content Contract

**What it is:** The data structure that represents any learnable concept on Vibe-Wiki.

**Immutable guarantees:**
- Every content has unique `id` (immutable once published)
- Explanations exist for ALL three learning modes
- Code examples are required (at least 1)
- Metadata tracks version and author

**Shape:**
```typescript
interface IContent {
  id: string;                                    // Unique, immutable
  title: string;
  description: string;
  explanations: Record<LearningModeId, string>; // Must have all 3
  codeExamples: ICodeExample[];                 // Min 1
  resources: IResource[];
  metadata: IContentMetadata;
  published: boolean;
}
```

**Validation:** Must pass `validateContent()` function before publishing

**Storage format:** Currently JSON in filesystem (see `src/lib/content/`)  
**Future:** Can migrate to database without breaking contract (interface stays same)

---

## 3. Performance Contract (SLOs)

**What it is:** Hard limits that the Vibe-Wiki platform must not exceed.

### Core Web Vitals (User Experience)
- **LCP** (Largest Contentful Paint): ≤1.4s (p99)
- **FID** (First Input Delay): ≤100ms (p99)
- **CLS** (Cumulative Layout Shift): ≤0.1 (no sudden shifts)
- **INP** (Interaction to Next Paint): ≤200ms (p99)

### Lighthouse Scores
- **Performance:** ≥95 (mobile, throttled)
- **Accessibility:** ≥95 (WCAG AA)
- **Best Practices:** ≥90
- **SEO:** ≥95

### Bundle Size
- Main bundle: <180kb gzipped (currently ~140kb)
- Total initial: <500kb gzipped (currently ~380kb)
- Per-route delta: <15kb (new pages shouldn't bloat significantly)

### Code Quality
- Type coverage: ≥95% (enforce via `npm run type-check`)
- Test coverage: ≥80% overall, 100% on critical paths
- No `any` types (ESLint enforced)
- Cyclomatic complexity: max 10 per function

**Measurement:** Automatically checked in CI via `.github/workflows/spec-compliance.yml`

**Failure consequence:** PR blocks if any SLO breached

---

## 4. Type Safety Contract

**What it is:** TypeScript strict mode is non-negotiable.

**Mandatory configs (tsconfig.json):**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

**Rules:**
- ✅ Branded types: `type UserId = string & { readonly __brand: 'UserId' }`
- ✅ Type guards: `function isLearningModeId(x): x is LearningModeId`
- ✅ Discriminated unions: `type Content = ElementaryContent | AnalogicalContent`
- ❌ No `any` (except in rare @ts-expect-error cases with comment)
- ❌ No `unknown` without exhaustive narrowing
- ❌ No `as` casts without type guards

**Check:** `npm run type-check` must return 0 errors

---

## 5. Testing Contract

**What it is:** Automated quality gates that prevent regressions.

**Coverage requirements:**
- **Overall:** ≥80% code coverage
- **Critical paths:** 100% (learning mode switching, content display, search)
- **UI components:** ≥70% (harder to test, but snapshots required)
- **Utilities:** ≥95% (pure functions should be trivial to test)

**Test framework:** Jest + React Testing Library

**Example tests:**
```typescript
// Content validation
test('validateContent rejects missing explanations', () => {
  const invalid = { id: 'test', title: 'Test', explanations: {} }; // Missing all modes
  const result = validateContent(invalid);
  expect(result.valid).toBe(false);
  expect(result.errors.length).toBeGreaterThan(0);
});

// Learning mode switching
test('user can switch between learning modes without data loss', () => {
  // Test implementation
});
```

**Check:** `npm test -- --coverage` must show ≥80%

---

## 6. Security Contract

**What it is:** Baseline security that we MUST enforce.

**Requirements:**
- ✅ **Zero critical CVEs** in production dependencies
- ✅ **Zero CodeQL findings** at critical or high level
- ✅ **No hardcoded secrets** (API keys, tokens)
- ✅ **Content Security Policy (CSP)** header enforced
- ✅ **No SQL injection** (we don't use SQL, but if we did: parameterized queries)
- ✅ **XSS prevention** (React escapes by default, but no `dangerouslySetInnerHTML`)
- ✅ **CORS configured** (if API added later)

**Checking:**
```bash
npm audit --production  # Must return exit code 0
```

**Secrets scanning:** GitHub secret scanning enabled on repo

---

## 7. Accessibility Contract

**What it is:** WCAG 2.1 AA compliance—not optional.

**Requirements:**
- ✅ **Color contrast:** ≥4.5:1 for normal text, ≥3:1 for large text
- ✅ **Keyboard navigation:** All interactive elements accessible via Tab
- ✅ **Focus indicators:** Visible, high-contrast focus states
- ✅ **ARIA labels:** All icons and unlabeled controls have aria-labels
- ✅ **Semantic HTML:** Proper heading hierarchy, alt text on images
- ✅ **No flashing:** No content flashes >3 times/second
- ✅ **Dark mode:** Full support (prefer-color-scheme media query)

**Check:** Lighthouse score ≥95 for Accessibility

---

## 8. Content Quality Contract

**What it is:** Content must meet minimum quality standards to be published.

**Before publishing, content must have:**
- ✅ All three explanations (elementary, analogical, technical) completed
- ✅ At least 2 runnable code examples
- ✅ At least 1 external resource
- ✅ Proper metadata (author, tags, prerequisites if applicable)
- ✅ Pass spellcheck and grammar check
- ✅ All links verified (CI checks for broken links)

**Metadata requirements:**
```typescript
metadata: {
  createdAt: "2025-12-29T...";   // ISO8601
  author: "username";              // GitHub username
  version: "1.0.0";                // Semver
  tags: ["html", "css", "..."];   // Lowercase, relevant
  prerequisites: ["content-id"]; // If this requires knowledge of other concepts
  estimatedMinutes: 15;            // Time to complete
}
```

---

## 9. API Response Contract

**What it is:** How the platform communicates with itself and (future) external clients.

**Success response:**
```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2025-12-29T00:00:00Z"
}
```

**Error response:**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CONTENT_ID",
    "message": "Content with ID 'xyz' not found",
    "details": { ... }
  },
  "timestamp": "2025-12-29T00:00:00Z"
}
```

**HTTP status codes:**
- 200: Success
- 400: Bad request (validation error)
- 404: Not found
- 500: Server error

**Timeout:** All API calls must complete within 500ms (p99)

---

## 10. Deployment Contract

**What it is:** Rules for getting code from developer machine to production.

**Before merging to main:**
- ✅ All CI checks pass (spec-compliance.yml)
- ✅ At least 1 code review approval
- ✅ No merge conflicts
- ✅ Branch is up-to-date with main

**Before deploying to production:**
- ✅ Run full test suite: `npm test`
- ✅ Build production bundle: `npm run build`
- ✅ Check performance: Lighthouse ≥95
- ✅ Smoke test on staging environment
- ✅ Performance baseline captured (monitoring)

**Rollback:** If production metrics degrade >5%, automatic rollback triggered

---

## How to Use These Contracts

### As a Developer
1. **Before coding:** Check if your change violates any contract
2. **While coding:** Let TypeScript and ESLint guide you
3. **Before pushing:** Run `npm run validate` (runs all checks)
4. **In PR:** CI automatically validates all contracts
5. **If CI fails:** Read the error, fix the code, push again

### As a Code Reviewer
1. Does the code satisfy all relevant contracts?
2. Are there any contract violations in the diff?
3. Does it maintain or improve the SLOs?
4. Does it introduce any new dependencies that violate security contract?

### As an Architect
1. **Quarterly:** Review SLO targets (are they still realistic?)
2. **If breaking change needed:** File an ADR
3. **Monitor:** Use spec_dashboard.ts to track compliance trends
4. **Plan migrations:** If contracts need to evolve

---

## Breaking a Contract

If you MUST break a contract:

1. **File an ADR** (Architecture Decision Record) explaining:
   - What contract is being broken
   - Why it's necessary
   - How we'll migrate existing data/code
   - What the new contract will be

2. **Get approval:** Lead architect + team consensus

3. **Plan migration:**
   - Version bump (major if breaking user-facing)
   - Deprecation warning period
   - Migration script/guide

4. **Communicate:** Update documentation, notify users

---

## Current Status

| Contract | Status | Notes |
|----------|--------|-------|
| Learning Modes | ✅ Stable | No changes expected |
| Content Structure | ✅ Stable | Validated with .specs/types.canonical.ts |
| Performance SLOs | 🟡 Partial | LCP currently 1.8s (target 1.4s), working to improve |
| Type Safety | ✅ Enforced | TypeScript strict mode enabled |
| Testing | 🟡 Improving | Currently ~60% coverage, target 80% |
| Security | ✅ Enforced | CodeQL checks active, npm audit passing |
| Accessibility | ✅ Enforced | WCAG AA via Lighthouse checks |
| Content Quality | ✅ Enforced | Manual review before publishing |
| API Response | ✅ Enforced | Validation in place |
| Deployment | ✅ Enforced | CI gates prevent bad deploys |

---

## Resources

- **Type Definitions:** `.specs/types.canonical.ts`
- **Performance SLOs:** `.specs/performance.slo.json`
- **CI/CD Gates:** `.github/workflows/spec-compliance.yml`
- **Test Configuration:** `jest.config.js`, `tsconfig.json`
- **Architecture Discussion:** See ARCHITECTURE.md

---

**Questions?** Open an issue or ask in the PR comments. We're serious about these contracts—they keep us shipping fast and safely. 🚀
