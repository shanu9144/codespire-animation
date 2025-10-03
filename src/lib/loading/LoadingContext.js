/**
 * LoadingContext
 * React context for loading state management and component integration
 */

'use client';

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import LoadingManager from './LoadingManager.js';
import ErrorHandler from './ErrorHandler.js';
import { loadingConfig } from './loadingConfig.js';

// Create the loading context
const LoadingContext = createContext(null);

/**
 * LoadingProvider component
 * Provides loading state management to child components
 */
export const LoadingProvider = ({ 
  children, 
  config = {},
  autoStart = true,
  onLoadingComplete,
  onError,
  onTimeout,
  onRetry,
  onFallback,
  enableErrorHandling = true
}) => {
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [loadingTime, setLoadingTime] = useState(null);
  const [progressBreakdown, setProgressBreakdown] = useState(null);
  
  // Error handling state
  const [errorHandler, setErrorHandler] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isInFallbackMode, setIsInFallbackMode] = useState(false);
  const [errorStatistics, setErrorStatistics] = useState(null);

  // Refs for callback management
  const callbacksRef = useRef({
    onLoadingComplete: onLoadingComplete,
    onError: onError,
    onTimeout: onTimeout,
    onRetry: onRetry,
    onFallback: onFallback
  });

  // Update callbacks ref when props change
  useEffect(() => {
    callbacksRef.current = {
      onLoadingComplete: onLoadingComplete,
      onError: onError,
      onTimeout: onTimeout,
      onRetry: onRetry,
      onFallback: onFallback
    };
  }, [onLoadingComplete, onError, onTimeout, onRetry, onFallback]);

  // Initialize LoadingManager and ErrorHandler
  useEffect(() => {
    if (!LoadingManager.isInitialized) {
      try {
        LoadingManager.initialize(config);
        setIsInitialized(true);
        
        // Initialize error handler if enabled
        if (enableErrorHandling) {
          const handler = new ErrorHandler({
            maxRetries: config.maxRetries || 3,
            retryDelay: config.retryDelay || 1000,
            timeoutThreshold: config.maximumLoadingTime || 8000,
            ...config.errorHandling
          });
          
          setErrorHandler(handler);
          
          // Set up error handler callbacks
          handler.onError((resourceUrl, error, errorInfo) => {
            setHasError(true);
            setErrorMessage(error.message);
            setErrorStatistics(handler.getErrorStatistics());
            
            // Call external callback
            if (callbacksRef.current.onError) {
              callbacksRef.current.onError(error, { resourceUrl, errorInfo });
            }
          });
          
          handler.onRetry((resourceUrl, retryCount, delay) => {
            setRetryCount(retryCount);
            
            // Call external callback
            if (callbacksRef.current.onRetry) {
              callbacksRef.current.onRetry(resourceUrl, retryCount, delay);
            }
          });
          
          handler.onTimeout((resourceUrl, timeoutInfo) => {
            // Call external callback
            if (callbacksRef.current.onTimeout) {
              callbacksRef.current.onTimeout(resourceUrl, timeoutInfo);
            }
          });
          
          handler.onFallback((resourceUrl, fallbackInfo) => {
            setIsInFallbackMode(true);
            
            // Call external callback
            if (callbacksRef.current.onFallback) {
              callbacksRef.current.onFallback(resourceUrl, fallbackInfo);
            }
          });
        }
        
        // Set up LoadingManager event listeners
        LoadingManager.onProgressUpdate((newProgress) => {
          setProgress(newProgress);
          
          // Update progress breakdown
          const state = LoadingManager.getState();
          setProgressBreakdown(state.progressBreakdown);
        });

        LoadingManager.onLoadingComplete((completionTime) => {
          setIsLoading(false);
          setLoadingTime(completionTime);
          
          // Call external callback
          if (callbacksRef.current.onLoadingComplete) {
            callbacksRef.current.onLoadingComplete(completionTime);
          }
        });

        LoadingManager.onError((error) => {
          // If error handler is enabled, let it handle the error
          if (enableErrorHandling && errorHandler) {
            errorHandler.handleError('loading-manager', error, 'system');
          } else {
            setHasError(true);
            setErrorMessage(error.message);
            
            // Call external callback
            if (callbacksRef.current.onError) {
              callbacksRef.current.onError(error);
            }
          }
        });

        LoadingManager.onTimeout(() => {
          // If error handler is enabled, let it handle the timeout
          if (enableErrorHandling && errorHandler) {
            errorHandler.handleTimeout('loading-manager', 'system');
          } else {
            // Call external callback
            if (callbacksRef.current.onTimeout) {
              callbacksRef.current.onTimeout();
            }
          }
        });

        console.log('LoadingProvider initialized');
      } catch (error) {
        console.error('Failed to initialize LoadingManager:', error);
        setHasError(true);
        setErrorMessage(error.message);
      }
    } else {
      setIsInitialized(true);
      
      // Sync with existing LoadingManager state
      const state = LoadingManager.getState();
      setIsLoading(state.isLoading);
      setProgress(state.progress);
      setHasError(state.hasError);
      setErrorMessage(state.errorMessage);
      setLoadingTime(state.loadingTime);
      setProgressBreakdown(state.progressBreakdown);
    }
  }, [config, enableErrorHandling]);

  // Auto-start loading if enabled
  useEffect(() => {
    if (isInitialized && autoStart && !isLoading && !hasError) {
      startLoading();
    }
  }, [isInitialized, autoStart]);

  // Loading control functions
  const startLoading = useCallback(() => {
    if (!isInitialized) {
      console.warn('LoadingManager not initialized');
      return;
    }

    try {
      LoadingManager.startLoading();
      setIsLoading(true);
      setProgress(0);
      setHasError(false);
      setErrorMessage(null);
      setLoadingTime(null);
      setProgressBreakdown(null);
    } catch (error) {
      console.error('Failed to start loading:', error);
      setHasError(true);
      setErrorMessage(error.message);
    }
  }, [isInitialized]);

  const completeLoading = useCallback(() => {
    if (!isInitialized) {
      console.warn('LoadingManager not initialized');
      return;
    }

    try {
      LoadingManager.completeLoading();
    } catch (error) {
      console.error('Failed to complete loading:', error);
      setHasError(true);
      setErrorMessage(error.message);
    }
  }, [isInitialized]);

  const resetLoading = useCallback(() => {
    if (!isInitialized) {
      console.warn('LoadingManager not initialized');
      return;
    }

    try {
      LoadingManager.reset();
      
      // Reset error handler if enabled
      if (errorHandler) {
        errorHandler.reset();
      }
      
      setIsLoading(false);
      setProgress(0);
      setHasError(false);
      setErrorMessage(null);
      setLoadingTime(null);
      setProgressBreakdown(null);
      setRetryCount(0);
      setIsInFallbackMode(false);
      setErrorStatistics(null);
    } catch (error) {
      console.error('Failed to reset loading:', error);
    }
  }, [isInitialized, errorHandler]);

  // Resource tracking functions
  const trackResource = useCallback((resourceUrl, weight = 1, type = 'critical') => {
    if (!isInitialized) {
      console.warn('LoadingManager not initialized');
      return;
    }

    try {
      LoadingManager.trackResource(resourceUrl, weight, type);
    } catch (error) {
      console.error('Failed to track resource:', error);
    }
  }, [isInitialized]);

  const markResourceLoaded = useCallback((resourceUrl) => {
    if (!isInitialized) {
      console.warn('LoadingManager not initialized');
      return;
    }

    try {
      LoadingManager.markResourceLoaded(resourceUrl);
    } catch (error) {
      console.error('Failed to mark resource as loaded:', error);
    }
  }, [isInitialized]);

  const trackAnimationSystem = useCallback((systemName, weight = 1) => {
    if (!isInitialized) {
      console.warn('LoadingManager not initialized');
      return;
    }

    try {
      LoadingManager.trackAnimationSystem(systemName, weight);
    } catch (error) {
      console.error('Failed to track animation system:', error);
    }
  }, [isInitialized]);

  const markAnimationSystemLoaded = useCallback((systemName) => {
    if (!isInitialized) {
      console.warn('LoadingManager not initialized');
      return;
    }

    try {
      LoadingManager.markAnimationSystemLoaded(systemName);
    } catch (error) {
      console.error('Failed to mark animation system as loaded:', error);
    }
  }, [isInitialized]);

  // Progress update utilities
  const updateProgress = useCallback((newProgress) => {
    if (!isInitialized) {
      console.warn('LoadingManager not initialized');
      return;
    }

    try {
      LoadingManager.updateProgress(newProgress);
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  }, [isInitialized]);

  // Error handling utilities
  const retryFailedResources = useCallback(() => {
    if (!errorHandler) {
      console.warn('Error handler not available');
      return;
    }

    // This would trigger retry for all failed resources
    // Implementation depends on specific retry strategy
    console.log('Retrying failed resources...');
    
    // Reset error state
    setHasError(false);
    setErrorMessage(null);
    setRetryCount(0);
  }, [errorHandler]);

  const enterFallbackMode = useCallback(() => {
    if (!errorHandler) {
      console.warn('Error handler not available');
      return;
    }

    errorHandler.triggerGracefulDegradation('manual', 'system', () => {
      // Complete loading in fallback mode
      completeLoading();
    });
  }, [errorHandler, completeLoading]);

  const getErrorStatistics = useCallback(() => {
    if (!errorHandler) {
      return null;
    }

    return errorHandler.getErrorStatistics();
  }, [errorHandler]);

  // Get current state
  const getLoadingState = useCallback(() => {
    if (!isInitialized) {
      return {
        isInitialized: false,
        isLoading: false,
        progress: 0,
        hasError: false,
        errorMessage: null,
        loadingTime: null,
        progressBreakdown: null,
        retryCount: 0,
        isInFallbackMode: false,
        errorStatistics: null
      };
    }

    return {
      isInitialized,
      isLoading,
      progress,
      hasError,
      errorMessage,
      loadingTime,
      progressBreakdown,
      retryCount,
      isInFallbackMode,
      errorStatistics
    };
  }, [isInitialized, isLoading, progress, hasError, errorMessage, loadingTime, progressBreakdown, retryCount, isInFallbackMode, errorStatistics]);

  // Context value
  const contextValue = {
    // State
    isInitialized,
    isLoading,
    progress,
    hasError,
    errorMessage,
    loadingTime,
    progressBreakdown,
    retryCount,
    isInFallbackMode,
    errorStatistics,
    
    // Control functions
    startLoading,
    completeLoading,
    resetLoading,
    
    // Resource tracking
    trackResource,
    markResourceLoaded,
    trackAnimationSystem,
    markAnimationSystemLoaded,
    
    // Progress utilities
    updateProgress,
    
    // Error handling
    retryFailedResources,
    enterFallbackMode,
    getErrorStatistics,
    
    // State getter
    getLoadingState,
    
    // Configuration
    config: { ...loadingConfig, ...config },
    
    // Error handler instance (for advanced usage)
    errorHandler
  };

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
};

