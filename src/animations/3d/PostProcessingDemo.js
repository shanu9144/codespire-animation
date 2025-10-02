"use client";

import React, { useState } from 'react';
import Scene3D from './Scene3D';
import FloatingGeometry from './FloatingGeometry';
import { InteractiveMeshCollection } from './InteractiveMesh';
import { Scene3DProvider } from './Scene3DProvider';

/**
 * Demo component showcasing post-processing effects and glow
 */
const PostProcessingDemo = () => {
  const [enablePostProcessing, setEnablePostProcessing] = useState(true);
  const [enableGlow, setEnableGlow] = useState(true);
  const [bloomIntensity, setBloomIntensity] = useState(0.5);
  const [glowIntensity, setGlowIntensity] = useState(0.5);

  const demoShapes = [
    { 
      type: 'sphere', 
      position: [-3, 1, -2], 
      color: '#384bff',
      glowIntensity: 0.6
    },
    { 
      type: 'cube', 
      position: [3, -1, -1], 
      color: '#5865f2',
      glowIntensity: 0.4
    },
    { 
      type: 'torus', 
      position: [0, 2, -3], 
      color: '#7289da',
      glowIntensity: 0.8
    },
    { 
      type: 'octahedron', 
      position: [-1, -2, -2], 
      color: '#99aab5',
      glowIntensity: 0.3
    }
  ];

  const interactiveMeshes = [
    { 
      geometry: 'sphere', 
      position: [2, 0, 0], 
      color: '#384bff',
      hoverColor: '#5865f2',
      glowIntensity: 0.7
    },
    { 
      geometry: 'cube', 
      position: [-2, 0, 0], 
      color: '#5865f2',
      hoverColor: '#7289da',
      glowIntensity: 0.5
    }
  ];

  return (
    <Scene3DProvider>
      <div className="w-full h-screen bg-gray-900 relative">
        {/* Controls Panel */}
        <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
          <h3 className="text-lg font-semibold mb-3">Post-Processing Demo</h3>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={enablePostProcessing}
                onChange={(e) => setEnablePostProcessing(e.target.checked)}
                className="rounded"
              />
              <span>Enable Post-Processing</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={enableGlow}
                onChange={(e) => setEnableGlow(e.target.checked)}
                className="rounded"
              />
              <span>Enable Glow Effects</span>
            </label>
            
            <div>
              <label className="block text-sm mb-1">
                Bloom Intensity: {bloomIntensity.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={bloomIntensity}
                onChange={(e) => setBloomIntensity(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">
                Glow Intensity: {glowIntensity.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={glowIntensity}
                onChange={(e) => setGlowIntensity(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white max-w-xs">
          <h4 className="font-semibold mb-2">Features Demonstrated:</h4>
          <ul className="text-sm space-y-1">
            <li>• Bloom post-processing effects</li>
            <li>• Depth of field blur</li>
            <li>• Interactive glow materials</li>
            <li>• Particle-based glow effects</li>
            <li>• Performance-adaptive quality</li>
            <li>• Mouse interaction with 3D objects</li>
          </ul>
        </div>

        {/* 3D Scene */}
        <Scene3D
          enablePostProcessing={enablePostProcessing}
          postProcessingProps={{
            bloomIntensity: bloomIntensity,
            enableDepthOfField: true,
            enableGlow: enableGlow
          }}
          className="w-full h-full"
        >
          {/* Floating Geometry with Glow */}
          <FloatingGeometry
            shapes={demoShapes}
            enableGlow={enableGlow}
            glowIntensity={glowIntensity}
            mouseInfluence={0.3}
            animationSpeed={0.8}
          />

          {/* Interactive Meshes */}
          <InteractiveMeshCollection
            meshes={interactiveMeshes}
            enableGlow={enableGlow}
            glowIntensity={glowIntensity}
            mouseInfluence={0.8}
            onMeshClick={(event, mesh, index) => {
              console.log('Clicked mesh:', mesh, 'at index:', index);
            }}
            onMeshHover={(event, mesh, index) => {
              console.log('Hovered mesh:', mesh, 'at index:', index);
            }}
          />

          {/* Additional lighting for better glow visibility */}
          <pointLight 
            position={[0, 0, 5]} 
            intensity={0.5} 
            color="#384bff" 
          />
          <pointLight 
            position={[-5, 5, 0]} 
            intensity={0.3} 
            color="#5865f2" 
          />
        </Scene3D>
      </div>
    </Scene3DProvider>
  );
};

export default PostProcessingDemo;