"use client";

import React, { useState } from 'react';
import CarouselHero from '../../components/sections/CarouselHero';
import OptimizedLiquidBackground from '../../components/backgrounds/OptimizedLiquidBackground';
import PerformanceDebugger from '../../components/debug/PerformanceDebugger';

/**
 * Performance Test Page
 * 
 * Test different performance configurations
 */

export default function PerformanceTestPage() {
  const [testMode, setTestMode] = useState('optimized');

  const testModes = {
    optimized: {
      title: 'Optimized Animations',
      description: 'GPU-accelerated CSS animations with performance optimizations'
    },
    minimal: {
      title: 'Minimal Animations',
      description: 'Reduced animation complexity for maximum performance'
    },
    static: {
      title: 'Static Background',
      description: 'No animations - pure static gradients'
    }
  };

  return (
    <div className="min-h-screen">
      {/* Always show performance monitor */}
      <PerformanceDebugger show={true} />
      
      {/* Controls */}
      <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs">
        <h3 className="font-semibold mb-3 text-sm">Performance Test</h3>
        <div className="space-y-2">
          {Object.entries(testModes).map(([key, mode]) => (
            <button
              key={key}
              onClick={() => setTestMode(key)}
              className={`block w-full text-left px-3 py-2 rounded text-xs transition-colors ${
                testMode === key
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="font-medium">{mode.title}</div>
              <div className="opacity-75">{mode.description}</div>
            </button>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-600">
            <div>🟢 60+ FPS: Excellent</div>
            <div>🟡 30-59 FPS: Good</div>
            <div>🔴 &lt;30 FPS: Poor</div>
          </div>
        </div>
      </div>

      {/* Test Content */}
      {testMode === 'optimized' && <CarouselHero />}
      
      {testMode === 'minimal' && (
        <OptimizedLiquidBackground variant="hero" intensity="low" className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white max-w-2xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Minimal Animation Test</h1>
            <p className="text-xl mb-8">Low-intensity background animations for maximum performance</p>
            <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors">
              Test Button
            </button>
          </div>
        </OptimizedLiquidBackground>
      )}
      
      {testMode === 'static' && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-transparent to-primary/5">
          <div className="text-center max-w-2xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Static Background Test</h1>
            <p className="text-xl mb-8 text-gray-600">No animations - pure static gradients for baseline performance</p>
            <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors">
              Test Button
            </button>
          </div>
        </div>
      )}
    </div>
  );
}