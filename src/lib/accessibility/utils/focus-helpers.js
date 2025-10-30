/**
 * Focus Helper Utilities
 * Utility functions for focus management
 * 
 * @module lib/accessibility/utils/focus-helpers
 */

/**
 * Get all focusable elements in a container
 * @param {HTMLElement} container - Container element
 * @returns {NodeList} Focusable elements
 */
export function getFocusableElements(container = document) {
  return container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
}

/**
 * Trap focus within a container element
 * @param {HTMLElement} container - Container element
 * @param {HTMLElement} firstFocusable - First focusable element
 * @param {HTMLElement} lastFocusable - Last focusable element
 */
export function trapFocus(container, firstFocusable, lastFocusable) {
  const handleTab = (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    }
  };

  container.addEventListener('keydown', handleTab);
  return () => container.removeEventListener('keydown', handleTab);
}

/**
 * Focus first element in container
 * @param {HTMLElement} container - Container element
 */
export function focusFirstElement(container) {
  const focusable = getFocusableElements(container);
  if (focusable.length > 0) {
    focusable[0].focus();
  }
}

/**
 * Focus last element in container
 * @param {HTMLElement} container - Container element
 */
export function focusLastElement(container) {
  const focusable = getFocusableElements(container);
  if (focusable.length > 0) {
    focusable[focusable.length - 1].focus();
  }
}

export default {
  getFocusableElements,
  trapFocus,
  focusFirstElement,
  focusLastElement,
};

