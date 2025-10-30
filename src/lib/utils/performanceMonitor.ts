/**
 * Performance Monitoring System
 * Tracks and analyzes application performance metrics
 */

import { isBrowser } from './helpers';

export interface PerformanceMark {
  name: string;
  startTime: number;
  duration?: number;
  metadata?: Record<string, unknown>;
}

export interface PerformanceMetrics {
  marks: PerformanceMark[];
  measures: PerformanceMeasure[];
  resourceTiming: PerformanceResourceTiming[];
  navigationTiming?: PerformanceNavigationTiming;
}

interface PerformanceMeasure {
  name: string;
  startMark: string;
  endMark: string;
  duration: number;
}

class PerformanceMonitor {
  private marks: Map<string, PerformanceMark> = new Map();
  private measures: PerformanceMeasure[] = [];
  private readonly storageKey = 'vibeWiki.performanceMetrics';

  constructor() {
    if (isBrowser()) {
      this.setupObservers();
    }
  }

  /**
   * Mark a performance point
   */
  mark(name: string, metadata?: Record<string, unknown>): void {
    if (!isBrowser()) return;

    const mark: PerformanceMark = {
      name,
      startTime: performance.now(),
      metadata,
    };

    this.marks.set(name, mark);

    // Use native Performance API if available
    if (performance.mark) {
      performance.mark(name);
    }
  }

  /**
   * Measure time between two marks
   */
  measure(name: string, startMark: string, endMark: string): number | null {
    if (!isBrowser()) return null;

    const start = this.marks.get(startMark);
    const end = this.marks.get(endMark);

    if (!start || !end) {
      console.warn(`[Performance] Cannot measure ${name}: marks not found`);
      return null;
    }

    const duration = end.startTime - start.startTime;

    this.measures.push({
      name,
      startMark,
      endMark,
      duration,
    });

    // Use native Performance API
    if (performance.measure) {
      try {
        performance.measure(name, startMark, endMark);
      } catch (err) {
        console.warn(`[Performance] Failed to create measure: ${err}`);
      }
    }

    return duration;
  }

  /**
   * Get all performance marks
   */
  getMarks(): PerformanceMark[] {
    return Array.from(this.marks.values());
  }

  /**
   * Get all performance measures
   */
  getMeasures(): PerformanceMeasure[] {
    return [...this.measures];
  }

  /**
   * Get resource timing information
   */
  getResourceTiming(): PerformanceResourceTiming[] {
    if (!isBrowser() || !performance.getEntriesByType) return [];

    return performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  }

  /**
   * Get navigation timing
   */
  getNavigationTiming(): PerformanceNavigationTiming | null {
    if (!isBrowser() || !performance.getEntriesByType) return null;

    const entries = performance.getEntriesByType('navigation');
    return entries.length > 0 ? (entries[0] as PerformanceNavigationTiming) : null;
  }

  /**
   * Get all performance metrics
   */
  getMetrics(): PerformanceMetrics {
    return {
      marks: this.getMarks(),
      measures: this.getMeasures(),
      resourceTiming: this.getResourceTiming(),
      navigationTiming: this.getNavigationTiming() || undefined,
    };
  }

  /**
   * Analyze component render performance
   */
  analyzeComponentRender(componentName: string): {
    average: number;
    min: number;
    max: number;
    count: number;
  } | null {
    const componentMeasures = this.measures.filter(m => 
      m.name.includes(componentName)
    );

    if (componentMeasures.length === 0) return null;

    const durations = componentMeasures.map(m => m.duration);

    return {
      average: durations.reduce((a, b) => a + b, 0) / durations.length,
      min: Math.min(...durations),
      max: Math.max(...durations),
      count: durations.length,
    };
  }

  /**
   * Get slow resources (> threshold ms)
   */
  getSlowResources(threshold = 1000): PerformanceResourceTiming[] {
    return this.getResourceTiming().filter(
      resource => resource.duration > threshold
    );
  }

  /**
   * Get resource breakdown by type
   */
  getResourceBreakdown(): Record<string, { count: number; totalSize: number; totalDuration: number }> {
    const resources = this.getResourceTiming();
    const breakdown: Record<string, { count: number; totalSize: number; totalDuration: number }> = {};

    resources.forEach(resource => {
      const extension = resource.name.split('.').pop()?.toLowerCase() || 'other';
      
      if (!breakdown[extension]) {
        breakdown[extension] = { count: 0, totalSize: 0, totalDuration: 0 };
      }

      breakdown[extension].count++;
      breakdown[extension].totalSize += resource.transferSize || 0;
      breakdown[extension].totalDuration += resource.duration;
    });

    return breakdown;
  }

  /**
   * Calculate Time to Interactive (TTI) estimate
   */
  estimateTTI(): number | null {
    const navTiming = this.getNavigationTiming();
    if (!navTiming) return null;

    // Simple TTI estimation: domContentLoadedEventEnd
    return navTiming.domContentLoadedEventEnd - navTiming.fetchStart;
  }

