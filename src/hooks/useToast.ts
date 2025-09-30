'use client';

import { useCallback, useState } from 'react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

interface UseToastReturn {
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type'], duration?: number) => void;
  hideToast: (id: string) => void;
  clearAll: () => void;
}

/**
 * Toast notification hook with auto-dismiss and stacking support
 */
export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: Toast['type'] = 'info', duration: number = 3000) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const toast: Toast = { id, message, type, duration };

      setToasts((prev) => [...prev, toast]);

      // Auto-dismiss
      if (duration > 0) {
        setTimeout(() => {
          hideToast(id);
        }, duration);
      }
    },
    [hideToast]
  );

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  return { toasts, showToast, hideToast, clearAll };
}

// Global toast manager for cross-component usage
let globalToastHandler: ((message: string, type?: Toast['type'], duration?: number) => void) | null = null;

export function setGlobalToastHandler(handler: (message: string, type?: Toast['type'], duration?: number) => void) {
  globalToastHandler = handler;
}

export function showGlobalToast(message: string, type: Toast['type'] = 'info', duration: number = 3000) {
  if (globalToastHandler) {
    globalToastHandler(message, type, duration);
  } else {
    console.warn('Global toast handler not initialized');
  }
}
