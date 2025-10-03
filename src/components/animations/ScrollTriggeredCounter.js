/**
 * ScrollTriggeredCounter - A counter component that animates when scrolled into view
 * Counts from start value to end value with easing
 */

'use client';

import React, { useState, useRef, forwardRef } from 'react';
import { useScrollTrigger } from '../../animations/scroll';

const ScrollTriggeredCounter = forwardRef(({
  from = 0,
  to = 100,
  duration = 2000,
  className = '',
  prefix = '',
  suffix = '',
  separator = ',',
  decimals = 0,
  easing = 'easeOutCubic',
  triggerOffset = '20%',
  onStart = null,
  onUpdate = null,
  onComplete = null,
  ...props
}, ref) => {
  const [currentValue, setCurrentValue] = useState(from);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  // Easing functions
  const easingFunctions = {
    linear: (t) => t,
    easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
    easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
  };

  const animate = (timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
      if (onStart) onStart();
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    
    // Apply easing
    const easedProgress = easingFunctions[easing] ? 
      easingFunctions[easing](progress) : 
      easingFunctions.easeOutCubic(progress);
    
    const currentVal = from + (to - from) * easedProgress;
    setCurrentValue(currentVal);
    
    if (onUpdate) onUpdate(currentVal, progress);
    
    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setIsAnimating(false);
      if (onComplete) onComplete(to);
    }
  };

  const startAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    startTimeRef.current = null;
    animationRef.current = requestAnimationFrame(animate);
  };

  const { ref: counterRef } = useScrollTrigger({
    start: `top ${triggerOffset}`,
    onEnter: startAnimation
  });

  // Combine refs
  const combinedRef = (node) => {
    counterRef.current = node;
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  };

  // Format number with separators and decimals
  const formatNumber = (value) => {
    const num = Number(value).toFixed(decimals);
    const parts = num.split('.');
    
    // Add thousand separators
    if (separator) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    }
    
    return parts.join('.');
  };

  const displayValue = formatNumber(currentValue);

  return (
    <span
      ref={combinedRef}
      className={`scroll-counter ${isAnimating ? 'animating' : ''} ${className}`}
      {...props}
    >
      {prefix}{displayValue}{suffix}
    </span>
  );
});

ScrollTriggeredCounter.displayName = 'ScrollTriggeredCounter';

export default ScrollTriggeredCounter;