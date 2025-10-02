'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MagneticField Component
 * 
 * Creates magnetic attraction effects for interactive elements.
 * Calculates magnetic fields around elements and attracts the cursor
 * with configurable strength and radius.
 */
const MagneticField = ({ 
  children,
  strength = 0.3,
  radius = 100,
  ease = 0.15,
  springConfig = { damping: 25, stiffness: 400, mass: 0.5 },
  disabled = false,
  className = '',
  onMagneticEnter,
  onMagneticLeave
}) => {
  const elementRef = useRef(null);
  const [isInField, setIsInField] = useState(false);
  const [elementBounds, setElementBounds] = useState(null);
  
  // Motion values for magnetic attraction
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const springX = useSpring(magneticX, springConfig);
  const springY = useSpring(magneticY, springConfig);
  
  // Calculate distance between two points
  const getDistance = useCallback((x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }, []);
  
  // Calculate magnetic force based on distance
  const calculateMagneticForce = useCallback((mouseX, mouseY, centerX, centerY, distance) => {
    if (distance > radius) return { x: 0, y: 0 };
    
    // Normalize distance (0 = at center, 1 = at edge of radius)
    const normalizedDistance = distance / radius;
    
    // Calculate force strength (stronger when closer)
    const forceStrength = (1 - normalizedDistance) * strength;
    
    // Calculate direction vector from element center to mouse
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    
    // Apply magnetic force
    return {
      x: deltaX * forceStrength,
      y: deltaY * forceStrength
    };
  }, [radius, strength]);
  
  // Handle mouse movement for magnetic calculation
  const handleMouseMove = useCallback((e) => {
    if (disabled || !elementBounds) return;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate element center
    const centerX = elementBounds.left + elementBounds.width / 2;
    const centerY = elementBounds.top + elementBounds.height / 2;
    
    // Calculate distance from mouse to element center
    const distance = getDistance(mouseX, mouseY, centerX, centerY);
    
    // Check if mouse is within magnetic field
    const inField = distance <= radius;
    
    if (inField !== isInField) {
      setIsInField(inField);
      
      if (inField && onMagneticEnter) {
        onMagneticEnter(elementRef.current);
      } else if (!inField && onMagneticLeave) {
        onMagneticLeave(elementRef.current);
      }
    }
    
    if (inField) {
      // Calculate magnetic force
      const force = calculateMagneticForce(mouseX, mouseY, centerX, centerY, distance);
      
      // Apply magnetic attraction to element
      magneticX.set(force.x);
      magneticY.set(force.y);
    } else {
      // Reset position when outside field
      magneticX.set(0);
      magneticY.set(0);
    }
  }, [
    disabled,
    elementBounds,
    radius,
    isInField,
    getDistance,
    calculateMagneticForce,
    magneticX,
    magneticY,
    onMagneticEnter,
    onMagneticLeave
  ]);
  
  // Update element bounds on resize
  const updateBounds = useCallback(() => {
    if (elementRef.current) {
      setElementBounds(elementRef.current.getBoundingClientRect());
    }
  }, []);
  
  // Set up event listeners and observers
  useEffect(() => {
    if (disabled) return;
    
    // Initial bounds calculation
    updateBounds();
    
    // Add mouse move listener
    document.addEventListener('mousemove', handleMouseMove);
    
    // Update bounds on scroll and resize
    window.addEventListener('scroll', updateBounds);
    window.addEventListener('resize', updateBounds);
    
    // Intersection Observer to update bounds when element moves
    const observer = new IntersectionObserver(
      () => updateBounds(),
      { threshold: 0 }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', updateBounds);
      window.removeEventListener('resize', updateBounds);
      observer.disconnect();
    };
  }, [disabled, handleMouseMove, updateBounds]);
  
  return (
    <motion.div
      ref={elementRef}
      className={`magnetic-field ${className}`}
      style={{
        x: springX,
        y: springY,
      }}
      data-magnetic="true"
      data-magnetic-strength={strength}
      data-magnetic-radius={radius}
    >
      {children}
      
      {/* Debug visualization (only in development) */}
      {process.env.NODE_ENV === 'development' && isInField && (
        <div
          className="magnetic-field-debug"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: radius * 2,
            height: radius * 2,
            border: '1px dashed rgba(56, 75, 255, 0.3)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />
      )}
    </motion.div>
  );
};

export default MagneticField;