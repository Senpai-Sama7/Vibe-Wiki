import { contentManifest } from '../content/concepts';
import type { ConceptDefinition } from '../content/schema';
import { fuzzyMatch, getExcerpt } from './fuzzyMatch';

export type SearchItemType = 'concept' | 'explanation' | 'code' | 'comparison';

export interface SearchItem {
  id: string;
  slug: string;
  title: string;
  content: string;
  keywords: string[];
  category: ConceptDefinition['category'];
  type: SearchItemType;
  sectionTitle?: string;
}

export interface SearchResult extends SearchItem {
  score: number;
  matchType: 'title' | 'keyword' | 'content';
  excerpt: string;
}

class SearchIndex {
  private items: SearchItem[] = [];

  constructor() {
    this.buildIndex();
  }

  private buildIndex() {
    contentManifest.concepts.forEach((concept) => {
      this.indexConcept(concept);
    });

    console.log(`📚 Search index built with ${this.items.length} items`);
  }

  private indexConcept(concept: ConceptDefinition) {
    const categoryTitle = contentManifest.categories[concept.category]?.title ?? concept.category;

    // Base concept entry
    this.items.push({
      id: concept.id,
      slug: concept.slug,
      title: concept.title,
      content: `${concept.title} ${concept.subtitle ?? ''} ${concept.tags.join(' ')}`.trim(),
      keywords: concept.tags,
      category: concept.category,
      type: 'concept',
      sectionTitle: categoryTitle,
    });

    // Explanations
    Object.entries(concept.explanations).forEach(([mode, text]) => {
      this.items.push({
        id: `${concept.id}-explanation-${mode}`,
        slug: concept.slug,
        title: `${concept.title} (${mode})`,
        content: text,
        keywords: concept.tags,
        category: concept.category,
        type: 'explanation',
        sectionTitle: categoryTitle,
      });
    });

    // Code examples
    concept.codeExamples?.forEach((example, index) => {
      this.items.push({
        id: `${concept.id}-code-${index}`,
        slug: concept.slug,
        title: example.title ?? `Code Example ${index + 1}`,
        content: example.code,
        keywords: concept.tags,
        category: concept.category,
        type: 'code',
        sectionTitle: categoryTitle,
      });
    });

    // Comparisons
    concept.comparison?.forEach((comparison, index) => {
      this.items.push({
        id: `${concept.id}-comparison-${index}`,
        slug: concept.slug,
        title: comparison.name,
        content: `${comparison.name} ${comparison.pros.join(' ')} ${comparison.cons.join(' ')} ${comparison.useCase} ${comparison.performance ?? ''}`,
        keywords: concept.tags,
        category: concept.category,
        type: 'comparison',
        sectionTitle: categoryTitle,
      });
    });
  }

  search(query: string): SearchResult[] {
    if (!query || query.length < 2) {
      return [];
    }

    const lowerQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    this.items.forEach((item) => {
      if (item.title.toLowerCase().includes(lowerQuery)) {
        results.push({
          ...item,
          score: 1000,
          matchType: 'title',
          excerpt: getExcerpt(item.content, query),
        });
        return;
      }

      if (item.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery))) {
        results.push({
          ...item,
          score: 800,
          matchType: 'keyword',
          excerpt: getExcerpt(item.content, query),
        });
        return;
      }

      const fuzzyResult = fuzzyMatch(query, item.content);
      if (fuzzyResult && fuzzyResult.score > query.length * 2) {
        results.push({
          ...item,
          score: fuzzyResult.score,
          matchType: 'content',
          excerpt: getExcerpt(item.content, query),
        });
      }
    });

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, 10);
  }

  getAll(): SearchItem[] {
    return this.items;
  }
}

const searchIndex = new SearchIndex();

export function searchConcepts(query: string): SearchResult[] {
  return searchIndex.search(query);
}

export function getSearchSuggestions(): string[] {
    return [
      'Next.js',
      'React',
      'TypeScript',
      'JAMstack',
      'MERN',
      'CI/CD',
      'Testing',
      'Serverless',
      'GraphQL',
      'Web Performance'
    ];
}
