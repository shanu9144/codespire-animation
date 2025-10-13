/**
 * Interactive Particle Field
 * Manages particle interactions with mouse and scroll events
 */

import ParticleSystem from './ParticleSystem.js';
import AnimationEngine from '../core/AnimationEngine.js';

class ParticleField {
  constructor(container, config = {}) {
    this.container = container;
    this.canvas = null;
    this.particleSystem = null;
    this.isInitialized = false;
    
    // Configuration
    this.config = {
      // Particle settings
      particleCount: 500,
      particleSize: { min: 1, max: 4 },
      speed: { min: 0.5, max: 2.0 },
      color: '#384bff',
      opacity: { min: 0.3, max: 0.8 },
      
      // Interaction settings
      mouseInteraction: true,
      mouseInfluenceRadius: 150,
      mouseForceStrength: 2.0,
      scrollParallax: true,
      parallaxStrength: 0.5,
      
      // Connection lines
      connectionLines: false,
      connectionDistance: 100,
      connectionOpacity: 0.2,
      maxConnections: 500,
      
      // Performance
      adaptiveQuality: true,
      maxFPS: 60,
      
      ...config
    };
    
    // Event tracking
    this.mousePosition = { x: 0, y: 0 };
    this.lastScrollY = 0;
    this.scrollVelocity = 0;
    
    // Animation state
    this.animationId = null;
    this.lastFrameTime = 0;
    this.isRunning = false;
    
    // Event listeners
    this.boundHandlers = {
      mouseMove: this.handleMouseMove.bind(this),
      scroll: this.handleScroll.bind(this),
      resize: this.handleResize.bind(this),
      visibilityChange: this.handleVisibilityChange.bind(this)
    };
    
    this.initialize();
  }

  /**
   * Initialize the particle field
   */
  initialize() {
    try {
      // Create canvas
      this.createCanvas();
      
      // Create particle system
      this.particleSystem = new ParticleSystem(this.canvas, this.config);
      
      // Set up event listeners
      this.setupEventListeners();
      
      // Register with animation engine
      this.registerWithEngine();
      
      // Start animation loop
      this.start();
      
      this.isInitialized = true;
      console.log('ParticleField initialized');
      
    } catch (error) {
      console.error('Failed to initialize ParticleField:', error);
      this.handleInitializationError(error);
    }
  }

