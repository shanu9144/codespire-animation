'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Comprehensive Accessibility System for Digital Engineering Page
 * Provides ARIA labels, keyboard navigation, screen reader support, and more
 */

// Focus management hook
export const useFocusManagement = () => {
  const focusableElements = useRef([]);
  const currentFocusIndex = useRef(0);
  
  const updateFocusableElements = useCallback(() => {
    const elements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusableElements.current = Array.from(elements);
  }, []);
  
  const focusNext = useCallback(() => {
    updateFocusableElements();
    currentFocusIndex.current = (currentFocusIndex.current + 1) % focusableElements.current.length;
    focusableElements.current[currentFocusIndex.current]?.focus();
  }, [updateFocusableElements]);
  
  const focusPrevious = useCallback(() => {
    updateFocusableElements();
    currentFocusIndex.current = currentFocusIndex.current === 0 
      ? focusableElements.current.length - 1 
      : currentFocusIndex.current - 1;
    focusableElements.current[currentFocusIndex.current]?.focus();
  }, [updateFocusableElements]);
  
  const focusFirst = useCallback(() => {
    updateFocusableElements();
    currentFocusIndex.current = 0;
    focusableElements.current[0]?.focus();
  }, [updateFocusableElements]);
  
  const focusLast = useCallback(() => {
    updateFocusableElements();
    currentFocusIndex.current = focusableElements.current.length - 1;
    focusableElements.current[currentFocusIndex.current]?.focus();
  }, [updateFocusableElements]);
  
  return {
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast,
    updateFocusableElements
  };
};

// ARIA live region hook
export const useAriaLiveRegion = () => {
  const [announcements, setAnnouncements] = useState([]);
  const liveRegionRef = useRef(null);
  
  const announce = useCallback((message, priority = 'polite') => {
    const id = Date.now().toString();
    setAnnouncements(prev => [...prev, { id, message, priority }]);
    
    // Remove announcement after it's been read
    setTimeout(() => {
      setAnnouncements(prev => prev.filter(announcement => announcement.id !== id));
    }, 1000);
  }, []);
  
  useEffect(() => {
    if (!liveRegionRef.current) {
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
      liveRegionRef.current = liveRegion;
    }
    
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
    }
  }, [announcements]);
  
  return { announce };
};

// Keyboard navigation hook
export const useKeyboardNavigation = (onEscape, onEnter, onArrowKeys) => {
  const handleKeyDown = useCallback((event) => {
    switch (event.key) {
      case 'Escape':
        onEscape?.(event);
        break;
      case 'Enter':
      case ' ':
        onEnter?.(event);
        break;
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        onArrowKeys?.(event);
        break;
    }
  }, [onEscape, onEnter, onArrowKeys]);
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};

// Screen reader detection hook
export const useScreenReaderDetection = () => {
  const [isScreenReader, setIsScreenReader] = useState(false);
  
  useEffect(() => {
    // Check for screen reader indicators
    const checkScreenReader = () => {
      const hasScreenReader = 
        window.speechSynthesis ||
        window.navigator.userAgent.includes('NVDA') ||
        window.navigator.userAgent.includes('JAWS') ||
        window.navigator.userAgent.includes('VoiceOver') ||
        document.querySelector('[aria-hidden="false"]') !== null;
      
      setIsScreenReader(hasScreenReader);
    };
    
    checkScreenReader();
    
    // Re-check periodically
    const interval = setInterval(checkScreenReader, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return { isScreenReader };
};

// High contrast mode detection
export const useHighContrastMode = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  
  useEffect(() => {
    const checkHighContrast = () => {
      const mediaQuery = window.matchMedia('(prefers-contrast: high)');
      setIsHighContrast(mediaQuery.matches);
    };
    
    checkHighContrast();
    
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    mediaQuery.addEventListener('change', checkHighContrast);
    
    return () => {
      mediaQuery.removeEventListener('change', checkHighContrast);
    };
  }, []);
  
  return { isHighContrast };
};

// Reduced motion detection
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    };
    
    checkReducedMotion();
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkReducedMotion);
    
    return () => {
      mediaQuery.removeEventListener('change', checkReducedMotion);
    };
  }, []);
  
  return { prefersReducedMotion };
};

// Color scheme detection
export const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useState('light');
  
  useEffect(() => {
    const checkColorScheme = () => {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setColorScheme(mediaQuery.matches ? 'dark' : 'light');
    };
    
    checkColorScheme();
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkColorScheme);
    
    return () => {
      mediaQuery.removeEventListener('change', checkColorScheme);
    };
  }, []);
  
  return { colorScheme };
};

// Skip link functionality
export const useSkipLinks = () => {
  const skipLinks = useRef([]);
  
  const addSkipLink = useCallback((label, targetId) => {
    const skipLink = {
      id: `skip-${targetId}`,
      label,
      targetId
    };
    
    skipLinks.current.push(skipLink);
    
    // Create skip link element
    const link = document.createElement('a');
    link.href = `#${targetId}`;
    link.textContent = label;
    link.className = 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-white focus:rounded';
    link.setAttribute('aria-label', `Skip to ${label}`);
    
    document.body.insertBefore(link, document.body.firstChild);
    
    return skipLink.id;
  }, []);
  
  const removeSkipLink = useCallback((id) => {
    skipLinks.current = skipLinks.current.filter(link => link.id !== id);
    const element = document.getElementById(id);
    if (element) {
      element.remove();
    }
  }, []);
  
  return { addSkipLink, removeSkipLink };
};

