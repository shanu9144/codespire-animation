/**
 * Performance monitoring utilities for animations
 */

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined";

// Performance monitoring class
class AnimationPerformanceMonitor {
  constructor() {
    this.frameCount = 0;
    this.lastTime = isBrowser ? performance.now() : 0;
    this.fps = 60;
    this.isLowEndDevice = this.detectLowEndDevice();
    this.performanceMetrics = {
      averageFPS: 60,
      frameDrops: 0,
      animationDuration: 0,
    };
    this._listeners = new Set();
    this._lastWarn = 0;
    this._lastTier = 'high'; // 'high' >= 50, 'medium' 30-49, 'low' < 30
    this._monitoring = false;
  }

  // Detect low-end devices based on hardware capabilities
  detectLowEndDevice() {
    // Return false during SSR
    if (!isBrowser) {
      return false;
    }

    // Check for reduced motion preference first
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return true;
    }

    // Check hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 1;
    if (cores <= 2) {
      return true;
    }

    // Check memory (if available)
    if (navigator.deviceMemory && navigator.deviceMemory <= 2) {
      return true;
    }

    // Check connection speed
    if (navigator.connection) {
      const connection = navigator.connection;
      if (
        connection.effectiveType === "slow-2g" ||
        connection.effectiveType === "2g"
      ) {
        return true;
      }
    }

    // Check for mobile devices with potentially lower performance
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent
      );

    if (isMobile) {
      // Additional mobile-specific checks could be added here
      return false; // For now, don't assume all mobile devices are low-end
    }

    return false;
  }

  // Check if user prefers reduced motion
  shouldReduceAnimations() {
    // Return false during SSR
    if (!isBrowser) {
      return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  // Start monitoring frame rate
  startMonitoring() {
    // Don't start monitoring during SSR
    if (!isBrowser) {
      return;
    }

    if (this._monitoring) return; // prevent multiple RAF loops
    this._monitoring = true;

    let frameCount = 0;
    let startTime = performance.now();

    const measureFPS = () => {
      // Skip measuring when page is hidden to avoid false low FPS
      if (document.visibilityState === 'hidden') {
        this.fps = 60;
        this.performanceMetrics.averageFPS = 60;
        requestAnimationFrame(measureFPS);
        return;
      }
      frameCount++;
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;

      if (elapsed >= 1000) {
        // Measure every second
        this.fps = Math.round((frameCount * 1000) / elapsed);
        this.performanceMetrics.averageFPS = this.fps;

        // Tiered state and (throttled) logging without console warnings
        const tier = this.fps < 30 ? 'low' : this.fps < 50 ? 'medium' : 'high';
        if (tier !== this._lastTier && tier !== 'high') {
          this.performanceMetrics.frameDrops++;
          // Log as debug (not warning) and throttle to 15s
          if (currentTime - this._lastWarn > 15000) {
            this._lastWarn = currentTime;
            console.debug(
              `Animation performance: tier=${tier}, fps=${this.fps}`
            );
          }
        }
        this._lastTier = tier;

        // Notify listeners on each FPS computation
        this._notifyListeners();

        frameCount = 0;
        startTime = currentTime;
      }

      if (!this.shouldReduceAnimations()) {
        requestAnimationFrame(measureFPS);
      }
    };

    requestAnimationFrame(measureFPS);
  }

  _notifyListeners() {
    const snapshot = this.getPerformanceConfig();
    this._listeners.forEach((cb) => {
      try { cb(snapshot); } catch {}
    });
  }

  subscribe(listener) {
    this._listeners.add(listener);
    // Push initial config
    try { listener(this.getPerformanceConfig()); } catch {}
    return () => this._listeners.delete(listener);
  }

  // Get performance recommendations
  getPerformanceConfig() {
    const config = {
      enableComplexAnimations: true,
      enableParallax: true,
      enableFloatingElements: true,
      animationDuration: 1,
      staggerDelay: 0.1,
      enableBlur: true,
      enableGradients: true,
    };

    if (this.shouldReduceAnimations()) {
      return {
        ...config,
        enableComplexAnimations: false,
        enableParallax: false,
        enableFloatingElements: false,
        animationDuration: 0,
        staggerDelay: 0,
        enableBlur: false,
        enableGradients: true, // Keep gradients as they're less performance-intensive
      };
    }

    if (this.isLowEndDevice) {
      return {
        ...config,
        enableComplexAnimations: false,
        enableParallax: false,
        enableFloatingElements: false,
        animationDuration: 0.5, // Shorter animations
        staggerDelay: 0.05, // Reduced stagger
        enableBlur: false, // Blur is expensive
        enableGradients: true,
      };
    }

    // Check real-time performance
    if (this.fps < 50) {
      return {
        ...config,
        enableComplexAnimations: false,
        enableFloatingElements: false,
        enableParallax: false,
        animationDuration: 0.25,
        staggerDelay: 0.04,
        enableBlur: false,
      };
    }

    // Emergency clamp for severe frame drops
    if (this.fps < 35) {
      return {
        ...config,
        enableComplexAnimations: false,
        enableParallax: false,
        enableFloatingElements: false,
        animationDuration: 0,
        staggerDelay: 0,
        enableBlur: false,
      };
    }

    return config;
  }

  // Log performance metrics
  logMetrics() {
    if (!isBrowser) {
      console.log("Performance monitoring not available during SSR");
      return;
    }

    console.log("Animation Performance Metrics:", {
      isLowEndDevice: this.isLowEndDevice,
      shouldReduceAnimations: this.shouldReduceAnimations(),
      currentFPS: this.fps,
      averageFPS: this.performanceMetrics.averageFPS,
      frameDrops: this.performanceMetrics.frameDrops,
      deviceMemory: navigator.deviceMemory || "unknown",
      hardwareConcurrency: navigator.hardwareConcurrency || "unknown",
      connection: navigator.connection?.effectiveType || "unknown",
    });
  }
}

// Create singleton instance safely
let performanceMonitor;

const getPerformanceMonitor = () => {
  if (!performanceMonitor) {
    performanceMonitor = new AnimationPerformanceMonitor();
  }
  return performanceMonitor;
};

// Export the getter function instead of the instance
export default getPerformanceMonitor;

// React hook for using performance monitoring
import { useState, useEffect } from "react";

export const useAnimationPerformance = () => {
  const monitor = getPerformanceMonitor();
  const [config, setConfig] = useState(() => monitor.getPerformanceConfig());

  useEffect(() => {
    // Only run in browser environment
    if (!isBrowser) {
      return;
    }

    monitor.startMonitoring();

    // Subscribe to real-time performance updates
    const unsubscribe = monitor.subscribe((next) => {
      setConfig(next);
      try {
        const reduce = !next.enableComplexAnimations;
        document.documentElement.classList.toggle('reduced-animations', reduce);
      } catch {}
    });

    // Listen for reduced motion preference changes
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => {
      setConfig(monitor.getPerformanceConfig());
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      unsubscribe();
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [monitor]); // Include monitor dependency

  return {
    config,
    isLowEndDevice: monitor.isLowEndDevice,
    shouldReduceAnimations: monitor.shouldReduceAnimations(),
    logMetrics: () => monitor.logMetrics(),
  };
};

