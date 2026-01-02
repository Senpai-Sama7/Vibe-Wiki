'use client';

import { searchConcepts, type SearchResult } from '@/lib/search';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SearchResults } from './SearchResults';

interface SearchBoxProps {
  placeholder?: string;
  className?: string;
}

export function SearchBox({
  placeholder = 'Search concepts, stacks, frameworks...',
  className = ''
}: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const performSearch = useCallback((q: string) => {
    if (q.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchResults = searchConcepts(q);
    setResults(searchResults);
    setIsOpen(true);
    setSelectedIndex(-1);
  }, []);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      performSearch(query);
    }, 150);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [performSearch, query]);

  const handleResultSelect = useCallback((result: SearchResult) => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);

    router.push(`/concept/${result.slug}/`);
  }, [router]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen) return;
      switch (event.key) {
        case 'Escape': {
          setIsOpen(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
        }
        case 'ArrowDown': {
          if (results.length === 0) break;
          event.preventDefault();
          setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
          break;
        }
        case 'ArrowUp': {
          if (results.length === 0) break;
          event.preventDefault();
          setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
          break;
        }
        case 'Enter': {
          if (selectedIndex >= 0) {
            event.preventDefault();
            handleResultSelect(results[selectedIndex]);
          }
          break;
        }
        default:
      }
    },
    [handleResultSelect, isOpen, results, selectedIndex]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFocus = useCallback(() => {
    if (query.length >= 2) {
      setIsOpen(true);
    }
  }, [query]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <label htmlFor="global-search" className="sr-only">
        Search concepts
      </label>
      <input
        id="global-search"
        ref={inputRef}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-base shadow-sm backdrop-blur transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
        autoComplete="off"
      />

      {isOpen && results.length > 0 && (
        <SearchResults
          results={results}
          selectedIndex={selectedIndex}
          query={query}
          onResultSelect={handleResultSelect}
        />
      )}
    </div>
  );
}
