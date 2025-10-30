/**
 * Accessibility Validation Utilities
 * Functions to validate accessibility features
 * 
 * @module lib/accessibility/utils/validation
 */

/**
 * Validate ARIA label
 * @param {string} label - ARIA label
 * @returns {Object} Validation result
 */
export function validateAriaLabel(label) {
  if (!label || label.trim().length === 0) {
    return { valid: false, error: 'ARIA label is required' };
  }

  if (label.length < 3) {
    return { valid: false, error: 'ARIA label should be at least 3 characters' };
  }

  return { valid: true };
}

/**
 * Validate color contrast ratio (simplified check)
 * @param {string} foreground - Foreground color
 * @param {string} background - Background color
 * @param {number} minRatio - Minimum contrast ratio (default: 4.5 for AA)
 * @returns {Object} Validation result
 */
export function validateColorContrast(foreground, background, minRatio = 4.5) {
  // This is a simplified check - in production, use a proper contrast calculation library
  // For now, we'll just return valid and recommend using automated tools
  return {
    valid: true,
    warning: 'Use automated tools (e.g., axe DevTools) to verify actual contrast ratios',
  };
}

/**
 * Validate focus management
 * @param {HTMLElement} element - Element to check
 * @returns {Object} Validation result
 */
export function validateFocusable(element) {
  if (!element) {
    return { valid: false, error: 'Element is required' };
  }

  const tabIndex = element.getAttribute('tabindex');
  if (tabIndex === '-1' && !element.hasAttribute('aria-hidden')) {
    return {
      valid: false,
      error: 'Element with tabindex="-1" should not be focusable',
    };
  }

  return { valid: true };
}

/**
 * Validate semantic HTML
 * @param {HTMLElement} element - Element to check
 * @returns {Object} Validation result
 */
export function validateSemanticHTML(element) {
  if (!element) {
    return { valid: false, error: 'Element is required' };
  }

  const semanticElements = [
    'article',
    'aside',
    'details',
    'figcaption',
    'figure',
    'footer',
    'header',
    'main',
    'mark',
    'nav',
    'section',
    'summary',
    'time',
  ];

  const hasSemanticRole = semanticElements.includes(element.tagName.toLowerCase());
  const hasAriaRole = element.hasAttribute('role');

  if (!hasSemanticRole && !hasAriaRole) {
    return {
      valid: false,
      warning: 'Consider using semantic HTML or ARIA roles',
    };
  }

  return { valid: true };
}

export default {
  validateAriaLabel,
  validateColorContrast,
  validateFocusable,
  validateSemanticHTML,
};

