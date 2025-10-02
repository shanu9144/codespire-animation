/**
 * useSectionTransitions - React hook for section transition animations
 * Provides easy integration with SectionTransitionController
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import sectionTransitionController, { TransitionPresets } from './SectionTransitions';

/**
 * Hook for registering section transitions
 * @param {Object} config - Section transition configuration
 * @param {Array} deps - Dependencies array for effect
 * @returns {Object} - Ref and section controls
 */
export function useSectionTransition(config = {}, deps = []) {
  const elementRef = useRef(null);
  const sectionIdRef = useRef(null);

  const registerSection = useCallback(() => {
    if (!elementRef.current) return;

    // Remove existing section
    if (sectionIdRef.current) {
      sectionTransitionController.removeSection(sectionIdRef.current);
    }

    // Register new section
    const sectionId = sectionTransitionController.registerSection({
      element: elementRef.current,
      ...config
    });

    sectionIdRef.current = sectionId;
    return sectionId;
  }, [config, ...deps]);

  const removeSection = useCallback(() => {
    if (sectionIdRef.current) {
      sectionTransitionController.removeSection(sectionIdRef.current);
      sectionIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    registerSection();

    return () => {
      removeSection();
    };
  }, [registerSection, removeSection]);

  return {
    ref: elementRef,
    sectionId: sectionIdRef.current,
    registerSection,
    removeSection
  };
}

/**
 * Hook for fade-in section transition
 * @param {Object} options - Additional options
 * @returns {Object} - Ref and controls
 */
export function useFadeInSection(options = {}) {
  const config = {
    ...TransitionPresets.fadeIn,
    ...options
  };

  return useSectionTransition(config);
}

/**
 * Hook for slide-up section transition
 * @param {Object} options - Additional options
 * @returns {Object} - Ref and controls
 */
export function useSlideUpSection(options = {}) {
  const config = {
    ...TransitionPresets.slideUp,
    ...options
  };

  return useSectionTransition(config);
}

/**
 * Hook for scale-in section transition
 * @param {Object} options - Additional options
 * @returns {Object} - Ref and controls
 */
export function useScaleInSection(options = {}) {
  const config = {
    ...TransitionPresets.scaleIn,
    ...options
  };

  return useSectionTransition(config);
}

/**
 * Hook for liquid section transition
 * @param {Object} options - Additional options
 * @returns {Object} - Ref and controls
 */
export function useLiquidSection(options = {}) {
  const config = {
    ...TransitionPresets.liquidIn,
    ...options
  };

  return useSectionTransition(config);
}

/**
 * Hook for staggered child animations
 * @param {Object} config - Staggered animation configuration
 * @returns {Object} - Ref and controls
 */
export function useStaggeredChildren(config = {}) {
  const elementRef = useRef(null);
  const triggerIdsRef = useRef([]);

  const createStaggered = useCallback(() => {
    if (!elementRef.current) return;

    // Clean up existing triggers
    triggerIdsRef.current.forEach(triggerId => {
      if (triggerId) {
        scrollTrigger.remove(triggerId);
      }
    });

    // Create new staggered animation
    const triggerIds = sectionTransitionController.createStaggeredAnimation({
      parentElement: elementRef.current,
      ...config
    });

    triggerIdsRef.current = triggerIds || [];
    return triggerIds;
  }, [config]);

  const removeStaggered = useCallback(() => {
    triggerIdsRef.current.forEach(triggerId => {
      if (triggerId) {
        scrollTrigger.remove(triggerId);
      }
    });
    triggerIdsRef.current = [];
  }, []);

  useEffect(() => {
    createStaggered();

    return () => {
      removeStaggered();
    };
  }, [createStaggered, removeStaggered]);

  return {
    ref: elementRef,
    triggerIds: triggerIdsRef.current,
    createStaggered,
    removeStaggered
  };
}

/**
 * Hook for section-to-section transitions
 * @param {Object} config - Section transition configuration
 * @returns {Object} - Transition controls
 */
export function useSectionToSectionTransition(config = {}) {
  const transitionIdRef = useRef(null);

  const createTransition = useCallback(() => {
    if (!config.fromSection || !config.toSection) return;

    // Remove existing transition
    if (transitionIdRef.current) {
      sectionTransitionController.removeTransition(transitionIdRef.current);
    }

    // Create new transition
    const transitionId = sectionTransitionController.createSectionTransition(config);
    transitionIdRef.current = transitionId;
    return transitionId;
  }, [config]);

  const removeTransition = useCallback(() => {
    if (transitionIdRef.current) {
      sectionTransitionController.removeTransition(transitionIdRef.current);
      transitionIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    createTransition();

    return () => {
      removeTransition();
    };
  }, [createTransition, removeTransition]);

  return {
    transitionId: transitionIdRef.current,
    createTransition,
    removeTransition
  };
}

/**
 * Hook for preset section transitions
 * @param {string} presetName - Name of the preset
 * @param {Object} options - Additional options
 * @returns {Object} - Ref and controls
 */
export function usePresetSection(presetName, options = {}) {
  const preset = TransitionPresets[presetName];
  
  if (!preset) {
    console.warn(`useSectionTransition: Preset "${presetName}" not found`);
    return useSectionTransition(options);
  }

  const config = {
    ...preset,
    ...options
  };

  return useSectionTransition(config);
}

/**
 * Hook for custom transition timing
 * @param {string} transitionType - Type of transition
 * @param {number} duration - Animation duration
 * @param {number} stagger - Stagger delay
 * @param {Object} options - Additional options
 * @returns {Object} - Ref and controls
 */
export function useCustomSection(transitionType, duration = 800, stagger = 100, options = {}) {
  const config = {
    transitionType,
    duration,
    stagger,
    easing: 'ease-out',
    ...options
  };

  return useSectionTransition(config);
}

/**
 * Hook for batch section registrations
 * @param {Array} sections - Array of section configurations
 * @returns {Array} - Array of section IDs
 */
export function useSectionBatch(sections = []) {
  const sectionIdsRef = useRef([]);

  useEffect(() => {
    // Clean up existing sections
    sectionIdsRef.current.forEach(sectionId => {
      if (sectionId) {
        sectionTransitionController.removeSection(sectionId);
      }
    });

    // Register new sections
    sectionIdsRef.current = sections.map(config => {
      if (config.element) {
        return sectionTransitionController.registerSection(config);
      }
      return null;
    }).filter(Boolean);

    return () => {
      // Cleanup on unmount
      sectionIdsRef.current.forEach(sectionId => {
        if (sectionId) {
          sectionTransitionController.removeSection(sectionId);
        }
      });
    };
  }, [sections]);

  return sectionIdsRef.current;
}

/**
 * Hook for section transition controller management
 * @returns {Object} - Controller methods
 */
export function useSectionController() {
  const destroy = useCallback(() => {
    sectionTransitionController.destroy();
  }, []);

  return {
    destroy
  };
}

export default useSectionTransition;
export { TransitionPresets };