/**
 * ErrorHandler
 * Enhanced error handling for loading transitions with retry logic and fallbacks
 */

class ErrorHandler {
  constructor(config = {}) {
    this.config = {
      maxRetries: 3,
      retryDelay: 1000, // Base delay in ms
      retryBackoffMultiplier: 2, // Exponential backoff
      timeoutThreshold: 8000, // Timeout threshold in ms
      gracefulDegradationDelay: 2000, // Delay before graceful degradation
      ...config
    };

    // Error tracking
    this.errors = new Map(); // resourceUrl -> { count, lastError, retryCount }
    this.timeouts = new Map(); // resourceUrl -> timeoutId
    this.retryAttempts = new Map(); // resourceUrl -> retryCount
    
    // Callbacks
    this.callbacks = {
      error: [],
      retry: [],
      timeout: [],
      fallback: []
    };

    // State
    this.isHandlingErrors = false;
    this.fallbackTriggered = false;
  }

  /**
   * Handle a loading error with retry logic
   * @param {string} resourceUrl - URL of the failed resource
   * @param {Error} error - The error that occurred
   * @param {string} resourceType - Type of resource
   * @param {Function} retryFunction - Function to call for retry
   */
  handleError(resourceUrl, error, resourceType = 'unknown', retryFunction = null) {
    console.error(`Loading error for ${resourceUrl}:`, error);

    // Track the error
    const errorInfo = this.errors.get(resourceUrl) || {
      count: 0,
      lastError: null,
      retryCount: 0,
      resourceType,
      firstErrorTime: Date.now()
    };

    errorInfo.count++;
    errorInfo.lastError = error;
    errorInfo.lastErrorTime = Date.now();
    this.errors.set(resourceUrl, errorInfo);

    // Notify error callbacks
    this.notifyError(resourceUrl, error, errorInfo);

    // Determine if we should retry
    if (this.shouldRetry(resourceUrl, errorInfo)) {
      this.scheduleRetry(resourceUrl, retryFunction, errorInfo);
    } else {
      // Max retries reached, trigger fallback
      this.triggerFallback(resourceUrl, error, errorInfo);
    }
  }

  /**
   * Handle timeout scenarios
   * @param {string} resourceUrl - URL of the timed out resource
   * @param {string} resourceType - Type of resource
   * @param {Function} fallbackFunction - Function to call for fallback
   */
  handleTimeout(resourceUrl, resourceType = 'unknown', fallbackFunction = null) {
    console.warn(`Timeout for ${resourceUrl} (${resourceType})`);

    const timeoutInfo = {
      resourceUrl,
      resourceType,
      timeoutTime: Date.now()
    };

    // Notify timeout callbacks
    this.notifyTimeout(resourceUrl, timeoutInfo);

    // Trigger graceful degradation
    this.triggerGracefulDegradation(resourceUrl, resourceType, fallbackFunction);
  }

  /**
   * Set up timeout monitoring for a resource
   * @param {string} resourceUrl - URL to monitor
   * @param {number} timeout - Timeout in ms
   * @param {Function} fallbackFunction - Function to call on timeout
   */
  setupTimeout(resourceUrl, timeout = null, fallbackFunction = null) {
    const timeoutMs = timeout || this.config.timeoutThreshold;
    
    // Clear existing timeout
    this.clearTimeout(resourceUrl);

    // Set new timeout
    const timeoutId = setTimeout(() => {
      this.handleTimeout(resourceUrl, 'timeout', fallbackFunction);
    }, timeoutMs);

    this.timeouts.set(resourceUrl, timeoutId);
  }

  /**
   * Clear timeout for a resource
   * @param {string} resourceUrl - URL to clear timeout for
   */
  clearTimeout(resourceUrl) {
    const timeoutId = this.timeouts.get(resourceUrl);
    if (timeoutId) {
      clearTimeout(timeoutId);
      this.timeouts.delete(resourceUrl);
    }
  }

