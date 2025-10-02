/**
 * MorphingIcon - An SVG icon component with morphing animations
 * Provides easy integration of icon morphing effects
 */

'use client';

import React, { forwardRef } from 'react';
import { useIconMorph } from '../../animations/scroll';

const MorphingIcon = forwardRef(({
  className = '',
  size = 24,
  preset = null,
  states = null,
  triggers = ['hover'],
  duration = 300,
  easing = 'ease-out',
  initialState = 0,
  ...props
}, ref) => {
  const { ref: iconRef } = useIconMorph({
    preset,
    states,
    triggers,
    duration,
    easing
  });

  // Combine refs
  const combinedRef = (node) => {
    iconRef.current = node;
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  };

  // Get initial path from preset or states
  const getInitialPath = () => {
    if (preset) {
      // Import preset paths dynamically
      const presets = {
        menuToX: {
          states: [
            { path: 'M3 12h18M3 6h18M3 18h18' },
            { path: 'M18 6L6 18M6 6l12 12' }
          ]
        },
        playToPause: {
          states: [
            { path: 'M8 5v14l11-7z' },
            { path: 'M6 4h4v16H6zM14 4h4v16h-4z' }
          ]
        },
        heartFill: {
          states: [
            { path: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' },
            { path: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' }
          ]
        },
        arrowRotate: {
          states: [
            { path: 'M5 12h14M12 5l7 7-7 7' },
            { path: 'M19 12H5M12 19l-7-7 7-7' }
          ]
        }
      };
      
      return presets[preset]?.states[initialState]?.path || 'M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z';
    }
    
    if (states && states[initialState]) {
      return states[initialState].path;
    }
    
    return 'M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z';
  };

  return (
    <svg
      ref={combinedRef}
      className={`morphing-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d={getInitialPath()} />
    </svg>
  );
});

MorphingIcon.displayName = 'MorphingIcon';

export default MorphingIcon;