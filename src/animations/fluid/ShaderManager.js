"use client";

/**
 * ShaderManager
 * 
 * Manages WebGL shaders and provides performance optimization for liquid effects
 * Features:
 * - Shader compilation and caching
 * - Performance monitoring and automatic quality scaling
 * - Resource management and cleanup
 * - Error handling and fallbacks
 */

class ShaderManager {
  constructor() {
    this.shaderCache = new Map();
    this.programCache = new Map();
    this.performanceMetrics = {
      fps: 60,
      frameTime: 0,
      lastFrameTime: 0,
      frameCount: 0,
      lastSecond: 0
    };
    this.qualityLevel = 'high'; // high, medium, low
    this.isWebGLSupported = true;
    
    // Performance thresholds
    this.thresholds = {
      high: { minFPS: 45, maxFrameTime: 22 },
      medium: { minFPS: 30, maxFrameTime: 33 },
      low: { minFPS: 20, maxFrameTime: 50 }
    };
  }

  /**
   * Initialize WebGL context with error handling
   */
  initializeWebGL(canvas) {
    try {
      const gl = canvas.getContext('webgl2') || 
                  canvas.getContext('webgl') || 
                  canvas.getContext('experimental-webgl');
      
      if (!gl) {
        console.warn('WebGL not supported');
        this.isWebGLSupported = false;
        return null;
      }

      // Check for required extensions
      const extensions = {
        floatTextures: gl.getExtension('OES_texture_float'),
        halfFloatTextures: gl.getExtension('OES_texture_half_float'),
        derivatives: gl.getExtension('OES_standard_derivatives')
      };

      // Enable extensions if available
      Object.values(extensions).forEach(ext => {
        if (ext) {
          console.log('WebGL extension enabled:', ext);
        }
      });

      return { gl, extensions };
    } catch (error) {
      console.error('WebGL initialization failed:', error);
      this.isWebGLSupported = false;
      return null;
    }
  }

