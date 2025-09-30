/**
 * Client-side PWA install prompt helper
 */

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  prompt(): Promise<void>;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (command: string, targetId: string, config?: Record<string, any>) => void;
  }
}

class PWAInstallPrompt {
  private deferredPrompt: BeforeInstallPromptEvent | null = null;
  private isInstalled = false;
  private installable = false;

  constructor() {
    if (typeof window === 'undefined') {
      return;
    }

    this.initialize();
  }

  private initialize() {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.isInstalled = true;
    }

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.deferredPrompt = event as BeforeInstallPromptEvent;
      this.installable = true;
      window.dispatchEvent(new CustomEvent('pwa-installable', { detail: { installable: true } }));
    });

    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      this.deferredPrompt = null;
      this.installable = false;
      window.dispatchEvent(new CustomEvent('pwa-installed', { detail: { installed: true } }));

      window.gtag?.('event', 'pwa_installed', {
        event_category: 'engagement',
        event_label: 'PWA Install'
      });
    });

    if (this.isIOS() && !this.inStandaloneMode()) {
      this.installable = true;
    }
  }

  public canInstall(): boolean {
    return this.installable && !this.isInstalled;
  }

  public isAppInstalled(): boolean {
    return this.isInstalled;
  }

  public async install(): Promise<boolean> {
    if (typeof window === 'undefined') {
      return false;
    }

    if (!this.deferredPrompt) {
      if (this.isIOS() && !this.inStandaloneMode()) {
        this.showIOSInstructions();
      }
      return false;
    }

    try {
      await this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      this.deferredPrompt = null;

      if (outcome === 'accepted') {
        window.gtag?.('event', 'pwa_install_prompt_accepted', {
          event_category: 'engagement',
          event_label: 'PWA Install Prompt'
        });
        return true;
      }

      window.gtag?.('event', 'pwa_install_prompt_dismissed', {
        event_category: 'engagement',
        event_label: 'PWA Install Prompt'
      });
      return false;
    } catch (error) {
      console.error('[PWA] Install prompt failed:', error);
      return false;
    }
  }

  public getInstallInstructions(): string {
    if (this.isIOS()) {
      return 'Tap the Share button, then "Add to Home Screen"';
    }
    return 'Click "Install" when prompted, or use the browser install icon.';
  }

  private isIOS(): boolean {
    if (typeof navigator === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
  }

  private inStandaloneMode(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(display-mode: standalone)').matches ||
      ((window.navigator as { standalone?: boolean }).standalone === true);
  }

  private showIOSInstructions() {
    const message = `
To install Vibe Wiki on iOS:
1. Tap the Share button (\u{1F4E4})
2. Choose "Add to Home Screen"
3. Tap "Add" to confirm
`;
    alert(message);
  }
}

export const pwaInstallPrompt = typeof window !== 'undefined' ? new PWAInstallPrompt() : new PWAInstallPrompt();

export type { BeforeInstallPromptEvent };
