/**
 * Animation Engine
 * Central controller for managing all animation instances and performance
 */

import PerformanceManager from './PerformanceManager.js';
import DeviceCapabilities from './DeviceCapabilities.js';
import WebGLDetection from './WebGLDetection.js';

class AnimationEngine {
  constructor() {
    this.animations = new Map();
    this.activeAnimations = new Set();
    this.isInitialized = false;
    this.isPaused = false;
    this.config = null;
    
    this.animationFrame = null;
    this.lastUpdateTime = 0;
    
    // Animation types registry
    this.animationTypes = new Map();
    
    // Performance monitoring
    this.performanceCallbacks = [];
    
    // Cleanup tracking
    this.cleanupTasks = [];
  }

  /**
   * Initialize the animation engine
   * @param {Object} userConfig - User configuration overrides
   */
  async initialize(userConfig = {}) {
    if (this.isInitialized) {
      console.warn('AnimationEngine already initialized');
      return;
    }

    try {
      // Initialize performance monitoring first
      PerformanceManager.initialize();
      
      // Get device capabilities and create config
      this.config = this.createConfig(userConfig);
      
      // Set up performance monitoring callbacks
      this.setupPerformanceMonitoring();
      
      // Check for reduced motion preference
      if (DeviceCapabilities.prefersReducedMotion()) {
        this.config.respectReducedMotion = true;
        this.config.enableAnimations = false;
        console.log('Reduced motion detected - animations disabled');
      }
      
      // Initialize WebGL if needed
      if (this.config.enable3D || this.config.enableShaders) {
        const webglSupported = WebGLDetection.isWebGLSupported();
        if (!webglSupported) {
          console.warn('WebGL not supported - disabling 3D features');
          this.config.enable3D = false;
          this.config.enableShaders = false;
        }
      }
      
      // Start animation loop
      this.startAnimationLoop();
      
      this.isInitialized = true;
      console.log('AnimationEngine initialized with config:', this.config);
      
    } catch (error) {
      console.error('Failed to initialize AnimationEngine:', error);
      // Fallback to minimal config
      this.config = this.getFallbackConfig();
      this.isInitialized = true;
    }
  }

  /**
   * Create animation configuration
   * @param {Object} userConfig - User configuration overrides
   * @returns {Object} Final configuration
   */
  createConfig(userConfig) {
    // Get device-based configuration
    const deviceConfig = DeviceCapabilities.getAnimationConfig();
    
    // Default configuration
    const defaultConfig = {
      // Performance settings
      targetFPS: 60,
      adaptiveQuality: true,
      maxAnimations: 50,
      
      // Feature flags
      enableAnimations: true,
      enable3D: true,
      enableShaders: true,
      enablePostProcessing: false,
      enableParticles: true,
      
      // Visual settings
      primaryColor: '#384bff',
      secondaryColor: '#ffffff',
      particleOpacity: 0.8,
      animationSpeed: 1.0,
      
      // Accessibility
      respectReducedMotion: true,
      provideFallbacks: true,
      
      // Debug
      showPerformanceStats: false,
      enableDebugMode: false
    };

    // Merge configurations: default < device < user
    return {
      ...defaultConfig,
      ...deviceConfig,
      ...userConfig
    };
  }

  /**
   * Get fallback configuration for error cases
   * @returns {Object} Minimal safe configuration
   */
  getFallbackConfig() {
    return {
      enableAnimations: false,
      enable3D: false,
      enableShaders: false,
      enablePostProcessing: false,
      enableParticles: false,
      maxAnimations: 5,
      targetFPS: 30,
      respectReducedMotion: true,
      provideFallbacks: true
    };
  }

  /**
   * Setup performance monitoring callbacks
   */
  setupPerformanceMonitoring() {
    // Listen for quality changes
    PerformanceManager.onQualityChange((newLevel, previousLevel) => {
      this.handleQualityChange(newLevel, previousLevel);
    });

    // Listen for performance warnings
    PerformanceManager.onPerformanceWarning((type, value) => {
      this.handlePerformanceWarning(type, value);
    });
  }

