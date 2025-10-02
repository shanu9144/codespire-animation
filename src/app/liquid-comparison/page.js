"use client";

import React, { useState } from 'react';
import WhyCodeSpire from '../../components/sections/WhyCodeSpire';
import OptimizedLiquidBackground from '../../components/backgrounds/OptimizedLiquidBackground';
import EnhancedLiquidBackground from '../../components/backgrounds/EnhancedLiquidBackground';
import DramaticLiquidBackground from '../../components/backgrounds/DramaticLiquidBackground';

/**
 * Liquid Animation Comparison Page
 * 
 * Compare different liquid animation intensities
 */

export default function LiquidComparisonPage() {
  const [activeType, setActiveType] = useState('enhanced');

  const animationTypes = {
    optimized: {
      title: 'Optimized (Subtle)',
      component: OptimizedLiquidBackground,
      description: 'Subtle animations for performance',
      props: { variant: 'section', intensity: 'medium' }
    },
    enhanced: {
      title: 'Enhanced (Visible)',
      component: EnhancedLiquidBackground,
      description: 'More visible rotating animations',
      props: { variant: 'section', intensity: 'high' }
    },
    dramatic: {
      title: 'Dramatic (Strong)',
      component: DramaticLiquidBackground,
      description: 'Very visible dramatic effects',
      props: { variant: 'section' }
    }
  };

  const CurrentBackground = animationTypes[activeType].component;
  const currentProps = animationTypes[activeType].props;

  return (
    <div className="min-h-screen">
      {/* Controls */}
      <div className="fixed top-4 left-4 z-50 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <h3 className="font-semibold mb-3">Liquid Animation Intensity:</h3>
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
        
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-600">
            <div>💡 Watch the background for rotating</div>
            <div>and flowing liquid effects</div>
          </div>
        </div>
      </div>

      {/* Animation Display */}
      <CurrentBackground {...currentProps}>
        <WhyCodeSpire />
      </CurrentBackground>

      {/* Info Panel */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Current: {animationTypes[activeType].title}
          </h2>
          <p className="text-gray-600 mb-8">
            {animationTypes[activeType].description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Optimized</h3>
              <p className="text-sm text-gray-600">
                Subtle movements, best performance, 60+ FPS on all devices
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border-2 border-primary">
              <h3 className="font-semibold text-primary mb-2">Enhanced ⭐</h3>
              <p className="text-sm text-gray-600">
                Visible rotating animations, good performance, recommended
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Dramatic</h3>
              <p className="text-sm text-gray-600">
                Strong effects, may impact performance on slower devices
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}