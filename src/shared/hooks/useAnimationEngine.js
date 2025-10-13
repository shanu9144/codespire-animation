/**
 * React Hook for Animation Engine
 * Provides easy access to animation system in React components
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import AnimationEngine from '../animations/core/AnimationEngine.js';
import PerformanceManager from '../animations/core/PerformanceManager.js';

/**
 * Hook to use the animation engine
 * @param {Object} options - Hook options
 * @returns {Object} Animation engine interface
 */
export function useAnimationEngine(options = {}) {
  const [isInitialized, setIsInitialized] = useState(AnimationEngine.isInitialized);
  const [metrics, setMetrics] = useState(null);
  const [qualityLevel, setQualityLevel] = useState('high');
  
  const metricsIntervalRef = useRef(null);

  // Initialize engine if not already initialized
  useEffect(() => {
    if (!AnimationEngine.isInitialized && options.autoInitialize !== false) {
      AnimationEngine.initialize(options.config).then(() => {
        setIsInitialized(true);
      });
    } else {
      setIsInitialized(AnimationEngine.isInitialized);
    }
  }, [options.autoInitialize, options.config]);

  // Set up performance monitoring
  useEffect(() => {
    if (!isInitialized) return;

    // Listen for quality changes
    const handleQualityChange = (newLevel) => {
      setQualityLevel(newLevel);
    };

    PerformanceManager.onQualityChange(handleQualityChange);

    // Update metrics periodically if requested
    if (options.trackMetrics) {
      metricsIntervalRef.current = setInterval(() => {
        setMetrics(AnimationEngine.getMetrics());
      }, options.metricsInterval || 1000);
    }

    return () => {
      if (metricsIntervalRef.current) {
        clearInterval(metricsIntervalRef.current);
      }
    };
  }, [isInitialized, options.trackMetrics, options.metricsInterval]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (metricsIntervalRef.current) {
        clearInterval(metricsIntervalRef.current);
      }
    };
  }, []);

  // Animation control functions
  const playAnimation = useCallback(async (id, animationOptions) => {
    if (!isInitialized) {
      console.warn('Animation engine not initialized');
      return Promise.resolve();
    }
    return AnimationEngine.playAnimation(id, animationOptions);
  }, [isInitialized]);

  const pauseAnimation = useCallback((id) => {
    if (isInitialized) {
      AnimationEngine.pauseAnimation(id);
    }
  }, [isInitialized]);

  const stopAnimation = useCallback((id) => {
    if (isInitialized) {
      AnimationEngine.stopAnimation(id);
    }
  }, [isInitialized]);

  const registerAnimation = useCallback((id, animation) => {
    if (isInitialized) {
      return AnimationEngine.registerAnimation(id, animation);
    }
    return false;
  }, [isInitialized]);

  const setPerformanceMode = useCallback((mode) => {
    if (isInitialized) {
      AnimationEngine.setPerformanceMode(mode);
    }
  }, [isInitialized]);

  return {
    // State
    isInitialized,
    metrics,
    qualityLevel,
    
    // Controls
    playAnimation,
    pauseAnimation,
    stopAnimation,
    registerAnimation,
    setPerformanceMode,
    
    // Engine access
    engine: AnimationEngine,
    
    // Utilities
    pauseAll: useCallback(() => AnimationEngine.pauseAll(), []),
    resumeAll: useCallback(() => AnimationEngine.resumeAll(), []),
    getConfig: useCallback(() => AnimationEngine.getConfig(), [])
  };
}

/**
 * Hook for animation performance monitoring
 * @param {Object} options - Monitoring options
 * @returns {Object} Performance data and controls
 */
export function useAnimationPerformance(options = {}) {
  const [fps, setFPS] = useState(60);
  const [frameTime, setFrameTime] = useState(16.67);
  const [qualityLevel, setQualityLevel] = useState('high');
  const [memoryUsage, setMemoryUsage] = useState(null);

  useEffect(() => {
    // Set up FPS monitoring
    const handleFPSUpdate = (newFPS, newFrameTime) => {
      setFPS(newFPS);
      setFrameTime(newFrameTime);
    };

    // Set up quality monitoring
    const handleQualityChange = (newLevel) => {
      setQualityLevel(newLevel);
    };

    PerformanceManager.onFPSUpdate(handleFPSUpdate);
    PerformanceManager.onQualityChange(handleQualityChange);

    // Update memory usage periodically
    const updateMemory = () => {
      setMemoryUsage(PerformanceManager.getMemoryUsage());
    };

    updateMemory();
    const memoryInterval = setInterval(updateMemory, options.memoryUpdateInterval || 5000);

    return () => {
      clearInterval(memoryInterval);
    };
  }, [options.memoryUpdateInterval]);

  return {
    fps: Math.round(fps),
    frameTime: Math.round(frameTime * 100) / 100,
    qualityLevel,
    memoryUsage,
    metrics: PerformanceManager.getMetrics()
  };
}

/**
 * Hook for reduced motion detection
 * @returns {Object} Reduced motion state and utilities
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    typeof window !== 'undefined' ? 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches : 
      false
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return {
    prefersReducedMotion,
    shouldAnimate: !prefersReducedMotion
  };
}