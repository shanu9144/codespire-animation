/**
 * useScrollTrigger - React hook for scroll-triggered animations
 * Provides easy integration with ScrollTrigger system
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import scrollTrigger from './ScrollTrigger';

/**
 * Hook for creating scroll-triggered animations
 * @param {Object} config - ScrollTrigger configuration
 * @param {Array} deps - Dependencies array for effect
 * @returns {Object} - Ref and trigger controls
 */
export function useScrollTrigger(config = {}, deps = []) {
  const elementRef = useRef(null);
  const triggerIdRef = useRef(null);

  const createTrigger = useCallback(() => {
    if (!elementRef.current) return;

    // Remove existing trigger
    if (triggerIdRef.current) {
      scrollTrigger.remove(triggerIdRef.current);
    }

    // Create new trigger
    const triggerId = scrollTrigger.create({
      element: elementRef.current,
      ...config
    });

    triggerIdRef.current = triggerId;
    return triggerId;
  }, [config, ...deps]);

  const removeTrigger = useCallback(() => {
    if (triggerIdRef.current) {
      scrollTrigger.remove(triggerIdRef.current);
      triggerIdRef.current = null;
    }
  }, []);

  const refreshTrigger = useCallback(() => {
    if (triggerIdRef.current) {
      scrollTrigger.refresh();
    }
  }, []);

  const updateTrigger = useCallback((newConfig) => {
    if (triggerIdRef.current) {
      scrollTrigger.updateTrigger(triggerIdRef.current, newConfig);
    }
  }, []);

  useEffect(() => {
    createTrigger();

    return () => {
      removeTrigger();
    };
  }, [createTrigger, removeTrigger]);

  return {
    ref: elementRef,
    triggerId: triggerIdRef.current,
    createTrigger,
    removeTrigger,
    refreshTrigger,
    updateTrigger
  };
}

/**
 * Hook for scroll progress tracking
 * @param {Object} config - Configuration options
 * @returns {Object} - Ref and progress value
 */
export function useScrollProgress(config = {}) {
  const progressRef = useRef(0);
  const elementRef = useRef(null);

  const { onProgress, ...triggerConfig } = config;

  const { ref, ...controls } = useScrollTrigger({
    scrub: true,
    onUpdate: (progress) => {
      progressRef.current = progress;
      if (onProgress) {
        onProgress(progress);
      }
    },
    ...triggerConfig
  });

  // Sync refs
  useEffect(() => {
    if (elementRef.current && ref.current !== elementRef.current) {
      ref.current = elementRef.current;
    }
  });

  return {
    ref: elementRef,
    progress: progressRef.current,
    ...controls
  };
}

/**
 * Hook for element visibility detection
 * @param {Object} config - Configuration options
 * @returns {Object} - Ref and visibility state
 */
export function useScrollVisibility(config = {}) {
  const visibilityRef = useRef(false);
  const elementRef = useRef(null);

  const { onVisible, onHidden, ...triggerConfig } = config;

  const { ref, ...controls } = useScrollTrigger({
    onEnter: (entry) => {
      visibilityRef.current = true;
      if (onVisible) {
        onVisible(entry);
      }
    },
    onLeave: (entry) => {
      visibilityRef.current = false;
      if (onHidden) {
        onHidden(entry);
      }
    },
    ...triggerConfig
  });

  // Sync refs
  useEffect(() => {
    if (elementRef.current && ref.current !== elementRef.current) {
      ref.current = elementRef.current;
    }
  });

  return {
    ref: elementRef,
    isVisible: visibilityRef.current,
    ...controls
  };
}

/**
 * Hook for batch scroll triggers
 * @param {Array} elements - Array of element configs
 * @returns {Array} - Array of trigger controls
 */
export function useScrollTriggerBatch(elements = []) {
  const triggersRef = useRef([]);

  useEffect(() => {
    // Clean up existing triggers
    triggersRef.current.forEach(triggerId => {
      if (triggerId) {
        scrollTrigger.remove(triggerId);
      }
    });

    // Create new triggers
    triggersRef.current = elements.map(config => {
      if (config.element) {
        return scrollTrigger.create(config);
      }
      return null;
    }).filter(Boolean);

    return () => {
      // Cleanup on unmount
      triggersRef.current.forEach(triggerId => {
        if (triggerId) {
          scrollTrigger.remove(triggerId);
        }
      });
    };
  }, [elements]);

  return triggersRef.current;
}

export default useScrollTrigger;