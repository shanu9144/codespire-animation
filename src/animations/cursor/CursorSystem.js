'use client';

import React, { useEffect, useState } from 'react';
import { useDeviceCapabilities } from './MobileDetection';
import MagneticCursorAdvanced from './MagneticCursorAdvanced';
import CursorWithTrail from './CursorWithTrail';
import InvisibleMagneticCursor from './InvisibleMagneticCursor';
import TouchAlternatives, { AdaptiveCursor } from './TouchAlternatives';

/**
 * CursorSystem Component
 * 
 * Complete cursor system that automatically adapts to device capabilities.
 * Provides magnetic cursor effects on desktop and touch alternatives on mobile.
 */
const CursorSystem = ({ 
  children,
  
  // Cursor configuration
  cursorType = 'invisible-magnetic', // 'invisible-magnetic', 'magnetic', 'trail', 'magnetic-with-trail', 'simple'
  
  // Magnetic cursor settings
  magneticConfig = {
    strength: 0.4,
    radius: 80,
    ease: 0.15
  },
  
  // Trail settings
  trailConfig = {
    maxParticles: 15,
    particleLife: 800,
    spawnRate: 60,
    particleSize: 3,
    colors: ['#384bff', '#00d4ff'],
    fadeOut: true
  },
  
  // Touch alternatives settings
  touchConfig = {
    enableRipples: true,
    enableHaptics: true,
    enableVisualFeedback: true,
    rippleColor: '#384bff',
    rippleDuration: 600
  },
  
  // Performance settings
  performanceConfig = {
    adaptiveQuality: true,
    respectReducedMotion: true,
    disableOnLowEnd: true
  },
  
  // Manual overrides
  forceMode = null, // 'cursor', 'touch', 'disabled', or null for auto-detect
  disabled = false,
  
  className = ''
}) => {
  const deviceInfo = useDeviceCapabilities();
  const [effectiveMode, setEffectiveMode] = useState('auto');
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Detect reduced motion preference
  useEffect(() => {
    if (!performanceConfig.respectReducedMotion) return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setReducedMotion(e.matches);
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }
    
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [performanceConfig.respectReducedMotion]);
  
  // Determine effective mode based on device capabilities and settings
  useEffect(() => {
    if (disabled || forceMode === 'disabled') {
      setEffectiveMode('disabled');
      return;
    }
    
    if (forceMode) {
      setEffectiveMode(forceMode);
      return;
    }
    
    // Disable on reduced motion preference
    if (reducedMotion && performanceConfig.respectReducedMotion) {
      setEffectiveMode('disabled');
      return;
    }
    
    // Disable on low-end devices if configured
    if (performanceConfig.disableOnLowEnd && !deviceInfo.hasHover) {
      setEffectiveMode('touch');
      return;
    }
    
    // Auto-detect based on device capabilities
    if (deviceInfo.shouldDisableCursor) {
      setEffectiveMode('touch');
    } else {
      setEffectiveMode('cursor');
    }
  }, [
    disabled,
    forceMode,
    reducedMotion,
    deviceInfo,
    performanceConfig
  ]);
  
  // Render appropriate cursor system based on effective mode
  const renderCursorSystem = () => {
    switch (effectiveMode) {
      case 'disabled':
        return children;
        
      case 'touch':
        return (
          <TouchAlternatives {...touchConfig} className={className}>
            {children}
          </TouchAlternatives>
        );
        
      case 'cursor':
        return (
          <>
            {renderCursorComponent()}
            {children}
          </>
        );
        
      default:
        return children;
    }
  };
  
  // Render the appropriate cursor component
  const renderCursorComponent = () => {
    const baseProps = {
      disabled: effectiveMode !== 'cursor',
      className
    };
    
    switch (cursorType) {
      case 'invisible-magnetic':
        return (
          <InvisibleMagneticCursor
            {...baseProps}
            magneticConfig={magneticConfig}
          />
        );
        
      case 'magnetic':
        return (
          <MagneticCursorAdvanced
            {...baseProps}
            magneticConfig={magneticConfig}
            visualFeedback={true}
          />
        );
        
      case 'magnetic-with-trail':
        return (
          <CursorWithTrail
            {...baseProps}
            magneticConfig={magneticConfig}
            trailConfig={trailConfig}
            showTrail={true}
            showMagnetic={true}
          />
        );
        
      case 'trail':
        return (
          <CursorWithTrail
            {...baseProps}
            trailConfig={trailConfig}
            showTrail={true}
            showMagnetic={false}
          />
        );
        
      case 'simple':
      default:
        return (
          <MagneticCursorAdvanced
            {...baseProps}
            magneticConfig={{
              ...magneticConfig,
              strength: magneticConfig.strength * 0.5
            }}
            visualFeedback={false}
          />
        );
    }
  };
  
  // Add global CSS for cursor system
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Cursor System Global Styles */
      .cursor-system-container {
        position: relative;
      }
      
      /* Keep normal cursor on all devices */
      .touch-device * {
        cursor: auto;
      }
      
      /* Reduced motion styles */
      @media (prefers-reduced-motion: reduce) {
        .cursor-system-container .magnetic-cursor,
        .cursor-system-container .cursor-trail,
        .cursor-system-container .cursor-with-trail {
          display: none !important;
        }
      }
      
      /* Performance optimizations */
      .magnetic-cursor,
      .cursor-trail-particle,
      .cursor-with-trail {
        will-change: transform, opacity;
        backface-visibility: hidden;
        perspective: 1000px;
      }
      
      /* Touch feedback styles */
      .touch-active {
        transform: scale(0.95);
        transition: transform 0.1s ease-out;
      }
      
      /* Magnetic element indicators (development only) */
      ${process.env.NODE_ENV === 'development' ? `
        [data-magnetic] {
          position: relative;
        }
        
        [data-magnetic]::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border: 1px dashed rgba(56, 75, 255, 0.3);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        [data-magnetic]:hover::after {
          opacity: 1;
        }
      ` : ''}
    `;
    
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);
  
  return (
    <div className={`cursor-system-container ${className}`}>
      {renderCursorSystem()}
    </div>
  );
};

/**
 * Hook for programmatically controlling cursor system
 */
export const useCursorSystem = () => {
  const deviceInfo = useDeviceCapabilities();
  
  const addMagneticElement = (element, options = {}) => {
    if (!element || deviceInfo.shouldDisableCursor) return;
    
    const {
      strength = 0.3,
      radius = 100
    } = options;
    
    element.setAttribute('data-magnetic', 'true');
    element.setAttribute('data-magnetic-strength', strength.toString());
    element.setAttribute('data-magnetic-radius', radius.toString());
  };
  
  const removeMagneticElement = (element) => {
    if (!element) return;
    
    element.removeAttribute('data-magnetic');
    element.removeAttribute('data-magnetic-strength');
    element.removeAttribute('data-magnetic-radius');
  };
  
  const addInteractiveElement = (element) => {
    if (!element) return;
    
    element.setAttribute('data-interactive', 'true');
    
    if (deviceInfo.isTouchDevice) {
      element.style.touchAction = 'manipulation';
      element.style.webkitTapHighlightColor = 'transparent';
    }
  };
  
  return {
    deviceInfo,
    addMagneticElement,
    removeMagneticElement,
    addInteractiveElement,
    shouldUseCursor: !deviceInfo.shouldDisableCursor,
    shouldUseTouch: deviceInfo.shouldDisableCursor
  };
};

export default CursorSystem;