'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MagneticCursor Component
 * 
 * Creates a custom cursor that replaces the default browser cursor with smooth
 * movement, easing, and different states for various element types.
 * 
 * Features:
 * - Custom cursor rendering with smooth interpolation
 * - Different cursor states (default, button, link, text)
 * - Magnetic attraction to interactive elements
 * - Smooth easing and spring animations
 */
const MagneticCursor = ({ 
  children,
  cursorSize = 20,
  springConfig = { damping: 25, stiffness: 700, mass: 0.5 },
  magneticElements = ['button', 'a', '[data-magnetic]'],
  disabled = false
}) => {
  const cursorRef = useRef(null);
  const [cursorState, setCursorState] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  
  // Motion values for smooth cursor movement
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring animations for smooth movement
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  
  // Scale for different cursor states
  const cursorScale = useMotionValue(1);
  const springScale = useSpring(cursorScale, springConfig);

  // Update cursor position
  const updateCursorPosition = useCallback((e) => {
    if (disabled) return;
    
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    
    if (!isVisible) {
      setIsVisible(true);
    }
  }, [cursorX, cursorY, disabled, isVisible]);

  // Handle cursor state changes based on element type
  const handleElementHover = useCallback((element, isEntering) => {
    if (disabled) return;
    
    if (isEntering) {
      // Determine cursor state based on element type
      if (element.tagName === 'BUTTON' || element.type === 'button') {
        setCursorState('button');
        cursorScale.set(1.5);
      } else if (element.tagName === 'A') {
        setCursorState('link');
        cursorScale.set(1.2);
      } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        setCursorState('text');
        cursorScale.set(0.8);
      } else if (element.hasAttribute('data-magnetic')) {
        setCursorState('magnetic');
        cursorScale.set(1.3);
      } else {
        setCursorState('hover');
        cursorScale.set(1.1);
      }
    } else {
      setCursorState('default');
      cursorScale.set(1);
    }
  }, [cursorScale, disabled]);

  // Set up event listeners for interactive elements
  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e) => updateCursorPosition(e);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Add global mouse listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      magneticElements.join(', ')
    );

    interactiveElements.forEach(element => {
      const handleMouseEnter = () => handleElementHover(element, true);
      const handleMouseLeave = () => handleElementHover(element, false);
      
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      
      // Store cleanup functions
      element._cursorCleanup = () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      // Cleanup interactive element listeners
      interactiveElements.forEach(element => {
        if (element._cursorCleanup) {
          element._cursorCleanup();
          delete element._cursorCleanup;
        }
      });
    };
  }, [updateCursorPosition, handleElementHover, magneticElements, disabled]);

  // Keep default cursor visible
  useEffect(() => {
    // Don't hide the default cursor - let it remain visible
    return () => {
      // Ensure cursor is restored on cleanup
      document.body.style.cursor = '';
    };
  }, [disabled]);

  if (disabled) {
    return children;
  }

  return (
    <>
      {children}
      
      {/* Custom Cursor - Hidden but still tracks for magnetic effects */}
      <motion.div
        ref={cursorRef}
        className="magnetic-cursor"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: cursorSize,
          height: cursorSize,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          x: springX,
          y: springY,
          scale: springScale,
          translateX: '-50%',
          translateY: '-50%',
          opacity: 0, // Hide the custom cursor
          visibility: 'hidden' // Ensure it's completely hidden
        }}
      />
      
      {/* Cursor Dot - Hidden */}
      <motion.div
        className="magnetic-cursor-dot"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: cursorSize * 0.3,
          height: cursorSize * 0.3,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: 0, // Hide the cursor dot
          visibility: 'hidden' // Ensure it's completely hidden
        }}
      />
    </>
  );
};

// Helper function to get cursor color based on state
const getCursorColor = (state) => {
  switch (state) {
    case 'button':
      return '#384bff';
    case 'link':
      return '#00d4ff';
    case 'text':
      return '#ff6b6b';
    case 'magnetic':
      return '#ff9f43';
    case 'hover':
      return '#6c5ce7';
    default:
      return 'rgba(255, 255, 255, 0.8)';
  }
};

export default MagneticCursor;