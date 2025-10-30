# 🌊 Vibe Wiki

> **The Future of Learning Web Development**

Transform your web development journey with **Vibe Wiki** — an enterprise-grade, multi-modal learning platform that adapts to your skill level. Whether you're a complete beginner or a seasoned developer, Vibe Wiki teaches complex concepts through three progressive learning modes, powered by cutting-edge React 19 and Next.js 15 technology.

## ✨ Why Choose Vibe Wiki?

🎯 **Three Learning Modes in One Platform**
- **Elementary Mode**: Simple explanations anyone can understand
- **Analogical Mode**: Real-world metaphors that make concepts stick
- **Technical Mode**: Deep technical insights for advanced learners

🚀 **Production-Ready Features**
- ✅ Built with Next.js 15 + React 19 + TypeScript
- ✅ Progressive Web App (PWA) - works offline
- ✅ Lightning-fast static generation
- ✅ Dark mode support
- ✅ Zero security vulnerabilities (CodeQL verified)
- ✅ WCAG accessibility compliant
- ✅ Mobile-first responsive design

💡 **Smart Learning Experience**
- Interactive code examples with syntax highlighting
- One-click code copying with toast feedback
- Progress tracking across sessions
- Smooth animations with Framer Motion
- Real-time concept switching

---

## 📖 User Manual

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Quick Start

Get up and running in under 2 minutes:

```bash
# Clone the repository
git clone https://github.com/Senpai-Sama7/Vibe-Wiki.git
cd Vibe-Wiki

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Commands

#### Development
```bash
npm run dev          # Start development server
npm run lint         # Check code quality
npm run lint:fix     # Auto-fix linting issues
npm run type-check   # TypeScript validation
```

#### Production
```bash
npm run build        # Build for production
npm start            # Start production server
npm run deploy:github # Deploy to GitHub Pages
```

#### Quality Assurance
```bash
npm run format       # Format code with Prettier
npm run validate     # Run all checks (type + lint + test)
npm run test         # Run test suite
```

### Using the Application

1. **Browse Concepts**: Navigate through the homepage to see available web development concepts
2. **Switch Learning Modes**: Click the mode buttons (Elementary/Analogical/Technical) to change explanation depth
3. **Copy Code**: Click the copy button on any code example to copy it to your clipboard
4. **Track Progress**: Your learning progress is automatically saved in your browser
5. **Go Offline**: Install as a PWA for offline access

### Deployment

**GitHub Pages** (Recommended)
```bash
npm run deploy:github
```

**Other Platforms**:
- **Vercel**: Push to GitHub, connect repository
- **Netlify**: Connect GitHub repo, auto-deploy
- **Cloudflare Pages**: Connect repo, configure build

### Project Structure

```
Vibe-Wiki/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities and content
│   └── types/           # TypeScript definitions
├── public/              # Static assets
└── package.json         # Dependencies
```

### Browser Support

- ✅ Chrome/Edge (last 2 versions)
- ✅ Firefox (last 2 versions)
- ✅ Safari (last 2 versions)
- ✅ Modern mobile browsers

### Known Limitations

- **3D Visualizations**: Temporarily disabled due to React Three Fiber compatibility with Next.js 15. Fallback text descriptions are provided and will be re-enabled in a future update.

---

## 🎯 Prompt Cheatsheet for Vibe Coders

This cheatsheet provides a quick reference for the **PROMPTMETHEUS Implementation**, designed to help "vibe coders" maintain their flow and focus while interacting with advanced language models for development tasks. It distills the core commands and their intent for rapid recall.

### Master System Protocol - Activation Command Structure

Use this structure to initiate commands:

```
//{command}-{level}: {directive}
```

- **command**: Primary action (e.g., proceed, analyze, real, test, improve, clean, run, final)
- **level**: Granularity/control (a = ultra-short, b = balanced, c = full, d = expert+)
- **directive**: Task-specific instructions

---

### 🚀 PROCEED Framework - Continue Work & Generate Next Steps

#### `//proceed-a`: Ultra-short (drop-in)
**When to use**: Rapid iteration, maintaining momentum.

**Core intent**: "Act as a senior pair-programmer. Take the most logical next step. Output (1) brief rationale (≤5 bullets), (2) patch or commands, (3) quick tests/checks, (4) risks & next steps. Prefer small, reversible changes. If context is missing, list top 3 questions or state assumptions."

#### `//proceed-b`: Compact prompt (balanced)
**When to use**: Strategic progress with quality assurance.

**Core intent**: "Proceed with the next best engineering move. Ground decisions in: Code semantics, architecture, algorithmic correctness. Deliverables (in order): (1) Summary of intent, (2) Proposed change, (3) Minimal tests/checks, (4) Perf/complexity notes, (5) Follow-ups. Keep explanations concise."

