'use client';

/**
 * React Component Wrapper for ParticleField
 * Provides easy integration with React applications
 */

import { useEffect, useRef, useState } from 'react';
import ParticleField from './ParticleField.js';
import AnimationEngine from '../core/AnimationEngine.js';

const ParticleFieldComponent = ({
  // Particle configuration
  particleCount = 500,
  particleSize = { min: 1, max: 4 },
  speed = { min: 0.5, max: 2.0 },
  color = '#384bff',
  opacity = { min: 0.3, max: 0.8 },
  
  // Interaction settings
  mouseInteraction = true,
  scrollParallax = true,
  connectionLines = false,
  connectionDistance = 100,
  connectionOpacity = 0.2,
  maxConnections = 500,
  
  // Style props
  className = '',
  style = {},
  
  // Callbacks
  onInitialized = null,
  onError = null,
  
  // Performance
  adaptiveQuality = true,
  maxFPS = 60,
  
  ...otherProps
}) => {
  const containerRef = useRef(null);
  const particleFieldRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const initializeParticleField = async () => {
      try {
        // Ensure AnimationEngine is initialized
        if (!AnimationEngine.isInitialized) {
          await AnimationEngine.initialize();
        }

        // Create particle field configuration
        const config = {
          particleCount,
          particleSize,
          speed,
          color,
          opacity,
          mouseInteraction,
          scrollParallax,
          connectionLines,
          connectionDistance,
          connectionOpacity,
          maxConnections,
          adaptiveQuality,
          maxFPS
        };

        // Create particle field instance
        particleFieldRef.current = new ParticleField(containerRef.current, config);
        
        setIsInitialized(true);
        
        if (onInitialized) {
          onInitialized(particleFieldRef.current);
        }
        
      } catch (err) {
        console.error('Failed to initialize ParticleField:', err);
        setError(err);
        
        if (onError) {
          onError(err);
        }
      }
    };

    initializeParticleField();

    // Cleanup on unmount
    return () => {
      if (particleFieldRef.current) {
        particleFieldRef.current.destroy();
        particleFieldRef.current = null;
      }
    };
  }, []);

  // Update configuration when props change
  useEffect(() => {
    if (!particleFieldRef.current || !isInitialized) return;

    const newConfig = {
      particleCount,
      particleSize,
      speed,
      color,
      opacity,
      mouseInteraction,
      scrollParallax,
      connectionLines,
      connectionDistance,
      connectionOpacity,
      maxConnections,
      adaptiveQuality,
      maxFPS
    };

    particleFieldRef.current.updateConfig(newConfig);
  }, [
    particleCount,
    particleSize,
    speed,
    color,
    opacity,
    mouseInteraction,
    scrollParallax,
    connectionLines,
    connectionDistance,
    connectionOpacity,
    maxConnections,
    adaptiveQuality,
    maxFPS,
    isInitialized
  ]);

  // Provide methods to parent component
  useEffect(() => {
    if (particleFieldRef.current && containerRef.current) {
      // Attach methods to container for external access
      containerRef.current.particleField = particleFieldRef.current;
    }
  }, [isInitialized]);

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    ...style
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={containerStyle}
      {...otherProps}
    >
      {error && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#ff6b6b',
          fontSize: '14px',
          textAlign: 'center',
          zIndex: 10
        }}>
          Particle system failed to load
        </div>
      )}
    </div>
  );
};

export default ParticleFieldComponent;