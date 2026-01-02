// ============================================================================
// CANONICAL TYPES - SINGLE SOURCE OF TRUTH
// ============================================================================
// These are IMMUTABLE contracts. Breaking changes require ADR + approval.
// Generated: 2025-12-29
// Purpose: Enforce type safety and prevent spec drift
// ============================================================================

/**
 * Learning Modes - The three pillars of Vibe-Wiki pedagogy
 * Immutable contract: IDs must always be these three values
 */
export type LearningModeId = 'elementary' | 'analogical' | 'technical';

export interface ILearningMode {
  /** Unique identifier - never changes */
  id: LearningModeId;
  /** Display name shown to users */
  displayName: string;
  /** Brief description of the learning style */
  description: string;
  /** Target audience (e.g., "Absolute beginners", "Professional developers") */
  targetAudience: string;
  /** Complexity scale: 1=beginner, 2=intermediate, 3=advanced */
  complexity: 1 | 2 | 3;
  /** CSS color for UI representation (hex or CSS var) */
  color: string;
  /** Icon identifier (must exist in component library) */
  icon: string;
  /** Order in UI display */
  order: number;
}

/** Canonical learning modes - defines ALL valid modes */
export const LEARNING_MODES: Record<LearningModeId, ILearningMode> = {
  elementary: {
    id: 'elementary',
    displayName: '🎓 Elementary',
    description: 'Simple explanations anyone can understand - perfect for absolute beginners',
    targetAudience: 'Absolute beginners, young learners, non-technical backgrounds',
    complexity: 1,
    color: '#3B82F6',
    icon: 'BookOpen',
    order: 0,
  },
  analogical: {
    id: 'analogical',
    displayName: '🔗 Analogical',
    description: 'Real-world metaphors and comparisons that make concepts stick',
    targetAudience: 'Visual learners, intermediate developers, pattern thinkers',
    complexity: 2,
    color: '#10B981',
    icon: 'Lightbulb',
    order: 1,
  },
  technical: {
    id: 'technical',
    displayName: '⚙️ Technical',
    description: 'In-depth technical insights for advanced learners and professionals',
    targetAudience: 'Advanced developers, computer science students, system designers',
    complexity: 3,
    color: '#8B5CF6',
    icon: 'Zap',
    order: 2,
  },
};

/**
 * Code Example - immutable specification
 * Must support all major web languages
 */
export type CodeLanguage = 'html' | 'css' | 'javascript' | 'typescript' | 'jsx' | 'tsx';

export interface ICodeExample {
  /** Unique identifier within content */
  id: string;
  /** Programming language */
  language: CodeLanguage;
  /** Raw code (will be syntax highlighted) */
  code: string;
  /** Brief description of what this example demonstrates */
  description: string;
  /** Can this code be run directly? */
  runnable: boolean;
  /** If runnable, output type (html, json, etc.) */
  outputType?: 'html' | 'json' | 'text';
}

/**
 * Resource - external learning materials
 * Contract: Each type has a well-defined structure
 */
export type ResourceType = 'article' | 'video' | 'interactive' | 'documentation';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface IResource {
  /** User-facing title */
  title: string;
  /** Absolute URL (must be valid, verified in CI) */
  url: string;
  /** Type of resource - determines icon and handling */
  type: ResourceType;
  /** Difficulty level of the resource */
  difficulty: DifficultyLevel;
  /** Optional: estimated reading/viewing time in minutes */
  estimatedTime?: number;
}

/**
 * Content Metadata - tracks provenance and versions
 * Contract: timestamps are ISO8601, versions follow semver
 */
export interface IContentMetadata {
  /** ISO8601 timestamp when first created */
  createdAt: string;
  /** ISO8601 timestamp when last updated */
  updatedAt: string;
  /** GitHub username of author */
  author: string;
  /** Semantic version (e.g., "1.2.3") */
  version: string;
  /** Searchable tags (lowercase, no spaces) */
  tags: string[];
  /** IDs of content that must be learned first */
  prerequisites: string[];
  /** Estimated time to learn this content (minutes) */
  estimatedMinutes: number;
}

/**
 * Main Content Contract
 * This is the heart of Vibe-Wiki's data model
 * Breaking changes here require platform-wide migration
 */
