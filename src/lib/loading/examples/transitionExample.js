/**
 * Loading Transition System Example
 * Demonstrates how to use the LoadingProvider, error handling, and transition hooks
 */

import React from 'react';
import { 
  LoadingProvider, 
  useLoading, 
  useErrorHandling, 
  useLoadingTransition 
} from '../index.js';
import LoadingScreen from '../../../components/ui/LoadingScreen.js';

/**
 * Example component that uses the loading transition system
 */
const LoadingTransitionExample = () => {
  const { isLoading, progress } = useLoading();
  const { hasError, errorMessage, retryFailedResources } = useErrorHandling();
  const { isTransitioning, startTransition, canTransition } = useLoadingTransition({
    onTransitionStart: () => console.log('Transition started'),
    onTransitionComplete: () => console.log('Transition completed'),
    onTransitionError: (error) => console.error('Transition error:', error),
    timeoutMs: 10000
  });

  // Start transition when loading is complete
  React.useEffect(() => {
    if (canTransition && !isTransitioning) {
      startTransition();
    }
  }, [canTransition, isTransitioning, startTransition]);

  if (hasError) {
    return (
      <div className="error-screen">
        <h2>Loading Error</h2>
        <p>{errorMessage}</p>
        <button onClick={retryFailedResources}>
          Retry
        </button>
      </div>
    );
  }

  if (isLoading || isTransitioning) {
    return (
      <LoadingScreen
        progress={progress}
        isVisible={true}
        onTransitionComplete={() => console.log('LoadingScreen transition complete')}
      />
    );
  }

  return (
    <div className="main-content">
      <h1>Main Application Content</h1>
      <p>Loading completed successfully!</p>
    </div>
  );
};

/**
 * App wrapper with LoadingProvider
 */
const App = () => {
  return (
    <LoadingProvider
      config={{
        minimumLoadingTime: 1000,
        maximumLoadingTime: 8000,
        maxRetries: 3,
        retryDelay: 1000
      }}
      autoStart={true}
      enableErrorHandling={true}
      onLoadingComplete={(time) => console.log(`Loading completed in ${time}ms`)}
      onError={(error, context) => console.error('Loading error:', error, context)}
      onRetry={(resourceUrl, retryCount, delay) => 
        console.log(`Retrying ${resourceUrl} (attempt ${retryCount}) in ${delay}ms`)
      }
      onFallback={(resourceUrl, fallbackInfo) => 
        console.log('Fallback triggered:', resourceUrl, fallbackInfo)
      }
    >
      <LoadingTransitionExample />
    </LoadingProvider>
  );
};

export default App;

/**
 * Example of manual resource tracking
 */
export const ManualResourceTrackingExample = () => {
  const { trackResource, markResourceLoaded, trackAnimationSystem } = useLoading();

  React.useEffect(() => {
    // Track some critical resources
    trackResource('/api/data.json', 0.3, 'critical');
    trackResource('/fonts/custom-font.woff2', 0.2, 'fonts');
    
    // Track animation systems
    trackAnimationSystem('particle-system', 0.3);
    trackAnimationSystem('3d-scene', 0.2);

    // Simulate resource loading
    setTimeout(() => {
      markResourceLoaded('/api/data.json');
    }, 1000);

    setTimeout(() => {
      markResourceLoaded('/fonts/custom-font.woff2');
    }, 1500);

    setTimeout(() => {
      markResourceLoaded('particle-system');
    }, 2000);

    setTimeout(() => {
      markResourceLoaded('3d-scene');
    }, 2500);
  }, [trackResource, markResourceLoaded, trackAnimationSystem]);

  return null; // This component just handles resource tracking
};

/**
 * Example of error handling with custom retry logic
 */
export const ErrorHandlingExample = () => {
  const { 
    hasError, 
    errorMessage, 
    retryCount, 
    isInFallbackMode,
    errorStatistics,
    retryFailedResources,
    enterFallbackMode 
  } = useErrorHandling();

  if (hasError) {
    return (
      <div className="error-container">
        <h3>Loading Error</h3>
        <p>{errorMessage}</p>
        <p>Retry attempts: {retryCount}</p>
        
        {errorStatistics && (
          <div className="error-stats">
            <h4>Error Statistics:</h4>
            <p>Total errors: {errorStatistics.totalErrors}</p>
            <p>Timeouts: {errorStatistics.timeouts}</p>
            <p>Fallback mode: {errorStatistics.fallbackTriggered ? 'Yes' : 'No'}</p>
          </div>
        )}

        <div className="error-actions">
          <button onClick={retryFailedResources}>
            Retry Failed Resources
          </button>
          <button onClick={enterFallbackMode}>
            Enter Fallback Mode
          </button>
        </div>
      </div>
    );
  }

  if (isInFallbackMode) {
    return (
      <div className="fallback-mode">
        <p>Running in fallback mode with reduced functionality</p>
      </div>
    );
  }

  return null;
};