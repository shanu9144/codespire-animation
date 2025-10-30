/**
 * Base Metadata Configuration for CodeSpire
 * Provides default metadata templates and utilities
 * 
 * @module lib/seo/config/metadata
 */

import { seoConfig, generateTitle, generateDescription, generateCanonicalUrl, combineKeywords } from '@/config/seo';

/**
 * Default metadata for Next.js pages
 * @type {Object}
 */
export const defaultMetadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: seoConfig.defaultMeta.title,
  description: seoConfig.defaultMeta.description,
  keywords: seoConfig.defaultMeta.keywords,
  authors: seoConfig.defaultMeta.authors,
  creator: seoConfig.defaultMeta.creator,
  publisher: seoConfig.defaultMeta.publisher,
  robots: seoConfig.robots,
  openGraph: seoConfig.openGraph,
  twitter: seoConfig.twitter,
};

/**
 * Generate page metadata
 * @param {Object} options - Metadata options
 * @param {string} options.title - Page title
 * @param {string} options.description - Page description
 * @param {string} options.path - Page path for canonical URL
 * @param {string[]} options.keywords - Page-specific keywords
 * @param {string} options.image - OG image path
 * @param {string} options.type - Open Graph type
 * @returns {Object} Complete metadata object
 */
export function generatePageMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  image,
  type = 'website',
}) {
  const fullTitle = generateTitle(title);
  const fullDescription = generateDescription(description);
  const canonical = generateCanonicalUrl(path);
  const allKeywords = combineKeywords(keywords);
  
  const ogImage = image
    ? {
        url: image.startsWith('http') ? image : `${seoConfig.siteUrl}${image}`,
        width: seoConfig.ogImage.width,
        height: seoConfig.ogImage.height,
        alt: `${title} | ${seoConfig.siteName}`,
      }
    : seoConfig.openGraph.images[0];

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: allKeywords,
    authors: seoConfig.defaultMeta.authors,
    creator: seoConfig.defaultMeta.creator,
    publisher: seoConfig.defaultMeta.publisher,
    alternates: {
      canonical,
    },
    robots: seoConfig.robots,
    openGraph: {
      ...seoConfig.openGraph,
      title: fullTitle,
      description: fullDescription,
      url: canonical,
      type,
      images: [ogImage],
    },
    twitter: {
      ...seoConfig.twitter,
      title: fullTitle,
      description: fullDescription,
      images: [ogImage.url],
    },
  };
}

/**
 * Generate metadata for product pages
 * @param {Object} options - Product metadata options
 * @param {string} options.name - Product name
 * @param {string} options.description - Product description
 * @param {string} options.path - Product page path
 * @param {string} options.image - Product image path
 * @returns {Object} Product page metadata
 */
export function generateProductMetadata({ name, description, path, image }) {
  const title = `${name} | CodeSpire Solutions`;
  const keywords = [
    'Codespire',
    `Codespire ${name}`,
    `${name} AI`,
    'AI solutions',
    'enterprise AI',
  ];

  return generatePageMetadata({
    title,
    description,
    path,
    keywords,
    image,
    type: 'product',
  });
}

/**
 * Generate metadata for service pages
 * @param {Object} options - Service metadata options
 * @param {string} options.name - Service name
 * @param {string} options.description - Service description
 * @param {string} options.path - Service page path
 * @param {string} options.image - Service image path
 * @returns {Object} Service page metadata
 */
export function generateServiceMetadata({ name, description, path, image }) {
  const title = `${name} Services | CodeSpire Solutions`;
  const keywords = [
    'Codespire',
    `Codespire ${name}`,
    `${name} services`,
    'AI services',
    'digital engineering',
  ];

  return generatePageMetadata({
    title,
    description,
    path,
    keywords,
    image,
    type: 'website',
  });
}

export default defaultMetadata;

