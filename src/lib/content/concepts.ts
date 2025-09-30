import type { ConceptDefinition, ContentManifest } from './schema';

/**
 * Vibe Coding Concept Definitions
 * Static content compiled at build time for optimal performance
 */

const vibeCodingConcept: ConceptDefinition = {
  id: 'vibe-coding-001',
  slug: 'vibe-coding',
  title: 'Vibe Coding',
  subtitle: 'AI-Assisted Software Development in 2025',
  category: 'patterns',

  explanations: {
    elementary: 'Vibe coding is like having a robot helper write your computer programs while you explain what you want in normal words. Instead of typing all the code yourself, you tell an AI assistant what your program should do, and it writes the code for you!',

    analogical: 'Imagine ordering food at a restaurant by describing the dish you want ("something spicy with chicken and vegetables") instead of giving the chef a detailed recipe. The chef (AI) uses their expertise to create the meal while you focus on what you want to eat, not how to cook it.',

    technical: 'Vibe coding describes a chatbot-based software development technique where developers describe project requirements to a Large Language Model (LLM), which generates code based on natural language prompts. Developers evaluate code through execution results and iterative refinement rather than manual code review, prioritizing rapid prototyping over traditional software engineering practices.'
  },

  visualization: {
    type: 'webgl-3d',
    component: 'VibeCodingScene',
    props: {
      showWorkflow: true,
      animateSteps: true
    },
    animation: {
      duration: 3,
      easing: 'power2.inOut',
      scrollTrigger: {
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      }
    },
    fallback: 'Workflow diagram showing human → AI prompt → generated code → execution → feedback loop'
  },

  codeExamples: [
    {
      language: 'typescript',
      title: 'Traditional Coding Approach',
      code: `// Developer writes every line manually
function calculateFibonacci(n: number): number {
  if (n <= 1) return n;
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  return curr;
}`,
      highlightLines: [2, 3, 4, 5, 6, 7]
    },
    {
      language: 'text',
      title: 'Vibe Coding Approach',
      code: `Prompt to AI:
"Create a TypeScript function that calculates
the nth Fibonacci number using iterative approach
for O(n) time complexity"

AI generates the code above instantly ✨`
    }
  ],

  comparison: [
    {
      name: 'Traditional Coding',
      pros: [
        'Full understanding of implementation',
        'Optimized for specific use case',
        'Easier debugging and maintenance'
      ],
      cons: [
        'Time-consuming manual coding',
        'Requires deep technical expertise',
        'Slower prototyping iteration'
      ],
      useCase: 'Production systems requiring long-term maintenance',
      performance: 'Optimal when hand-tuned'
    },
    {
      name: 'Vibe Coding',
      pros: [
        '10x faster prototyping speed',
        'Lower barrier to entry',
        'Rapid iteration on ideas'
      ],
      cons: [
        'May lack optimization',
        'Security vulnerabilities risk',
        'Developer understanding gaps'
      ],
      useCase: 'Prototypes, MVPs, learning experiments',
      performance: 'Good for most cases, may need refinement'
    }
  ],

  relatedConcepts: ['jamstack', 'react-server-components', 'web-vitals'],
  prerequisites: ['basic-programming', 'llm-fundamentals'],
  difficultyLevel: 2,
  estimatedTime: 8,
  tags: ['ai', 'development', 'workflow', '2025', 'llm'],
  metaDescription: 'Learn vibe coding - the AI-assisted development technique transforming software creation in 2025. Understand when to use AI code generation and its trade-offs.',
  lastUpdated: '2025-09-30T00:00:00Z'
};

