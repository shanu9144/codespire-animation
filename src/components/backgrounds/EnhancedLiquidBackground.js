"use client";

import React from 'react';

/**
 * EnhancedLiquidBackground Component
 * 
 * More visible liquid animations with rotation and flowing effects
 */

const EnhancedLiquidBackground = ({
  variant = 'hero',
  intensity = 'medium',
  children,
  className = '',
  style = {},
  ...props
}) => {
  // Color configurations with higher opacity for visibility
  const colorConfigs = {
    hero: {
      primary: '#384bff',
      secondary: '#2d3fd9',
      tertiary: '#1e2875',
      opacity: intensity === 'low' ? '0.08' : intensity === 'high' ? '0.15' : '0.12'
    },
    section: {
      primary: '#384bff',
      secondary: '#5865f2', 
      tertiary: '#7c3aed',
      opacity: intensity === 'low' ? '0.06' : intensity === 'high' ? '0.12' : '0.09'
    }
  };

  const colors = colorConfigs[variant] || colorConfigs.hero;

  return (
    <div 
      className={`enhanced-liquid-background relative overflow-hidden ${className}`}
      style={style}
      {...props}
    >
      {/* Enhanced background layers with more visible animations */}
      <div className="absolute inset-0 will-change-transform">
        {/* Primary rotating layer */}
        <div 
          className="absolute inset-0 liquid-layer-1"
          style={{
            background: `radial-gradient(ellipse 1000px 700px at 30% 20%, ${colors.primary}${colors.opacity} 0%, transparent 60%)`,
            transform: 'translate3d(0, 0, 0)',
          }}
        />
        
        {/* Secondary flowing layer */}
        <div 
          className="absolute inset-0 liquid-layer-2"
          style={{
            background: `radial-gradient(ellipse 800px 1000px at 70% 80%, ${colors.secondary}${colors.opacity} 0%, transparent 60%)`,
            transform: 'translate3d(0, 0, 0)',
          }}
        />
        
        {/* Tertiary pulsing layer */}
        <div 
          className="absolute inset-0 liquid-layer-3"
          style={{
            background: `radial-gradient(ellipse 900px 600px at 50% 50%, ${colors.tertiary}${colors.opacity} 0%, transparent 50%)`,
            transform: 'translate3d(0, 0, 0)',
          }}
        />

        {/* Additional flowing blobs */}
        <div 
          className="absolute inset-0 liquid-blob-1"
          style={{
            background: `radial-gradient(circle 400px at 20% 60%, ${colors.primary}${colors.opacity} 0%, transparent 70%)`,
            transform: 'translate3d(0, 0, 0)',
          }}
        />

        <div 
          className="absolute inset-0 liquid-blob-2"
          style={{
            background: `radial-gradient(circle 350px at 80% 30%, ${colors.secondary}${colors.opacity} 0%, transparent 70%)`,
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Enhanced CSS Animations with rotation and more movement */}
      <style jsx>{`
        .liquid-layer-1 {
          animation: liquidRotateFlow1 20s ease-in-out infinite;
        }

        .liquid-layer-2 {
          animation: liquidRotateFlow2 25s ease-in-out infinite reverse;
        }

        .liquid-layer-3 {
          animation: liquidPulseFlow 30s ease-in-out infinite;
        }

        .liquid-blob-1 {
          animation: liquidBlobFlow1 18s ease-in-out infinite;
        }

        .liquid-blob-2 {
          animation: liquidBlobFlow2 22s ease-in-out infinite reverse;
        }

        @keyframes liquidRotateFlow1 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          }
          25% {
            transform: translate3d(40px, -50px, 0) scale(1.2) rotate(90deg);
          }
          50% {
            transform: translate3d(-30px, 40px, 0) scale(0.8) rotate(180deg);
          }
          75% {
            transform: translate3d(-50px, -20px, 0) scale(1.1) rotate(270deg);
          }
        }

        @keyframes liquidRotateFlow2 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          }
          33% {
            transform: translate3d(-60px, 30px, 0) scale(1.3) rotate(120deg);
          }
          66% {
            transform: translate3d(50px, -40px, 0) scale(0.7) rotate(240deg);
          }
        }

        @keyframes liquidPulseFlow {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          }
          20% {
            transform: translate3d(25px, -35px, 0) scale(1.4) rotate(72deg);
          }
          40% {
            transform: translate3d(-40px, 25px, 0) scale(0.6) rotate(144deg);
          }
          60% {
            transform: translate3d(35px, 45px, 0) scale(1.2) rotate(216deg);
          }
          80% {
            transform: translate3d(-25px, -30px, 0) scale(0.8) rotate(288deg);
          }
        }

        @keyframes liquidBlobFlow1 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          25% {
            transform: translate3d(60px, -40px, 0) scale(1.5);
          }
          50% {
            transform: translate3d(-45px, 60px, 0) scale(0.5);
          }
          75% {
            transform: translate3d(-30px, -50px, 0) scale(1.3);
          }
        }

        @keyframes liquidBlobFlow2 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          30% {
            transform: translate3d(-50px, 35px, 0) scale(1.4);
          }
          70% {
            transform: translate3d(40px, -55px, 0) scale(0.6);
          }
        }

        .enhanced-liquid-background {
          background: linear-gradient(135deg, 
            ${colors.primary}03 0%, 
            transparent 30%,
            ${colors.secondary}02 70%, 
            ${colors.tertiary}01 100%);
        }

        /* Reduce animations on low-end devices */
        @media (prefers-reduced-motion: reduce) {
          .liquid-layer-1,
          .liquid-layer-2,
          .liquid-layer-3,
          .liquid-blob-1,
          .liquid-blob-2 {
            animation: none;
          }
        }

        /* Optimize for mobile - slower animations */
        @media (max-width: 768px) {
          .liquid-layer-1 {
            animation-duration: 25s;
          }
          .liquid-layer-2 {
            animation-duration: 30s;
          }
          .liquid-layer-3 {
            animation-duration: 35s;
          }
          .liquid-blob-1 {
            animation-duration: 23s;
          }
          .liquid-blob-2 {
            animation-duration: 27s;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedLiquidBackground;