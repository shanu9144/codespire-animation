/**
 * AnimationLoader Component
 * Ensures all animation systems are properly initialized
 */

'use client';

import { useEffect, useState } from 'react';

const AnimationLoader = ({ onAnimationsLoaded }) => {
  const [loadedSystems, setLoadedSystems] = useState(new Set());
  const [isComplete, setIsComplete] = useState(false);

  const animationSystems = [
    'cursor-system',
    'particle-system',
    'fluid-animations',
    'scroll-animations',
    '3d-systems'
  ];

  useEffect(() => {
    console.log('AnimationLoader: Initializing animation systems...');

    const checkAnimationSystems = () => {
      const loaded = new Set();

      // Check for cursor system - look for cursor elements or initialized system
      if (document.querySelector('.cursor-system') || 
          document.querySelector('[data-cursor]') || 
          window.CursorSystem ||
          document.body.style.cursor !== '') {
        loaded.add('cursor-system');
      }

      // Check for particle system
      if (document.querySelector('canvas') || 
          window.ParticleSystem ||
          document.querySelector('[data-particle]')) {
        loaded.add('particle-system');
      }

      // Check for fluid animations
      if (window.FluidBackground || 
          document.querySelector('[data-fluid]') ||
          document.querySelector('.fluid-background')) {
        loaded.add('fluid-animations');
      }

      // Check for scroll animations - these are usually present
      if (window.ScrollAnimations || 
          document.querySelector('[data-scroll]') ||
          document.querySelector('[data-aos]') ||
          window.IntersectionObserver) {
        loaded.add('scroll-animations');
      }

      // Check for 3D systems
      if (window.THREE || 
          document.querySelector('canvas[data-3d]') ||
          document.querySelector('.three-canvas')) {
        loaded.add('3d-systems');
      }

      setLoadedSystems(loaded);

      // Check if most systems are loaded or if we've waited long enough
      const loadedCount = loaded.size;
      const totalCount = animationSystems.length;
      const mostLoaded = loadedCount >= Math.ceil(totalCount * 0.6); // 60% loaded
      const timeoutReached = Date.now() - startTime > 2000; // 2 second timeout
      const basicSystemsReady = loaded.has('cursor-system') || loaded.has('scroll-animations');

      if (mostLoaded || timeoutReached || basicSystemsReady) {
        console.log('AnimationLoader: Animation systems ready', {
          loaded: Array.from(loaded),
          loadedCount,
          totalCount,
          mostLoaded,
          timeoutReached,
          basicSystemsReady
        });
        
        setIsComplete(true);
        if (onAnimationsLoaded) {
          onAnimationsLoaded(Array.from(loaded));
        }
        return true;
      }

      return false;
    };

    const startTime = Date.now();
    
    // Check immediately
    if (checkAnimationSystems()) {
      return;
    }

    // Check periodically
    const interval = setInterval(() => {
      if (checkAnimationSystems()) {
        clearInterval(interval);
      }
    }, 100);

    // Cleanup
    return () => clearInterval(interval);
  }, []); // Remove onAnimationsLoaded dependency to prevent infinite loops

  // This component doesn't render anything visible
  return null;
};

export default AnimationLoader;