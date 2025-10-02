"use client";

import React, { useState } from 'react';
import CSSLiquidBackground from '../../components/backgrounds/CSSLiquidBackground';
import SimpleLiquidBackground from '../../components/backgrounds/SimpleLiquidBackground';
import CodeSpireLiquidBackground from '../../components/backgrounds/CodeSpireLiquidBackground';

/**
 * Animation Test Page
 * 
 * Test different animation implementations
 */

export default function AnimationTestPage() {
  const [activeType, setActiveType] = useState('css');

  const animationTypes = {
    css: {
      title: 'CSS Animations',
      component: CSSLiquidBackground,
      description: 'Pure CSS animations that work everywhere'
    },
    simple: {
      title: 'Simple WebGL',
      component: SimpleLiquidBackground,
      description: 'WebGL shaders with performance scaling disabled'
    },
    advanced: {
      title: 'Advanced WebGL',
      component: CodeSpireLiquidBackground,
      description: 'Full WebGL with performance optimization'
    }
  };

  const CurrentComponent = animationTypes[activeType].component;

  return (
    <div className="min-h-screen">
      {/* Controls */}
      <div className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <h3 className="font-semibold mb-3">Animation Type:</h3>
        <div className="space-y-2">
          {Object.entries(animationTypes).map(([key, type]) => (
            <button
              key={key}
              onClick={() => setActiveType(key)}
              className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                activeType === key
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="font-medium">{type.title}</div>
              <div className="text-xs opacity-75">{type.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Animation Display */}
      <CurrentComponent variant="hero" className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            {animationTypes[activeType].title}
          </h1>
          <p className="text-xl text-white/90 mb-8 drop-shadow">
            {animationTypes[activeType].description}
          </p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
            <h2 className="text-2xl font-semibold text-white mb-4">
              From Idea to Enterprise-Grade AI
            </h2>
            <p className="text-white/90 leading-relaxed">
              Transform your business with cutting-edge AI solutions. From rapid prototyping 
              to enterprise deployment, we deliver AI products that scale with your ambitions.
            </p>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors">
                Schedule a Demo
              </button>
              <button className="bg-white/20 text-white border border-white/30 px-6 py-3 rounded-lg hover:bg-white/30 transition-colors">
                Explore Products
              </button>
            </div>
          </div>

          {/* Animation indicator */}
          <div className="mt-8 text-white/70 text-sm">
            {activeType === 'css' && '🎨 CSS-based flowing gradients'}
            {activeType === 'simple' && '🌊 WebGL liquid simulation (debug mode)'}
            {activeType === 'advanced' && '⚡ Advanced WebGL with performance optimization'}
          </div>
        </div>
      </CurrentComponent>
    </div>
  );
}