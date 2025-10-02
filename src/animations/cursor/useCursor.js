'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useMotionValue } from 'framer-motion';

/**
 * Custom hook for managing cursor state and interactions
 * 
 * Provides cursor position tracking, state management, and
 * utilities for creating custom cursor effects.
 */
export const useCursor = ({
  disabled = false,
  smoothing = 0.15,
  magneticElements = ['button', 'a', '[data-magnetic]']
} = {}) => {
  const [cursorState, setCursorState] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);
  
  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Animation frame reference for smooth interpolation
  const animationFrame = useRef();
  
  // Smooth cursor following with interpolation
  const updateCursorPosition = useCallback(() => {
    if (disabled) return;
    
    const currentX = cursorX.get();
    const currentY = cursorY.get();
    const targetX = mouseX.get();
    const targetY = mouseY.get();
    
    // Linear interpolation for smooth movement
    const newX = currentX + (targetX - currentX) * smoothing;
    const newY = currentY + (targetY - currentY) * smoothing;
    
    cursorX.set(newX);
    cursorY.set(newY);
    
    animationFrame.current = requestAnimationFrame(updateCursorPosition);
  }, [cursorX, cursorY, mouseX, mouseY, smoothing, disabled]);
  
  // Handle mouse movement
  const handleMouseMove = useCallback((e) => {
    if (disabled) return;
    
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    
    if (!isVisible) {
      setIsVisible(true);
    }
  }, [mouseX, mouseY, disabled, isVisible]);
  
  // Handle cursor state changes
  const handleCursorStateChange = useCallback((element, isEntering) => {
    if (disabled) return;
    
    if (isEntering) {
      setHoveredElement(element);
      
      // Determine cursor state based on element
      if (element.tagName === 'BUTTON' || element.type === 'button') {
        setCursorState('button');
      } else if (element.tagName === 'A') {
        setCursorState('link');
      } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        setCursorState('text');
      } else if (element.classList.contains('card')) {
        setCursorState('card');
      } else if (element.hasAttribute('data-magnetic')) {
        setCursorState('magnetic');
      } else {
        setCursorState('hover');
      }
    } else {
      setHoveredElement(null);
      setCursorState('default');
    }
  }, [disabled]);
  
  // Set up event listeners and animation loop
  useEffect(() => {
    if (disabled) return;
    
    // Start animation loop
    animationFrame.current = requestAnimationFrame(updateCursorPosition);
    
    // Mouse event handlers
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    // Add global listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Add listeners to interactive elements
    const elements = document.querySelectorAll(magneticElements.join(', '));
    
    elements.forEach(element => {
      const handleMouseEnter = () => handleCursorStateChange(element, true);
      const handleMouseLeave = () => handleCursorStateChange(element, false);
      
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      
      // Store cleanup function
      element._cursorHookCleanup = () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
    
    return () => {
      // Cancel animation frame
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      
      // Remove global listeners
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      // Cleanup element listeners
      elements.forEach(element => {
        if (element._cursorHookCleanup) {
          element._cursorHookCleanup();
          delete element._cursorHookCleanup;
        }
      });
    };
  }, [
    disabled,
    handleMouseMove,
    handleCursorStateChange,
    updateCursorPosition,
    magneticElements
  ]);
  
  // Hide default cursor
  useEffect(() => {
    if (disabled) {
      document.body.style.cursor = '';
      return;
    }
    
    // Keep default cursor visible
    
    return () => {
      document.body.style.cursor = '';
    };
  }, [disabled]);
  
  return {
    cursorX,
    cursorY,
    mouseX,
    mouseY,
    cursorState,
    isVisible,
    hoveredElement,
    setCursorState
  };
};

/**
 * Hook for detecting device capabilities and touch support
 */
export const useDeviceDetection = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasHover, setHasHover] = useState(true);
  
  useEffect(() => {
    // Detect touch capability
    const touchSupport = 'ontouchstart' in window || 
                        navigator.maxTouchPoints > 0 || 
                        navigator.msMaxTouchPoints > 0;
    
    // Detect mobile device
    const mobileCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    
    // Detect hover capability
    const hoverSupport = window.matchMedia('(hover: hover)').matches;
    
    setIsTouchDevice(touchSupport);
    setIsMobile(mobileCheck);
    setHasHover(hoverSupport);
  }, []);
  
  return {
    isTouchDevice,
    isMobile,
    hasHover,
    shouldDisableCursor: isTouchDevice || isMobile || !hasHover
  };
};

export default useCursor;