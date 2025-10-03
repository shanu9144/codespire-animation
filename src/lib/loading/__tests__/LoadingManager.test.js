/**
 * LoadingManager Tests
 * Basic tests to verify core loading system functionality
 */

import LoadingManager from '../LoadingManager.js';

// Mock the dependencies
jest.mock('../../../animations/core/PerformanceManager.js', () => ({
  default: {
    initialize: jest.fn(),
    getMetrics: jest.fn(() => ({ fps: 60, qualityLevel: 'high' }))
  }
}));

jest.mock('../../../animations/core/DeviceCapabilities.js', () => ({
  default: {
    getCapabilities: jest.fn(() => ({
      performance: 'high',
      isMobile: false,
      connection: { effectiveType: '4g' }
    })),
    prefersReducedMotion: jest.fn(() => false)
  }
}));

describe('LoadingManager', () => {
  beforeEach(() => {
    // Reset the LoadingManager before each test
    LoadingManager.reset();
  });

  afterEach(() => {
    // Clean up after each test
    LoadingManager.destroy();
  });

  test('should initialize with default configuration', () => {
    LoadingManager.initialize();
    
    const state = LoadingManager.getState();
    expect(state.isInitialized).toBe(true);
    expect(state.config).toBeDefined();
    expect(state.config.minimumLoadingTime).toBe(800);
  });

  test('should start and complete loading process', (done) => {
    LoadingManager.initialize();
    
    // Set up completion callback
    LoadingManager.onLoadingComplete((loadingTime) => {
      expect(loadingTime).toBeGreaterThan(0);
      expect(LoadingManager.getState().isLoading).toBe(false);
      done();
    });
    
    // Start loading
    LoadingManager.startLoading();
    expect(LoadingManager.getState().isLoading).toBe(true);
    
    // Simulate progress updates
    setTimeout(() => LoadingManager.updateProgress(50), 10);
    setTimeout(() => LoadingManager.updateProgress(100), 20);
  });

  test('should track resources correctly', () => {
    LoadingManager.initialize();
    LoadingManager.startLoading();
    
    // Track a resource
    LoadingManager.trackResource('test.css', 0.5, 'critical');
    
    const state = LoadingManager.getState();
    expect(state.progressBreakdown).toBeDefined();
  });

  test('should handle progress updates', (done) => {
    LoadingManager.initialize();
    
    let progressUpdates = [];
    LoadingManager.onProgressUpdate((progress) => {
      progressUpdates.push(progress);
      
      if (progress === 100) {
        expect(progressUpdates.length).toBeGreaterThan(0);
        expect(progressUpdates[progressUpdates.length - 1]).toBe(100);
        done();
      }
    });
    
    LoadingManager.startLoading();
    LoadingManager.updateProgress(25);
    LoadingManager.updateProgress(50);
    LoadingManager.updateProgress(75);
    LoadingManager.updateProgress(100);
  });

  test('should handle timeout correctly', (done) => {
    LoadingManager.initialize({
      maximumLoadingTime: 100, // Very short timeout for testing
      minimumLoadingTime: 0
    });
    
    LoadingManager.onTimeout(() => {
      expect(LoadingManager.getState().progress).toBe(100);
      done();
    });
    
    LoadingManager.startLoading();
    // Don't update progress, let it timeout
  });

  test('should handle errors gracefully', (done) => {
    LoadingManager.initialize();
    
    LoadingManager.onError((error) => {
      expect(error).toBeInstanceOf(Error);
      expect(LoadingManager.getState().hasError).toBe(true);
      done();
    });
    
    LoadingManager.startLoading();
    LoadingManager.handleError(new Error('Test error'));
  });
});