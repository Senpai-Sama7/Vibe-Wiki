'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { copyToClipboard, isClipboardSupported } from '@/lib/utils/clipboard';
import { showGlobalToast } from '@/hooks/useToast';
import clsx from 'clsx';

interface CopyButtonProps {
  text: string;
  className?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  label?: string;
  showToast?: boolean;
}

/**
 * CopyButton: Accessible copy-to-clipboard button with visual feedback
 *
 * Features:
 * - Clipboard API with fallback
 * - Icon transitions (clipboard → checkmark)
 * - Color transitions on success
 * - Toast notifications (optional)
 * - Keyboard accessible
 * - ARIA labels for screen readers
 */
export function CopyButton({
  text,
  className,
  onSuccess,
  onError,
  label = 'Copy to clipboard',
  showToast: enableToast = true
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = async () => {
    const result = await copyToClipboard(text);

    if (result.success) {
      setCopied(true);
      onSuccess?.();

      if (enableToast) {
        showGlobalToast('✓ Copied to clipboard!', 'success', 2000);
      }

      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } else {
      const error = result.error || new Error('Copy failed');
      onError?.(error);

      if (enableToast) {
        showGlobalToast('Failed to copy to clipboard', 'error', 3000);
      }
    }
  };

  if (!isClipboardSupported()) {
    return null; // Don't render if clipboard not supported
  }

  return (
    <motion.button
      onClick={handleCopy}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={clsx(
        'group relative inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        copied
          ? 'bg-green-500 text-white focus:ring-green-500'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
        className
      )}
      aria-label={copied ? 'Copied!' : label}
      disabled={copied}
      whileTap={{ scale: 0.95 }}
    >
      {/* Icon */}
      <motion.span
        initial={false}
        animate={{
          scale: copied ? [1, 1.2, 1] : 1,
          rotate: copied ? [0, -10, 10, 0] : 0
        }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      >
        {copied ? (
          // Checkmark icon
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          // Clipboard icon
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        )}
      </motion.span>

      {/* Text */}
      <span className="text-xs">
        {copied ? 'Copied!' : 'Copy'}
      </span>

      {/* Tooltip */}
      {isHovered && !copied && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white dark:bg-gray-100 dark:text-gray-900"
          role="tooltip"
        >
          {label}
          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-900 dark:bg-gray-100" />
        </motion.div>
      )}
    </motion.button>
  );
}
