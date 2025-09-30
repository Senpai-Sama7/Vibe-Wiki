'use client';

import { useState } from 'react';
import { usePWA } from '@/hooks/usePWA';

interface PWAInstallPromptProps {
  className?: string;
}

export function PWAInstallPrompt({ className = '' }: PWAInstallPromptProps) {
  const { canInstall, isInstalled, install, installInstructions } = usePWA();
  const [isInstalling, setIsInstalling] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  if (isInstalled || !canInstall) {
    return null;
  }

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      const result = await install();
      if (!result.success) {
        setShowInstructions(true);
      }
    } catch (error) {
      console.error('[PWA] Install error', error);
      setShowInstructions(true);
    } finally {
      setIsInstalling(false);
    }
  };

  if (showInstructions) {
    return (
      <aside className={`rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 ${className}`}>
        <div className="flex items-start gap-3">
          <span aria-hidden className="mt-0.5">💡</span>
          <div className="space-y-2">
            <strong className="block text-blue-900">Install Vibe Wiki</strong>
            <p>{installInstructions}</p>
            <button
              type="button"
              onClick={() => setShowInstructions(false)}
              className="rounded-md bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 transition hover:bg-blue-200"
            >
              Close
            </button>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`flex items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white shadow-lg ${className}`}>
      <div>
        <p className="text-sm font-semibold">Install Vibe Wiki</p>
        <p className="text-xs text-white/80">Get the full offline experience on your device</p>
      </div>
      <button
        type="button"
        onClick={handleInstall}
        disabled={isInstalling}
        className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isInstalling ? (
          <>
            <svg className="h-4 w-4 animate-spin text-blue-600" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Installing…
          </>
        ) : (
          'Install'
        )}
      </button>
    </aside>
  );
}
