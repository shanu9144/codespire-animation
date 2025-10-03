/**
 * WebGL-based Particle System
 * GPU-accelerated particle rendering with custom shaders
 */

import AnimationEngine from '../core/AnimationEngine.js';
import PerformanceManager from '../core/PerformanceManager.js';
import MouseInteraction from './MouseInteraction.js';
import ScrollParallax from './ScrollParallax.js';
import ConnectionLines from './ConnectionLines.js';

class ParticleSystem {
  constructor(canvas, config = {}) {
    this.canvas = canvas;
    this.gl = null;
    this.program = null;
    this.particles = [];
    this.particleBuffer = null;
    this.positionBuffer = null;
    this.colorBuffer = null;
    this.sizeBuffer = null;
    
    // Connection lines system
    this.connectionLines = null;
    
    // Configuration with defaults
    this.config = {
      particleCount: 500,
      particleSize: { min: 1, max: 4 },
      speed: { min: 0.5, max: 2.0 },
      color: '#384bff',
      opacity: { min: 0.3, max: 0.8 },
      mouseInteraction: true,
      scrollParallax: true,
      connectionLines: false,
      connectionDistance: 100,
      connectionOpacity: 0.2,
      maxConnections: 500,
      ...config
    };
    
    // Animation state
    this.isRunning = false;
    this.lastTime = 0;
    this.mousePosition = { x: 0, y: 0 };
    this.scrollOffset = 0;
    
    // Mouse interaction system
    this.mouseInteraction = new MouseInteraction({
      influenceRadius: 150,
      maxForce: 2.0,
      followDelay: 0.05,
      followStrength: 0.8
    });
    
    // Scroll parallax system
    this.scrollParallax = new ScrollParallax({
      layerCount: 3,
      scrollSensitivity: 1.0,
      velocityInfluence: 0.5,
      horizontalParallax: false, // Disable horizontal for now
      verticalParallax: true
    });
    
    // Performance tracking
    this.frameCount = 0;
    this.lastFPSCheck = 0;
    
    // WebGL resources
    this.buffers = {};
    this.uniforms = {};
    this.attributes = {};
    
    this.initialize();
  }

  /**
   * Initialize WebGL context and shaders
   */
  initialize() {
    try {
      // Notify loading system that ParticleSystem initialization started
      this.notifyLoadingSystem('ParticleSystem', 'started');
      
      // Get WebGL context
      this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
      
      if (!this.gl) {
        throw new Error('WebGL not supported');
      }
      
      // Notify loading system about WebGL context creation
      this.notifyLoadingSystem('WebGLContext', 'completed');
      
      // Set up WebGL state
      this.setupWebGL();
      
      // Create shader program
      this.createShaderProgram();
      
      // Notify loading system about shader compilation
      this.notifyLoadingSystem('ShaderCompilation', 'completed');
      
      // Initialize particles
      this.initializeParticles();
      
      // Create buffers
      this.createBuffers();
      
      // Set up uniforms and attributes
      this.setupUniforms();
      
      // Initialize connection lines if enabled
      if (this.config.connectionLines) {
        this.initializeConnectionLines();
      }
      
      console.log('ParticleSystem initialized with WebGL');
      
      // Notify loading system that ParticleSystem initialization completed
      this.notifyLoadingSystem('ParticleSystem', 'completed');
      
    } catch (error) {
      console.error('Failed to initialize ParticleSystem:', error);
      // Still notify loading system to prevent hanging
      this.notifyLoadingSystem('ParticleSystem', 'completed');
      this.fallbackToCanvas2D();
    }
  }

  /**
   * Set up WebGL state
   */
  setupWebGL() {
    const gl = this.gl;
    
    // Enable blending for transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    // Set clear color
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    
    // Set viewport
    this.resize();
  }

