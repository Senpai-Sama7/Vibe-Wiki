import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: {
    default: 'Vibe Wiki - Visual Web Development Learning Platform',
    template: '%s | Vibe Wiki',
  },
  description:
    'Transform complex technical concepts into digestible, animated mental models. Master web development through plain English explanations, real-world analogies, and interactive 3D visualizations.',
  keywords: [
    'web development',
    'vibe coding',
    'react',
    'nextjs',
    'typescript',
    'jamstack',
    'learning platform',
    'interactive tutorials',
    'spec-driven development',
    'context engineering',
  ],
  authors: [{ name: 'Vibe Wiki Team' }],
  creator: 'Vibe Wiki',
  publisher: 'Vibe Wiki',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://vibe-wiki.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Vibe Wiki',
    title: 'Vibe Wiki - Visual Web Development Learning Platform',
    description:
      'Master web development through plain English explanations, real-world analogies, and interactive 3D visualizations.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vibe Wiki - Visual Web Development Learning Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Wiki - Visual Web Development Learning Platform',
    description:
      'Master web development through plain English explanations, real-world analogies, and interactive 3D visualizations.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icon-192x192.svg', sizes: '192x192', type: 'image/svg+xml' }],
  },
  manifest: '/manifest.json',
  category: 'education',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e3a8a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>
        <main id="main-content">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