  /**
   * Create and compile shader with caching
   */
  createShader(gl, type, source, cacheKey) {
    // Check cache first
    if (this.shaderCache.has(cacheKey)) {
      return this.shaderCache.get(cacheKey);
    }

    try {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = gl.getShaderInfoLog(shader);
        console.error(`Shader compilation error (${cacheKey}):`, error);
        gl.deleteShader(shader);
        return null;
      }

      // Cache the compiled shader
      this.shaderCache.set(cacheKey, shader);
      return shader;
    } catch (error) {
      console.error('Shader creation failed:', error);
      return null;
    }
  }

  /**
   * Create and link program with caching
   */
  createProgram(gl, vertexShader, fragmentShader, cacheKey) {
    // Check cache first
    if (this.programCache.has(cacheKey)) {
      return this.programCache.get(cacheKey);
    }

    try {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const error = gl.getProgramInfoLog(program);
        console.error(`Program linking error (${cacheKey}):`, error);
        gl.deleteProgram(program);
        return null;
      }

      // Cache the linked program
      this.programCache.set(cacheKey, program);
      return program;
    } catch (error) {
      console.error('Program creation failed:', error);
      return null;
    }
  }

  /**
   * Get optimized shader source based on performance level
   */
  getOptimizedShaderSource(baseSource, type = 'fragment') {
    let optimizedSource = baseSource;

    switch (this.qualityLevel) {
      case 'medium':
        // Reduce noise octaves and complexity
        optimizedSource = optimizedSource
          .replace(/fbm\(([^,]+),\s*4\)/g, 'fbm($1, 3)')
          .replace(/fbm\(([^,]+),\s*3\)/g, 'fbm($1, 2)')
          .replace(/fbm\(([^,]+),\s*8\)/g, 'fbm($1, 4)');
        break;
        
      case 'low':
        // Minimal quality for performance
        optimizedSource = optimizedSource
          .replace(/fbm\(([^,]+),\s*[4-8]\)/g, 'fbm($1, 2)')
          .replace(/fbm\(([^,]+),\s*3\)/g, 'fbm($1, 1)')
          .replace(/for \(int i = 0; i < 8; i\+\+\)/g, 'for (int i = 0; i < 4; i++)')
          .replace(/sin\(time \* 3\.0/g, 'sin(time * 1.5')
          .replace(/\* 0\.1/g, '* 0.05');
        break;
    }

    return optimizedSource;
  }

  /**
   * Update performance metrics and adjust quality if needed
   */
  updatePerformance(deltaTime) {
    const now = performance.now();
    this.performanceMetrics.frameTime = deltaTime;
    this.performanceMetrics.frameCount++;

    // Calculate FPS every second
    if (now - this.performanceMetrics.lastSecond >= 1000) {
      this.performanceMetrics.fps = this.performanceMetrics.frameCount;
      this.performanceMetrics.frameCount = 0;
      this.performanceMetrics.lastSecond = now;

      // Auto-adjust quality based on performance
      this.adjustQualityLevel();
    }

    this.performanceMetrics.lastFrameTime = now;
  }

  /**
   * Automatically adjust quality level based on performance
   */
  adjustQualityLevel() {
    const { fps, frameTime } = this.performanceMetrics;
    const currentThreshold = this.thresholds[this.qualityLevel];

    // Downgrade quality if performance is poor
    if (fps < currentThreshold.minFPS || frameTime > currentThreshold.maxFrameTime) {
      if (this.qualityLevel === 'high') {
        this.setQualityLevel('medium');
      } else if (this.qualityLevel === 'medium') {
        this.setQualityLevel('low');
      }
    }
    // Upgrade quality if performance is good (with hysteresis)
    else if (this.qualityLevel !== 'high') {
      const upgradeThreshold = this.qualityLevel === 'low' ? 
        this.thresholds.medium : this.thresholds.high;
      
      if (fps > upgradeThreshold.minFPS * 1.2 && frameTime < upgradeThreshold.maxFrameTime * 0.8) {
        const newLevel = this.qualityLevel === 'low' ? 'medium' : 'high';
        this.setQualityLevel(newLevel);
      }
    }
  }

  /**
   * Set quality level and clear shader cache to force recompilation
   */
  setQualityLevel(level) {
    if (this.qualityLevel !== level) {
      console.log(`Adjusting shader quality: ${this.qualityLevel} -> ${level}`);
      this.qualityLevel = level;
      
      // Clear caches to force recompilation with new quality settings
      this.clearCaches();
    }
  }

  /**
   * Get performance-adjusted uniform values
   */
  getPerformanceAdjustedUniforms(baseUniforms) {
    const multiplier = this.getPerformanceMultiplier();
    
    return {
      ...baseUniforms,
      u_flowSpeed: (baseUniforms.u_flowSpeed || 1.0) * multiplier,
      u_turbulence: (baseUniforms.u_turbulence || 1.0) * multiplier,
      u_distortionStrength: (baseUniforms.u_distortionStrength || 1.0) * multiplier,
      u_noiseScale: (baseUniforms.u_noiseScale || 1.0) * Math.max(0.5, multiplier)
    };
  }

  /**
   * Get performance multiplier based on quality level
   */
  getPerformanceMultiplier() {
    switch (this.qualityLevel) {
      case 'high': return 1.0;
      case 'medium': return 0.7;
      case 'low': return 0.4;
      default: return 1.0;
    }
  }

  /**
   * Create optimized geometry for liquid effects
   */
  createLiquidGeometry(gl, resolution = 64) {
    // Adjust resolution based on performance
    const adjustedResolution = Math.max(16, Math.floor(resolution * this.getPerformanceMultiplier()));
    
    const vertices = [];
    const indices = [];
    
    // Create grid of vertices
    for (let y = 0; y <= adjustedResolution; y++) {
      for (let x = 0; x <= adjustedResolution; x++) {
        const u = x / adjustedResolution;
        const v = y / adjustedResolution;
        
        // Position (normalized coordinates)
        vertices.push(u * 2 - 1, v * 2 - 1);
        // Texture coordinates
        vertices.push(u, v);
      }
    }
    
    // Create triangle indices
    for (let y = 0; y < adjustedResolution; y++) {
      for (let x = 0; x < adjustedResolution; x++) {
        const i = y * (adjustedResolution + 1) + x;
        
        // First triangle
        indices.push(i, i + 1, i + adjustedResolution + 1);
        // Second triangle
        indices.push(i + 1, i + adjustedResolution + 2, i + adjustedResolution + 1);
      }
    }
    
    return {
      vertices: new Float32Array(vertices),
      indices: new Uint16Array(indices),
      resolution: adjustedResolution
    };
  }

  /**
   * Setup vertex attributes for liquid geometry
   */
  setupVertexAttributes(gl, program, vertices) {
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
    
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
    if (positionLocation >= 0) {
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 16, 0);
    }
    
    if (texCoordLocation >= 0) {
      gl.enableVertexAttribArray(texCoordLocation);
      gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 16, 8);
    }
    
    return buffer;
  }

  /**
   * Clear all caches
   */
  clearCaches() {
    // Note: In a real implementation, you'd want to properly delete WebGL resources
    this.shaderCache.clear();
    this.programCache.clear();
  }

  /**
   * Get current performance metrics
   */
  getPerformanceMetrics() {
    return {
      ...this.performanceMetrics,
      qualityLevel: this.qualityLevel,
      isWebGLSupported: this.isWebGLSupported
    };
  }

  /**
   * Cleanup resources
   */
  dispose(gl) {
    // Delete cached shaders
    this.shaderCache.forEach(shader => {
      if (gl && shader) {
        gl.deleteShader(shader);
      }
    });
    
    // Delete cached programs
    this.programCache.forEach(program => {
      if (gl && program) {
        gl.deleteProgram(program);
      }
    });
    
    this.clearCaches();
  }
}

// Singleton instance
let shaderManagerInstance = null;

export const getShaderManager = () => {
  if (!shaderManagerInstance) {
    shaderManagerInstance = new ShaderManager();
  }
  return shaderManagerInstance;
};

export default ShaderManager;