#### `//proceed-c`: Full, structured prompt (most control)
**When to use**: Complex systems with multiple dependencies and strict quality.

**Core intent**: "Role: Senior pair-programmer for vibe coding. Goal: Execute the most logical next step. Reasoning (internal): Multi-pass analysis over semantics, dependency graph, architecture, algorithmic soundness. Output (external, in order): (1) Plan (≤5 bullets), (2) Patch / Commands, (3) Validation, (4) Quality notes, (5) Follow-ups. Prefer small, reversible commits. Ask up to 3 targeted questions if critical detail is missing."

---

### 📊 ANALYZE Framework - Analysis, Evaluation & Audits

#### `//analyze-a`: Ultra-short (drop-in)
**When to use**: Low-level code audit, quick overview.

**Core intent**: "Act as a principal engineer performing a low-level code audit of the entire repo. Output (in order): (1) Executive summary (5–8 bullets), (2) Findings table, (3) Detailed findings, (4) Cross-cutting issues, (5) Actionable next steps. Prefer specific, testable recommendations."

#### `//analyze-b`: Compact (balanced)
**When to use**: Comprehensive audit with structured findings.

**Core intent**: "Perform a deep, low-level audit across the entire codebase. Focus on correctness, security, reliability, performance, and dependencies. Deliverables (in order): (1) Repo map, (2) Findings table with severity/likelihood, (3) Detailed write-ups with evidence, (4) Cross-cutting review, (5) Prioritized plan. Be specific—cite exact path:file:line."

#### `//analyze-c`: Full (most control)
**When to use**: Mission-critical systems requiring comprehensive security and quality analysis.

**Core intent**: "Role: Principal engineer & security reviewer conducting deep audit. Goal: Evidence-backed evaluation with concrete fixes. Output: (1) Executive summary with system overview, (2) Repository map with critical data paths, (3) Findings table sorted by severity, (4) Detailed findings with exploitation scenarios, (5) Cross-cutting security/concurrency/reliability review, (6) Prioritized action plan. Rules: Cite exact files:lines, prefer small reversible changes, no chain-of-thought dumps."

---

### ✅ REAL Framework - Production-Ready, Verifiable Code

#### `//real-a`: Ultra-short (drop-in)
**When to use**: Generate fully working, production-ready solutions.

**Core intent**: "Act as a staff-level engineer. Produce a fully working, production-ready solution—no mocks or placeholders. Output only: (1) Executive summary (≤5 bullets), (2) Exact artifacts to run, (3) Verification: reproducible steps + expected signals, (4) Measured results or UNVERIFIED with missing info, (5) Follow-ups. Fail closed if not truly verifiable."

#### `//real-b`: Compact (balanced)
**When to use**: Production delivery with FAANG-level standards.

**Core intent**: "Deliver real, working, production-grade implementation. Must meet: reliability (graceful startup/shutdown), security (no secrets, pinned deps), performance (baseline load test), observability (structured logs/metrics), operations (Docker, K8s manifests), testing (unit/integration/e2e). Absolutely no mocks/stubs/fake data. Output: (1) System overview, (2) Runnable artifacts, (3) Validation scripts, (4) Measured results, (5) Risk hardening notes."

#### `//real-c`: Full (most control)
**When to use**: Enterprise-grade system delivery with complete operational readiness.

**Core intent**: "Role: Staff/Principal engineer delivering fully operational, production-ready system. Must satisfy: deterministic build, stable APIs, security (secret management, zero critical issues), reliability (resilience patterns), performance (load test with numbers), observability (metrics/tracing ready), data (backward-compatible migrations), testing (real components), operations (deployment manifests), docs (runbook with SLOs). Forbidden: TODO, mock, stub, placeholder, demo. Output: (1) Executive summary, (2) Repo map, (3) Getting started commands, (4) Validation with smoke/e2e/perf tests, (5) Actual results or UNVERIFIED, (6) Hardening roadmap."

---

### 🧪 TEST Framework - Run Tests, Coverage & Quality Reports

#### `//test-a`: Ultra-short (drop-in)
**When to use**: Execute full test suite with coverage, automated quality report.

**Core intent**: "Act as a CI quality runner. Execute full test suite with coverage. Output (in order): (1) How to run, (2) Results summary, (3) Coverage, (4) Flakiness & slow tests, (5) Quality gate (PASS/FAIL), (6) Artifacts paths. Mark UNVERIFIED if unable to run."

#### `//test-b`: Compact (balanced)
**When to use**: CI-ready testing with comprehensive quality reporting.

