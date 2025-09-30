'use client';

import { useEffect, useState } from 'react';
import { pwaInstallPrompt } from '@/lib/pwa/installPrompt';

export interface PWAState {
  isInstallable: boolean;
  isInstalled: boolean;
  isOnline: boolean;
  canInstall: boolean;
  installInstructions: string;
}

export interface PWAInstallResult {
  success: boolean;
  error?: string;
}

export function usePWA(): PWAState & { install: () => Promise<PWAInstallResult> } {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsInstalled(pwaInstallPrompt.isAppInstalled());
    setIsInstallable(pwaInstallPrompt.canInstall());
    setIsOnline(typeof navigator !== 'undefined' ? navigator.onLine : true);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleInstallable = () => setIsInstallable(true);
    const handleInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('pwa-installable', handleInstallable as EventListener);
    window.addEventListener('pwa-installed', handleInstalled as EventListener);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('pwa-installable', handleInstallable as EventListener);
      window.removeEventListener('pwa-installed', handleInstalled as EventListener);
    };
  }, []);

  const install = async (): Promise<PWAInstallResult> => {
    try {
      const success = await pwaInstallPrompt.install();
      return { success };
    } catch (error) {
      console.error('[PWA] Install failed', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Installation failed',
      };
    }
  };

  return {
    isInstallable,
    isInstalled,
    isOnline,
    canInstall: pwaInstallPrompt.canInstall(),
    installInstructions: pwaInstallPrompt.getInstallInstructions(),
    install,
  };
}
