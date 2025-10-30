'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { ARIAAnnouncer, FocusIndicator } from '@/components/features/accessibility';
import { useScreenReader } from '@/lib/accessibility/hooks';

/**
 * Accessibility Context
 */
const AccessibilityContext = createContext(null);

/**
 * Accessibility Provider Component
 * Provides accessibility features and context throughout the app
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Accessibility Provider
 */
export function AccessibilityProvider({ children }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [colorScheme, setColorScheme] = useState('light');
  const { isScreenReader } = useScreenReader();

  useEffect(() => {
    // Check for reduced motion preference
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    };

    checkReducedMotion();
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkReducedMotion);

    return () => mediaQuery.removeEventListener('change', checkReducedMotion);
  }, []);

  useEffect(() => {
    // Check for high contrast preference
    const checkHighContrast = () => {
      const mediaQuery = window.matchMedia('(prefers-contrast: high)');
      setIsHighContrast(mediaQuery.matches);
    };

    checkHighContrast();
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    mediaQuery.addEventListener('change', checkHighContrast);

    return () => mediaQuery.removeEventListener('change', checkHighContrast);
  }, []);

  useEffect(() => {
    // Check for color scheme preference
    const checkColorScheme = () => {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setColorScheme(mediaQuery.matches ? 'dark' : 'light');
    };

    checkColorScheme();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkColorScheme);

    return () => mediaQuery.removeEventListener('change', checkColorScheme);
  }, []);

  const value = {
    prefersReducedMotion,
    isHighContrast,
    colorScheme,
    isScreenReader,
    accessibilityConfig: {
      enableAnimations: !prefersReducedMotion,
      highContrast: isHighContrast,
      screenReaderOptimized: isScreenReader,
      colorScheme,
    },
  };

  return (
    <AccessibilityContext.Provider value={value}>
      <FocusIndicator enabled={true} style="ring" />
      <ARIAAnnouncer />
      {children}
    </AccessibilityContext.Provider>
  );
}

/**
 * Hook to access accessibility context
 * @returns {Object} Accessibility context value
 */
export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}

export default AccessibilityContext;

