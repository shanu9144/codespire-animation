/**
 * Dynamic Robots.txt Generation for CodeSpire
 * 
 * @module app/robots
 */

import { seoConfig } from '@/config/seo';

/**
 * Generate robots.txt content
 * @returns {Object} Robots configuration
 */
export default function robots() {
  const sitemapUrl = `${seoConfig.siteUrl}/sitemap.xml`;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: sitemapUrl,
  };
}

