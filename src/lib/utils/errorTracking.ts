/**
 * Error Tracking and Logging System
 * Provides centralized error handling, logging, and reporting
 */

import { isBrowser } from './helpers';

export interface ErrorReport {
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

interface ErrorQueueItem extends ErrorReport {
  id: string;
  retryCount: number;
}

class ErrorTracker {
  private queue: ErrorQueueItem[] = [];
  private readonly maxQueueSize = 50;
  private readonly storageKey = 'vibeWiki.errorQueue';
  private isProcessing = false;

  constructor() {
    if (isBrowser()) {
      this.loadQueue();
      this.setupGlobalHandlers();
    }
  }

  /**
   * Track an error with automatic categorization
   */
  track(error: Error | string, metadata?: Record<string, unknown>): void {
    const report = this.createErrorReport(error, metadata);
    this.addToQueue(report);
    this.processQueue();
  }

  /**
   * Track a custom error report
   */
  trackCustom(report: Partial<ErrorReport>): void {
    const fullReport: ErrorReport = {
      message: report.message || 'Unknown error',
      timestamp: report.timestamp || Date.now(),
      severity: report.severity || 'medium',
      category: report.category || 'unknown',
      stack: report.stack,
      userAgent: report.userAgent || this.getUserAgent(),
      url: report.url || this.getCurrentUrl(),
      componentStack: report.componentStack,
      metadata: report.metadata,
    };

    this.addToQueue(fullReport);
    this.processQueue();
  }

  /**
   * Create an error report from an Error object or string
   */
  private createErrorReport(error: Error | string, metadata?: Record<string, unknown>): ErrorReport {
    const message = typeof error === 'string' ? error : error.message;
    const stack = typeof error === 'string' ? undefined : error.stack;

    return {
      message,
      stack,
      timestamp: Date.now(),
      userAgent: this.getUserAgent(),
      url: this.getCurrentUrl(),
      severity: this.determineSeverity(message, stack),
      category: this.categorizeError(message, stack),
      metadata,
    };
  }

  /**
   * Determine error severity based on message and stack
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private determineSeverity(message: string, _stack?: string): ErrorReport['severity'] {
    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes('critical') ||
      lowerMessage.includes('fatal') ||
      lowerMessage.includes('security')
    ) {
      return 'critical';
    }

    if (
      lowerMessage.includes('error') ||
      lowerMessage.includes('failed') ||
      lowerMessage.includes('exception')
    ) {
      return 'high';
    }

    if (lowerMessage.includes('warn') || lowerMessage.includes('deprecated')) {
      return 'medium';
    }

    return 'low';
  }

  /**
   * Categorize error type
   */
  private categorizeError(message: string, stack?: string): ErrorReport['category'] {
    const lowerMessage = message.toLowerCase();
    const lowerStack = stack?.toLowerCase() || '';

    if (lowerMessage.includes('network') || lowerMessage.includes('fetch') || lowerMessage.includes('ajax')) {
      return 'network';
    }

    if (lowerMessage.includes('syntax') || lowerMessage.includes('parse')) {
      return 'syntax';
    }

    if (lowerMessage.includes('component') || lowerStack.includes('react')) {
      return 'component';
    }

    if (lowerMessage.includes('user') || lowerMessage.includes('validation')) {
      return 'user';
    }

    return 'runtime';
  }

  /**
   * Add error to queue
   */
  private addToQueue(report: ErrorReport): void {
    const item: ErrorQueueItem = {
      ...report,
      id: this.generateId(),
      retryCount: 0,
    };

    this.queue.push(item);

    // Maintain max queue size
    if (this.queue.length > this.maxQueueSize) {
      this.queue.shift();
    }

    this.saveQueue();
  }

