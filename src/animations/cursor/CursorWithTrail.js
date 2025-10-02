'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { calculateCombinedMagneticForce, findMagneticElements, getCursorStateForElement } from './magneticUtils';

/**
 * CursorWithTrail Component
 * 
 * Combines magnetic cursor effects with particle trail system.
 * Provides a complete cursor experience with attraction effects and visual feedback.
 */
const CursorWithTrail = ({ 
  // Cursor settings
  cursorSize = 20,
  springConfig = { damping: 25, stiffness: 700, mass: 0.5 },
  
  // Magnetic settings
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
  
  disabled = false,
  showTrail = true,
  showMagnetic = true,
  className = ''
}) => {
  const cursorRef = useRef(null);
  const [cursorState, setCursorState] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [magneticElements, setMagneticElements] = useState([]);
  const [activeMagneticElement, setActiveMagneticElement] = useState(null);
  const [particles, setParticles] = useState([]);
  
  const lastSpawnTime = useRef(0);
  const particleId = useRef(0);
  const animationFrame = useRef();
  
  // Motion values for cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring animations
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  
  // Scale and rotation for visual feedback
  const cursorScale = useMotionValue(1);
  const cursorRotation = useMotionValue(0);
  const springScale = useSpring(cursorScale, springConfig);
  const springRotation = useSpring(cursorRotation, springConfig);
  
  // Create trail particle
  const createTrailParticle = useCallback((x, y) => {
    const colors = trailConfig.colors;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return {
      id: particleId.current++,
      x,
      y,
      createdAt: Date.now(),
      life: trailConfig.particleLife,
      size: trailConfig.particleSize + Math.random() * (trailConfig.particleSize * 0.5),
      opacity: 0.8 + Math.random() * 0.2,
      velocityX: (Math.random() - 0.5) * 1.5,
      velocityY: (Math.random() - 0.5) * 1.5,
      color
    };
  }, [trailConfig]);
  
  // Update trail particles
  const updateTrailParticles = useCallback(() => {
    if (disabled || !showTrail) return;
    
    const now = Date.now();
    
    setParticles(prevParticles => {
      return prevParticles
        .map(particle => ({
          ...particle,
          x: particle.x + particle.velocityX * 0.5,
          y: particle.y + particle.velocityY * 0.5,
          velocityX: particle.velocityX * 0.98,
          velocityY: particle.velocityY * 0.98
        }))
        .filter(particle => {
          const age = now - particle.createdAt;
          return age < particle.life;
        });
    });
    
    animationFrame.current = requestAnimationFrame(updateTrailParticles);
  }, [disabled, showTrail]);
  
  // Update magnetic elements
  const updateMagneticElements = useCallback(() => {
    if (!showMagnetic) return;
    setMagneticElements(findMagneticElements());
  }, [showMagnetic]);
  
  // Handle mouse movement
  const handleMouseMove = useCallback((e) => {
    if (disabled) return;
    
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    // Update mouse position
    mouseX.set(clientX);
    mouseY.set(clientY);
    
    // Calculate magnetic attraction if enabled
    let finalX = clientX;
    let finalY = clientY;
    let closestElement = null;
    
    if (showMagnetic && magneticElements.length > 0) {
      const magneticResult = calculateCombinedMagneticForce(clientX, clientY, magneticElements);
      finalX += magneticResult.forceX;
      finalY += magneticResult.forceY;
      closestElement = magneticResult.closestElement;
    }
    
    // Update cursor position
    cursorX.set(finalX);
    cursorY.set(finalY);
    
    // Update cursor state based on magnetic interaction
    if (closestElement && closestElement !== activeMagneticElement) {
      setActiveMagneticElement(closestElement);
      const newState = getCursorStateForElement(closestElement);
      setCursorState(newState);
      
      // Update cursor scale and rotation based on state
      switch (newState) {
        case 'magnetic-button':
          cursorScale.set(1.5);
          cursorRotation.set(0);
          break;
        case 'magnetic-link':
          cursorScale.set(1.3);
          cursorRotation.set(45);
          break;
        case 'magnetic-card':
          cursorScale.set(1.4);
          cursorRotation.set(0);
          break;
        default:
          cursorScale.set(1.2);
          cursorRotation.set(0);
      }
    } else if (!closestElement && activeMagneticElement) {
      setActiveMagneticElement(null);
      setCursorState('default');
      cursorScale.set(1);
      cursorRotation.set(0);
    }
    
    // Spawn trail particles if enabled
    if (showTrail) {
      const now = Date.now();
      if (now - lastSpawnTime.current >= trailConfig.spawnRate) {
        setParticles(prevParticles => {
          const newParticles = [...prevParticles];
          
          if (newParticles.length >= trailConfig.maxParticles) {
            newParticles.shift();
          }
          
          newParticles.push(createTrailParticle(clientX, clientY));
          return newParticles;
        });
        
        lastSpawnTime.current = now;
      }
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
    showMagnetic,
    magneticElements,
    activeMagneticElement,
    cursorScale,
    cursorRotation,
    showTrail,
    trailConfig,
    createTrailParticle,
    isVisible
  ]);
  
  // Set up event listeners and observers
  useEffect(() => {
    if (disabled) return;
    
    // Initial setup
    updateMagneticElements();
    
    // Start trail animation loop
    if (showTrail) {
      animationFrame.current = requestAnimationFrame(updateTrailParticles);
    }
    
    // Mouse events
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => {
      setIsVisible(false);
      setParticles([]);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Update magnetic elements on DOM changes
    const observer = new MutationObserver(updateMagneticElements);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-magnetic']
    });
    
    // Update on scroll and resize
    window.addEventListener('scroll', updateMagneticElements);
    window.addEventListener('resize', updateMagneticElements);
    
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', updateMagneticElements);
      window.removeEventListener('resize', updateMagneticElements);
      observer.disconnect();
    };
  }, [
    disabled,
    showTrail,
    handleMouseMove,
    updateMagneticElements,
    updateTrailParticles
  ]);
  
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
      {/* Trail Particles */}
      {showTrail && particles.map(particle => {
        const age = Date.now() - particle.createdAt;
        const lifeProgress = age / particle.life;
        const currentOpacity = trailConfig.fadeOut 
          ? particle.opacity * (1 - lifeProgress)
          : particle.opacity;
        const currentSize = particle.size * (1 - lifeProgress * 0.3);
        
        return (
          <motion.div
            key={particle.id}
            className="cursor-trail-particle"
            style={{
              position: 'fixed',
              left: particle.x,
              top: particle.y,
              width: currentSize,
              height: currentSize,
              backgroundColor: particle.color,
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 9998,
              transform: 'translate(-50%, -50%)',
              opacity: currentOpacity,
            }}
          />
        );
      })}
      
      {/* Main Cursor */}
      <motion.div
        ref={cursorRef}
        className={`cursor-with-trail ${className}`}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: cursorSize,
          height: cursorSize,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          x: springX,
          y: springY,
          scale: springScale,
          rotate: springRotation,
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          backgroundColor: getCursorColor(cursorState),
          borderColor: getCursorBorder(cursorState),
          borderWidth: cursorState.startsWith('magnetic') ? 2 : 0,
        }}
        transition={{ duration: 0.15 }}
      />
      
      {/* Inner Dot */}
      <motion.div
        className="cursor-dot"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: cursorSize * 0.3,
          height: cursorSize * 0.3,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          backgroundColor: '#384bff',
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          scale: cursorState.startsWith('magnetic') ? 1.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

// Helper functions for cursor styling
const getCursorColor = (state) => {
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

const getCursorBorder = (state) => {
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

export default CursorWithTrail;