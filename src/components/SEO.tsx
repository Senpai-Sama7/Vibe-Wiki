import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: object;
}

/**
 * SEO Component for meta tags and structured data
 * 
 * Provides comprehensive SEO optimization including:
 * - Title and description meta tags
 * - Open Graph tags for social sharing
 * - Twitter Card tags
 * - Structured data (JSON-LD)
 * - Canonical URLs
 * - Robots meta tags
 * 
 * @example
 * ```tsx
 * <SEO
 *   title="Vibe Coding - Learn Web Development"
 *   description="Interactive learning platform for web development"
 *   keywords={['web development', 'react', 'next.js']}
 * />
 * ```
 */
export function SEO({
  title = 'Vibe Wiki - Enterprise-Grade Web Development Learning',
  description = 'Multi-modal learning platform for web development concepts through interactive visualizations and progressive learning modes.',
  keywords = [
    'web development',
    'react',
    'next.js',
    'javascript',
    'typescript',
    'learning platform',
    'interactive tutorials',
    'vibe coding',
  ],
  ogImage = '/og-image.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  noIndex = false,
  structuredData,
}: SEOProps) {
  const siteTitle = 'Vibe Wiki';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="Vibe Wiki Team" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteTitle} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

      {/* Theme Color */}
      <meta name="theme-color" content="#4F46E5" />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
}

/**
 * Generate structured data for educational content
 */
export function generateEducationalStructuredData(concept: {
  title: string;
  description: string;
  difficulty: number;
  estimatedTime: number;
  category: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: concept.title,
    description: concept.description,
    educationalLevel: `Level ${concept.difficulty}`,
    timeRequired: `PT${concept.estimatedTime}M`,
    learningResourceType: 'Interactive Tutorial',
    inLanguage: 'en-US',
    about: {
      '@type': 'Thing',
      name: concept.category,
    },
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate organization structured data
 */
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vibe Wiki',
    description: 'Enterprise-grade visual web development learning platform',
    url: 'https://vibe-wiki.com',
    logo: 'https://vibe-wiki.com/logo.png',
    sameAs: [
      // Add social media URLs here
    ],
  };
}
