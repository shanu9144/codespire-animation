/**
 * ScrollProgressBar - A progress bar that tracks scroll position
 * Shows reading progress or section progress
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useScrollProgress } from '../../animations/scroll';

const ScrollProgressBar = ({
  className = '',
  height = '4px',
  backgroundColor = '#e5e7eb',
  progressColor = '#384bff',
  position = 'fixed',
  top = '0',
  left = '0',
  right = '0',
  zIndex = 1000,
  target = null, // Target element to track, defaults to document
  smooth = true,
  showPercentage = false,
  ...props
}) => {
  const [progress, setProgress] = useState(0);

  const { ref } = useScrollProgress({
    onProgress: (progressValue) => {
      setProgress(progressValue);
    },
    start: 'top top',
    end: 'bottom bottom'
  });

  useEffect(() => {
    if (target) {
      ref.current = target;
    } else {
      // Track document scroll progress
      const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        setProgress(Math.min(Math.max(scrollPercent, 0), 1));
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [target, ref]);

  const progressPercentage = Math.round(progress * 100);

  return (
    <div
      className={`scroll-progress-bar ${className}`}
      style={{
        position,
        top,
        left,
        right,
        height,
        backgroundColor,
        zIndex,
        overflow: 'hidden'
      }}
      {...props}
    >
      <div
        className="progress-fill"
        style={{
          height: '100%',
          backgroundColor: progressColor,
          width: `${progressPercentage}%`,
          transition: smooth ? 'width 0.1s ease-out' : 'none',
          transformOrigin: 'left center'
        }}
      />
      {showPercentage && (
        <div
          className="progress-percentage"
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '12px',
            color: progressColor,
            fontWeight: '600'
          }}
        >
          {progressPercentage}%
        </div>
      )}
    </div>
  );
};

export default ScrollProgressBar;