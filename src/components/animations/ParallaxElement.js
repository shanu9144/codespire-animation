/**
 * ParallaxElement - A component with parallax scrolling effects
 * Provides easy integration of parallax animations for any element
 */

'use client';

import React, { forwardRef } from 'react';
import { useParallax } from '../../animations/scroll';

const ParallaxElement = forwardRef(({
  children,
  className = '',
  speed = 0.5,
  direction = 'vertical',
  bounds = null,
  easing = null,
  offset = { x: 0, y: 0 },
  transformOrigin = 'center center',
  onUpdate = null,
  ...props
}, ref) => {
  const { ref: parallaxRef } = useParallax({
    speed: typeof speed === 'number' ? 
      (direction === 'vertical' ? { y: speed } : 
       direction === 'horizontal' ? { x: speed } : 
       { x: speed, y: speed }) : speed,
    direction,
    bounds,
    easing,
    offset,
    transformOrigin,
    onUpdate
  });

  // Combine refs
  const combinedRef = (node) => {
    parallaxRef.current = node;
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  };

  return (
    <div
      ref={combinedRef}
      className={`parallax-element ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

ParallaxElement.displayName = 'ParallaxElement';

export default ParallaxElement;