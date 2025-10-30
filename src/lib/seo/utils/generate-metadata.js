/**
 * Metadata Generation Utilities
 * Functions to generate SEO metadata for pages
 * 
 * @module lib/seo/utils/generate-metadata
 */

import {
  seoConfig,
  generateTitle,
  generateDescription,
  generateCanonicalUrl,
  generateOGImageUrl,
  combineKeywords,
} from '@/config/seo';

/**
 * Generate complete metadata object for a page
 * @param {Object} options - Metadata options
 * @param {string} options.title - Page title
 * @param {string} options.description - Page description
 * @param {string} options.path - Page path for canonical URL
 * @param {string[]} options.keywords - Page-specific keywords
 * @param {string} options.image - OG image path
 * @param {string} options.type - Open Graph type
 * @param {Date} options.publishedTime - Publication date (optional)
 * @param {Date} options.modifiedTime - Last modified date (optional)
 * @returns {Object} Complete metadata object
 */
export function generateMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
}) {
  const fullTitle = generateTitle(title);
  const fullDescription = generateDescription(description);
  const canonical = generateCanonicalUrl(path);
  const allKeywords = combineKeywords(keywords);

  const ogImage = image
    ? {
        url: image.startsWith('http') ? image : generateOGImageUrl(image),
        width: seoConfig.ogImage.width,
        height: seoConfig.ogImage.height,
        alt: `${title} | ${seoConfig.siteName}`,
      }
    : seoConfig.openGraph.images[0];

  const metadata = {
    title: fullTitle,
    description: fullDescription,
    keywords: allKeywords.join(','),
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
      images: [ogImage.url || ogImage],
    },
  };

  if (publishedTime) {
    metadata.openGraph.publishedTime = publishedTime.toISOString();
  }

  if (modifiedTime) {
    metadata.openGraph.modifiedTime = modifiedTime.toISOString();
  }

  return metadata;
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

  return generateMetadata({
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

  return generateMetadata({
    title,
    description,
    path,
    keywords,
    image,
    type: 'website',
  });
}

/**
 * Generate metadata for blog/article pages
 * @param {Object} options - Article metadata options
 * @param {string} options.title - Article title
 * @param {string} options.description - Article description
 * @param {string} options.path - Article path
 * @param {string} options.image - Article image
 * @param {Date} options.publishedTime - Publication date
 * @param {Date} options.modifiedTime - Last modified date
 * @returns {Object} Article page metadata
 */
export function generateArticleMetadata({
  title,
  description,
  path,
  image,
  publishedTime,
  modifiedTime,
}) {
  const fullTitle = generateTitle(title);
  const keywords = ['Codespire', 'AI blog', 'enterprise AI', 'digital engineering'];

  return generateMetadata({
    title: fullTitle,
    description,
    path,
    keywords,
    image,
    type: 'article',
    publishedTime,
    modifiedTime,
  });
}

export default {
  generateMetadata,
  generateProductMetadata,
  generateServiceMetadata,
  generateArticleMetadata,
};

