/**
 * SEO Keywords Configuration for CodeSpire
 * Centralized keyword definitions for consistency across the site
 * 
 * @module lib/seo/config/keywords
 */

/**
 * Primary keywords - "Codespire" focused
 * @type {string[]}
 */
export const primaryKeywords = [
  'Codespire',
  'Codespire Solutions',
  'Codespire AI',
  'Codespire digital engineering',
  'Codespire enterprise AI',
];

/**
 * Secondary keywords - Long-tail and related
 * @type {string[]}
 */
export const secondaryKeywords = [
  'Codespire AI solutions',
  'Codespire enterprise AI',
  'Codespire digital transformation',
  'Codespire AI consulting',
  'Codespire product engineering',
  'Codespire rapid AI development',
  'AI product engineering',
  'Enterprise AI solutions',
  'Digital engineering services',
  'AI consulting services',
  'Manufacturing AI',
  'BFSI AI solutions',
  'Hi-tech AI',
];

/**
 * Industry-specific keywords
 * @type {Object<string, string[]>}
 */
export const industryKeywords = {
  manufacturing: [
    'Codespire manufacturing',
    'Manufacturing AI solutions',
    'Smart manufacturing',
    'Industry 4.0',
  ],
  bfsi: [
    'Codespire BFSI',
    'BFSI AI solutions',
    'Financial services AI',
    'Banking AI',
  ],
  hitech: [
    'Codespire hi-tech',
    'Hi-tech AI solutions',
    'Technology AI',
  ],
};

/**
 * Service-specific keywords
 * @type {Object<string, string[]>}
 */
export const serviceKeywords = {
  digitalEngineering: [
    'Codespire digital engineering',
    'Digital engineering services',
    'AI-powered engineering',
    'Engineering automation',
  ],
  aiPod: [
    'Codespire AI POD',
    'AI POD as a Service',
    'Agile AI development',
    'Rapid AI prototyping',
  ],
  dataAnalytics: [
    'Codespire data analytics',
    'AI data analytics',
    'Business intelligence',
    'Data-driven solutions',
  ],
  appDevelopment: [
    'Codespire app development',
    'AI app development',
    'Enterprise application development',
  ],
  uiUxDesign: [
    'Codespire UI/UX design',
    'AI-powered design',
    'User experience design',
  ],
};

/**
 * Product-specific keywords
 * @type {Object<string, string[]>}
 */
export const productKeywords = {
  smartRFQ: [
    'Codespire Smart RFQ AI',
    'Smart RFQ AI',
    'RFQ management AI',
    'Intelligent quoting',
  ],
  supplierMatch: [
    'Codespire Supplier Match AI',
    'Supplier Match AI',
    'Smart sourcing',
    'AI supplier selection',
  ],
  forecastAI: [
    'Codespire Forecast AI',
    'Forecast AI',
    'AI forecasting',
    'Predictive analytics',
  ],
};

/**
 * Combine keywords for a page
 * @param {string[]} pageKeywords - Page-specific keywords
 * @param {string[]} additionalKeywords - Additional keyword arrays
 * @returns {string[]} Combined unique keywords
 */
export function combineKeywords(pageKeywords = [], ...additionalKeywords) {
  const allKeywords = [
    ...pageKeywords,
    ...additionalKeywords.flat(),
  ];
  
  // Remove duplicates and return
  return [...new Set(allKeywords)];
}

/**
 * Get keywords for a specific service
 * @param {string} serviceName - Service name
 * @returns {string[]} Service keywords
 */
export function getServiceKeywords(serviceName) {
  const serviceKey = serviceName
    .toLowerCase()
    .replace(/\s+/g, '');
  
  return serviceKeywords[serviceKey] || [];
}

/**
 * Get keywords for a specific product
 * @param {string} productName - Product name
 * @returns {string[]} Product keywords
 */
export function getProductKeywords(productName) {
  const productKey = productName
    .toLowerCase()
    .replace(/\s+/g, '');
  
  return productKeywords[productKey] || [];
}

export default {
  primaryKeywords,
  secondaryKeywords,
  industryKeywords,
  serviceKeywords,
  productKeywords,
  combineKeywords,
  getServiceKeywords,
  getProductKeywords,
};

