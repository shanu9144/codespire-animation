'use client';

import React, { useEffect, useRef, useCallback } from 'react';

class MorphingShape {
  constructor(config = {}) {
    this.x = typeof config.x === 'string' ? parseFloat(config.x) : (config.x || 0);
    this.y = typeof config.y === 'string' ? parseFloat(config.y) : (config.y || 0);
    this.baseRadius = config.radius || 100;
    this.currentRadius = this.baseRadius;
    this.targetRadius = this.baseRadius;
    this.morphSpeed = config.morphSpeed || 0.02;
    this.complexity = config.complexity || 8;
    this.roughness = config.roughness || 0.3;
    this.color = config.color || '#384bff';
    this.opacity = config.opacity || 0.1;
    
    // Initialize control points for organic shape
    this.controlPoints = Array.from({ length: this.complexity }, (_, i) => ({
      angle: (i / this.complexity) * Math.PI * 2,
      radius: this.baseRadius,
      targetRadius: this.baseRadius,
      offset: Math.random() * this.roughness,
      speed: 0.5 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }));
    
    this.time = 0;
  }

  update(deltaTime) {
    this.time += deltaTime;
    
    // Update each control point
    this.controlPoints.forEach((point) => {
      // Create organic movement
      const wave1 = Math.sin(this.time * point.speed + point.phase);
      const wave2 = Math.cos(this.time * point.speed * 0.7 + point.phase * 1.3);
      
      // Combine waves for complex morphing
      const morphFactor = (wave1 + wave2 * 0.5) * this.roughness;
      point.targetRadius = this.baseRadius * (1 + morphFactor);
      
      // Smooth interpolation to target
      point.radius += (point.targetRadius - point.radius) * this.morphSpeed;
    });
    
    // Occasionally trigger dramatic morphing
    if (Math.random() < 0.001) {
      this.triggerMorphEvent();
    }
  }

  triggerMorphEvent() {
    // Randomly modify control points for dramatic shape change
    this.controlPoints.forEach((point) => {
      point.offset = Math.random() * this.roughness * 2;
      point.phase = Math.random() * Math.PI * 2;
      point.speed = 0.3 + Math.random() * 0.8;
    });
  }

  generatePath() {
    const points = this.controlPoints.map((cp) => ({
      x: this.x + Math.cos(cp.angle) * cp.radius,
      y: this.y + Math.sin(cp.angle) * cp.radius,
    }));
    
    // Create smooth spline through points
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 0; i < points.length; i++) {
      const current = points[i];
      const next = points[(i + 1) % points.length];
      const prev = points[(i - 1 + points.length) % points.length];
      
      // Calculate control points for smooth bezier curve
      const cp1x = current.x + (next.x - prev.x) * 0.2;
      const cp1y = current.y + (next.y - prev.y) * 0.2;
      const cp2x = next.x - (points[(i + 2) % points.length].x - current.x) * 0.2;
      const cp2y = next.y - (points[(i + 2) % points.length].y - current.y) * 0.2;
      
      path += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${next.x} ${next.y}`;
    }
    
    path += ' Z';
    return path;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setRadius(radius) {
    this.baseRadius = radius;
    this.controlPoints.forEach((point) => {
      point.targetRadius = radius * (1 + point.offset);
    });
  }
}

const MorphingShapes = ({
  shapes = [],
  className = '',
  style = {},
  enableMetaball = true,
  blurAmount = 20,
  contrast = 15,
  ...props
}) => {
  const svgRef = useRef(null);
  const shapesRef = useRef([]);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);

  // Initialize shapes
  useEffect(() => {
    shapesRef.current = shapes.map((config) => new MorphingShape(config));
  }, [shapes]);

  // Animation loop
  const animate = useCallback((currentTime) => {
    const deltaTime = (currentTime - lastTimeRef.current) * 0.001;
    lastTimeRef.current = currentTime;
    
    if (shapesRef.current.length > 0 && svgRef.current) {
      shapesRef.current.forEach((shape, index) => {
        shape.update(deltaTime);
        
        // Update SVG path
        const pathElement = svgRef.current?.querySelector(`#morph-path-${index}`);
        if (pathElement) {
          pathElement.setAttribute('d', shape.generatePath());
        }
      });
    }
    
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // Start animation
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  // Method to trigger morphing events
  const triggerMorphing = useCallback((shapeIndex = -1) => {
    if (shapeIndex >= 0 && shapesRef.current[shapeIndex]) {
      shapesRef.current[shapeIndex].triggerMorphEvent();
    } else {
      shapesRef.current.forEach((shape) => shape.triggerMorphEvent());
    }
  }, []);

  // Method to update shape positions
  const updateShapePosition = useCallback((index, x, y) => {
    if (shapesRef.current[index]) {
      shapesRef.current[index].setPosition(x, y);
    }
  }, []);

  // Method to update shape size
  const updateShapeSize = useCallback((index, radius) => {
    if (shapesRef.current[index]) {
      shapesRef.current[index].setRadius(radius);
    }
  }, []);

  return (
    <div
      className={`morphing-shapes ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style,
      }}
      {...props}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        style={{
          filter: enableMetaball 
            ? `blur(${blurAmount}px) contrast(${contrast})`
            : 'none',
        }}
      >
        <defs>
          <filter id="advanced-metaball">
            <feGaussianBlur in="SourceGraphic" stdDeviation={blurAmount / 2} />
            <feColorMatrix
              type="matrix"
              values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${contrast} -${contrast / 2}`}
            />
            <feComposite in2="SourceGraphic" operator="over" />
          </filter>
        </defs>
        
        {shapes.map((shapeConfig, index) => (
          <path
            key={index}
            id={`morph-path-${index}`}
            d=""
            fill={shapeConfig.color || '#384bff'}
            opacity={shapeConfig.opacity || 0.1}
            filter={enableMetaball ? 'url(#advanced-metaball)' : 'none'}
          />
        ))}
      </svg>
    </div>
  );
};

// Export both the component and utility functions
export default MorphingShapes;
export { MorphingShape };

