/**
 * Global Type Definitions for CodeSpire Animation System
 * Enterprise-grade type definitions for the entire application
 */

// Global window extensions
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    // Animation system globals
    animationEngine?: any;
    performanceMonitor?: any;
  }
}

// Module declarations for assets
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

declare module '*.avif' {
  const value: string;
  export default value;
}

// Shader files
declare module '*.vert' {
  const value: string;
  export default value;
}

declare module '*.frag' {
  const value: string;
  export default value;
}

declare module '*.glsl' {
  const value: string;
  export default value;
}

// CSS modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// Environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    NEXT_PUBLIC_ANALYTICS_ID?: string;
    NEXT_PUBLIC_GA_MEASUREMENT_ID?: string;
    NEXT_PUBLIC_SITE_URL?: string;
    NEXT_PUBLIC_API_URL?: string;
  }
}

export {};
