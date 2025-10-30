/**
 * Accessibility Configuration
 * Centralized accessibility settings and constants
 * 
 * @module config/accessibility
 */

/**
 * Accessibility configuration constants
 */
export const accessibilityConfig = {
  // Focus indicator styles
  focusIndicator: {
    style: 'ring', // 'outline' | 'ring'
    width: '3px',
    color: 'var(--primary, #384bff)',
    offset: '2px',
  },

  // Skip link configuration
  skipLinks: {
    defaultLinks: [
      { label: 'Skip to main content', targetId: 'main-content' },
      { label: 'Skip to navigation', targetId: 'main-navigation' },
    ],
  },

  // ARIA live region configuration
  ariaLive: {
    priority: 'polite', // 'polite' | 'assertive' | 'off'
    atomic: true,
  },

  // Color contrast requirements
  contrast: {
    normalText: 4.5, // WCAG AA
    largeText: 3.0, // WCAG AA
    enhancedText: 7.0, // WCAG AAA
  },

  // Keyboard navigation
  keyboard: {
    // Keyboard shortcuts can be defined here
    shortcuts: {},
  },

  // Animation preferences
  animations: {
    respectReducedMotion: true,
    defaultDuration: 300,
  },
};

export default accessibilityConfig;

