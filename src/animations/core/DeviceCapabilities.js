/**
 * Device Capabilities Detection
 * Detects device performance characteristics for adaptive quality scaling
 */

import WebGLDetection from './WebGLDetection.js';

class DeviceCapabilities {
  constructor() {
    this.capabilities = null;
    this.performanceLevel = null;
    this.isMobile = null;
    this.memoryInfo = null;
  }

  /**
   * Detect if device is mobile
   * @returns {boolean} True if mobile device
   */
  isMobileDevice() {
    if (this.isMobile !== null) {
      return this.isMobile;
    }

    // Check user agent
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    
    // Check touch support
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Check screen size
    const smallScreen = window.screen.width <= 768 || window.screen.height <= 768;
    
    this.isMobile = mobileRegex.test(userAgent) || (hasTouch && smallScreen);
    return this.isMobile;
  }

  /**
   * Get CPU core count estimate
   * @returns {number} Estimated number of CPU cores
   */
  getCPUCores() {
    return navigator.hardwareConcurrency || 4; // Default to 4 if not available
  }

  /**
   * Get memory information
   * @returns {Object} Memory information object
   */
  getMemoryInfo() {
    if (this.memoryInfo !== null) {
      return this.memoryInfo;
    }

    // Try to get device memory (Chrome only)
    const deviceMemory = navigator.deviceMemory || null;
    
    // Try to get performance memory info (Chrome only)
    let performanceMemory = null;
    if (performance && performance.memory) {
      performanceMemory = {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
      };
    }

    this.memoryInfo = {
      deviceMemory, // GB of RAM (Chrome only)
      performanceMemory,
      estimated: this.estimateMemoryTier()
    };

    return this.memoryInfo;
  }

  /**
   * Estimate memory tier based on available information
   * @returns {string} 'high', 'medium', or 'low'
   */
  estimateMemoryTier() {
    const deviceMemory = navigator.deviceMemory;
    
    if (deviceMemory) {
      if (deviceMemory >= 8) return 'high';
      if (deviceMemory >= 4) return 'medium';
      return 'low';
    }

    // Fallback estimation based on other factors
    const cores = this.getCPUCores();
    const isMobile = this.isMobileDevice();
    
    if (isMobile) {
      return cores >= 8 ? 'medium' : 'low';
    } else {
      return cores >= 8 ? 'high' : cores >= 4 ? 'medium' : 'low';
    }
  }

  /**
   * Get GPU performance tier estimate
   * @returns {string} 'high', 'medium', or 'low'
   */
  getGPUTier() {
    const webglCapabilities = WebGLDetection.getWebGLCapabilities();
    
    if (!webglCapabilities.supported) {
      return 'low';
    }

    // Check for high-end GPU indicators
    const hasWebGL2 = WebGLDetection.isWebGL2Supported();
    const hasFloatTextures = WebGLDetection.isExtensionSupported('OES_texture_float');
    const hasInstancedArrays = WebGLDetection.isExtensionSupported('ANGLE_instanced_arrays');
    
    if (hasWebGL2 && hasFloatTextures && hasInstancedArrays && 
        webglCapabilities.maxTextureSize >= 4096) {
      return 'high';
    }

    if (webglCapabilities.maxTextureSize >= 2048 && 
        webglCapabilities.maxFragmentTextures >= 8) {
      return 'medium';
    }

    return 'low';
  }

  /**
   * Get overall device performance level
   * @returns {string} 'high', 'medium', or 'low'
   */
  getPerformanceLevel() {
    if (this.performanceLevel !== null) {
      return this.performanceLevel;
    }

    const memoryTier = this.getMemoryInfo().estimated;
    const gpuTier = this.getGPUTier();
    const cores = this.getCPUCores();
    const isMobile = this.isMobileDevice();

    // Mobile devices get reduced performance tier
    if (isMobile) {
      if (memoryTier === 'high' && gpuTier === 'high' && cores >= 8) {
        this.performanceLevel = 'medium'; // Cap mobile at medium
      } else if (memoryTier === 'medium' || gpuTier === 'medium') {
        this.performanceLevel = 'low';
      } else {
        this.performanceLevel = 'low';
      }
    } else {
      // Desktop performance calculation
      const scores = {
        high: 0,
        medium: 0,
        low: 0
      };

      scores[memoryTier]++;
      scores[gpuTier]++;
      
      if (cores >= 8) scores.high++;
      else if (cores >= 4) scores.medium++;
      else scores.low++;

      // Determine overall level
      if (scores.high >= 2) {
        this.performanceLevel = 'high';
      } else if (scores.medium >= 2 || (scores.high >= 1 && scores.medium >= 1)) {
        this.performanceLevel = 'medium';
      } else {
        this.performanceLevel = 'low';
      }
    }

    return this.performanceLevel;
  }

  /**
   * Get complete device capabilities
   * @returns {Object} Complete capabilities object
   */
  getCapabilities() {
    if (this.capabilities !== null) {
      return this.capabilities;
    }

    this.capabilities = {
      isMobile: this.isMobileDevice(),
      cores: this.getCPUCores(),
      memory: this.getMemoryInfo(),
      gpu: {
        tier: this.getGPUTier(),
        webgl: WebGLDetection.getWebGLCapabilities()
      },
      performance: this.getPerformanceLevel(),
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        pixelRatio: window.devicePixelRatio || 1
      },
      connection: this.getConnectionInfo()
    };

    return this.capabilities;
  }

  /**
   * Get network connection information
   * @returns {Object} Connection information
   */
  getConnectionInfo() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (!connection) {
      return {
        effectiveType: 'unknown',
        downlink: null,
        rtt: null
      };
    }

    return {
      effectiveType: connection.effectiveType || 'unknown',
      downlink: connection.downlink || null,
      rtt: connection.rtt || null,
      saveData: connection.saveData || false
    };
  }

  /**
   * Get recommended animation configuration based on capabilities
   * @returns {Object} Animation configuration
   */
  getAnimationConfig() {
    const performance = this.getPerformanceLevel();
    const isMobile = this.isMobileDevice();
    const webglSupported = WebGLDetection.isWebGLSupported();

    const configs = {
      high: {
        maxParticles: 1000,
        enable3D: true,
        enableShaders: true,
        enablePostProcessing: true,
        particleConnections: true,
        complexAnimations: true,
        targetFPS: 60
      },
      medium: {
        maxParticles: 500,
        enable3D: true,
        enableShaders: webglSupported,
        enablePostProcessing: false,
        particleConnections: false,
        complexAnimations: true,
        targetFPS: 60
      },
      low: {
        maxParticles: isMobile ? 100 : 200,
        enable3D: false,
        enableShaders: false,
        enablePostProcessing: false,
        particleConnections: false,
        complexAnimations: false,
        targetFPS: 30
      }
    };

    const config = configs[performance];
    
    // Additional mobile optimizations
    if (isMobile) {
      config.maxParticles = Math.min(config.maxParticles, 200);
      config.enablePostProcessing = false;
      config.targetFPS = Math.min(config.targetFPS, 30);
    }

    // Disable features if WebGL not supported
    if (!webglSupported) {
      config.enable3D = false;
      config.enableShaders = false;
      config.maxParticles = Math.min(config.maxParticles, 50);
    }

    return config;
  }

  /**
   * Check if reduced motion is preferred
   * @returns {boolean} True if reduced motion is preferred
   */
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Reset cached values (useful for testing or dynamic changes)
   */
  reset() {
    this.capabilities = null;
    this.performanceLevel = null;
    this.isMobile = null;
    this.memoryInfo = null;
  }
}

// Export singleton instance
export default new DeviceCapabilities();