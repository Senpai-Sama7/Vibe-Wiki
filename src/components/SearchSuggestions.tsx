'use client';

import React from 'react';

interface SearchSuggestionsProps {
  suggestions: string[];
}

export function SearchSuggestions({ suggestions }: SearchSuggestionsProps) {
  const handleSuggestionClick = (suggestion: string) => {
    const searchInput = document.getElementById('global-search') as HTMLInputElement | null;
    if (searchInput) {
      searchInput.value = suggestion;
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      searchInput.focus();
    }
  };

  return (
    <div className="rounded-2xl bg-white/5 p-6">
      <h2 className="mb-3 text-lg font-semibold text-white">Popular searches</h2>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold transition hover:border-white/40 hover:bg-white/10"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
