/**
 * usePageLoading Hook
 * Simplified hook for pages to integrate with the loading system
 */

'use client';

import { useEffect, useCallback } from 'react';
import { useLoading } from './LoadingContext';

/**
 * Hook for pages to integrate with the loading system
 * @param {Object} options - Configuration options
 * @param {Array} options.resources - Array of resources to track
 * @param {Array} options.animationSystems - Array of animation systems to track
 * @param {Function} options.onLoadingComplete - Callback when loading completes
 * @param {boolean} options.autoComplete - Whether to auto-complete loading when resources are loaded
 */
export const usePageLoading = (options = {}) => {
  const {
    resources = [],
    animationSystems = [],
    onLoadingComplete,
    autoComplete = true
  } = options;

  const {
    isLoading,
    progress,
    hasError,
    trackResource,
    markResourceLoaded,
    trackAnimationSystem,
    markAnimationSystemLoaded,
    completeLoading
  } = useLoading();

  // Track resources on mount
  useEffect(() => {
    resources.forEach(({ url, weight = 1, type = 'critical' }) => {
      trackResource(url, weight, type);
    });

    animationSystems.forEach(({ name, weight = 1 }) => {
      trackAnimationSystem(name, weight);
    });
  }, [resources, animationSystems, trackResource, trackAnimationSystem]);

  // Mark resource as loaded
  const markLoaded = useCallback((resourceUrl) => {
    markResourceLoaded(resourceUrl);
  }, [markResourceLoaded]);

  // Mark animation system as loaded
  const markAnimationLoaded = useCallback((systemName) => {
    markAnimationSystemLoaded(systemName);
  }, [markAnimationSystemLoaded]);

  // Complete loading manually
  const complete = useCallback(() => {
    completeLoading();
  }, [completeLoading]);

  // Auto-complete when progress reaches 100%
  useEffect(() => {
    if (autoComplete && progress >= 100 && isLoading) {
      const timeoutId = setTimeout(() => {
        completeLoading();
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [autoComplete, progress, isLoading, completeLoading]);

  // Call completion callback
  useEffect(() => {
    if (!isLoading && progress >= 100 && onLoadingComplete) {
      onLoadingComplete();
    }
  }, [isLoading, progress, onLoadingComplete]);

  return {
    isLoading,
    progress,
    hasError,
    markLoaded,
    markAnimationLoaded,
    complete
  };
};

/**
 * Hook for tracking image loading
 * @param {Array} imageUrls - Array of image URLs to track
 * @param {number} weight - Weight per image (default: 0.1)
 */
export const useImageLoading = (imageUrls = [], weight = 0.1) => {
  const { trackResource, markResourceLoaded } = useLoading();

  useEffect(() => {
    imageUrls.forEach(url => {
      trackResource(url, weight, 'images');
    });
  }, [imageUrls, weight, trackResource]);

  const markImageLoaded = useCallback((imageUrl) => {
    markResourceLoaded(imageUrl);
  }, [markResourceLoaded]);

  // Auto-track images in the DOM
  useEffect(() => {
    const images = document.querySelectorAll('img[src]');
    images.forEach(img => {
      if (imageUrls.includes(img.src)) {
        if (img.complete && img.naturalHeight !== 0) {
          markImageLoaded(img.src);
        } else {
          img.onload = () => markImageLoaded(img.src);
          img.onerror = () => markImageLoaded(img.src); // Mark as loaded even on error
        }
      }
    });
  }, [imageUrls, markImageLoaded]);

  return { markImageLoaded };
};

/**
 * Hook for tracking animation system loading
 * @param {string} systemName - Name of the animation system
 * @param {number} weight - Weight of the system (default: 0.2)
 * @param {Function} checkLoaded - Function to check if system is loaded
 */
export const useAnimationSystemLoading = (systemName, weight = 0.2, checkLoaded) => {
  const { trackAnimationSystem, markAnimationSystemLoaded } = useLoading();

  useEffect(() => {
    trackAnimationSystem(systemName, weight);
  }, [systemName, weight, trackAnimationSystem]);

  const markLoaded = useCallback(() => {
    markAnimationSystemLoaded(systemName);
  }, [systemName, markAnimationSystemLoaded]);

  // Auto-check if system is loaded
  useEffect(() => {
    if (checkLoaded) {
      const checkInterval = setInterval(() => {
        if (checkLoaded()) {
          markLoaded();
          clearInterval(checkInterval);
        }
      }, 100);

      return () => clearInterval(checkInterval);
    }
  }, [checkLoaded, markLoaded]);

  return { markLoaded };
};

export default usePageLoading;