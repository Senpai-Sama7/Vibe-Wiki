'use client';

import { useState, useCallback, memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { ConceptDefinition, LearningMode } from '@/lib/content/schema';
import { isValidLearningMode } from '@/lib/content/schema';
import { AnimatedDiagram } from './AnimatedDiagram';
import { ComparisonTable } from './ComparisonTable';
import { CopyButton } from './CopyButton';
import clsx from 'clsx';

const GLOBAL_MODE_STORAGE_KEY = 'vibeWiki.preferredLearningMode';
const MODE_CHANGE_EVENT = 'vibeWiki:mode-change';

const parseLearningMode = (value: unknown): LearningMode | null => {
  if (typeof value === 'string' && isValidLearningMode(value)) {
    return value;
  }

  return null;
};

interface ConceptCardProps {
  concept: ConceptDefinition;
  initialMode?: LearningMode;
  onModeChange?: (mode: LearningMode) => void;
  className?: string;
}

/**
 * ConceptCard: Three-mode learning component with progressive disclosure
 *
 * Architecture:
 * - State machine for mode transitions (elementary → analogical → technical)
 * - Lazy-loaded 3D visualizations via dynamic import
 * - ARIA live regions for screen reader announcements
 * - Keyboard navigation (Tab, Arrow keys, Enter/Space)
 * - Progress tracking via local storage
 */
export const ConceptCard = memo<ConceptCardProps>(({
  concept,
  initialMode = 'elementary',
  onModeChange,
  className
}) => {
  const [activeMode, setActiveMode] = useState<LearningMode>(initialMode);
  const [showVisualization, setShowVisualization] = useState(false);
  const [completedModes, setCompletedModes] = useState<Set<LearningMode>>(new Set());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storageKey = `concept-${concept.id}-modes`;
    let nextMode: LearningMode | null = null;

    try {
      const storedValue = window.localStorage.getItem(storageKey);
      if (storedValue) {
        const parsed = JSON.parse(storedValue);
        if (Array.isArray(parsed)) {
          const validModes = parsed.filter((mode): mode is LearningMode => isValidLearningMode(mode));

          if (validModes.length > 0) {
            setCompletedModes(new Set(validModes));
            const lastMode = validModes[validModes.length - 1];
            if (lastMode) {
              nextMode = lastMode;
            }
          }
        }
      }

      const globalPreference = parseLearningMode(
        window.localStorage.getItem(GLOBAL_MODE_STORAGE_KEY)
      );

      if (globalPreference) {
        nextMode = globalPreference;
      }

      if (nextMode && isValidLearningMode(nextMode)) {
        setActiveMode(nextMode);
      }
    } catch (error) {
      console.warn('Unable to restore saved learning modes', error);
    }
  }, [concept.id]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleModeEvent = (event: Event) => {
      const customEvent = event as CustomEvent<LearningMode | null>;
      const mode = customEvent.detail;

      if (mode && isValidLearningMode(mode)) {
        setActiveMode(prev => (prev === mode ? prev : mode));
      }
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== GLOBAL_MODE_STORAGE_KEY) return;

      const mode = parseLearningMode(event.newValue);
      if (mode) {
        setActiveMode(prev => (prev === mode ? prev : mode));
      }
    };

    window.addEventListener(MODE_CHANGE_EVENT, handleModeEvent as EventListener);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(MODE_CHANGE_EVENT, handleModeEvent as EventListener);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const modes: Array<{ key: LearningMode; label: string; icon: string }> = [
    { key: 'elementary', label: 'Simple', icon: '🎈' },
    { key: 'analogical', label: 'Analogy', icon: '🔗' },
    { key: 'technical', label: 'Technical', icon: '⚙️' }
  ];

  const handleModeChange = useCallback((mode: LearningMode) => {
    setActiveMode(mode);
    setCompletedModes(prev => new Set(prev).add(mode));
    onModeChange?.(mode);

    if (typeof window === 'undefined') {
      return;
    }

    // Track progress in localStorage
    const storageKey = `concept-${concept.id}-modes`;
    try {
      const existingRaw = window.localStorage.getItem(storageKey);
      const parsed = existingRaw ? JSON.parse(existingRaw) : [];
      const existingModes: LearningMode[] = Array.isArray(parsed)
        ? parsed.filter((storedMode): storedMode is LearningMode => isValidLearningMode(storedMode))
        : [];

      if (!existingModes.includes(mode)) {
        const updated = [...existingModes, mode];
        window.localStorage.setItem(storageKey, JSON.stringify(updated));
      }
    } catch (error) {
      console.warn('Failed to persist learning mode progress', error);
    }

    try {
      window.localStorage.setItem(GLOBAL_MODE_STORAGE_KEY, mode);
      const modeEvent: CustomEvent<LearningMode> = new CustomEvent(MODE_CHANGE_EVENT, {
        detail: mode
      });
      window.dispatchEvent(modeEvent);
    } catch (error) {
      console.warn('Failed to persist global learning mode preference', error);
    }
  }, [concept.id, onModeChange]);

  const difficultyColor = {
    1: 'bg-green-500',
    2: 'bg-green-600',
    3: 'bg-yellow-500',
    4: 'bg-orange-500',
    5: 'bg-red-500'
  }[concept.difficultyLevel];

  return (
    <motion.article
      className={clsx(
        'concept-card relative rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-xl',
        'dark:border-gray-700 dark:bg-gray-900',
        className
      )}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby={`concept-${concept.id}-title`}
    >
      {/* Header */}
      <header className="mb-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2
              id={`concept-${concept.id}-title`}
              className="text-3xl font-bold text-gray-900 dark:text-white"
            >
              {concept.title}
            </h2>
            {concept.subtitle && (
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                {concept.subtitle}
              </p>
            )}
          </div>

          {/* Difficulty Indicator */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Difficulty:
            </span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(level => (
                <div
                  key={level}
                  className={clsx(
                    'h-2 w-2 rounded-full',
                    level <= concept.difficultyLevel ? difficultyColor : 'bg-gray-300 dark:bg-gray-700'
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="sr-only">
              Difficulty level {concept.difficultyLevel} out of 5
            </span>
          </div>
        </div>

        {/* Mode Selector */}
        <nav
          className="flex gap-2"
          role="tablist"
          aria-label="Learning modes"
        >
          {modes.map(mode => (
            <button
              key={mode.key}
              onClick={() => handleModeChange(mode.key)}
              role="tab"
              aria-selected={activeMode === mode.key}
              aria-controls={`panel-${mode.key}`}
              className={clsx(
                'relative flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                activeMode === mode.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              )}
            >
              <span aria-hidden="true">{mode.icon}</span>
              {mode.label}
              {completedModes.has(mode.key) && (
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-500" aria-label="Completed" />
              )}
            </button>
          ))}
        </nav>
      </header>

      {/* Explanation Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMode}
          id={`panel-${activeMode}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeMode}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <div
            className="prose prose-lg max-w-none dark:prose-invert"
            aria-live="polite"
          >
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
              {concept.explanations[activeMode]}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Visualization Toggle */}
      <div className="mb-6">
        <button
          onClick={() => setShowVisualization(!showVisualization)}
          className={clsx(
            'w-full rounded-xl py-3 px-6 font-semibold transition-all',
            'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
            showVisualization
              ? 'bg-purple-600 text-white'
              : 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200'
          )}
          aria-expanded={showVisualization}
          aria-controls={`visualization-${concept.id}`}
        >
          {showVisualization ? '🎨 Hide' : '✨ Show'} Interactive Visualization
        </button>

        <motion.div
          id={`visualization-${concept.id}`}
          initial={false}
          animate={{
            opacity: showVisualization ? 1 : 0,
            height: showVisualization ? 'auto' : 0,
          }}
          transition={{ duration: 0.35 }}
          className={clsx(
            'mt-4 overflow-hidden rounded-xl border-2 border-purple-200 dark:border-purple-800',
            showVisualization ? 'pointer-events-auto' : 'pointer-events-none'
          )}
          aria-hidden={!showVisualization}
        >
          <AnimatedDiagram
            config={concept.visualization}
            conceptId={concept.id}
          />
        </motion.div>
      </div>

      {/* Code Examples */}
      {concept.codeExamples && concept.codeExamples.length > 0 && (
        <section className="mb-6" aria-labelledby={`code-examples-${concept.id}`}>
          <h3
            id={`code-examples-${concept.id}`}
            className="mb-4 text-xl font-bold text-gray-900 dark:text-white"
          >
            💻 Code Examples
          </h3>
          <div className="space-y-4">
            {concept.codeExamples.map((example, index) => (
              <div key={index} className="overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700">
                {example.title && (
                  <div className="bg-gray-100 px-4 py-2 dark:bg-gray-800 flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {example.title}
                    </h4>
                    <CopyButton
                      text={example.code}
                      label={`Copy ${example.title || 'code'}`}
                    />
                  </div>
                )}
                <div className="relative group">
                  {!example.title && (
                    <div className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <CopyButton
                        text={example.code}
                        label="Copy code"
                      />
                    </div>
                  )}
                  <SyntaxHighlighter
                    language={example.language}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: 0,
                      fontSize: '0.875rem',
                    }}
                    showLineNumbers
                    wrapLines
                    lineProps={(lineNumber: number) => ({
                      style: {
                        backgroundColor: example.highlightLines?.includes(lineNumber)
                          ? 'rgba(59, 130, 246, 0.15)'
                          : 'transparent',
                      },
                    })}
                  >
                    {example.code}
                  </SyntaxHighlighter>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Comparison Table */}
      {concept.comparison && concept.comparison.length > 0 && (
        <section className="mb-6" aria-labelledby={`comparison-${concept.id}`}>
          <h3
            id={`comparison-${concept.id}`}
            className="mb-4 text-xl font-bold text-gray-900 dark:text-white"
          >
            ⚖️ Comparison
          </h3>
          <ComparisonTable items={concept.comparison} />
        </section>
      )}

      {/* Metadata Footer */}
      <footer className="mt-6 flex flex-wrap items-center gap-4 border-t border-gray-200 pt-4 text-sm dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 dark:text-gray-400">⏱️ Time:</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {concept.estimatedTime} min
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {concept.tags.map(tag => (
            <span
              key={tag}
              className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      </footer>
    </motion.article>
  );
});

ConceptCard.displayName = 'ConceptCard';
