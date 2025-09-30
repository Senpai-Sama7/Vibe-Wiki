'use client';

import { usePWA } from '@/hooks/usePWA';

interface PWAStatusProps {
  className?: string;
  showOfflineBanner?: boolean;
}

export function PWAStatus({ className = '', showOfflineBanner = true }: PWAStatusProps) {
  const { isOnline, isInstalled, canInstall } = usePWA();

  const status = (() => {
    if (!isOnline) return { label: 'Offline', color: 'text-red-500', icon: '📡' };
    if (isInstalled) return { label: 'App Installed', color: 'text-green-500', icon: '✅' };
    if (canInstall) return { label: 'Install Available', color: 'text-blue-500', icon: '⬇️' };
    return { label: 'Web App', color: 'text-slate-400', icon: '🌐' };
  })();

  return (
    <div className={`inline-flex items-center gap-2 text-xs font-semibold ${status.color} ${className}`}>
      <span aria-hidden>{status.icon}</span>
      <span>{status.label}</span>
      {showOfflineBanner && !isOnline && (
        <span className="ml-2 rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] text-red-500">Viewing cached content</span>
      )}
    </div>
  );
}
