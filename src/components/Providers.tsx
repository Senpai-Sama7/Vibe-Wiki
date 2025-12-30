'use client';

import { useEffect } from 'react';
import { useToast, setGlobalToastHandler } from '@/hooks/useToast';
import { ToastContainer } from '@/components/Toast';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Client-side providers wrapper
 * Handles toast notifications, error boundaries, and other client-side state
 */
export function Providers({ children }: ProvidersProps) {
  const { toasts, showToast, hideToast } = useToast();

  useEffect(() => {
    // Set global toast handler for cross-component usage
    setGlobalToastHandler(showToast);
  }, [showToast]);

  return (
    <ErrorBoundary>
      {children}
      <ToastContainer toasts={toasts} onDismiss={hideToast} />
    </ErrorBoundary>
  );
}
