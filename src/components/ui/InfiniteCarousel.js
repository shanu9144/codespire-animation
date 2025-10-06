'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * InfiniteCarousel - A flexible infinite scrolling carousel component
 * Can be used for icons, logos, text, or any other content
 */
const InfiniteCarousel = React.memo(({ 
  items, 
  speed = 15, 
  direction = 'left',
  pauseOnHover = true,
  className = '',
  itemClassName = '',
  containerClassName = '',
  showGradients = true,
  gradientSize = 'w-24'
}) => {
  const [isPaused, setIsPaused] = useState(false);
  
  // Memoize duplicated items to prevent recreation
  const duplicatedItems = useMemo(() => [...items, ...items], [items]);
  
  // Memoize animation direction
  const animationX = useMemo(() => direction === 'left' 
    ? [0, -100 * items.length] 
    : [-100 * items.length, 0], [direction, items.length]);
  
  // Memoize event handlers
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);
  
  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  return (
    <div className={`relative w-full overflow-hidden bg-gradient-to-r from-gray-50 to-white py-12 ${className}`}>
      {/* Gradient overlays for fade effect */}
      {showGradients && (
        <>
          <div className={`absolute left-0 top-0 bottom-0 ${gradientSize} bg-gradient-to-r from-gray-50 to-transparent z-10`} />
          <div className={`absolute right-0 top-0 bottom-0 ${gradientSize} bg-gradient-to-l from-white to-transparent z-10`} />
        </>
      )}
      
      {/* Infinite scrolling container */}
      <motion.div
        className={`flex items-center space-x-8 ${containerClassName}`}
        animate={isPaused ? {} : {
          x: animationX,
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        style={{
          width: `${duplicatedItems.length * 140}px`,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className={`flex-shrink-0 ${itemClassName} transition-transform duration-200 hover:scale-105`}
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
});

InfiniteCarousel.displayName = 'InfiniteCarousel';

export default InfiniteCarousel;

