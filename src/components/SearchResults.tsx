'use client';

import type { SearchResult } from '@/lib/search';
import { highlightMatches } from '@/lib/search/fuzzyMatch';
import React from 'react';

interface SearchResultsProps {
  results: SearchResult[];
  selectedIndex: number;
  query: string;
  onResultSelect: (result: SearchResult) => void;
}

export function SearchResults({ results, selectedIndex, query, onResultSelect }: SearchResultsProps) {
  return (
    <div
      className="absolute mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-xl max-h-[420px] overflow-y-auto z-50"
      role="listbox"
    >
      {results.map((result, index) => {
        const isSelected = index === selectedIndex;
        return (
          <button
            key={result.id}
            type="button"
            role="option"
            aria-selected={isSelected}
            onClick={() => onResultSelect(result)}
            className={`w-full text-left px-4 py-3 transition-colors ${
              isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="font-semibold text-gray-900" dangerouslySetInnerHTML={{
                __html: highlightMatches(result.title, query)
              }} />
              <span className="text-xs uppercase tracking-wide text-gray-400">{result.sectionTitle}</span>
            </div>
            <p
              className="mt-1 text-sm text-gray-600"
              dangerouslySetInnerHTML={{ __html: highlightMatches(result.excerpt, query) }}
            />
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-400">
              <span className="rounded-full bg-gray-100 px-2 py-0.5">{result.type}</span>
              {result.keywords.slice(0, 3).map((keyword) => (
                <span key={keyword} className="rounded-full bg-gray-100 px-2 py-0.5">
                  #{keyword}
                </span>
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}
