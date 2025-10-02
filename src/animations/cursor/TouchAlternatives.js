'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDeviceCapabilities, useTouchInteractions } from './MobileDetection';

/**
 * TouchAlternatives Component
 * 
 * Provides touch-friendly alternatives to cursor effects for mobile devices.
 * Includes touch ripples, haptic feedback, and visual interaction states.
 */
const TouchAlternatives = ({ 
  children,
  enableRipples = true,
  enableHaptics = true,
  enableVisualFeedback = true,
  rippleColor = '#384bff',
  rippleDuration = 600,
  className = ''
}) => {
  const deviceInfo = useDeviceCapabilities();
  const touchState = useTouchInteractions();
  const [ripples, setRipples] = useState([]);
  const [activeElements, setActiveElements] = useState(new Set());
  
  // Create ripple effect at touch position
  const createRipple = useCallback((x, y, element) => {
    if (!enableRipples) return;
    
    const rippleId = Date.now() + Math.random();
    const elementRect = element.getBoundingClientRect();
    
    // Calculate ripple size based on element size
    const elementSize = Math.max(elementRect.width, elementRect.height);
    const rippleSize = elementSize * 1.5;
    
    const newRipple = {
      id: rippleId,
      x: x - elementRect.left,
      y: y - elementRect.top,
      size: rippleSize,
      element: element,
      elementRect: elementRect
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== rippleId));
    }, rippleDuration);
  }, [enableRipples, rippleDuration]);
  
  // Trigger haptic feedback
  const triggerHaptic = useCallback((type = 'light') => {
    if (!enableHaptics || !navigator.vibrate) return;
    
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30],
      success: [10, 50, 10],
      error: [50, 100, 50]
    };
    
    navigator.vibrate(patterns[type] || patterns.light);
  }, [enableHaptics]);
  
  // Handle touch interactions on interactive elements
  const handleTouchStart = useCallback((e) => {
    if (!deviceInfo.isTouchDevice) return;
    
    const touch = e.touches[0];
    const element = e.target.closest('button, a, [data-interactive], [data-magnetic]');
    
    if (element) {
      // Add active state
      setActiveElements(prev => new Set([...prev, element]));
      
      // Create ripple effect
      createRipple(touch.clientX, touch.clientY, element);
      
      // Trigger haptic feedback
      if (element.tagName === 'BUTTON') {
        triggerHaptic('medium');
      } else {
        triggerHaptic('light');
      }
      
      // Add visual feedback class
      if (enableVisualFeedback) {
        element.classList.add('touch-active');
      }
    }
  }, [deviceInfo.isTouchDevice, createRipple, triggerHaptic, enableVisualFeedback]);
  
  // Handle touch end
  const handleTouchEnd = useCallback((e) => {
    if (!deviceInfo.isTouchDevice) return;
    
    const element = e.target.closest('button, a, [data-interactive], [data-magnetic]');
    
    if (element) {
      // Remove active state
      setActiveElements(prev => {
        const newSet = new Set(prev);
        newSet.delete(element);
        return newSet;
      });
      
      // Remove visual feedback class
      if (enableVisualFeedback) {
        setTimeout(() => {
          element.classList.remove('touch-active');
        }, 150);
      }
    }
  }, [deviceInfo.isTouchDevice, enableVisualFeedback]);
  
  // Set up touch event listeners
  useEffect(() => {
    if (!deviceInfo.isTouchDevice) return;
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [deviceInfo.isTouchDevice, handleTouchStart, handleTouchEnd]);
  
  // Add touch-friendly CSS classes
  useEffect(() => {
    if (deviceInfo.isTouchDevice) {
      document.body.classList.add('touch-device');
      
      // Add touch-friendly styles
      const style = document.createElement('style');
      style.textContent = `
        .touch-device button,
        .touch-device a,
        .touch-device [data-interactive],
        .touch-device [data-magnetic] {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          user-select: none;
          -webkit-user-select: none;
        }
        
        .touch-active {
          transform: scale(0.95) !important;
          transition: transform 0.1s ease-out !important;
        }
        
        .touch-device .magnetic-cursor,
        .touch-device .cursor-trail,
        .touch-device .cursor-with-trail {
          display: none !important;
        }
        
        .touch-device button:active,
        .touch-device a:active,
        .touch-device [data-interactive]:active {
          background-color: rgba(56, 75, 255, 0.1);
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.body.classList.remove('touch-device');
        document.head.removeChild(style);
      };
    }
  }, [deviceInfo.isTouchDevice]);
  
  if (!deviceInfo.isTouchDevice) {
    return children;
  }
  
  return (
    <div className={`touch-alternatives ${className}`}>
      {children}
      
      {/* Touch Ripples */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="touch-ripple"
            style={{
              position: 'absolute',
              left: ripple.elementRect.left + ripple.x,
              top: ripple.elementRect.top + ripple.y,
              width: ripple.size,
              height: ripple.size,
              borderRadius: '50%',
              backgroundColor: rippleColor,
              pointerEvents: 'none',
              zIndex: 1000,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ 
              scale: 0,
              opacity: 0.6 
            }}
            animate={{ 
              scale: 1,
              opacity: 0 
            }}
            exit={{ 
              opacity: 0 
            }}
            transition={{ 
              duration: rippleDuration / 1000,
              ease: 'easeOut'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

/**
 * TouchFeedback Component
 * 
 * Provides visual feedback for touch interactions on specific elements.
 */
export const TouchFeedback = ({ 
  children,
  feedbackType = 'scale', // 'scale', 'glow', 'bounce', 'ripple'
  intensity = 'medium', // 'light', 'medium', 'heavy'
  color = '#384bff',
  disabled = false
}) => {
  const deviceInfo = useDeviceCapabilities();
  const [isPressed, setIsPressed] = useState(false);
  
  if (!deviceInfo.isTouchDevice || disabled) {
    return children;
  }
  
  const getFeedbackAnimation = () => {
    const intensityMap = {
      light: { scale: 0.98, glow: 0.1, bounce: 1.02 },
      medium: { scale: 0.95, glow: 0.2, bounce: 1.05 },
      heavy: { scale: 0.9, glow: 0.3, bounce: 1.1 }
    };
    
    const values = intensityMap[intensity];
    
    switch (feedbackType) {
      case 'scale':
        return {
          scale: isPressed ? values.scale : 1,
          transition: { duration: 0.1 }
        };
      case 'glow':
        return {
          boxShadow: isPressed 
            ? `0 0 20px ${color}${Math.floor(values.glow * 255).toString(16)}`
            : 'none',
          transition: { duration: 0.2 }
        };
      case 'bounce':
        return {
          scale: isPressed ? values.bounce : 1,
          transition: { type: 'spring', stiffness: 400, damping: 10 }
        };
      default:
        return {};
    }
  };
  
  return (
    <motion.div
      className="touch-feedback"
      animate={getFeedbackAnimation()}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onTouchCancel={() => setIsPressed(false)}
    >
      {children}
    </motion.div>
  );
};

/**
 * AdaptiveCursor Component
 * 
 * Automatically switches between cursor effects and touch alternatives
 * based on device capabilities.
 */
export const AdaptiveCursor = ({ 
  children,
  cursorComponent: CursorComponent,
  cursorProps = {},
  touchAlternativeProps = {},
  forceMode = null // 'cursor', 'touch', or null for auto-detect
}) => {
  const deviceInfo = useDeviceCapabilities();
  
  const shouldUseCursor = forceMode === 'cursor' || 
    (forceMode !== 'touch' && !deviceInfo.shouldDisableCursor);
  
  if (shouldUseCursor && CursorComponent) {
    return (
      <>
        <CursorComponent {...cursorProps} />
        {children}
      </>
    );
  }
  
  return (
    <TouchAlternatives {...touchAlternativeProps}>
      {children}
    </TouchAlternatives>
  );
};

export default TouchAlternatives;