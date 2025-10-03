/**
 * Loading Configuration
 * Centralized configuration for the loading system with device-specific optimizations
 */

export const loadingConfig = {
  // Timing settings
  minimumLoadingTime: 800, // ms - prevent flash for fast connections
  maximumLoadingTime: 8000, // ms - timeout fallback for slow connections
  progressUpdateInterval: 16, // ms - 60fps updates for smooth animation
  
  // Animation settings
  counterAnimationDuration: 300, // ms - duration for percentage counter transitions
  transitionDuration: 600, // ms - duration for loading screen fade out
  easeFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', // Material Design easing
  
  // Resource weights - how much each resource type contributes to overall progress
  resourceWeights: {
    critical: 0.4, // HTML, CSS, JS - most important for functionality
    animations: 0.3, // Animation systems and WebGL setup
    fonts: 0.2, // Web fonts - important for visual consistency
    images: 0.1 // Hero images and critical visuals
  },
  
  // Device-specific optimizations
  deviceOptimizations: {
    // Mobile device optimizations
    mobile: {
      minimumLoadingTime: 600, // Slightly faster for mobile
      progressUpdateInterval: 33, // 30fps for better battery life
      counterAnimationDuration: 200, // Faster animations
      transitionDuration: 400,
      // Adjust resource weights for mobile
      resourceWeights: {
        critical: 0.5, // Prioritize critical resources more on mobile
        animations: 0.2, // Reduce animation weight
        fonts: 0.2,
        images: 0.1
      }
    },
    
    // Low-end device optimizations
    lowEnd: {
      minimumLoadingTime: 400, // Even faster for low-end devices
      progressUpdateInterval: 50, // 20fps for performance
      counterAnimationDuration: 100, // Very fast animations
      transitionDuration: 300,
      maximumLoadingTime: 6000, // Shorter timeout
      // Further adjust weights for low-end devices
      resourceWeights: {
        critical: 0.6, // Focus heavily on critical resources
        animations: 0.1, // Minimal animation weight
        fonts: 0.2,
        images: 0.1
      }
    }
  },
  
  // Progress calculation settings
  progressSmoothing: {
    enabled: true,
    maxJumpPerUpdate: 10, // Maximum percentage jump per update
    smoothingFactor: 0.1 // How much to smooth progress updates
  },
  
  // Error handling settings
  errorHandling: {
    maxRetries: 3, // Maximum retries for failed resources
    retryDelay: 1000, // ms - delay between retries
    gracefulDegradation: true, // Continue loading even with errors
    timeoutFallback: true // Force completion on timeout
  },
  
  // Performance monitoring
  performanceMonitoring: {
    enabled: true,
    fpsThreshold: 30, // Minimum FPS before reducing quality
    memoryThreshold: 80, // Memory usage percentage threshold
    adaptiveQuality: true // Automatically adjust based on performance
  },
  
  // Accessibility settings
  accessibility: {
    respectReducedMotion: true, // Honor prefers-reduced-motion
    provideFallbacks: true, // Provide non-JS fallbacks
    announceProgress: true, // Announce progress to screen readers
    minimumContrastRatio: 4.5 // WCAG AA compliance
  },
  
  // Debug settings (only in development)
  debug: {
    enabled: process.env.NODE_ENV === 'development',
    logProgress: true,
    logResourceLoading: true,
    logPerformanceMetrics: true,
    showProgressBreakdown: true
  },
  
  // Visual settings
  visual: {
    // Colors (will be overridden by theme)
    backgroundColor: '#000000',
    textColor: '#ffffff',
    accentColor: '#3b82f6', // Blue accent
    
    // Typography
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: {
      counter: '3rem', // Large counter text
      label: '1rem' // Smaller label text
    },
    
    // Layout
    counterPosition: 'center', // 'center', 'bottom', 'top'
    showProgressBar: false, // Whether to show progress bar in addition to counter
    showLoadingText: true, // Whether to show "Loading..." text
    
    // Animations
    counterAnimation: 'smooth', // 'smooth', 'stepped', 'none'
    backgroundAnimation: 'subtle', // 'subtle', 'dynamic', 'none'
  },
  
  // Integration settings
  integration: {
    // Next.js specific settings
    nextjs: {
      useRouter: true, // Integrate with Next.js router
      trackRouteChanges: true, // Track route change loading
      preloadCriticalRoutes: true // Preload critical routes
    },
    
    // Animation system integration
    animations: {
      trackWebGLInit: true, // Track WebGL context initialization
      trackShaderCompilation: true, // Track shader compilation
      trackParticleSystemInit: true, // Track particle system setup
      track3DSceneInit: true // Track 3D scene initialization
    },
    
    // Performance manager integration
    performance: {
      useExistingManager: true, // Use existing PerformanceManager
      adaptToPerformanceLevel: true, // Adapt based on performance level
      monitorDuringLoading: true // Monitor performance during loading
    }
  }
};

/**
 * Get configuration for specific device type
 * @param {string} deviceType - 'desktop', 'mobile', 'lowEnd'
 * @returns {Object} Device-specific configuration
 */
export function getDeviceConfig(deviceType) {
  const baseConfig = { ...loadingConfig };
  
  if (deviceType === 'mobile' && loadingConfig.deviceOptimizations.mobile) {
    return {
      ...baseConfig,
      ...loadingConfig.deviceOptimizations.mobile
    };
  }
  
  if (deviceType === 'lowEnd' && loadingConfig.deviceOptimizations.lowEnd) {
    return {
      ...baseConfig,
      ...loadingConfig.deviceOptimizations.lowEnd
    };
  }
  
  return baseConfig;
}

/**
 * Get configuration with reduced motion settings
 * @returns {Object} Reduced motion configuration
 */
export function getReducedMotionConfig() {
  return {
    ...loadingConfig,
    counterAnimationDuration: 0,
    transitionDuration: 200,
    minimumLoadingTime: 200,
    visual: {
      ...loadingConfig.visual,
      counterAnimation: 'none',
      backgroundAnimation: 'none'
    }
  };
}

/**
 * Get configuration for slow connections
 * @returns {Object} Slow connection configuration
 */
export function getSlowConnectionConfig() {
  return {
    ...loadingConfig,
    maximumLoadingTime: 15000, // 15 seconds
    progressUpdateInterval: 100, // Less frequent updates
    minimumLoadingTime: 1000, // Longer minimum time
    resourceWeights: {
      critical: 0.7, // Focus heavily on critical resources
      animations: 0.1,
      fonts: 0.1,
      images: 0.1
    }
  };
}

export default loadingConfig;