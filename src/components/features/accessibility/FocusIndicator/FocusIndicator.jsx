'use client';

import { useEffect } from 'react';

/**
 * Focus Indicator Component
 * Provides visible focus indicators for keyboard navigation
 * WCAG 2.1 Level AA requirement (2.4.7 Focus Visible)
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.enabled - Enable focus indicators (default: true)
 * @param {string} props.style - Focus indicator style ('outline' | 'ring')
 * @example
 * <FocusIndicator enabled={true} style="ring" />
 */
export default function FocusIndicator({ enabled = true, style = 'ring' }) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Add CSS for focus indicators if not already present
    const styleId = 'focus-indicator-styles';
    if (document.getElementById(styleId)) {
      return;
    }

    const styleSheet = document.createElement('style');
    styleSheet.id = styleId;
    
    const focusStyles = style === 'ring' 
      ? `
        /* Focus Ring Styles */
        *:focus-visible {
          outline: 3px solid var(--primary, #384bff);
          outline-offset: 2px;
          border-radius: 4px;
        }
        button:focus-visible,
        a:focus-visible,
        input:focus-visible,
        select:focus-visible,
        textarea:focus-visible {
          outline: 3px solid var(--primary, #384bff);
          outline-offset: 2px;
        }
      `
      : `
        /* Focus Outline Styles */
        *:focus-visible {
          outline: 2px solid var(--primary, #384bff);
          outline-offset: 2px;
        }
      `;

    styleSheet.textContent = focusStyles;
    document.head.appendChild(styleSheet);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [enabled, style]);

  return null;
}

