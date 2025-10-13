"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MorphingShape } from './MorphingShapes';
import { OrganicMovement, OrganicEasing } from './OrganicMovement';

/**
 * ScrollFluidBackground Component
 * 
 * Fluid background that responds to scroll position with shape transformations
 * Features:
 * - Scroll-triggered morphing animations
 * - Smooth transitions between blob configurations
 * - Color transitions synchronized with sections
 * - Performance-optimized scroll handling
 */

const ScrollFluidBackground = ({
  sections = [],
  scrollContainer = null,
  transitionZones = 0.2, // Percentage of section height for transitions
  morphIntensity = 1.0,
  colorTransitionSpeed = 0.5,
  className = '',
  ...props
}) => {
  const containerRef = useRef(null);
  const shapesRef = useRef([]);
  const animationRef = useRef(null);
  const lastScrollY = useRef(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Framer Motion scroll tracking
  const { scrollY, scrollYProgress } = useScroll({
    container: scrollContainer
  });

  // Default section configurations if none provided
  const defaultSections = [
    {
      color: '#384bff',
      opacity: 0.1,
      shapeCount: 3,
      size: { min: 100, max: 200 },
      morphSpeed: 0.3,
      movement: 'floating'
    },
    {
      color: '#6366f1',
      opacity: 0.15,
      shapeCount: 4,
      size: { min: 120, max: 250 },
      morphSpeed: 0.5,
      movement: 'swimming'
    },
    {
      color: '#8b5cf6',
      opacity: 0.12,
      shapeCount: 2,
      size: { min: 150, max: 300 },
      morphSpeed: 0.2,
      movement: 'drifting'
    }
  ];

  const sectionConfigs = sections.length > 0 ? sections : defaultSections;

  // Initialize shapes based on current section
  const initializeShapes = useCallback((sectionConfig) => {
    const shapes = [];
    
    for (let i = 0; i < sectionConfig.shapeCount; i++) {
      const shape = new MorphingShape({
        x: (dimensions.width / (sectionConfig.shapeCount + 1)) * (i + 1),
        y: dimensions.height * (0.3 + Math.random() * 0.4),
        radius: sectionConfig.size.min + Math.random() * (sectionConfig.size.max - sectionConfig.size.min),
        morphSpeed: sectionConfig.morphSpeed * (0.8 + Math.random() * 0.4),
        complexity: 6 + Math.floor(Math.random() * 4),
        roughness: 0.2 + Math.random() * 0.3,
        color: sectionConfig.color,
        opacity: sectionConfig.opacity
      });
      
      // Add organic movement
      shape.organicMovement = new OrganicMovement({
        amplitude: 40 + Math.random() * 30,
        frequency: 0.3 + Math.random() * 0.4,
        phase: (i / sectionConfig.shapeCount) * Math.PI * 2,
        complexity: 2
      });
      
      shapes.push(shape);
    }
    
    return shapes;
  }, [dimensions]);

  // Calculate current section based on scroll position
  const getCurrentSection = useCallback((scrollProgress) => {
    const sectionIndex = Math.floor(scrollProgress * sectionConfigs.length);
    return Math.min(sectionIndex, sectionConfigs.length - 1);
  }, [sectionConfigs.length]);

  // Calculate transition progress within a section
  const getTransitionProgress = useCallback((scrollProgress) => {
    const totalSections = sectionConfigs.length;
    const sectionProgress = (scrollProgress * totalSections) % 1;
    
    // Check if we're in a transition zone
    if (sectionProgress < transitionZones) {
      // Transitioning from previous section
      return {
        isTransitioning: true,
        progress: sectionProgress / transitionZones,
        fromSection: Math.max(0, getCurrentSection(scrollProgress) - 1),
        toSection: getCurrentSection(scrollProgress)
      };
    } else if (sectionProgress > (1 - transitionZones)) {
      // Transitioning to next section
      return {
        isTransitioning: true,
        progress: (sectionProgress - (1 - transitionZones)) / transitionZones,
        fromSection: getCurrentSection(scrollProgress),
        toSection: Math.min(sectionConfigs.length - 1, getCurrentSection(scrollProgress) + 1)
      };
    }
    
    return {
      isTransitioning: false,
      progress: 0,
      fromSection: getCurrentSection(scrollProgress),
      toSection: getCurrentSection(scrollProgress)
    };
  }, [transitionZones, getCurrentSection, sectionConfigs.length]);

  // Interpolate between two colors
  const interpolateColor = useCallback((color1, color2, progress) => {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    
    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);
    
    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);
    
    const r = Math.round(r1 + (r2 - r1) * progress);
    const g = Math.round(g1 + (g2 - g1) * progress);
    const b = Math.round(b1 + (b2 - b1) * progress);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }, []);

  // Handle scroll-triggered transformations
  const handleScrollTransformation = useCallback((scrollProgress) => {
    const transition = getTransitionProgress(scrollProgress);
    
    if (transition.isTransitioning) {
      const fromConfig = sectionConfigs[transition.fromSection];
      const toConfig = sectionConfigs[transition.toSection];
      const easedProgress = OrganicEasing.sineInOut(transition.progress);
      
      // Interpolate colors and properties
      const currentColor = interpolateColor(fromConfig.color, toConfig.color, easedProgress);
      const currentOpacity = fromConfig.opacity + (toConfig.opacity - fromConfig.opacity) * easedProgress;
      
      // Update shapes with interpolated values
      shapesRef.current.forEach((shape, index) => {
        shape.color = currentColor;
        shape.opacity = currentOpacity;
        
        // Trigger morphing during transitions
        if (Math.random() < 0.02 * morphIntensity) {
          shape.triggerMorphEvent();
        }
        
        // Adjust morphing intensity based on transition
        shape.morphSpeed = fromConfig.morphSpeed + 
          (toConfig.morphSpeed - fromConfig.morphSpeed) * easedProgress;
      });
    } else {
      // Stable section - apply section-specific properties
      const config = sectionConfigs[transition.fromSection];
      
      shapesRef.current.forEach(shape => {
        shape.color = config.color;
        shape.opacity = config.opacity;
        shape.morphSpeed = config.morphSpeed;
      });
    }
  }, [getTransitionProgress, sectionConfigs, interpolateColor, morphIntensity]);

  // Animation loop
  const animate = useCallback((currentTime) => {
    const deltaTime = (currentTime - (animate.lastTime || currentTime)) * 0.001;
    animate.lastTime = currentTime;
    
    if (shapesRef.current.length > 0 && containerRef.current) {
      shapesRef.current.forEach((shape, index) => {
        // Update organic movement
        if (shape.organicMovement) {
          shape.organicMovement.update(deltaTime);
          const baseX = (dimensions.width / (shapesRef.current.length + 1)) * (index + 1);
          const baseY = dimensions.height * 0.5;
          
          shape.setPosition(
            shape.organicMovement.getX(currentTime * 0.001, baseX),
            shape.organicMovement.getY(currentTime * 0.001, baseY)
          );
        }
        
        // Update morphing
        shape.update(deltaTime);
        
        // Update SVG element
        const pathElement = containerRef.current?.querySelector(`#scroll-fluid-${index}`);
        if (pathElement) {
          pathElement.setAttribute('d', shape.generatePath());
          pathElement.setAttribute('fill', shape.color);
          pathElement.setAttribute('opacity', shape.opacity);
        }
      });
    }
    
    animationRef.current = requestAnimationFrame(animate);
  }, [dimensions]);

  // Handle scroll events
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      handleScrollTransformation(progress);
      
      const newSection = getCurrentSection(progress);
      if (newSection !== currentSection) {
        setCurrentSection(newSection);
      }
    });
    
    return unsubscribe;
  }, [scrollYProgress, handleScrollTransformation, getCurrentSection, currentSection]);

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Initialize shapes when dimensions change
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      shapesRef.current = initializeShapes(sectionConfigs[currentSection]);
    }
  }, [dimensions, currentSection, initializeShapes, sectionConfigs]);

  // Start animation
  useEffect(() => {
    if (shapesRef.current.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className={`scroll-fluid-background ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: -1,
        ...props.style
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{
          filter: 'blur(30px) contrast(15)',
          mixBlendMode: 'multiply',
        }}
      >
        <defs>
          <filter id="scroll-metaball">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -9"
            />
          </filter>
        </defs>
        
        {shapesRef.current.map((_, index) => (
          <path
            key={index}
            id={`scroll-fluid-${index}`}
            d=""
            fill="#384bff"
            opacity="0.1"
            filter="url(#scroll-metaball)"
          />
        ))}
      </svg>
    </div>
  );
};

export default ScrollFluidBackground;