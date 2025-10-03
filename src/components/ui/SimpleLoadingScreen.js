/**
 * SimpleLoadingScreen Component
 * A simplified, guaranteed-to-work loading screen
 */

'use client';

import { useState, useEffect, useRef } from 'react';

const SimpleLoadingScreen = ({ 
  onComplete,
  minDuration = 2000,
  maxDuration = 4000,
  theme = 'dark'
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    console.log('SimpleLoadingScreen: Starting loading animation');
    
    const startTime = Date.now();
    const duration = minDuration + Math.random() * (maxDuration - minDuration);
    
    // Smooth progress animation
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progressPercent = Math.min((elapsed / duration) * 100, 100);
      
      // Add some randomness to make it feel more natural
      const jitter = Math.random() * 2 - 1; // -1 to 1
      const smoothProgress = Math.min(progressPercent + jitter, 100);
      
      setProgress(Math.max(0, smoothProgress));
      
      if (progressPercent >= 100) {
        setIsComplete(true);
        clearInterval(intervalRef.current);
        
        // Start fade out after a brief pause
        setTimeout(() => {
          setIsVisible(false);
          
          // Call completion callback after fade out
          setTimeout(() => {
            if (onComplete) {
              onComplete();
            }
          }, 600);
        }, 300);
      }
    };

    intervalRef.current = setInterval(updateProgress, 50); // 20fps

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [minDuration, maxDuration, onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        transition-all duration-600 ease-out
        ${theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800' 
          : 'bg-gradient-to-br from-white via-gray-50 to-gray-100'
        }
        ${!isVisible ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
      `}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Loading progress: ${Math.round(progress)}%`}
    >
      <div className="text-center">
        {/* CodeSpire branding */}
        <div className="mb-8">
          <div 
            className={`
              text-2xl md:text-3xl font-bold tracking-wide mb-2
              ${theme === 'dark' ? 'text-blue-500' : 'text-blue-600'}
            `}
          >
            CodeSpire
          </div>
          <div 
            className={`
              text-sm md:text-base font-medium tracking-wider
              ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
            `}
          >
            SOLUTIONS
          </div>
        </div>

        {/* Progress counter */}
        <div
          className={`
            text-6xl md:text-8xl lg:text-9xl font-bold tabular-nums mb-4
            ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
            transition-all duration-300 ease-out
            ${isComplete ? 'scale-105' : 'scale-100'}
          `}
          style={{
            fontFeatureSettings: '"tnum"',
            letterSpacing: '-0.02em'
          }}
        >
          {Math.round(progress)}
          <span className="text-blue-500">%</span>
        </div>

        {/* Loading text */}
        <div
          className={`
            text-lg md:text-xl font-medium
            ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
            ${isComplete ? 'opacity-100' : 'opacity-75'}
            transition-opacity duration-300
          `}
        >
          {isComplete ? 'Complete!' : 'Loading...'}
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-64 md:w-80 mx-auto">
          <div 
            className={`
              h-2 rounded-full overflow-hidden
              ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}
            `}
          >
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div 
            className={`
              mt-2 text-xs font-medium tabular-nums
              ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}
            `}
          >
            {Math.round(progress)}/100
          </div>
        </div>
      </div>

      {/* Screen reader announcements */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {isComplete ? 'Loading complete' : `Loading ${Math.round(progress)} percent`}
      </div>
    </div>
  );
};

export default SimpleLoadingScreen;