  /**
   * Determine if a resource should be retried
   * @param {string} resourceUrl - URL of the resource
   * @param {Object} errorInfo - Error information
   * @returns {boolean} Whether to retry
   */
  shouldRetry(resourceUrl, errorInfo) {
    // Don't retry if max retries reached
    if (errorInfo.retryCount >= this.config.maxRetries) {
      return false;
    }

    // Don't retry certain types of errors
    const error = errorInfo.lastError;
    if (error) {
      // Don't retry 404s or other client errors
      if (error.status >= 400 && error.status < 500) {
        return false;
      }

      // Don't retry syntax errors or other permanent failures
      if (error.name === 'SyntaxError' || error.name === 'TypeError') {
        return false;
      }
    }

    // Don't retry if too much time has passed
    const timeSinceFirstError = Date.now() - errorInfo.firstErrorTime;
    if (timeSinceFirstError > this.config.timeoutThreshold) {
      return false;
    }

    return true;
  }

  /**
   * Schedule a retry attempt
   * @param {string} resourceUrl - URL to retry
   * @param {Function} retryFunction - Function to call for retry
   * @param {Object} errorInfo - Error information
   */
  scheduleRetry(resourceUrl, retryFunction, errorInfo) {
    if (!retryFunction) {
      console.warn(`No retry function provided for ${resourceUrl}`);
      return;
    }

    errorInfo.retryCount++;
    this.retryAttempts.set(resourceUrl, errorInfo.retryCount);

    // Calculate delay with exponential backoff
    const delay = this.config.retryDelay * 
                  Math.pow(this.config.retryBackoffMultiplier, errorInfo.retryCount - 1);

    console.log(`Scheduling retry ${errorInfo.retryCount}/${this.config.maxRetries} for ${resourceUrl} in ${delay}ms`);

    // Notify retry callbacks
    this.notifyRetry(resourceUrl, errorInfo.retryCount, delay);

    setTimeout(() => {
      try {
        retryFunction();
      } catch (error) {
        console.error(`Retry function failed for ${resourceUrl}:`, error);
        this.handleError(resourceUrl, error, errorInfo.resourceType, retryFunction);
      }
    }, delay);
  }

  /**
   * Trigger fallback behavior for a failed resource
   * @param {string} resourceUrl - URL of the failed resource
   * @param {Error} error - The error that occurred
   * @param {Object} errorInfo - Error information
   */
  triggerFallback(resourceUrl, error, errorInfo) {
    console.warn(`Triggering fallback for ${resourceUrl} after ${errorInfo.retryCount} retries`);

    const fallbackInfo = {
      resourceUrl,
      error,
      errorInfo,
      fallbackTime: Date.now()
    };

    // Notify fallback callbacks
    this.notifyFallback(resourceUrl, fallbackInfo);

    // Implement resource-specific fallback strategies
    this.implementFallbackStrategy(resourceUrl, errorInfo.resourceType);
  }

  /**
   * Trigger graceful degradation
   * @param {string} resourceUrl - URL of the resource
   * @param {string} resourceType - Type of resource
   * @param {Function} fallbackFunction - Function to call for fallback
   */
  triggerGracefulDegradation(resourceUrl, resourceType, fallbackFunction) {
    if (this.fallbackTriggered) {
      return; // Already in fallback mode
    }

    console.log(`Triggering graceful degradation for ${resourceType}: ${resourceUrl}`);

    // Wait a bit before triggering fallback to allow for last-minute loading
    setTimeout(() => {
      if (!this.fallbackTriggered) {
        this.fallbackTriggered = true;
        
        if (fallbackFunction) {
          try {
            fallbackFunction();
          } catch (error) {
            console.error('Fallback function failed:', error);
          }
        }

        // Notify that we're entering fallback mode
        this.notifyFallback('system', {
          type: 'graceful_degradation',
          resourceUrl,
          resourceType,
          fallbackTime: Date.now()
        });
      }
    }, this.config.gracefulDegradationDelay);
  }

  /**
   * Implement resource-specific fallback strategies
   * @param {string} resourceUrl - URL of the resource
   * @param {string} resourceType - Type of resource
   * @param {Object} fallbackInfo - Fallback information
   */
  implementFallbackStrategy(resourceUrl, resourceType) {
    switch (resourceType) {
      case 'critical':
        // For critical resources, continue with degraded experience
        console.log('Continuing with degraded experience for critical resource');
        break;

      case 'animations':
        // For animations, disable or use simpler alternatives
        console.log('Disabling animations due to loading failure');
        this.disableAnimations();
        break;

      case 'fonts':
        // For fonts, use system fonts
        console.log('Falling back to system fonts');
        this.fallbackToSystemFonts();
        break;

      case 'images':
        // For images, show placeholder or hide
        console.log('Using image placeholders');
        this.useImagePlaceholders(resourceUrl);
        break;

      default:
        console.log(`No specific fallback strategy for ${resourceType}`);
    }
  }

