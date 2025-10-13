'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useInView } from 'framer-motion';

/**
 * Performance Optimization System for Digital Engineering Page
 * Provides comprehensive performance monitoring and optimization utilities
 */

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memoryUsage: 0,
    renderTime: 0,
    isLowPerformance: false
  });
  
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId;
    
    const measurePerformance = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        setMetrics(prev => ({
          ...prev,
          fps,
          isLowPerformance: fps < 30,
          memoryUsage: performance.memory ? 
            Math.round(performance.memory.usedJSHeapSize / 1048576) : 0
        }));
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measurePerformance);
    };
    
    animationId = requestAnimationFrame(measurePerformance);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);
  
  return metrics;
};

// Lazy loading hook for images and components
export const useLazyLoad = (threshold = 0.1) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: `${threshold * 100}%` 
  });
  
  useEffect(() => {
    if (isInView && !isLoaded) {
      setIsLoaded(true);
    }
  }, [isInView, isLoaded]);
  
  return { ref, isLoaded, isInView };
};

// Debounced scroll handler
export const useDebouncedScroll = (callback, delay = 16) => {
  const timeoutRef = useRef(null);
  
  const debouncedCallback = useCallback((event) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(event);
    }, delay);
  }, [callback, delay]);
  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  return debouncedCallback;
};

// Throttled resize handler
export const useThrottledResize = (callback, delay = 16) => {
  const timeoutRef = useRef(null);
  const lastCallRef = useRef(0);
  
  const throttledCallback = useCallback((event) => {
    const now = Date.now();
    
    if (now - lastCallRef.current >= delay) {
      lastCallRef.current = now;
      callback(event);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        lastCallRef.current = Date.now();
        callback(event);
      }, delay - (now - lastCallRef.current));
    }
  }, [callback, delay]);
  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  return throttledCallback;
};

// Memory optimization hook
export const useMemoryOptimization = () => {
  const [memoryUsage, setMemoryUsage] = useState(0);
  
  useEffect(() => {
    const updateMemoryUsage = () => {
      if (performance.memory) {
        setMemoryUsage(performance.memory.usedJSHeapSize / 1048576);
      }
    };
    
    const interval = setInterval(updateMemoryUsage, 5000);
    updateMemoryUsage();
    
    return () => clearInterval(interval);
  }, []);
  
  const isHighMemoryUsage = memoryUsage > 100; // MB
  
  return { memoryUsage, isHighMemoryUsage };
};

// Animation performance optimization
export const useAnimationOptimization = () => {
  const [shouldReduceAnimations, setShouldReduceAnimations] = useState(false);
  const { fps, isLowPerformance } = usePerformanceMonitor();
  
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check for low performance
    const shouldReduce = prefersReducedMotion || isLowPerformance || fps < 30;
    
    setShouldReduceAnimations(shouldReduce);
  }, [fps, isLowPerformance]);
  
  return {
    shouldReduceAnimations,
    animationConfig: {
      duration: shouldReduceAnimations ? 0.1 : 0.6,
      ease: shouldReduceAnimations ? "linear" : [0.25, 0.46, 0.45, 0.94],
      staggerDelay: shouldReduceAnimations ? 0 : 0.15
    }
  };
};

// Intersection observer optimization
export const useOptimizedIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);
  
  const observerRef = useRef(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );
    
    observer.observe(ref.current);
    observerRef.current = observer;
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [options]);
  
  return { ref, isIntersecting };
};

// Component virtualization hook
export const useVirtualization = (items, itemHeight, containerHeight) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  const visibleItems = items.slice(visibleStart, visibleEnd);
  
  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);
  
  return {
    visibleItems,
    handleScroll,
    totalHeight: items.length * itemHeight,
    offsetY: visibleStart * itemHeight
  };
};

