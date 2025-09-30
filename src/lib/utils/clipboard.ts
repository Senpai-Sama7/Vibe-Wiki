/**
 * Clipboard Utilities
 * Production-ready clipboard operations with fallback support
 */

export interface CopyResult {
  success: boolean;
  error?: Error;
}

/**
 * Copy text to clipboard using modern Clipboard API with fallback
 * @param text - Text to copy
 * @returns Promise with success status
 */
export async function copyToClipboard(text: string): Promise<CopyResult> {
  // SSR check - return early if not in browser
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      success: false,
      error: new Error('Not available in server-side environment')
    };
  }

  // Modern Clipboard API (preferred)
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return { success: true };
    } catch (error) {
      console.error('Clipboard API failed:', error);
      // Fall through to fallback
    }
  }

  // Fallback for older browsers or non-secure contexts
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.setAttribute('aria-hidden', 'true');
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);

    if (successful) {
      return { success: true };
    } else {
      throw new Error('execCommand failed');
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Copy failed')
    };
  }
}

/**
 * Check if clipboard API is available
 */
export function isClipboardSupported(): boolean {
  // SSR check
  if (typeof window === 'undefined' || typeof navigator === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  return (
    (navigator.clipboard && window.isSecureContext) ||
    document.queryCommandSupported?.('copy')
  );
}
