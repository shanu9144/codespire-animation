/**
 * LoadingManager
 * Central orchestrator for tracking loading progress and managing loading state
 */

import PerformanceManager from '../../animations/core/PerformanceManager.js';
import DeviceCapabilities from '../../animations/core/DeviceCapabilities.js';
import ProgressTracker from './ProgressTracker.js';
import { loadingConfig } from './loadingConfig.js';

class LoadingManager {
  constructor() {
    this.isInitialized = false;
    this.isLoading = false;
    this.startTime = null;
    this.endTime = null;
    this.currentProgress = 0;
    this.hasError = false;
    this.errorMessage = null;
    
    // Configuration
    this.config = null;
    
    // Progress tracking
    this.progressTracker = null;
    
    // Event callbacks
    this.callbacks = {
      progressUpdate: [],
      loadingComplete: [],
      error: [],
      timeout: [],
      retry: [],
      fallback: []
    };
    
    // Timeout handling
    this.timeoutId = null;
    this.minimumTimeoutId = null;
    this.progressTimeoutId = null;
    
    // Error handling and retry logic
    this.errorCount = 0;
    this.retryCount = 0;
    this.maxRetries = 3;
    this.retryDelay = 1000; // Base delay in ms
    this.lastProgressUpdate = null;
    this.progressStallThreshold = 5000; // 5 seconds without progress
    this.failedResources = new Set();
    this.criticalErrors = [];
    
    // Fallback state
    this.fallbackMode = false;
    this.fallbackReason = null;
    
    // Performance integration
    this.performanceManager = PerformanceManager;
    this.deviceCapabilities = DeviceCapabilities;
  }

  /**
   * Initialize the loading manager with configuration
   * @param {Object} customConfig - Custom configuration overrides
   */
  initialize(customConfig = {}) {
    if (this.isInitialized) {
      console.warn('LoadingManager already initialized');
      return;
    }

    // Get device-specific configuration
    const deviceConfig = this.getDeviceSpecificConfig();
    
    // Merge configurations
    this.config = {
      ...loadingConfig,
      ...deviceConfig,
      ...customConfig
    };

    // Initialize progress tracker
    this.progressTracker = new ProgressTracker(this.config);
    
    // Set up progress tracking callbacks
    this.progressTracker.onProgressUpdate((progress) => {
      this.updateProgress(progress);
    });

    this.progressTracker.onError((error) => {
      this.handleError(error);
    });

    // Make LoadingManager globally accessible for animation system integration
    if (typeof window !== 'undefined') {
      window.LoadingManager = this;
    }

    this.isInitialized = true;
    console.log('LoadingManager initialized with config:', this.config);
  }

  /**
   * Get device-specific configuration
   * @returns {Object} Device-specific configuration
   */
  getDeviceSpecificConfig() {
    const capabilities = this.deviceCapabilities.getCapabilities();
    const performanceLevel = capabilities.performance;
    const isMobile = capabilities.isMobile;
    
    // Get base device config
    let deviceConfig = {};
    
    if (isMobile) {
      deviceConfig = { ...loadingConfig.deviceOptimizations.mobile };
    }
    
    if (performanceLevel === 'low') {
      deviceConfig = { 
        ...deviceConfig, 
        ...loadingConfig.deviceOptimizations.lowEnd 
      };
    }

    // Adjust for reduced motion preference
    if (this.deviceCapabilities.prefersReducedMotion()) {
      deviceConfig.counterAnimationDuration = 0;
      deviceConfig.transitionDuration = 200;
      deviceConfig.minimumLoadingTime = 200;
    }

    // Adjust for slow connections
    const connection = capabilities.connection;
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      deviceConfig.maximumLoadingTime = 15000; // 15 seconds for slow connections
      deviceConfig.progressUpdateInterval = 100; // Less frequent updates
    }

