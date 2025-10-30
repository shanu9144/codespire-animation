'use client';

import { useMemo } from 'react';
import { generateMetadata } from '@/lib/seo/utils/generate-metadata';
import { validateMetadata } from '@/lib/seo/utils/validation';

/**
 * SEO Hook
 * Provides SEO metadata generation and validation for components
 * 
 * @param {Object} options - SEO options
 * @param {string} options.title - Page title
 * @param {string} options.description - Page description
 * @param {string} options.path - Page path
 * @param {string[]} options.keywords - Keywords
 * @param {string} options.image - OG image
 * @param {string} options.type - OG type
 * @returns {Object} SEO metadata and utilities
 */
export function useSEO({
  title,
  description,
  path,
  keywords = [],
  image,
  type = 'website',
}) {
  const metadata = useMemo(() => {
    return generateMetadata({
      title,
      description,
      path,
      keywords,
      image,
      type,
    });
  }, [title, description, path, keywords, image, type]);

  const validation = useMemo(() => {
    return validateMetadata(metadata);
  }, [metadata]);

  return {
    metadata,
    validation,
    isValid: validation.valid,
    errors: validation.errors,
  };
}

export default useSEO;