  /**
   * Create vertex and fragment shaders
   */
  createShaderProgram() {
    const gl = this.gl;
    
    // Vertex shader source
    const vertexShaderSource = `
      attribute vec2 a_position;
      attribute float a_size;
      attribute vec4 a_color;
      
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_scroll;
      
      varying vec4 v_color;
      varying float v_size;
      
      void main() {
        // Convert from pixels to clip space
        vec2 clipSpace = ((a_position / u_resolution) * 2.0) - 1.0;
        
        // Flip Y coordinate
        clipSpace.y = -clipSpace.y;
        
        gl_Position = vec4(clipSpace, 0.0, 1.0);
        gl_PointSize = a_size;
        
        v_color = a_color;
        v_size = a_size;
      }
    `;
    
    // Fragment shader source
    const fragmentShaderSource = `
      precision mediump float;
      
      varying vec4 v_color;
      varying float v_size;
      
      void main() {
        // Create circular particles
        vec2 center = gl_PointCoord - vec2(0.5, 0.5);
        float distance = length(center);
        
        if (distance > 0.5) {
          discard;
        }
        
        // Soft edges
        float alpha = 1.0 - smoothstep(0.3, 0.5, distance);
        
        gl_FragColor = vec4(v_color.rgb, v_color.a * alpha);
      }
    `;
    
    // Create shaders
    const vertexShader = this.createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    // Create program
    this.program = gl.createProgram();
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);
    
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      throw new Error('Failed to link shader program: ' + gl.getProgramInfoLog(this.program));
    }
    
    gl.useProgram(this.program);
  }

  /**
   * Create individual shader
   */
  createShader(type, source) {
    const gl = this.gl;
    const shader = gl.createShader(type);
    
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const error = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error('Failed to compile shader: ' + error);
    }
    
    return shader;
  }

  /**
   * Initialize particle data
   */
  initializeParticles() {
    this.particles = [];
    
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push(this.createParticle());
    }
  }

  /**
   * Create a single particle
   */
  createParticle() {
    const canvas = this.canvas;
    
    return {
      // Position
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random(), // For parallax depth
      
      // Velocity
      vx: (Math.random() - 0.5) * this.config.speed.max,
      vy: (Math.random() - 0.5) * this.config.speed.max,
      
      // Visual properties
      size: this.config.particleSize.min + 
            Math.random() * (this.config.particleSize.max - this.config.particleSize.min),
      opacity: this.config.opacity.min + 
               Math.random() * (this.config.opacity.max - this.config.opacity.min),
      
      // Life cycle
      life: 1.0,
      maxLife: 1.0 + Math.random() * 2.0,
      
      // Animation
      phase: Math.random() * Math.PI * 2,
      frequency: 0.5 + Math.random() * 1.5
    };
  }

  /**
   * Create WebGL buffers
   */
  createBuffers() {
    const gl = this.gl;
    
    // Position buffer
    this.buffers.position = gl.createBuffer();
    
    // Color buffer
    this.buffers.color = gl.createBuffer();
    
    // Size buffer
    this.buffers.size = gl.createBuffer();
  }

  /**
   * Initialize connection lines system
   */
  initializeConnectionLines() {
    try {
      this.connectionLines = new ConnectionLines(this.gl, {
        maxDistance: this.config.connectionDistance,
        maxConnections: this.config.maxConnections,
        opacity: this.config.connectionOpacity,
        color: this.config.color,
        lineWidth: 1.0,
        enablePulse: true,
        enableDistanceFade: true
      });
      console.log('ConnectionLines initialized');
    } catch (error) {
      console.error('Failed to initialize ConnectionLines:', error);
      this.config.connectionLines = false;
    }
  }

  /**
   * Set up shader uniforms and attributes
   */
  setupUniforms() {
    const gl = this.gl;
    
    // Get uniform locations
    this.uniforms.resolution = gl.getUniformLocation(this.program, 'u_resolution');
    this.uniforms.time = gl.getUniformLocation(this.program, 'u_time');
    this.uniforms.mouse = gl.getUniformLocation(this.program, 'u_mouse');
    this.uniforms.scroll = gl.getUniformLocation(this.program, 'u_scroll');
    
    // Get attribute locations
    this.attributes.position = gl.getAttribLocation(this.program, 'a_position');
    this.attributes.color = gl.getAttribLocation(this.program, 'a_color');
    this.attributes.size = gl.getAttribLocation(this.program, 'a_size');
    
    // Enable attributes
    gl.enableVertexAttribArray(this.attributes.position);
    gl.enableVertexAttribArray(this.attributes.color);
    gl.enableVertexAttribArray(this.attributes.size);
  }

  /**
   * Update particle positions and properties
   */
  update(deltaTime) {
    if (!this.isRunning) return;
    
    const time = performance.now() * 0.001; // Convert to seconds
    
    // Update each particle
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      
      // Update position
      particle.x += particle.vx * deltaTime * 60; // Normalize for 60fps
      particle.y += particle.vy * deltaTime * 60;
      
      // Add organic movement
      particle.x += Math.sin(time * particle.frequency + particle.phase) * 0.5;
      particle.y += Math.cos(time * particle.frequency * 0.7 + particle.phase) * 0.3;
      
      // Mouse interaction using enhanced system
      if (this.config.mouseInteraction) {
        this.mouseInteraction.applyMagneticField(particle, deltaTime);
        this.mouseInteraction.applyCursorFollowing(particle, deltaTime);
      }
      
      // Scroll parallax using enhanced system
      if (this.config.scrollParallax) {
        this.scrollParallax.applyParallaxToParticle(particle, deltaTime);
      }
      
      // Boundary wrapping
      this.wrapParticle(particle);
      
      // Update life cycle
      particle.life += deltaTime * 0.5;
      if (particle.life > particle.maxLife) {
        particle.life = 0;
        this.resetParticle(particle);
      }
    }
    
    // Update mouse interaction system
    if (this.config.mouseInteraction) {
      this.mouseInteraction.updateMagneticField(deltaTime);
    }
    
    // Update scroll parallax system
    if (this.config.scrollParallax) {
      this.scrollParallax.updateScroll(0, this.scrollOffset, deltaTime);
    }
    
    // Update buffers with new data
    this.updateBuffers();
    
    // Update connection lines if enabled
    if (this.config.connectionLines && this.connectionLines) {
      this.connectionLines.update(this.particles);
    }
  }

  /**
   * Get mouse interaction metrics
   */
  getMouseMetrics() {
    return this.mouseInteraction ? this.mouseInteraction.getMetrics() : null;
  }

  /**
   * Get magnetic field visualization data
   */
  getMagneticFieldData() {
    return this.mouseInteraction ? this.mouseInteraction.getMagneticFieldData() : [];
  }

  /**
   * Update mouse interaction configuration
   */
  updateMouseConfig(config) {
    if (this.mouseInteraction) {
      this.mouseInteraction.updateConfig(config);
    }
  }

  /**
   * Get scroll parallax metrics
   */
  getScrollMetrics() {
    return this.scrollParallax ? this.scrollParallax.getMetrics() : null;
  }

  /**
   * Update scroll parallax configuration
   */
  updateScrollConfig(config) {
    if (this.scrollParallax) {
      this.scrollParallax.updateConfig(config);
    }
  }

  /**
   * Get scroll state for debugging
   */
  getScrollState() {
    return this.scrollParallax ? this.scrollParallax.getScrollState() : null;
  }

  /**
   * Wrap particle around screen boundaries
   */
  wrapParticle(particle) {
    const margin = 50;
    
    if (particle.x < -margin) {
      particle.x = this.canvas.width + margin;
    } else if (particle.x > this.canvas.width + margin) {
      particle.x = -margin;
    }
    
    if (particle.y < -margin) {
      particle.y = this.canvas.height + margin;
    } else if (particle.y > this.canvas.height + margin) {
      particle.y = -margin;
    }
  }

  /**
   * Reset particle to initial state
   */
  resetParticle(particle) {
    particle.x = Math.random() * this.canvas.width;
    particle.y = Math.random() * this.canvas.height;
    particle.vx = (Math.random() - 0.5) * this.config.speed.max;
    particle.vy = (Math.random() - 0.5) * this.config.speed.max;
    particle.life = 0;
  }

  /**
   * Update WebGL buffers with particle data
   */
  updateBuffers() {
    const gl = this.gl;
    const particleCount = this.particles.length;
    
    // Prepare data arrays
    const positions = new Float32Array(particleCount * 2);
    const colors = new Float32Array(particleCount * 4);
    const sizes = new Float32Array(particleCount);
    
    // Parse color once
    const baseColor = this.hexToRgb(this.config.color);
    
    // Fill arrays with particle data
    for (let i = 0; i < particleCount; i++) {
      const particle = this.particles[i];
      const idx2 = i * 2;
      const idx4 = i * 4;
      
      // Position
      positions[idx2] = particle.x;
      positions[idx2 + 1] = particle.y;
      
      // Color with opacity
      colors[idx4] = baseColor.r / 255;
      colors[idx4 + 1] = baseColor.g / 255;
      colors[idx4 + 2] = baseColor.b / 255;
      colors[idx4 + 3] = particle.opacity;
      
      // Size
      sizes[i] = particle.size;
    }
    
    // Update position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
    
    // Update color buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.color);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.DYNAMIC_DRAW);
    
    // Update size buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.size);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.DYNAMIC_DRAW);
  }

  /**
   * Render particles
   */
  render() {
    if (!this.gl || !this.isRunning) return;
    
    const gl = this.gl;
    
    // Clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // Use shader program
    gl.useProgram(this.program);
    
    // Set uniforms
    gl.uniform2f(this.uniforms.resolution, this.canvas.width, this.canvas.height);
    gl.uniform1f(this.uniforms.time, performance.now() * 0.001);
    gl.uniform2f(this.uniforms.mouse, this.mousePosition.x, this.mousePosition.y);
    gl.uniform1f(this.uniforms.scroll, this.scrollOffset);
    
    // Bind position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
    gl.vertexAttribPointer(this.attributes.position, 2, gl.FLOAT, false, 0, 0);
    
    // Bind color buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.color);
    gl.vertexAttribPointer(this.attributes.color, 4, gl.FLOAT, false, 0, 0);
    
    // Bind size buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.size);
    gl.vertexAttribPointer(this.attributes.size, 1, gl.FLOAT, false, 0, 0);
    
    // Draw particles
    gl.drawArrays(gl.POINTS, 0, this.particles.length);
    
    // Draw connection lines if enabled
    if (this.config.connectionLines && this.connectionLines) {
      this.connectionLines.render(this.canvas);
    }
  }

  /**
   * Start particle system
   */
  play() {
    this.isRunning = true;
    console.log('ParticleSystem started');
  }

  /**
   * Pause particle system
   */
  pause() {
    this.isRunning = false;
    console.log('ParticleSystem paused');
  }

  /**
   * Stop particle system
   */
  stop() {
    this.isRunning = false;
    console.log('ParticleSystem stopped');
  }

  /**
   * Handle mouse movement with smooth interpolation
   */
  handleMouseMove(x, y) {
    this.mousePosition.x = x;
    this.mousePosition.y = y;
    
    // Update mouse interaction system
    if (this.config.mouseInteraction) {
      const deltaTime = performance.now() - this.lastTime;
      this.mouseInteraction.updatePosition(x, y, deltaTime);
    }
  }

  /**
   * Handle scroll events with enhanced parallax
   */
  handleScroll(scrollY) {
    this.scrollOffset = scrollY;
    
    // Update scroll parallax system
    if (this.config.scrollParallax && this.scrollParallax) {
      const deltaTime = performance.now() - this.lastTime;
      this.scrollParallax.updateScroll(0, scrollY, deltaTime);
    }
  }

  /**
   * Resize canvas and update viewport
   */
  resize() {
    if (!this.gl) return;
    
    const canvas = this.canvas;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      
      this.gl.viewport(0, 0, displayWidth, displayHeight);
    }
  }

  /**
   * Apply quality settings based on performance
   */
  applyQualitySettings(qualityLevel, config) {
    const qualityConfigs = {
      high: {
        particleCount: Math.min(this.config.particleCount, config.maxParticles || 1000),
        connectionLines: this.config.connectionLines
      },
      medium: {
        particleCount: Math.min(this.config.particleCount, config.maxParticles || 500),
        connectionLines: false
      },
      low: {
        particleCount: Math.min(this.config.particleCount, config.maxParticles || 200),
        connectionLines: false
      }
    };
    
    const newConfig = qualityConfigs[qualityLevel];
    
    // Update particle count if needed
    if (newConfig.particleCount !== this.particles.length) {
      this.updateParticleCount(newConfig.particleCount);
    }
    
    // Update other settings
    Object.assign(this.config, newConfig);
    
    // Handle connection lines based on quality
    if (newConfig.connectionLines !== undefined) {
      this.toggleConnectionLines(newConfig.connectionLines);
    }
  }

  /**
   * Update particle count dynamically
   */
  updateParticleCount(newCount) {
    if (newCount > this.particles.length) {
      // Add particles
      while (this.particles.length < newCount) {
        this.particles.push(this.createParticle());
      }
    } else if (newCount < this.particles.length) {
      // Remove particles
      this.particles.splice(newCount);
    }
  }

  /**
   * Toggle connection lines on/off
   */
  toggleConnectionLines(enabled) {
    if (enabled && !this.connectionLines && this.gl) {
      this.initializeConnectionLines();
    } else if (!enabled && this.connectionLines) {
      this.connectionLines.destroy();
      this.connectionLines = null;
    }
    this.config.connectionLines = enabled;
  }

  /**
   * Update connection lines configuration
   */
  updateConnectionConfig(config) {
    if (this.connectionLines) {
      this.connectionLines.updateConfig(config);
    }
    
    // Update local config
    if (config.connectionDistance !== undefined) {
      this.config.connectionDistance = config.connectionDistance;
    }
    if (config.connectionOpacity !== undefined) {
      this.config.connectionOpacity = config.connectionOpacity;
    }
    if (config.maxConnections !== undefined) {
      this.config.maxConnections = config.maxConnections;
    }
  }

  /**
   * Get connection lines metrics
   */
  getConnectionMetrics() {
    return this.connectionLines ? this.connectionLines.getMetrics() : null;
  }

  /**
   * Convert hex color to RGB
   */
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 56, g: 75, b: 255 }; // Default to #384bff
  }

  /**
   * Fallback to Canvas 2D if WebGL fails
   */
  fallbackToCanvas2D() {
    console.warn('Falling back to Canvas 2D rendering');
    // This would implement a 2D canvas fallback
    // For now, we'll just disable the system
    this.isRunning = false;
  }

  /**
   * Notify loading system about particle system state changes
   * @param {string} systemName - Name of the system
   * @param {string} state - State change ('started', 'completed', 'failed')
   */
  notifyLoadingSystem(systemName, state) {
    try {
      // Check if LoadingManager is available
      if (typeof window !== 'undefined' && window.LoadingManager) {
        if (state === 'completed') {
          window.LoadingManager.markAnimationSystemLoaded(systemName);
        }
      }
      
      // Also check for ProgressTracker directly
      if (typeof window !== 'undefined' && window.progressTracker) {
        if (state === 'completed') {
          window.progressTracker.markAnimationSystemLoaded(systemName);
        }
      }
    } catch (error) {
      console.warn('Failed to notify loading system:', error);
    }
  }

  /**
   * Cleanup resources
   */
  destroy() {
    this.stop();
    
    if (this.gl) {
      // Delete buffers
      Object.values(this.buffers).forEach(buffer => {
        if (buffer) this.gl.deleteBuffer(buffer);
      });
      
      // Delete program
      if (this.program) {
        this.gl.deleteProgram(this.program);
      }
    }
    
    // Destroy connection lines
    if (this.connectionLines) {
      this.connectionLines.destroy();
      this.connectionLines = null;
    }
    
    this.particles = [];
    this.gl = null;
    
    console.log('ParticleSystem destroyed');
  }
}

export default ParticleSystem;