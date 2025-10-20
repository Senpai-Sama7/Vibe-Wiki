'use client';

import './globals.css';
import { useToast, setGlobalToastHandler } from '@/hooks/useToast';
import { ToastContainer } from '@/components/Toast';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toasts, showToast, hideToast } = useToast();

  useEffect(() => {
    // Set global toast handler for cross-component usage
    setGlobalToastHandler(showToast);
  }, [showToast]);

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <ToastContainer toasts={toasts} onDismiss={hideToast} />
      </body>
    </html>
  );
}
