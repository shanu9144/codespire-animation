"use client";

import React, { useState, useEffect } from 'react';
import { AdvancedLiquidEffect } from '../../lib/animations/fluid';
import { useAnimationPerformance } from '../../lib/performance';

/**
 * CodeSpireLiquidBackground Component
 * 
 * Advanced liquid shader effects integrated with CodeSpire's design system
 * Maintains the existing color theme and professional aesthetic
 */

const CodeSpireLiquidBackground = ({
  variant = 'hero', // 'hero', 'section', 'subtle', 'accent'
  intensity = 'medium', // 'low', 'medium', 'high'
  enableMouseInteraction = true,
  className = '',
  style = {},
  children,
  ...props
}) => {
  const { config, shouldReduceAnimations } = useAnimationPerformance();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update dimensions on mount and resize
  useEffect(() => {
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

  // CodeSpire color configurations for different variants
  const colorConfigs = {
    hero: {
      colors: ['#384bff', '#2d3fd9', '#1e2875'], // Primary blue gradient
      opacity: 0.08,
      flowSpeed: 0.3,
      turbulence: 0.6,
      viscosity: 0.5
    },
    section: {
      colors: ['#384bff', '#f9fafb', '#e5e7eb'], // Primary with light grays
      opacity: 0.05,
      flowSpeed: 0.2,
      turbulence: 0.4,
      viscosity: 0.7
    },
    subtle: {
      colors: ['#f3f4f6', '#e5e7eb', '#d1d5db'], // Subtle grays
      opacity: 0.03,
      flowSpeed: 0.1,
      turbulence: 0.3,
      viscosity: 0.8
    },
    accent: {
      colors: ['#384bff', '#ffffff', '#384bff'], // Primary with white
      opacity: 0.12,
      flowSpeed: 0.4,
      turbulence: 0.8,
      viscosity: 0.3
    }
  };

  // Intensity multipliers
  const intensityMultipliers = {
    low: 0.5,
    medium: 1.0,
    high: 1.5
  };

  const colorConfig = colorConfigs[variant];
  const intensityMultiplier = intensityMultipliers[intensity];

  // Adjust parameters based on intensity
  const liquidProps = {
    colors: colorConfig.colors,
    opacity: colorConfig.opacity * intensityMultiplier,
    flowSpeed: colorConfig.flowSpeed * intensityMultiplier,
    turbulence: colorConfig.turbulence * intensityMultiplier,
    viscosity: colorConfig.viscosity,
    flowDirection: [1.0, 0.3], // Subtle diagonal flow
    noiseScale: 0.008, // Fine noise for professional look
    distortionStrength: 15.0 * intensityMultiplier,
    enableMouseInteraction: enableMouseInteraction && !shouldReduceAnimations,
    enablePerformanceScaling: true
  };

  // Don't render liquid effects if user prefers reduced motion
  if (shouldReduceAnimations) {
    return (
      <div 
        className={`codespire-liquid-fallback ${className}`}
        style={{
          background: variant === 'hero' 
            ? 'linear-gradient(135deg, rgba(56, 75, 255, 0.05) 0%, rgba(249, 250, 251, 0.8) 50%, rgba(56, 75, 255, 0.03) 100%)'
            : 'linear-gradient(135deg, rgba(243, 244, 246, 0.5) 0%, rgba(255, 255, 255, 0.8) 100%)',
          ...style
        }}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div 
      className={`codespire-liquid-background relative ${className}`}
      style={style}
      {...props}
    >
      {/* Liquid shader background */}
      {dimensions.width > 0 && (
        <div className="absolute inset-0 overflow-hidden">
          <AdvancedLiquidEffect
            width={dimensions.width}
            height={dimensions.height || 600}
            {...liquidProps}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1
            }}
          />
        </div>
      )}

      {/* CodeSpire gradient overlay for brand consistency */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: variant === 'hero'
            ? 'linear-gradient(135deg, rgba(56, 75, 255, 0.02) 0%, transparent 50%, rgba(56, 75, 255, 0.01) 100%)'
            : 'linear-gradient(135deg, rgba(249, 250, 251, 0.3) 0%, transparent 100%)',
          zIndex: 2
        }}
      />

      {/* Content container */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Subtle floating elements that match CodeSpire's design */}
      {config.enableFloatingElements && variant === 'hero' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 3 }}>
          <div className="absolute top-20 left-10 w-16 h-16 bg-primary/5 rounded-full blur-sm animate-pulse" />
          <div className="absolute top-40 right-20 w-12 h-12 bg-primary/3 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-40 left-1/4 w-8 h-8 bg-primary/4 rounded-full blur-sm animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      )}
    </div>
  );
};

export default CodeSpireLiquidBackground;