'use client';

import { ConceptCard } from '@/components/ConceptCard';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt';
import { WebVitalsDashboard } from '@/components/WebVitalsDashboard';
import { contentManifest } from '@/lib/content/concepts';
import type { ConceptDefinition } from '@/lib/content/schema';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';

const HeroEnhanced = dynamic(() => import('@/components/HeroEnhanced'), {
  ssr: false,
  loading: () => (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold sm:text-6xl lg:text-7xl">Loading...</div>
          </div>
        </div>
      </div>
    </section>
  ),
});

/**
 * HomePage: Main landing page with infinite scroll concept cards
 *
 * Features:
 * - Hero section with animated introduction
 * - Infinite scroll with virtualization
 * - Progressive loading of concept cards
 * - Search and filtering capabilities
 * - Accessibility-first design
 */
export default function HomePage() {
  const [displayedConcepts, setDisplayedConcepts] = useState<ConceptDefinition[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const conceptsPerLoad = 6;
  const allConcepts = contentManifest.concepts;

  const PLATFORM_PILLARS = [
    {
      title: 'Multi-Modal Learning',
      description: 'Every concept renders as a triad: 5th-grade explanation, metaphor, and systems-level animation.'
    },
    {
      title: 'Static-First Delivery',
      description: 'Next.js static export with client-side hydration keeps GitHub Pages deployments blazing fast.'
    },
    {
      title: 'Production Discipline',
      description: 'Type-safe content pipelines, accessibility guardrails, and automated performance budgets.'
    },
    {
      title: 'AI-Native Workflow',
      description: 'Designed for vibe-led builders pairing with AI copilots while retaining human-in-the-loop rigor.'
    }
  ] as const;

  const STACK_MATRIX = [
    {
      projectType: 'Static Landing Page',
      stack: 'Astro · Hugo · Headless CMS',
      rationale: 'Pre-rendered routes, CDN-first performance, tiny bundles.',
      deployment: 'Vercel · Netlify · Cloudflare Pages'
    },
    {
      projectType: 'Marketing Site / Blog',
      stack: 'Next.js SSG + Contentful / Sanity',
      rationale: 'Webhook-driven static rebuilds keep content fresh and secure.',
      deployment: 'Vercel · Netlify'
    },
    {
      projectType: 'Interactive Web App',
      stack: 'MERN Stack (Mongo, Express, React, Node)',
      rationale: 'Single language across stack, real-time-friendly event loop.',
      deployment: 'Railway · Render · Fly.io'
    },
    {
      projectType: 'E-commerce Platform',
      stack: 'PERN Stack (Postgres, Express, React, Node)',
      rationale: 'ACID-compliant data integrity with modern frontend ergonomics.',
      deployment: 'AWS · GCP'
    },
    {
      projectType: 'SaaS Platform',
      stack: 'Next.js · tRPC · Prisma · PostgreSQL',
      rationale: 'Type-safe APIs and hybrid rendering for personalization.',
      deployment: 'Vercel · Railway'
    },
    {
      projectType: 'Real-time Collaboration',
      stack: 'React · Socket.io · Redis · Node',
      rationale: 'Non-blocking I/O with in-memory pub/sub messaging.',
      deployment: 'Heroku · AWS'
    },
    {
      projectType: 'Mobile-First PWA',
      stack: 'React · Capacitor · Supabase',
      rationale: 'Native-feel UX with instant sync features.',
      deployment: 'Vercel · Supabase'
    },
    {
      projectType: 'AI / ML Application',
      stack: 'FastAPI · React · PostgreSQL · Python tooling',
      rationale: 'Python ML stack with async APIs and rich UI.',
      deployment: 'AWS · GCP'
    }
  ] as const;

  const TOOLKIT_SECTIONS = [
    {
      title: 'Frontend Anchors',
      items: [
        'React 19 concurrent rendering',
        'Next.js App Router · static export',
        'Tailwind or CSS variables for theming',
        'Framer Motion choreography'
      ]
    },
    {
      title: 'Interaction Stack',
      items: [
        'Three.js instanced meshes for 3D',
        'GSAP ScrollTrigger timelines',
        'Intersection Observer v2 virtualization',
        'Reduced motion fallbacks via prefers-reduced-motion'
      ]
    },
    {
      title: 'Reliability & Trust',
      items: [
        'Lighthouse CI thresholds (LCP < 2.5s)',
        'Playwright smoke flows',
        'CSP, SRI, and security headers baked into static output',
        'Service worker cache strategies'
      ]
    },
    {
      title: 'Content Ops',
      items: [
        'Type-safe content schemas',
        'Docs-as-code MDX pipeline',
        'Automated accessibility linting',
        'i18n-ready string catalogs'
      ]
    }
  ] as const;

  const EXPERIENCE_BLUEPRINT = [
    {
      title: '1. Spotlight Discovery',
      description: 'Vertical infinite scroll surfaces concepts via TikTok-style spotlight panels that mix text, animation, and code snippets.'
    },
    {
      title: '2. Compare & Contrast',
      description: 'Hover tooltips and responsive comparison tables make Jamstack vs SSR vs ISR trade-offs intuitive.'
    },
    {
      title: '3. Guided Practice',
      description: 'Interactive widgets let learners tweak parameters with instant visual feedback.'
    },
    {
      title: '4. Retain & Apply',
      description: 'Progress tracking stores mastery states locally so builders pick up exactly where they left off—online or offline.'
    }
  ] as const;

  const FAQ_ITEMS = [
    {
      question: 'Can I deploy Vibe Wiki to GitHub Pages without servers?',
      answer: 'Yes. The entire platform is exported as static HTML, CSS, and JS. Client-side hydration powers interactivity while the service worker handles caching and offline access.'
    },
    {
      question: 'How does the three-mode learning toggle work?',
      answer: 'Each concept card bundles three explanations keyed to different cognitive levels. Learners switch modes instantly; the selected preference persists locally.'
    },
    {
      question: 'Is the visual layer accessible?',
      answer: 'Every animation includes semantic text equivalents, ARIA labeling, and motion safety controls that respect prefers-reduced-motion settings.'
    },
    {
      question: 'What powers the 3D scenes?',
      answer: 'Three.js drives WebGL visuals with graceful fallbacks to SVG illustrations if the browser lacks GPU support.'
    }
  ] as const;

  // Filter concepts based on search and category
  const filteredConcepts = allConcepts.filter(concept => {
    const matchesSearch = filterQuery === '' ||
      concept.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      concept.tags.some(tag => tag.toLowerCase().includes(filterQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || concept.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Load initial concepts
  useEffect(() => {
    const initialConcepts = filteredConcepts.slice(0, conceptsPerLoad);
    setDisplayedConcepts(initialConcepts);
    setHasMore(filteredConcepts.length > conceptsPerLoad);
  }, [filteredConcepts]);

  // Load more concepts
  const loadMoreConcepts = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simulate network delay for better UX
    setTimeout(() => {
      const currentLength = displayedConcepts.length;
      const nextConcepts = filteredConcepts.slice(
        currentLength,
        currentLength + conceptsPerLoad
      );

      if (nextConcepts.length > 0) {
        setDisplayedConcepts(prev => [...prev, ...nextConcepts]);
        setHasMore(currentLength + nextConcepts.length < filteredConcepts.length);
      } else {
        setHasMore(false);
      }

      setLoading(false);
    }, 500);
  },  [displayedConcepts.length, filteredConcepts, loading, hasMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreConcepts();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    const sentinel = document.getElementById('load-more-sentinel');
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [loadMoreConcepts, hasMore, loading]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroEnhanced />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-0">
        <PWAInstallPrompt className="-mt-12 mb-10 shadow-lg" />
        <div className="grid gap-6 md:grid-cols-2">
          <ProgressIndicator sections={contentManifest.concepts.map((concept) => concept.id)} />
          <WebVitalsDashboard />
        </div>
      </div>

      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Results Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Concepts
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover web development concepts through interactive visualizations and progressive learning
          </p>
          {filteredConcepts.length !== allConcepts.length && (
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
              Showing {filteredConcepts.length} of {allConcepts.length} concepts
            </p>
          )}
        </div>

        {/* Concept Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {displayedConcepts.map((concept, index) => (
            <motion.div
              key={concept.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ConceptCard concept={concept} />
            </motion.div>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
            <span className="ml-4 text-gray-600 dark:text-gray-400">Loading more concepts...</span>
          </div>
        )}

        {/* Load More Sentinel */}
        {hasMore && !loading && (
          <div
            id="load-more-sentinel"
            className="h-20 flex items-center justify-center"
            aria-hidden="true"
          />
        )}

        {/* End of Content */}
        {!hasMore && displayedConcepts.length > 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              You&apos;ve explored all concepts!
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check back soon for new content and updates.
            </p>
          </div>
        )}

        {/* No Results */}
        {displayedConcepts.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No concepts found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria.
            </p>
            <button
              onClick={() => {
                setFilterQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {/* Platform Pillars */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
          <header className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Platform Pillars</h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Mirroring the root scaffold’s promise—multi-modal teaching, static-first deployment, production discipline, and AI-native workflows.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {PLATFORM_PILLARS.map(pillar => (
              <div
                key={pillar.title}
                className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <h3 className="text-xl font-semibold mb-3">{pillar.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack Matrix */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
          <header className="space-y-2 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Stack Decision Matrix</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Pulled directly from the cheat sheets to match project vibes with the right tech—just like the static root render.
            </p>
          </header>
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200 text-left">
                <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Project Type</th>
                    <th className="px-6 py-4">Recommended Stack</th>
                    <th className="px-6 py-4">Why it Works</th>
                    <th className="px-6 py-4">Deployment Fit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {STACK_MATRIX.map(row => (
                    <tr key={row.projectType} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{row.projectType}</td>
                      <td className="px-6 py-4 text-gray-700">{row.stack}</td>
                      <td className="px-6 py-4 text-gray-600">{row.rationale}</td>
                      <td className="px-6 py-4 text-gray-700">{row.deployment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Toolkit */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
          <header className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-gray-900">Vibe Toolkit</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The same four-bucket toolkit from the root build—anchors, interaction stack, reliability guardrails, and content ops.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {TOOLKIT_SECTIONS.map(section => (
              <div
                key={section.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {section.items.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Blueprint */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
          <header className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-gray-900">Experience Blueprint</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mirrors the root layout’s four-step story arc—from discovery to retention.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPERIENCE_BLUEPRINT.map(step => (
              <div
                key={step.title}
                className="rounded-2xl border border-gray-200 p-6 shadow-sm bg-slate-900 text-white"
              >
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
          <header className="text-center space-y-3">
            <h2 className="text-3xl font-bold">FAQ</h2>
            <p className="text-blue-200">Same knowledge beats as the static scaffold, bundled into accessible disclosures.</p>
          </header>
          <div className="space-y-4">
            {FAQ_ITEMS.map(item => (
              <details
                key={item.question}
                className="group rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur transition hover:border-blue-300/50"
              >
                <summary className="cursor-pointer text-lg font-semibold">
                  {item.question}
                </summary>
                <p className="mt-3 text-blue-100 text-sm leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Vibe Coding Resources */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
          <header className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-gray-900">Vibe Coding Resources</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Download these essential cheat sheets and guides to accelerate your web development journey.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <a
              href="/website-vibe-coding.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col h-full rounded-2xl border border-gray-200 p-6 shadow-sm bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <svg className="w-8 h-8 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                </svg>
                <h3 className="text-xl font-semibold text-purple-900">Ultimate Vibe Builder</h3>
              </div>
              <p className="text-purple-800 text-sm leading-relaxed mb-4 flex-grow">
                Interactive design tool with 42 themes, 6 layouts, and real-time preview. Build stunning websites with instant AI prompt generation for your perfect design.
              </p>
              <div className="mt-auto flex items-center text-purple-700 font-medium">
                <span>Launch Builder</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </a>

<a
              href="/docs/Vibe%20Coding%202025%20Cheat%20Sheet.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col h-full rounded-2xl border border-gray-200 p-6 shadow-sm bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-3 text-blue-900">Vibe Coding 2025 Cheat Sheet</h3>
              <p className="text-blue-800 text-sm leading-relaxed mb-4">
                Complete reference guide for modern web development patterns, tech stacks, and best practices for 2025.
              </p>
              <div className="mt-auto flex items-center text-blue-700 font-medium">
                <span>Download PDF</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 12.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </a>
            <a
              href="/docs/Cheat%20Sheet_%20Building%20Web%20Pages%20%26%20Apps%20in%202025%20(A%20%22Vibe%20Coding%22%20Guide).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col h-full rounded-2xl border border-gray-200 p-6 shadow-sm bg-purple-50 hover:bg-purple-100 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-3 text-purple-900">Building Web Pages & Apps Guide</h3>
              <p className="text-purple-800 text-sm leading-relaxed mb-4">
                Comprehensive guide to building modern web applications with detailed explanations and practical examples.
              </p>
              <div className="mt-auto flex items-center text-purple-700 font-medium">
                <span>Download PDF</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 12.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </a>
            <a
              href="/docs/Vibe-coidng-websites.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col h-full rounded-2xl border border-gray-200 p-6 shadow-sm bg-green-50 hover:bg-green-100 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-3 text-green-900">Vibe Coding Websites Guide</h3>
              <p className="text-green-800 text-sm leading-relaxed mb-4">
                Markdown guide with tips, tricks, and real-world examples for website development using the Vibe Coding approach.
              </p>
              <div className="mt-auto flex items-center text-green-700 font-medium">
                <span>View Guide</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </a>
            <a
              href="/docs/vibe-wiki.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col h-full rounded-2xl border border-gray-200 p-6 shadow-sm bg-amber-50 hover:bg-amber-100 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-3 text-amber-900">Vibe Wiki Reference</h3>
              <p className="text-amber-800 text-sm leading-relaxed mb-4">
                Quick reference text file with key concepts, terms, and examples from the Vibe Wiki platform.
              </p>
              <div className="mt-auto flex items-center text-amber-700 font-medium">
                <span>View Reference</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
