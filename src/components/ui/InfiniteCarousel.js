'use client';

import React, { useState, useCallback, useMemo } from 'react';

/**
 * InfiniteCarousel - A flexible infinite scrolling carousel component
 * Can be used for icons, logos, text, or any other content
 */
const InfiniteCarousel = React.memo(({ 
  items, 
  speed = 40, // seconds for one full loop
  direction = 'left',
  pauseOnHover = true,
  className = '',
  itemClassName = '',
  containerClassName = '',
  showGradients = true,
  gradientSize = 'w-24',
}) => {
  const [isPaused, setIsPaused] = useState(false);
  
  // Memoize duplicated items to prevent recreation
  const duplicatedItems = useMemo(() => [...items, ...items], [items]);

  // Handle pause/resume on hover
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  }, [pauseOnHover]);

  return (
    <div
      className={`relative w-full overflow-hidden bg-gradient-to-r from-gray-50 to-white py-12 ${className}`}
      data-animated="true"
      data-direction={direction === 'right' ? 'right' : 'left'}
      style={{
        '--_animation-duration': `${speed}s`,
        '--_gap': '2rem',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient overlays for fade effect */}
      {showGradients && (
        <>
          <div className={`pointer-events-none absolute left-0 top-0 bottom-0 ${gradientSize} bg-gradient-to-r from-gray-50 to-transparent z-10`} />
          <div className={`pointer-events-none absolute right-0 top-0 bottom-0 ${gradientSize} bg-gradient-to-l from-white to-transparent z-10`} />
        </>
      )}

      {/* Infinite scrolling container */}
      <div
        className={`scroller__inner flex items-center ${containerClassName}`}
        style={{
          gap: '2rem',
          width: 'max-content',
          animation: `carousel-scroll var(--_animation-duration, 40s) linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className={`flex-shrink-0 overflow-hidden rounded-xl ${itemClassName}`}
          >
            {item}
          </div>
        ))}
      </div>

      <style jsx>{`
        :global([data-animated="true"]) {
          overflow: hidden;
          -webkit-mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
          mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
        }

        @keyframes carousel-scroll {
          to {
            transform: translateX(calc(-50% - var(--_gap, 2rem)));
          }
        }
      `}</style>
    </div>
  );
});

InfiniteCarousel.displayName = 'InfiniteCarousel';

export default InfiniteCarousel;