const jamstackConcept: ConceptDefinition = {
  id: 'jamstack-002',
  slug: 'jamstack',
  title: 'Jamstack Architecture',
  subtitle: 'Modern Web Development Pattern',
  category: 'architecture',

  explanations: {
    elementary: 'Jamstack is a way to build super-fast websites by creating all the pages ahead of time (like preparing sandwiches before lunch rush) instead of making them fresh each time someone visits (like cooking to order). The pages are then stored on computers all around the world so they load quickly no matter where you are!',

    analogical: 'Think of a pizza restaurant with two approaches: (1) Traditional: Customer orders, chef makes pizza fresh, customer waits 20 minutes. (2) Jamstack: Chef pre-makes popular pizzas during slow hours, keeps them warm, serves instantly when ordered. Pre-made pizzas (pre-rendered pages) are distributed to multiple locations (CDN) for fastest delivery.',

    technical: 'Jamstack is a modern web architecture that decouples frontend presentation from backend services, emphasizing pre-rendering pages using Static Site Generation (SSG), serving content via global Content Delivery Networks (CDN), and handling dynamic functionality through client-side JavaScript and API calls. The acronym originally stood for JavaScript, APIs, and Markup, but has evolved to represent a broader architectural philosophy prioritizing performance, security, and developer experience.'
  },

  visualization: {
    type: 'webgl-3d',
    component: 'JamstackArchitectureScene',
    props: {
      showLayers: true,
      interactiveNodes: true
    },
    animation: {
      duration: 4,
      easing: 'power3.out',
      stagger: 0.2,
      scrollTrigger: {
        start: 'top 80%',
        end: 'center center',
        scrub: true
      }
    }
  },

  codeExamples: [
    {
      language: 'javascript',
      title: 'Traditional Server-Side Rendering',
      code: `// Server generates HTML for each request
app.get('/blog/:slug', async (req, res) => {
  const post = await db.query('SELECT * FROM posts WHERE slug = ?', [req.params.slug]);
  const html = renderTemplate('blog-post', post);
  res.send(html); // Generated on every request
});`
    },
    {
      language: 'javascript',
      title: 'Jamstack Static Generation',
      code: `// Pages pre-rendered at build time
export async function generateStaticParams() {
  const posts = await fetchAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default async function BlogPost({ params }) {
  const post = await fetchPost(params.slug);
  return <Article {...post} />; // Static HTML served
}`
    }
  ],

  relatedConcepts: ['vibe-coding', 'react-server-components', 'web-vitals'],
  prerequisites: ['http-basics', 'web-hosting'],
  difficultyLevel: 3,
  estimatedTime: 12,
  tags: ['architecture', 'performance', 'static', 'cdn'],
  metaDescription: 'Master Jamstack architecture for building blazing-fast, secure websites. Learn SSG, CDN distribution, and API-driven development patterns.',
  lastUpdated: '2025-09-30T00:00:00Z'
};

const reactServerComponentsConcept: ConceptDefinition = {
  id: 'react-server-components-003',
  slug: 'react-server-components',
  title: 'React Server Components',
  subtitle: 'Next.js 13+ App Router Innovation',
  category: 'rendering',

  explanations: {
    elementary: 'React Server Components are like having a smart kitchen where some cooking happens on the stove (server) and some happens at the table (browser). The server does the heavy work of preparing ingredients, and the browser just adds the final touches, making everything faster and more efficient!',

    analogical: 'Imagine a restaurant where the chef pre-chops vegetables and marinates meat in the kitchen (server components), then the waiter just grills the steak and adds sauce at your table (client components). You get hot food faster, and the chef can focus on complex preparations while the waiter handles simple finishing touches.',

    technical: 'React Server Components (RSC) enable rendering React components on the server, allowing direct access to backend resources while maintaining client-side interactivity. Server Components run once at build/request time and can fetch data, access databases, and render static content, while Client Components handle user interactions and browser-specific APIs.'
  },

  visualization: {
    type: 'svg-animated',
    component: 'ServerClientFlow',
    props: {
      showDataFlow: true,
      animateTransitions: true
    },
    animation: {
      duration: 2.5,
      easing: 'power2.inOut',
      scrollTrigger: {
        start: 'top center',
        end: 'bottom center',
        scrub: 0.5
      }
    }
  },

  codeExamples: [
    {
      language: 'typescript',
      title: 'Server Component (Runs on Server)',
      code: `// app/blog/page.tsx - Server Component
import { db } from '@/lib/db';

export default async function BlogPage() {
  // Direct database access on server
  const posts = await db.post.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}`
    },
    {
      language: 'typescript',
      title: 'Client Component (Runs in Browser)',
      code: `'use client';

// components/LikeButton.tsx - Client Component
import { useState } from 'react';

export function LikeButton({ postId }: { postId: string }) {
  const [likes, setLikes] = useState(0);

  return (
    <button
      onClick={() => setLikes(l => l + 1)}
      className="btn"
    >
      👍 {likes} Likes
    </button>
  );
}`
    }
  ],

  comparison: [
    {
      name: 'Traditional Client-Side Rendering',
      pros: ['Simple deployment', 'Full client control'],
      cons: ['Slower initial load', 'SEO challenges', 'Bundle size issues'],
      useCase: 'Interactive dashboards, admin panels',
      performance: 'Good for highly interactive apps'
    },
    {
      name: 'Server Components',
      pros: ['Faster initial load', 'Better SEO', 'Reduced bundle size', 'Direct backend access'],
      cons: ['Complex mental model', 'Limited browser APIs'],
      useCase: 'Content-heavy sites, e-commerce, blogs',
      performance: 'Excellent for content delivery'
    }
  ],

  relatedConcepts: ['vibe-coding', 'jamstack', 'web-vitals'],
  prerequisites: ['react-fundamentals', 'nextjs-basics'],
  difficultyLevel: 4,
  estimatedTime: 15,
  tags: ['react', 'nextjs', 'server', 'performance', 'rsc'],
  metaDescription: 'Master React Server Components in Next.js 13+ App Router. Learn server-side rendering patterns, data fetching, and performance optimization.',
  lastUpdated: '2025-09-30T00:00:00Z'
};

