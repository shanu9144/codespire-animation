'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * InfiniteCarousel - A flexible infinite scrolling carousel component
 * Can be used for icons, logos, text, or any other content
 */
const InfiniteCarousel = ({ 
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
  
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];
  
  // Animation direction
  const animationX = direction === 'left' 
    ? [0, -100 * items.length] 
    : [-100 * items.length, 0];

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
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        {duplicatedItems.map((item, index) => (
          <motion.div
            key={index}
            className={`flex-shrink-0 ${itemClassName}`}
            whileHover={{
              scale: 1.05,
              y: -3,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            {item}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteCarousel;

