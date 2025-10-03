/**
 * useParallax - React hook for parallax effects
 * Provides easy integration with ParallaxController
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import parallaxController, { ParallaxEasing } from './ParallaxController';

/**
 * Hook for creating parallax effects
 * @param {Object} config - Parallax configuration
 * @param {Array} deps - Dependencies array for effect
 * @returns {Object} - Ref and parallax controls
 */
export function useParallax(config = {}, deps = []) {
  const elementRef = useRef(null);
  const layerIdRef = useRef(null);

  const createLayer = useCallback(() => {
    if (!elementRef.current) return;

    // Remove existing layer
    if (layerIdRef.current) {
      parallaxController.removeLayer(layerIdRef.current);
    }

    // Create new layer
    const layerId = parallaxController.addLayer({
      element: elementRef.current,
      ...config
    });

    layerIdRef.current = layerId;
    return layerId;
  }, [config, ...deps]);

  const removeLayer = useCallback(() => {
    if (layerIdRef.current) {
      parallaxController.removeLayer(layerIdRef.current);
      layerIdRef.current = null;
    }
  }, []);

  const updateLayer = useCallback((newConfig) => {
    if (layerIdRef.current) {
      parallaxController.updateLayer(layerIdRef.current, newConfig);
    }
  }, []);

  const toggleLayer = useCallback((isActive = true) => {
    if (layerIdRef.current) {
      parallaxController.toggleLayer(layerIdRef.current, isActive);
    }
  }, []);

  const setSpeed = useCallback((speed) => {
    if (layerIdRef.current) {
      parallaxController.setLayerSpeed(layerIdRef.current, speed);
    }
  }, []);

  const setBounds = useCallback((bounds) => {
    if (layerIdRef.current) {
      parallaxController.setLayerBounds(layerIdRef.current, bounds);
    }
  }, []);

  useEffect(() => {
    createLayer();

    return () => {
      removeLayer();
    };
  }, [createLayer, removeLayer]);

  return {
    ref: elementRef,
    layerId: layerIdRef.current,
    createLayer,
    removeLayer,
    updateLayer,
    toggleLayer,
    setSpeed,
    setBounds
  };
}

/**
 * Hook for vertical parallax effect
 * @param {number|Object} speed - Parallax speed (number or {y: number})
 * @param {Object} options - Additional options
 * @returns {Object} - Ref and controls
 */
export function useVerticalParallax(speed = 0.5, options = {}) {
  const config = {
    speed: typeof speed === 'number' ? { y: speed } : speed,
    direction: 'vertical',
    ...options
  };

  return useParallax(config);
}

/**
 * Hook for horizontal parallax effect
 * @param {number|Object} speed - Parallax speed (number or {x: number})
 * @param {Object} options - Additional options
 * @returns {Object} - Ref and controls
 */
export function useHorizontalParallax(speed = 0.5, options = {}) {
  const config = {
    speed: typeof speed === 'number' ? { x: speed } : speed,
    direction: 'horizontal',
    ...options
  };

  return useParallax(config);
}

/**
 * Hook for multi-directional parallax effect
 * @param {Object} speed - Speed object {x: number, y: number}
 * @param {Object} options - Additional options
 * @returns {Object} - Ref and controls
 */
export function useMultiParallax(speed = { x: 0.3, y: 0.5 }, options = {}) {
  const config = {
    speed,
    direction: 'both',
    ...options
  };

  return useParallax(config);
}

/**
 * Hook for bounded parallax effect
 * @param {Object} speed - Speed configuration
 * @param {Object} bounds - Bounds configuration
 * @param {Object} options - Additional options
 * @returns {Object} - Ref and controls
 */
export function useBoundedParallax(speed = 0.5, bounds = {}, options = {}) {
  const config = {
    speed: typeof speed === 'number' ? { y: speed } : speed,
    bounds,
    ...options
  };

  return useParallax(config);
}

/**
 * Hook for eased parallax effect
 * @param {Object} speed - Speed configuration
 * @param {string|Function} easing - Easing function name or custom function
 * @param {Object} options - Additional options
 * @returns {Object} - Ref and controls
 */
export function useEasedParallax(speed = 0.5, easing = 'easeOutQuad', options = {}) {
  const easingFunction = typeof easing === 'string' 
    ? ParallaxEasing[easing] || ParallaxEasing.linear
    : easing;

  const config = {
    speed: typeof speed === 'number' ? { y: speed } : speed,
    easing: easingFunction,
    ...options
  };

  return useParallax(config);
}

/**
 * Hook for batch parallax layers
 * @param {Array} layers - Array of layer configurations
 * @returns {Array} - Array of layer IDs
 */
export function useParallaxBatch(layers = []) {
  const layerIdsRef = useRef([]);

  useEffect(() => {
    // Clean up existing layers
    layerIdsRef.current.forEach(layerId => {
      if (layerId) {
        parallaxController.removeLayer(layerId);
      }
    });

    // Create new layers
    layerIdsRef.current = layers.map(config => {
      if (config.element) {
        return parallaxController.addLayer(config);
      }
      return null;
    }).filter(Boolean);

    return () => {
      // Cleanup on unmount
      layerIdsRef.current.forEach(layerId => {
        if (layerId) {
          parallaxController.removeLayer(layerId);
        }
      });
    };
  }, [layers]);

  return layerIdsRef.current;
}

/**
 * Hook for parallax controller management
 * @returns {Object} - Controller methods
 */
export function useParallaxController() {
  const pause = useCallback(() => {
    parallaxController.pause();
  }, []);

  const resume = useCallback(() => {
    parallaxController.resume();
  }, []);

  const setLerpFactor = useCallback((factor) => {
    parallaxController.setLerpFactor(factor);
  }, []);

  const setThreshold = useCallback((threshold) => {
    parallaxController.setThreshold(threshold);
  }, []);

  const refresh = useCallback(() => {
    parallaxController.refresh();
  }, []);

  const getAllLayers = useCallback(() => {
    return parallaxController.getAllLayers();
  }, []);

  return {
    pause,
    resume,
    setLerpFactor,
    setThreshold,
    refresh,
    getAllLayers
  };
}

export default useParallax;
export { ParallaxEasing };