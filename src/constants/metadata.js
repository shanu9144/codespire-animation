/**
 * Static Metadata Constants for CodeSpire
 * 
 * @module constants/metadata
 */

import { seoConfig } from '@/config/seo';

/**
 * Site metadata constants
 */
export const SITE_METADATA = {
  name: seoConfig.siteName,
  url: seoConfig.siteUrl,
  tagline: seoConfig.siteTagline,
  description: seoConfig.defaultMeta.description,
};

/**
 * Contact information
 */
export const CONTACT_INFO = {
  email: 'info@codespire.com',
  phone: '+1-555-CODE-SPIRE',
  address: {
    street: '4754 U.S. Route 40',
    city: 'Tipp City',
    state: 'OH',
    zip: '45371',
    country: 'US',
  },
};

/**
 * Social media links
 */
export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/codespire',
  twitter: 'https://twitter.com/codespire',
  github: 'https://github.com/codespire',
};

export default {
  SITE_METADATA,
  CONTACT_INFO,
  SOCIAL_LINKS,
};

