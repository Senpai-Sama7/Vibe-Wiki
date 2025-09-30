import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ConceptCardClient } from '@/components/ConceptCardClient';
import { contentManifest, getConceptBySlug, getRelatedConcepts } from '@/lib/content/concepts';

interface ConceptPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate metadata for concept pages
 */
export async function generateMetadata({ params }: ConceptPageProps): Promise<Metadata> {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);

  if (!concept) {
    return {
      title: 'Concept Not Found | Vibe Wiki',
      description: 'The requested concept could not be found.',
    };
  }

  return {
    title: `${concept.title} | Vibe Wiki`,
    description: concept.metaDescription,
    keywords: concept.tags,
    openGraph: {
      title: concept.title,
      description: concept.metaDescription,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: concept.title,
      description: concept.metaDescription,
    },
  };
}

/**
 * Generate static params for all concepts
 */
export async function generateStaticParams() {
  return contentManifest.concepts.map(({ slug }) => ({ slug }));
}

/**
 * ConceptPage: Individual concept display page
 *
 * Features:
 * - Full concept card display
 * - Related concepts suggestions
 * - SEO optimized metadata
 * - Static generation for all concepts
 */
export default async function ConceptPage({ params }: ConceptPageProps) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);

  if (!concept) {
    notFound();
  }

  const relatedConcepts = getRelatedConcepts(concept.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-gray-900 dark:text-white font-medium">
                {concept.title}
              </li>
            </ol>
          </nav>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {concept.title}
              </h1>
              {concept.subtitle && (
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                  {concept.subtitle}
                </p>
              )}
            </div>

            {/* Category Badge */}
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {concept.category.charAt(0).toUpperCase() + concept.category.slice(1)}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Primary Concept */}
          <div className="lg:col-span-2">
            <ConceptCardClient concept={concept} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Concept Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Concept Details
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Difficulty
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-white mt-1">
                    {concept.difficultyLevel}/5
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Estimated Time
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-white mt-1">
                    {concept.estimatedTime} minutes
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Last Updated
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-white mt-1">
                    {new Date(concept.lastUpdated).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Tags
                  </dt>
                  <dd className="flex flex-wrap gap-2 mt-1">
                    {concept.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Related Concepts */}
            {relatedConcepts.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Related Concepts
                </h3>
                <div className="space-y-3">
                  {relatedConcepts.map(relatedConcept => (
                    <Link
                      key={relatedConcept.id}
                      href={`/concept/${relatedConcept.slug}`}
                      className="block p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
                    >
                      <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {relatedConcept.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {relatedConcept.subtitle || 'Learn more about this concept'}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Prerequisites */}
            {concept.prerequisites && concept.prerequisites.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Prerequisites
                </h3>
                <ul className="space-y-2">
                  {concept.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {prereq}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
