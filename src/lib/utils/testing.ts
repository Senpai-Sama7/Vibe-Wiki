/**
 * Testing Utilities
 * Helper functions for unit and integration tests
 */

import { ConceptDefinition } from '@/lib/content/schema';

/**
 * Create mock concept for testing
 */
export function createMockConcept(overrides?: Partial<ConceptDefinition>): ConceptDefinition {
  return {
    id: 'test-concept-001',
    slug: 'test-concept',
    title: 'Test Concept',
    subtitle: 'A test concept for unit testing',
    category: 'patterns',
    explanations: {
      elementary: 'This is a simple explanation',
      analogical: 'This is like a real-world example',
      technical: 'This is a technical deep-dive',
    },
    visualization: {
      type: 'diagram-flow',
      component: 'TestVisualization',
      animation: {
        duration: 2,
        easing: 'ease-in-out',
      },
      fallback: 'Test visualization fallback',
    },
    codeExamples: [
      {
        language: 'javascript',
        code: 'console.log("Hello, World!");',
        title: 'Basic Example',
      },
    ],
    comparison: [
      {
        name: 'Option A',
        pros: ['Pro 1', 'Pro 2'],
        cons: ['Con 1'],
        useCase: 'Use case A',
      },
      {
        name: 'Option B',
        pros: ['Pro 1'],
        cons: ['Con 1', 'Con 2'],
        useCase: 'Use case B',
      },
    ],
    relatedConcepts: ['related-1', 'related-2'],
    prerequisites: ['prereq-1'],
    difficultyLevel: 3,
    estimatedTime: 15,
    tags: ['test', 'mock', 'example'],
    metaDescription: 'A test concept for unit testing',
    lastUpdated: '2025-01-01T00:00:00Z',
    ...overrides,
  };
}

/**
 * Wait for condition to be true (async)
 */
export async function waitFor(
  condition: () => boolean,
  timeout = 5000,
  interval = 100
): Promise<void> {
  const startTime = Date.now();

  while (!condition()) {
    if (Date.now() - startTime > timeout) {
      throw new Error('Timeout waiting for condition');
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
}

/**
 * Create mock localStorage
 */
export function createMockLocalStorage(): Storage {
  let store: Record<string, string> = {};

  return {
    getItem(key: string): string | null {
      return store[key] || null;
    },
    setItem(key: string, value: string): void {
      store[key] = value.toString();
    },
    removeItem(key: string): void {
      delete store[key];
    },
    clear(): void {
      store = {};
    },
    get length(): number {
      return Object.keys(store).length;
    },
    key(index: number): string | null {
      const keys = Object.keys(store);
      return keys[index] || null;
    },
  };
}

/**
 * Create mock intersection observer
 */
export function createMockIntersectionObserver(): typeof IntersectionObserver {
  return class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];

    constructor(
      public callback: IntersectionObserverCallback,
      public options?: IntersectionObserverInit
    ) {}

    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  };
}

/**
 * Create mock resize observer
 */
export function createMockResizeObserver(): typeof ResizeObserver {
  return class MockResizeObserver implements ResizeObserver {
    constructor(public callback: ResizeObserverCallback) {}

    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  };
}

/**
 * Mock fetch response
 */
export function createMockFetchResponse<T>(data: T, options?: Partial<Response>): Response {
  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: new Headers(),
    redirected: false,
    type: 'basic',
    url: '',
    json: async () => data,
    text: async () => JSON.stringify(data),
    blob: async () => new Blob([JSON.stringify(data)]),
    arrayBuffer: async () => new ArrayBuffer(0),
    formData: async () => new FormData(),
    clone: () => createMockFetchResponse(data, options),
    body: null,
    bodyUsed: false,
    ...options,
  } as Response;
}

/**
 * Suppress console during tests
 */
export function suppressConsole(): () => void {
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug,
  };

  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.info = () => {};
  console.debug = () => {};

  return () => {
    console.log = originalConsole.log;
    console.warn = originalConsole.warn;
    console.error = originalConsole.error;
    console.info = originalConsole.info;
    console.debug = originalConsole.debug;
  };
}

/**
 * Generate test ID
 */
export function generateTestId(prefix = 'test'): string {
  return `${prefix}-${Math.random().toString(36).substring(7)}`;
}

/**
 * Create mock event
 */
export function createMockEvent<T extends Event>(
  type: string,
  properties?: Partial<T>
): T {
  const event = new Event(type) as T;
  return Object.assign(event, properties);
}

/**
 * Simulate async operation
 */
export function mockAsyncOperation<T>(
  result: T,
  delay = 100
): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => resolve(result), delay);
  });
}

/**
 * Mock timer
 */
export class MockTimer {
  private timers: Map<number, NodeJS.Timeout> = new Map();
  private nextId = 1;

  setTimeout(callback: () => void, delay: number): number {
    const id = this.nextId++;
    const timeout = setTimeout(() => {
      callback();
      this.timers.delete(id);
    }, delay);
    this.timers.set(id, timeout);
    return id;
  }

  clearTimeout(id: number): void {
    const timeout = this.timers.get(id);
    if (timeout) {
      clearTimeout(timeout);
      this.timers.delete(id);
    }
  }

  clearAll(): void {
    this.timers.forEach(timeout => clearTimeout(timeout));
    this.timers.clear();
  }

  get pendingCount(): number {
    return this.timers.size;
  }
}

/**
 * Test data generators
 */
export const testData = {
  randomString: (length = 10): string => {
    return Math.random().toString(36).substring(2, length + 2);
  },

  randomNumber: (min = 0, max = 100): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  randomBoolean: (): boolean => {
    return Math.random() > 0.5;
  },

  randomEmail: (): string => {
    return `test-${testData.randomString()}@example.com`;
  },

  randomDate: (start?: Date, end?: Date): Date => {
    const startTime = start ? start.getTime() : Date.now() - 365 * 24 * 60 * 60 * 1000;
    const endTime = end ? end.getTime() : Date.now();
    return new Date(startTime + Math.random() * (endTime - startTime));
  },

  randomArray: <T>(generator: () => T, length = 5): T[] => {
    return Array.from({ length }, generator);
  },
};

/**
 * Assert helpers
 */
export const assert = {
  isTrue: (value: boolean, message?: string): void => {
    if (!value) {
      throw new Error(message || 'Expected value to be true');
    }
  },

  isFalse: (value: boolean, message?: string): void => {
    if (value) {
      throw new Error(message || 'Expected value to be false');
    }
  },

  equals: <T>(actual: T, expected: T, message?: string): void => {
    if (actual !== expected) {
      throw new Error(
        message || `Expected ${expected} but got ${actual}`
      );
    }
  },

  notEquals: <T>(actual: T, expected: T, message?: string): void => {
    if (actual === expected) {
      throw new Error(
        message || `Expected values to not be equal: ${actual}`
      );
    }
  },

  deepEquals: <T>(actual: T, expected: T, message?: string): void => {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(
        message ||
          `Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`
      );
    }
  },

  throws: (fn: () => void, message?: string): void => {
    let didThrow = false;
    try {
      fn();
    } catch {
      didThrow = true;
    }
    if (!didThrow) {
      throw new Error(message || 'Expected function to throw');
    }
  },

  notThrows: (fn: () => void, message?: string): void => {
    try {
      fn();
    } catch (err) {
      throw new Error(message || `Expected function not to throw: ${err}`);
    }
  },
};
