/**
 * Analytics and Performance Monitoring Utilities
 * Tracks user interactions, page views, and performance metrics
 */

import { isBrowser } from './helpers';

interface AnalyticsEvent {
  name: string;
  category: string;
  label?: string;
  value?: number;
  metadata?: Record<string, unknown>;
}

interface PageView {
  path: string;
  title: string;
  referrer?: string;
}

/**
 * Track analytics events (client-side only)
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (!isBrowser()) return;

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Event:', event);
  }

  // Send to analytics service (if configured)
  // Example: Google Analytics, Plausible, etc.
  if (typeof window.gtag === 'function') {
    window.gtag('event', event.name, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.metadata,
    });
  }

  // Store locally for offline tracking
  storeOfflineEvent(event);
}

/**
 * Track page views
 */
export function trackPageView(view: PageView): void {
  if (!isBrowser()) return;

  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Page view:', view);
  }

  // Send to analytics service
  if (typeof window.gtag === 'function') {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: view.path,
      page_title: view.title,
      page_referrer: view.referrer,
    });
  }
}

/**
 * Track learning mode changes
 */
export function trackModeChange(mode: string, conceptId: string): void {
  trackEvent({
    name: 'mode_change',
    category: 'Learning',
    label: `${conceptId}:${mode}`,
  });
}

/**
 * Track concept completion
 */
export function trackConceptCompletion(conceptId: string, timeSpent: number): void {
  trackEvent({
    name: 'concept_completed',
    category: 'Learning',
    label: conceptId,
    value: timeSpent,
    metadata: {
      conceptId,
      timeSpent,
    },
  });
}

/**
 * Track code example interactions
 */
export function trackCodeInteraction(action: 'copy' | 'view', language: string): void {
  trackEvent({
    name: 'code_interaction',
    category: 'Engagement',
    label: `${action}:${language}`,
  });
}

/**
 * Track search queries
 */
export function trackSearch(query: string, resultsCount: number): void {
  trackEvent({
    name: 'search',
    category: 'Search',
    label: query,
    value: resultsCount,
    metadata: {
      query,
      resultsCount,
    },
  });
}

/**
 * Track PWA installation
 */
export function trackPWAInstall(): void {
  trackEvent({
    name: 'pwa_install',
    category: 'PWA',
    label: 'installed',
  });
}

/**
 * Track errors
 */
export function trackError(error: Error, context?: string): void {
  trackEvent({
    name: 'error',
    category: 'Error',
    label: context,
    metadata: {
      message: error.message,
      stack: error.stack,
      context,
    },
  });
}

/**
 * Store events offline for later sync
 */
function storeOfflineEvent(event: AnalyticsEvent): void {
  try {
    const stored = localStorage.getItem('vibe-wiki:offline-events');
    const events: AnalyticsEvent[] = stored ? JSON.parse(stored) : [];
    events.push(event);

    // Keep only last 100 events
    if (events.length > 100) {
      events.shift();
    }

    localStorage.setItem('vibe-wiki:offline-events', JSON.stringify(events));
  } catch (error) {
    console.warn('Failed to store offline event:', error);
  }
}

/**
 * Sync offline events when back online
 */
export function syncOfflineEvents(): void {
  if (!isBrowser()) return;

  try {
    const stored = localStorage.getItem('vibe-wiki:offline-events');
    if (!stored) return;

    const events: AnalyticsEvent[] = JSON.parse(stored);
    if (events.length === 0) return;

    // Send all stored events
    events.forEach(event => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', event.name, {
          event_category: event.category,
          event_label: event.label,
          value: event.value,
          ...event.metadata,
        });
      }
    });

    // Clear stored events
    localStorage.removeItem('vibe-wiki:offline-events');
  } catch (error) {
    console.warn('Failed to sync offline events:', error);
  }
}

/**
 * Performance monitoring
 */
export function measurePerformance(name: string, callback: () => void): void {
  if (!isBrowser() || !performance.mark) return;

  const startMark = `${name}-start`;
  const endMark = `${name}-end`;

  performance.mark(startMark);
  callback();
  performance.mark(endMark);

  performance.measure(name, startMark, endMark);

  const measure = performance.getEntriesByName(name)[0];
  if (measure) {
    trackEvent({
      name: 'performance',
      category: 'Performance',
      label: name,
      value: Math.round(measure.duration),
    });
  }
}

/**
 * Track long tasks (> 50ms)
 */
export function observeLongTasks(): void {
  if (!isBrowser() || !('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        trackEvent({
          name: 'long_task',
          category: 'Performance',
          label: entry.name,
          value: Math.round(entry.duration),
        });
      }
    });

    observer.observe({ entryTypes: ['longtask'] });
  } catch (error) {
    console.warn('Failed to observe long tasks:', error);
  }
}

/**
 * Track user engagement (time on page)
 */
export function trackEngagement(): void {
  if (!isBrowser()) return;

  let startTime = Date.now();
  let isActive = true;

  const trackTime = () => {
    if (isActive) {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackEvent({
        name: 'engagement',
        category: 'Engagement',
        label: window.location.pathname,
        value: timeSpent,
      });
    }
  };

  // Track when user becomes inactive
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      trackTime();
      isActive = false;
    } else {
      startTime = Date.now();
      isActive = true;
    }
  });

  // Track before page unload
  window.addEventListener('beforeunload', trackTime);

  // Track every 30 seconds
  setInterval(() => {
    if (isActive) {
      trackTime();
      startTime = Date.now();
    }
  }, 30000);
}
