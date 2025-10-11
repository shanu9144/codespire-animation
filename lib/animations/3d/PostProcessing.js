"use client";

import React, { useMemo } from 'react';
import { 
  EffectComposer, 
  Bloom, 
  DepthOfField, 
  Noise, 
  Vignette,
  ChromaticAberration,
  SMAA
} from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';
import { useScene3D } from './Scene3DProvider';

/**
 * Post-processing effects component for 3D scenes
 * Provides bloom, depth of field, and glow effects with performance optimization
 */
const PostProcessing = ({
  enableBloom = true,
  enableDepthOfField = true,
  enableNoise = false,
  enableVignette = false,
  enableChromaticAberration = false,
  enableAntialiasing = true,
  bloomIntensity = 0.5,
  bloomRadius = 0.4,
  bloomThreshold = 0.85,
  depthOfFieldFocusDistance = 0.02,
  depthOfFieldFocalLength = 0.025,
  depthOfFieldBokehScale = 6,
  ...props
}) => {
  const { sceneConfig, deviceCapabilities } = useScene3D();
  
  // Performance-based effect configuration
  const effectConfig = useMemo(() => {
    const performanceMode = deviceCapabilities.performanceMode || sceneConfig.performanceMode || 'medium';
    
    switch (performanceMode) {
      case 'high':
        return {
          bloomKernelSize: KernelSize.LARGE,
          bloomLuminanceThreshold: bloomThreshold,
          bloomLuminanceSmoothing: 0.9,
          bloomIntensity: bloomIntensity,
          bloomRadius: bloomRadius,
          depthOfFieldEnabled: enableDepthOfField,
          depthOfFieldBokehScale: depthOfFieldBokehScale,
          noiseEnabled: enableNoise,
          vignetteEnabled: enableVignette,
          chromaticAberrationEnabled: enableChromaticAberration,
          antialiasingEnabled: enableAntialiasing
        };
      case 'medium':
        return {
          bloomKernelSize: KernelSize.MEDIUM,
          bloomLuminanceThreshold: bloomThreshold + 0.1,
          bloomLuminanceSmoothing: 0.7,
          bloomIntensity: bloomIntensity * 0.8,
          bloomRadius: bloomRadius * 0.8,
          depthOfFieldEnabled: enableDepthOfField,
          depthOfFieldBokehScale: Math.max(depthOfFieldBokehScale * 0.7, 3),
          noiseEnabled: false,
          vignetteEnabled: enableVignette,
          chromaticAberrationEnabled: false,
          antialiasingEnabled: enableAntialiasing
        };
      case 'low':
      default:
        return {
          bloomKernelSize: KernelSize.SMALL,
          bloomLuminanceThreshold: bloomThreshold + 0.2,
          bloomLuminanceSmoothing: 0.5,
          bloomIntensity: bloomIntensity * 0.6,
          bloomRadius: bloomRadius * 0.6,
          depthOfFieldEnabled: false,
          depthOfFieldBokehScale: 3,
          noiseEnabled: false,
          vignetteEnabled: false,
          chromaticAberrationEnabled: false,
          antialiasingEnabled: false
        };
    }
  }, [
    deviceCapabilities.performanceMode,
    sceneConfig.performanceMode,
    bloomThreshold,
    bloomIntensity,
    bloomRadius,
    enableDepthOfField,
    depthOfFieldBokehScale,
    enableNoise,
    enableVignette,
    enableChromaticAberration,
    enableAntialiasing
  ]);



  return (
    <EffectComposer 
      multisampling={effectConfig.antialiasingEnabled ? 4 : 0}
      {...props}
    >
      {/* Anti-aliasing for smooth edges */}
      {effectConfig.antialiasingEnabled && (
        <SMAA />
      )}

      {/* Bloom effect for glowing elements */}
      {enableBloom && (
        <Bloom
          intensity={effectConfig.bloomIntensity}
          kernelSize={effectConfig.bloomKernelSize}
          luminanceThreshold={effectConfig.bloomLuminanceThreshold}
          luminanceSmoothing={effectConfig.bloomLuminanceSmoothing}
          radius={effectConfig.bloomRadius}
          blendFunction={BlendFunction.SCREEN}
        />
      )}

      {/* Depth of field for focus effects */}
      {effectConfig.depthOfFieldEnabled && (
        <DepthOfField
          focusDistance={depthOfFieldFocusDistance}
          focalLength={depthOfFieldFocalLength}
          bokehScale={effectConfig.depthOfFieldBokehScale}
          height={480}
          blendFunction={BlendFunction.NORMAL}
        />
      )}

      {/* Subtle noise for film-like quality */}
      {effectConfig.noiseEnabled && (
        <Noise
          opacity={0.02}
          blendFunction={BlendFunction.OVERLAY}
        />
      )}

      {/* Vignette effect for focus */}
      {effectConfig.vignetteEnabled && (
        <Vignette
          offset={0.3}
          darkness={0.5}
          blendFunction={BlendFunction.MULTIPLY}
        />
      )}

      {/* Chromatic aberration for subtle color separation */}
      {effectConfig.chromaticAberrationEnabled && (
        <ChromaticAberration
          offset={[0.0005, 0.0012]}
          blendFunction={BlendFunction.NORMAL}
        />
      )}
    </EffectComposer>
  );
};

