"use client";

import React, { useState, useEffect } from 'react';
import { AdvancedLiquidEffect } from '../../animations/fluid';

/**
 * SimpleLiquidBackground Component
 * 
 * Simplified version for debugging - always shows animations
 */

const SimpleLiquidBackground = ({
  variant = 'hero',
  children,
  className = '',
  style = {},
  ...props
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
    
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Color configurations for different variants
  const colorConfigs = {
    hero: {
      colors: ['#384bff', '#2d3fd9', '#1e2875'],
      opacity: 0.15,
      flowSpeed: 0.5,
      turbulence: 0.8,
      viscosity: 0.4
    },
    section: {
      colors: ['#384bff', '#f9fafb', '#e5e7eb'],
      opacity: 0.1,
      flowSpeed: 0.3,
      turbulence: 0.6,
      viscosity: 0.6
    }
  };

  const config = colorConfigs[variant] || colorConfigs.hero;

  // Don't render on server side
  if (!isClient) {
    return (
      <div className={`simple-liquid-fallback ${className}`} style={style} {...props}>
        {children}
      </div>
    );
  }

  console.log('SimpleLiquidBackground rendering with dimensions:', dimensions);
  console.log('Config:', config);

  return (
    <div 
      className={`simple-liquid-background relative ${className}`}
      style={style}
      {...props}
    >
      {/* Always show liquid effect if dimensions are available */}
      {dimensions.width > 0 && (
        <div className="absolute inset-0 overflow-hidden">
          <AdvancedLiquidEffect
            width={dimensions.width}
            height={dimensions.height || 600}
            colors={config.colors}
            opacity={config.opacity}
            flowSpeed={config.flowSpeed}
            turbulence={config.turbulence}
            viscosity={config.viscosity}
            flowDirection={[1.0, 0.3]}
            noiseScale={0.01}
            distortionStrength={25.0}
            enableMouseInteraction={true}
            enablePerformanceScaling={false} // Disable performance scaling for debugging
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1
            }}
          />
        </div>
      )}

      {/* Content container */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 bg-black/80 text-white p-2 text-xs rounded z-50">
          <div>Width: {dimensions.width}</div>
          <div>Height: {dimensions.height}</div>
          <div>Variant: {variant}</div>
          <div>Client: {isClient ? 'Yes' : 'No'}</div>
        </div>
      )}
    </div>
  );
};

export default SimpleLiquidBackground;