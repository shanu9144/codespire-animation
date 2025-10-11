/**
 * StaggeredGrid - A grid component with staggered scroll animations
 * Animates children with configurable stagger timing
 */

'use client';

import React, { forwardRef } from 'react';
import { useStaggeredChildren } from '../../lib/animations/scroll';

const StaggeredGrid = forwardRef(({
  children,
  className = '',
  columns = 3,
  gap = '1rem',
  animationType = 'fadeUp',
  staggerDelay = 100,
  duration = 600,
  easing = 'ease-out',
  triggerOffset = '20%',
  childSelector = '> *',
  ...props
}, ref) => {
  const { ref: gridRef } = useStaggeredChildren({
    animationType,
    staggerDelay,
    duration,
    easing,
    triggerOffset,
    childSelector
  });

  // Combine refs
  const combinedRef = (node) => {
    gridRef.current = node;
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap,
    width: '100%'
  };

  return (
    <div
      ref={combinedRef}
      className={`staggered-grid ${className}`}
      style={gridStyles}
      {...props}
    >
      {children}
    </div>
  );
});

StaggeredGrid.displayName = 'StaggeredGrid';

export default StaggeredGrid;