/**
 * ARIA Helper Utilities
 * Utility functions for ARIA attributes
 * 
 * @module lib/accessibility/utils/aria-helpers
 */

/**
 * Generate ARIA label from text content
 * @param {string} text - Text content
 * @returns {string} ARIA label
 */
export function generateAriaLabel(text) {
  if (!text) return '';
  return text.trim();
}

/**
 * Generate ARIA described by ID
 * @param {string} prefix - ID prefix
 * @param {string} suffix - ID suffix
 * @returns {string} ARIA described by ID
 */
export function generateAriaDescribedBy(prefix = 'desc', suffix = '') {
  return `${prefix}-${suffix || Date.now()}`;
}

/**
 * Check if element should have ARIA hidden
 * @param {boolean} isVisible - Element visibility
 * @param {boolean} isScreenReaderOnly - Screen reader only content
 * @returns {string|undefined} ARIA hidden value
 */
export function getAriaHidden(isVisible, isScreenReaderOnly) {
  if (isScreenReaderOnly) return undefined;
  return isVisible ? undefined : 'true';
}

/**
 * Generate ARIA live region attributes
 * @param {string} priority - Priority level ('polite' | 'assertive')
 * @returns {Object} ARIA live region attributes
 */
export function getAriaLiveAttributes(priority = 'polite') {
  return {
    'aria-live': priority,
    'aria-atomic': 'true',
  };
}

/**
 * Generate ARIA role attributes for common patterns
 * @param {string} role - ARIA role
 * @returns {Object} Role attributes
 */
export function getRoleAttributes(role) {
  return {
    role,
  };
}

export default {
  generateAriaLabel,
  generateAriaDescribedBy,
  getAriaHidden,
  getAriaLiveAttributes,
  getRoleAttributes,
};

