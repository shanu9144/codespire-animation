"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useScene3D } from './Scene3DProvider';
import { AdaptivePostProcessing } from './PostProcessing';

/**
 * Main 3D Scene component with React Three Fiber integration
 * Provides the foundation for all 3D interactive elements
 */
const Scene3D = ({ 
  children, 
  enableControls = false,
  enablePostProcessing = true,
  postProcessingProps = {},
  className = '',
  style = {},
  ...props 
}) => {
  const { sceneConfig } = useScene3D();
  
  const {
    enableShadows,
    enablePostProcessing: configEnablePostProcessing,
    ambientLightIntensity,
    directionalLightIntensity,
    cameraPosition,
    fogColor,
    performanceMode
  } = sceneConfig;

  // Determine if post-processing should be enabled
  const shouldEnablePostProcessing = enablePostProcessing && 
    (configEnablePostProcessing !== false) && 
    (performanceMode !== 'low');

  // Adjust quality based on performance mode
  const shadowMapSize = performanceMode === 'high' ? 2048 : performanceMode === 'medium' ? 1024 : 512;
  const antialias = performanceMode !== 'low';

  return (
    <div 
      className={`w-full h-full ${className}`} 
      style={{ 
        background: 'transparent',
        ...style 
      }}
      {...props}
    >
      <Canvas
        shadows={enableShadows}
        camera={{ 
          position: cameraPosition, 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false
        }}
        dpr={performanceMode === 'high' ? [1, 2] : 1}
      >
        {/* Lighting Setup */}
        <ambientLight 
          intensity={ambientLightIntensity} 
          color="#ffffff" 
        />
        <directionalLight
          position={[10, 10, 5]}
          intensity={directionalLightIntensity}
          color="#ffffff"
          castShadow={enableShadows}
          shadow-mapSize-width={shadowMapSize}
          shadow-mapSize-height={shadowMapSize}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Fog Effect in CodeSpire color scheme */}
        <fog attach="fog" args={[fogColor, 5, 50]} />
        
        {/* Environment for realistic lighting */}
        {performanceMode === 'high' && (
          <Environment preset="city" />
        )}
        
        {/* Optional Controls for Development */}
        {enableControls && (
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            autoRotate={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
            maxDistance={20}
            minDistance={2}
          />
        )}
        
        {/* Scene Content */}
        <Suspense fallback={null}>
          {children}
        </Suspense>

        {/* Post-processing Effects */}
        {shouldEnablePostProcessing && (
          <AdaptivePostProcessing {...postProcessingProps} />
        )}
      </Canvas>
    </div>
  );
};

export default Scene3D;