const webVitalsConcept: ConceptDefinition = {
  id: 'web-vitals-004',
  slug: 'web-vitals',
  title: 'Web Vitals',
  subtitle: 'Core Web Performance Metrics',
  category: 'tooling',

  explanations: {
    elementary: 'Web Vitals are like a health checkup for your website! They measure how fast your site loads, how smooth it feels when you scroll, and how stable the page stays while it loads. Good scores mean your website feels fast and smooth to use!',

    analogical: 'Think of Web Vitals as a car\'s dashboard gauges: speedometer (loading speed), smoothness meter (scroll performance), and stability indicator (layout shifts). Just like you want your car to accelerate quickly, handle smoothly, and not jerk around, you want your website to load fast, scroll smoothly, and stay stable.',

    technical: 'Web Vitals are a set of standardized performance metrics that measure user experience quality. Core Web Vitals include Largest Contentful Paint (LCP) for loading speed, First Input Delay (FID) for interactivity, and Cumulative Layout Shift (CLS) for visual stability. Additional metrics track runtime performance and user-centric outcomes.'
  },

  visualization: {
    type: 'canvas-2d',
    component: 'VitalsDashboard',
    props: {
      showMetrics: ['LCP', 'FID', 'CLS', 'FCP', 'TTFB'],
      animateValues: true
    },
    animation: {
      duration: 2,
      easing: 'power2.out',
      scrollTrigger: {
        start: 'top center',
        end: 'bottom center',
        scrub: false
      }
    }
  },

  codeExamples: [
    {
      language: 'typescript',
      title: 'Measuring Web Vitals',
      code: `import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function reportWebVitals(metric) {
  // Send to analytics
  console.log(metric.name, metric.value);

  // Example: Send to Google Analytics
  gtag('event', metric.name, {
    value: Math.round(metric.value),
    event_category: 'Web Vitals',
    event_label: metric.id,
    non_interaction: true,
  });
}

// Measure all Core Web Vitals
getCLS(reportWebVitals);
getFID(reportWebVitals);
getFCP(reportWebVitals);
getLCP(reportWebVitals);
getTTFB(reportWebVitals);`
    },
    {
      language: 'typescript',
      title: 'Optimizing for Good Scores',
      code: `// Optimize LCP: Preload critical resources
<link rel="preload" href="/hero-image.jpg" as="image">

// Optimize FID: Break up long tasks
function processData(data) {
  // Break into smaller chunks
  return new Promise(resolve => {
    setTimeout(() => {
      const result = heavyComputation(data);
      resolve(result);
    }, 0);
  });
}

// Optimize CLS: Reserve space for dynamic content
<div style={{
  minHeight: '300px', // Reserve space
  aspectRatio: '16/9'
}}>
  <img src="/dynamic-image.jpg" />
</div>`
    }
  ],

  comparison: [
    {
      name: 'Poor Performance',
      pros: [],
      cons: ['Slow loading', 'Janky scrolling', 'Layout shifts', 'Poor user experience'],
      useCase: 'Sites with high bounce rates',
      performance: 'LCP >4s, FID >300ms, CLS >0.25'
    },
    {
      name: 'Good Performance',
      pros: ['Fast loading', 'Smooth interactions', 'Stable layout', 'Better conversions'],
      cons: [],
      useCase: 'Optimized user experience',
      performance: 'LCP <2.5s, FID <100ms, CLS <0.1'
    }
  ],

  relatedConcepts: ['vibe-coding', 'jamstack', 'react-server-components', 'accessibility'],
  prerequisites: ['web-performance-basics', 'javascript-fundamentals'],
  difficultyLevel: 3,
  estimatedTime: 10,
  tags: ['performance', 'metrics', 'seo', 'ux', 'monitoring'],
  metaDescription: 'Master Web Vitals - the essential performance metrics for modern web development. Learn LCP, FID, CLS, and optimization strategies.',
  lastUpdated: '2025-09-30T00:00:00Z'
};

