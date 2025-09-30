'use client';

import dynamic from 'next/dynamic';
import type { ConceptDefinition } from '@/lib/content/schema';

// Dynamic import with SSR disabled for client-only components
const ConceptCard = dynamic(
  () => import('./ConceptCard').then(mod => ({ default: mod.ConceptCard })),
  {
    ssr: false,
    loading: () => (
      <div className="concept-card relative rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-900">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
          </div>
        </div>
      </div>
    )
  }
);

interface ConceptCardClientProps {
  concept: ConceptDefinition;
}

/**
 * ConceptCardClient: Client-side wrapper for ConceptCard to handle SSR
 * This ensures the interactive components load only in the browser
 */
export function ConceptCardClient({ concept }: ConceptCardClientProps) {
  return <ConceptCard concept={concept} />;
}
