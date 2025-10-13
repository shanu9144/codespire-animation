"use client";

import React from 'react';

interface OptimizedLiquidBackgroundProps {
  variant?: 'hero' | 'section';
  intensity?: 'low' | 'medium' | 'high';
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * OptimizedLiquidBackground Component
 * 
 * High-performance CSS-only liquid animations optimized for 60fps
 */
const OptimizedLiquidBackground: React.FC<OptimizedLiquidBackgroundProps> = ({
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
            background: `radial-gradient(ellipse 1000px 400px at 50% 20%, ${colors.tertiary}${colors.opacity} 0%, transparent 60%)`,
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* CSS animations */}
      <style jsx>{`
        .optimized-liquid-background {
          position: relative;
          overflow: hidden;
        }

        .liquid-layer-1 {
          animation: liquidFloat1 20s ease-in-out infinite;
        }

        .liquid-layer-2 {
          animation: liquidFloat2 25s ease-in-out infinite reverse;
        }

        .liquid-layer-3 {
          animation: liquidFloat3 30s ease-in-out infinite;
        }

        @keyframes liquidFloat1 {
          0%, 100% { 
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg); 
          }
          33% { 
            transform: translate3d(30px, -20px, 0) scale(1.1) rotate(2deg); 
          }
          66% { 
            transform: translate3d(-20px, 15px, 0) scale(0.9) rotate(-1deg); 
          }
        }

        @keyframes liquidFloat2 {
          0%, 100% { 
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg); 
          }
          25% { 
            transform: translate3d(-25px, 30px, 0) scale(1.2) rotate(-2deg); 
          }
          50% { 
            transform: translate3d(20px, -15px, 0) scale(0.8) rotate(1deg); 
          }
          75% { 
            transform: translate3d(15px, 25px, 0) scale(1.1) rotate(-1deg); 
          }
        }

        @keyframes liquidFloat3 {
          0%, 100% { 
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg); 
          }
          20% { 
            transform: translate3d(40px, -30px, 0) scale(1.3) rotate(3deg); 
          }
          40% { 
            transform: translate3d(-30px, 20px, 0) scale(0.7) rotate(-2deg); 
          }
          60% { 
            transform: translate3d(25px, 35px, 0) scale(1.1) rotate(1deg); 
          }
          80% { 
            transform: translate3d(-20px, -25px, 0) scale(0.9) rotate(-1deg); 
          }
        }

        /* Performance optimizations */
        .optimized-liquid-background * {
          will-change: transform;
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .liquid-layer-1,
          .liquid-layer-2,
          .liquid-layer-3 {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default OptimizedLiquidBackground;
