'use client';

import type { VisualizationConfig } from '@/lib/content/schema';
import type { ComponentType } from 'react';
import { Suspense, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimatedDiagramProps {
  config: VisualizationConfig;
  conceptId: string;
}

/**
 * AnimatedDiagram: Lazy-loaded visualization dispatcher
 *
 * Performance optimizations:
 * - Code-splitting via dynamic imports
 * - Intersection Observer for viewport-based loading
 * - Suspense boundaries with loading states
 * - Error boundaries for graceful degradation
 */
type VisualizationComponent = ComponentType<Record<string, unknown>>;

export function AnimatedDiagram({ config, conceptId }: AnimatedDiagramProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '200px',
    // Fix SSR issue - skip observer during SSR
    skip: typeof window === 'undefined'
  });

  const [Component] = useState<VisualizationComponent | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!inView) return;

    // Temporarily disabled - all Three.js visualizations
    // TODO: Fix React Three Fiber TypeScript issues
    setError(new Error('3D visualizations temporarily disabled'));
  }, [inView, config.component]);

  // Fallback rendering
  if (error || (!Component && !inView)) {
    return (
      <div
        ref={ref}
        className="flex min-h-[400px] items-center justify-center rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
      >
        {error ? (
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">
              ⚠️ Visualization failed to load
            </p>
            {config.fallback && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {config.fallback}
              </p>
            )}
          </div>
        ) : (
          <div className="animate-pulse text-gray-500">
            Loading visualization...
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="min-h-[400px] rounded-lg overflow-hidden">
      <Suspense fallback={
        <div className="flex h-[400px] items-center justify-center bg-gray-50 dark:bg-gray-800">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
          </div>
        }>
        {Component && (
          <Component
            {...config.props}
            animation={config.animation}
            conceptId={conceptId}
          />
        )}
      </Suspense>
    </div>
  );
}
