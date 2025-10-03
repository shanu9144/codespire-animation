/**
 * ProgressTracker
 * Tracks actual resource loading progress and calculates weighted progress
 */

class ProgressTracker {
  constructor(config) {
    this.config = config;
    this.isTracking = false;
    
    // Resource tracking
    this.resources = new Map(); // resourceUrl -> { weight, type, loaded, loadTime }
    this.animationSystems = new Map(); // systemName -> { weight, loaded, loadTime }
    
    // Progress calculation
    this.totalWeight = 0;
    this.loadedWeight = 0;
    this.lastProgress = 0;
    
    // Event callbacks
    this.callbacks = {
      progressUpdate: [],
      error: []
    };
    
    // Resource monitoring
    this.resourceObserver = null;
    this.fontObserver = null;
    this.imageObserver = null;
    this.originalGetContext = null;
    
    // Performance tracking
    this.startTime = null;
    this.progressHistory = [];
    
    // Make this instance globally accessible for hooks
    if (typeof window !== 'undefined') {
      window.progressTracker = this;
    }
  }

  /**
   * Start tracking resources
   */
  startTracking() {
    if (this.isTracking) {
      console.warn('ProgressTracker already tracking');
      return;
    }

    this.isTracking = true;
    this.startTime = performance.now();
    this.progressHistory = [];

    // Start monitoring different resource types
    this.startCriticalResourceTracking();
    this.startFontTracking();
    this.startImageTracking();
    this.startAnimationSystemTracking();
    
    console.log('ProgressTracker started');
  }

  /**
   * Stop tracking resources
   */
  stopTracking() {
    if (!this.isTracking) return;

    this.isTracking = false;
    
    // Clean up observers
    this.cleanupObservers();
    
    console.log('ProgressTracker stopped');
  }

  /**
   * Track a specific resource
   * @param {string} resourceUrl - URL of the resource
   * @param {number} weight - Weight of the resource (0-1)
   * @param {string} type - Type of resource
   */
  trackResource(resourceUrl, weight, type) {
    if (this.resources.has(resourceUrl)) {
      console.warn(`Resource ${resourceUrl} already being tracked`);
      return;
    }

    const resource = {
      url: resourceUrl,
      weight,
      type,
      loaded: false,
      loadTime: null,
      error: null
    };

    this.resources.set(resourceUrl, resource);
    this.totalWeight += weight;
    
    // Start monitoring this specific resource
    this.monitorResource(resource);
    
    console.log(`Tracking resource: ${resourceUrl} (weight: ${weight}, type: ${type})`);
  }

  /**
   * Track an animation system
   * @param {string} systemName - Name of the animation system
   * @param {number} weight - Weight of the system
   */
  trackAnimationSystem(systemName, weight) {
    if (this.animationSystems.has(systemName)) {
      console.warn(`Animation system ${systemName} already being tracked`);
      return;
    }

    const system = {
      name: systemName,
      weight,
      loaded: false,
      loadTime: null,
      error: null
    };

    this.animationSystems.set(systemName, system);
    this.totalWeight += weight;
    
    console.log(`Tracking animation system: ${systemName} (weight: ${weight})`);
  }

  /**
   * Mark a resource as loaded
   * @param {string} resourceUrl - URL of the loaded resource
   * @param {boolean} forceLoad - Force mark as loaded even if failed
   */
  markResourceLoaded(resourceUrl, forceLoad = false) {
    const resource = this.resources.get(resourceUrl);
    if (!resource) {
      console.warn(`Resource ${resourceUrl} not found in tracking`);
      return;
    }

    if (resource.loaded) {
      console.warn(`Resource ${resourceUrl} already marked as loaded`);
      return;
    }

    resource.loaded = true;
    resource.loadTime = performance.now() - this.startTime;
    resource.forceLoaded = forceLoad;
    this.loadedWeight += resource.weight;
    
    if (forceLoad) {
      console.log(`Resource force-loaded: ${resourceUrl} (${resource.loadTime.toFixed(2)}ms)`);
    } else {
      console.log(`Resource loaded: ${resourceUrl} (${resource.loadTime.toFixed(2)}ms)`);
    }
    
    this.updateProgress();
  }