**Core intent**: "Run project tests with coverage for CI status checks. Scope: unit/integration/e2e execution, coverage by file/module, flakiness detection with retries, slowest tests identification, quality gate evaluation. Output: (1) Setup commands, (2) Artifacts (JUnit XML, coverage reports, quality JSON), (3) Human summary with badges/tables, (4) Quality gate decision, (5) Next actions for low-coverage/high-risk files."

#### `//test-c`: Full (most control)
**When to use**: Release-quality testing with full automation and audit trail.

**Core intent**: "Role: Release Quality Engineer automating test execution and CI reporting. Goal: Actionable, auditable results with quality gates. Detect stack, run tests with flake detection, generate coverage with delta analysis, capture timings, evaluate thresholds. Output: (1) How to run locally/CI with example snippets, (2) Results summary with detailed coverage tables, (3) Artifacts paths, (4) Quality gate decision with exact thresholds, (5) Targeted test suggestions for low-coverage areas. Never fabricate metrics—use UNVERIFIED with prerequisites."

---

### ✨ IMPROVE Framework - Refactoring, Optimization & Quality

#### `//improve-a`: Ultra-short (drop-in)
**When to use**: Systematically improve code quality, performance, maintainability.

**Core intent**: "Act as a staff engineer. Systematically improve code quality, performance, and maintainability. Output (in order): (1) Executive summary (≤6 bullets), (2) Hotspot map, (3) Refactors & fixes (diffs/codemods), (4) Performance improvements (before/after), (5) Quality upgrades, (6) Risk & rollout. Prefer small, reversible changes."

#### `//improve-b`: Compact (balanced)
**When to use**: Systematic quality improvements with measurable outcomes.

**Core intent**: "Apply improvements to code quality, performance, and maintainability. Focus: dead code/duplication, performance hotspots, module boundaries, testing gaps. Method: static analysis, dependency graphs, targeted benchmarks. Output: (1) Baseline metrics tables, (2) Findings table with impact/effort, (3) Concrete changes (diffs/codemods), (4) Performance results with before/after, (5) Quality upgrades with coverage delta, (6) Guardrails (CI checks, pre-commit hooks), (7) Roadmap by priority."

#### `//improve-c`: Full (most control)
**When to use**: Enterprise-scale systematic improvement with comprehensive guardrails.

**Core intent**: "Role: Principal engineer leading improvement program. Goal: Measurable, reversible upgrades with guardrails. Method: Build module/dependency graph, run static checks, design safe refactors, profile critical paths, establish CI gates. Output: (1) Executive summary with health snapshot, (2) Baseline/target metrics tables, (3) Hotspot analysis ranked by leverage, (4) Refactor catalog with evidence/verification, (5) Performance improvements with benchmarks, (6) Maintainability upgrades, (7) Guardrails tooling with CI snippets, (8) Roadmap with dependencies. Provide measured before/after numbers—unmeasured items marked UNVERIFIED."

---

### 🧹 CLEAN Framework - Safe, Non-Destructive Cleanup

#### `//clean-a`: Ultra-short (drop-in)
**When to use**: Safe, non-destructive repository cleanup and light restructure.

**Core intent**: "Act as a staff engineer. Perform a safe, non-destructive repo cleanup. Do not delete, move candidates to .trash//. Generate manifest.json and restore.sh. Targets: Duplicates, superseded versions, build artifacts, empty folders. Deliverables: (1) Plan, (2) Dry-run report, (3) Commands/scripts to move, (4) Refactors, (5) Docs updated, (6) Verification, (7) Summary."

#### `//clean-b`: Compact (balanced)
**When to use**: Systematic cleanup with automated detection and refactoring.

**Core intent**: "Systematically clean, de-duplicate, and restructure repo without destroying data. Move candidates to timestamped .trash folder, update references and docs. Target: duplicates (by sha256), superseded versions, stale/unreferenced files, generated artifacts, empty dirs. Method: dry-run detection, safe moves with manifest/restore, language-aware codemods for import fixes. Output: (1) Dry-run report, (2) Scripts/commands, (3) Codemod diffs, (4) Verification (build/tests), (5) Summary with next steps."

#### `//clean-c`: Full (most control)
**When to use**: Enterprise repo cleanup with comprehensive safety measures and tooling.

**Core intent**: "Role: Principal engineer as Repo Janitor for safe cleanup. Goal: Consolidate duplicates, quarantine stale files, refactor imports—no data loss. Safety: Never delete, move to .trash with manifest.json/restore.sh, keep build/tests green. Detection: duplicates by hash, superseded versions, artifacts/noise, unreferenced code, empty dirs. Output: (1) Execution plan with thresholds, (2) Dry-run report table, (3) Automation scripts with inline code, (4) Language-specific codemods, (5) Docs/indices updates, (6) Verification commands, (7) Guardrails (pre-commit hooks), (8) Summary with rollback usage."

