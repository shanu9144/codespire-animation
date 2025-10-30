/**
 * Sitemap Generation Utilities
 * Helper functions for sitemap generation
 * 
 * @module lib/seo/utils/generate-sitemap
 */

import { seoConfig } from '@/config/seo';

/**
 * Generate sitemap entry
 * @param {Object} options - Sitemap entry options
 * @param {string} options.path - Page path
 * @param {number} options.priority - Priority (0.0 to 1.0)
 * @param {string} options.changeFrequency - Change frequency
 * @param {Date} options.lastModified - Last modified date
 * @returns {Object} Sitemap entry
 */
export function generateSitemapEntry({
  path,
  priority = 0.5,
  changeFrequency = 'monthly',
  lastModified = new Date(),
}) {
  const baseUrl = seoConfig.siteUrl.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return {
    url: `${baseUrl}${cleanPath}`,
    lastModified,
    changeFrequency,
    priority,
  };
}

/**
 * Generate sitemap entries for a list of pages
 * @param {Array<Object>} pages - Array of page configurations
 * @returns {Array<Object>} Array of sitemap entries
 */
export function generateSitemapEntries(pages) {
  return pages.map((page) =>
    generateSitemapEntry({
      path: page.path || page.url,
      priority: page.priority,
      changeFrequency: page.changeFrequency,
      lastModified: page.lastModified,
    })
  );
}

export default {
  generateSitemapEntry,
  generateSitemapEntries,
};

