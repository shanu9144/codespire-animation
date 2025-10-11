"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Context for managing 3D scene configuration and state
 */
const Scene3DContext = createContext();

/**
 * Hook to access 3D scene context
 */
export const useScene3D = () => {
  const context = useContext(Scene3DContext);
  if (!context) {
    throw new Error('useScene3D must be used within a Scene3DProvider');
  }
  return context;
};

/**
 * Provider component for 3D scene configuration
 * Manages performance settings and device capabilities
 */
export const Scene3DProvider = ({ children }) => {
  const [sceneConfig, setSceneConfig] = useState({
    enableShadows: true,
    enablePostProcessing: false,
    ambientLightIntensity: 0.4,
    directionalLightIntensity: 1,
    cameraPosition: [0, 0, 5],
    fogColor: '#0a0a0a',
    fogDensity: 0.02,
    performanceMode: 'high' // high, medium, low
  });

  const [deviceCapabilities, setDeviceCapabilities] = useState({
    gpu: 'high',
    memory: 4,
    cores: 4,
    isMobile: false,
    supportsWebGL: true,
    maxTextureSize: 4096
  });

  // Detect device capabilities on mount
  useEffect(() => {
    const detectCapabilities = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      const capabilities = {
        gpu: 'medium',
        memory: navigator.deviceMemory || 4,
        cores: navigator.hardwareConcurrency || 4,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        supportsWebGL: !!gl,
        maxTextureSize: gl ? gl.getParameter(gl.MAX_TEXTURE_SIZE) : 2048
      };

      // Determine GPU performance level
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          if (renderer.includes('Intel') || renderer.includes('AMD')) {
            capabilities.gpu = 'medium';
          } else if (renderer.includes('NVIDIA') || renderer.includes('Apple')) {
            capabilities.gpu = 'high';
          }
        }
      }

      // Adjust for mobile devices
      if (capabilities.isMobile) {
        capabilities.gpu = capabilities.gpu === 'high' ? 'medium' : 'low';
      }

      setDeviceCapabilities(capabilities);
      
      // Auto-adjust scene config based on capabilities
      updateSceneForDevice(capabilities);
    };

    detectCapabilities();
  }, []);

  const updateSceneForDevice = (capabilities) => {
    let performanceMode = 'high';
    let enableShadows = true;
    let enablePostProcessing = false;

    if (capabilities.isMobile || capabilities.gpu === 'low') {
      performanceMode = 'low';
      enableShadows = false;
    } else if (capabilities.gpu === 'medium') {
      performanceMode = 'medium';
      enableShadows = true;
    } else {
      performanceMode = 'high';
      enableShadows = true;
      enablePostProcessing = true;
    }

    setSceneConfig(prev => ({
      ...prev,
      performanceMode,
      enableShadows,
      enablePostProcessing
    }));
  };

  const updateSceneConfig = (updates) => {
    setSceneConfig(prev => ({ ...prev, ...updates }));
  };

  const setPerformanceMode = (mode) => {
    const configs = {
      low: {
        enableShadows: false,
        enablePostProcessing: false,
        ambientLightIntensity: 0.6,
        directionalLightIntensity: 0.8
      },
      medium: {
        enableShadows: true,
        enablePostProcessing: false,
        ambientLightIntensity: 0.5,
        directionalLightIntensity: 0.9
      },
      high: {
        enableShadows: true,
        enablePostProcessing: true,
        ambientLightIntensity: 0.4,
        directionalLightIntensity: 1
      }
    };

    updateSceneConfig({ ...configs[mode], performanceMode: mode });
  };

  const contextValue = {
    sceneConfig,
    deviceCapabilities,
    updateSceneConfig,
    setPerformanceMode
  };

  return (
    <Scene3DContext.Provider value={contextValue}>
      {children}
    </Scene3DContext.Provider>
  );
};

export default Scene3DProvider;