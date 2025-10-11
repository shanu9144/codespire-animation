/**
 * Animation System Initializer
 * Utility to easily initialize the animation system with sensible defaults
 */

import AnimationEngine from '../core/AnimationEngine.js';
import DeviceCapabilities from '../core/DeviceCapabilities.js';

/**
 * Initialize the animation system
 * @param {Object} options - Configuration options
 * @returns {Promise<Object>} Initialization result
 */
export async function initializeAnimations(options = {}) {
  try {
    // Default configuration
    const defaultConfig = {
      // Performance
      targetFPS: 60,
      adaptiveQuality: true,
      
      // Features
      enableAnimations: true,
      enable3D: true,
      enableParticles: true,
      
      // Visual
      primaryColor: '#384bff',
      secondaryColor: '#ffffff',
      
      // Accessibility
      respectReducedMotion: true,
      provideFallbacks: true,
      
      // Debug
      showPerformanceStats: false
    };

    // Merge with user options
    const config = { ...defaultConfig, ...options };

    // Initialize the animation engine
    await AnimationEngine.initialize(config);

    // Get device capabilities for reporting
    const capabilities = DeviceCapabilities.getCapabilities();
    
    const result = {
      success: true,
      config: AnimationEngine.getConfig(),
      capabilities,
      engine: AnimationEngine
    };

    console.log('Animation system initialized successfully:', result);
    return result;

  } catch (error) {
    console.error('Failed to initialize animation system:', error);
    
    return {
      success: false,
      error: error.message,
      fallback: true,
      engine: AnimationEngine
    };
  }
}

/**
 * Quick setup for CodeSpire website
 * @returns {Promise<Object>} Initialization result
 */
export async function initializeCodeSpireAnimations() {
  return initializeAnimations({
    primaryColor: '#384bff',
    secondaryColor: '#ffffff',
    enableAnimations: true,
    enable3D: true,
    enableParticles: true,
    respectReducedMotion: true,
    showPerformanceStats: process.env.NODE_ENV === 'development'
  });
}

/**
 * Get animation system status
 * @returns {Object} Current status
 */
export function getAnimationStatus() {
  return {
    initialized: AnimationEngine.isInitialized,
    metrics: AnimationEngine.getMetrics(),
    config: AnimationEngine.getConfig()
  };
}

/**
 * Cleanup animation system
 */
export function cleanupAnimations() {
  AnimationEngine.destroy();
}