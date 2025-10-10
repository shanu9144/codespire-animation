/**
 * Intersection Observer Module - Performance-optimized intersection observer system
 * Exports all intersection observer utilities and optimized animation controllers
 */

// Core intersection observer manager
export { default as intersectionObserverManager, IntersectionObserverManager } from './IntersectionObserverManager';

// React hooks
export {
  default as useIntersectionObserver,
  useVisibility,
  useScrollProgress,
  useThresholdVisibility,
  useAnimationTrigger,
  useLazyLoad,
  useBatchIntersectionObserver
} from './useIntersectionObserver';

// Optimized animation controllers
export {
  default as OptimizedAnimations,
  OptimizedParallaxController,
  OptimizedScrollTrigger,
  optimizedParallaxController,
  optimizedScrollTrigger
} from './OptimizedScrollAnimations';

// Utility functions
export const IntersectionUtils = {
  /**
   * Create intersection observer with default settings
   */
  createObserver: (options = {}) => {
    const defaultOptions = {
      root: null,
      rootMargin: '50px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1.0]
    };
    
    return new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Handle intersection
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      },
      { ...defaultOptions, ...options }
    );
  },

  /**
   * Observe multiple elements with a single observer
   */
  observeElements: (elements, callback, options = {}) => {
    const observer = IntersectionUtils.createObserver(options);
    
    elements.forEach(element => {
      if (element) {
        observer.observe(element);
        
        // Store callback for this element
        element._intersectionCallback = callback;
      }
    });
    
    return observer;
  },

  /**
   * Lazy load images with intersection observer
   */
  lazyLoadImages: (imageSelector = 'img[data-src]', options = {}) => {
    const images = document.querySelectorAll(imageSelector);
    
    if (images.length === 0) return null;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;
          
          if (src) {
            img.src = src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        }
      });
    }, { rootMargin: '50px', ...options });
    
    images.forEach(img => observer.observe(img));
    
    return observer;
  },

  /**
   * Animate elements on scroll with intersection observer
   */
  animateOnScroll: (selector, animationClass = 'animate-in', options = {}) => {
    const elements = document.querySelectorAll(selector);
    
    if (elements.length === 0) return null;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          
          // Unobserve after animation if triggerOnce is true
          if (options.triggerOnce !== false) {
            observer.unobserve(entry.target);
          }
        } else if (!options.triggerOnce) {
          entry.target.classList.remove(animationClass);
        }
      });
    }, { rootMargin: '50px', ...options });
    
    elements.forEach(element => observer.observe(element));
    
    return observer;
  },

  /**
   * Track scroll progress for elements
   */
  trackScrollProgress: (elements, callback, options = {}) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progress = entry.intersectionRatio;
          callback(entry.target, progress, entry);
        }
      });
    }, { threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1.0], ...options });
    
    elements.forEach(element => observer.observe(element));
    
    return observer;
  },

  /**
   * Performance monitoring for intersection observers
   */
  getPerformanceStats: () => {
    return {
      intersectionManager: intersectionObserverManager.getStats(),
      memoryUsage: performance.memory ? {
        used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
      } : null
    };
  }
};

// Animation presets for intersection observer
export const IntersectionPresets = {
  // Fade in animation
  fadeIn: {
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true
  },

  // Slide up animation
  slideUp: {
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true
  },

  // Scale in animation
  scaleIn: {
    threshold: 0.2,
    rootMargin: '50px',
    triggerOnce: true
  },

  // Parallax effect
  parallax: {
    threshold: [0, 0.25, 0.5, 0.75, 1.0],
    rootMargin: '200px'
  },

  // Lazy loading
  lazyLoad: {
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true
  },

  // Staggered animations
  staggered: {
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true,
    stagger: 100
  }
};

// Export everything as default object
const IntersectionModule = {
  // Core
  intersectionObserverManager,
  IntersectionObserverManager,
  
  // Hooks
  useIntersectionObserver,
  useVisibility,
  useScrollProgress,
  useThresholdVisibility,
  useAnimationTrigger,
  useLazyLoad,
  useBatchIntersectionObserver,
  
  // Optimized controllers
  OptimizedParallaxController,
  OptimizedScrollTrigger,
  optimizedParallaxController,
  optimizedScrollTrigger,
  
  // Utilities
  IntersectionUtils,
  IntersectionPresets
};

export default IntersectionModule;
