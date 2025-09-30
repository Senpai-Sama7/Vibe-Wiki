import { SearchBox } from '@/components/SearchBox';
import { SearchSuggestions } from '@/components/SearchSuggestions';
import { getSearchSuggestions } from '@/lib/search';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search | Vibe Wiki',
  description: 'Search concepts, stacks, frameworks, and development patterns across the Vibe Wiki knowledge base.',
};

export default function SearchPage() {
  const suggestions = getSearchSuggestions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/5 bg-white/10 p-10 backdrop-blur">
          <header className="text-center text-white">
            <p className="text-sm uppercase tracking-[0.35em] text-blue-200">Discover</p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Advanced Search</h1>
            <p className="mt-4 text-lg text-white/70">
              Instantly explore concepts, stacks, frameworks, comparisons, and code examples across Vibe Wiki.
            </p>
          </header>

          <div className="mx-auto mt-10 max-w-2xl">
            <SearchBox className="w-full" placeholder="Start typing to search the knowledge base..." />
          </div>

          <section className="mt-12 grid gap-6 text-sm text-white/80 md:grid-cols-2">
            <SearchSuggestions suggestions={suggestions} />

            <div className="rounded-2xl bg-white/5 p-6">
              <h2 className="mb-3 text-lg font-semibold text-white">Search tips</h2>
              <ul className="space-y-2">
                <li>• Start typing to see real-time results</li>
                <li>• Use ↑ and ↓ to navigate results, Enter to select</li>
                <li>• Press Escape to close the results panel</li>
                <li>• Search covers titles, explanations, comparisons, and code</li>
                <li>• Try tags like <span className="font-semibold">React</span>, <span className="font-semibold">API</span>, or <span className="font-semibold">CI/CD</span></li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