  /**
   * Disable animations as fallback
   */
  disableAnimations() {
    // Add CSS to disable animations
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Fallback to system fonts
   */
  fallbackToSystemFonts() {
    // Add CSS to use system fonts
    const style = document.createElement('style');
    style.textContent = `
      * {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
                     Oxygen, Ubuntu, Cantarell, sans-serif !important;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Use image placeholders
   * @param {string} imageUrl - URL of the failed image
   */
  useImagePlaceholders(imageUrl) {
    // Find images with this URL and replace with placeholder
    const images = document.querySelectorAll(`img[src="${imageUrl}"]`);
    images.forEach(img => {
      img.style.backgroundColor = '#f0f0f0';
      img.style.display = 'flex';
      img.style.alignItems = 'center';
      img.style.justifyContent = 'center';
      img.innerHTML = '<span style="color: #666;">Image unavailable</span>';
    });
  }

  /**
   * Get error statistics
   * @returns {Object} Error statistics
   */
  getErrorStatistics() {
    const stats = {
      totalErrors: 0,
      errorsByType: {},
      retriesByResource: {},
      timeouts: this.timeouts.size,
      fallbackTriggered: this.fallbackTriggered
    };

    this.errors.forEach((errorInfo, resourceUrl) => {
      stats.totalErrors += errorInfo.count;
      
      const type = errorInfo.resourceType;
      stats.errorsByType[type] = (stats.errorsByType[type] || 0) + errorInfo.count;
      
      if (errorInfo.retryCount > 0) {
        stats.retriesByResource[resourceUrl] = errorInfo.retryCount;
      }
    });

    return stats;
  }

  /**
   * Register error callback
   * @param {Function} callback - Callback function
   */
  onError(callback) {
    this.callbacks.error.push(callback);
  }

  /**
   * Register retry callback
   * @param {Function} callback - Callback function
   */
  onRetry(callback) {
    this.callbacks.retry.push(callback);
  }

  /**
   * Register timeout callback
   * @param {Function} callback - Callback function
   */
  onTimeout(callback) {
    this.callbacks.timeout.push(callback);
  }

  /**
   * Register fallback callback
   * @param {Function} callback - Callback function
   */
  onFallback(callback) {
    this.callbacks.fallback.push(callback);
  }

  /**
   * Notify error callbacks
   */
  notifyError(resourceUrl, error, errorInfo) {
    this.callbacks.error.forEach(callback => {
      try {
        callback(resourceUrl, error, errorInfo);
      } catch (err) {
        console.error('Error in error callback:', err);
      }
    });
  }

  /**
   * Notify retry callbacks
   */
  notifyRetry(resourceUrl, retryCount, delay) {
    this.callbacks.retry.forEach(callback => {
      try {
        callback(resourceUrl, retryCount, delay);
      } catch (err) {
        console.error('Error in retry callback:', err);
      }
    });
  }

  /**
   * Notify timeout callbacks
   */
  notifyTimeout(resourceUrl, timeoutInfo) {
    this.callbacks.timeout.forEach(callback => {
      try {
        callback(resourceUrl, timeoutInfo);
      } catch (err) {
        console.error('Error in timeout callback:', err);
      }
    });
  }

  /**
   * Notify fallback callbacks
   */
  notifyFallback(resourceUrl, fallbackInfo) {
    this.callbacks.fallback.forEach(callback => {
      try {
        callback(resourceUrl, fallbackInfo);
      } catch (err) {
        console.error('Error in fallback callback:', err);
      }
    });
  }

  /**
   * Reset error handler
   */
  reset() {
    // Clear all timeouts
    this.timeouts.forEach(timeoutId => clearTimeout(timeoutId));
    this.timeouts.clear();

    // Clear error tracking
    this.errors.clear();
    this.retryAttempts.clear();

    // Reset state
    this.isHandlingErrors = false;
    this.fallbackTriggered = false;
  }

  /**
   * Destroy error handler
   */
  destroy() {
    this.reset();
    
    // Clear callbacks
    this.callbacks = {
      error: [],
      retry: [],
      timeout: [],
      fallback: []
    };
  }
}

export default ErrorHandler;