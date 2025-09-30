'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { useToast, setGlobalToastHandler } from '@/hooks/useToast';
import { ToastContainer } from '@/components/Toast';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        {children}
        <ToastContainer toasts={toasts} onDismiss={hideToast} />
      </body>
    </html>
  );
}