/**
 * useLoading hook
 * Provides access to loading state and control functions
 */
export const useLoading = () => {
  const context = useContext(LoadingContext);
  
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  
  return context;
};

/**
 * useLoadingProgress hook
 * Simplified hook for components that only need progress information
 */
export const useLoadingProgress = () => {
  const { progress, isLoading, hasError } = useLoading();
  return { progress, isLoading, hasError };
};

/**
 * useResourceTracking hook
 * Simplified hook for components that need to track resources
 */
export const useResourceTracking = () => {
  const { 
    trackResource, 
    markResourceLoaded, 
    trackAnimationSystem, 
    markAnimationSystemLoaded 
  } = useLoading();
  
  return {
    trackResource,
    markResourceLoaded,
    trackAnimationSystem,
    markAnimationSystemLoaded
  };
};

/**
 * useErrorHandling hook
 * Simplified hook for components that need error handling functionality
 */
export const useErrorHandling = () => {
  const { 
    hasError, 
    errorMessage, 
    retryCount, 
    isInFallbackMode, 
    errorStatistics,
    retryFailedResources, 
    enterFallbackMode, 
    getErrorStatistics 
  } = useLoading();
  
  return {
    hasError,
    errorMessage,
    retryCount,
    isInFallbackMode,
    errorStatistics,
    retryFailedResources,
    enterFallbackMode,
    getErrorStatistics
  };
};

