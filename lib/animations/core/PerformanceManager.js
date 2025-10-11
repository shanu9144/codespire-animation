/**
 * Performance Manager
 * Monitors FPS, memory usage, and automatically adjusts animation quality
 */

import DeviceCapabilities from './DeviceCapabilities.js';

class PerformanceManager {
  constructor() {
    this.isMonitoring = false;
    this.frameCount = 0;
    this.lastTime = 0;
    this.fps = 60;
    this.frameTime = 16.67; // milliseconds
    this.fpsHistory = [];
    this.maxHistoryLength = 60; // 1 second at 60fps
    
    this.targetFPS = 60;
    this.minFPS = 30;
    this.qualityLevel = 'high';
    
    this.callbacks = {
      fpsUpdate: [],
      qualityChange: [],
      performanceWarning: []
    };
    
    this.memoryCheckInterval = null;
    this.lastMemoryCheck = 0;
    
    this.animationFrame = null;
    this.isInitialized = false;
  }

  /**
   * Initialize performance monitoring
   */
  initialize() {
    if (this.isInitialized) return;

    // Get initial configuration from device capabilities
    const config = DeviceCapabilities.getAnimationConfig();
    this.targetFPS = config.targetFPS;
    this.qualityLevel = DeviceCapabilities.getPerformanceLevel();
    
    // Start monitoring if not in reduced motion mode
    if (!DeviceCapabilities.prefersReducedMotion()) {
      this.startMonitoring();
    }

    // Set up memory monitoring
    this.setupMemoryMonitoring();
    
    this.isInitialized = true;
  }

  /**
   * Start FPS monitoring
   */
  startMonitoring() {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    this.lastTime = performance.now();
    this.frameCount = 0;
    this.fpsHistory = [];
    
    this.monitorFrame();
  }

