/**
 * Keyboard Helper Utilities
 * Utility functions for keyboard navigation
 * 
 * @module lib/accessibility/utils/keyboard-helpers
 */

/**
 * Check if key is an arrow key
 * @param {string} key - Key pressed
 * @returns {boolean} True if arrow key
 */
export function isArrowKey(key) {
  return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key);
}

/**
 * Check if key is a navigation key
 * @param {string} key - Key pressed
 * @returns {boolean} True if navigation key
 */
export function isNavigationKey(key) {
  return isArrowKey(key) || ['Home', 'End', 'PageUp', 'PageDown'].includes(key);
}

/**
 * Check if key is a modifier key
 * @param {KeyboardEvent} event - Keyboard event
 * @returns {boolean} True if modifier key pressed
 */
export function hasModifierKey(event) {
  return event.shiftKey || event.ctrlKey || event.altKey || event.metaKey;
}

/**
 * Get direction from arrow key
 * @param {string} key - Arrow key
 * @returns {string|null} Direction ('up' | 'down' | 'left' | 'right')
 */
export function getArrowDirection(key) {
  const directions = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
  };
  return directions[key] || null;
}

export default {
  isArrowKey,
  isNavigationKey,
  hasModifierKey,
  getArrowDirection,
};

