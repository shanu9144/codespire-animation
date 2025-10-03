/**
 * useMorphing - React hook for SVG morphing animations
 * Provides easy integration with MorphingController
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import morphingController, { IconMorphPresets } from './MorphingAnimations';

/**
 * Hook for creating path morphing animations
 * @param {Object} config - Morphing configuration
 * @param {Array} deps - Dependencies array for effect
 * @returns {Object} - Ref and morphing controls
 */
export function useMorphing(config = {}, deps = []) {
  const elementRef = useRef(null);
  const morphIdRef = useRef(null);

  const createMorph = useCallback(() => {
    if (!elementRef.current) return;

    // Remove existing morph
    if (morphIdRef.current) {
      morphingController.remove(morphIdRef.current);
    }

    // Create new morph
    const morphId = morphingController.createPathMorph({
      element: elementRef.current,
      ...config
    });

    morphIdRef.current = morphId;
    return morphId;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, ...deps]);

  const removeMorph = useCallback(() => {
    if (morphIdRef.current) {
      morphingController.remove(morphIdRef.current);
      morphIdRef.current = null;
    }
  }, []);

  const morphToPath = useCallback((pathIndex) => {
    if (morphIdRef.current) {
      morphingController.morphToPath(morphIdRef.current, pathIndex);
    }
  }, []);

  useEffect(() => {
    createMorph();

    return () => {
      removeMorph();
    };
  }, [createMorph, removeMorph]);

  return {
    ref: elementRef,
    morphId: morphIdRef.current,
    createMorph,
    removeMorph,
    morphToPath
  };
}

/**
 * Hook for icon morphing animations
 * @param {Object} config - Icon morphing configuration
 * @returns {Object} - Ref and icon controls
 */
export function useIconMorph(config = {}) {
  const elementRef = useRef(null);
  const morphIdRef = useRef(null);

  const { preset, states, triggers = ['hover'], ...otherConfig } = config;

  // Use preset if provided
  const morphStates = preset ? IconMorphPresets[preset]?.states : states;

  const createIconMorph = useCallback(() => {
    if (!elementRef.current || !morphStates) return;

    // Remove existing morph
    if (morphIdRef.current) {
      morphingController.remove(morphIdRef.current);
    }

    // Create new icon morph
    const morphId = morphingController.createIconMorph({
      iconElement: elementRef.current,
      states: morphStates,
      triggers,
      ...otherConfig
    });

    morphIdRef.current = morphId;
    return morphId;
  }, [morphStates, triggers, otherConfig]);

  const removeMorph = useCallback(() => {
    if (morphIdRef.current) {
      morphingController.remove(morphIdRef.current);
      morphIdRef.current = null;
    }
  }, []);

  const morphToState = useCallback((stateIndex) => {
    if (morphIdRef.current) {
      morphingController.morphToPath(morphIdRef.current, stateIndex);
      morphingController.applyStateStyles(morphIdRef.current, stateIndex);
    }
  }, []);

  useEffect(() => {
    createIconMorph();

    return () => {
      removeMorph();
    };
  }, [createIconMorph, removeMorph]);

  return {
    ref: elementRef,
    morphId: morphIdRef.current,
    createIconMorph,
    removeMorph,
    morphToState
  };
}

/**
 * Hook for scroll-triggered morphing
 * @param {Array} paths - Array of SVG paths
 * @param {Object} scrollConfig - Scroll trigger configuration
 * @param {Object} options - Additional options
 * @returns {Object} - Ref and controls
 */
export function useScrollMorph(paths = [], scrollConfig = {}, options = {}) {
  const config = {
    paths,
    trigger: 'scroll',
    scrollConfig: {
      morphOnEnter: true,
      morphOnLeave: false,
      targetPathIndex: 1,
      ...scrollConfig
    },
    ...options
  };

  return useMorphing(config, [paths, scrollConfig, options]);
}

/**
 * Hook for logo morphing animation
 * @param {Object} normalState - Normal logo state
 * @param {Object} animatedState - Animated logo state
 * @param {Object} scrollConfig - Scroll trigger configuration
 * @returns {Object} - Ref and controls
 */
export function useLogoMorph(normalState, animatedState, scrollConfig = {}) {
  const elementRef = useRef(null);
  const morphIdRef = useRef(null);

  const createLogoMorph = useCallback(() => {
    if (!elementRef.current || !normalState || !animatedState) return;

    // Remove existing morph
    if (morphIdRef.current) {
      morphingController.remove(morphIdRef.current);
    }

    // Create new logo morph
    const morphId = morphingController.createLogoMorph({
      logoElement: elementRef.current,
      normalState,
      animatedState,
      scrollTriggerConfig: scrollConfig
    });

    morphIdRef.current = morphId;
    return morphId;
  }, [normalState, animatedState, scrollConfig]);

  const removeMorph = useCallback(() => {
    if (morphIdRef.current) {
      morphingController.remove(morphIdRef.current);
      morphIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    createLogoMorph();

    return () => {
      removeMorph();
    };
  }, [createLogoMorph, removeMorph]);

  return {
    ref: elementRef,
    morphId: morphIdRef.current,
    createLogoMorph,
    removeMorph
  };
}

/**
 * Hook for hover morphing effect
 * @param {Array} paths - Array of SVG paths [normal, hover]
 * @param {Object} options - Additional options
 * @returns {Object} - Ref and controls
 */
export function useHoverMorph(paths = [], options = {}) {
  const config = {
    states: paths.map((path, index) => ({
      path,
      name: index === 0 ? 'normal' : 'hover'
    })),
    triggers: ['hover'],
    duration: 200,
    easing: 'ease-out',
    ...options
  };

  return useIconMorph(config);
}

/**
 * Hook for click morphing effect
 * @param {Array} paths - Array of SVG paths
 * @param {Object} options - Additional options
 * @returns {Object} - Ref and controls
 */
export function useClickMorph(paths = [], options = {}) {
  const config = {
    states: paths.map((path, index) => ({
      path,
      name: `state-${index}`
    })),
    triggers: ['click'],
    duration: 300,
    easing: 'ease-in-out',
    ...options
  };

  return useIconMorph(config);
}

/**
 * Hook for preset icon morphing
 * @param {string} presetName - Name of the preset (menuToX, playToPause, etc.)
 * @param {Array} triggers - Trigger events
 * @param {Object} options - Additional options
 * @returns {Object} - Ref and controls
 */
export function usePresetMorph(presetName, triggers = ['hover'], options = {}) {
  const config = {
    preset: presetName,
    triggers,
    ...options
  };

  return useIconMorph(config);
}

/**
 * Hook for batch morphing animations
 * @param {Array} elements - Array of element configurations
 * @returns {Array} - Array of morph IDs
 */
export function useMorphingBatch(elements = []) {
  const morphIdsRef = useRef([]);

  useEffect(() => {
    // Clean up existing morphs
    morphIdsRef.current.forEach(morphId => {
      if (morphId) {
        morphingController.remove(morphId);
      }
    });

    // Create new morphs
    morphIdsRef.current = elements.map(config => {
      if (config.element) {
        return morphingController.createPathMorph(config);
      }
      return null;
    }).filter(Boolean);

    return () => {
      // Cleanup on unmount
      morphIdsRef.current.forEach(morphId => {
        if (morphId) {
          morphingController.remove(morphId);
        }
      });
    };
  }, [elements]);

  return morphIdsRef.current;
}

export default useMorphing;