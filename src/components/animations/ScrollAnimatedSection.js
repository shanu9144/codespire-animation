/**
 * ScrollAnimatedSection - A section component with scroll-triggered animations
 * Provides easy integration of scroll animations for content sections
 */

'use client';

import React, { forwardRef } from 'react';
import { useSectionTransition } from '../../lib/animations/scroll';

const ScrollAnimatedSection = forwardRef(({
  children,
  className = '',
  transitionType = 'fadeUp',
  duration = 800,
  stagger = 100,
  triggerOffset = '20%',
  childSelector = '> *',
  onEnter = null,
  onLeave = null,
  ...props
}, ref) => {
  const { ref: sectionRef } = useSectionTransition({
    transitionType,
    duration,
    stagger,
    triggerOffset,
    childSelector,
    onEnter,
    onLeave
  });

  // Combine refs
  const combinedRef = (node) => {
    sectionRef.current = node;
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  };

  return (
    <section
      ref={combinedRef}
      className={`scroll-animated-section ${className}`}
      {...props}
    >
      {children}
    </section>
  );
});

ScrollAnimatedSection.displayName = 'ScrollAnimatedSection';

export default ScrollAnimatedSection;