  /**
   * Handle quality level changes
   * @param {string} newLevel - New quality level
   * @param {string} previousLevel - Previous quality level
   */
  handleQualityChange(newLevel, previousLevel) {
    console.log(`Quality changed: ${previousLevel} -> ${newLevel}`);
    
    // Update configuration based on new quality level
    const qualityConfigs = {
      high: {
        maxParticles: 1000,
        enablePostProcessing: this.config.enable3D,
        particleConnections: true,
        animationSpeed: 1.0
      },
      medium: {
        maxParticles: 500,
        enablePostProcessing: false,
        particleConnections: false,
        animationSpeed: 1.0
      },
      low: {
        maxParticles: 200,
        enablePostProcessing: false,
        particleConnections: false,
        animationSpeed: 0.8
      }
    };

    const newConfig = qualityConfigs[newLevel];
    Object.assign(this.config, newConfig);

    // Notify all active animations of quality change
    this.activeAnimations.forEach(animationId => {
      const animation = this.animations.get(animationId);
      if (animation && animation.onQualityChange) {
        animation.onQualityChange(newLevel, this.config);
      }
    });
  }

  /**
   * Handle performance warnings
   * @param {string} type - Warning type
   * @param {number} value - Associated value
   */
  handlePerformanceWarning(type, value) {
    console.warn(`Performance warning: ${type} - ${value}`);
    
    if (type === 'critical' || type === 'memory') {
      // Emergency performance measures
      this.pauseNonEssentialAnimations();
    }
  }

  /**
   * Register an animation type
   * @param {string} type - Animation type name
   * @param {Class} AnimationClass - Animation class constructor
   */
  registerAnimationType(type, AnimationClass) {
    this.animationTypes.set(type, AnimationClass);
  }

  /**
   * Register an animation instance
   * @param {string} id - Unique animation ID
   * @param {Object} animation - Animation instance
   */
  registerAnimation(id, animation) {
    if (this.animations.has(id)) {
      console.warn(`Animation with id "${id}" already exists`);
      return false;
    }

    // Validate animation object
    if (!this.validateAnimation(animation)) {
      console.error(`Invalid animation object for id "${id}"`);
      return false;
    }

    this.animations.set(id, animation);
    console.log(`Animation "${id}" registered`);
    return true;
  }

  /**
   * Validate animation object
   * @param {Object} animation - Animation to validate
   * @returns {boolean} True if valid
   */
  validateAnimation(animation) {
    return (
      animation &&
      typeof animation.update === 'function' &&
      typeof animation.play === 'function' &&
      typeof animation.pause === 'function' &&
      typeof animation.stop === 'function'
    );
  }

  /**
   * Play an animation
   * @param {string} id - Animation ID
   * @param {Object} options - Play options
   * @returns {Promise} Promise that resolves when animation completes
   */
  async playAnimation(id, options = {}) {
    if (!this.config.enableAnimations && !options.force) {
      console.log(`Animations disabled - skipping "${id}"`);
      return Promise.resolve();
    }

    const animation = this.animations.get(id);
    if (!animation) {
      console.error(`Animation "${id}" not found`);
      return Promise.reject(new Error(`Animation "${id}" not found`));
    }

    try {
      // Check if we're at animation limit
      if (this.activeAnimations.size >= this.config.maxAnimations && !options.priority) {
        console.warn(`Animation limit reached - skipping "${id}"`);
        return Promise.resolve();
      }

      this.activeAnimations.add(id);
      
      // Apply current quality settings
      if (animation.applyQualitySettings) {
        animation.applyQualitySettings(PerformanceManager.getQualityLevel(), this.config);
      }

      const result = await animation.play(options);
      return result;
      
    } catch (error) {
      console.error(`Error playing animation "${id}":`, error);
      this.activeAnimations.delete(id);
      throw error;
    }
  }

  /**
   * Pause an animation
   * @param {string} id - Animation ID
   */
  pauseAnimation(id) {
    const animation = this.animations.get(id);
    if (animation) {
      animation.pause();
      this.activeAnimations.delete(id);
    }
  }

