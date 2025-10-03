/**
 * Loading System
 * Core loading system infrastructure for tracking and managing loading progress
 */

import LoadingManager from './LoadingManager.js';
import ProgressTracker from './ProgressTracker.js';
import AnimationSystemIntegration from './AnimationSystemIntegration.js';
import { 
  loadingConfig, 
  getDeviceConfig, 
  getReducedMotionConfig, 
  getSlowConnectionConfig 
} from './loadingConfig.js';
import { 
  LoadingProvider, 
  useLoading, 
  useLoadingProgress, 
  useResourceTracking, 
  useErrorHandling,
  useLoadingTransition,
  withLoading 
} from './LoadingContext.js';
import ErrorHandler from './ErrorHandler.js';
import { 
  usePageLoading, 
  useImageLoading, 
  useAnimationSystemLoading 
} from './usePageLoading.js';

// Export the main components
export {
  LoadingManager,
  ProgressTracker,
  AnimationSystemIntegration,
  ErrorHandler,
  loadingConfig,
  getDeviceConfig,
  getReducedMotionConfig,
  getSlowConnectionConfig,
  LoadingProvider,
  useLoading,
  useLoadingProgress,
  useResourceTracking,
  useErrorHandling,
  useLoadingTransition,
  withLoading,
  usePageLoading,
  useImageLoading,
  useAnimationSystemLoading
};

// Export the singleton LoadingManager instance as default
export default LoadingManager;