# Utility Systems API Documentation

This document provides comprehensive documentation for the enhanced utility systems added to Vibe Wiki.

## Table of Contents

- [Error Tracking System](#error-tracking-system)
- [Performance Monitoring System](#performance-monitoring-system)
- [Validation & Sanitization](#validation--sanitization)
- [Cache Management System](#cache-management-system)

---

## Error Tracking System

**Location**: `src/lib/utils/errorTracking.ts`

### Overview

The Error Tracking System provides centralized error handling, automatic categorization, and reporting capabilities. It tracks errors both online and offline, with automatic retry mechanisms.

### Features

- Automatic error categorization (network, runtime, syntax, component, user)
- Severity detection (low, medium, high, critical)
- Offline error queue with retry mechanism
- Global error handlers for uncaught errors and promise rejections
- Statistics and reporting

### API

#### `trackError(error, metadata?)`

Track an error with automatic categorization.

```typescript
import { trackError } from '@/lib/utils/errorTracking';

try {
  // risky operation
} catch (error) {
  trackError(error, { userId: '123', context: 'payment' });
}
```

#### `trackCustomError(report)`

Track a custom error report with specific details.

```typescript
import { trackCustomError } from '@/lib/utils/errorTracking';

trackCustomError({
  message: 'Payment processing failed',
  severity: 'high',
  category: 'network',
  metadata: { orderId: '456', amount: 99.99 }
});
```

#### `getErrorStats()`

Get error statistics including total count, severity breakdown, and category breakdown.

```typescript
import { getErrorStats } from '@/lib/utils/errorTracking';

const stats = getErrorStats();
console.log(`Total errors: ${stats.total}`);
console.log(`Critical: ${stats.bySeverity.critical || 0}`);
```

#### `clearErrorQueue()`

Clear all errors from the queue.

```typescript
import { clearErrorQueue } from '@/lib/utils/errorTracking';

clearErrorQueue();
```

### Error Report Interface

```typescript
interface ErrorReport {
  message: string;
  stack?: string;
  timestamp: number;
  userAgent?: string;
  url?: string;
  componentStack?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'network' | 'runtime' | 'syntax' | 'component' | 'user' | 'unknown';
  metadata?: Record<string, unknown>;
}
```

---

## Performance Monitoring System

**Location**: `src/lib/utils/performanceMonitor.ts`

### Overview

The Performance Monitoring System tracks and analyzes application performance metrics, including resource timing, navigation timing, and Web Vitals.

### Features

- Performance marks and measures
- Resource timing analysis
- Navigation timing metrics
- First Paint and First Contentful Paint tracking
- Long task detection (>50ms)
- Layout shift monitoring (CLS)
- Performance report generation

### API

#### `markPerformance(name, metadata?)`

Create a performance mark at a specific point in time.

```typescript
import { markPerformance } from '@/lib/utils/performanceMonitor';

markPerformance('user-action-start', { action: 'checkout' });
// ... perform action
markPerformance('user-action-end');
```

#### `measurePerformance(name, startMark, endMark)`

Measure the time between two marks.

```typescript
import { measurePerformance } from '@/lib/utils/performanceMonitor';

const duration = measurePerformance(
  'checkout-duration',
  'user-action-start',
  'user-action-end'
);
console.log(`Action took ${duration}ms`);
```

#### `getPerformanceMetrics()`

Get all performance metrics including marks, measures, and resource timing.

```typescript
import { getPerformanceMetrics } from '@/lib/utils/performanceMonitor';

const metrics = getPerformanceMetrics();
console.log(`Total marks: ${metrics.marks.length}`);
console.log(`Total resources: ${metrics.resourceTiming.length}`);
```

#### `generatePerformanceReport()`

Generate a human-readable performance report.

```typescript
import { generatePerformanceReport } from '@/lib/utils/performanceMonitor';

const report = generatePerformanceReport();
console.log(report);
```

#### Component Usage Example

```typescript
import { markPerformance, measurePerformance } from '@/lib/utils/performanceMonitor';

function MyComponent() {
  useEffect(() => {
    markPerformance('component-mount-start');
    
    return () => {
      markPerformance('component-mount-end');
      measurePerformance('component-mount', 'component-mount-start', 'component-mount-end');
    };
  }, []);
  
  // ...
}
```

---

## Validation & Sanitization

**Location**: `src/lib/utils/validation.ts`

### Overview

Comprehensive validation and sanitization utilities for secure data handling.

### Security Features

- XSS prevention through proper HTML escaping
- RFC 5322 compliant email validation
- Secure HTML stripping using DOMParser
- Input sanitization and length limits

### API

#### Email Validation

```typescript
import { isValidEmail } from '@/lib/utils/validation';

if (isValidEmail('user@example.com')) {
  // Valid email
}
```

#### URL Validation

```typescript
import { isValidUrl } from '@/lib/utils/validation';

if (isValidUrl('https://example.com')) {
  // Valid URL
}
```

#### HTML Escaping (XSS Prevention)

```typescript
import { escapeHtml } from '@/lib/utils/validation';

const userInput = '<script>alert("xss")</script>';
const safe = escapeHtml(userInput);
// Output: &lt;script&gt;alert("xss")&lt;/script&gt;
```

#### HTML Stripping

```typescript
import { stripHtml } from '@/lib/utils/validation';

const html = '<p>Hello <strong>World</strong></p>';
const text = stripHtml(html);
// Output: "Hello World"
```

#### Input Sanitization

```typescript
import { sanitizeInput } from '@/lib/utils/validation';

const userInput = '  <script>alert("xss")</script>  ';
const clean = sanitizeInput(userInput, 100);
// Output: "scriptalert(\"xss\")/script" (dangerous characters removed)
```

#### Password Strength Validation

```typescript
import { validatePasswordStrength } from '@/lib/utils/validation';

const result = validatePasswordStrength('MyP@ssw0rd!');
console.log(result.strength); // 'strong'
console.log(result.isValid);  // true
console.log(result.feedback); // [] (no feedback means all checks passed)
```

#### Slug Generation

```typescript
import { toSlug } from '@/lib/utils/validation';

const slug = toSlug('Hello World! 123');
// Output: "hello-world-123"
```

#### Rate Limiting

```typescript
import { createRateLimiter } from '@/lib/utils/validation';

const limiter = createRateLimiter(5, 60000); // 5 calls per minute

if (limiter()) {
  // Action allowed
} else {
  // Rate limit exceeded
}
```

#### Debounce & Throttle

```typescript
import { debounce, throttle } from '@/lib/utils/validation';

// Debounce: Wait for user to stop typing
const debouncedSearch = debounce((query: string) => {
  performSearch(query);
}, 300);

// Throttle: Limit scroll event handling
const throttledScroll = throttle(() => {
  handleScroll();
}, 100);
```

#### Memoization

```typescript
import { memoize } from '@/lib/utils/validation';

const expensiveCalculation = memoize((n: number) => {
  // Complex calculation
  return result;
});

// First call: calculates
const result1 = expensiveCalculation(10);

// Second call: returns cached result
const result2 = expensiveCalculation(10);
```

---

## Cache Management System

**Location**: `src/lib/utils/cache.ts`

### Overview

Multi-layer caching system with memory and localStorage support, TTL, and LRU eviction.

### Features

- Dual-layer caching (memory + localStorage)
- TTL (Time To Live) support
- LRU (Least Recently Used) eviction
- Cache statistics and hit rate tracking
- Pattern-based invalidation
- HTTP response caching with ETags

### API

#### Basic Cache Operations

```typescript
import { setCache, getCache, deleteCache } from '@/lib/utils/cache';

// Set value with 5-minute TTL
setCache('user-profile', userData, 5 * 60 * 1000);

// Get value
const profile = getCache<UserProfile>('user-profile');

// Delete value
deleteCache('user-profile');
```

#### Get or Set Pattern

```typescript
import { getCacheOrSet } from '@/lib/utils/cache';

const userData = await getCacheOrSet(
  'user-123',
  async () => {
    // This function only runs if cache miss
    return await fetchUserData(123);
  },
  5 * 60 * 1000 // 5 minutes TTL
);
```

#### Cache Statistics

```typescript
import { getCacheStats } from '@/lib/utils/cache';

const stats = getCacheStats();
console.log(`Hit rate: ${(stats.hitRate * 100).toFixed(2)}%`);
console.log(`Cache size: ${stats.size} entries`);
console.log(`Hits: ${stats.hits}, Misses: ${stats.misses}`);
```

#### Pattern-Based Invalidation

```typescript
import { cacheManager } from '@/lib/utils/cache';

// Invalidate all user caches
cacheManager.invalidatePattern('^user-');

// Invalidate all API caches
cacheManager.invalidatePattern('-api$');
```

#### HTTP Response Caching

```typescript
import { httpCache } from '@/lib/utils/cache';

// Automatically handles ETags and 304 Not Modified
const response = await httpCache.fetch('/api/data');
const data = await response.json();
```

#### Decorator Usage

```typescript
import { cached } from '@/lib/utils/cache';

class DataService {
  @cached(5 * 60 * 1000) // Cache for 5 minutes
  async fetchData(id: string) {
    return await api.get(`/data/${id}`);
  }
}
```

### Cache Entry Interface

```typescript
interface CacheEntry<T> {
  value: T;
  timestamp: number;
  ttl: number;
  accessCount: number;
  lastAccess: number;
}
```

---

## Best Practices

### Error Tracking

1. Always track errors in try-catch blocks for critical operations
2. Include relevant metadata for debugging
3. Use appropriate severity levels
4. Clear error queue periodically in production

### Performance Monitoring

1. Mark important user interactions
2. Measure critical rendering paths
3. Monitor long tasks and layout shifts
4. Generate reports for performance analysis
5. Clean up old marks and measures

### Validation

1. Always validate user input before processing
2. Escape HTML content from untrusted sources
3. Use appropriate validation for each data type
4. Apply rate limiting to sensitive operations
5. Sanitize filenames and slugs

### Caching

1. Set appropriate TTLs based on data freshness requirements
2. Monitor cache hit rates and adjust strategy
3. Use pattern-based invalidation for related data
4. Clear cache on user logout or context changes
5. Consider memory limits for large applications

---

## Integration Examples

### Form Validation

```typescript
import { isValidEmail, validatePasswordStrength, sanitizeInput } from '@/lib/utils/validation';
import { trackError } from '@/lib/utils/errorTracking';

function validateForm(data: FormData) {
  const email = sanitizeInput(data.get('email') as string);
  const password = data.get('password') as string;
  
  if (!isValidEmail(email)) {
    trackError('Invalid email format', { email });
    return { valid: false, error: 'Invalid email' };
  }
  
  const passwordCheck = validatePasswordStrength(password);
  if (!passwordCheck.isValid) {
    trackError('Weak password', { feedback: passwordCheck.feedback });
    return { valid: false, error: passwordCheck.feedback[0] };
  }
  
  return { valid: true };
}
```

### API Call with Caching and Error Tracking

```typescript
import { getCacheOrSet } from '@/lib/utils/cache';
import { trackError } from '@/lib/utils/errorTracking';
import { markPerformance, measurePerformance } from '@/lib/utils/performanceMonitor';

async function fetchUserData(userId: string) {
  try {
    markPerformance(`api-start-${userId}`);
    
    const data = await getCacheOrSet(
      `user-${userId}`,
      async () => {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error('API request failed');
        return await response.json();
      },
      5 * 60 * 1000
    );
    
    markPerformance(`api-end-${userId}`);
    measurePerformance(`api-duration-${userId}`, `api-start-${userId}`, `api-end-${userId}`);
    
    return data;
  } catch (error) {
    trackError(error as Error, { userId, endpoint: '/api/users' });
    throw error;
  }
}
```

---

## Performance Considerations

### Error Tracking

- **Queue Size**: Limited to 50 errors to prevent memory issues
- **Retry Mechanism**: Automatic retry with exponential backoff
- **Storage**: Uses localStorage for offline persistence

### Performance Monitoring

- **Memory Impact**: Minimal, old metrics are automatically cleaned
- **CPU Impact**: Negligible with native Performance API
- **Observer Cost**: Long task and layout shift observers are optional

### Validation

- **Regex Performance**: All regex patterns are optimized for speed
- **Memory**: No significant memory overhead
- **CPU**: Validation functions are O(n) or better

### Caching

- **Memory Limit**: Default 100 entries with LRU eviction
- **Storage Limit**: Uses localStorage with graceful fallback
- **Hit Rate**: Typical 70-90% for well-cached data
- **Cleanup**: Automatic cleanup every minute

---

## Troubleshooting

### Error Tracking Not Working

- Check browser console for initialization errors
- Verify localStorage is enabled
- Check for Content Security Policy restrictions

### Cache Not Persisting

- Verify localStorage quota (typically 5-10MB)
- Check for private browsing mode
- Ensure cache keys are consistent

### Performance Marks Missing

- Verify Performance API is supported
- Check for mark name collisions
- Ensure marks are created before measures

---

## License

These utility systems are part of the Vibe Wiki project and follow the project's license terms.
