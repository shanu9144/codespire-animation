"use client";

import React from 'react';

/**
 * CSSLiquidBackground Component
 * 
 * CSS-only liquid animation fallback that always works
 */

const CSSLiquidBackground = ({
  variant = 'hero',
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
      tertiary: '#1e2875'
    },
    section: {
      primary: '#384bff',
      secondary: '#f9fafb', 
      tertiary: '#e5e7eb'
    }
  };

  const colors = colorConfigs[variant] || colorConfigs.hero;

  return (
    <div 
      className={`css-liquid-background relative overflow-hidden ${className}`}
      style={style}
      {...props}
    >
      {/* Animated background layers */}
      <div className="absolute inset-0">
        {/* Layer 1 */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(circle at 20% 50%, ${colors.primary} 0%, transparent 50%), 
                        radial-gradient(circle at 80% 20%, ${colors.secondary} 0%, transparent 50%), 
                        radial-gradient(circle at 40% 80%, ${colors.tertiary} 0%, transparent 50%)`,
            animation: 'liquidFlow1 20s ease-in-out infinite'
          }}
        />
        
        {/* Layer 2 */}
        <div 
          className="absolute inset-0 opacity-8"
          style={{
            background: `radial-gradient(circle at 60% 30%, ${colors.primary} 0%, transparent 60%), 
                        radial-gradient(circle at 30% 70%, ${colors.secondary} 0%, transparent 60%)`,
            animation: 'liquidFlow2 25s ease-in-out infinite reverse'
          }}
        />
        
        {/* Layer 3 */}
        <div 
          className="absolute inset-0 opacity-6"
          style={{
            background: `radial-gradient(circle at 70% 60%, ${colors.tertiary} 0%, transparent 40%)`,
            animation: 'liquidFlow3 30s ease-in-out infinite'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes liquidFlow1 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          25% {
            transform: translate(10px, -15px) scale(1.1) rotate(90deg);
          }
          50% {
            transform: translate(-5px, 10px) scale(0.9) rotate(180deg);
          }
          75% {
            transform: translate(-15px, -5px) scale(1.05) rotate(270deg);
          }
        }

        @keyframes liquidFlow2 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          33% {
            transform: translate(-20px, 10px) scale(1.2) rotate(120deg);
          }
          66% {
            transform: translate(15px, -10px) scale(0.8) rotate(240deg);
          }
        }

        @keyframes liquidFlow3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          20% {
            transform: translate(8px, -12px) scale(1.15);
          }
          40% {
            transform: translate(-12px, 8px) scale(0.85);
          }
          60% {
            transform: translate(5px, 15px) scale(1.1);
          }
          80% {
            transform: translate(-8px, -5px) scale(0.95);
          }
        }

        .css-liquid-background {
          background: linear-gradient(135deg, 
            ${colors.primary}05 0%, 
            transparent 50%, 
            ${colors.secondary}03 100%);
        }
      `}</style>
    </div>
  );
};

export default CSSLiquidBackground;