/**
 * Dynamic Sitemap Generation for CodeSpire
 * Auto-generates sitemap from route structure
 * 
 * @module app/sitemap
 */

import { seoConfig } from '@/config/seo';

/**
 * Site pages configuration
 * All routes should be listed here with their priorities and change frequencies
 */
const sitePages = [
  // Homepage
  {
    url: '',
    priority: 1.0,
    changeFrequency: 'daily',
    lastModified: new Date(),
  },
  // Marketing pages
  {
    url: '/about',
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: new Date(),
  },
  {
    url: '/contact',
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: new Date(),
  },
  {
    url: '/schedule-demo',
    priority: 0.9,
    changeFrequency: 'weekly',
    lastModified: new Date(),
  },
  {
    url: '/privacy',
    priority: 0.3,
    changeFrequency: 'yearly',
    lastModified: new Date(),
  },
  // Products
  {
    url: '/products',
    priority: 0.9,
    changeFrequency: 'weekly',
    lastModified: new Date(),
  },
  {
    url: '/products/smart-rfq-ai',
    priority: 0.9,
    changeFrequency: 'weekly',
    lastModified: new Date(),
  },
  {
    url: '/products/supplier-match-ai',
    priority: 0.9,
    changeFrequency: 'weekly',
    lastModified: new Date(),
  },
  {
    url: '/products/forecast-ai',
    priority: 0.9,
    changeFrequency: 'weekly',
    lastModified: new Date(),
  },
  // Services
  {
    url: '/services',
    priority: 0.9,
    changeFrequency: 'weekly',
    lastModified: new Date(),
  },
  {
    url: '/services/ai-pod',
    priority: 0.8,
    changeFrequency: 'weekly',
    lastModified: new Date(),
  },
  {
    url: '/services/digital-engineering',
    priority: 0.8,
    changeFrequency: 'weekly',
    lastModified: new Date(),
  },
  {
    url: '/services/app-development',
    priority: 0.8,
    changeFrequency: 'weekly',
    lastModified: new Date(),
  },
  {
    url: '/services/data-analytics',
    priority: 0.8,
    changeFrequency: 'weekly',
    lastModified: new Date(),
  },
  {
    url: '/services/mvp-prototyping',
    priority: 0.8,
    changeFrequency: 'weekly',
    lastModified: new Date(),
  },
  {
    url: '/services/salesforce-servicenow',
    priority: 0.8,
    changeFrequency: 'weekly',
    lastModified: new Date(),
  },
  {
    url: '/services/sre-support',
    priority: 0.8,
    changeFrequency: 'weekly',
    lastModified: new Date(),
  },
  {
    url: '/services/ui-ux-design',
    priority: 0.8,
    changeFrequency: 'weekly',
    lastModified: new Date(),
  },
];

/**
 * Generate sitemap
 * @returns {Array} Array of sitemap entries
 */
export default function sitemap() {
  const baseUrl = seoConfig.siteUrl.replace(/\/$/, '');

  return sitePages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}

