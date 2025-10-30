/**
 * Cache Management System
 * Provides multi-layer caching with TTL and automatic invalidation
 */

import { isBrowser } from './helpers';

export interface CacheEntry<T> {
  value: T;
  timestamp: number;
  ttl: number;
  accessCount: number;
  lastAccess: number;
}

export interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  hitRate: number;
}

class CacheManager {
  private memoryCache: Map<string, CacheEntry<unknown>> = new Map();
  private stats = { hits: 0, misses: 0 };
  private readonly maxSize: number = 100;
  private readonly defaultTTL: number = 5 * 60 * 1000; // 5 minutes

  /**
   * Set a value in cache with TTL
   */
  set<T>(key: string, value: T, ttl?: number): void {
    const entry: CacheEntry<T> = {
      value,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
      accessCount: 0,
      lastAccess: Date.now(),
    };

    // Enforce max size using LRU strategy
    if (this.memoryCache.size >= this.maxSize) {
      this.evictLRU();
    }

    this.memoryCache.set(key, entry);
    this.persistToStorage(key, entry);
  }

  /**
   * Get a value from cache
   */
  get<T>(key: string): T | null {
    // Try memory cache first
    let entry = this.memoryCache.get(key) as CacheEntry<T> | undefined;

    // If not in memory, try storage
    if (!entry && isBrowser()) {
      const stored = this.loadFromStorage<T>(key);
      if (stored) {
        entry = stored;
        this.memoryCache.set(key, entry);
      }
    }

    if (!entry) {
      this.stats.misses++;
      return null;
    }

    // Check if expired
    if (this.isExpired(entry)) {
      this.delete(key);
      this.stats.misses++;
      return null;
    }

    // Update access stats
    entry.accessCount++;
    entry.lastAccess = Date.now();
    this.stats.hits++;

    return entry.value;
  }

  /**
   * Check if key exists and is not expired
   */
  has(key: string): boolean {
    const entry = this.memoryCache.get(key);
    if (!entry) return false;
    
    if (this.isExpired(entry)) {
      this.delete(key);
      return false;
    }
    
    return true;
  }