export interface IContent {
  /** Unique identifier - globally unique, immutable */
  id: string;
  /** Display title for the concept */
  title: string;
  /** Short summary (one paragraph) */
  description: string;
  /** Explanations by learning mode - MUST have all three modes */
  explanations: Record<LearningModeId, string>;
  /** Code examples demonstrating the concept */
  codeExamples: ICodeExample[];
  /** External learning resources */
  resources: IResource[];
  /** Metadata and versioning */
  metadata: IContentMetadata;
  /** Is this content published and visible to users? */
  published: boolean;
}

/**
 * Type guards - runtime validation for contracts
 */
export function isLearningModeId(value: unknown): value is LearningModeId {
  return value === 'elementary' || value === 'analogical' || value === 'technical';
}

export function isCodeLanguage(value: unknown): value is CodeLanguage {
  const valid = ['html', 'css', 'javascript', 'typescript', 'jsx', 'tsx'];
  return typeof value === 'string' && valid.includes(value);
}

export function isResourceType(value: unknown): value is ResourceType {
  const valid = ['article', 'video', 'interactive', 'documentation'];
  return typeof value === 'string' && valid.includes(value);
}

export function isDifficultyLevel(value: unknown): value is DifficultyLevel {
  const valid = ['beginner', 'intermediate', 'advanced'];
  return typeof value === 'string' && valid.includes(value);
}

/**
 * Validation results
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Content validator - ensures compliance with spec contract
 */
export function validateContent(content: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!content || typeof content !== 'object') {
    return { valid: false, errors: ['Content must be an object'], warnings: [] };
  }

  const c = content as Record<string, unknown>;

  // Check required fields
  if (!c.id || typeof c.id !== 'string') errors.push('Missing or invalid id');
  if (!c.title || typeof c.title !== 'string') errors.push('Missing or invalid title');
  if (!c.description || typeof c.description !== 'string') errors.push('Missing or invalid description');

  // Check explanations cover all modes
  if (!c.explanations || typeof c.explanations !== 'object') {
    errors.push('Missing explanations object');
  } else {
    const expl = c.explanations as Record<string, unknown>;
    for (const mode of Object.keys(LEARNING_MODES)) {
      if (!expl[mode] || typeof expl[mode] !== 'string') {
        errors.push(`Missing or invalid explanation for mode: ${mode}`);
      }
    }
  }

  // Check code examples
  if (!Array.isArray(c.codeExamples)) {
    errors.push('codeExamples must be an array');
  } else if (c.codeExamples.length === 0) {
    warnings.push('Content has no code examples');
  } else {
    c.codeExamples.forEach((ex: unknown, i: number) => {
      if (typeof ex !== 'object') {
        errors.push(`codeExamples[${i}] is not an object`);
      } else {
        const e = ex as Record<string, unknown>;
        if (!isCodeLanguage(e.language)) errors.push(`codeExamples[${i}]: invalid language`);
        if (!e.code || typeof e.code !== 'string') errors.push(`codeExamples[${i}]: missing code`);
      }
    });
  }

  // Check resources
  if (!Array.isArray(c.resources)) {
    errors.push('resources must be an array');
  } else if (c.resources.length === 0) {
    warnings.push('Content has no external resources');
  } else {
    c.resources.forEach((res: unknown, i: number) => {
      if (typeof res !== 'object') {
        errors.push(`resources[${i}] is not an object`);
      } else {
        const r = res as Record<string, unknown>;
        if (!r.title || typeof r.title !== 'string') errors.push(`resources[${i}]: missing title`);
        if (!r.url || typeof r.url !== 'string') errors.push(`resources[${i}]: missing URL`);
        if (!isResourceType(r.type)) errors.push(`resources[${i}]: invalid type`);
      }
    });
  }

  // Check metadata
  if (!c.metadata || typeof c.metadata !== 'object') {
    errors.push('Missing metadata object');
  } else {
    const m = c.metadata as Record<string, unknown>;
    if (!m.createdAt || typeof m.createdAt !== 'string') errors.push('metadata: invalid createdAt');
    if (!m.author || typeof m.author !== 'string') errors.push('metadata: invalid author');
    if (!m.version || typeof m.version !== 'string') errors.push('metadata: invalid version');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
