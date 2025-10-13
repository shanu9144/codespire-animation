"use client";

import React from 'react';

/**
 * DramaticLiquidBackground Component
 * 
 * Very visible liquid animations with strong rotation and flowing effects
 */

const DramaticLiquidBackground = ({
  variant = 'hero',
  children,
  className = '',
  style = {},
  ...props
}) => {
  // Color configurations with high opacity for maximum visibility
  const colorConfigs = {
    hero: {
      primary: '#384bff',
      secondary: '#2d3fd9',
      tertiary: '#1e2875',
      opacity: '0.18'
    },
    section: {
      primary: '#384bff',
      secondary: '#5865f2', 
      tertiary: '#7c3aed',
      opacity: '0.15'
    }
  };

  const colors = colorConfigs[variant] || colorConfigs.hero;

  return (
    <div 
      className={`dramatic-liquid-background relative overflow-hidden ${className}`}
      style={style}
      {...props}
    >
      {/* Multiple animated layers for dramatic effect */}
      <div className="absolute inset-0 will-change-transform">
        {/* Large rotating blob 1 */}
        <div 
          className="absolute inset-0 dramatic-blob-1"
          style={{
            background: `radial-gradient(ellipse 1200px 800px at 25% 25%, ${colors.primary}${colors.opacity} 0%, transparent 65%)`,
            transform: 'translate3d(0, 0, 0)',
          }}
        />
        
        {/* Large rotating blob 2 */}
        <div 
          className="absolute inset-0 dramatic-blob-2"
          style={{
            background: `radial-gradient(ellipse 1000px 1200px at 75% 75%, ${colors.secondary}${colors.opacity} 0%, transparent 65%)`,
            transform: 'translate3d(0, 0, 0)',
          }}
        />
        
        {/* Center pulsing blob */}
        <div 
          className="absolute inset-0 dramatic-blob-3"
          style={{
            background: `radial-gradient(ellipse 800px 600px at 50% 50%, ${colors.tertiary}${colors.opacity} 0%, transparent 60%)`,
            transform: 'translate3d(0, 0, 0)',
          }}
        />

        {/* Smaller flowing blobs */}
        <div 
          className="absolute inset-0 dramatic-small-1"
          style={{
            background: `radial-gradient(circle 500px at 15% 70%, ${colors.primary}${colors.opacity} 0%, transparent 80%)`,
            transform: 'translate3d(0, 0, 0)',
          }}
        />

        <div 
          className="absolute inset-0 dramatic-small-2"
          style={{
            background: `radial-gradient(circle 450px at 85% 20%, ${colors.secondary}${colors.opacity} 0%, transparent 80%)`,
            transform: 'translate3d(0, 0, 0)',
          }}
        />

        <div 
          className="absolute inset-0 dramatic-small-3"
          style={{
            background: `radial-gradient(circle 400px at 60% 80%, ${colors.tertiary}${colors.opacity} 0%, transparent 80%)`,
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Dramatic CSS Animations with strong rotation and movement */}
      <style jsx>{`
        .dramatic-blob-1 {
          animation: dramaticRotate1 15s ease-in-out infinite;
        }

        .dramatic-blob-2 {
          animation: dramaticRotate2 18s ease-in-out infinite reverse;
        }

        .dramatic-blob-3 {
          animation: dramaticPulse 12s ease-in-out infinite;
        }

        .dramatic-small-1 {
          animation: dramaticFlow1 14s ease-in-out infinite;
        }

        .dramatic-small-2 {
          animation: dramaticFlow2 16s ease-in-out infinite reverse;
        }

        .dramatic-small-3 {
          animation: dramaticFlow3 20s ease-in-out infinite;
        }

        @keyframes dramaticRotate1 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          }
          25% {
            transform: translate3d(80px, -100px, 0) scale(1.4) rotate(90deg);
          }
          50% {
            transform: translate3d(-60px, 80px, 0) scale(0.6) rotate(180deg);
          }
          75% {
            transform: translate3d(-100px, -40px, 0) scale(1.2) rotate(270deg);
          }
        }

        @keyframes dramaticRotate2 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          }
          33% {
            transform: translate3d(-120px, 60px, 0) scale(1.5) rotate(120deg);
          }
          66% {
            transform: translate3d(100px, -80px, 0) scale(0.5) rotate(240deg);
          }
        }

        @keyframes dramaticPulse {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          }
          20% {
            transform: translate3d(50px, -70px, 0) scale(1.6) rotate(72deg);
          }
          40% {
            transform: translate3d(-80px, 50px, 0) scale(0.4) rotate(144deg);
          }
          60% {
            transform: translate3d(70px, 90px, 0) scale(1.3) rotate(216deg);
          }
          80% {
            transform: translate3d(-50px, -60px, 0) scale(0.7) rotate(288deg);
          }
        }

        @keyframes dramaticFlow1 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          25% {
            transform: translate3d(120px, -80px, 0) scale(1.8);
          }
          50% {
            transform: translate3d(-90px, 120px, 0) scale(0.3);
          }
          75% {
            transform: translate3d(-60px, -100px, 0) scale(1.5);
          }
        }

        @keyframes dramaticFlow2 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          30% {
            transform: translate3d(-100px, 70px, 0) scale(1.7);
          }
          70% {
            transform: translate3d(80px, -110px, 0) scale(0.4);
          }
        }

        @keyframes dramaticFlow3 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          20% {
            transform: translate3d(60px, -90px, 0) scale(1.4);
          }
          40% {
            transform: translate3d(-110px, 40px, 0) scale(0.6);
          }
          60% {
            transform: translate3d(90px, 100px, 0) scale(1.6);
          }
          80% {
            transform: translate3d(-40px, -70px, 0) scale(0.8);
          }
        }

        .dramatic-liquid-background {
          background: linear-gradient(135deg, 
            ${colors.primary}05 0%, 
            transparent 25%,
            ${colors.secondary}03 50%, 
            transparent 75%,
            ${colors.tertiary}02 100%);
        }

        /* Reduce animations on low-end devices */
        @media (prefers-reduced-motion: reduce) {
          .dramatic-blob-1,
          .dramatic-blob-2,
          .dramatic-blob-3,
          .dramatic-small-1,
          .dramatic-small-2,
          .dramatic-small-3 {
            animation: none;
          }
        }

        /* Optimize for mobile - slower and less intense */
        @media (max-width: 768px) {
          .dramatic-blob-1 {
            animation-duration: 20s;
          }
          .dramatic-blob-2 {
            animation-duration: 23s;
          }
          .dramatic-blob-3 {
            animation-duration: 17s;
          }
          .dramatic-small-1 {
            animation-duration: 19s;
          }
          .dramatic-small-2 {
            animation-duration: 21s;
          }
          .dramatic-small-3 {
            animation-duration: 25s;
          }
        }
      `}</style>
    </div>
  );
};

export default DramaticLiquidBackground;