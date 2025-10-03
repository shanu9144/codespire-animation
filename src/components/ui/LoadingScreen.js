/**
 * LoadingScreen Component
 * Displays loading progress with smooth percentage counter animation
 * Features sophisticated animations and CodeSpire brand styling
 */

'use client';

import { useState, useEffect, useRef } from 'react';

const LoadingScreen = ({
  progress = 0,
  isVisible = true,
  onTransitionComplete,
  theme = 'dark',
  className = '',
  showBranding = true,
  showProgressBar = true,
  animationIntensity = 'normal', // 'minimal', 'normal', 'enhanced'
  ...props
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);
  const animationRef = useRef(null);
  const lastProgressRef = useRef(0);
  const containerRef = useRef(null);

  // Mount animation
  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth progress counter animation
  useEffect(() => {
    if (progress === lastProgressRef.current) return;

    setIsAnimating(true);
    
    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startProgress = lastProgressRef.current;
    const targetProgress = progress;
    const startTime = performance.now();
    
    // Adjust duration based on animation intensity
    const baseDuration = animationIntensity === 'minimal' ? 150 : 
                        animationIntensity === 'enhanced' ? 500 : 300;
    const duration = Math.min(baseDuration, Math.abs(targetProgress - startProgress) * 10);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      
      // Use different easing based on animation intensity
      let easedProgress;
      if (animationIntensity === 'minimal') {
        easedProgress = progressRatio; // Linear
      } else if (animationIntensity === 'enhanced') {
        // easeOutBack for slight overshoot
        const c1 = 1.70158;
        const c3 = c1 + 1;
        easedProgress = 1 + c3 * Math.pow(progressRatio - 1, 3) + c1 * Math.pow(progressRatio - 1, 2);
      } else {
        // easeOutCubic for smooth deceleration
        easedProgress = 1 - Math.pow(1 - progressRatio, 3);
      }
      
      const currentProgress = startProgress + (targetProgress - startProgress) * easedProgress;
      setDisplayProgress(Math.round(currentProgress));

      if (progressRatio < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        lastProgressRef.current = targetProgress;
        
        // Handle completion transition
        if (targetProgress >= 100 && onTransitionComplete) {
          setIsTransitioning(true);
          setTimeout(() => {
            onTransitionComplete();
          }, animationIntensity === 'enhanced' ? 800 : 400);
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [progress, onTransitionComplete, animationIntensity]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Handle reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Adjust animation intensity based on reduced motion preference
  const effectiveAnimationIntensity = prefersReducedMotion ? 'minimal' : animationIntensity;

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* CSS Keyframes for enhanced animations */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(56, 75, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(56, 75, 255, 0.6);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .loading-container {
          animation: ${effectiveAnimationIntensity !== 'minimal' ? 'fadeInScale 0.6s ease-out' : 'none'};
        }

        .loading-text {
          animation: ${effectiveAnimationIntensity !== 'minimal' ? 'slideInUp 0.8s ease-out 0.2s both' : 'none'};
        }

        .progress-bar-shimmer {
          background: linear-gradient(
            90deg,
            var(--primary) 0%,
            rgba(56, 75, 255, 0.8) 50%,
            var(--primary) 100%
          );
          background-size: 200% 100%;
          animation: ${effectiveAnimationIntensity === 'enhanced' ? 'shimmer 2s infinite' : 'none'};
        }

        .percentage-glow {
          animation: ${effectiveAnimationIntensity === 'enhanced' && isAnimating ? 'pulseGlow 0.6s ease-out' : 'none'};
        }
      `}</style>

      <div
        ref={containerRef}
        className={`
          fixed inset-0 z-50 flex items-center justify-center
          ${theme === 'dark' 
            ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800' 
            : 'bg-gradient-to-br from-white via-gray-50 to-gray-100'
          }
          ${isTransitioning ? 'transition-all duration-800 ease-in-out opacity-0 scale-95' : 'opacity-100 scale-100'}
          ${mounted ? 'transition-opacity duration-600 ease-out' : ''}
          ${className}
        `}
        role="progressbar"
        aria-valuenow={displayProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Loading progress: ${displayProgress}%`}
        {...props}
      >
        {/* Background pattern (subtle) */}
        {effectiveAnimationIntensity === 'enhanced' && (
          <div 
            className={`
              absolute inset-0 opacity-5
              ${theme === 'dark' ? 'bg-white' : 'bg-gray-900'}
            `}
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, currentColor 2px, transparent 2px),
                               radial-gradient(circle at 75% 75%, currentColor 2px, transparent 2px)`,
              backgroundSize: '60px 60px',
              backgroundPosition: '0 0, 30px 30px'
            }}
          />
        )}

        {/* Loading content container */}
        <div className="text-center loading-container relative z-10">
          {/* CodeSpire branding */}
          {showBranding && (
            <div className="mb-8 loading-text">
              <div 
                className={`
                  text-2xl md:text-3xl font-bold tracking-wide
                  ${theme === 'dark' ? 'text-primary' : 'text-primary'}
                  ${effectiveAnimationIntensity !== 'minimal' ? 'hover:scale-105 transition-transform duration-300' : ''}
                `}
              >
                CodeSpire
              </div>
              <div 
                className={`
                  text-sm md:text-base font-medium mt-1 tracking-wider
                  ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
                `}
              >
                SOLUTIONS
              </div>
            </div>
          )}

          {/* Percentage counter */}
          <div
            className={`
              text-6xl md:text-8xl lg:text-9xl font-bold tabular-nums
              ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
              ${effectiveAnimationIntensity !== 'minimal' ? 'transform transition-all duration-300' : ''}
              ${isAnimating && effectiveAnimationIntensity !== 'minimal' ? 'scale-105' : 'scale-100'}
              ${effectiveAnimationIntensity === 'enhanced' ? 'percentage-glow' : ''}
              relative
            `}
            style={{
              fontFeatureSettings: '"tnum"', // Tabular numbers for consistent width
              letterSpacing: '-0.02em'
            }}
          >
            {displayProgress}
            <span 
              className={`
                text-primary
                ${effectiveAnimationIntensity !== 'minimal' ? 'transition-all duration-300' : ''}
                ${isAnimating && effectiveAnimationIntensity === 'enhanced' ? 'animate-pulse' : ''}
              `}
            >
              %
            </span>
            
            {/* Subtle glow effect for enhanced mode */}
            {effectiveAnimationIntensity === 'enhanced' && (
              <div 
                className="absolute inset-0 text-primary opacity-20 blur-sm pointer-events-none"
                aria-hidden="true"
              >
                {displayProgress}%
              </div>
            )}
          </div>

          {/* Loading text */}
          <div
            className={`
              mt-6 text-lg md:text-xl font-medium loading-text
              ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
              ${effectiveAnimationIntensity === 'minimal' ? '' : 
                effectiveAnimationIntensity === 'enhanced' ? 'animate-pulse' : 'opacity-75'}
            `}
          >
            {displayProgress < 100 ? 'Loading...' : 'Complete!'}
          </div>

          {/* Progress indicator bar */}
          {showProgressBar && (
            <div className="mt-8 w-64 md:w-80 mx-auto loading-text">
              <div 
                className={`
                  h-2 rounded-full overflow-hidden relative
                  ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}
                  ${effectiveAnimationIntensity === 'enhanced' ? 'shadow-inner' : ''}
                `}
              >
                <div
                  className={`
                    h-full rounded-full relative overflow-hidden
                    ${effectiveAnimationIntensity === 'enhanced' ? 'progress-bar-shimmer' : 'bg-primary'}
                    ${effectiveAnimationIntensity !== 'minimal' ? 'transition-all duration-500 ease-out' : ''}
                    ${effectiveAnimationIntensity === 'enhanced' ? 'shadow-lg' : ''}
                  `}
                  style={{
                    width: `${displayProgress}%`,
                    transform: effectiveAnimationIntensity !== 'minimal' ? 'translateZ(0)' : 'none' // Force hardware acceleration
                  }}
                >
                  {/* Progress bar highlight */}
                  {effectiveAnimationIntensity === 'enhanced' && (
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                      style={{
                        transform: 'translateX(-100%)',
                        animation: displayProgress > 0 ? 'shimmer 2s infinite' : 'none'
                      }}
                    />
                  )}
                </div>
              </div>
              
              {/* Progress percentage text */}
              <div 
                className={`
                  mt-2 text-xs font-medium tabular-nums
                  ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}
                `}
              >
                {displayProgress}/100
              </div>
            </div>
          )}
        </div>

        {/* Screen reader announcements */}
        <div 
          className="sr-only" 
          aria-live="polite" 
          aria-atomic="true"
        >
          {displayProgress === 100 ? 'Loading complete' : `Loading ${displayProgress} percent`}
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;