"use client";

import React from 'react';

/**
 * OptimizedLiquidBackground Component
 * 
 * High-performance CSS-only liquid animations optimized for 60fps
 */

const OptimizedLiquidBackground = ({
  variant = 'hero',
  intensity = 'medium',
  children,
  className = '',
  style = {},
  ...props
}) => {
  // Color configurations
  const colorConfigs = {
    hero: {
      primary: '#384bff',
      secondary: '#2d3fd9',
      tertiary: '#1e2875',
      opacity: intensity === 'low' ? '0.03' : intensity === 'high' ? '0.08' : '0.05'
    },
    section: {
      primary: '#384bff',
      secondary: '#f9fafb', 
      tertiary: '#e5e7eb',
      opacity: intensity === 'low' ? '0.02' : intensity === 'high' ? '0.06' : '0.04'
    }
  };

  const colors = colorConfigs[variant] || colorConfigs.hero;

  return (
    <div 
      className={`optimized-liquid-background relative overflow-hidden ${className}`}
      style={style}
      {...props}
    >
      {/* Optimized background layers with GPU acceleration */}
      <div className="absolute inset-0 will-change-transform">
        {/* Primary layer */}
        <div 
          className="absolute inset-0 liquid-layer-1"
          style={{
            background: `radial-gradient(ellipse 800px 600px at 20% 40%, ${colors.primary}${colors.opacity} 0%, transparent 50%)`,
            transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
          }}
        />
        
        {/* Secondary layer */}
        <div 
          className="absolute inset-0 liquid-layer-2"
          style={{
            background: `radial-gradient(ellipse 600px 800px at 80% 60%, ${colors.secondary}${colors.opacity} 0%, transparent 50%)`,
            transform: 'translate3d(0, 0, 0)',
          }}
        />
        
        {/* Tertiary layer */}
        <div 
          className="absolute inset-0 liquid-layer-3"
          style={{
            background: `radial-gradient(ellipse 700px 500px at 50% 80%, ${colors.tertiary}${colors.opacity} 0%, transparent 50%)`,
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Optimized CSS Animations */}
      <style jsx>{`
        .liquid-layer-1 {
          animation: liquidFlow1 25s ease-in-out infinite;
        }

        .liquid-layer-2 {
          animation: liquidFlow2 30s ease-in-out infinite reverse;
        }

        .liquid-layer-3 {
          animation: liquidFlow3 35s ease-in-out infinite;
        }

        @keyframes liquidFlow1 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          25% {
            transform: translate3d(20px, -30px, 0) scale(1.1);
          }
          50% {
            transform: translate3d(-15px, 20px, 0) scale(0.9);
          }
          75% {
            transform: translate3d(-25px, -10px, 0) scale(1.05);
          }
        }

        @keyframes liquidFlow2 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          33% {
            transform: translate3d(-30px, 15px, 0) scale(1.15);
          }
          66% {
            transform: translate3d(25px, -20px, 0) scale(0.85);
          }
        }

        @keyframes liquidFlow3 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          20% {
            transform: translate3d(15px, -25px, 0) scale(1.08);
          }
          40% {
            transform: translate3d(-20px, 10px, 0) scale(0.92);
          }
          60% {
            transform: translate3d(10px, 25px, 0) scale(1.12);
          }
          80% {
            transform: translate3d(-10px, -15px, 0) scale(0.95);
          }
        }

        .optimized-liquid-background {
          background: linear-gradient(135deg, 
            ${colors.primary}02 0%, 
            transparent 50%, 
            ${colors.secondary}01 100%);
        }

        /* Reduce animations on low-end devices */
        @media (prefers-reduced-motion: reduce) {
          .liquid-layer-1,
          .liquid-layer-2,
          .liquid-layer-3 {
            animation: none;
          }
        }

        /* Optimize for mobile */
        @media (max-width: 768px) {
          .liquid-layer-1 {
            animation-duration: 30s;
          }
          .liquid-layer-2 {
            animation-duration: 35s;
          }
          .liquid-layer-3 {
            animation-duration: 40s;
          }
        }
      `}</style>
    </div>
  );
};

export default OptimizedLiquidBackground;