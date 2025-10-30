/**
 * Structured Data Templates for CodeSpire
 * Schema.org JSON-LD templates for SEO
 * 
 * @module lib/seo/config/structured-data
 */

import { seoConfig } from '@/config/seo';

/**
 * Generate Organization structured data
 * @returns {Object} Organization schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seoConfig.structuredData.organization.name,
    url: seoConfig.structuredData.organization.url,
    logo: seoConfig.structuredData.organization.logo,
    description: seoConfig.structuredData.organization.description,
    foundingDate: seoConfig.structuredData.organization.foundingDate,
    address: {
      '@type': 'PostalAddress',
      streetAddress: seoConfig.structuredData.organization.address.streetAddress,
      addressLocality: seoConfig.structuredData.organization.address.addressLocality,
      addressRegion: seoConfig.structuredData.organization.address.addressRegion,
      postalCode: seoConfig.structuredData.organization.address.postalCode,
      addressCountry: seoConfig.structuredData.organization.address.addressCountry,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: seoConfig.structuredData.organization.contactPoint.contactType,
      areaServed: seoConfig.structuredData.organization.contactPoint.areaServed,
      availableLanguage: seoConfig.structuredData.organization.contactPoint.availableLanguage,
    },
    sameAs: seoConfig.structuredData.organization.sameAs,
  };
}

/**
 * Generate BreadcrumbList structured data
 * @param {Array<{name: string, url: string}>} items - Breadcrumb items
 * @returns {Object} BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQPage structured data
 * @param {Array<{question: string, answer: string}>} faqs - FAQ items
 * @returns {Object} ProgramFAQPage schema
 */
export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Service structured data
 * @param {Object} options - Service options
 * @param {string} options.name - Service name
 * @param {string} options.description - Service description
 * @param {string} options.url - Service URL
 * @param {string} options.serviceType - Type of service
 * @param {Array} options.offers - Service offers/catalog
 * @returns {Object} Service schema
 */
export function generateServiceSchema({ name, description, url, serviceType, offers = [] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${name} | CodeSpire Solutions`,
    description,
    provider: {
      '@type': 'Organization',
      name: seoConfig.structuredData.organization.name,
      url: seoConfig.structuredData.organization.url,
      logo: seoConfig.structuredData.organization.logo,
    },
    serviceType,
    url,
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
  };

  if (offers.length > 0) {
    schema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `${name} Services`,
      itemListElement: offers.map((offer) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: offer.name,
          description: offer.description,
        },
      })),
    };
  }

  return schema;
}

/**
 * Generate Product structured data
 * @param {Object} options - Product options
 * @param {string} options.name - Product name
 * @param {string} options.description - Product description
 * @param {string} options.url - Product URL
 * @param {string} options.image - Product image URL
 * @returns {Object} Product schema
 */
export function generateProductSchema({ name, description, url, image }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${name} | CodeSpire Solutions`,
    description,
    url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      description: `Enterprise ${name} solution by CodeSpire`,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    provider: {
      '@type': 'Organization',
      name: seoConfig.structuredData.organization.name,
      url: seoConfig.structuredData.organization.url,
      logo: seoConfig.structuredData.organization.logo,
    },
    image: image || seoConfig.structuredData.organization.logo,
  };
}

export default {
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateServiceSchema,
  generateProductSchema,
};

