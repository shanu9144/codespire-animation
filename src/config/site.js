/**
 * Site-wide Configuration
 * Centralized site configuration and constants
 * 
 * @module config/site
 */

/**
 * Site configuration
 */
export const siteConfig = {
  name: 'CodeSpire Solutions',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://codespire.com',
  description: 'From Idea to Enterprise-Grade AI in a Blink',
  tagline: 'Transforming businesses with AI-powered solutions',
  
  // Company information
  company: {
    name: 'CodeSpire Solutions',
    founded: 2020,
    address: {
      street: '4754 U.S. Route 40',
      city: 'Tipp City',
      state: 'OH',
      zip: '45371',
      country: 'US',
    },
    contact: {
      email: 'info@codespire.com',
      phone: '+1-555-CODE-SPIRE',
    },
  },

  // Social media
  social: {
    linkedin: 'https://linkedin.com/company/codespire',
    twitter: 'https://twitter.com/codespire',
    github: 'https://github.com/codespire',
  },

  // Feature flags
  features: {
    enableAnimations: true,
    enableAnalytics: true,
    enablePerformanceMonitoring: true,
  },

  // Performance settings
  performance: {
    imageOptimization: true,
    lazyLoading: true,
    codeSplitting: true,
  },
};

export default siteConfig;