---

### 🏃 RUN Framework - Feature Verification & Repair Loops

#### `//run-a`: Ultra-short (drop-in)
**When to use**: Create, run, and verify a feature checklist.

**Core intent**: "Act as a release QA operator. Create a real feature checklist, then run and verify every item. Attempt fixes up to 3 times. Output (in order): (1) How to run, (2) Checklist file (FEATURES_CHECKLIST.txt), (3) Execution log, (4) Fixes applied, (5) Stuck items. Mark UNVERIFIED if cannot execute."

#### `//run-b`: Compact (balanced)
**When to use**: Systematic feature verification with fix/retry loops.

**Core intent**: "Execute feature inventory checklist with run/verify/fix loop. Phase A: Derive features from code/docs, write FEATURES_CHECKLIST.txt. Phase B: Bring system up, run real commands, capture evidence for each item. Phase C: Fix loop (max 3 attempts per failing item). Output: (1) Runbook snippet, (2) FEATURES_CHECKLIST.txt, (3) RESULTS.md table with evidence, (4) Patches/commands applied, (5) Stuck Items Report with diagnosis, (6) Next steps to reach 100% green."

#### `//run-c`: Full (most control)
**When to use**: Release-grade feature verification with comprehensive evidence collection.

**Core intent**: "Role: Release Quality Lead executing feature checklist verification/repair cycle. Goal: Enumerate all features, create persistent checklist, run end-to-end, fix with up to 4 attempts per item. Produce: FEATURES_CHECKLIST.txt + features.json, RESULTS.md status table, evidence files, fix patches. Process: Discovery → Checklist creation → Execution → Repair loop → Stop conditions. Evidence must be observable (exit codes, log patterns, HTTP status, metrics). No fabricated evidence—use UNVERIFIED with prerequisites."

---

### 🏁 FINAL Framework - Final Verification & Truth-First Delivery

#### `//final-a`: Ultra-short (drop-in)
**When to use**: Final verification, hallucination checks, truth-first delivery.

**Core intent**: "Act as a truth-first engineer. Hard rules: Never invent results (mark UNVERIFIED), no speculative language. If prereqs missing, ask ≤3 questions then stop. Output (in order): (1) Prereqs, (2) Commands to run, (3) Evidence pack, (4) Claim → Proof table (Feature, Claim, How to check, Status VERIFIED/UNVERIFIED, Evidence pointer), (5) Fixes applied, (6) Stuck items. No fabricated logs/numbers."

#### `//final-b`: Compact (balanced)
**When to use**: Verification-first delivery with strict evidence requirements.

**Core intent**: "Be verification-first, no-BS engineer. Policy: Claims VERIFIED only with observable evidence (command output, HTTP status/payload, log lines with timestamps, file checksums). Max 4 fix attempts per failing item. Output: (1) Setup runbook, (2) Reality checklist, (3) Execution results table, (4) Evidence pack with raw outputs, (5) Fixes with re-run proof, (6) Stuck report with root causes/solutions. Ban speculative language—use exact numbers, paths, timestamps."

#### `//final-c`: Full (most control)
**When to use**: Mission-critical final verification with forensic-level evidence standards.

**Core intent**: "Role: Principal Reality Auditor. Truth model: Any statement without runnable proof = UNVERIFIED. Process: (1) Collect prerequisites, (2) Enumerate features from code/routes/CLI, (3) Form falsifiable checks, (4) Run and capture evidence, (5) Fix loop (max 4 attempts), (6) Diagnose failures. Output: (1) Prerequisites checklist, (2) How to run with bootstrap commands, (3) Artifacts (REALITY_CHECKLIST.txt, features.json, evidence files), (4) Verification matrix table, (5) Fix log with attempts, (6) Stuck items with hypotheses/solutions, (7) Readiness verdict. Hard rules: No fabricated outputs ever, mark UNVERIFIED with minimal verification requirements."

---

## 📚 Additional Resources

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical architecture and design patterns
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines
- **[BUILD_STATUS.md](./BUILD_STATUS.md)** - Current build status and features

---

## 🤝 Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Run `npm run validate` before committing
4. Submit a pull request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

---

## 🔒 Security

- ✅ Zero CodeQL vulnerabilities
- ✅ No known dependency vulnerabilities
- ✅ Static export (no server-side vulnerabilities)
- ✅ Content Security Policy ready

Report security issues via GitHub Security Advisories.

---

## 📄 License

This project is part of the Vibe Wiki learning platform.

---

*Built with ❤️ using Next.js, React, TypeScript, and modern web technologies.*

*Last updated: October 30, 2025*
