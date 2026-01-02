'use client';

import type { VisualizationConfig } from '@/lib/content/schema';
import type { ComponentType } from 'react';
import { Suspense, useState } from 'react';

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
  const [Component] = useState<VisualizationComponent | null>(null);

  // Show fallback when component is not loaded
  // 3D visualizations are currently disabled, so we show the fallback text
  if (!Component) {
    return (
      <div
        className="flex min-h-[400px] items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-8"
      >
        <div className="text-center max-w-2xl">
          {config.fallback ? (
            <>
              <div className="text-4xl mb-4">📊</div>
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                Visual Concept Preview
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {config.fallback}
              </p>
            </>
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-4">🎨</div>
              <p className="text-gray-600 dark:text-gray-400">
                Interactive visualization for this concept
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[400px] rounded-lg overflow-hidden">
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
