'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MagneticCursorAdvanced Component
 * 
 * Advanced magnetic cursor that responds to magnetic fields created by
 * interactive elements. Provides smooth attraction effects and visual feedback.
 */
const MagneticCursorAdvanced = ({ 
  cursorSize = 20,
  springConfig = { damping: 25, stiffness: 700, mass: 0.5 },
  magneticConfig = {
    strength: 0.4,
    radius: 80,
    ease: 0.15
  },
  visualFeedback = true,
  disabled = false
}) => {
  const cursorRef = useRef(null);
  const [cursorState, setCursorState] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [magneticElements, setMagneticElements] = useState([]);
  const [activeMagneticElement, setActiveMagneticElement] = useState(null);
  
  // Motion values for cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring animations for smooth movement
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  
  // Scale and rotation for visual feedback
  const cursorScale = useMotionValue(1);
  const cursorRotation = useMotionValue(0);
  const springScale = useSpring(cursorScale, springConfig);
  const springRotation = useSpring(cursorRotation, springConfig);
  
  // Calculate distance between two points
  const getDistance = useCallback((x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }, []);
  
  // Find magnetic elements and their properties
  const updateMagneticElements = useCallback(() => {
    const elements = document.querySelectorAll('[data-magnetic]');
    const elementData = Array.from(elements).map(element => {
      const bounds = element.getBoundingClientRect();
      const strength = parseFloat(element.dataset.magneticStrength) || magneticConfig.strength;
      const radius = parseFloat(element.dataset.magneticRadius) || magneticConfig.radius;
      
      return {
        element,
        bounds,
        strength,
        radius,
        centerX: bounds.left + bounds.width / 2,
        centerY: bounds.top + bounds.height / 2
      };
    });
    
    setMagneticElements(elementData);
  }, [magneticConfig]);
  
  // Calculate magnetic attraction from all elements
  const calculateMagneticAttraction = useCallback((mouseX, mouseY) => {
    let totalForceX = 0;
    let totalForceY = 0;
    let closestElement = null;
    let closestDistance = Infinity;
    
    magneticElements.forEach(({ element, centerX, centerY, strength, radius }) => {
      const distance = getDistance(mouseX, mouseY, centerX, centerY);
      
      if (distance <= radius) {
        // Calculate normalized distance (0 = center, 1 = edge)
        const normalizedDistance = distance / radius;
        
        // Calculate force strength (stronger when closer)
        const forceStrength = (1 - normalizedDistance) * strength;
        
        // Calculate direction vector
        const deltaX = centerX - mouseX;
        const deltaY = centerY - mouseY;
        
        // Normalize direction
        const directionLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (directionLength > 0) {
          const normalizedDeltaX = deltaX / directionLength;
          const normalizedDeltaY = deltaY / directionLength;
          
          // Apply magnetic force
          totalForceX += normalizedDeltaX * forceStrength * radius * 0.3;
          totalForceY += normalizedDeltaY * forceStrength * radius * 0.3;
        }
        
        // Track closest element for state changes
        if (distance < closestDistance) {
          closestDistance = distance;
          closestElement = element;
        }
      }
    });
    
    return {
      forceX: totalForceX,
      forceY: totalForceY,
      closestElement,
      closestDistance
    };
  }, [magneticElements, getDistance]);
  
  // Handle mouse movement with magnetic calculations
  const handleMouseMove = useCallback((e) => {
    if (disabled) return;
    
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    // Update mouse position
    mouseX.set(clientX);
    mouseY.set(clientY);
    
    // Calculate magnetic attraction
    const { forceX, forceY, closestElement, closestDistance } = calculateMagneticAttraction(clientX, clientY);
    
    // Apply magnetic force to cursor position
    cursorX.set(clientX + forceX);
    cursorY.set(clientY + forceY);
    
    // Update cursor state based on magnetic interaction
    if (closestElement && closestElement !== activeMagneticElement) {
      setActiveMagneticElement(closestElement);
      
      // Determine cursor state based on element type
      if (closestElement.tagName === 'BUTTON' || closestElement.classList.contains('btn')) {
        setCursorState('magnetic-button');
        cursorScale.set(1.5);
        cursorRotation.set(0);
      } else if (closestElement.tagName === 'A') {
        setCursorState('magnetic-link');
        cursorScale.set(1.3);
        cursorRotation.set(45);
      } else if (closestElement.classList.contains('card')) {
        setCursorState('magnetic-card');
        cursorScale.set(1.4);
        cursorRotation.set(0);
      } else {
        setCursorState('magnetic');
        cursorScale.set(1.2);
        cursorRotation.set(0);
      }
    } else if (!closestElement && activeMagneticElement) {
      setActiveMagneticElement(null);
      setCursorState('default');
      cursorScale.set(1);
      cursorRotation.set(0);
    }
    
    if (!isVisible) {
      setIsVisible(true);
    }
  }, [
    disabled,
    mouseX,
    mouseY,
    cursorX,
    cursorY,
    calculateMagneticAttraction,
    activeMagneticElement,
    cursorScale,
    cursorRotation,
    isVisible
  ]);
  
  // Set up event listeners and observers
  useEffect(() => {
    if (disabled) return;
    
    // Initial setup
    updateMagneticElements();
    
    // Mouse events
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Update magnetic elements on DOM changes
    const observer = new MutationObserver(updateMagneticElements);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-magnetic', 'data-magnetic-strength', 'data-magnetic-radius']
    });
    
    // Update on scroll and resize
    window.addEventListener('scroll', updateMagneticElements);
    window.addEventListener('resize', updateMagneticElements);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', updateMagneticElements);
      window.removeEventListener('resize', updateMagneticElements);
      observer.disconnect();
    };
  }, [disabled, handleMouseMove, updateMagneticElements]);
  
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
      {/* Main cursor - Hidden but tracks for magnetic effects */}
      <motion.div
        ref={cursorRef}
        className="magnetic-cursor-advanced"
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
          rotate: springRotation,
          translateX: '-50%',
          translateY: '-50%',
          opacity: 0, // Hide the custom cursor
          visibility: 'hidden' // Ensure it's completely hidden
        }}
      />
      
      {/* Inner dot - Hidden */}
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
      
      {/* Visual feedback ring for magnetic attraction */}
      {visualFeedback && activeMagneticElement && (
        <motion.div
          className="magnetic-feedback-ring"
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: cursorSize * 2,
            height: cursorSize * 2,
            border: '1px solid rgba(56, 75, 255, 0.4)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9998,
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1,
            scale: 1,
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </>
  );
};

// Helper functions for cursor styling
const getMagneticCursorColor = (state) => {
  switch (state) {
    case 'magnetic-button':
      return 'rgba(56, 75, 255, 0.8)';
    case 'magnetic-link':
      return 'rgba(0, 212, 255, 0.8)';
    case 'magnetic-card':
      return 'rgba(108, 92, 231, 0.8)';
    case 'magnetic':
      return 'rgba(255, 159, 67, 0.8)';
    default:
      return 'rgba(255, 255, 255, 0.8)';
  }
};

const getMagneticCursorBorder = (state) => {
  switch (state) {
    case 'magnetic-button':
      return '#384bff';
    case 'magnetic-link':
      return '#00d4ff';
    case 'magnetic-card':
      return '#6c5ce7';
    case 'magnetic':
      return '#ff9f43';
    default:
      return 'transparent';
  }
};

export default MagneticCursorAdvanced;