/**
 * useLoadingTransition hook
 * Hook for managing loading transitions with error handling
 */
export const useLoadingTransition = (options = {}) => {
  const {
    onTransitionStart,
    onTransitionComplete,
    onTransitionError,
    timeoutMs = 8000
  } = options;

  const { 
    isLoading, 
    progress, 
    hasError, 
    completeLoading, 
    enterFallbackMode 
  } = useLoading();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef(null);

  // Handle transition start
  const startTransition = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (onTransitionStart) {
      onTransitionStart();
    }

    // Set up timeout fallback
    timeoutRef.current = setTimeout(() => {
      console.warn('Loading transition timeout, entering fallback mode');
      enterFallbackMode();
      
      if (onTransitionError) {
        onTransitionError(new Error('Transition timeout'));
      }
    }, timeoutMs);
  }, [isTransitioning, onTransitionStart, enterFallbackMode, onTransitionError, timeoutMs]);

  // Handle transition completion
  useEffect(() => {
    if (progress >= 100 && isTransitioning && !hasError) {
      // Clear timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Complete the transition
      setTimeout(() => {
        setIsTransitioning(false);
        completeLoading();
        
        if (onTransitionComplete) {
          onTransitionComplete();
        }
      }, 300); // Small delay for smooth transition
    }
  }, [progress, isTransitioning, hasError, completeLoading, onTransitionComplete]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isTransitioning,
    startTransition,
    canTransition: progress >= 100 && !hasError
  };
};

/**
 * withLoading HOC
 * Higher-order component that provides loading context to wrapped component
 */
export const withLoading = (WrappedComponent) => {
  const WithLoadingComponent = (props) => {
    const loadingContext = useLoading();
    return <WrappedComponent {...props} loading={loadingContext} />;
  };
  
  WithLoadingComponent.displayName = `withLoading(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return WithLoadingComponent;
};

export default LoadingContext;