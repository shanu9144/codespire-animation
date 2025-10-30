'use client';

import { useMemo } from 'react';
import {
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateServiceSchema,
  generateProductSchema,
} from '@/lib/seo/config/structured-data';

/**
 * Structured Data Hook
 * Provides structured data generation for components
 * 
 * @param {Object} options - Structured data options
 * @returns {Object} Structured data objects
 */
export function useStructuredData({
  organization = true,
  breadcrumbs,
  faqs,
  service,
  product,
}) {
  const schemas = useMemo(() => {
    const result = {};

    if (organization) {
      result.organization = generateOrganizationSchema();
    }

    if (breadcrumbs && breadcrumbs.length > 0) {
      result.breadcrumbs = generateBreadcrumbSchema(breadcrumbs);
    }

    if (faqs && faqs.length > 0) {
      result.faqs = generateFAQSchema(faqs);
    }

    if (service) {
      result.service = generateServiceSchema(service);
    }

    if (product) {
      result.product = generateProductSchema(product);
    }

    return result;
  }, [organization, breadcrumbs, faqs, service, product]);

  return schemas;
}

export default useStructuredData;

