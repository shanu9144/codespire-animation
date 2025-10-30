/**
 * Centralized SEO Configuration for CodeSpire
 * Primary Keyword: "Codespire"
 * 
 * @module config/seo
 */

/**
 * Site-wide SEO configuration
 * @type {Object}
 */
export const seoConfig = {
  // Primary keyword
  primaryKeyword: 'Codespire',
  
  // Site information
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://codespire.com',
  siteName: 'CodeSpire Solutions',
  siteTagline: 'From Idea to Enterprise-Grade AI in a Blink',
  
  // Primary keywords array (Codespire-focused)
  primaryKeywords: [
    'Codespire',
    'Codespire Solutions',
    'Codespire AI',
    'Codespire digital engineering',
    'Codespire enterprise AI',
  ],
  
  // Secondary keywords
  secondaryKeywords: [
    'Codespire AI solutions',
    'Codespire enterprise AI',
    'Codespire digital transformation',
    'Codespire AI consulting',
    'Codespire product engineering',
    'Codespire rapid AI development',
    'AI product engineering',
    'Enterprise AI solutions',
    'Digital engineering services',
    'AI consulting services',
    'Manufacturing AI',
    'BFSI AI solutions',
    'Hi-tech AI',
  ],
  
  // Default meta configuration
  defaultMeta: {
    title: {
      default: 'CodeSpire Solutions - From Idea to Enterprise-Grade AI in a Blink',
      template: '%s | CodeSpire Solutions',
    },
    description: 'CodeSpire Solutions specializes in rapid AI product engineering with enterprise-grade quality. Transform your business with our AI expertise across manufacturing, hi-tech, BFSI, and more.',
    keywords: ['Codespire', 'Codespire Solutions', 'Codespire AI', 'Enterprise AI', 'AI Product Engineering', 'Digital Engineering'],
    authors: [{ name: 'CodeSpire Solutions' }],
    creator: 'CodeSpire Solutions',
    publisher: 'CodeSpire Solutions',
  },
  
  // Open Graph defaults
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://codespire.com',
    siteName: 'CodeSpire Solutions',
    images: [
      {
        url: '/assets/codespirelogo.png',
        width: 1200,
        height: 630,
        alt: 'CodeSpire Solutions - Enterprise AI Engineering',
      },
    ],
  },
  
  // Twitter defaults
  twitter: {
    card: 'summary_large_image',
    site: '@CodeSpire',
    creator: '@CodeSpire',
    images: ['/assets/codespirelogo.png'],
  },
  
  // Robots configuration
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
  
  // OG Image generation
  ogImage: {
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://codespire.com',
    defaultImage: '/assets/codespirelogo.png',
    width: 1200,
    height: 630,
  },
  
  // Structured data defaults
  structuredData: {
    organization: {
      name: 'CodeSpire Solutions',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://codespire.com',
      logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://codespire.com'}/assets/codespirelogo.png`,
      foundingDate: '2020',
      description: 'Leading provider of AI-powered digital engineering solutions and intelligent automation systems.',
      address: {
        streetAddress: '4754 U.S. Route 40',
        addressLocality: 'Tipp City',
        addressRegion: 'OH',
        postalCode: '45371',
        addressCountry: 'US',
      },
      contactPoint: {
        contactType: 'customer service',
        areaServed: 'US',
        availableLanguage: 'English',
      },
      sameAs: [
        'https://linkedin.com/company/codespire',
        'https://twitter.com/codespire',
        'https://github.com/codespire',
      ],
    },
  },
};

/**
 * Generate title with Codespire branding
 * @param {string} pageTitle - The page-specific title
 * @param {string} separator - Separator between page title and site name
 * @returns {string} Formatted title
 */
export function generateTitle(pageTitle, separator = ' | ') {
  return `${pageTitle}${separator}${seoConfig.siteName}`;
}

/**
 * Generate meta description with Codespire keywords
 * @param {string} description - Base description
 * @param {string[]} additionalKeywords - Additional keywords to include
 * @returns {string} Enhanced description
 */
export function generateDescription(description, additionalKeywords = []) {
  // Ensure Codespire is naturally included if not already present
  if (!description.toLowerCase().includes('codespire')) {
    return `${description} | CodeSpire Solutions - ${seoConfig.siteTagline}`;
  }
  return description;
}

/**
 * Generate canonical URL
 * @param {string} path - Page path
 * @returns {string} Full canonical URL
 */
export function generateCanonicalUrl(path) {
  const baseUrl = seoConfig.siteUrl.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Generate Open Graph image URL
 * @param {string} imagePath - Path to image
 * @returns {string} Full OG image URL
 */
export function generateOGImageUrl(imagePath) {
  const baseUrl = seoConfig.siteUrl.replace(/\/$/, '');
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Combine keywords arrays
 * @param {string[]} pageKeywords - Page-specific keywords
 * @returns {string[]} Combined keywords with Codespire primary keywords
 */
export function combineKeywords(pageKeywords = []) {
  return [
    ...seoConfig.primaryKeywords,
    ...seoConfig.secondaryKeywords.filter(kw => !pageKeywords.includes(kw)),
    ...pageKeywords,
  ];
}

export default seoConfig;

