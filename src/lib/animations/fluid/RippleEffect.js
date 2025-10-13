"use client";

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * RippleEffect Component
 * 
 * Creates expanding ripple effects for click and hover interactions
 * Features:
 * - Configurable ripple size, duration, and color
 * - Multiple ripple types (click, hover, pulse)
 * - Performance-optimized with canvas rendering
 * - Integration with existing UI components
 */

class Ripple {
  constructor(config = {}) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.startRadius = config.startRadius || 0;
    this.maxRadius = config.maxRadius || 100;
    this.currentRadius = this.startRadius;
    this.opacity = config.opacity || 1;
    this.maxOpacity = config.opacity || 1;
    this.color = config.color || '#384bff';
    this.duration = config.duration || 1000; // milliseconds
    this.startTime = Date.now();
    this.type = config.type || 'click'; // 'click', 'hover', 'pulse'
    this.easing = config.easing || 'easeOut';
    this.strokeWidth = config.strokeWidth || 2;
    this.fill = config.fill || false;
    this.isComplete = false;
  }

  update() {
    const elapsed = Date.now() - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);
    
    // Apply easing
    let easedProgress;
    switch (this.easing) {
      case 'easeOut':
        easedProgress = 1 - Math.pow(1 - progress, 3);
        break;
      case 'easeIn':
        easedProgress = Math.pow(progress, 3);
        break;
      case 'easeInOut':
        easedProgress = progress < 0.5 
          ? 4 * Math.pow(progress, 3) 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        break;
      default:
        easedProgress = progress;
    }
    
    // Update radius
    this.currentRadius = this.startRadius + (this.maxRadius - this.startRadius) * easedProgress;
    
    // Update opacity based on type
    if (this.type === 'click') {
      this.opacity = this.maxOpacity * (1 - easedProgress);
    } else if (this.type === 'hover') {
      this.opacity = this.maxOpacity * Math.sin(progress * Math.PI);
    } else if (this.type === 'pulse') {
      this.opacity = this.maxOpacity * (0.5 + 0.5 * Math.sin(progress * Math.PI * 4));
    }
    
    this.isComplete = progress >= 1;
    return !this.isComplete;
  }

  draw(ctx) {
    if (this.opacity <= 0) return;
    
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.strokeWidth;
    
    if (this.fill) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    ctx.restore();
  }
}

const RippleEffect = ({
  className = '',
  style = {},
  rippleColor = '#384bff',
  rippleOpacity = 0.6,
  rippleDuration = 800,
  maxRipples = 10,
  children,
  ...props
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const ripplesRef = useRef([]);
  const animationRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Create a new ripple
  const createRipple = useCallback((x, y, config = {}) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const rippleX = x - rect.left;
    const rippleY = y - rect.top;
    
    // Calculate max radius to cover the entire element
    const maxRadius = Math.sqrt(
      Math.pow(Math.max(rippleX, rect.width - rippleX), 2) +
      Math.pow(Math.max(rippleY, rect.height - rippleY), 2)
    );
    
    const ripple = new Ripple({
      x: rippleX,
      y: rippleY,
      maxRadius: config.maxRadius || maxRadius,
      color: config.color || rippleColor,
      opacity: config.opacity || rippleOpacity,
      duration: config.duration || rippleDuration,
      type: config.type || 'click',
      easing: config.easing || 'easeOut',
      strokeWidth: config.strokeWidth || 2,
      fill: config.fill || false,
      ...config
    });
    
    ripplesRef.current.push(ripple);
    
    // Limit number of active ripples
    if (ripplesRef.current.length > maxRipples) {
      ripplesRef.current.shift();
    }
  }, [rippleColor, rippleOpacity, rippleDuration, maxRipples]);

  // Animation loop
  const animate = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw ripples
    ripplesRef.current = ripplesRef.current.filter(ripple => {
      const isActive = ripple.update();
      if (isActive) {
        ripple.draw(ctx);
      }
      return isActive;
    });
    
    // Continue animation if there are active ripples
    if (ripplesRef.current.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, []);

  // Start animation when ripples are added
  useEffect(() => {
    if (ripplesRef.current.length > 0 && !animationRef.current) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  // Handle click events
  const handleClick = useCallback((event) => {
    createRipple(event.clientX, event.clientY, {
      type: 'click',
      color: rippleColor,
      opacity: rippleOpacity,
      duration: rippleDuration
    });
    
    // Start animation
    if (!animationRef.current) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [createRipple, rippleColor, rippleOpacity, rippleDuration, animate]);

  // Handle hover events
  const handleMouseEnter = useCallback((event) => {
    createRipple(event.clientX, event.clientY, {
      type: 'hover',
      color: rippleColor,
      opacity: rippleOpacity * 0.5,
      duration: rippleDuration * 0.6,
      maxRadius: 60,
      strokeWidth: 1
    });
    
    if (!animationRef.current) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [createRipple, rippleColor, rippleOpacity, rippleDuration, animate]);

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && canvasRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const canvas = canvasRef.current;
        
        // Set canvas size
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`ripple-effect ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
};

// Higher-order component for adding ripple effects to existing components
export const withRippleEffect = (WrappedComponent, rippleConfig = {}) => {
  return React.forwardRef((props, ref) => {
    return (
      <RippleEffect {...rippleConfig}>
        <WrappedComponent ref={ref} {...props} />
      </RippleEffect>
    );
  });
};

// Hook for programmatic ripple creation
export const useRippleEffect = (containerRef, config = {}) => {
  const ripplesRef = useRef([]);
  const animationRef = useRef(null);

  const createRipple = useCallback((x, y, rippleConfig = {}) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const rippleX = x - rect.left;
    const rippleY = y - rect.top;
    
    const maxRadius = Math.sqrt(
      Math.pow(Math.max(rippleX, rect.width - rippleX), 2) +
      Math.pow(Math.max(rippleY, rect.height - rippleY), 2)
    );
    
    const ripple = new Ripple({
      x: rippleX,
      y: rippleY,
      maxRadius,
      ...config,
      ...rippleConfig
    });
    
    ripplesRef.current.push(ripple);
    return ripple;
  }, [containerRef, config]);

  const clearRipples = useCallback(() => {
    ripplesRef.current = [];
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  return {
    createRipple,
    clearRipples,
    activeRipples: ripplesRef.current
  };
};

export default RippleEffect;