/**
 * Route Constants
 * Centralized route definitions for the application
 * 
 * @module constants/routes
 */

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codespire.com';

/**
 * Application routes
 */
export const ROUTES = {
  // Marketing pages
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  SCHEDULE_DEMO: '/schedule-demo',

  // Products
  PRODUCTS: '/products',
  PRODUCT_SMART_RFQ: '/products/smart-rfq-ai',
  PRODUCT_SUPPLIER_MATCH: '/products/supplier-match-ai',
  PRODUCT_FORECAST: '/products/forecast-ai',

  // Services
  SERVICES: '/services',
  SERVICE_AI_POD: '/services/ai-pod',
  SERVICE_DIGITAL_ENGINEERING: '/services/digital-engineering',
  SERVICE_APP_DEVELOPMENT: '/services/app-development',
  SERVICE_DATA_ANALYTICS: '/services/data-analytics',
  SERVICE_MVP_PROTOTYPING: '/services/mvp-prototyping',
  SERVICE_SALESFORCE_SERVICENOW: '/services/salesforce-servicenow',
  SERVICE_SRE_SUPPORT: '/services/sre-support',
  SERVICE_UI_UX_DESIGN: '/services/ui-ux-design',
};

/**
 * Get full URL for a route
 * @param {string} route - Route path
 * @returns {string} Full URL
 */
export function getFullUrl(route) {
  return `${baseUrl}${route}`;
}

/**
 * Check if route is active
 * @param {string} currentPath - Current pathname
 * @param {string} route - Route to check
 * @returns {boolean} True if route is active
 */
export function isActiveRoute(currentPath, route) {
  if (route === ROUTES.HOME) {
    return currentPath === route;
  }
  return currentPath.startsWith(route);
}

export default ROUTES;

