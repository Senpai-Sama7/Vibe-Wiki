# Vibe Wiki Test Plan

## Scope
This plan verifies that the statically exported Next.js site is operational on GitHub Pages and that critical user journeys (search, concept navigation, resources, and visualization toggles) work end-to-end.

### In-Scope
- Home page hero CTAs and navigation.
- Advanced Search page results and empty state.
- Concept detail page rendering and visualization toggle.
- Resource links (HTML, PDF, markdown, and text assets) resolve without 404s.
- Accessibility smoke coverage (visible focusable controls).

### Out-of-Scope (Requires Dedicated Systems)
- Third-party API or AI model integrations not present in the current repo.
- Non-UI infrastructure (e.g., GitHub Pages configuration, DNS, analytics pipelines).

## Automated Test Suite (Playwright)
### Harness
- **Config**: `playwright.config.ts`
- **Tests**: `tests/e2e/core-flows.spec.ts`
- **Command**: `npm run test:e2e`

### Coverage Summary
1. **Home page smoke**: verifies hero + CTA visibility and resource card rendering.
2. **Resource validation**: confirms that linked documents respond with HTTP 200.
3. **Advanced Search**: confirms result rendering for valid queries and empty-state feedback.
4. **Concept visualization toggle**: validates visualization fallback content after toggling.

## Manual Test Checklist (UI Coverage)
> Use this checklist to manually verify interactive UI elements across the site.

### Home Page
- [ ] Hero CTA buttons respond to hover/focus and navigate.
- [ ] Global navigation links scroll to sections as expected.
- [ ] Resource cards open the correct files in new tabs.
- [ ] Performance monitor panel remains visible and updates values.

### Search Page
- [ ] Search input accepts typing and shows suggestions/results.
- [ ] Arrow keys and Enter select results.
- [ ] Empty-state message appears for no matches.

### Concept Page
- [ ] Learning mode tabs switch content.
- [ ] Visualization toggle shows fallback preview and hides without layout break.
- [ ] Related concepts list navigates to the correct concept.

### Accessibility
- [ ] Tab key moves through major interactive elements in order.
- [ ] Focus rings are visible on buttons/links.

## Reporting
- Attach Playwright HTML report (`playwright-report/`) to CI artifacts.
- Save screenshots for any regression or visual defect found during manual QA.
