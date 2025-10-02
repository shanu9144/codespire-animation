"use client";

import React from 'react';
import SimpleLiquidBackground from '../../components/backgrounds/SimpleLiquidBackground';

/**
 * Simple Liquid Test Page
 * 
 * Basic test to see if liquid animations are working
 */

export default function TestSimpleLiquidPage() {
  return (
    <div className="min-h-screen">
      <SimpleLiquidBackground variant="hero" className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Liquid Animation Test</h1>
          <p className="text-xl">You should see flowing liquid animations behind this text</p>
          <div className="mt-8 p-4 bg-white/20 rounded-lg backdrop-blur-sm">
            <p className="text-sm">
              If you see this box with a blurred background, WebGL is working.
              <br />
              Move your mouse around to see interactive effects.
            </p>
          </div>
        </div>
      </SimpleLiquidBackground>
    </div>
  );
}