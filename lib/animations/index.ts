// Animation system exports
export * from './3d';
export * from './core';
export * from './cursor';
export * from './fluid';
export * from './particles';
export * from './utils';

// Export intersection hooks with specific names to avoid conflicts
export { 
  useIntersectionObserver,
  IntersectionUtils,
  IntersectionPresets,
  useAnimationTrigger,
  useVisibility,
  useScrollProgress as useIntersectionScrollProgress
} from './intersection';

// Export scroll hooks with specific names to avoid conflicts
export {
  useScrollTrigger,
  useParallax,
  useMorphing,
  useSectionTransition,
  useScrollProgress as useScrollProgressHook,
  ScrollAnimatedSection,
  ScrollRevealText,
  ParallaxElement,
  ParallaxController,
  ScrollTrigger
} from './scroll';
