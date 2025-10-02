"use client";

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MorphingShape } from './MorphingShapes';

/**
 * SectionFluidTransitions Component
 * 
 * Creates fluid transitions between website sections with synchronized colors
 * Features:
 * - Section-aware color transitions
 * - Smooth morphing between section boundaries
 * - Configurable transition timing and effects
 * - Integration with existing website sections
 */

const SectionFluidTransitions = ({
  sections = [],
  transitionDuration = 1.0,
  morphingIntensity = 0.8,
  colorBlendMode = 'multiply',
  className = '',
  ...props
}) => {
  const containerRef = useRef(null);
  const shapesRef = useRef([]);
  const animationRef = useRef(null);
  const [activeSections, setActiveSections] = useState(new Set());
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Default section configurations
  const defaultSections = [
    {
      id: 'hero',
      selector: '[data-section="hero"]',
      colors: ['#384bff', '#6366f1'],
      shapeCount: 2,
      morphPattern: 'gentle'
    },
    {
      id: 'features',
      selector: '[data-section="features"]',
      colors: ['#6366f1', '#8b5cf6'],
      shapeCount: 3,
      morphPattern: 'active'
    },
    {
      id: 'about',
      selector: '[data-section="about"]',
      colors: ['#8b5cf6', '#a855f7'],
      shapeCount: 2,
      morphPattern: 'flowing'
    }
  ];

  const sectionConfigs = sections.length > 0 ? sections : defaultSections;

  // Morphing patterns
  const morphPatterns = {
    gentle: {
      frequency: 0.2,
      amplitude: 0.3,
      complexity: 4
    },
    active: {
      frequency: 0.5,
      amplitude: 0.6,
      complexity: 6
    },
    flowing: {
      frequency: 0.3,
      amplitude: 0.4,
      complexity: 5
    }
  };

  // Initialize shapes for a section
  const createSectionShapes = useCallback((sectionConfig, sectionIndex) => {
    const shapes = [];
    const pattern = morphPatterns[sectionConfig.morphPattern] || morphPatterns.gentle;
    
    for (let i = 0; i < sectionConfig.shapeCount; i++) {
      const shape = new MorphingShape({
        x: dimensions.width * (0.2 + Math.random() * 0.6),
        y: dimensions.height * (0.3 + Math.random() * 0.4),
        radius: 80 + Math.random() * 120,
        morphSpeed: pattern.frequency * (0.8 + Math.random() * 0.4),
        complexity: pattern.complexity,
        roughness: pattern.amplitude,
        color: sectionConfig.colors[i % sectionConfig.colors.length],
        opacity: 0.08 + Math.random() * 0.04
      });
      
      // Add section-specific properties
      shape.sectionId = sectionConfig.id;
      shape.sectionIndex = sectionIndex;
      shape.shapeIndex = i;
      shape.isActive = false;
      shape.targetOpacity = shape.opacity;
      shape.transitionSpeed = 2.0;
      
      shapes.push(shape);
    }
    
    return shapes;
  }, [dimensions]);

  // Section intersection observer
  const SectionObserver = ({ sectionConfig, index, children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
      threshold: 0.3,
      margin: '-10% 0px -10% 0px'
    });

    useEffect(() => {
      if (isInView) {
        setActiveSections(prev => new Set([...prev, sectionConfig.id]));
        
        // Activate shapes for this section
        shapesRef.current
          .filter(shape => shape.sectionId === sectionConfig.id)
          .forEach(shape => {
            shape.isActive = true;
            shape.targetOpacity = shape.opacity * 2;
            shape.triggerMorphEvent();
          });
      } else {
        setActiveSections(prev => {
          const newSet = new Set(prev);
          newSet.delete(sectionConfig.id);
          return newSet;
        });
        
        // Deactivate shapes for this section
        shapesRef.current
          .filter(shape => shape.sectionId === sectionConfig.id)
          .forEach(shape => {
            shape.isActive = false;
            shape.targetOpacity = shape.opacity * 0.5;
          });
      }
    }, [isInView, sectionConfig.id]);

    return <div ref={ref}>{children}</div>;
  };

  // Create gradient transitions between sections
  const createGradientTransition = useCallback((fromColor, toColor, progress) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, fromColor);
    gradient.addColorStop(progress, fromColor);
    gradient.addColorStop(progress + 0.1, toColor);
    gradient.addColorStop(1, toColor);
    
    return gradient;
  }, [dimensions]);

  // Animation loop
  const animate = useCallback((currentTime) => {
    const deltaTime = (currentTime - (animate.lastTime || currentTime)) * 0.001;
    animate.lastTime = currentTime;
    
    if (shapesRef.current.length > 0 && containerRef.current) {
      shapesRef.current.forEach((shape, index) => {
        // Update morphing
        shape.update(deltaTime);
        
        // Smooth opacity transitions
        const opacityDiff = shape.targetOpacity - shape.opacity;
        shape.opacity += opacityDiff * shape.transitionSpeed * deltaTime;
        
        // Add extra morphing for active sections
        if (shape.isActive && Math.random() < 0.005 * morphingIntensity) {
          shape.triggerMorphEvent();
        }
        
        // Update SVG element
        const pathElement = containerRef.current?.querySelector(`#section-fluid-${index}`);
        if (pathElement) {
          pathElement.setAttribute('d', shape.generatePath());
          pathElement.setAttribute('fill', shape.color);
          pathElement.setAttribute('opacity', Math.max(0, shape.opacity));
        }
      });
    }
    
    animationRef.current = requestAnimationFrame(animate);
  }, [morphingIntensity]);

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

  // Initialize all shapes
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      const allShapes = [];
      
      sectionConfigs.forEach((config, index) => {
        const sectionShapes = createSectionShapes(config, index);
        allShapes.push(...sectionShapes);
      });
      
      shapesRef.current = allShapes;
    }
  }, [dimensions, sectionConfigs, createSectionShapes]);

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

  // Create section observers
  const renderSectionObservers = () => {
    return sectionConfigs.map((config, index) => {
      const sectionElement = document.querySelector(config.selector);
      if (!sectionElement) return null;
      
      return (
        <SectionObserver key={config.id} sectionConfig={config} index={index}>
          {/* This will be positioned over the actual section */}
        </SectionObserver>
      );
    });
  };

  return (
    <>
      {/* Fluid background */}
      <div
        ref={containerRef}
        className={`section-fluid-transitions ${className}`}
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
            filter: 'blur(25px) contrast(12)',
            mixBlendMode: colorBlendMode,
          }}
        >
          <defs>
            <filter id="section-metaball">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -7"
              />
            </filter>
          </defs>
          
          {shapesRef.current.map((_, index) => (
            <path
              key={index}
              id={`section-fluid-${index}`}
              d=""
              fill="#384bff"
              opacity="0.1"
              filter="url(#section-metaball)"
            />
          ))}
        </svg>
      </div>
      
      {/* Section observers */}
      {renderSectionObservers()}
    </>
  );
};

export default SectionFluidTransitions;