// Focus trap hook
export const useFocusTrap = (isActive) => {
  const containerRef = useRef(null);
  const previousActiveElement = useRef(null);
  
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };
    
    // Store previous active element
    previousActiveElement.current = document.activeElement;
    
    // Focus first element
    firstElement?.focus();
    
    container.addEventListener('keydown', handleTabKey);
    
    return () => {
      container.removeEventListener('keydown', handleTabKey);
      // Restore focus to previous element
      previousActiveElement.current?.focus();
    };
  }, [isActive]);
  
  return containerRef;
};

// ARIA expanded state management
export const useAriaExpanded = (initialState = false) => {
  const [isExpanded, setIsExpanded] = useState(initialState);
  
  const toggle = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);
  
  const expand = useCallback(() => {
    setIsExpanded(true);
  }, []);
  
  const collapse = useCallback(() => {
    setIsExpanded(false);
  }, []);
  
  return {
    isExpanded,
    toggle,
    expand,
    collapse,
    ariaProps: {
      'aria-expanded': isExpanded,
      'aria-controls': isExpanded ? 'expanded-content' : undefined
    }
  };
};

// ARIA selected state management
export const useAriaSelected = (initialIndex = 0) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  
  const select = useCallback((index) => {
    setSelectedIndex(index);
  }, []);
  
  const selectNext = useCallback((totalItems) => {
    setSelectedIndex(prev => (prev + 1) % totalItems);
  }, []);
  
  const selectPrevious = useCallback((totalItems) => {
    setSelectedIndex(prev => prev === 0 ? totalItems - 1 : prev - 1);
  }, []);
  
  return {
    selectedIndex,
    select,
    selectNext,
    selectPrevious,
    ariaProps: {
      'aria-selected': true,
      'aria-activedescendant': `item-${selectedIndex}`
    }
  };
};

// ARIA described by management
export const useAriaDescribedBy = () => {
  const [descriptions, setDescriptions] = useState(new Map());
  
  const addDescription = useCallback((id, description) => {
    setDescriptions(prev => new Map(prev).set(id, description));
  }, []);
  
  const removeDescription = useCallback((id) => {
    setDescriptions(prev => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);
  
  const getAriaDescribedBy = useCallback((id) => {
    return descriptions.has(id) ? `described-by-${id}` : undefined;
  }, [descriptions]);
  
  return {
    addDescription,
    removeDescription,
    getAriaDescribedBy,
    descriptions
  };
};

// ARIA label management
export const useAriaLabels = () => {
  const [labels, setLabels] = useState(new Map());
  
  const addLabel = useCallback((id, label) => {
    setLabels(prev => new Map(prev).set(id, label));
  }, []);
  
  const removeLabel = useCallback((id) => {
    setLabels(prev => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);
  
  const getAriaLabel = useCallback((id) => {
    return labels.get(id);
  }, [labels]);
  
  return {
    addLabel,
    removeLabel,
    getAriaLabel,
    labels
  };
};

// Accessibility testing utilities
export const useAccessibilityTesting = () => {
  const [violations, setViolations] = useState([]);
  
  const runAccessibilityCheck = useCallback(async () => {
    try {
      // This would integrate with axe-core or similar accessibility testing library
      const results = await window.axe?.run();
      setViolations(results?.violations || []);
    } catch (error) {
      console.warn('Accessibility testing not available:', error);
    }
  }, []);
  
  const getViolationCount = useCallback(() => {
    return violations.length;
  }, [violations]);
  
  const getCriticalViolations = useCallback(() => {
    return violations.filter(violation => 
      violation.impact === 'critical' || violation.impact === 'serious'
    );
  }, [violations]);
  
  return {
    violations,
    runAccessibilityCheck,
    getViolationCount,
    getCriticalViolations
  };
};

// Comprehensive accessibility hook
export const useAccessibility = () => {
  const { isScreenReader } = useScreenReaderDetection();
  const { isHighContrast } = useHighContrastMode();
  const { prefersReducedMotion } = useReducedMotion();
  const { colorScheme } = useColorScheme();
  const { announce } = useAriaLiveRegion();
  const { addSkipLink, removeSkipLink } = useSkipLinks();
  
  return {
    isScreenReader,
    isHighContrast,
    prefersReducedMotion,
    colorScheme,
    announce,
    addSkipLink,
    removeSkipLink,
    accessibilityConfig: {
      enableAnimations: !prefersReducedMotion,
      highContrast: isHighContrast,
      screenReaderOptimized: isScreenReader,
      colorScheme
    }
  };
};

export default {
  useFocusManagement,
  useAriaLiveRegion,
  useKeyboardNavigation,
  useScreenReaderDetection,
  useHighContrastMode,
  useReducedMotion,
  useColorScheme,
  useSkipLinks,
  useFocusTrap,
  useAriaExpanded,
  useAriaSelected,
  useAriaDescribedBy,
  useAriaLabels,
  useAccessibilityTesting,
  useAccessibility
};
