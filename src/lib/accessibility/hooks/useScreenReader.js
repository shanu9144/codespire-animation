'use client';

import { useState, useEffect } from 'react';

/**
 * Screen Reader Detection Hook
 * Detects if user is using a screen reader
 * 
 * @returns {Object} Screen reader detection state
 */
export function useScreenReader() {
  const [isScreenReader, setIsScreenReader] = useState(false);

  useEffect(() => {
    const checkScreenReader = () => {
      // Check for common screen reader indicators
      const hasScreenReader =
        window.speechSynthesis ||
        window.navigator.userAgent.includes('NVDA') ||
        window.navigator.userAgent.includes('JAWS') ||
        window.navigator.userAgent.includes('VoiceOver') ||
        document.querySelector('[aria-hidden="false"]') !== null ||
        // Check for high contrast mode (often used with screen readers)
        window.matchMedia('(prefers-contrast: high)').matches;

      setIsScreenReader(hasScreenReader);
    };

    checkScreenReader();

    // Re-check periodically
    const interval = setInterval(checkScreenReader, 5000);
    return () => clearInterval(interval);
  }, []);

  return { isScreenReader };
}

export default useScreenReader;