    return deviceConfig;
  }

  /**
   * Start the loading process
   */
  startLoading() {
    if (!this.isInitialized) {
      throw new Error('LoadingManager not initialized. Call initialize() first.');
    }

    if (this.isLoading) {
      console.warn('Loading already in progress');
      return;
    }

    this.isLoading = true;
    this.startTime = performance.now();
    this.currentProgress = 0;
    this.hasError = false;
    this.errorMessage = null;
    this.lastProgressUpdate = performance.now();
    
    // Reset error tracking
    this.errorCount = 0;
    this.retryCount = 0;
    this.failedResources.clear();
    this.criticalErrors = [];
    this.fallbackMode = false;
    this.fallbackReason = null;

    // Set up timeout handling
    this.setupTimeouts();

    // Start progress tracking
    this.progressTracker.startTracking();

    console.log('Loading started');
  }

  /**
   * Set up timeout handling
   */
  setupTimeouts() {
    // Maximum loading time timeout
    this.timeoutId = setTimeout(() => {
      if (this.isLoading) {
        console.warn('Loading timeout reached, forcing completion');
        this.handleTimeout('maximum_time_exceeded');
      }
    }, this.config.maximumLoadingTime);

    // Minimum loading time enforcement
    this.minimumTimeoutId = setTimeout(() => {
      this.minimumTimeReached = true;
      this.checkForCompletion();
    }, this.config.minimumLoadingTime);

    // Progress stall detection
    this.setupProgressStallDetection();
  }

  /**
   * Set up progress stall detection
   */
  setupProgressStallDetection() {
    this.progressTimeoutId = setTimeout(() => {
      if (this.isLoading && this.currentProgress < 100) {
        const timeSinceLastUpdate = performance.now() - this.lastProgressUpdate;
        if (timeSinceLastUpdate >= this.progressStallThreshold) {
          console.warn('Progress stalled, attempting recovery');
          this.handleProgressStall();
        } else {
          // Reset the timeout for next check
          this.setupProgressStallDetection();
        }
      }
    }, this.progressStallThreshold);
  }

  /**
   * Update loading progress
   * @param {number} progress - Progress value (0-100)
   */
  updateProgress(progress) {
    if (!this.isLoading) return;

    // Ensure progress is within bounds
    progress = Math.max(0, Math.min(100, progress));
    
    // Only update if progress has actually changed
    if (Math.abs(progress - this.currentProgress) < 0.1) return;

    const previousProgress = this.currentProgress;
    this.currentProgress = progress;
    this.lastProgressUpdate = performance.now();

    // Reset progress stall detection if progress is moving
    if (progress > previousProgress) {
      this.clearProgressStallTimeout();
      this.setupProgressStallDetection();
    }

    // Notify progress update callbacks
    this.notifyProgressUpdate(progress);

    // Check if loading is complete
    if (progress >= 100) {
      this.checkForCompletion();
    }
  }

  /**
   * Check if loading can be completed
   */
  checkForCompletion() {
    if (!this.isLoading || this.currentProgress < 100) return;

    // Enforce minimum loading time if not reached
    if (!this.minimumTimeReached) {
      console.log('Waiting for minimum loading time');
      return;
    }

    this.completeLoading();
  }

  /**
   * Complete the loading process
   */
  completeLoading() {
    if (!this.isLoading) return;

    this.isLoading = false;
    this.endTime = performance.now();
    
    // Clear all timeouts
    this.clearAllTimeouts();

    // Stop progress tracking
    if (this.progressTracker) {
      this.progressTracker.stopTracking();
    }

    const loadingTime = this.endTime - this.startTime;
    const completionInfo = {
      loadingTime,
      errorCount: this.errorCount,
      retryCount: this.retryCount,
      fallbackMode: this.fallbackMode,
      fallbackReason: this.fallbackReason,
      failedResources: Array.from(this.failedResources),
      criticalErrors: this.criticalErrors
    };

    console.log(`Loading completed in ${loadingTime.toFixed(2)}ms`, completionInfo);

    // Log performance metrics
    this.logPerformanceMetrics(completionInfo);

    // Notify completion callbacks
    this.notifyLoadingComplete(completionInfo);
  }

  /**
   * Clear all timeout handlers
   */
  clearAllTimeouts() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    
    if (this.minimumTimeoutId) {
      clearTimeout(this.minimumTimeoutId);
      this.minimumTimeoutId = null;
    }

    this.clearProgressStallTimeout();
  }

  /**
   * Clear progress stall timeout
   */
  clearProgressStallTimeout() {
    if (this.progressTimeoutId) {
      clearTimeout(this.progressTimeoutId);
      this.progressTimeoutId = null;
    }
  }

  /**
   * Log performance metrics for analysis
   * @param {Object} completionInfo - Information about the loading completion
   */
  logPerformanceMetrics(completionInfo) {
    if (this.performanceManager && this.performanceManager.isEnabled()) {
      this.performanceManager.recordMetric('loading_completion', {
        duration: completionInfo.loadingTime,
        errorCount: completionInfo.errorCount,
        retryCount: completionInfo.retryCount,
        fallbackMode: completionInfo.fallbackMode,
        failedResourceCount: completionInfo.failedResources.length,
        criticalErrorCount: completionInfo.criticalErrors.length
      });
    }
  }

  /**
   * Handle loading timeout
   * @param {string} reason - Reason for timeout
   */
  handleTimeout(reason = 'unknown') {
    console.warn(`Loading timeout (${reason}) - attempting recovery`);
    
    // Try recovery first if we haven't exceeded retry limit
    if (this.retryCount < this.maxRetries && reason !== 'maximum_time_exceeded') {
      this.attemptRecovery('timeout', reason);
      return;
    }
    
    // Force completion as last resort
    console.warn('Maximum retries exceeded, forcing completion');
    this.enterFallbackMode('timeout_exceeded', reason);
    
    // Force progress to 100%
    this.currentProgress = 100;
    this.notifyProgressUpdate(100);
    
    // Complete loading
    this.completeLoading();
    
    // Notify timeout callbacks
    this.notifyTimeout();
  }

  /**
   * Handle progress stall
   */
  handleProgressStall() {
    console.warn('Progress stalled, attempting recovery');
    
    if (this.retryCount < this.maxRetries) {
      this.attemptRecovery('progress_stall', 'no_progress_update');
    } else {
      console.warn('Progress stall recovery failed, entering fallback mode');
      this.enterFallbackMode('progress_stall', 'recovery_failed');
      
      // Force progress forward
      const targetProgress = Math.min(this.currentProgress + 20, 100);
      this.updateProgress(targetProgress);
    }
  }

  /**
   * Attempt recovery from error or stall
   * @param {string} type - Type of issue ('timeout', 'progress_stall', 'resource_error')
   * @param {string} reason - Specific reason
   */
  attemptRecovery(type, reason) {
    this.retryCount++;
    const delay = this.calculateRetryDelay();
    
    console.log(`Attempting recovery (${type}): retry ${this.retryCount}/${this.maxRetries} in ${delay}ms`);
    
    // Notify retry callbacks
    this.notifyRetry(type, reason, this.retryCount, delay);
    
    setTimeout(() => {
      if (!this.isLoading) return; // Loading might have completed during delay
      
      try {
        switch (type) {
          case 'timeout':
          case 'progress_stall':
            this.recoverFromStall();
            break;
          case 'resource_error':
            this.recoverFromResourceError();
            break;
          default:
            console.warn(`Unknown recovery type: ${type}`);
        }
      } catch (error) {
        console.error('Recovery attempt failed:', error);
        this.handleError(error);
      }
    }, delay);
  }

  /**
   * Calculate retry delay with exponential backoff
   * @returns {number} Delay in milliseconds
   */
  calculateRetryDelay() {
    // Exponential backoff: base delay * 2^(retry count - 1)
    const delay = this.retryDelay * Math.pow(2, this.retryCount - 1);
    // Add jitter to prevent thundering herd
    const jitter = Math.random() * 0.3 * delay;
    return Math.min(delay + jitter, 10000); // Cap at 10 seconds
  }

  /**
   * Recover from progress stall
   */
  recoverFromStall() {
    console.log('Attempting stall recovery');
    
    // Reset progress tracking
    if (this.progressTracker) {
      this.progressTracker.recalculateProgress();
    }
    
    // Force a small progress increment to unstick
    const incrementalProgress = Math.min(this.currentProgress + 5, 95);
    this.updateProgress(incrementalProgress);
    
    // Restart progress stall detection
    this.setupProgressStallDetection();
  }

  /**
   * Recover from resource loading errors
   */
  recoverFromResourceError() {
    console.log('Attempting resource error recovery');
    
    // Mark failed resources as loaded to prevent blocking
    this.failedResources.forEach(resourceUrl => {
      if (this.progressTracker) {
        this.progressTracker.markResourceLoaded(resourceUrl, true); // Force mark as loaded
      }
    });
    
    // Clear failed resources set
    this.failedResources.clear();
    
    // Recalculate progress
    if (this.progressTracker) {
      this.progressTracker.recalculateProgress();
    }
  }

  /**
   * Enter fallback mode for graceful degradation
   * @param {string} reason - Reason for entering fallback mode
   * @param {string} details - Additional details
   */
  enterFallbackMode(reason, details) {
    if (this.fallbackMode) return; // Already in fallback mode
    
    this.fallbackMode = true;
    this.fallbackReason = { reason, details, timestamp: performance.now() };
    
    console.warn(`Entering fallback mode: ${reason} (${details})`);
    
    // Notify fallback callbacks
    this.notifyFallback(reason, details);
    
    // Simplify loading process for fallback
    this.simplifyLoadingForFallback();
  }

  /**
   * Simplify loading process for fallback mode
   */
  simplifyLoadingForFallback() {
    // Reduce timeout thresholds
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        if (this.isLoading) {
          this.forceCompletion('fallback_timeout');
        }
      }, 2000); // Shorter timeout in fallback mode
    }
    
    // Disable complex progress tracking
    if (this.progressTracker) {
      this.progressTracker.enterFallbackMode();
    }
    
    // Ensure minimum progress rate
    this.ensureMinimumProgressRate();
  }

  /**
   * Ensure minimum progress rate in fallback mode
   */
  ensureMinimumProgressRate() {
    const progressInterval = setInterval(() => {
      if (!this.isLoading || this.currentProgress >= 100) {
        clearInterval(progressInterval);
        return;
      }
      
      // Increment progress by small amount
      const increment = Math.random() * 3 + 1; // 1-4% increment
      const newProgress = Math.min(this.currentProgress + increment, 100);
      this.updateProgress(newProgress);
    }, 200); // Update every 200ms
  }

  /**
   * Force completion of loading
   * @param {string} reason - Reason for forced completion
   */
  forceCompletion(reason) {
    console.warn(`Forcing loading completion: ${reason}`);
    
    this.currentProgress = 100;
    this.notifyProgressUpdate(100);
    this.completeLoading();
  }

  /**
   * Handle loading error
   * @param {Error} error - The error that occurred
   * @param {string} resourceUrl - URL of the resource that failed (optional)
   * @param {boolean} isCritical - Whether this is a critical error
   */
  handleError(error, resourceUrl = null, isCritical = false) {
    console.error('Loading error:', error, resourceUrl ? `Resource: ${resourceUrl}` : '');
    
    this.errorCount++;
    this.hasError = true;
    this.errorMessage = error.message;
    
    // Track failed resource
    if (resourceUrl) {
      this.failedResources.add(resourceUrl);
    }
    
    // Track critical errors separately
    if (isCritical) {
      this.criticalErrors.push({
        error,
        resourceUrl,
        timestamp: performance.now(),
        retryCount: this.retryCount
      });
    }
    
    // Notify error callbacks
    this.notifyError(error, resourceUrl, isCritical);
    
    // Determine recovery strategy based on error severity
    if (isCritical && this.retryCount < this.maxRetries) {
      // Attempt recovery for critical errors
      this.attemptRecovery('resource_error', error.message);
    } else if (this.errorCount > 5) {
      // Too many errors, enter fallback mode
      this.enterFallbackMode('too_many_errors', `${this.errorCount} errors encountered`);
    } else {
      // Continue loading despite non-critical error (graceful degradation)
      console.log('Continuing loading despite error (graceful degradation)');
    }
  }

  /**
   * Track a specific resource
   * @param {string} resourceUrl - URL of the resource
   * @param {number} weight - Weight of the resource (0-1)
   * @param {string} type - Type of resource ('critical', 'animations', 'fonts', 'images')
   */
  trackResource(resourceUrl, weight = 1, type = 'critical') {
    if (!this.progressTracker) {
      console.warn('ProgressTracker not initialized');
      return;
    }

    this.progressTracker.trackResource(resourceUrl, weight, type);
  }

  /**
   * Track an animation system
   * @param {string} systemName - Name of the animation system
   * @param {number} weight - Weight of the system (0-1)
   */
  trackAnimationSystem(systemName, weight = 1) {
    if (!this.progressTracker) {
      console.warn('ProgressTracker not initialized');
      return;
    }

    this.progressTracker.trackAnimationSystem(systemName, weight);
  }

  /**
   * Mark a resource as loaded
   * @param {string} resourceUrl - URL of the loaded resource
   */
  markResourceLoaded(resourceUrl) {
    if (!this.progressTracker) return;
    this.progressTracker.markResourceLoaded(resourceUrl);
  }

  /**
   * Mark an animation system as loaded
   * @param {string} systemName - Name of the loaded animation system
   */
  markAnimationSystemLoaded(systemName) {
    if (!this.progressTracker) return;
    this.progressTracker.markAnimationSystemLoaded(systemName);
  }

  /**
   * Get current loading state
   * @returns {Object} Current loading state
   */
  getState() {
    return {
      isInitialized: this.isInitialized,
      isLoading: this.isLoading,
      progress: this.currentProgress,
      hasError: this.hasError,
      errorMessage: this.errorMessage,
      startTime: this.startTime,
      endTime: this.endTime,
      loadingTime: this.endTime ? this.endTime - this.startTime : null,
      lastProgressUpdate: this.lastProgressUpdate,
      
      // Error handling state
      errorCount: this.errorCount,
      retryCount: this.retryCount,
      maxRetries: this.maxRetries,
      failedResources: Array.from(this.failedResources),
      criticalErrors: [...this.criticalErrors],
      
      // Fallback state
      fallbackMode: this.fallbackMode,
      fallbackReason: this.fallbackReason,
      
      // Configuration and progress
      config: this.config,
      progressBreakdown: this.progressTracker ? this.progressTracker.getProgressBreakdown() : null
    };
  }

  /**
   * Register callback for progress updates
   * @param {Function} callback - Callback function (progress) => void
   */
  onProgressUpdate(callback) {
    this.callbacks.progressUpdate.push(callback);
  }

  /**
   * Register callback for loading completion
   * @param {Function} callback - Callback function (loadingTime) => void
   */
  onLoadingComplete(callback) {
    this.callbacks.loadingComplete.push(callback);
  }

  /**
   * Register callback for errors
   * @param {Function} callback - Callback function (error) => void
   */
  onError(callback) {
    this.callbacks.error.push(callback);
  }

  /**
   * Register callback for timeout
   * @param {Function} callback - Callback function () => void
   */
  onTimeout(callback) {
    this.callbacks.timeout.push(callback);
  }

  /**
   * Register callback for retry attempts
   * @param {Function} callback - Callback function (type, reason, retryCount, delay) => void
   */
  onRetry(callback) {
    this.callbacks.retry.push(callback);
  }

  /**
   * Register callback for fallback mode
   * @param {Function} callback - Callback function (reason, details) => void
   */
  onFallback(callback) {
    this.callbacks.fallback.push(callback);
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
   * Notify loading complete callbacks
   * @param {Object} completionInfo - Information about the loading completion
   */
  notifyLoadingComplete(completionInfo) {
    this.callbacks.loadingComplete.forEach(callback => {
      try {
        callback(completionInfo);
      } catch (error) {
        console.error('Error in loading complete callback:', error);
      }
    });
  }

  /**
   * Notify error callbacks
   * @param {Error} error - The error that occurred
   * @param {string} resourceUrl - URL of the resource that failed (optional)
   * @param {boolean} isCritical - Whether this is a critical error
   */
  notifyError(error, resourceUrl = null, isCritical = false) {
    this.callbacks.error.forEach(callback => {
      try {
        callback(error, resourceUrl, isCritical);
      } catch (callbackError) {
        console.error('Error in error callback:', callbackError);
      }
    });
  }

  /**
   * Notify retry callbacks
   * @param {string} type - Type of retry
   * @param {string} reason - Reason for retry
   * @param {number} retryCount - Current retry count
   * @param {number} delay - Delay before retry
   */
  notifyRetry(type, reason, retryCount, delay) {
    this.callbacks.retry.forEach(callback => {
      try {
        callback(type, reason, retryCount, delay);
      } catch (error) {
        console.error('Error in retry callback:', error);
      }
    });
  }

  /**
   * Notify fallback callbacks
   * @param {string} reason - Reason for fallback
   * @param {string} details - Additional details
   */
  notifyFallback(reason, details) {
    this.callbacks.fallback.forEach(callback => {
      try {
        callback(reason, details);
      } catch (error) {
        console.error('Error in fallback callback:', error);
      }
    });
  }

  /**
   * Notify timeout callbacks
   */
  notifyTimeout() {
    this.callbacks.timeout.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('Error in timeout callback:', error);
      }
    });
  }

  /**
   * Reset the loading manager
   */
  reset() {
    // Clear all timeouts
    this.clearAllTimeouts();

    // Reset state
    this.isLoading = false;
    this.currentProgress = 0;
    this.hasError = false;
    this.errorMessage = null;
    this.startTime = null;
    this.endTime = null;
    this.minimumTimeReached = false;
    this.lastProgressUpdate = null;

    // Reset error tracking
    this.errorCount = 0;
    this.retryCount = 0;
    this.failedResources.clear();
    this.criticalErrors = [];

    // Reset fallback state
    this.fallbackMode = false;
    this.fallbackReason = null;

    // Reset progress tracker
    if (this.progressTracker) {
      this.progressTracker.reset();
    }
  }

  /**
   * Destroy the loading manager and cleanup resources
   */
  destroy() {
    this.reset();
    
    // Clear callbacks
    this.callbacks = {
      progressUpdate: [],
      loadingComplete: [],
      error: [],
      timeout: [],
      retry: [],
      fallback: []
    };

    // Destroy progress tracker
    if (this.progressTracker) {
      this.progressTracker.destroy();
      this.progressTracker = null;
    }

    // Clean up global reference
    if (typeof window !== 'undefined' && window.LoadingManager === this) {
      delete window.LoadingManager;
    }

    this.isInitialized = false;
  }
}

// Export singleton instance
const loadingManagerInstance = new LoadingManager();
export default loadingManagerInstance;