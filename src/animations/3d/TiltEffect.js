"use client";

import React, { useRef, useEffect, useState } from 'react';

/**
 * 3D Tilt Effect Hook
 * Provides mouse-responsive 3D tilt effects for any element
 */
export const useTiltEffect = ({
  maxTilt = 15,
  perspective = 1000,
  scale = 1.05,
  speed = 300,
  glare = true,
  glareMaxOpacity = 0.15,
  reset = true,
  resetDelay = 200
} = {}) => {
  const elementRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tiltData, setTiltData] = useState({
    tiltX: 0,
    tiltY: 0,
    glareX: 0,
    glareY: 0,
    glareOpacity: 0
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationId = null;
    let resetTimeout = null;

    const handleMouseMove = (event) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = event.clientX - centerX;
      const mouseY = event.clientY - centerY;
      
      const rotateX = (mouseY / (rect.height / 2)) * maxTilt;
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
      
      // Calculate glare position (0-100%)
      const glareX = ((event.clientX - rect.left) / rect.width) * 100;
      const glareY = ((event.clientY - rect.top) / rect.height) * 100;
      
      // Calculate glare opacity based on distance from center
      const distanceFromCenter = Math.sqrt(
        Math.pow((glareX - 50) / 50, 2) + Math.pow((glareY - 50) / 50, 2)
      );
      const glareOpacity = glare ? Math.max(0, glareMaxOpacity * (1 - distanceFromCenter)) : 0;

      setTiltData({
        tiltX: -rotateX,
        tiltY: rotateY,
        glareX,
        glareY,
        glareOpacity
      });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      if (resetTimeout) {
        clearTimeout(resetTimeout);
        resetTimeout = null;
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      
      if (reset) {
        resetTimeout = setTimeout(() => {
          setTiltData({
            tiltX: 0,
            tiltY: 0,
            glareX: 50,
            glareY: 50,
            glareOpacity: 0
          });
        }, resetDelay);
      }
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (resetTimeout) {
        clearTimeout(resetTimeout);
      }
    };
  }, [maxTilt, perspective, scale, speed, glare, glareMaxOpacity, reset, resetDelay]);

  const tiltStyle = {
    transform: `perspective(${perspective}px) rotateX(${tiltData.tiltX}deg) rotateY(${tiltData.tiltY}deg) scale(${isHovered ? scale : 1})`,
    transition: isHovered ? 'none' : `transform ${speed}ms ease-out`,
    transformStyle: 'preserve-3d'
  };

  const glareStyle = glare ? {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at ${tiltData.glareX}% ${tiltData.glareY}%, rgba(255,255,255,${tiltData.glareOpacity}) 0%, transparent 50%)`,
    pointerEvents: 'none',
    borderRadius: 'inherit',
    transition: isHovered ? 'none' : `opacity ${speed}ms ease-out`
  } : {};

  return {
    elementRef,
    tiltStyle,
    glareStyle,
    isHovered,
    tiltData
  };
};

/**
 * TiltCard Component
 * A wrapper component that applies 3D tilt effects to its children
 */
const TiltCard = ({
  children,
  className = '',
  style = {},
  maxTilt = 15,
  perspective = 1000,
  scale = 1.05,
  speed = 300,
  glare = true,
  glareMaxOpacity = 0.15,
  reset = true,
  resetDelay = 200,
  ...props
}) => {
  const { elementRef, tiltStyle, glareStyle, isHovered } = useTiltEffect({
    maxTilt,
    perspective,
    scale,
    speed,
    glare,
    glareMaxOpacity,
    reset,
    resetDelay
  });

  return (
    <div
      ref={elementRef}
      className={`relative ${className}`}
      style={{
        ...tiltStyle,
        ...style
      }}
      {...props}
    >
      {children}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={glareStyle}
        />
      )}
    </div>
  );
};

/**
 * Enhanced TiltCard with depth shadows and advanced effects
 */
export const TiltCardAdvanced = ({
  children,
  className = '',
  style = {},
  maxTilt = 20,
  perspective = 1200,
  scale = 1.08,
  speed = 400,
  glare = true,
  glareMaxOpacity = 0.2,
  shadow = true,
  shadowIntensity = 0.3,
  reset = true,
  resetDelay = 300,
  ...props
}) => {
  const { elementRef, tiltStyle, glareStyle, isHovered, tiltData } = useTiltEffect({
    maxTilt,
    perspective,
    scale,
    speed,
    glare,
    glareMaxOpacity,
    reset,
    resetDelay
  });

  // Calculate dynamic shadow based on tilt
  const shadowStyle = shadow ? {
    boxShadow: `
      ${tiltData.tiltY * 0.5}px 
      ${Math.abs(tiltData.tiltX) * 0.5 + 10}px 
      ${20 + Math.abs(tiltData.tiltX) * 2}px 
      rgba(56, 75, 255, ${shadowIntensity * (isHovered ? 1.5 : 1)})
    `
  } : {};

  return (
    <div
      ref={elementRef}
      className={`relative transform-gpu ${className}`}
      style={{
        ...tiltStyle,
        ...shadowStyle,
        ...style
      }}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
      
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={glareStyle}
        />
      )}
      
      {/* Depth layer for enhanced 3D effect */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none"
        style={{
          transform: 'translateZ(-1px)',
          opacity: isHovered ? 0.5 : 0,
          transition: `opacity ${speed}ms ease-out`
        }}
      />
    </div>
  );
};

/**
 * TiltButton Component
 * Specialized tilt effect for buttons with enhanced feedback
 */
export const TiltButton = ({
  children,
  className = '',
  style = {},
  onClick,
  maxTilt = 10,
  perspective = 800,
  scale = 1.03,
  speed = 200,
  glare = true,
  pressScale = 0.98,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const { elementRef, tiltStyle, glareStyle, isHovered } = useTiltEffect({
    maxTilt,
    perspective,
    scale: isPressed ? pressScale : scale,
    speed,
    glare,
    glareMaxOpacity: 0.1,
    reset: true,
    resetDelay: 150
  });

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleClick = (event) => {
    onClick?.(event);
  };

  return (
    <button
      ref={elementRef}
      className={`relative transform-gpu transition-all duration-200 ${className}`}
      style={{
        ...tiltStyle,
        ...style
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
      
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none z-20 rounded-inherit"
          style={glareStyle}
        />
      )}
    </button>
  );
};

export default TiltCard;