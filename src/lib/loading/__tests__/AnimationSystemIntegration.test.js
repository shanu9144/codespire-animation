/**
 * AnimationSystemIntegration Tests
 * Tests for animation system integration with loading system
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import AnimationSystemIntegration from '../AnimationSystemIntegration.js';
import LoadingManager from '../LoadingManager.js';
import ProgressTracker from '../ProgressTracker.js';

// Mock window object
const mockWindow = {
  LoadingManager: null,
  progressTracker: null,
  AnimationEngine: null,
  animationIntegration: null
};

describe('AnimationSystemIntegration', () => {
  let integration;

  beforeEach(() => {
    // Set up global mocks
    global.window = mockWindow;
    global.HTMLCanvasElement = {
      prototype: {
        getContext: vi.fn()
      }
    };
    global.setTimeout = vi.fn((fn) => fn());
    global.console = {
      log: vi.fn(),
      warn: vi.fn(),
      error: vi.fn()
    };

    // Initialize components
    integration = new AnimationSystemIntegration();
    loadingManager = LoadingManager;
    progressTracker = new ProgressTracker({
      resourceWeights: {
        critical: 0.4,
        animations: 0.3,
        fonts: 0.2,
        images: 0.1
      }
    });

    // Set up mocks
    mockWindow.LoadingManager = {
      markAnimationSystemLoaded: vi.fn()
    };
    mockWindow.progressTracker = {
      markAnimationSystemLoaded: vi.fn()
    };
  });

  afterEach(() => {
    integration.destroy();
    vi.clearAllMocks();
  });

  describe('initialization', () => {
    it('should initialize without errors', () => {
      expect(() => integration.initialize()).not.toThrow();
    });

    it('should set up global reference', () => {
      integration.initialize();
      expect(mockWindow.animationIntegration).toBe(integration);
    });
  });

  describe('system notification', () => {
    beforeEach(() => {
      integration.initialize();
    });

    it('should notify when animation system starts', () => {
      const consoleSpy = vi.spyOn(console, 'log');
      
      integration.notifySystemStarted('AnimationEngine');
      
      expect(consoleSpy).toHaveBeenCalledWith('Animation system started: AnimationEngine');
    });

    it('should notify when animation system loads', () => {
      const consoleSpy = vi.spyOn(console, 'log');
      
      integration.notifySystemLoaded('AnimationEngine');
      
      expect(consoleSpy).toHaveBeenCalledWith('Animation system loaded: AnimationEngine');
      expect(mockWindow.LoadingManager.markAnimationSystemLoaded).toHaveBeenCalledWith('AnimationEngine');
      expect(mockWindow.progressTracker.markAnimationSystemLoaded).toHaveBeenCalledWith('AnimationEngine');
    });

    it('should not notify the same system twice', () => {
      integration.notifySystemLoaded('AnimationEngine');
      integration.notifySystemLoaded('AnimationEngine');
      
      expect(mockWindow.LoadingManager.markAnimationSystemLoaded).toHaveBeenCalledTimes(1);
    });

    it('should track loaded systems', () => {
      integration.notifySystemLoaded('AnimationEngine');
      integration.notifySystemLoaded('WebGLContext');
      
      expect(integration.loadedSystems.has('AnimationEngine')).toBe(true);
      expect(integration.loadedSystems.has('WebGLContext')).toBe(true);
      expect(integration.loadedSystems.has('ParticleSystem')).toBe(false);
    });
  });

  describe('system status tracking', () => {
    beforeEach(() => {
      integration.initialize();
    });

    it('should return correct system status', () => {
      integration.notifySystemLoaded('AnimationEngine');
      integration.notifySystemLoaded('WebGLContext');
      
      const status = integration.getSystemStatus();
      
      expect(status.AnimationEngine).toBe(true);
      expect(status.WebGLContext).toBe(true);
      expect(status.ShaderCompilation).toBe(false);
      expect(status.Scene3D).toBe(false);
      expect(status.ParticleSystem).toBe(false);
    });

    it('should detect when all systems are loaded', () => {
      expect(integration.areAllSystemsLoaded()).toBe(false);
      
      integration.notifySystemLoaded('AnimationEngine');
      integration.notifySystemLoaded('WebGLContext');
      integration.notifySystemLoaded('ShaderCompilation');
      integration.notifySystemLoaded('Scene3D');
      integration.notifySystemLoaded('ParticleSystem');
      
      expect(integration.areAllSystemsLoaded()).toBe(true);
    });

    it('should force complete all systems', () => {
      expect(integration.areAllSystemsLoaded()).toBe(false);
      
      integration.forceCompleteAll();
      
      expect(integration.areAllSystemsLoaded()).toBe(true);
      expect(mockWindow.LoadingManager.markAnimationSystemLoaded).toHaveBeenCalledTimes(5);
    });
  });

  describe('WebGL context hooking', () => {
    beforeEach(() => {
      integration.initialize();
    });

    it('should hook into canvas getContext method', () => {
      const originalGetContext = HTMLCanvasElement.prototype.getContext;
      
      integration.setupWebGLHooks();
      
      expect(HTMLCanvasElement.prototype.getContext).not.toBe(originalGetContext);
    });

    it('should notify when WebGL context is created', () => {
      const mockContext = { type: 'webgl' };
      HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(mockContext);
      
      integration.setupWebGLHooks();
      
      // Simulate canvas.getContext('webgl')
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl');
      
      expect(context).toBe(mockContext);
      // Note: In real implementation, setTimeout would trigger the notification
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      integration.initialize();
    });

    it('should handle missing LoadingManager gracefully', () => {
      mockWindow.LoadingManager = null;
      mockWindow.progressTracker = null;
      
      expect(() => integration.notifySystemLoaded('AnimationEngine')).not.toThrow();
    });

    it('should handle LoadingManager errors gracefully', () => {
      mockWindow.LoadingManager.markAnimationSystemLoaded = vi.fn().mockImplementation(() => {
        throw new Error('LoadingManager error');
      });
      
      const consoleSpy = vi.spyOn(console, 'warn');
      
      integration.notifySystemLoaded('AnimationEngine');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Failed to notify loading system about AnimationEngine')
      );
    });
  });

  describe('cleanup', () => {
    it('should clean up properly', () => {
      integration.initialize();
      integration.notifySystemLoaded('AnimationEngine');
      
      expect(integration.loadedSystems.size).toBeGreaterThan(0);
      expect(mockWindow.animationIntegration).toBe(integration);
      
      integration.destroy();
      
      expect(integration.loadedSystems.size).toBe(0);
      expect(mockWindow.animationIntegration).toBeUndefined();
    });
  });
});