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

const specDrivenDevelopmentConcept: ConceptDefinition = {
  id: 'spec-driven-development-006',
  slug: 'spec-driven-development',
  title: 'Spec-Driven Development',
  subtitle: 'Architectural Clarity Before Code Generation',
  category: 'patterns',

  explanations: {
    elementary: 'Spec-driven development is like creating a detailed blueprint before building a house. Instead of just telling the AI "build me a house," you give it exact plans showing where every room, door, and window should go. This way, the AI builds exactly what you want!',

    analogical: 'Imagine ordering a custom suit. With vibe coding alone, you might say "make me a nice suit." With spec-driven development, you provide exact measurements, fabric choices, button styles, and pocket placements. The tailor (AI) then crafts precisely what you envisioned because they have complete specifications.',

    technical: 'Spec-driven development combines traditional software specification practices with AI-assisted code generation. Developers create detailed specifications including type definitions, API contracts, data schemas, component interfaces, and acceptance criteria BEFORE prompting the LLM. This approach ensures generated code adheres to architectural constraints, maintains type safety, follows established patterns, and integrates seamlessly with existing systems.'
  },

  visualization: {
    type: 'diagram-flow',
    component: 'SpecDrivenFlow',
    props: {
      showPhases: true,
      interactiveNodes: true
    },
    animation: {
      duration: 4,
      easing: 'power3.out',
      scrollTrigger: {
        start: 'top 80%',
        end: 'center center',
        scrub: true
      }
    }
  },

  codeExamples: [
    {
      language: 'typescript',
      title: 'Specification-First: Type Contract',
      code: `// STEP 1: Define the contract BEFORE asking AI to implement
interface UserService {
  /** Creates a new user with validation */
  createUser(input: CreateUserInput): Promise<Result<User, UserError>>;

  /** Retrieves user by ID with caching */
  getUser(id: UserId): Promise<Option<User>>;

  /** Updates user with optimistic locking */
  updateUser(id: UserId, patch: UserPatch): Promise<Result<User, UserError>>;
}

type CreateUserInput = {
  email: Email;           // Branded type for validation
  password: Password;     // Min 12 chars, complexity rules
  profile: UserProfile;
};

type UserError =
  | { type: 'VALIDATION_ERROR'; fields: string[] }
  | { type: 'DUPLICATE_EMAIL' }
  | { type: 'RATE_LIMITED'; retryAfter: number };`,
      highlightLines: [2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    {
      language: 'text',
      title: 'AI Prompt with Specification Context',
      code: `Implement the UserService interface following these constraints:

SPECIFICATION CONTEXT:
- Use the Result<T, E> pattern for error handling (no exceptions)
- Apply repository pattern for data access
- Include input validation using zod schemas
- Add Redis caching for getUser (5-minute TTL)
- Use optimistic locking with version field
- Log all operations to structured logging service

ACCEPTANCE CRITERIA:
- All methods must be type-safe (no 'any' types)
- 100% test coverage for error paths
- <100ms p99 latency for cached reads
- Idempotent createUser for retry safety`
    }
  ],

  comparison: [
    {
      name: 'Pure Vibe Coding',
      pros: ['Fast initial development', 'Low upfront effort'],
      cons: ['Inconsistent architecture', 'Type safety gaps', 'Integration issues', 'Technical debt accumulation'],
      useCase: 'Quick prototypes, throwaway code',
      performance: 'Fast start, slow finish'
    },
    {
      name: 'Spec-Driven Development',
      pros: ['Architectural consistency', 'Type-safe by design', 'Seamless integration', 'Production-ready output'],
      cons: ['Higher upfront investment', 'Requires domain expertise'],
      useCase: 'Enterprise systems, long-lived projects',
      performance: 'Measured start, fast finish'
    }
  ],

  relatedConcepts: ['vibe-coding', 'context-engineering', 'production-architecture'],
  prerequisites: ['typescript-advanced', 'software-architecture'],
  difficultyLevel: 4,
  estimatedTime: 20,
  tags: ['specification', 'architecture', 'enterprise', 'type-safety', 'contracts'],
  metaDescription: 'Master spec-driven development for production-ready AI-assisted coding. Learn to create specifications that guide LLMs toward enterprise-grade implementations.',
  lastUpdated: '2025-12-30T00:00:00Z'
};

const contextEngineeringConcept: ConceptDefinition = {
  id: 'context-engineering-007',
  slug: 'context-engineering',
  title: 'Context Engineering',
  subtitle: 'Architecting AI Context for Optimal Code Generation',
  category: 'patterns',

  explanations: {
    elementary: 'Context engineering is like giving a new team member all the important information about your project before they start working. Instead of hoping they guess correctly, you give them the project rules, coding style, and examples of good work so they do things the right way from the start!',

    analogical: 'Think of an orchestra conductor. Each musician is skilled, but without the conductor providing context (tempo, dynamics, style), the music would be chaotic. Context engineering is like creating the perfect conductor\'s score—providing the AI with all the musical context it needs to perform harmoniously with your existing codebase.',

    technical: 'Context engineering is the systematic practice of crafting, organizing, and optimizing the information provided to Large Language Models to maximize code generation quality. This includes architectural context (system design, patterns in use), codebase context (existing implementations, naming conventions), domain context (business rules, constraints), and operational context (deployment environment, performance requirements).'
  },

  visualization: {
    type: 'webgl-3d',
    component: 'ContextLayers',
    props: {
      showLayers: ['architectural', 'codebase', 'domain', 'operational'],
      interactiveNodes: true
    },
    animation: {
      duration: 5,
      easing: 'power2.inOut',
      scrollTrigger: {
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      }
    }
  },

  codeExamples: [
    {
      language: 'markdown',
      title: 'Architectural Context Document',
      code: `# System Architecture Context

## Core Patterns
- **Repository Pattern**: All data access via repositories
- **CQRS**: Separate read/write models for complex domains
- **Event Sourcing**: User actions stored as immutable events

## Technology Stack
- Runtime: Node.js 20 LTS with ES2024 features
- Framework: Next.js 15 App Router
- Database: PostgreSQL 16 with Prisma ORM
- Cache: Redis 7 with cluster mode
- Queue: BullMQ for background jobs

## Code Conventions
- Functional core, imperative shell
- Result types for error handling (neverthrow)
- Branded types for domain primitives
- Barrel exports only at module boundaries

## Security Requirements
- All inputs validated with zod
- SQL injection prevention via parameterized queries
- Rate limiting on all public endpoints
- Audit logging for sensitive operations`
    },
    {
      language: 'typescript',
      title: 'Context-Aware Prompt Structure',
      code: `// Context Engineering: Layered prompt construction
const buildPrompt = (task: Task): ContextualPrompt => ({
  // Layer 1: System context (rarely changes)
  systemContext: \`
    You are a senior TypeScript engineer working on an enterprise
    e-commerce platform. Follow functional programming principles
    and prioritize type safety over brevity.
  \`,

  // Layer 2: Architectural context (project-specific)
  architecturalContext: loadArchitectureDoc(),

  // Layer 3: Codebase context (relevant files)
  codebaseContext: [
    { file: 'src/types/domain.ts', content: loadFile('...') },
    { file: 'src/patterns/result.ts', content: loadFile('...') },
    { file: 'src/services/example.ts', content: loadFile('...') },
  ],

  // Layer 4: Task-specific context
  taskContext: {
    objective: task.description,
    constraints: task.constraints,
    acceptanceCriteria: task.criteria,
    relatedIssues: task.linkedIssues,
  }
});`
    }
  ],

  comparison: [
    {
      name: 'Minimal Context',
      pros: ['Faster prompt creation', 'Less token usage'],
      cons: ['Inconsistent output', 'Misses conventions', 'Requires heavy editing'],
      useCase: 'Simple, isolated tasks',
      performance: 'Fast prompts, slow integration'
    },
    {
      name: 'Engineered Context',
      pros: ['Consistent architecture', 'Follows conventions', 'Production-ready output', 'Reduced iterations'],
      cons: ['Higher token usage', 'Setup investment required'],
      useCase: 'Enterprise development, team projects',
      performance: 'Optimal balance of speed and quality'
    }
  ],

  relatedConcepts: ['spec-driven-development', 'vibe-coding', 'production-architecture'],
  prerequisites: ['llm-fundamentals', 'software-architecture'],
  difficultyLevel: 4,
  estimatedTime: 25,
  tags: ['context', 'prompting', 'llm', 'architecture', 'enterprise'],
  metaDescription: 'Master context engineering for AI-assisted development. Learn to structure prompts with architectural, codebase, and domain context for production-ready code.',
  lastUpdated: '2025-12-30T00:00:00Z'
};

const productionArchitectureConcept: ConceptDefinition = {
  id: 'production-architecture-008',
  slug: 'production-architecture',
  title: 'Production-Ready Architecture',
  subtitle: 'Enterprise-Grade System Design Patterns',
  category: 'architecture',

  explanations: {
    elementary: 'Production-ready architecture is like building a skyscraper instead of a treehouse. Treehouses are fun and quick to build, but skyscrapers need proper foundations, safety systems, elevators, and fire escapes. Production architecture ensures your software can handle millions of users safely and reliably!',

    analogical: 'Consider the difference between a food truck and a commercial kitchen. A food truck works for small scale, but a commercial kitchen has industrial refrigeration, fire suppression, health code compliance, backup power, and capacity for massive volume. Production architecture transforms your "food truck" code into a "commercial kitchen" system.',

    technical: 'Production-ready architecture encompasses the structural and operational patterns required for enterprise-grade systems: horizontal scalability, fault tolerance, observability, security hardening, compliance controls, disaster recovery, and operational excellence. It includes infrastructure-as-code, immutable deployments, comprehensive monitoring, and automated incident response.'
  },

  visualization: {
    type: 'webgl-3d',
    component: 'ProductionArchitecture',
    props: {
      showLayers: true,
      animateFlow: true
    },
    animation: {
      duration: 4,
      easing: 'power3.out',
      scrollTrigger: {
        start: 'top 80%',
        end: 'center center',
        scrub: true
      }
    }
  },

  codeExamples: [
    {
      language: 'typescript',
      title: 'Production-Ready Service Pattern',
      code: `// Enterprise-grade service with all production concerns
@Injectable()
export class OrderService {
  constructor(
    private readonly repo: OrderRepository,
    private readonly cache: CacheService,
    private readonly events: EventBus,
    private readonly metrics: MetricsService,
    private readonly logger: StructuredLogger,
    private readonly circuitBreaker: CircuitBreaker,
  ) {}

  @Trace('order.create')
  @RateLimit({ points: 100, duration: 60 })
  @Validate(CreateOrderSchema)
  async createOrder(
    input: CreateOrderInput,
    context: RequestContext,
  ): Promise<Result<Order, OrderError>> {
    const span = this.metrics.startSpan('createOrder');

    try {
      // Idempotency check
      const existing = await this.cache.get(\`order:\${input.idempotencyKey}\`);
      if (existing) return Ok(existing);

      // Business logic with circuit breaker
      const result = await this.circuitBreaker.execute(
        () => this.repo.create(input)
      );

      if (result.isOk()) {
        // Cache result for idempotency
        await this.cache.set(\`order:\${input.idempotencyKey}\`, result.value, 3600);

        // Emit domain event
        await this.events.emit(new OrderCreatedEvent(result.value));

        // Record metrics
        this.metrics.increment('orders.created');
      }

      return result;
    } catch (error) {
      this.logger.error('Order creation failed', { error, input, context });
      this.metrics.increment('orders.errors');
      throw error;
    } finally {
      span.end();
    }
  }
}`,
      highlightLines: [12, 13, 14, 19, 22, 23, 27, 28, 29, 34, 37]
    }
  ],

  comparison: [
    {
      name: 'Prototype Architecture',
      pros: ['Fast to build', 'Easy to understand'],
      cons: ['Single point of failure', 'No observability', 'Security gaps', 'Cannot scale'],
      useCase: 'Demos, POCs, learning',
      performance: 'Works until it doesn\'t'
    },
    {
      name: 'Production Architecture',
      pros: ['Fault tolerant', 'Observable', 'Secure', 'Scalable', 'Compliant'],
      cons: ['Complex', 'Higher initial cost', 'Requires expertise'],
      useCase: 'Enterprise systems, regulated industries',
      performance: 'Reliable at any scale'
    }
  ],

  relatedConcepts: ['spec-driven-development', 'context-engineering', 'web-vitals'],
  prerequisites: ['software-architecture', 'devops-fundamentals'],
  difficultyLevel: 5,
  estimatedTime: 30,
  tags: ['production', 'enterprise', 'scalability', 'reliability', 'security'],
  metaDescription: 'Build production-ready systems with enterprise-grade architecture patterns. Learn fault tolerance, observability, security, and scalability.',
  lastUpdated: '2025-12-30T00:00:00Z'
};

const fullStackVibeCodingConcept: ConceptDefinition = {
  id: 'full-stack-vibe-coding-009',
  slug: 'full-stack-vibe-coding',
  title: 'Full-Stack Vibe Coding',
  subtitle: 'End-to-End AI-Assisted Development',
  category: 'patterns',

  explanations: {
    elementary: 'Full-stack vibe coding means using AI to help build every part of your application—the pretty parts users see (frontend), the smart parts that do the thinking (backend), and even the parts that store information (database). It\'s like having a helpful robot assistant for every step of building a website!',

    analogical: 'Building a full-stack app is like constructing a complete restaurant: the dining room (frontend), kitchen (backend), walk-in freezer (database), and delivery service (APIs). Full-stack vibe coding is like having an AI architect who can help design and build every part of the restaurant, from the menu design to the kitchen equipment.',

    technical: 'Full-stack vibe coding extends AI-assisted development across the entire technology stack: frontend frameworks (React, Vue, Svelte), backend services (Node, Python, Go), databases (SQL, NoSQL), infrastructure (Terraform, Kubernetes), and DevOps pipelines (CI/CD, monitoring). This requires coordinating context across layers and maintaining consistency between frontend contracts and backend implementations.'
  },

  visualization: {
    type: 'webgl-3d',
    component: 'FullStackLayers',
    props: {
      showAllLayers: true,
      animateData: true
    },
    animation: {
      duration: 5,
      easing: 'power2.inOut',
      scrollTrigger: {
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      }
    }
  },

  codeExamples: [
    {
      language: 'typescript',
      title: 'Shared Types: Single Source of Truth',
      code: `// packages/shared/src/types/user.ts
// This file is the contract between frontend and backend

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: z.enum(['user', 'admin', 'moderator']),
  createdAt: z.string().datetime(),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'system']),
    notifications: z.boolean(),
  }),
});

export type User = z.infer<typeof UserSchema>;

// API contract (used by both frontend and backend)
export interface UserAPI {
  'GET /users/:id': {
    params: { id: string };
    response: User;
  };
  'POST /users': {
    body: Omit<User, 'id' | 'createdAt'>;
    response: User;
  };
  'PATCH /users/:id': {
    params: { id: string };
    body: Partial<Pick<User, 'name' | 'preferences'>>;
    response: User;
  };
}`
    },
    {
      language: 'text',
      title: 'Full-Stack Prompt Strategy',
      code: `FULL-STACK VIBE CODING WORKFLOW:

1. SCHEMA FIRST
   - Define shared types in monorepo package
   - Generate OpenAPI/GraphQL schemas
   - AI prompt: "Generate Prisma schema matching UserSchema"

2. BACKEND IMPLEMENTATION
   - Context: Shared types + API contracts + DB schema
   - AI prompt: "Implement UserService following repository pattern"
   - Validate: Types match, tests pass, API contract honored

3. FRONTEND INTEGRATION
   - Context: API types + Component library + Design system
   - AI prompt: "Create UserProfile component with UserAPI hooks"
   - Validate: Type-safe API calls, accessible components

4. INFRASTRUCTURE
   - Context: Service topology + Security requirements
   - AI prompt: "Generate Terraform for PostgreSQL + Redis"
   - Validate: Security groups, encryption, backups

5. PIPELINE
   - Context: All services + Quality gates
   - AI prompt: "Create GitHub Actions for monorepo CI/CD"
   - Validate: Tests, linting, type-check, security scan`
    }
  ],

  comparison: [
    {
      name: 'Layer-by-Layer Development',
      pros: ['Focused expertise', 'Clear boundaries'],
      cons: ['Integration friction', 'Type mismatches', 'Slower iteration'],
      useCase: 'Large teams with specialists',
      performance: 'Thorough but slow'
    },
    {
      name: 'Full-Stack Vibe Coding',
      pros: ['Rapid end-to-end features', 'Type consistency', 'Single developer velocity'],
      cons: ['Requires broad knowledge', 'Context management overhead'],
      useCase: 'Startups, small teams, rapid prototyping',
      performance: 'Fast feature delivery'
    }
  ],

  relatedConcepts: ['vibe-coding', 'spec-driven-development', 'context-engineering'],
  prerequisites: ['frontend-basics', 'backend-basics', 'database-fundamentals'],
  difficultyLevel: 4,
  estimatedTime: 35,
  tags: ['full-stack', 'frontend', 'backend', 'database', 'devops', 'monorepo'],
  metaDescription: 'Master full-stack vibe coding for end-to-end AI-assisted development. Learn to coordinate AI prompts across frontend, backend, database, and infrastructure.',
  lastUpdated: '2025-12-30T00:00:00Z'
};

const zeroTechDebtConcept: ConceptDefinition = {
  id: 'zero-tech-debt-010',
  slug: 'zero-tech-debt',
  title: 'Zero Tech Debt Development',
  subtitle: 'Building Without Accumulated Shortcuts',
  category: 'patterns',

  explanations: {
    elementary: 'Zero tech debt means never taking shortcuts that make your code messy. It\'s like always putting your toys away properly instead of throwing them in a pile. At first, it might seem slower, but later you can always find what you need and everything works perfectly!',

    analogical: 'Consider maintaining a garden. You can take shortcuts—skip weeding, don\'t prune, ignore pest control. But eventually, the garden becomes unmanageable. Zero tech debt is like maintaining your garden every day: a little effort consistently prevents the overwhelming cleanup later.',

    technical: 'Zero tech debt development is a disciplined approach where code quality standards are never compromised for speed. Every change includes proper testing, documentation, refactoring of affected areas, and adherence to architectural guidelines. When using AI-assisted development, this means rigorous review of generated code, ensuring it meets production standards before integration.'
  },

  visualization: {
    type: 'canvas-2d',
    component: 'TechDebtGraph',
    props: {
      showComparison: true,
      animateGrowth: true
    },
    animation: {
      duration: 3,
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
      title: 'Quality Gates: Automated Standards Enforcement',
      code: `// .github/workflows/quality-gate.yml translated to TypeScript config
const qualityGates: QualityGateConfig = {
  // Code must compile with strict settings
  typescript: {
    strict: true,
    noImplicitAny: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
  },

  // Test coverage requirements
  coverage: {
    statements: 80,
    branches: 75,
    functions: 80,
    lines: 80,
  },

  // Linting rules (zero warnings allowed)
  eslint: {
    maxWarnings: 0,
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      'import/no-cycle': 'error',
    },
  },

  // Security scanning
  security: {
    auditLevel: 'moderate',
    allowedVulnerabilities: 0,
  },

  // Performance budgets
  performance: {
    maxBundleSize: '250kb',
    maxFirstLoadJS: '100kb',
  },
};`,
      highlightLines: [3, 4, 5, 6, 10, 11, 12, 13, 19, 20, 21, 28, 29]
    },
    {
      language: 'text',
      title: 'AI Code Review Checklist',
      code: `BEFORE ACCEPTING AI-GENERATED CODE:

□ TYPE SAFETY
  - No 'any' types
  - All function parameters and returns typed
  - Proper null/undefined handling

□ ERROR HANDLING
  - No swallowed exceptions
  - Proper error types (not generic Error)
  - User-facing error messages are helpful

□ TESTING
  - Unit tests for pure functions
  - Integration tests for side effects
  - Edge cases covered (empty, null, max values)

□ DOCUMENTATION
  - Public functions have JSDoc comments
  - Complex logic explained
  - API changes reflected in OpenAPI/types

□ SECURITY
  - Input validation present
  - No hardcoded secrets
  - SQL/NoSQL injection prevented
  - XSS prevention for user content

□ PERFORMANCE
  - No N+1 queries
  - Appropriate caching
  - Lazy loading where beneficial`
    }
  ],

  comparison: [
    {
      name: 'Move Fast, Break Things',
      pros: ['Rapid initial velocity', 'Quick to market'],
      cons: ['Exponential slowdown', 'Bug-ridden releases', 'Developer burnout', 'Rewrite eventual'],
      useCase: 'Throw-away prototypes only',
      performance: 'Fast then grinding halt'
    },
    {
      name: 'Zero Tech Debt',
      pros: ['Sustained velocity', 'Stable releases', 'Developer happiness', 'Long-term maintainability'],
      cons: ['Higher initial investment', 'Requires discipline'],
      useCase: 'Any code you plan to maintain',
      performance: 'Consistent, sustainable speed'
    }
  ],

  relatedConcepts: ['spec-driven-development', 'production-architecture', 'vibe-coding'],
  prerequisites: ['testing-fundamentals', 'code-review-practices'],
  difficultyLevel: 3,
  estimatedTime: 18,
  tags: ['quality', 'testing', 'maintainability', 'best-practices', 'code-review'],
  metaDescription: 'Achieve zero tech debt with disciplined AI-assisted development. Learn quality gates, code review practices, and sustainable development velocity.',
  lastUpdated: '2025-12-30T00:00:00Z'
};

const concepts: ConceptDefinition[] = [
  vibeCodingConcept,
  jamstackConcept,
  reactServerComponentsConcept,
  webVitalsConcept,
  accessibilityConcept,
  specDrivenDevelopmentConcept,
  contextEngineeringConcept,
  productionArchitectureConcept,
  fullStackVibeCodingConcept,
  zeroTechDebtConcept,
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
