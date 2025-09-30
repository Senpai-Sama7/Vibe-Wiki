/**
 * Content Schema for Vibe Wiki Educational Platform
 * Type-safe content modeling with compile-time validation
 */

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export type VisualizationType =
  | 'webgl-3d'          // Three.js 3D scene
  | 'svg-animated'      // SVG with GSAP
  | 'canvas-2d'         // Canvas API
  | 'diagram-flow'      // Flowchart/diagram
  | 'code-interactive'; // Live code editor

export type LearningMode =
  | 'elementary'  // 5th-grade explanation
  | 'analogical'  // Real-world metaphor
  | 'technical';  // Precise definition

export interface ConceptExplanation {
  readonly elementary: string;
  readonly analogical: string;
  readonly technical: string;
}

export interface AnimationConfig {
  readonly duration: number;        // Seconds
  readonly easing: string;          // GSAP easing function
  readonly stagger?: number;        // Delay between elements
  readonly scrollTrigger?: {
    readonly start: string;
    readonly end: string;
    readonly scrub: boolean | number;
  };
}

export interface VisualizationConfig {
  readonly type: VisualizationType;
  readonly component: string;       // Component name to lazy load
  readonly props?: Record<string, unknown>;
  readonly animation: AnimationConfig;
  readonly fallback?: string;       // Fallback content if WebGL unavailable
}

export interface CodeExample {
  readonly language: string;
  readonly code: string;
  readonly title?: string;
  readonly highlightLines?: number[];
}

export interface ComparisonItem {
  readonly name: string;
  readonly pros: string[];
  readonly cons: string[];
  readonly useCase: string;
  readonly performance?: string;
}

export interface ConceptDefinition {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly category: 'architecture' | 'api' | 'rendering' | 'tooling' | 'accessibility' | 'patterns';
  readonly explanations: ConceptExplanation;
  readonly visualization: VisualizationConfig;
  readonly codeExamples?: CodeExample[];
  readonly comparison?: ComparisonItem[];
  readonly relatedConcepts: string[];
  readonly prerequisites?: string[];
  readonly difficultyLevel: DifficultyLevel;
  readonly estimatedTime: number;   // Minutes to mastery
  readonly tags: string[];
  readonly metaDescription: string;
  readonly lastUpdated: string;     // ISO 8601 date
}

export interface ContentManifest {
  readonly version: string;
  readonly concepts: ConceptDefinition[];
  readonly categories: Record<string, { title: string; description: string }>;
  readonly totalConcepts: number;
  readonly lastBuildDate: string;
}

// Type guard utilities
export const isValidDifficulty = (level: number): level is DifficultyLevel => {
  return level >= 1 && level <= 5;
};

export const isValidVisualization = (type: string): type is VisualizationType => {
  return ['webgl-3d', 'svg-animated', 'canvas-2d', 'diagram-flow', 'code-interactive'].includes(type);
};

export const isValidLearningMode = (mode: string): mode is LearningMode => {
  return ['elementary', 'analogical', 'technical'].includes(mode);
};

// Validation functions
export const validateConceptDefinition = (concept: unknown): concept is ConceptDefinition => {
  if (!concept || typeof concept !== 'object') return false;

  const c = concept as Record<string, unknown>;

  return (
    typeof c.id === 'string' &&
    typeof c.slug === 'string' &&
    typeof c.title === 'string' &&
    typeof c.category === 'string' &&
    typeof c.explanations === 'object' &&
    typeof c.visualization === 'object' &&
    Array.isArray(c.relatedConcepts) &&
    typeof c.difficultyLevel === 'number' &&
    typeof c.estimatedTime === 'number' &&
    Array.isArray(c.tags) &&
    typeof c.metaDescription === 'string' &&
    typeof c.lastUpdated === 'string' &&
    isValidDifficulty(c.difficultyLevel)
  );
};

export const validateContentManifest = (manifest: unknown): manifest is ContentManifest => {
  if (!manifest || typeof manifest !== 'object') return false;

  const m = manifest as Record<string, unknown>;

  return (
    typeof m.version === 'string' &&
    Array.isArray(m.concepts) &&
    typeof m.categories === 'object' &&
    typeof m.totalConcepts === 'number' &&
    typeof m.lastBuildDate === 'string' &&
    m.concepts.every(validateConceptDefinition)
  );
};
