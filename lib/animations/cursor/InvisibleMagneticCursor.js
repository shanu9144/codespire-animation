'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { calculateCombinedMagneticForce, findMagneticElements } from './magneticUtils';

/**
 * InvisibleMagneticCursor Component
 * 
 * Provides magnetic attraction effects for interactive elements without
 * changing the appearance of the cursor. The default browser cursor remains
 * visible and normal, but elements with magnetic properties will attract it.
 */
const InvisibleMagneticCursor = ({ 
  magneticConfig = {
    strength: 0.3,
    radius: 80,
    ease: 0.15
  },
  disabled = false
}) => {
  const [magneticElements, setMagneticElements] = useState([]);
  const [activeMagneticElement, setActiveMagneticElement] = useState(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  // Update magnetic elements
  const updateMagneticElements = useCallback(() => {
    setMagneticElements(findMagneticElements());
  }, []);
  
  // Handle mouse movement with magnetic calculations
  const handleMouseMove = useCallback((e) => {
    if (disabled) return;
    
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    mousePosition.current = { x: clientX, y: clientY };
    
    // Calculate magnetic attraction
    const { closestElement } = calculateCombinedMagneticForce(clientX, clientY, magneticElements);
    
    // Update active magnetic element for potential future use
    if (closestElement !== activeMagneticElement) {
      setActiveMagneticElement(closestElement);
      
      // Optional: Add subtle visual feedback to the element itself
      if (closestElement) {
        closestElement.style.transform = 'scale(1.02)';
        closestElement.style.transition = 'transform 0.2s ease';
      }
      
      if (activeMagneticElement && activeMagneticElement !== closestElement) {
        activeMagneticElement.style.transform = '';
      }
    }
  }, [disabled, magneticElements, activeMagneticElement]);
  
  // Set up event listeners and observers
  useEffect(() => {
    if (disabled) return;
    
    // Initial setup
    updateMagneticElements();
    
    // Mouse events
    document.addEventListener('mousemove', handleMouseMove);
    
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
      window.removeEventListener('scroll', updateMagneticElements);
      window.removeEventListener('resize', updateMagneticElements);
      observer.disconnect();
      
      // Clean up any transforms
      if (activeMagneticElement) {
        activeMagneticElement.style.transform = '';
      }
    };
  }, [disabled]); // Only depend on disabled state
  
  // This component renders nothing visible
  return null;
};

export default InvisibleMagneticCursor;