const accessibilityConcept: ConceptDefinition = {
  id: 'accessibility-005',
  slug: 'accessibility',
  title: 'Web Accessibility (WCAG)',
  subtitle: 'Inclusive Design for All Users',
  category: 'accessibility',

  explanations: {
    elementary: 'Web accessibility is like making sure everyone can use your website, no matter how they access it! Some people use screen readers to hear the page, others use keyboards instead of mice, and some need bigger text or different colors. Good accessibility means your website works for everyone!',

    analogical: 'Imagine building a house with only stairs - people in wheelchairs couldn\'t enter. Accessibility is like adding ramps, wide doorways, and elevators so everyone can get inside comfortably. It\'s about removing barriers and making things usable for all people, regardless of their abilities.',

    technical: 'Web accessibility refers to designing and developing websites that can be used by people with disabilities. WCAG (Web Content Accessibility Guidelines) provides standards for making web content accessible to users with visual, auditory, motor, and cognitive impairments through proper semantic HTML, ARIA attributes, keyboard navigation, and assistive technology support.'
  },

  visualization: {
    type: 'diagram-flow',
    component: 'AccessibilityTree',
    props: {
      showGuidelines: true,
      interactiveDemo: true
    },
    animation: {
      duration: 3,
      easing: 'power2.out',
      scrollTrigger: {
        start: 'top center',
        end: 'bottom center',
        scrub: true
      }
    }
  },

  codeExamples: [
    {
      language: 'html',
      title: 'Accessible Form with Proper Labels',
      code: `<!-- ❌ Bad: Missing labels -->
<input type="email" placeholder="Enter email">

<!-- ✅ Good: Proper labeling -->
<label for="email">Email Address</label>
<input
  id="email"
  type="email"
  aria-describedby="email-help"
  required
>
<div id="email-help">
  We'll use this to send you updates
</div>`
    },
    {
      language: 'typescript',
      title: 'Keyboard Navigation and Focus Management',
      code: `// Focus trap for modals
function Modal({ children, onClose }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements) {
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }

        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleTabKey);
      firstElement.focus();

      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" ref={modalRef}>
      {children}
    </div>
  );
}`
    }
  ],

  comparison: [
    {
      name: 'Inaccessible Design',
      pros: [],
      cons: ['Excludes users with disabilities', 'Legal compliance issues', 'Poor user experience', 'Limited market reach'],
      useCase: 'Sites ignoring accessibility',
      performance: 'Fails WCAG guidelines'
    },
    {
      name: 'Accessible Design',
      pros: ['Inclusive for all users', 'Legal compliance', 'Better SEO', 'Improved usability', 'Broader market reach'],
      cons: ['Requires planning and testing', 'Additional development time'],
      useCase: 'Professional websites and applications',
      performance: 'Meets WCAG 2.1 AA standards'
    }
  ],

  relatedConcepts: ['vibe-coding', 'web-vitals', 'jamstack'],
  prerequisites: ['html-basics', 'css-fundamentals'],
  difficultyLevel: 3,
  estimatedTime: 14,
  tags: ['accessibility', 'wcag', 'inclusive-design', 'usability', 'legal'],
  metaDescription: 'Master web accessibility and WCAG guidelines. Learn to create inclusive websites that work for users with disabilities.',
  lastUpdated: '2025-09-30T00:00:00Z'
};

const concepts: ConceptDefinition[] = [
  vibeCodingConcept,
  jamstackConcept,
  reactServerComponentsConcept,
  webVitalsConcept,
  accessibilityConcept,
  // Additional concepts would be added here following the same pattern
];

const BUILD_TIMESTAMP = new Date().toISOString();

const conceptBySlug = new Map<string, ConceptDefinition>(
  concepts.map(concept => [concept.slug, concept])
);

// Export content manifest
export const contentManifest: ContentManifest = {
  version: '1.0.0',
  concepts,
  categories: {
    architecture: {
      title: 'Architecture Patterns',
      description: 'System design approaches and architectural paradigms'
    },
    api: {
      title: 'API Design',
      description: 'REST, GraphQL, and modern API patterns'
    },
    rendering: {
      title: 'Rendering Strategies',
      description: 'SSR, SSG, CSR, and hybrid rendering approaches'
    },
    tooling: {
      title: 'Development Tools',
      description: 'Frameworks, libraries, and developer tooling'
    },
    accessibility: {
      title: 'Web Accessibility',
      description: 'WCAG compliance and inclusive design'
    },
    patterns: {
      title: 'Development Patterns',
      description: 'Modern development workflows and methodologies'
    }
  },
  totalConcepts: concepts.length,
  lastBuildDate: BUILD_TIMESTAMP
};

// Utility functions
export const getConceptBySlug = (slug: string): ConceptDefinition | undefined => {
  return conceptBySlug.get(slug);
};

export const getConceptsByCategory = (category: ConceptDefinition['category']): ConceptDefinition[] => {
  return concepts.filter(concept => concept.category === category);
};

export const getRelatedConcepts = (conceptId: string): ConceptDefinition[] => {
  const concept = concepts.find(c => c.id === conceptId);
  if (!concept) return [];

  return concept.relatedConcepts
    .map(relatedSlug => conceptBySlug.get(relatedSlug))
    .filter((c): c is ConceptDefinition => c !== undefined && c.slug !== concept.slug);
};
