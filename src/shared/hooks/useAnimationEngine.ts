/**
 * React Hook for Animation Engine
 * Provides easy access to animation system in React components
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import AnimationEngine from '../animations/core/AnimationEngine.js';
import PerformanceManager from '../animations/core/PerformanceManager.js';

interface AnimationEngineOptions {
  autoInitialize?: boolean;
  config?: any;
  trackMetrics?: boolean;
  metricsInterval?: number;
}

interface AnimationEngineHook {
  isInitialized: boolean;
  metrics: any;
  qualityLevel: string;
  playAnimation: (id: string, animationOptions?: any) => Promise<any>;
  pauseAnimation: (id: string) => void;
  stopAnimation: (id: string) => void;
  registerAnimation: (id: string, animation: any) => boolean;
  setPerformanceMode: (mode: string) => void;
  engine: any;
  pauseAll: () => void;
  resumeAll: () => void;
  getConfig: () => any;
}

/**
 * Hook to use the animation engine
 * @param options - Hook options
 * @returns Animation engine interface
 */
export function useAnimationEngine(options: AnimationEngineOptions = {}): AnimationEngineHook {
  const [isInitialized, setIsInitialized] = useState(AnimationEngine.isInitialized);
  const [metrics, setMetrics] = useState<any>(null);
  const [qualityLevel, setQualityLevel] = useState<string>('high');
  
  const metricsIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
    const handleQualityChange = (newLevel: string) => {
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
  const playAnimation = useCallback(async (id: string, animationOptions?: any) => {
    if (!isInitialized) {
      console.warn('Animation engine not initialized');
      return Promise.resolve();
    }
    return AnimationEngine.playAnimation(id, animationOptions);
  }, [isInitialized]);

  const pauseAnimation = useCallback((id: string) => {
    if (isInitialized) {
      AnimationEngine.pauseAnimation(id);
    }
  }, [isInitialized]);

  const stopAnimation = useCallback((id: string) => {
    if (isInitialized) {
      AnimationEngine.stopAnimation(id);
    }
  }, [isInitialized]);

  const registerAnimation = useCallback((id: string, animation: any) => {
    if (isInitialized) {
      return AnimationEngine.registerAnimation(id, animation);
    }
    return false;
  }, [isInitialized]);

  const setPerformanceMode = useCallback((mode: string) => {
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

interface PerformanceOptions {
  memoryUpdateInterval?: number;
}

interface PerformanceHook {
  fps: number;
  frameTime: number;
  qualityLevel: string;
  memoryUsage: any;
  metrics: any;
}

/**
 * Hook for animation performance monitoring
 * @param options - Monitoring options
 * @returns Performance data and controls
 */
export function useAnimationPerformance(options: PerformanceOptions = {}): PerformanceHook {
  const [fps, setFPS] = useState<number>(60);
  const [frameTime, setFrameTime] = useState<number>(16.67);
  const [qualityLevel, setQualityLevel] = useState<string>('high');
  const [memoryUsage, setMemoryUsage] = useState<any>(null);

  useEffect(() => {
    // Set up FPS monitoring
    const handleFPSUpdate = (newFPS: number, newFrameTime: number) => {
      setFPS(newFPS);
      setFrameTime(newFrameTime);
    };

    // Set up quality monitoring
    const handleQualityChange = (newLevel: string) => {
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

interface ReducedMotionHook {
  prefersReducedMotion: boolean;
  shouldAnimate: boolean;
}

/**
 * Hook for reduced motion detection
 * @returns Reduced motion state and utilities
 */
export function useReducedMotion(): ReducedMotionHook {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(
    typeof window !== 'undefined' ? 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches : 
      false
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
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
