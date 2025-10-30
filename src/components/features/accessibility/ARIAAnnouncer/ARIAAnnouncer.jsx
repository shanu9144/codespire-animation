'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * ARIA Live Region Announcer
 * Provides screen reader announcements for dynamic content changes
 * WCAG 2.1 Level A requirement (4.1.3 Status Messages)
 * 
 * @component
 * @example
 * <ARIAAnnouncer />
 */
export default function ARIAAnnouncer() {
  const [announcements, setAnnouncements] = useState([]);
  const liveRegionRef = useRef(null);

  useEffect(() => {
    // Create live region element
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'aria-announcer';
    document.body.appendChild(liveRegion);
    liveRegionRef.current = liveRegion;

    return () => {
      if (liveRegionRef.current) {
        document.body.removeChild(liveRegionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (liveRegionRef.current && announcements.length > 0) {
      const latestAnnouncement = announcements[announcements.length - 1];
      liveRegionRef.current.textContent = latestAnnouncement.message;
      
      // Clear announcement after it's been read
      setTimeout(() => {
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = '';
        }
        setAnnouncements((prev) => prev.slice(0, -1));
      }, 1000);
    }
  }, [announcements]);

  // Expose announce function via window for global access
  useEffect(() => {
    window.ariaAnnounce = (message, priority = 'polite') => {
      const id = Date.now().toString();
      setAnnouncements((prev) => [...prev, { id, message, priority }]);
    };

    return () => {
      delete window.ariaAnnounce;
    };
  }, []);

  return null;
}

/**
 * Hook to announce messages to screen readers
 * @returns {Function} Announce function
 */
export function useAriaAnnounce() {
  const announce = (message, priority = 'polite') => {
    if (window.ariaAnnounce) {
      window.ariaAnnounce(message, priority);
    }
  };

  return announce;
}

