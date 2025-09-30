/**
 * Fuzzy matching utilities for Vibe Wiki search
 */

export interface FuzzyMatchResult {
  score: number;
  matches: number[];
}

/**
 * Performs fuzzy matching between a query and text
 */
export function fuzzyMatch(query: string, text: string): FuzzyMatchResult | null {
  const normalizedQuery = query.toLowerCase();
  const normalizedText = text.toLowerCase();

  let queryIndex = 0;
  let textIndex = 0;
  let score = 0;
  const matches: number[] = [];

  while (queryIndex < normalizedQuery.length && textIndex < normalizedText.length) {
    if (normalizedQuery[queryIndex] === normalizedText[textIndex]) {
      matches.push(textIndex);
      score += normalizedQuery.length - queryIndex;
      queryIndex += 1;
    }
    textIndex += 1;
  }

  return queryIndex === normalizedQuery.length ? { score, matches } : null;
}

/**
 * Returns an excerpt around the matched text
 */
export function getExcerpt(text: string, query: string, maxLength = 100): string {
  if (!query) {
    return text.substring(0, maxLength) + (text.length > maxLength ? '...' : '');
  }

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) {
    return text.substring(0, maxLength) + (text.length > maxLength ? '...' : '');
  }

  const start = Math.max(0, index - 30);
  const end = Math.min(text.length, index + query.length + 70);

  let excerpt = text.substring(start, end);
  if (start > 0) excerpt = `...${excerpt}`;
  if (end < text.length) excerpt = `${excerpt}...`;

  return excerpt;
}

/**
 * Highlight matched query portions in text (for client-side rendering)
 */
export function highlightMatches(text: string, query: string): string {
  if (!query || !text) {
    return text;
  }

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  return text.replace(regex, '<mark class="search-highlight">$1</mark>');
}
