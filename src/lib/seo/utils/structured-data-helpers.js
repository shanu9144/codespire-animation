/**
 * Structured Data Helper Utilities
 * Helper functions for generating structured data
 * 
 * @module lib/seo/utils/structured-data-helpers
 */

import { seoConfig } from '@/config/seo';

/**
 * Generate organization object for structured data
 * @returns {Object} Organization object
 */
export function getOrganizationData() {
  return {
    '@type': 'Organization',
    name: seoConfig.structuredData.organization.name,
    url: seoConfig.structuredData.organization.url,
    logo: seoConfig.structuredData.organization.logo,
  };
}

/**
 * Generate breadcrumb items
 * @param {string[]} segments - URL path segments
 * @param {Object} labels - Custom labels for segments
 * @returns {Array<{name: string, url: string}>} Breadcrumb items
 */
export function generateBreadcrumbItems(segments, labels = {}) {
  const baseUrl = seoConfig.siteUrl.replace(/\/$/, '');
  const items = [{ name: 'Home', url: baseUrl }];

  let currentPath = '';
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = labels[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    items.push({
      name: label,
      url: `${baseUrl}${currentPath}`,
    });
  });

  return items;
}

/**
 * Validate structured data object
 * @param {Object} data - Structured data object
 * @returns {boolean} True if valid
 */
export function validateStructuredData(data) {
  if (!data || typeof data !== 'object') {
    return false;
  }

  if (!data['@context'] || !data['@type']) {
    return false;
  }

  return true;
}

export default {
  getOrganizationData,
  generateBreadcrumbItems,
  validateStructuredData,
};

