/**
 * AnimationSystemIntegration
 * Utility class to facilitate integration between loading system and animation systems
 */

class AnimationSystemIntegration {
  constructor() {
    this.integrationHooks = new Map();
    this.loadedSystems = new Set();
  }

  /**
   * Initialize integration hooks for animation systems
   */
  initialize() {
    // Set up hooks for different animation systems
    this.setupAnimationEngineHook();
    this.setupWebGLHooks();
    this.setupShaderHooks();
    this.setupScene3DHooks();
    this.setupParticleSystemHooks();
    
    console.log('AnimationSystemIntegration initialized');
  }

  /**
   * Set up AnimationEngine integration hook
   */
  setupAnimationEngineHook() {
    const checkAnimationEngine = () => {
      if (typeof window !== 'undefined' && window.AnimationEngine) {
        const engine = window.AnimationEngine;
        
        // Hook into initialization if not already done
        if (!engine._loadingHooked) {
          engine._loadingHooked = true;
          
          const originalInitialize = engine.initialize;
          engine.initialize = async (...args) => {
            this.notifySystemStarted('AnimationEngine');
            try {
              const result = await originalInitialize.apply(engine, args);
              this.notifySystemLoaded('AnimationEngine');
              return result;
            } catch (error) {
              this.notifySystemLoaded('AnimationEngine'); // Prevent hanging
              throw error;
            }
          };
        }
      } else {
        // Check again later
        setTimeout(checkAnimationEngine, 100);
      }
    };
    
    checkAnimationEngine();
  }

  /**
   * Set up WebGL context creation hooks
   */
  setupWebGLHooks() {
    if (typeof window === 'undefined') return;
    
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    let webglContextCreated = false;
    
    HTMLCanvasElement.prototype.getContext = function(contextType, ...args) {
      const context = originalGetContext.call(this, contextType, ...args);
      
      if (!webglContextCreated && context && 
          (contextType === 'webgl' || contextType === 'webgl2' || contextType === 'experimental-webgl')) {
        webglContextCreated = true;
        
        // Notify loading system
        setTimeout(() => {
          window.animationIntegration?.notifySystemLoaded('WebGLContext');
        }, 50);
      }
      
      return context;
    };
  }

  /**
   * Set up shader compilation hooks
   */
  setupShaderHooks() {
    // This will be handled by individual shader managers
    // We just need to track when enough shaders are compiled
    this.expectedShaderSystems = ['ShaderManager', 'ParticleShaders', 'FluidShaders'];
    this.compiledShaderSystems = new Set();
  }

  /**
   * Set up Scene3D hooks
   */
  setupScene3DHooks() {
    // Monitor for Three.js WebGLRenderer creation
    const checkThreeJS = () => {
      if (typeof window !== 'undefined' && window.THREE) {
        const originalRenderer = window.THREE.WebGLRenderer;
        
        if (originalRenderer && !originalRenderer._loadingHooked) {
          originalRenderer._loadingHooked = true;
          
          window.THREE.WebGLRenderer = function(...args) {
            const renderer = new originalRenderer(...args);
            
            // Notify Scene3D loaded
            setTimeout(() => {
              window.animationIntegration?.notifySystemLoaded('Scene3D');
            }, 100);
            
            return renderer;
          };
          
          // Preserve prototype and static properties
          Object.setPrototypeOf(window.THREE.WebGLRenderer, originalRenderer);
          Object.assign(window.THREE.WebGLRenderer, originalRenderer);
        }
      } else {
        setTimeout(checkThreeJS, 200);
      }
    };
    
    checkThreeJS();
  }

  /**
   * Set up ParticleSystem hooks
   */
  setupParticleSystemHooks() {
    const checkParticleSystem = () => {
      if (typeof window !== 'undefined' && window.ParticleSystem) {
        // ParticleSystem should handle its own notifications
        // This is just a fallback
        setTimeout(() => {
          if (!this.loadedSystems.has('ParticleSystem')) {
            this.notifySystemLoaded('ParticleSystem');
          }
        }, 2000);
      } else {
        setTimeout(checkParticleSystem, 200);
      }
    };
    
    checkParticleSystem();
  }

  /**
   * Notify that a system has started loading
   * @param {string} systemName - Name of the system
   */
  notifySystemStarted(systemName) {
    console.log(`Animation system started: ${systemName}`);
    
    // Could add progress tracking here if needed
  }

  /**
   * Notify that a system has finished loading
   * @param {string} systemName - Name of the system
   */
  notifySystemLoaded(systemName) {
    if (this.loadedSystems.has(systemName)) {
      return; // Already notified
    }
    
    this.loadedSystems.add(systemName);
    console.log(`Animation system loaded: ${systemName}`);
    
    // Notify LoadingManager
    try {
      if (typeof window !== 'undefined' && window.LoadingManager) {
        window.LoadingManager.markAnimationSystemLoaded(systemName);
      }
      
      if (typeof window !== 'undefined' && window.progressTracker) {
        window.progressTracker.markAnimationSystemLoaded(systemName);
      }
    } catch (error) {
      console.warn(`Failed to notify loading system about ${systemName}:`, error);
    }
  }

  /**
   * Check if all expected animation systems are loaded
   * @returns {boolean} True if all systems are loaded
   */
  areAllSystemsLoaded() {
    const expectedSystems = [
      'AnimationEngine',
      'WebGLContext', 
      'ShaderCompilation',
      'Scene3D',
      'ParticleSystem'
    ];
    
    return expectedSystems.every(system => this.loadedSystems.has(system));
  }

  /**
   * Get loading status of all systems
   * @returns {Object} Status of each system
   */
  getSystemStatus() {
    const systems = [
      'AnimationEngine',
      'WebGLContext',
      'ShaderCompilation', 
      'Scene3D',
      'ParticleSystem'
    ];
    
    const status = {};
    systems.forEach(system => {
      status[system] = this.loadedSystems.has(system);
    });
    
    return status;
  }

  /**
   * Force mark all systems as loaded (fallback)
   */
  forceCompleteAll() {
    const systems = [
      'AnimationEngine',
      'WebGLContext',
      'ShaderCompilation',
      'Scene3D', 
      'ParticleSystem'
    ];
    
    systems.forEach(system => {
      if (!this.loadedSystems.has(system)) {
        this.notifySystemLoaded(system);
      }
    });
  }

  /**
   * Clean up integration hooks
   */
  destroy() {
    this.integrationHooks.clear();
    this.loadedSystems.clear();
    
    // Clean up global reference
    if (typeof window !== 'undefined' && window.animationIntegration === this) {
      delete window.animationIntegration;
    }
  }
}

// Create and export singleton instance
const animationIntegration = new AnimationSystemIntegration();

// Make globally accessible
if (typeof window !== 'undefined') {
  window.animationIntegration = animationIntegration;
}

export default animationIntegration;