  /**
   * Calculate First Paint
   */
  getFirstPaint(): number | null {
    if (!isBrowser() || !performance.getEntriesByType) return null;

    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');

    return firstPaint ? firstPaint.startTime : null;
  }

  /**
   * Calculate First Contentful Paint
   */
  getFirstContentfulPaint(): number | null {
    if (!isBrowser() || !performance.getEntriesByType) return null;

    const paintEntries = performance.getEntriesByType('paint');
    const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');

    return fcp ? fcp.startTime : null;
  }

  /**
   * Setup performance observers
   */
  private setupObservers(): void {
    if (!isBrowser() || !window.PerformanceObserver) return;

    // Observe long tasks
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // Tasks longer than 50ms
            console.warn(`[Performance] Long task detected: ${entry.duration.toFixed(2)}ms`);
          }
        }
      });

      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch {
      // Long task API not supported
    }

    // Observe layout shifts (CLS)
    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const clsEntry = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
          if (!clsEntry.hadRecentInput && clsEntry.value > 0.1) {
            console.warn(`[Performance] Layout shift detected: ${clsEntry.value.toFixed(3)}`);
          }
        }
      });

      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch {
      // Layout shift API not supported
    }
  }

  /**
   * Clear all performance data
   */
  clear(): void {
    this.marks.clear();
    this.measures = [];

    if (isBrowser() && performance.clearMarks) {
      performance.clearMarks();
      performance.clearMeasures();
    }
  }

  /**
   * Export metrics to JSON
   */
  exportMetrics(): string {
    return JSON.stringify(this.getMetrics(), null, 2);
  }

  /**
   * Save metrics to local storage
   */
  saveMetrics(): void {
    if (!isBrowser()) return;

    try {
      const metrics = this.getMetrics();
      localStorage.setItem(this.storageKey, JSON.stringify(metrics));
    } catch {
      console.warn('[Performance] Failed to save metrics to storage');
    }
  }

  /**
   * Load metrics from local storage
   */
  loadMetrics(): PerformanceMetrics | null {
    if (!isBrowser()) return null;

    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : null;
    } catch {
      console.warn('[Performance] Failed to load metrics from storage');
      return null;
    }
  }

  /**
   * Generate performance report
   */
  generateReport(): string {
    const metrics = this.getMetrics();
    const navTiming = metrics.navigationTiming;
    const resourceBreakdown = this.getResourceBreakdown();

    let report = '=== Performance Report ===\n\n';

    // Navigation timing
    if (navTiming) {
      report += '## Navigation Timing\n';
      report += `- DNS Lookup: ${(navTiming.domainLookupEnd - navTiming.domainLookupStart).toFixed(2)}ms\n`;
      report += `- TCP Connection: ${(navTiming.connectEnd - navTiming.connectStart).toFixed(2)}ms\n`;
      report += `- Request Time: ${(navTiming.responseStart - navTiming.requestStart).toFixed(2)}ms\n`;
      report += `- Response Time: ${(navTiming.responseEnd - navTiming.responseStart).toFixed(2)}ms\n`;
      report += `- DOM Interactive: ${(navTiming.domInteractive - navTiming.fetchStart).toFixed(2)}ms\n`;
      report += `- DOM Complete: ${(navTiming.domComplete - navTiming.fetchStart).toFixed(2)}ms\n`;
      report += `- Load Complete: ${(navTiming.loadEventEnd - navTiming.fetchStart).toFixed(2)}ms\n\n`;
    }

    // Paint timing
    const fp = this.getFirstPaint();
    const fcp = this.getFirstContentfulPaint();
    if (fp || fcp) {
      report += '## Paint Timing\n';
      if (fp) report += `- First Paint: ${fp.toFixed(2)}ms\n`;
      if (fcp) report += `- First Contentful Paint: ${fcp.toFixed(2)}ms\n\n`;
    }

    // Resource breakdown
    report += '## Resource Breakdown\n';
    Object.entries(resourceBreakdown).forEach(([type, stats]) => {
      report += `- ${type}: ${stats.count} files, `;
      report += `${(stats.totalSize / 1024).toFixed(2)}KB, `;
      report += `${stats.totalDuration.toFixed(2)}ms total\n`;
    });

    // Slow resources
    const slowResources = this.getSlowResources(1000);
    if (slowResources.length > 0) {
      report += '\n## Slow Resources (>1s)\n';
      slowResources.forEach(resource => {
        report += `- ${resource.name}: ${resource.duration.toFixed(2)}ms\n`;
      });
    }

    return report;
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Convenience functions
export function markPerformance(name: string, metadata?: Record<string, unknown>): void {
  performanceMonitor.mark(name, metadata);
}

export function measurePerformance(name: string, startMark: string, endMark: string): number | null {
  return performanceMonitor.measure(name, startMark, endMark);
}

export function getPerformanceMetrics(): PerformanceMetrics {
  return performanceMonitor.getMetrics();
}

export function generatePerformanceReport(): string {
  return performanceMonitor.generateReport();
}

export function clearPerformanceData(): void {
  performanceMonitor.clear();
}
