"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * FluidBackground Component
 * 
 * Creates morphing blob shapes with metaball-style blending effects
 * Features:
 * - SVG-based blob shapes with organic morphing animations
 * - CSS filter-based metaball blending
 * - Configurable movement patterns and speeds
 * - Performance-optimized with requestAnimationFrame
 */

const FluidBackground = ({
  blobCount = 3,
  size = { min: 100, max: 300 },
  speed = 0.5,
  morphSpeed = 0.3,
  color = '#384bff',
  opacity = 0.1,
  blendMode = 'multiply',
  className = '',
  ...props
}) => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const blobsRef = useRef([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize blob data
  const initializeBlobs = useCallback(() => {
    const blobs = [];
    for (let i = 0; i < blobCount; i++) {
      blobs.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        targetX: Math.random() * dimensions.width,
        targetY: Math.random() * dimensions.height,
        radius: size.min + Math.random() * (size.max - size.min),
        targetRadius: size.min + Math.random() * (size.max - size.min),
        angle: Math.random() * Math.PI * 2,
        speed: speed * (0.5 + Math.random() * 0.5),
        morphPhase: Math.random() * Math.PI * 2,
        morphSpeed: morphSpeed * (0.5 + Math.random() * 0.5),
        // Control points for organic blob shape
        controlPoints: Array.from({ length: 8 }, () => ({
          offset: 0.3 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2
        }))
      });
    }
    return blobs;
  }, [blobCount, dimensions, size, speed, morphSpeed]);

  // Generate organic blob path using control points
  const generateBlobPath = useCallback((blob, time) => {
    const { radius, controlPoints, morphPhase, morphSpeed } = blob;
    const points = [];
    const numPoints = controlPoints.length;
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      const cp = controlPoints[i];
      
      // Add morphing variation to radius
      const morphOffset = Math.sin(time * morphSpeed + morphPhase + cp.phase) * 0.2;
      const pointRadius = radius * (cp.offset + morphOffset);
      
      const x = Math.cos(angle) * pointRadius;
      const y = Math.sin(angle) * pointRadius;
      points.push({ x, y });
    }
    
    // Create smooth curve through points using quadratic bezier curves
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 0; i < numPoints; i++) {
      const current = points[i];
      const next = points[(i + 1) % numPoints];
      const nextNext = points[(i + 2) % numPoints];
      
      // Calculate control point for smooth curve
      const cpX = next.x + (nextNext.x - current.x) * 0.1;
      const cpY = next.y + (nextNext.y - current.y) * 0.1;
      
      path += ` Q ${cpX} ${cpY} ${next.x} ${next.y}`;
    }
    
    path += ' Z';
    return path;
  }, []);

  // Animation loop
  const animate = useCallback((time) => {
    if (!blobsRef.current.length || !containerRef.current) return;

    const timeInSeconds = time * 0.001;
    
    blobsRef.current.forEach((blob, index) => {
      // Update position with organic movement
      const moveX = Math.sin(timeInSeconds * blob.speed + blob.angle) * 50;
      const moveY = Math.cos(timeInSeconds * blob.speed + blob.angle * 1.3) * 30;
      
      blob.x = blob.targetX + moveX;
      blob.y = blob.targetY + moveY;
      
      // Update radius with breathing effect
      const breathe = Math.sin(timeInSeconds * blob.morphSpeed + blob.morphPhase) * 20;
      blob.radius = blob.targetRadius + breathe;
      
      // Occasionally change target position
      if (Math.random() < 0.001) {
        blob.targetX = Math.random() * dimensions.width;
        blob.targetY = Math.random() * dimensions.height;
        blob.targetRadius = size.min + Math.random() * (size.max - size.min);
      }
      
      // Update SVG element
      const blobElement = containerRef.current?.querySelector(`#blob-${index}`);
      if (blobElement) {
        const path = generateBlobPath(blob, timeInSeconds);
        const pathElement = blobElement.querySelector('path');
        if (pathElement) {
          pathElement.setAttribute('d', path);
        }
        blobElement.setAttribute('transform', `translate(${blob.x}, ${blob.y})`);
      }
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [dimensions, size, generateBlobPath]);

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

  // Initialize blobs when dimensions are available
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      blobsRef.current = initializeBlobs();
    }
  }, [dimensions, initializeBlobs]);

  // Start animation
  useEffect(() => {
    if (blobsRef.current.length > 0) {
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
      className={`fluid-background ${className}`}
      style={{
        position: 'absolute',
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
          filter: 'blur(40px) contrast(20)',
          mixBlendMode: blendMode,
        }}
      >
        <defs>
          <filter id="metaball">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
            />
          </filter>
        </defs>
        
        {Array.from({ length: blobCount }, (_, index) => (
          <g key={index} id={`blob-${index}`}>
            <path
              d=""
              fill={color}
              opacity={opacity}
              filter="url(#metaball)"
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default FluidBackground;