/**
 * Basic Usage Example
 * Demonstrates how to use the core loading system infrastructure
 */

import LoadingManager from '../LoadingManager.js';

/**
 * Example: Basic loading system setup
 */
export function basicLoadingExample() {
  console.log('=== Basic Loading System Example ===');
  
  // 1. Initialize the loading manager
  LoadingManager.initialize({
    minimumLoadingTime: 1000, // Show loading for at least 1 second
    maximumLoadingTime: 5000  // Timeout after 5 seconds
  });
  
  // 2. Set up event listeners
  LoadingManager.onProgressUpdate((progress) => {
    console.log(`Loading progress: ${progress.toFixed(1)}%`);
  });
  
  LoadingManager.onLoadingComplete((loadingTime) => {
    console.log(`Loading completed in ${loadingTime.toFixed(2)}ms`);
  });
  
  LoadingManager.onError((error) => {
    console.error('Loading error:', error.message);
  });
  
  // 3. Start the loading process
  LoadingManager.startLoading();
  
  // 4. Track some resources
  LoadingManager.trackResource('/styles/main.css', 0.3, 'critical');
  LoadingManager.trackResource('/scripts/app.js', 0.4, 'critical');
  LoadingManager.trackAnimationSystem('particle-system', 0.3);
  
  // 5. Simulate resource loading
  setTimeout(() => {
    console.log('CSS loaded');
    LoadingManager.markResourceLoaded('/styles/main.css');
  }, 500);
  
  setTimeout(() => {
    console.log('JavaScript loaded');
    LoadingManager.markResourceLoaded('/scripts/app.js');
  }, 1000);
  
  setTimeout(() => {
    console.log('Particle system initialized');
    LoadingManager.markAnimationSystemLoaded('particle-system');
  }, 1500);
}

/**
 * Example: Advanced loading with progress breakdown
 */
export function advancedLoadingExample() {
  console.log('=== Advanced Loading System Example ===');
  
  // Initialize with custom configuration
  LoadingManager.initialize({
    resourceWeights: {
      critical: 0.5,
      animations: 0.3,
      fonts: 0.1,
      images: 0.1
    }
  });
  
  // Set up detailed progress monitoring
  LoadingManager.onProgressUpdate((progress) => {
    const state = LoadingManager.getState();
    const breakdown = state.progressBreakdown;
    
    if (breakdown) {
      console.log('Progress Breakdown:');
      console.log(`  Critical: ${breakdown.critical.progress.toFixed(1)}%`);
      console.log(`  Animations: ${breakdown.animations.progress.toFixed(1)}%`);
      console.log(`  Fonts: ${breakdown.fonts.progress.toFixed(1)}%`);
      console.log(`  Images: ${breakdown.images.progress.toFixed(1)}%`);
      console.log(`  Overall: ${progress.toFixed(1)}%`);
      console.log('---');
    }
  });
  
  // Start loading
  LoadingManager.startLoading();
  
  // Track multiple resources of different types
  const resources = [
    { url: '/styles/main.css', weight: 0.2, type: 'critical' },
    { url: '/scripts/app.js', weight: 0.3, type: 'critical' },
    { url: 'Inter-Regular.woff2', weight: 0.1, type: 'fonts' },
    { url: '/images/hero.jpg', weight: 0.1, type: 'images' }
  ];
  
  const animationSystems = [
    { name: 'webgl-context', weight: 0.1 },
    { name: 'particle-system', weight: 0.1 },
    { name: '3d-scene', weight: 0.1 }
  ];
  
  // Track all resources
  resources.forEach(resource => {
    LoadingManager.trackResource(resource.url, resource.weight, resource.type);
  });
  
  animationSystems.forEach(system => {
    LoadingManager.trackAnimationSystem(system.name, system.weight);
  });
  
  // Simulate staggered loading
  let delay = 200;
  resources.forEach(resource => {
    setTimeout(() => {
      console.log(`Loaded: ${resource.url}`);
      LoadingManager.markResourceLoaded(resource.url);
    }, delay);
    delay += 300;
  });
  
  animationSystems.forEach(system => {
    setTimeout(() => {
      console.log(`Initialized: ${system.name}`);
      LoadingManager.markAnimationSystemLoaded(system.name);
    }, delay);
    delay += 200;
  });
}

/**
 * Example: Error handling and timeout scenarios
 */
export function errorHandlingExample() {
  console.log('=== Error Handling Example ===');
  
  LoadingManager.initialize({
    maximumLoadingTime: 2000 // Short timeout for demo
  });
  
  // Set up error handling
  LoadingManager.onError((error) => {
    console.error('Loading error occurred:', error.message);
  });
  
  LoadingManager.onTimeout(() => {
    console.warn('Loading timed out - forcing completion');
  });
  
  LoadingManager.onLoadingComplete((loadingTime) => {
    const state = LoadingManager.getState();
    console.log(`Loading completed with ${state.hasError ? 'errors' : 'no errors'}`);
    console.log(`Final progress: ${state.progress}%`);
  });
  
  // Start loading
  LoadingManager.startLoading();
  
  // Track a resource but don't mark it as loaded (will timeout)
  LoadingManager.trackResource('/slow-resource.js', 1.0, 'critical');
  
  // Simulate an error after 1 second
  setTimeout(() => {
    LoadingManager.handleError(new Error('Simulated network error'));
  }, 1000);
}

// Export all examples
export default {
  basicLoadingExample,
  advancedLoadingExample,
  errorHandlingExample
};