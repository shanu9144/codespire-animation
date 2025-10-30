/**
 * SEO Validation Utilities
 * Functions to validate SEO metadata and content
 * 
 * @module lib/seo/utils/validation
 */

/**
 * Validate title length
 * @param {string} title - Page title
 * @param {number} maxLength - Maximum length (default: 60)
 * @returns {Object} Validation result
 */
export function validateTitle(title, maxLength = 60) {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: 'Title is required' };
  }

  if (title.length > maxLength) {
    return {
      valid: false,
      error: `Title should be ${maxLength} characters or less (currently ${title.length})`,
    };
  }

  return { valid: true };
}

/**
 * Validate description length
 * @param {string} description - Meta description
 * @param {number} maxLength - Maximum length (default: 160)
 * @returns {Object} Validation result
 */
export function validateDescription(description, maxLength = 160) {
  if (!description || description.trim().length === 0) {
    return { valid: false, error: 'Description is required' };
  }

  if (description.length < 50) {
    return {
      valid: false,
      error: `Description should be at least 50 characters (currently ${description.length})`,
    };
  }

  if (description.length > maxLength) {
    return {
      valid: false,
      error: `Description should be ${maxLength} characters or less (currently ${description.length})`,
    };
  }

  return { valid: true };
}

/**
 * Validate keywords array
 * @param {string[]} keywords - Keywords array
 * @param {number} maxKeywords - Maximum number of keywords (default: 10)
 * @returns {Object} Validation result
 */
export function validateKeywords(keywords, maxKeywords = 10) {
  if (!Array.isArray(keywords)) {
    return { valid: false, error: 'Keywords must be an array' };
  }

  if (keywords.length > maxKeywords) {
    return {
      valid: false,
      error: `Should have ${maxKeywords} or fewer keywords (currently ${keywords.length})`,
    };
  }

  return { valid: true };
}

/**
 * Validate canonical URL
 * @param {string} url - Canonical URL
 * @returns {Object} Validation result
 */
export function validateCanonicalUrl(url) {
  if (!url || url.trim().length === 0) {
    return { valid: false, error: 'Canonical URL is required' };
  }

  try {
    new URL(url);
    return { valid: true };
  } catch (e) {
    return { valid: false, error: 'Canonical URL must be a valid URL' };
  }
}

/**
 * Validate complete metadata object
 * @param {Object} metadata - Metadata object
 * @returns {Object} Validation result with errors array
 */
export function validateMetadata(metadata) {
  const errors = [];

  const titleValidation = validateTitle(metadata.title);
  if (!titleValidation.valid) {
    errors.push(`Title: ${titleValidation.error}`);
  }

  const descValidation = validateDescription(metadata.description);
  if (!descValidation.valid) {
    errors.push(`Description: ${descValidation.error}`);
  }

  if (metadata.keywords) {
    const keywordsArray = Array.isArray(metadata.keywords)
      ? metadata.keywords
      : metadata.keywords.split(',');
    const keywordsValidation = validateKeywords(keywordsArray);
    if (!keywordsValidation.valid) {
      errors.push(`Keywords: ${keywordsValidation.error}`);
    }
  }

  if (metadata.alternates?.canonical) {
    const canonicalValidation = validateCanonicalUrl(metadata.alternates.canonical);
    if (!canonicalValidation.valid) {
      errors.push(`Canonical URL: ${canonicalValidation.error}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export default {
  validateTitle,
  validateDescription,
  validateKeywords,
  validateCanonicalUrl,
  validateMetadata,
};

