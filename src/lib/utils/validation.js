/**
 * Validation Utilities
 * General validation functions
 * 
 * @module lib/utils/validation
 */

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export function isValidEmail(email) {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
export function isValidUrl(url) {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate phone number (US format)
 * @param {string} phone - Phone to validate
 * @returns {boolean} True if valid phone
 */
export function isValidPhone(phone) {
  if (!phone) return false;
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || cleaned.length === 11;
}

/**
 * Validate required field
 * @param {*} value - Value to validate
 * @returns {boolean} True if value exists
 */
export function isRequired(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return Boolean(value);
}

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length
 * @returns {boolean} True if meets minimum length
 */
export function minLength(value, minLength) {
  if (!value) return false;
  return String(value).length >= minLength;
}

/**
 * Validate maximum length
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum length
 * @returns {boolean} True if within maximum length
 */
export function maxLength(value, maxLength) {
  if (!value) return true;
  return String(value).length <= maxLength;
}

export default {
  isValidEmail,
  isValidUrl,
  isValidPhone,
  isRequired,
  minLength,
  maxLength,
};

