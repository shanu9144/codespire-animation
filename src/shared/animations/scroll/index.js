/**
 * Scroll Animations - Advanced scroll-triggered animation system
 * Exports all scroll-related animation components and utilities
 */

// Import controllers and hooks for default export
import scrollTriggerInstance from './ScrollTrigger';
import parallaxControllerInstance from './ParallaxController';
import morphingControllerInstance from './MorphingAnimations';
import sectionTransitionControllerInstance from './SectionTransitions';

// Import hooks
import useScrollTrigger from './useScrollTrigger';
import useParallax from './useParallax';
import useMorphing from './useMorphing';
import useSectionTransition from './useSectionTransitions';

// Import utilities and presets
import ScrollAnimations from './ScrollAnimations';
import { TransitionPresets } from './SectionTransitions';
import { IconMorphPresets } from './MorphingAnimations';
import { ParallaxEasing } from './ParallaxController';

// Import components
import ScrollAnimatedSection from './ScrollAnimatedSection';
import ScrollRevealText from './ScrollRevealText';
import ParallaxElement from './ParallaxElement';

// Core scroll trigger system
export { default as scrollTrigger, ScrollTrigger, getScrollTrigger } from './ScrollTrigger';
export { 
  default as useScrollTrigger,
  useScrollProgress,
  useScrollVisibility,
  useScrollTriggerBatch
} from './useScrollTrigger';

// Parallax system
export { 
  default as parallaxController, 
  ParallaxController, 
  ParallaxEasing,
  getParallaxController
} from './ParallaxController';
export {
  default as useParallax,
  useVerticalParallax,
  useHorizontalParallax,
  useMultiParallax,
  useBoundedParallax,
  useEasedParallax,
  useParallaxBatch,
  useParallaxController
} from './useParallax';

// Morphing animations
export {
  default as morphingController,
  MorphingController,
  IconMorphPresets,
  getMorphingController
} from './MorphingAnimations';
export {
  default as useMorphing,
  useIconMorph,
  useScrollMorph,
  useLogoMorph,
  useHoverMorph,
  useClickMorph,
  usePresetMorph,
  useMorphingBatch
} from './useMorphing';

// Section transitions
export {
  default as sectionTransitionController,
  SectionTransitionController,
  TransitionPresets,
  getSectionTransitionController
} from './SectionTransitions';
export {
  default as useSectionTransition,
  useFadeInSection,
  useSlideUpSection,
  useScaleInSection,
  useLiquidSection,
  useStaggeredChildren,
  useSectionToSectionTransition,
  usePresetSection,
  useCustomSection,
  useSectionBatch,
  useSectionController
} from './useSectionTransitions';

// Common scroll animations
export { default as ScrollAnimations } from './ScrollAnimations';

// Components
export { default as ScrollAnimatedSection } from './ScrollAnimatedSection';
export { default as ScrollRevealText } from './ScrollRevealText';
export { default as ParallaxElement } from './ParallaxElement';

// Utility functions
export const ScrollUtils = {
  /**
   * Get scroll progress for an element
   */
  getScrollProgress: (element) => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementTop = rect.top;
    const elementHeight = rect.height;
    
    if (elementTop > windowHeight) return 0;
    if (elementTop + elementHeight < 0) return 1;
    
    const visibleHeight = Math.min(windowHeight - elementTop, elementHeight);
    return Math.max(0, Math.min(1, visibleHeight / elementHeight));
  },

  /**
   * Check if element is in viewport
   */
  isInViewport: (element, threshold = 0) => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    return (
      rect.top >= -threshold &&
      rect.left >= -threshold &&
      rect.bottom <= windowHeight + threshold &&
      rect.right <= windowWidth + threshold
    );
  },

  /**
   * Get element's distance from viewport center
   */
  getDistanceFromCenter: (element) => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    const elementCenterX = rect.left + rect.width / 2;
    const elementCenterY = rect.top + rect.height / 2;
    const viewportCenterX = windowWidth / 2;
    const viewportCenterY = windowHeight / 2;
    
    const deltaX = elementCenterX - viewportCenterX;
    const deltaY = elementCenterY - viewportCenterY;
    
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  },

  /**
   * Smooth scroll to element
   */
  scrollToElement: (element, options = {}) => {
    const {
      behavior = 'smooth',
      offset = 0
    } = options;

    const elementTop = element.offsetTop - offset;
    
    window.scrollTo({
      top: elementTop,
      behavior
    });
  },

  /**
   * Debounce scroll events
   */
  debounceScroll: (callback, delay = 16) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback.apply(null, args), delay);
    };
  },

  /**
   * Throttle scroll events
   */
  throttleScroll: (callback, delay = 16) => {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        callback.apply(null, args);
      }
    };
  }
};

// Animation presets for common use cases
export const ScrollPresets = {
  // Hero section animations
  hero: {
    transitionType: 'fadeUp',
    duration: 1200,
    stagger: 200,
    easing: 'ease-out',
    triggerOffset: '10%'
  },

  // Card grid animations
  cardGrid: {
    transitionType: 'scaleIn',
    duration: 600,
    stagger: 100,
    easing: 'ease-out',
    triggerOffset: '20%'
  },

  // Text content animations
  textContent: {
    transitionType: 'slideUp',
    duration: 800,
    stagger: 50,
    easing: 'ease-out',
    triggerOffset: '15%'
  },

  // Statistics animations
  statistics: {
    transitionType: 'fade',
    duration: 1000,
    stagger: 150,
    easing: 'ease-out',
    triggerOffset: '25%'
  },

  // Footer animations
  footer: {
    transitionType: 'slideUp',
    duration: 1000,
    stagger: 100,
    easing: 'ease-out',
    triggerOffset: '30%'
  }
};

// Export everything as default object
const ScrollModule = {
  // Controllers
  scrollTrigger: scrollTriggerInstance,
  parallaxController: parallaxControllerInstance,
  morphingController: morphingControllerInstance,
  sectionTransitionController: sectionTransitionControllerInstance,
  
  // Hooks
  useScrollTrigger,
  useParallax,
  useMorphing,
  useSectionTransition,
  
  // Utilities
  ScrollUtils,
  ScrollPresets,
  ScrollAnimations,
  
  // Presets
  TransitionPresets,
  IconMorphPresets,
  ParallaxEasing
};

export default ScrollModule;