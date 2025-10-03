/**
 * ScrollMorphingLogo - A logo component that morphs based on scroll position
 * Transforms between normal and animated states
 */

'use client';

import React, { forwardRef } from 'react';
import { useLogoMorph } from '../../animations/scroll';

const ScrollMorphingLogo = forwardRef(({
  className = '',
  size = 40,
  normalState = {
    path: 'M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z',
    fill: 'currentColor'
  },
  animatedState = {
    path: 'M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z',
    fill: '#384bff'
  },
  scrollTriggerConfig = {
    start: 'top center',
    end: 'bottom center',
    morphOnEnter: true,
    morphOnLeave: true
  },
  ...props
}, ref) => {
  const { ref: logoRef } = useLogoMorph(
    normalState,
    animatedState,
    scrollTriggerConfig
  );

  // Combine refs
  const combinedRef = (node) => {
    logoRef.current = node;
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  };

  return (
    <svg
      ref={combinedRef}
      className={`scroll-morphing-logo ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d={normalState.path}
        fill={normalState.fill || 'currentColor'}
        stroke={normalState.stroke}
        strokeWidth={normalState.strokeWidth}
      />
    </svg>
  );
});

ScrollMorphingLogo.displayName = 'ScrollMorphingLogo';

export default ScrollMorphingLogo;