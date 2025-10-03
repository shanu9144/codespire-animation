/**
 * Animation UI Components
 * Ready-to-use React components with built-in scroll animations
 */

// Scroll-triggered animations
export { default as ScrollAnimatedSection } from './ScrollAnimatedSection';
export { default as ScrollRevealText } from './ScrollRevealText';
export { default as ScrollTriggeredCounter } from './ScrollTriggeredCounter';
export { default as ScrollProgressBar } from './ScrollProgressBar';
export { default as ScrollMorphingLogo } from './ScrollMorphingLogo';

// Parallax components
export { default as ParallaxElement } from './ParallaxElement';
export { default as ParallaxBackground } from './ParallaxBackground';

// Interactive components
export { default as MorphingIcon } from './MorphingIcon';
export { default as StaggeredGrid } from './StaggeredGrid';

// Existing components
export { default as AnimationTest } from './AnimationTest';
export { default as GeometryShowcase } from './GeometryShowcase';

// Export all as default object for convenience
export default {
  ScrollAnimatedSection,
  ScrollRevealText,
  ScrollTriggeredCounter,
  ScrollProgressBar,
  ScrollMorphingLogo,
  ParallaxElement,
  ParallaxBackground,
  MorphingIcon,
  StaggeredGrid,
  AnimationTest,
  GeometryShowcase
};