  /**
   * Delete a key from cache
   */
  delete(key: string): boolean {
    this.memoryCache.delete(key);
    
    if (isBrowser()) {
      localStorage.removeItem(`cache:${key}`);
    }
    
    return true;
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.memoryCache.clear();
    this.stats = { hits: 0, misses: 0 };
    
    if (isBrowser()) {
      const keys = Object.keys(localStorage).filter(key => key.startsWith('cache:'));
      keys.forEach(key => localStorage.removeItem(key));
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    return {
      hits: this.stats.hits,
      misses: this.stats.misses,
      size: this.memoryCache.size,
      hitRate: this.stats.hits / (this.stats.hits + this.stats.misses) || 0,
    };
  }

  /**
   * Get all keys in cache
   */
  keys(): string[] {
    return Array.from(this.memoryCache.keys());
  }

  /**
   * Check if entry is expired
   */
  private isExpired(entry: CacheEntry<unknown>): boolean {
    return Date.now() - entry.timestamp > entry.ttl;
  }

  /**
   * Evict least recently used entry
   */
  private evictLRU(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    this.memoryCache.forEach((entry, key) => {
      if (entry.lastAccess < oldestTime) {
        oldestTime = entry.lastAccess;
        oldestKey = key;
      }
    });

    if (oldestKey) {
      this.delete(oldestKey);
    }
  }

  /**
   * Persist entry to localStorage
   */
  private persistToStorage(key: string, entry: CacheEntry<unknown>): void {
    if (!isBrowser()) return;

    try {
      localStorage.setItem(`cache:${key}`, JSON.stringify(entry));
    } catch {
      // Storage full or unavailable, silently fail
    }
  }

  /**
   * Load entry from localStorage
   */
  private loadFromStorage<T>(key: string): CacheEntry<T> | null {
    if (!isBrowser()) return null;

    try {
      const stored = localStorage.getItem(`cache:${key}`);
      if (!stored) return null;

      const entry = JSON.parse(stored) as CacheEntry<T>;
      
      // Check if expired
      if (this.isExpired(entry)) {
        localStorage.removeItem(`cache:${key}`);
        return null;
      }

      return entry;
    } catch {
      return null;
    }
  }

  /**
   * Clean up expired entries
   */
  cleanup(): void {
    const expiredKeys: string[] = [];

    this.memoryCache.forEach((entry, key) => {
      if (this.isExpired(entry)) {
        expiredKeys.push(key);
      }
    });

    expiredKeys.forEach(key => this.delete(key));
  }

  /**
   * Get or set pattern
   */
  async getOrSet<T>(
    key: string,
    factory: () => Promise<T> | T,
    ttl?: number
  ): Promise<T> {
    const cached = this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const value = await factory();
    this.set(key, value, ttl);
    return value;
  }

  /**
   * Invalidate cache by pattern
   */
  invalidatePattern(pattern: string): number {
    const regex = new RegExp(pattern);
    let count = 0;

    const keysToDelete: string[] = [];
    this.memoryCache.forEach((_, key) => {
      if (regex.test(key)) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => {
      this.delete(key);
      count++;
    });

    return count;
  }

  /**
   * Get cache size in bytes (approximate)
   */
  getSize(): number {
    let size = 0;
    this.memoryCache.forEach(entry => {
      size += JSON.stringify(entry).length;
    });
    return size;
  }

  /**
   * Export cache for debugging
   */
  export(): Record<string, CacheEntry<unknown>> {
    const exported: Record<string, CacheEntry<unknown>> = {};
    this.memoryCache.forEach((value, key) => {
      exported[key] = value;
    });
    return exported;
  }
}

// Singleton instance
export const cacheManager = new CacheManager();

// Convenience functions
export function setCache<T>(key: string, value: T, ttl?: number): void {
  cacheManager.set(key, value, ttl);
}

export function getCache<T>(key: string): T | null {
  return cacheManager.get<T>(key);
}

export function deleteCache(key: string): boolean {
  return cacheManager.delete(key);
}

export function clearCache(): void {
  cacheManager.clear();
}

export function getCacheStats(): CacheStats {
  return cacheManager.getStats();
}

export async function getCacheOrSet<T>(
  key: string,
  factory: () => Promise<T> | T,
  ttl?: number
): Promise<T> {
  return cacheManager.getOrSet(key, factory, ttl);
}

/**
 * Decorator for caching function results
 */
export function cached(ttl?: number) {
  return function <T extends (...args: Parameters<T>) => ReturnType<T>>(
    _target: unknown,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: Parameters<T>) {
      const cacheKey = `method:${_propertyKey}:${JSON.stringify(args)}`;
      
      const cached = getCache<ReturnType<T>>(cacheKey);
      if (cached !== null) {
        return cached;
      }

      const result = await originalMethod.apply(this, args);
      setCache(cacheKey, result, ttl);
      return result;
    };

    return descriptor;
  };
}

/**
 * HTTP response cache
 */
export class HttpCache {
  private static instance: HttpCache;
  private cache = new Map<string, { data: unknown; etag?: string; timestamp: number }>();

  static getInstance(): HttpCache {
    if (!HttpCache.instance) {
      HttpCache.instance = new HttpCache();
    }
    return HttpCache.instance;
  }

  async fetch(url: string, options?: RequestInit): Promise<Response> {
    const cacheKey = `${url}:${JSON.stringify(options || {})}`;
    const cached = this.cache.get(cacheKey);

    // Add If-None-Match header if we have an etag
    if (cached?.etag) {
      options = {
        ...options,
        headers: {
          ...options?.headers,
          'If-None-Match': cached.etag,
        },
      };
    }

    const response = await fetch(url, options);

    // 304 Not Modified - use cached data
    if (response.status === 304 && cached) {
      return new Response(JSON.stringify(cached.data), {
        status: 200,
        headers: response.headers,
      });
    }

    // Cache successful responses
    if (response.ok) {
      const data = await response.clone().json();
      const etag = response.headers.get('etag') || undefined;

      this.cache.set(cacheKey, {
        data,
        etag,
        timestamp: Date.now(),
      });
    }

    return response;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const httpCache = HttpCache.getInstance();

// Setup periodic cleanup
if (isBrowser()) {
  setInterval(() => {
    cacheManager.cleanup();
  }, 60000); // Cleanup every minute
}
