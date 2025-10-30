'use client';

import { createContext, useContext } from 'react';

/**
 * SEO Context
 * Provides SEO metadata and utilities throughout the app
 * 
 * @type {React.Context}
 */
const SEOContext = createContext(null);

/**
 * SEO Provider Component
 * @param {Object} props - Component props
 * @param {Object} props.metadata - Default SEO metadata
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} SEO Provider
 */
export function SEOProvider({ metadata, children }) {
  return (
    <SEOContext.Provider value={{ metadata }}>
      {children}
    </SEOContext.Provider>
  );
}

/**
 * Hook to access SEO context
 * @returns {Object} SEO context value
 */
export function useSEOContext() {
  const context = useContext(SEOContext);
  if (!context) {
    throw new Error('useSEOContext must be used within SEOProvider');
  }
  return context;
}

export default SEOContext;

