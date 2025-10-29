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
    this.isMonitoring = false; // Track if monitoring is active
    this.monitoringFrameId = null; // Store RAF id to prevent duplicates
    this.performanceMetrics = {
      averageFPS: 60,
      frameDrops: 0,
      animationDuration: 0,
    };
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

  // Start monitoring frame rate (idempotent - only starts once)
  startMonitoring() {
    // Don't start monitoring during SSR
    if (!isBrowser) {
      return;
    }

    // Prevent duplicate monitoring loops
    if (this.isMonitoring) {
      return;
    }

    // Disable monitoring in development - FPS monitoring itself causes performance overhead
    // Only enable in production for low-end devices if needed
    if (process.env.NODE_ENV === 'development') {
      return; // Skip monitoring to reduce overhead
    }
    
    if (process.env.NODE_ENV === 'production' && !this.isLowEndDevice) {
      return; // Skip monitoring in production for better performance
    }

    this.isMonitoring = true;
    let frameCount = 0;
    let startTime = performance.now();
    let lastWarningTime = 0;
    const warningCooldown = 5000; // Only warn every 5 seconds

    const measureFPS = () => {
      // Check if monitoring was stopped
      if (!this.isMonitoring) {
        this.monitoringFrameId = null;
        return;
      }

      frameCount++;
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;

      if (elapsed >= 2000) {
        // Measure every 2 seconds instead of 1 second to reduce overhead
        this.fps = Math.round((frameCount * 1000) / elapsed);
        this.performanceMetrics.averageFPS = this.fps;

        // Detect frame drops (FPS below 30) with throttling
        if (this.fps < 30) {
          this.performanceMetrics.frameDrops++;
          
          // Only warn if enough time has passed since last warning
          const timeSinceLastWarning = currentTime - lastWarningTime;
          if (timeSinceLastWarning >= warningCooldown) {
            console.warn(
              `Animation performance warning: FPS dropped to ${this.fps}`
            );
            lastWarningTime = currentTime;
          }
        }

        frameCount = 0;
        startTime = currentTime;
      }

      // Only continue monitoring if not reducing animations
      if (!this.shouldReduceAnimations() && this.isMonitoring) {
        this.monitoringFrameId = requestAnimationFrame(measureFPS);
      } else {
        this.isMonitoring = false;
        this.monitoringFrameId = null;
      }
    };

    this.monitoringFrameId = requestAnimationFrame(measureFPS);
  }

  // Stop monitoring frame rate
  stopMonitoring() {
    this.isMonitoring = false;
    if (this.monitoringFrameId !== null) {
      cancelAnimationFrame(this.monitoringFrameId);
      this.monitoringFrameId = null;
    }
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
    if (this.fps < 45) {
      return {
        ...config,
        enableComplexAnimations: false,
        enableFloatingElements: false,
        animationDuration: 0.3,
        staggerDelay: 0.05,
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

    // Update config based on performance changes
    const updateConfig = () => {
      setConfig(monitor.getPerformanceConfig());
    };

    // Listen for performance changes
    const interval = setInterval(updateConfig, 2000); // Check every 2 seconds

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
      clearInterval(interval);
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
