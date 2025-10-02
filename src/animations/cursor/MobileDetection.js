'use client';

import { useState, useEffect } from 'react';

/**
 * Mobile Detection Utilities
 * 
 * Provides comprehensive device detection for touch devices,
 * mobile browsers, and hover capabilities to determine when
 * cursor effects should be disabled.
 */

/**
 * Hook for detecting device capabilities and touch support
 */
export const useDeviceCapabilities = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    isTouchDevice: false,
    isMobile: false,
    isTablet: false,
    hasHover: true,
    hasPointer: true,
    screenSize: 'desktop',
    orientation: 'landscape',
    shouldDisableCursor: false
  });

  useEffect(() => {
    const detectDevice = () => {
      // Touch capability detection
      const touchSupport = 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        navigator.msMaxTouchPoints > 0;

      // Mobile device detection via user agent
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileUA = mobileRegex.test(navigator.userAgent);

      // Tablet detection
      const tabletRegex = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)|Android(?=.*(?:\bTablet\b|\bTab\b))/i;
      const isTabletUA = tabletRegex.test(navigator.userAgent);

      // Hover capability detection
      const hasHover = window.matchMedia('(hover: hover)').matches;
      
      // Pointer capability detection
      const hasPointer = window.matchMedia('(pointer: fine)').matches;

      // Screen size detection
      const screenWidth = window.innerWidth;
      let screenSize = 'desktop';
      if (screenWidth < 768) {
        screenSize = 'mobile';
      } else if (screenWidth < 1024) {
        screenSize = 'tablet';
      }

      // Orientation detection
      const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';

      // Determine if cursor should be disabled
      const shouldDisableCursor = 
        touchSupport || 
        isMobileUA || 
        !hasHover || 
        !hasPointer || 
        screenSize === 'mobile';

      setDeviceInfo({
        isTouchDevice: touchSupport,
        isMobile: isMobileUA,
        isTablet: isTabletUA,
        hasHover,
        hasPointer,
        screenSize,
        orientation,
        shouldDisableCursor
      });
    };

    // Initial detection
    detectDevice();

    // Listen for orientation and resize changes
    const handleResize = () => detectDevice();
    const handleOrientationChange = () => {
      // Delay to ensure dimensions are updated
      setTimeout(detectDevice, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Listen for media query changes
    const hoverQuery = window.matchMedia('(hover: hover)');
    const pointerQuery = window.matchMedia('(pointer: fine)');
    
    const handleHoverChange = () => detectDevice();
    const handlePointerChange = () => detectDevice();

    if (hoverQuery.addEventListener) {
      hoverQuery.addEventListener('change', handleHoverChange);
      pointerQuery.addEventListener('change', handlePointerChange);
    } else {
      // Fallback for older browsers
      hoverQuery.addListener(handleHoverChange);
      pointerQuery.addListener(handlePointerChange);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      
      if (hoverQuery.removeEventListener) {
        hoverQuery.removeEventListener('change', handleHoverChange);
        pointerQuery.removeEventListener('change', handlePointerChange);
      } else {
        hoverQuery.removeListener(handleHoverChange);
        pointerQuery.removeListener(handlePointerChange);
      }
    };
  }, []);

  return deviceInfo;
};

/**
 * Hook for touch-friendly interaction states
 */
export const useTouchInteractions = () => {
  const [touchState, setTouchState] = useState({
    isPressed: false,
    touchPosition: { x: 0, y: 0 },
    lastTouchTime: 0,
    touchDuration: 0
  });

  useEffect(() => {
    let touchStartTime = 0;

    const handleTouchStart = (e) => {
      touchStartTime = Date.now();
      const touch = e.touches[0];
      
      setTouchState(prev => ({
        ...prev,
        isPressed: true,
        touchPosition: { x: touch.clientX, y: touch.clientY },
        lastTouchTime: touchStartTime
      }));
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      
      setTouchState(prev => ({
        ...prev,
        touchPosition: { x: touch.clientX, y: touch.clientY }
      }));
    };

    const handleTouchEnd = () => {
      const touchEndTime = Date.now();
      const duration = touchEndTime - touchStartTime;
      
      setTouchState(prev => ({
        ...prev,
        isPressed: false,
        touchDuration: duration
      }));
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return touchState;
};

/**
 * Utility functions for device detection
 */
export const deviceUtils = {
  // Check if device is iOS
  isIOS: () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  },

  // Check if device is Android
  isAndroid: () => {
    return /Android/.test(navigator.userAgent);
  },

  // Check if browser is Safari
  isSafari: () => {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  },

  // Check if browser is Chrome on mobile
  isChromeMobile: () => {
    return /Chrome/.test(navigator.userAgent) && /Mobile/.test(navigator.userAgent);
  },

  // Get device pixel ratio
  getPixelRatio: () => {
    return window.devicePixelRatio || 1;
  },

  // Check if device supports WebGL
  supportsWebGL: () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      return false;
    }
  },

  // Check if device has sufficient memory for animations
  hasSufficientMemory: () => {
    // Check for navigator.deviceMemory (Chrome only)
    if ('deviceMemory' in navigator) {
      return navigator.deviceMemory >= 4; // 4GB or more
    }
    
    // Fallback: assume desktop has sufficient memory
    return !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  },

  // Get connection speed if available
  getConnectionSpeed: () => {
    if ('connection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      };
    }
    return null;
  }
};

/**
 * Performance-based feature detection
 */
export const performanceUtils = {
  // Check if device can handle complex animations
  canHandleComplexAnimations: () => {
    const deviceInfo = {
      memory: deviceUtils.hasSufficientMemory(),
      webgl: deviceUtils.supportsWebGL(),
      pixelRatio: deviceUtils.getPixelRatio(),
      connection: deviceUtils.getConnectionSpeed()
    };

    // Disable complex animations on low-end devices
    if (!deviceInfo.memory || !deviceInfo.webgl) {
      return false;
    }

    // Disable on slow connections with data saver
    if (deviceInfo.connection?.saveData) {
      return false;
    }

    // Disable on very high pixel ratio devices (performance impact)
    if (deviceInfo.pixelRatio > 2.5) {
      return false;
    }

    return true;
  },

  // Get recommended animation quality level
  getRecommendedQuality: () => {
    if (!performanceUtils.canHandleComplexAnimations()) {
      return 'low';
    }

    const connection = deviceUtils.getConnectionSpeed();
    if (connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g') {
      return 'low';
    }

    if (connection?.effectiveType === '3g') {
      return 'medium';
    }

    return 'high';
  }
};

export default {
  useDeviceCapabilities,
  useTouchInteractions,
  deviceUtils,
  performanceUtils
};