/**
 * Enhanced post-processing with glow effects for interactive elements
 */
export const InteractivePostProcessing = ({
  glowIntensity = 0.8,
  glowRadius = 0.6,
  ...props
}) => {
  const { deviceCapabilities } = useScene3D();
  
  // Adjust glow based on performance
  const adjustedGlowIntensity = useMemo(() => {
    const performanceMode = deviceCapabilities.performanceMode || 'medium';
    switch (performanceMode) {
      case 'high': return glowIntensity;
      case 'medium': return glowIntensity * 0.7;
      case 'low': return glowIntensity * 0.4;
      default: return glowIntensity * 0.7;
    }
  }, [glowIntensity, deviceCapabilities.performanceMode]);

  return (
    <PostProcessing
      enableBloom={true}
      enableDepthOfField={true}
      enableGlow={true}
      bloomIntensity={adjustedGlowIntensity}
      bloomRadius={glowRadius}
      bloomThreshold={0.7} // Lower threshold for more glow
      {...props}
    />
  );
};

/**
 * Performance-optimized post-processing for mobile devices
 */
export const MobilePostProcessing = (props) => {
  return (
    <PostProcessing
      enableBloom={true}
      enableDepthOfField={false}
      enableGlow={false}
      enableNoise={false}
      enableVignette={false}
      enableChromaticAberration={false}
      enableAntialiasing={false}
      bloomIntensity={0.3}
      bloomRadius={0.3}
      bloomThreshold={0.9}
      {...props}
    />
  );
};

/**
 * High-quality post-processing for desktop devices
 */
export const DesktopPostProcessing = (props) => {
  return (
    <PostProcessing
      enableBloom={true}
      enableDepthOfField={true}
      enableGlow={true}
      enableNoise={true}
      enableVignette={true}
      enableChromaticAberration={true}
      enableAntialiasing={true}
      bloomIntensity={0.6}
      bloomRadius={0.5}
      bloomThreshold={0.8}
      depthOfFieldFocusDistance={0.025}
      depthOfFieldFocalLength={0.03}
      depthOfFieldBokehScale={8}
      {...props}
    />
  );
};

/**
 * Adaptive post-processing that automatically selects the best configuration
 */
export const AdaptivePostProcessing = (props) => {
  const { deviceCapabilities } = useScene3D();
  
  // Auto-select post-processing based on device capabilities
  if (deviceCapabilities.isMobile || deviceCapabilities.performanceMode === 'low') {
    return <MobilePostProcessing {...props} />;
  } else if (deviceCapabilities.performanceMode === 'high') {
    return <DesktopPostProcessing {...props} />;
  } else {
    return <PostProcessing {...props} />;
  }
};

export default PostProcessing;