  /**
   * Process error queue
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;

    try {
      const batch = this.queue.splice(0, 10);

      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        batch.forEach(error => {
          console.group(`[Error Tracker] ${error.severity.toUpperCase()}: ${error.category}`);
          console.error('Message:', error.message);
          if (error.stack) console.error('Stack:', error.stack);
          if (error.metadata) console.error('Metadata:', error.metadata);
          console.groupEnd();
        });
      }

      // Send to error tracking service (if configured)
      await this.sendToService(batch);

      this.saveQueue();
    } catch (error) {
      // Re-add failed items back to queue
      console.error('[Error Tracker] Failed to process queue:', error);
    } finally {
      this.isProcessing = false;

      // Continue processing if more items exist
      if (this.queue.length > 0) {
        setTimeout(() => this.processQueue(), 1000);
      }
    }
  }

  /**
   * Send errors to remote service
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async sendToService(_errors: ErrorQueueItem[]): Promise<void> {
    // In a production environment, you would send errors to a service like:
    // - Sentry
    // - LogRocket
    // - Datadog
    // - Custom error reporting endpoint

    // For now, we just log them
    if (process.env.NODE_ENV === 'production') {
      // Example: await fetch('/api/errors', { method: 'POST', body: JSON.stringify(errors) });
    }
  }

  /**
   * Setup global error handlers
   */
  private setupGlobalHandlers(): void {
    // Handle uncaught errors
    window.addEventListener('error', (event) => {
      this.track(event.error || event.message, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.track(event.reason, {
        type: 'unhandledRejection',
        promise: event.promise,
      });
    });

    // Handle React errors (if using error boundary)
    window.addEventListener('react-error', ((event: CustomEvent) => {
      this.trackCustom({
        message: event.detail.message,
        stack: event.detail.stack,
        componentStack: event.detail.componentStack,
        severity: 'high',
        category: 'component',
      });
    }) as EventListener);
  }

  /**
   * Load queue from storage
   */
  private loadQueue(): void {
    if (!isBrowser()) return;

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.queue = JSON.parse(stored);
      }
    } catch {
      console.warn('[Error Tracker] Failed to load queue from storage');
    }
  }

  /**
   * Save queue to storage
   */
  private saveQueue(): void {
    if (!isBrowser()) return;

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.queue));
    } catch {
      console.warn('[Error Tracker] Failed to save queue to storage');
    }
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get user agent string
   */
  private getUserAgent(): string | undefined {
    return isBrowser() ? navigator.userAgent : undefined;
  }

  /**
   * Get current URL
   */
  private getCurrentUrl(): string | undefined {
    return isBrowser() ? window.location.href : undefined;
  }

  /**
   * Get all errors in queue
   */
  getQueue(): ErrorQueueItem[] {
    return [...this.queue];
  }

  /**
   * Clear error queue
   */
  clearQueue(): void {
    this.queue = [];
    this.saveQueue();
  }

  /**
   * Get error statistics
   */
  getStats(): {
    total: number;
    bySeverity: Record<string, number>;
    byCategory: Record<string, number>;
  } {
    const stats = {
      total: this.queue.length,
      bySeverity: {} as Record<string, number>,
      byCategory: {} as Record<string, number>,
    };

    this.queue.forEach(error => {
      stats.bySeverity[error.severity] = (stats.bySeverity[error.severity] || 0) + 1;
      stats.byCategory[error.category] = (stats.byCategory[error.category] || 0) + 1;
    });

    return stats;
  }
}

// Export singleton instance
export const errorTracker = new ErrorTracker();

// Convenience functions
export function trackError(error: Error | string, metadata?: Record<string, unknown>): void {
  errorTracker.track(error, metadata);
}

export function trackCustomError(report: Partial<ErrorReport>): void {
  errorTracker.trackCustom(report);
}

export function getErrorQueue(): ErrorQueueItem[] {
  return errorTracker.getQueue();
}

export function clearErrorQueue(): void {
  errorTracker.clearQueue();
}

export function getErrorStats() {
  return errorTracker.getStats();
}
