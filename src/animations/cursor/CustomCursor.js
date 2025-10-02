'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CustomCursor Component
 * 
 * A more advanced custom cursor with different visual states and animations
 * for various element types and interactions.
 */
const CustomCursor = ({ 
  size = 40,
  dotSize = 8,
  springConfig = { damping: 25, stiffness: 700, mass: 0.5 },
  disabled = false,
  className = ''
}) => {
  const [cursorState, setCursorState] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);
  
  // Motion values for cursor position
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring animations
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  
  // Scale and rotation for different states
  const cursorScale = useMotionValue(1);
  const cursorRotation = useMotionValue(0);
  const springScale = useSpring(cursorScale, springConfig);
  const springRotation = useSpring(cursorRotation, springConfig);

  // Update cursor position
  const updateCursorPosition = (e) => {
    if (disabled) return;
    
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    
    if (!isVisible) {
      setIsVisible(true);
    }
  };

  // Handle different cursor states
  const handleCursorState = (element, isEntering) => {
    if (disabled) return;
    
    if (isEntering) {
      setHoveredElement(element);
      
      // Determine cursor state and animations
      if (element.tagName === 'BUTTON' || element.classList.contains('btn')) {
        setCursorState('button');
        cursorScale.set(1.5);
        cursorRotation.set(0);
      } else if (element.tagName === 'A') {
        setCursorState('link');
        cursorScale.set(1.2);
        cursorRotation.set(45);
      } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        setCursorState('text');
        cursorScale.set(0.8);
        cursorRotation.set(0);
      } else if (element.classList.contains('card') || element.hasAttribute('data-hover')) {
        setCursorState('card');
        cursorScale.set(1.3);
        cursorRotation.set(0);
      } else if (element.hasAttribute('data-magnetic')) {
        setCursorState('magnetic');
        cursorScale.set(1.4);
        cursorRotation.set(0);
      } else {
        setCursorState('hover');
        cursorScale.set(1.1);
        cursorRotation.set(0);
      }
    } else {
      setHoveredElement(null);
      setCursorState('default');
      cursorScale.set(1);
      cursorRotation.set(0);
    }
  };

  // Set up event listeners
  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = updateCursorPosition;
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Global mouse events
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Interactive elements
    const interactiveSelectors = [
      'button',
      'a',
      'input',
      'textarea',
      '.btn',
      '.card',
      '[data-hover]',
      '[data-magnetic]'
    ];
    
    const elements = document.querySelectorAll(interactiveSelectors.join(', '));
    
    elements.forEach(element => {
      const handleMouseEnter = () => handleCursorState(element, true);
      const handleMouseLeave = () => handleCursorState(element, false);
      
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      
      // Store cleanup
      element._customCursorCleanup = () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      elements.forEach(element => {
        if (element._customCursorCleanup) {
          element._customCursorCleanup();
          delete element._customCursorCleanup;
        }
      });
    };
  }, [disabled]);

  // Keep default cursor visible
  useEffect(() => {
    // Don't hide the default cursor - let it remain visible
    return () => {
      // Ensure cursor is restored on cleanup
      document.body.style.cursor = '';
    };
  }, [disabled]);

  if (disabled) return null;

  return (
    <>
      {/* Outer cursor ring */}
      <motion.div
        className={`custom-cursor-ring ${className}`}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: size,
          height: size,
          border: `2px solid ${getCursorBorderColor(cursorState)}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          x: springX,
          y: springY,
          scale: springScale,
          rotate: springRotation,
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isVisible ? getCursorOpacity(cursorState) : 0,
          backgroundColor: getCursorBackgroundColor(cursorState),
        }}
        transition={{ duration: 0.15 }}
      />
      
      {/* Inner cursor dot */}
      <motion.div
        className={`custom-cursor-dot ${className}`}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: dotSize,
          height: dotSize,
          backgroundColor: getCursorDotColor(cursorState),
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isVisible && cursorState !== 'text' ? 1 : 0,
          scale: getDotScale(cursorState),
        }}
        transition={{ duration: 0.15 }}
      />
      
      {/* Text cursor (I-beam) */}
      {cursorState === 'text' && (
        <motion.div
          className="custom-cursor-text"
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: 2,
            height: 20,
            backgroundColor: '#384bff',
            pointerEvents: 'none',
            zIndex: 10000,
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.15 }}
        />
      )}
    </>
  );
};

// Helper functions for cursor styling
const getCursorBorderColor = (state) => {
  switch (state) {
    case 'button':
      return '#384bff';
    case 'link':
      return '#00d4ff';
    case 'text':
      return '#ff6b6b';
    case 'card':
      return '#6c5ce7';
    case 'magnetic':
      return '#ff9f43';
    case 'hover':
      return '#a29bfe';
    default:
      return 'rgba(255, 255, 255, 0.5)';
  }
};

const getCursorBackgroundColor = (state) => {
  switch (state) {
    case 'button':
      return 'rgba(56, 75, 255, 0.1)';
    case 'link':
      return 'rgba(0, 212, 255, 0.1)';
    case 'card':
      return 'rgba(108, 92, 231, 0.1)';
    case 'magnetic':
      return 'rgba(255, 159, 67, 0.1)';
    default:
      return 'transparent';
  }
};

const getCursorDotColor = (state) => {
  switch (state) {
    case 'button':
      return '#384bff';
    case 'link':
      return '#00d4ff';
    case 'card':
      return '#6c5ce7';
    case 'magnetic':
      return '#ff9f43';
    case 'hover':
      return '#a29bfe';
    default:
      return '#ffffff';
  }
};

const getCursorOpacity = (state) => {
  switch (state) {
    case 'text':
      return 0.3;
    case 'button':
    case 'link':
    case 'card':
    case 'magnetic':
      return 0.8;
    default:
      return 0.6;
  }
};

const getDotScale = (state) => {
  switch (state) {
    case 'button':
      return 1.5;
    case 'link':
      return 1.2;
    case 'card':
      return 1.3;
    case 'magnetic':
      return 1.4;
    default:
      return 1;
  }
};

export default CustomCursor;