  /**
   * Stop FPS monitoring
   */
  stopMonitoring() {
    this.isMonitoring = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  /**
   * Monitor frame performance
   */
  monitorFrame() {
    if (!this.isMonitoring) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    
    this.frameTime = deltaTime;
    this.frameCount++;
    
    // Calculate FPS every 10 frames for smoother updates
    if (this.frameCount % 10 === 0) {
      this.fps = 1000 / deltaTime;
      this.updateFPSHistory(this.fps);
      this.checkPerformance();
      this.notifyFPSUpdate();
    }
    
    this.lastTime = currentTime;
    this.animationFrame = requestAnimationFrame(() => this.monitorFrame());
  }

  /**
   * Update FPS history for trend analysis
   * @param {number} fps - Current FPS
   */
  updateFPSHistory(fps) {
    this.fpsHistory.push(fps);
    if (this.fpsHistory.length > this.maxHistoryLength) {
      this.fpsHistory.shift();
    }
  }

  /**
   * Get average FPS over recent history
   * @returns {number} Average FPS
   */
  getAverageFPS() {
    if (this.fpsHistory.length === 0) return this.fps;
    
    const sum = this.fpsHistory.reduce((a, b) => a + b, 0);
    return sum / this.fpsHistory.length;
  }

  /**
   * Check performance and adjust quality if needed
   */
  checkPerformance() {
    const avgFPS = this.getAverageFPS();
    const currentQuality = this.qualityLevel;
    
    // Performance is consistently poor
    if (avgFPS < this.minFPS && this.fpsHistory.length >= 30) {
      if (currentQuality === 'high') {
        this.setQualityLevel('medium');
      } else if (currentQuality === 'medium') {
        this.setQualityLevel('low');
      }
    }
    
    // Performance has recovered
    else if (avgFPS > this.targetFPS * 0.9 && this.fpsHistory.length >= 60) {
      if (currentQuality === 'low' && DeviceCapabilities.getPerformanceLevel() !== 'low') {
        this.setQualityLevel('medium');
      } else if (currentQuality === 'medium' && DeviceCapabilities.getPerformanceLevel() === 'high') {
        this.setQualityLevel('high');
      }
    }
    
    // Emit warning if performance is critically low
    if (avgFPS < 15) {
      this.notifyPerformanceWarning('critical', avgFPS);
    } else if (avgFPS < this.minFPS) {
      this.notifyPerformanceWarning('low', avgFPS);
    }
  }

  /**
   * Set animation quality level
   * @param {string} level - 'high', 'medium', or 'low'
   */
  setQualityLevel(level) {
    if (this.qualityLevel === level) return;
    
    const previousLevel = this.qualityLevel;
    this.qualityLevel = level;
    
    console.log(`Performance: Quality changed from ${previousLevel} to ${level}`);
    this.notifyQualityChange(level, previousLevel);
  }

  /**
   * Get current quality level
   * @returns {string} Current quality level
   */
  getQualityLevel() {
    return this.qualityLevel;
  }

  /**
   * Get current FPS
   * @returns {number} Current FPS
   */
  getCurrentFPS() {
    return this.fps;
  }

  /**
   * Get current frame time in milliseconds
   * @returns {number} Frame time in ms
   */
  getFrameTime() {
    return this.frameTime;
  }

  /**
   * Setup memory monitoring
   */
  setupMemoryMonitoring() {
    // Check memory every 5 seconds
    this.memoryCheckInterval = setInterval(() => {
      this.checkMemoryUsage();
    }, 5000);
  }

  /**
   * Check memory usage and warn if high
   */
  checkMemoryUsage() {
    if (!performance.memory) return;
    
    const memInfo = performance.memory;
    const usedMB = memInfo.usedJSHeapSize / (1024 * 1024);
    const limitMB = memInfo.jsHeapSizeLimit / (1024 * 1024);
    const usagePercent = (usedMB / limitMB) * 100;
    
    // Warn if memory usage is high
    if (usagePercent > 80) {
      this.notifyPerformanceWarning('memory', usagePercent);
      
      // Automatically reduce quality if memory is critically high
      if (usagePercent > 90 && this.qualityLevel !== 'low') {
        this.setQualityLevel('low');
      }
    }
  }

  /**
   * Get memory usage information
   * @returns {Object} Memory usage stats
   */
  getMemoryUsage() {
    if (!performance.memory) {
      return {
        supported: false,
        used: 0,
        total: 0,
        limit: 0,
        percentage: 0
      };
    }
    
    const memInfo = performance.memory;
    return {
      supported: true,
      used: memInfo.usedJSHeapSize,
      total: memInfo.totalJSHeapSize,
      limit: memInfo.jsHeapSizeLimit,
      percentage: (memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit) * 100
    };
  }

  /**
   * Get performance metrics
   * @returns {Object} Performance metrics
   */
  getMetrics() {
    return {
      fps: this.fps,
      averageFPS: this.getAverageFPS(),
      frameTime: this.frameTime,
      qualityLevel: this.qualityLevel,
      memory: this.getMemoryUsage(),
      isMonitoring: this.isMonitoring,
      deviceCapabilities: DeviceCapabilities.getCapabilities()
    };
  }

  /**
   * Register callback for FPS updates
   * @param {Function} callback - Callback function
   */
  onFPSUpdate(callback) {
    this.callbacks.fpsUpdate.push(callback);
  }

  /**
   * Register callback for quality changes
   * @param {Function} callback - Callback function
   */
  onQualityChange(callback) {
    this.callbacks.qualityChange.push(callback);
  }

  /**
   * Register callback for performance warnings
   * @param {Function} callback - Callback function
   */
  onPerformanceWarning(callback) {
    this.callbacks.performanceWarning.push(callback);
  }

  /**
   * Notify FPS update callbacks
   */
  notifyFPSUpdate() {
    this.callbacks.fpsUpdate.forEach(callback => {
      try {
        callback(this.fps, this.frameTime);
      } catch (error) {
        console.error('Error in FPS update callback:', error);
      }
    });
  }

  /**
   * Notify quality change callbacks
   * @param {string} newLevel - New quality level
   * @param {string} previousLevel - Previous quality level
   */
  notifyQualityChange(newLevel, previousLevel) {
    this.callbacks.qualityChange.forEach(callback => {
      try {
        callback(newLevel, previousLevel);
      } catch (error) {
        console.error('Error in quality change callback:', error);
      }
    });
  }

  /**
   * Notify performance warning callbacks
   * @param {string} type - Warning type ('critical', 'low', 'memory')
   * @param {number} value - Associated value (FPS or memory percentage)
   */
  notifyPerformanceWarning(type, value) {
    this.callbacks.performanceWarning.forEach(callback => {
      try {
        callback(type, value);
      } catch (error) {
        console.error('Error in performance warning callback:', error);
      }
    });
  }

  /**
   * Force quality level (useful for testing or user preferences)
   * @param {string} level - Quality level to force
   */
  forceQualityLevel(level) {
    this.setQualityLevel(level);
  }

  /**
   * Reset performance monitoring
   */
  reset() {
    this.stopMonitoring();
    this.frameCount = 0;
    this.fpsHistory = [];
    this.fps = 60;
    this.frameTime = 16.67;
    
    if (this.memoryCheckInterval) {
      clearInterval(this.memoryCheckInterval);
      this.memoryCheckInterval = null;
    }
    
    this.isInitialized = false;
  }

  /**
   * Cleanup resources
   */
  destroy() {
    this.reset();
    this.callbacks = {
      fpsUpdate: [],
      qualityChange: [],
      performanceWarning: []
    };
  }

  /**
   * Whether performance metrics collection is enabled
   * Used by LoadingManager to decide if it should record metrics.
   * @returns {boolean}
   */
  isEnabled() {
    // Enable in browser context when initialized or monitoring
    if (typeof window === 'undefined') return false;
    return this.isInitialized || this.isMonitoring;
  }

  /**
   * Record a performance metric event
   * @param {string} name - Metric name
   * @param {Object} payload - Metric data
   */
  recordMetric(name, payload) {
    try {
      // In a real app, send to analytics endpoint; for now, log safely
      // Avoid noisy logs in production by gating on console level if needed
      // eslint-disable-next-line no-console
      console.debug('[PerformanceMetric]', name, payload);
    } catch {
      // Swallow logging errors to avoid breaking app flow
    }
  }
}

// Export singleton instance
export default new PerformanceManager();