  /**
   * Create canvas element
   */
  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    `;
    
    // Set initial size
    this.updateCanvasSize();
    
    // Add to container
    this.container.appendChild(this.canvas);
  }

  /**
   * Update canvas size to match container
   */
  updateCanvasSize() {
    const rect = this.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // Set display size
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
    
    // Set actual size for high DPI displays
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    // Scale context for high DPI
    const ctx = this.canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Mouse events
    if (this.config.mouseInteraction) {
      document.addEventListener('mousemove', this.boundHandlers.mouseMove, { passive: true });
    }
    
    // Scroll events
    if (this.config.scrollParallax) {
      window.addEventListener('scroll', this.boundHandlers.scroll, { passive: true });
    }
    
    // Resize events
    window.addEventListener('resize', this.boundHandlers.resize, { passive: true });
    
    // Visibility change for performance
    document.addEventListener('visibilitychange', this.boundHandlers.visibilityChange);
  }

  /**
   * Register with animation engine
   */
  registerWithEngine() {
    const animationConfig = {
      id: 'particle-field-' + Date.now(),
      type: 'particle',
      update: this.update.bind(this),
      play: this.play.bind(this),
      pause: this.pause.bind(this),
      stop: this.stop.bind(this),
      applyQualitySettings: this.applyQualitySettings.bind(this),
      onConfigUpdate: this.onConfigUpdate.bind(this),
      essential: false // Can be paused for performance
    };
    
    AnimationEngine.registerAnimation(animationConfig.id, animationConfig);
    this.animationId = animationConfig.id;
  }

  /**
   * Handle mouse movement
   */
  handleMouseMove(event) {
    if (!this.isRunning) return;
    
    const rect = this.container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Check if mouse is over container
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      this.mousePosition.x = x;
      this.mousePosition.y = y;
      
      // Update particle system
      if (this.particleSystem) {
        this.particleSystem.handleMouseMove(x, y);
      }
    }
  }

  /**
   * Handle scroll events with enhanced tracking
   */
  handleScroll(event) {
    if (!this.isRunning) return;
    
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    const currentScrollX = window.pageXOffset || document.documentElement.scrollLeft;
    
    // Calculate scroll velocity
    this.scrollVelocity = currentScrollY - this.lastScrollY;
    this.lastScrollY = currentScrollY;
    
    // Update particle system with both X and Y scroll
    if (this.particleSystem) {
      this.particleSystem.handleScroll(currentScrollY);
      
      // Also update the scroll parallax system directly if available
      if (this.particleSystem.scrollParallax) {
        const deltaTime = performance.now() - (this.lastFrameTime || performance.now());
        this.particleSystem.scrollParallax.updateScroll(currentScrollX, currentScrollY, deltaTime);
      }
    }
  }

  /**
   * Handle window resize
   */
  handleResize() {
    if (!this.canvas) return;
    
    // Debounce resize events
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.updateCanvasSize();
      
      if (this.particleSystem) {
        this.particleSystem.resize();
      }
    }, 100);
  }

  /**
   * Handle visibility change for performance
   */
  handleVisibilityChange() {
    if (document.hidden) {
      this.pause();
    } else {
      this.play();
    }
  }

  /**
   * Update animation frame
   */
  update(deltaTime) {
    if (!this.isRunning || !this.particleSystem) return;
    
    // Update particle system
    this.particleSystem.update(deltaTime);
    
    // Render particles (connection lines are now rendered within the particle system)
    this.particleSystem.render();
  }



  /**
   * Start particle field animation
   */
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    
    if (this.particleSystem) {
      this.particleSystem.play();
    }
    
    // Start with animation engine if available
    if (this.animationId && AnimationEngine.isInitialized) {
      AnimationEngine.playAnimation(this.animationId);
    }
  }

  /**
   * Play animation (Animation Engine interface)
   */
  play() {
    this.start();
    return Promise.resolve();
  }

  /**
   * Pause particle field animation
   */
  pause() {
    this.isRunning = false;
    
    if (this.particleSystem) {
      this.particleSystem.pause();
    }
  }

  /**
   * Stop particle field animation
   */
  stop() {
    this.isRunning = false;
    
    if (this.particleSystem) {
      this.particleSystem.stop();
    }
  }

  /**
   * Apply quality settings for performance optimization
   */
  applyQualitySettings(qualityLevel, engineConfig) {
    if (!this.particleSystem) return;
    
    // Update local config based on quality
    const qualityConfigs = {
      high: {
        particleCount: Math.min(this.config.particleCount, engineConfig.maxParticles || 1000),
        connectionLines: this.config.connectionLines,
        mouseInteraction: this.config.mouseInteraction,
        scrollParallax: this.config.scrollParallax
      },
      medium: {
        particleCount: Math.min(this.config.particleCount, engineConfig.maxParticles || 500),
        connectionLines: false,
        mouseInteraction: this.config.mouseInteraction,
        scrollParallax: this.config.scrollParallax
      },
      low: {
        particleCount: Math.min(this.config.particleCount, engineConfig.maxParticles || 200),
        connectionLines: false,
        mouseInteraction: false,
        scrollParallax: false
      }
    };
    
    const newConfig = qualityConfigs[qualityLevel];
    Object.assign(this.config, newConfig);
    
    // Apply to particle system
    this.particleSystem.applyQualitySettings(qualityLevel, engineConfig);
    
    console.log(`ParticleField quality set to: ${qualityLevel}`);
  }

  /**
   * Handle configuration updates
   */
  onConfigUpdate(newConfig) {
    Object.assign(this.config, newConfig);
    
    if (this.particleSystem) {
      // Update particle system config
      Object.assign(this.particleSystem.config, newConfig);
    }
  }

  /**
   * Update configuration
   */
  updateConfig(updates) {
    Object.assign(this.config, updates);
    this.onConfigUpdate(updates);
  }

  /**
   * Get current particle count
   */
  getParticleCount() {
    return this.particleSystem ? this.particleSystem.particles.length : 0;
  }

  /**
   * Toggle connection lines
   */
  toggleConnectionLines(enabled) {
    this.config.connectionLines = enabled;
    if (this.particleSystem) {
      this.particleSystem.toggleConnectionLines(enabled);
    }
  }

  /**
   * Update connection lines configuration
   */
  updateConnectionConfig(config) {
    Object.assign(this.config, config);
    if (this.particleSystem) {
      this.particleSystem.updateConnectionConfig(config);
    }
  }

  /**
   * Get connection lines metrics
   */
  getConnectionMetrics() {
    return this.particleSystem ? this.particleSystem.getConnectionMetrics() : null;
  }

  /**
   * Get performance metrics
   */
  getMetrics() {
    const baseMetrics = {
      particleCount: this.getParticleCount(),
      isRunning: this.isRunning,
      mousePosition: { ...this.mousePosition },
      scrollVelocity: this.scrollVelocity,
      config: { ...this.config }
    };
    
    // Add connection metrics if available
    const connectionMetrics = this.getConnectionMetrics();
    if (connectionMetrics) {
      baseMetrics.connections = connectionMetrics;
    }
    
    return baseMetrics;
  }

  /**
   * Handle initialization errors
   */
  handleInitializationError(error) {
    console.warn('ParticleField initialization failed, using fallback');
    
    // Create a simple CSS animation fallback
    this.createFallbackAnimation();
  }

  /**
   * Create fallback animation using CSS
   */
  createFallbackAnimation() {
    const fallbackDiv = document.createElement('div');
    fallbackDiv.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 50% 50%, 
        rgba(56, 75, 255, 0.1) 0%, 
        rgba(56, 75, 255, 0.05) 50%, 
        transparent 100%);
      animation: pulse 4s ease-in-out infinite;
      pointer-events: none;
      z-index: 1;
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.05); }
      }
    `;
    document.head.appendChild(style);
    
    this.container.appendChild(fallbackDiv);
    this.fallbackElement = fallbackDiv;
  }

  /**
   * Remove event listeners
   */
  removeEventListeners() {
    document.removeEventListener('mousemove', this.boundHandlers.mouseMove);
    window.removeEventListener('scroll', this.boundHandlers.scroll);
    window.removeEventListener('resize', this.boundHandlers.resize);
    document.removeEventListener('visibilitychange', this.boundHandlers.visibilityChange);
  }

  /**
   * Cleanup and destroy
   */
  destroy() {
    // Stop animation
    this.stop();
    
    // Remove event listeners
    this.removeEventListeners();
    
    // Clear timeouts
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    
    // Destroy particle system
    if (this.particleSystem) {
      this.particleSystem.destroy();
      this.particleSystem = null;
    }
    
    // Remove canvas
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
      this.canvas = null;
    }
    
    // Remove fallback element
    if (this.fallbackElement && this.fallbackElement.parentNode) {
      this.fallbackElement.parentNode.removeChild(this.fallbackElement);
      this.fallbackElement = null;
    }
    
    this.isInitialized = false;
    console.log('ParticleField destroyed');
  }
}

export default ParticleField;