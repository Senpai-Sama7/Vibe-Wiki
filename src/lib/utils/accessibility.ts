/**
 * Accessibility Utilities
 * Helpers for improving application accessibility
 */

import { isBrowser } from './helpers';

/**
 * Trap focus within a modal or dialog
 */
export function trapFocus(element: HTMLElement): () => void {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement?.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement?.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);

  // Focus first element
  firstElement?.focus();

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
}

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void {
  if (!isBrowser()) return;

  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Generate unique IDs for accessibility labels
 */
let idCounter = 0;
export function generateA11yId(prefix = 'a11y'): string {
  return `${prefix}-${++idCounter}-${Date.now()}`;
}

/**
 * Check if element is keyboard accessible
 */
export function isKeyboardAccessible(element: HTMLElement): boolean {
  const tabIndex = element.getAttribute('tabindex');
  const isInteractive = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(
    element.tagName
  );

  return isInteractive || (tabIndex !== null && parseInt(tabIndex) >= 0);
}

/**
 * Get accessible name for element
 */
export function getAccessibleName(element: HTMLElement): string {
  // Check aria-label
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel;

  // Check aria-labelledby
  const labelledBy = element.getAttribute('aria-labelledby');
  if (labelledBy) {
    const labelElement = document.getElementById(labelledBy);
    if (labelElement) return labelElement.textContent || '';
  }

  // Check associated label
  if (element instanceof HTMLInputElement) {
    const label = document.querySelector(`label[for="${element.id}"]`);
    if (label) return label.textContent || '';
  }

  // Check title
  const title = element.getAttribute('title');
  if (title) return title;

  // Fallback to text content
  return element.textContent || '';
}

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  if (!isBrowser()) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if high contrast is preferred
 */
export function prefersHighContrast(): boolean {
  if (!isBrowser()) return false;
  return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * Check if dark mode is preferred
 */
export function prefersDarkMode(): boolean {
  if (!isBrowser()) return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Set page title for screen readers and SEO
 */
export function setPageTitle(title: string, siteName = 'Vibe Wiki'): void {
  if (!isBrowser()) return;

  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;
  document.title = fullTitle;

  // Update meta tags
  updateMetaTag('og:title', fullTitle);
  updateMetaTag('twitter:title', fullTitle);
}

/**
 * Update meta tag value
 */
function updateMetaTag(property: string, content: string): void {
  const isProperty = property.startsWith('og:');
  const selector = isProperty
    ? `meta[property="${property}"]`
    : `meta[name="${property}"]`;

  let meta = document.querySelector(selector);

  if (!meta) {
    meta = document.createElement('meta');
    if (isProperty) {
      meta.setAttribute('property', property);
    } else {
      meta.setAttribute('name', property);
    }
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', content);
}

/**
 * Skip to main content (for keyboard navigation)
 */
export function skipToMainContent(): void {
  if (!isBrowser()) return;

  const main = document.getElementById('main-content') || document.querySelector('main');
  if (main) {
    main.setAttribute('tabindex', '-1');
    main.focus();
    main.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Create skip link component
 */
export function createSkipLink(): HTMLElement {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className =
    'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded';
  skipLink.textContent = 'Skip to main content';

  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    skipToMainContent();
  });

  return skipLink;
}

/**
 * Add skip link to page
 */
export function addSkipLink(): void {
  if (!isBrowser()) return;

  const existing = document.querySelector('[href="#main-content"]');
  if (existing) return;

  const skipLink = createSkipLink();
  document.body.insertBefore(skipLink, document.body.firstChild);
}

/**
 * Check keyboard navigation
 */
export function enableKeyboardNavigation(): void {
  if (!isBrowser()) return;

  document.addEventListener('keydown', (e) => {
    // Alt + / or ? for help
    if (e.altKey && (e.key === '/' || e.key === '?')) {
      e.preventDefault();
      announceToScreenReader('Keyboard shortcuts: Alt+M for main content, Alt+S for search');
    }

    // Alt + M for main content
    if (e.altKey && e.key === 'm') {
      e.preventDefault();
      skipToMainContent();
    }

    // Alt + S for search
    if (e.altKey && e.key === 's') {
      e.preventDefault();
      const searchInput = document.querySelector<HTMLInputElement>(
        'input[type="search"], input[aria-label*="search" i]'
      );
      searchInput?.focus();
    }

    // Escape to close modals
    if (e.key === 'Escape') {
      const modal = document.querySelector('[role="dialog"][aria-modal="true"]');
      if (modal) {
        const closeButton = modal.querySelector<HTMLButtonElement>(
          '[aria-label*="close" i], [aria-label*="dismiss" i]'
        );
        closeButton?.click();
      }
    }
  });
}

/**
 * Validate ARIA attributes
 */
export function validateARIA(element: HTMLElement): string[] {
  const errors: string[] = [];

  // Check required roles
  const role = element.getAttribute('role');
  if (role) {
    const validRoles = [
      'alert',
      'button',
      'checkbox',
      'dialog',
      'link',
      'menu',
      'menuitem',
      'navigation',
      'search',
      'tab',
      'tabpanel',
    ];

    if (!validRoles.includes(role)) {
      errors.push(`Invalid ARIA role: ${role}`);
    }
  }

  // Check aria-labelledby references
  const labelledBy = element.getAttribute('aria-labelledby');
  if (labelledBy && !document.getElementById(labelledBy)) {
    errors.push(`aria-labelledby references non-existent ID: ${labelledBy}`);
  }

  // Check aria-describedby references
  const describedBy = element.getAttribute('aria-describedby');
  if (describedBy && !document.getElementById(describedBy)) {
    errors.push(`aria-describedby references non-existent ID: ${describedBy}`);
  }

  return errors;
}

/**
 * Color contrast checker (simplified WCAG 2.1 AA)
 */
export function checkColorContrast(
  foreground: string,
  background: string
): { ratio: number; passesAA: boolean; passesAAA: boolean } {
  const fgLuminance = getRelativeLuminance(foreground);
  const bgLuminance = getRelativeLuminance(background);

  const ratio =
    fgLuminance > bgLuminance
      ? (fgLuminance + 0.05) / (bgLuminance + 0.05)
      : (bgLuminance + 0.05) / (fgLuminance + 0.05);

  return {
    ratio,
    passesAA: ratio >= 4.5,
    passesAAA: ratio >= 7,
  };
}

/**
 * Calculate relative luminance
 */
function getRelativeLuminance(color: string): number {
  const rgb = hexToRgb(color);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    const normalized = val / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
