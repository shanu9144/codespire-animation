/**
 * useIntersectionObserver - React hook for intersection observer
 * Provides easy integration with IntersectionObserverManager
 */

'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import intersectionObserverManager from './IntersectionObserverManager';

/**
 * Hook for intersection observer with enhanced features
 * @param {Object} options - Intersection observer options
 * @param {Function} callback - Callback function for intersection changes
 * @param {Array} deps - Dependencies array for effect
 * @returns {Object} - Ref and intersection data
 */
export function useIntersectionObserver(options = {}, callback, deps = []) {
  const elementRef = useRef(null);
  const observerIdRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleIntersection = useCallback((entry) => {
    setIsVisible(entry.isIntersecting);
    setIntersectionRatio(entry.intersectionRatio);
    setScrollProgress(entry.scrollProgress || 0);
    
    if (callback) {
      callback(entry);
    }
  }, [callback]);

  const observe = useCallback(() => {
    if (!elementRef.current) return;

    // Remove existing observer
    if (observerIdRef.current) {
      intersectionObserverManager.unobserve(observerIdRef.current);
    }

    // Create new observer
    const id = intersectionObserverManager.observe(
      elementRef.current,
      handleIntersection,
      options
    );

    observerIdRef.current = id;
    return id;
  }, [options, handleIntersection, ...deps]);

  const unobserve = useCallback(() => {
    if (observerIdRef.current) {
      intersectionObserverManager.unobserve(observerIdRef.current);
      observerIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    observe();
    return unobserve;
  }, [observe, unobserve]);

  return {
    ref: elementRef,
    isVisible,
    intersectionRatio,
    scrollProgress,
    observe,
    unobserve
  };
}

/**
 * Hook for simple visibility detection
 * @param {Object} options - Intersection observer options
 * @param {Array} deps - Dependencies array
 * @returns {Object} - Ref and visibility state
 */
export function useVisibility(options = {}, deps = []) {
  const [isVisible, setIsVisible] = useState(false);
  
  const { ref } = useIntersectionObserver(
    options,
    (entry) => setIsVisible(entry.isIntersecting),
    deps
  );

  return { ref, isVisible };
}

/**
 * Hook for scroll progress tracking
 * @param {Object} options - Intersection observer options
 * @param {Array} deps - Dependencies array
 * @returns {Object} - Ref and scroll progress
 */
export function useScrollProgress(options = {}, deps = []) {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const { ref } = useIntersectionObserver(
    options,
    (entry) => setScrollProgress(entry.scrollProgress || 0),
    deps
  );

  return { ref, scrollProgress };
}

/**
 * Hook for threshold-based visibility
 * @param {number} threshold - Visibility threshold (0-1)
 * @param {Object} options - Additional options
 * @param {Array} deps - Dependencies array
 * @returns {Object} - Ref and threshold state
 */
export function useThresholdVisibility(threshold = 0.5, options = {}, deps = []) {
  const [isAboveThreshold, setIsAboveThreshold] = useState(false);
  
  const { ref } = useIntersectionObserver(
    { ...options, threshold: [threshold] },
    (entry) => setIsAboveThreshold(entry.intersectionRatio >= threshold),
    deps
  );

  return { ref, isAboveThreshold };
}

/**
 * Hook for animation triggers
 * @param {Object} animationConfig - Animation configuration
 * @param {Array} deps - Dependencies array
 * @returns {Object} - Ref and animation state
 */
export function useAnimationTrigger(animationConfig = {}, deps = []) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '50px',
    ...options
  } = animationConfig;

  const { ref } = useIntersectionObserver(
    {
      threshold: [threshold],
      rootMargin,
      ...options
    },
    (entry) => {
      const isVisible = entry.isIntersecting;
      const progress = entry.intersectionRatio;
      
      if (isVisible && !shouldAnimate) {
        setShouldAnimate(true);
      }
      
      if (shouldAnimate) {
        setAnimationProgress(progress);
      }
      
      if (!triggerOnce && !isVisible) {
        setShouldAnimate(false);
        setAnimationProgress(0);
      }
    },
    deps
  );

  return {
    ref,
    shouldAnimate,
    animationProgress,
    isVisible: shouldAnimate
  };
}

/**
 * Hook for lazy loading
 * @param {Object} options - Intersection observer options
 * @param {Array} deps - Dependencies array
 * @returns {Object} - Ref and load state
 */
export function useLazyLoad(options = {}, deps = []) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  
  const { ref } = useIntersectionObserver(
    { rootMargin: '100px', ...options },
    (entry) => {
      if (entry.isIntersecting && !shouldLoad) {
        setShouldLoad(true);
      }
      
      if (shouldLoad && !isLoaded) {
        setIsLoaded(true);
      }
    },
    deps
  );

  return { ref, shouldLoad, isLoaded };
}

/**
 * Hook for batch intersection observation
 * @param {Array} elements - Array of element configurations
 * @param {Object} options - Global options
 * @param {Array} deps - Dependencies array
 * @returns {Object} - Refs and intersection data
 */
export function useBatchIntersectionObserver(elements = [], options = {}, deps = []) {
  const [intersectionData, setIntersectionData] = useState({});
  const refs = useRef({});

  const handleIntersection = useCallback((entry, elementId) => {
    setIntersectionData(prev => ({
      ...prev,
      [elementId]: {
        isVisible: entry.isIntersecting,
        intersectionRatio: entry.intersectionRatio,
        scrollProgress: entry.scrollProgress || 0
      }
    }));
  }, []);

  useEffect(() => {
    const observerIds = [];

    elements.forEach((elementConfig, index) => {
      const elementId = elementConfig.id || `element-${index}`;
      const elementRef = refs.current[elementId];
      
      if (elementRef?.current) {
        const id = intersectionObserverManager.observe(
          elementRef.current,
          (entry) => handleIntersection(entry, elementId),
          { ...options, ...elementConfig.options }
        );
        observerIds.push(id);
      }
    });

    return () => {
      observerIds.forEach(id => {
        intersectionObserverManager.unobserve(id);
      });
    };
  }, [elements, options, handleIntersection, ...deps]);

  const getRef = useCallback((elementId) => {
    if (!refs.current[elementId]) {
      refs.current[elementId] = { current: null };
    }
    return refs.current[elementId];
  }, []);

  return {
    refs: refs.current,
    getRef,
    intersectionData
  };
}

export default useIntersectionObserver;