  /**
   * Mark an animation system as loaded
   * @param {string} systemName - Name of the loaded animation system
   */
  markAnimationSystemLoaded(systemName) {
    const system = this.animationSystems.get(systemName);
    if (!system) {
      console.warn(`Animation system ${systemName} not found in tracking`);
      return;
    }

    if (system.loaded) {
      console.warn(`Animation system ${systemName} already marked as loaded`);
      return;
    }

    system.loaded = true;
    system.loadTime = performance.now() - this.startTime;
    this.loadedWeight += system.weight;
    
    console.log(`Animation system loaded: ${systemName} (${system.loadTime.toFixed(2)}ms)`);
    
    this.updateProgress();
  }

  /**
   * Start tracking critical resources (HTML, CSS, JS)
   */
  startCriticalResourceTracking() {
    // Track stylesheets
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    stylesheets.forEach(link => {
      if (!link.href) return;
      
      const weight = this.config.resourceWeights.critical / stylesheets.length;
      this.trackResource(link.href, weight, 'critical');
    });

    // Track scripts
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
      if (!script.src) return;
      
      const weight = this.config.resourceWeights.critical / scripts.length;
      this.trackResource(script.src, weight, 'critical');
    });

    // Track the document itself
    if (document.readyState !== 'complete') {
      this.trackResource(window.location.href, this.config.resourceWeights.critical * 0.3, 'critical');
      
      document.addEventListener('DOMContentLoaded', () => {
        this.markResourceLoaded(window.location.href);
      });
    } else {
      // Document already loaded
      this.trackResource(window.location.href, this.config.resourceWeights.critical * 0.3, 'critical');
      setTimeout(() => this.markResourceLoaded(window.location.href), 0);
    }
  }

  /**
   * Start tracking font loading
   */
  startFontTracking() {
    if (!document.fonts) {
      console.warn('Font loading API not supported');
      return;
    }

    // Get all font faces
    const fontFaces = Array.from(document.fonts);
    
    if (fontFaces.length === 0) {
      console.log('No fonts to track');
      return;
    }

    const fontWeight = this.config.resourceWeights.fonts / fontFaces.length;
    
    fontFaces.forEach(fontFace => {
      const fontId = `${fontFace.family}-${fontFace.weight}-${fontFace.style}`;
      this.trackResource(fontId, fontWeight, 'fonts');
      
      // Check if font is already loaded
      if (fontFace.status === 'loaded') {
        setTimeout(() => this.markResourceLoaded(fontId), 0);
      } else {
        // Wait for font to load
        fontFace.load().then(() => {
          this.markResourceLoaded(fontId);
        }).catch(error => {
          console.warn(`Font loading failed: ${fontId}`, error);
          this.markResourceLoaded(fontId); // Mark as loaded to prevent hanging
        });
      }
    });

    // Also listen for all fonts loaded
    document.fonts.ready.then(() => {
      console.log('All fonts loaded');
    });
  }

  /**
   * Start tracking image loading
   */
  startImageTracking() {
    // Track images that are critical for initial render
    const images = document.querySelectorAll('img[data-loading-critical]');
    
    if (images.length === 0) {
      console.log('No critical images to track');
      return;
    }

    const imageWeight = this.config.resourceWeights.images / images.length;
    
    images.forEach(img => {
      if (!img.src) return;
      
      this.trackResource(img.src, imageWeight, 'images');
      
      if (img.complete && img.naturalWidth > 0) {
        // Image already loaded
        setTimeout(() => this.markResourceLoaded(img.src), 0);
      } else {
        // Wait for image to load
        img.addEventListener('load', () => {
          this.markResourceLoaded(img.src);
        });
        
        img.addEventListener('error', () => {
          console.warn(`Image loading failed: ${img.src}`);
          this.markResourceLoaded(img.src); // Mark as loaded to prevent hanging
        });
      }
    });
  }

  /**
   * Start tracking animation system initialization
   */
  startAnimationSystemTracking() {
    // Track core animation systems with appropriate weights
    const animationWeight = this.config.resourceWeights.animations;
    
    // Track AnimationEngine initialization
    this.trackAnimationSystem('AnimationEngine', animationWeight * 0.3);
    
    // Track WebGL context creation
    this.trackAnimationSystem('WebGLContext', animationWeight * 0.2);
    
    // Track shader compilation
    this.trackAnimationSystem('ShaderCompilation', animationWeight * 0.2);
    
    // Track 3D scene setup
    this.trackAnimationSystem('Scene3D', animationWeight * 0.15);
    
    // Track particle system initialization
    this.trackAnimationSystem('ParticleSystem', animationWeight * 0.15);
    
    // Set up integration hooks with animation systems
    this.setupAnimationSystemHooks();
    
    console.log('Animation system tracking initialized');
  }

  /**
   * Set up hooks to monitor animation system initialization
   */
  setupAnimationSystemHooks() {
    // Hook into AnimationEngine initialization
    this.hookAnimationEngine();
    
    // Hook into WebGL context creation
    this.hookWebGLContext();
    
    // Hook into shader compilation
    this.hookShaderCompilation();
    
    // Hook into 3D scene initialization
    this.hookScene3D();
    
    // Hook into particle system initialization
    this.hookParticleSystem();
  }

  /**
   * Hook into AnimationEngine initialization
   */
  hookAnimationEngine() {
    // Check if AnimationEngine is already available
    if (typeof window !== 'undefined' && window.AnimationEngine) {
      this.monitorAnimationEngine(window.AnimationEngine);
    } else {
      // Wait for AnimationEngine to be loaded
      const checkAnimationEngine = () => {
        if (typeof window !== 'undefined' && window.AnimationEngine) {
          this.monitorAnimationEngine(window.AnimationEngine);
        } else {
          setTimeout(checkAnimationEngine, 100);
        }
      };
      checkAnimationEngine();
    }
  }

  /**
   * Monitor AnimationEngine initialization
   */
  monitorAnimationEngine(animationEngine) {
    // Check if already initialized
    if (animationEngine.isInitialized) {
      this.markAnimationSystemLoaded('AnimationEngine');
      return;
    }

    // Hook into the initialize method
    const originalInitialize = animationEngine.initialize;
    animationEngine.initialize = async (...args) => {
      try {
        const result = await originalInitialize.apply(animationEngine, args);
        this.markAnimationSystemLoaded('AnimationEngine');
        return result;
      } catch (error) {
        console.warn('AnimationEngine initialization failed:', error);
        this.markAnimationSystemLoaded('AnimationEngine'); // Mark as loaded to prevent hanging
        throw error;
      }
    };
  }

  /**
   * Hook into WebGL context creation
   */
  hookWebGLContext() {
    // Monitor canvas elements for WebGL context creation
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    let webglContextCreated = false;
    
    HTMLCanvasElement.prototype.getContext = function(contextType, ...args) {
      const context = originalGetContext.call(this, contextType, ...args);
      
      // Check if this is a WebGL context and we haven't tracked it yet
      if (!webglContextCreated && context && 
          (contextType === 'webgl' || contextType === 'webgl2' || contextType === 'experimental-webgl')) {
        webglContextCreated = true;
        
        // Mark WebGL context as created after a short delay to allow for setup
        setTimeout(() => {
          if (window.progressTracker) {
            window.progressTracker.markAnimationSystemLoaded('WebGLContext');
          }
        }, 50);
      }
      
      return context;
    };
    
    // Store reference for cleanup
    this.originalGetContext = originalGetContext;
  }

  /**
   * Hook into shader compilation
   */
  hookShaderCompilation() {
    // Track shader compilation through WebGL context
    let shaderCompilationCount = 0;
    let expectedShaderCount = 4; // Estimate based on typical usage
    
    // Hook into WebGL shader creation
    const hookWebGLShaders = (gl) => {
      if (gl._shaderHooked) return;
      gl._shaderHooked = true;
      
      const originalCompileShader = gl.compileShader;
      gl.compileShader = function(shader) {
        const result = originalCompileShader.call(this, shader);
        
        shaderCompilationCount++;
        
        // Check if we've compiled enough shaders
        if (shaderCompilationCount >= expectedShaderCount) {
          setTimeout(() => {
            if (window.progressTracker) {
              window.progressTracker.markAnimationSystemLoaded('ShaderCompilation');
            }
          }, 10);
        }
        
        return result;
      };
    };

    // Monitor for WebGL contexts and hook them
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(contextType, ...args) {
      const context = originalGetContext.call(this, contextType, ...args);
      
      if (context && (contextType === 'webgl' || contextType === 'webgl2' || contextType === 'experimental-webgl')) {
        hookWebGLShaders(context);
      }
      
      return context;
    };
  }

  /**
   * Hook into 3D scene initialization
   */
  hookScene3D() {
    // Monitor for React Three Fiber Canvas mounting
    const checkForThreeJS = () => {
      // Check if Three.js is loaded
      if (typeof window !== 'undefined' && window.THREE) {
        // Hook into WebGLRenderer creation
        const originalWebGLRenderer = window.THREE.WebGLRenderer;
        if (originalWebGLRenderer && !originalWebGLRenderer._hooked) {
          originalWebGLRenderer._hooked = true;
          
          window.THREE.WebGLRenderer = function(...args) {
            const renderer = new originalWebGLRenderer(...args);
            
            // Mark Scene3D as loaded after renderer is created
            setTimeout(() => {
              if (window.progressTracker) {
                window.progressTracker.markAnimationSystemLoaded('Scene3D');
              }
            }, 100);
            
            return renderer;
          };
          
          // Copy static properties
          Object.setPrototypeOf(window.THREE.WebGLRenderer, originalWebGLRenderer);
          Object.assign(window.THREE.WebGLRenderer, originalWebGLRenderer);
        }
      } else {
        // Check again later
        setTimeout(checkForThreeJS, 200);
      }
    };
    
    checkForThreeJS();
  }

  /**
   * Hook into particle system initialization
   */
  hookParticleSystem() {
    // Monitor for ParticleSystem class instantiation
    const checkForParticleSystem = () => {
      if (typeof window !== 'undefined' && window.ParticleSystem) {
        this.monitorParticleSystem(window.ParticleSystem);
      } else {
        setTimeout(checkForParticleSystem, 150);
      }
    };
    
    checkForParticleSystem();
  }

  /**
   * Monitor ParticleSystem initialization
   */
  monitorParticleSystem(ParticleSystemClass) {
    // Hook into the constructor
    const originalConstructor = ParticleSystemClass;
    
    window.ParticleSystem = function(...args) {
      const instance = new originalConstructor(...args);
      
      // Hook into the initialize method if it exists
      if (instance.initialize) {
        const originalInitialize = instance.initialize;
        instance.initialize = function(...initArgs) {
          try {
            const result = originalInitialize.apply(this, initArgs);
            
            // Mark as loaded after initialization
            setTimeout(() => {
              if (window.progressTracker) {
                window.progressTracker.markAnimationSystemLoaded('ParticleSystem');
              }
            }, 50);
            
            return result;
          } catch (error) {
            console.warn('ParticleSystem initialization failed:', error);
            if (window.progressTracker) {
              window.progressTracker.markAnimationSystemLoaded('ParticleSystem');
            }
            throw error;
          }
        };
      } else {
        // If no initialize method, mark as loaded after construction
        setTimeout(() => {
          if (window.progressTracker) {
            window.progressTracker.markAnimationSystemLoaded('ParticleSystem');
          }
        }, 50);
      }
      
      return instance;
    };
    
    // Copy prototype and static properties
    window.ParticleSystem.prototype = originalConstructor.prototype;
    Object.assign(window.ParticleSystem, originalConstructor);
  }

  /**
   * Monitor a specific resource
   * @param {Object} resource - Resource object
   */
  monitorResource(resource) {
    // For most resources, we rely on manual marking
    // This method can be extended for more sophisticated monitoring
    
    if (resource.type === 'critical') {
      // For critical resources, set up timeout fallback
      setTimeout(() => {
        if (!resource.loaded) {
          console.warn(`Resource timeout: ${resource.url}`);
          this.markResourceLoaded(resource.url);
        }
      }, this.config.maximumLoadingTime * 0.8); // 80% of max loading time
    }
  }

  /**
   * Update progress calculation
   */
  updateProgress() {
    if (this.totalWeight === 0) {
      this.notifyProgressUpdate(100);
      return;
    }

    const rawProgress = (this.loadedWeight / this.totalWeight) * 100;
    
    // Apply smoothing to prevent jarring jumps
    const smoothedProgress = this.smoothProgress(rawProgress);
    
    // Record progress history
    this.progressHistory.push({
      time: performance.now() - this.startTime,
      progress: smoothedProgress,
      rawProgress
    });

    this.lastProgress = smoothedProgress;
    this.notifyProgressUpdate(smoothedProgress);
  }

  /**
   * Apply smoothing to progress updates
   * @param {number} rawProgress - Raw progress value
   * @returns {number} Smoothed progress value
   */
  smoothProgress(rawProgress) {
    // Don't smooth if this is the first update
    if (this.progressHistory.length === 0) {
      return rawProgress;
    }

    // Limit progress jumps to prevent jarring updates
    const maxJump = 10; // Maximum 10% jump per update
    const diff = rawProgress - this.lastProgress;
    
    if (Math.abs(diff) > maxJump) {
      return this.lastProgress + (diff > 0 ? maxJump : -maxJump);
    }

    return rawProgress;
  }

  /**
   * Get detailed progress breakdown
   * @returns {Object} Progress breakdown by resource type
   */
  getProgressBreakdown() {
    const breakdown = {
      critical: { loaded: 0, total: 0, progress: 0 },
      animations: { loaded: 0, total: 0, progress: 0 },
      fonts: { loaded: 0, total: 0, progress: 0 },
      images: { loaded: 0, total: 0, progress: 0 }
    };

    // Calculate resource progress
    this.resources.forEach(resource => {
      const type = resource.type;
      if (breakdown[type]) {
        breakdown[type].total += resource.weight;
        if (resource.loaded) {
          breakdown[type].loaded += resource.weight;
        }
      }
    });

    // Calculate animation system progress
    this.animationSystems.forEach(system => {
      breakdown.animations.total += system.weight;
      if (system.loaded) {
        breakdown.animations.loaded += system.weight;
      }
    });

    // Calculate percentages
    Object.keys(breakdown).forEach(type => {
      const data = breakdown[type];
      data.progress = data.total > 0 ? (data.loaded / data.total) * 100 : 100;
    });

    return breakdown;
  }

  /**
   * Get loading statistics
   * @returns {Object} Loading statistics
   */
  getStatistics() {
    const currentTime = performance.now() - this.startTime;
    
    return {
      totalResources: this.resources.size + this.animationSystems.size,
      loadedResources: Array.from(this.resources.values()).filter(r => r.loaded).length +
                      Array.from(this.animationSystems.values()).filter(s => s.loaded).length,
      totalWeight: this.totalWeight,
      loadedWeight: this.loadedWeight,
      currentProgress: this.lastProgress,
      elapsedTime: currentTime,
      progressHistory: this.progressHistory,
      breakdown: this.getProgressBreakdown()
    };
  }

  /**
   * Register callback for progress updates
   * @param {Function} callback - Callback function
   */
  onProgressUpdate(callback) {
    this.callbacks.progressUpdate.push(callback);
  }

  /**
   * Register callback for errors
   * @param {Function} callback - Callback function
   */
  onError(callback) {
    this.callbacks.error.push(callback);
  }

  /**
   * Notify progress update callbacks
   * @param {number} progress - Current progress
   */
  notifyProgressUpdate(progress) {
    this.callbacks.progressUpdate.forEach(callback => {
      try {
        callback(progress);
      } catch (error) {
        console.error('Error in progress update callback:', error);
      }
    });
  }

  /**
   * Notify error callbacks
   * @param {Error} error - The error that occurred
   */
  notifyError(error) {
    this.callbacks.error.forEach(callback => {
      try {
        callback(error);
      } catch (error) {
        console.error('Error in error callback:', error);
      }
    });
  }

  /**
   * Clean up observers and event listeners
   */
  cleanupObservers() {
    // Clean up any observers or event listeners
    if (this.resourceObserver) {
      this.resourceObserver.disconnect();
      this.resourceObserver = null;
    }
    
    // Restore original getContext method if we hooked it
    if (this.originalGetContext) {
      HTMLCanvasElement.prototype.getContext = this.originalGetContext;
      this.originalGetContext = null;
    }
    
    // Clean up global references
    if (typeof window !== 'undefined') {
      delete window.progressTracker;
    }
  }

  /**
   * Reset the progress tracker
   */
  reset() {
    this.stopTracking();
    
    this.resources.clear();
    this.animationSystems.clear();
    this.totalWeight = 0;
    this.loadedWeight = 0;
    this.lastProgress = 0;
    this.progressHistory = [];
    this.startTime = null;
  }

  /**
   * Recalculate progress from current state
   */
  recalculateProgress() {
    this.updateProgress();
  }

  /**
   * Enter fallback mode for simplified tracking
   */
  enterFallbackMode() {
    console.log('ProgressTracker entering fallback mode');
    
    // Mark any unloaded resources as loaded to prevent blocking
    this.resources.forEach((resource, url) => {
      if (!resource.loaded) {
        this.markResourceLoaded(url, true);
      }
    });

    this.animationSystems.forEach((system, name) => {
      if (!system.loaded) {
        this.markAnimationSystemLoaded(name);
      }
    });
  }

  /**
   * Destroy the progress tracker
   */
  destroy() {
    this.reset();
    
    this.callbacks = {
      progressUpdate: [],
      error: []
    };
  }
}

export default ProgressTracker;