  /**
   * Stop an animation
   * @param {string} id - Animation ID
   */
  stopAnimation(id) {
    const animation = this.animations.get(id);
    if (animation) {
      animation.stop();
      this.activeAnimations.delete(id);
    }
  }

  /**
   * Pause all animations
   */
  pauseAll() {
    this.isPaused = true;
    this.activeAnimations.forEach(id => {
      const animation = this.animations.get(id);
      if (animation) {
        animation.pause();
      }
    });
  }

  /**
   * Resume all animations
   */
  resumeAll() {
    this.isPaused = false;
    this.activeAnimations.forEach(id => {
      const animation = this.animations.get(id);
      if (animation && animation.resume) {
        animation.resume();
      }
    });
  }

  /**
   * Pause non-essential animations for performance
   */
  pauseNonEssentialAnimations() {
    this.activeAnimations.forEach(id => {
      const animation = this.animations.get(id);
      if (animation && !animation.essential) {
        animation.pause();
        this.activeAnimations.delete(id);
      }
    });
  }

  /**
   * Set performance mode
   * @param {string} mode - 'high', 'medium', or 'low'
   */
  setPerformanceMode(mode) {
    PerformanceManager.forceQualityLevel(mode);
  }

  /**
   * Get current configuration
   * @returns {Object} Current configuration
   */
  getConfig() {
    return { ...this.config };
  }

  /**
   * Update configuration
   * @param {Object} updates - Configuration updates
   */
  updateConfig(updates) {
    Object.assign(this.config, updates);
    
    // Notify active animations of config change
    this.activeAnimations.forEach(id => {
      const animation = this.animations.get(id);
      if (animation && animation.onConfigUpdate) {
        animation.onConfigUpdate(this.config);
      }
    });
  }

  /**
   * Start animation loop
   */
  startAnimationLoop() {
    if (this.animationFrame) return;
    
    this.lastUpdateTime = performance.now();
    this.updateLoop();
  }

  /**
   * Animation update loop
   */
  updateLoop() {
    if (!this.isInitialized || this.isPaused) {
      this.animationFrame = requestAnimationFrame(() => this.updateLoop());
      return;
    }

    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastUpdateTime;
    
    // Update active animations
    this.activeAnimations.forEach(id => {
      const animation = this.animations.get(id);
      if (animation && animation.update) {
        try {
          animation.update(deltaTime);
        } catch (error) {
          console.error(`Error updating animation "${id}":`, error);
          this.activeAnimations.delete(id);
        }
      }
    });

    this.lastUpdateTime = currentTime;
    this.animationFrame = requestAnimationFrame(() => this.updateLoop());
  }

  /**
   * Stop animation loop
   */
  stopAnimationLoop() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  /**
   * Get performance metrics
   * @returns {Object} Performance metrics
   */
  getMetrics() {
    return {
      ...PerformanceManager.getMetrics(),
      activeAnimations: this.activeAnimations.size,
      totalAnimations: this.animations.size,
      config: this.config
    };
  }

  /**
   * Add cleanup task
   * @param {Function} task - Cleanup function
   */
  addCleanupTask(task) {
    this.cleanupTasks.push(task);
  }

  /**
   * Cleanup and destroy engine
   */
  destroy() {
    // Stop all animations
    this.pauseAll();
    
    // Stop animation loop
    this.stopAnimationLoop();
    
    // Run cleanup tasks
    this.cleanupTasks.forEach(task => {
      try {
        task();
      } catch (error) {
        console.error('Error in cleanup task:', error);
      }
    });
    
    // Destroy performance manager
    PerformanceManager.destroy();
    
    // Clear all data
    this.animations.clear();
    this.activeAnimations.clear();
    this.animationTypes.clear();
    this.cleanupTasks = [];
    
    this.isInitialized = false;
    console.log('AnimationEngine destroyed');
  }
}

// Export singleton instance
export default new AnimationEngine();