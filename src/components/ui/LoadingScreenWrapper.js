/**
 * LoadingScreenWrapper Component
 * Simplified loading screen wrapper that actually works
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import SimpleLoadingScreen from './SimpleLoadingScreen';
import AnimationLoader from './AnimationLoader';

const LoadingScreenWrapper = ({ children }) => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  // Hide CSS fallback when JavaScript is available
  useEffect(() => {
    const hideCSSFallback = () => {
      const cssFallback = document.querySelector('.css-loading-fallback');
      if (cssFallback) {
        console.log('Hiding CSS fallback');
        cssFallback.style.display = 'none';
        cssFallback.style.visibility = 'hidden';
        cssFallback.style.opacity = '0';
      }
    };

    hideCSSFallback();
  }, []);

  const handleLoadingComplete = () => {
    console.log('Loading complete, hiding loading screen');
    setShowLoadingScreen(false);
  };

  const handleAnimationsLoaded = useCallback((loadedSystems) => {
    console.log('Animations loaded:', loadedSystems);
  }, []);

  return (
    <>
      {/* Animation System Loader */}
      <AnimationLoader onAnimationsLoaded={handleAnimationsLoaded} />

      {/* Simple Loading Screen */}
      {showLoadingScreen && (
        <SimpleLoadingScreen
          onComplete={handleLoadingComplete}
          minDuration={1500}
          maxDuration={3000}
          theme="dark"
        />
      )}

      {/* Main Content */}
      <div 
        className={`
          transition-all duration-600 ease-out
          ${showLoadingScreen ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
        `}
        style={{
          visibility: showLoadingScreen ? 'hidden' : 'visible'
        }}
      >
        {children}
      </div>
    </>
  );
};

export default LoadingScreenWrapper;