// Image optimization hook
export const useImageOptimization = (src, options = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState('');
  
  const {
    quality = 80,
    format = 'webp',
    width,
    height,
    lazy = true
  } = options;
  
  useEffect(() => {
    if (!src) return;
    
    // Create optimized image URL
    const url = new URL(src);
    if (width) url.searchParams.set('w', width);
    if (height) url.searchParams.set('h', height);
    if (quality) url.searchParams.set('q', quality);
    if (format) url.searchParams.set('f', format);
    
    setOptimizedSrc(url.toString());
  }, [src, quality, format, width, height]);
  
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setIsError(false);
  }, []);
  
  const handleError = useCallback(() => {
    setIsError(true);
    setIsLoaded(false);
  }, []);
  
  return {
    optimizedSrc,
    isLoaded,
    isError,
    handleLoad,
    handleError,
    shouldLoad: !lazy || isLoaded
  };
};

// Bundle size optimization
export const useBundleOptimization = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return { isClient };
};

// Network optimization
export const useNetworkOptimization = () => {
  const [connectionType, setConnectionType] = useState('unknown');
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  
  useEffect(() => {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      setConnectionType(connection.effectiveType || 'unknown');
      setIsSlowConnection(connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
    }
  }, []);
  
  return { connectionType, isSlowConnection };
};

// Preload optimization
export const usePreloadOptimization = () => {
  const preloadedResources = useRef(new Set());
  
  const preloadResource = useCallback((url, type = 'image') => {
    if (preloadedResources.current.has(url)) return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = type;
    
    document.head.appendChild(link);
    preloadedResources.current.add(url);
  }, []);
  
  const preloadCriticalResources = useCallback((resources) => {
    resources.forEach(({ url, type }) => {
      preloadResource(url, type);
    });
  }, [preloadResource]);
  
  return { preloadResource, preloadCriticalResources };
};

// Cache optimization
export const useCacheOptimization = () => {
  const cache = useRef(new Map());
  
  const getCachedData = useCallback((key) => {
    return cache.current.get(key);
  }, []);
  
  const setCachedData = useCallback((key, data, ttl = 300000) => { // 5 minutes default
    cache.current.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }, []);
  
  const isCacheValid = useCallback((key) => {
    const cached = cache.current.get(key);
    if (!cached) return false;
    
    return Date.now() - cached.timestamp < cached.ttl;
  }, []);
  
  const clearExpiredCache = useCallback(() => {
    const now = Date.now();
    for (const [key, value] of cache.current.entries()) {
      if (now - value.timestamp >= value.ttl) {
        cache.current.delete(key);
      }
    }
  }, []);
  
  useEffect(() => {
    const interval = setInterval(clearExpiredCache, 60000); // Clear every minute
    return () => clearInterval(interval);
  }, [clearExpiredCache]);
  
  return {
    getCachedData,
    setCachedData,
    isCacheValid,
    clearExpiredCache
  };
};

// Performance metrics collection
export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    firstInputDelay: 0,
    cumulativeLayoutShift: 0
  });
  
  useEffect(() => {
    const collectMetrics = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');
        
        setMetrics(prev => ({
          ...prev,
          loadTime: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
          firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0
        }));
      }
    };
    
    // Collect metrics after page load
    if (document.readyState === 'complete') {
      collectMetrics();
    } else {
      window.addEventListener('load', collectMetrics);
    }
    
    return () => {
      window.removeEventListener('load', collectMetrics);
    };
  }, []);
  
  return metrics;
};

// Accessibility optimization
export const useAccessibilityOptimization = () => {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);
  const [isScreenReader, setIsScreenReader] = useState(false);
  
  useEffect(() => {
    // Detect keyboard users
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true);
      }
    };
    
    // Detect screen readers
    const isScreenReaderDetected = window.speechSynthesis || 
      window.navigator.userAgent.includes('NVDA') ||
      window.navigator.userAgent.includes('JAWS');
    
    setIsScreenReader(isScreenReaderDetected);
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  return { isKeyboardUser, isScreenReader };
};

export default {
  usePerformanceMonitor,
  useLazyLoad,
  useDebouncedScroll,
  useThrottledResize,
  useMemoryOptimization,
  useAnimationOptimization,
  useOptimizedIntersectionObserver,
  useVirtualization,
  useImageOptimization,
  useBundleOptimization,
  useNetworkOptimization,
  usePreloadOptimization,
  useCacheOptimization,
  usePerformanceMetrics,
  useAccessibilityOptimization
};
