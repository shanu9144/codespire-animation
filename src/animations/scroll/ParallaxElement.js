"use client";

import React, { useRef, useEffect } from 'react';
import { useParallax } from './useParallax';

/**
 * ParallaxElement Component
 * 
 * Adds parallax scrolling to any element
 */
const ParallaxElement = ({
  children,
  speed = 0.5,
  direction = 'vertical',
  bounds = null,
  className = '',
  ...props
}) => {
  const { ref } = useParallax({
    speed: direction === 'horizontal' ? { x: speed, y: 0 } : 
           direction === 'both' ? { x: speed, y: speed } : 
           { x: 0, y: speed },
    bounds,
    easing: 'easeOut'
  });

  return (
    <div
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

export default ParallaxElement;

