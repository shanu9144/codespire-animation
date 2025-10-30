/**
 * Analytics Configuration
 * Configuration for analytics and tracking
 * 
 * @module config/analytics
 */

/**
 * Analytics configuration
 */
export const analyticsConfig = {
  // Google Analytics (if implemented)
  googleAnalytics: {
    enabled: process.env.NEXT_PUBLIC_GA_ENABLED === 'true',
    trackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
  },

  // Google Tag Manager (if implemented)
  googleTagManager: {
    enabled: process.env.NEXT_PUBLIC_GTM_ENABLED === 'true',
    containerId: process.env.NEXT_PUBLIC_GTM_CONTAINER_ID,
  },

  // Privacy settings
  privacy: {
    respectDoNotTrack: true,
    anonymizeIP: true,
  },
};

export default analyticsConfig;

