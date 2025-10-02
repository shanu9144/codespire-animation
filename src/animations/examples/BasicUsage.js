/**
 * Basic Animation System Usage Example
 * Demonstrates how to initialize and use the animation system
 */

import React, { useEffect, useState } from 'react';
import { useAnimationEngine, useReducedMotion } from '../hooks/useAnimationEngine.js';
import { initializeCodeSpireAnimations } from '../utils/AnimationInitializer.js';
import PerformanceStats from '../components/PerformanceStats.js';

// Example animation class
class ExampleAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.options = { duration: 1000, ...options };
    this.isPlaying = false;
    this.isPaused = false;
    this.startTime = 0;
    this.pausedTime = 0;
    this.animationFrame = null;
  }

  async play(options = {}) {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.isPaused = false;
    this.startTime = performance.now() - this.pausedTime;
    
    return new Promise((resolve) => {
      const animate = (currentTime) => {
        if (!this.isPlaying) {
          resolve();
          return;
        }

        const elapsed = currentTime - this.startTime;
        const progress = Math.min(elapsed / this.options.duration, 1);
        
        // Simple fade-in animation
        if (this.element) {
          this.element.style.opacity = progress;
          this.element.style.transform = `translateY(${(1 - progress) * 20}px)`;
        }

        if (progress < 1) {
          this.animationFrame = requestAnimationFrame(animate);
        } else {
          this.isPlaying = false;
          this.pausedTime = 0;
          resolve();
        }
      };

      this.animationFrame = requestAnimationFrame(animate);
    });
  }

  pause() {
    if (!this.isPlaying) return;
    
    this.isPlaying = false;
    this.isPaused = true;
    this.pausedTime = performance.now() - this.startTime;
    
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  stop() {
    this.isPlaying = false;
    this.isPaused = false;
    this.pausedTime = 0;
    
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    
    if (this.element) {
      this.element.style.opacity = '';
      this.element.style.transform = '';
    }
  }

  update(deltaTime) {
    // Update method called by animation engine
    // Can be used for continuous animations
  }

  onQualityChange(newLevel, config) {
    // Adjust animation based on quality level
    if (newLevel === 'low') {
      this.options.duration = Math.min(this.options.duration, 500);
    }
  }
}

export function BasicUsageExample() {
  const [initStatus, setInitStatus] = useState(null);
  const { prefersReducedMotion } = useReducedMotion();
  
  const {
    isInitialized,
    metrics,
    qualityLevel,
    playAnimation,
    registerAnimation,
    engine
  } = useAnimationEngine({
    autoInitialize: false, // We'll initialize manually
    trackMetrics: true,
    config: {
      showPerformanceStats: true,
      respectReducedMotion: true
    }
  });

  // Initialize animation system
  useEffect(() => {
    const initialize = async () => {
      try {
        const result = await initializeCodeSpireAnimations();
        setInitStatus(result);
      } catch (error) {
        setInitStatus({ success: false, error: error.message });
      }
    };

    initialize();
  }, []);

  // Register example animations when initialized
  useEffect(() => {
    if (!isInitialized) return;

    // Register a simple fade-in animation
    const fadeElement = document.getElementById('fade-example');
    if (fadeElement) {
      const fadeAnimation = new ExampleAnimation(fadeElement, { duration: 1000 });
      registerAnimation('fade-example', fadeAnimation);
    }

  }, [isInitialized, registerAnimation]);

  const handlePlayFadeAnimation = () => {
    playAnimation('fade-example');
  };

  const handleSetQuality = (level) => {
    engine.setPerformanceMode(level);
  };

  if (!initStatus) {
    return <div>Initializing animation system...</div>;
  }

  if (!initStatus.success) {
    return (
      <div>
        <h3>Animation System Failed to Initialize</h3>
        <p>Error: {initStatus.error}</p>
        <p>Fallback mode active - basic functionality available</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Animation System Example</h2>
      
      {/* Performance Stats */}
      <PerformanceStats position="top-right" />
      
      {/* Status Information */}
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <h3>System Status</h3>
        <p><strong>Initialized:</strong> {isInitialized ? 'Yes' : 'No'}</p>
        <p><strong>Quality Level:</strong> {qualityLevel}</p>
        <p><strong>Reduced Motion:</strong> {prefersReducedMotion ? 'Enabled' : 'Disabled'}</p>
        {metrics && (
          <>
            <p><strong>FPS:</strong> {Math.round(metrics.fps)}</p>
            <p><strong>Active Animations:</strong> {metrics.activeAnimations}</p>
          </>
        )}
      </div>

      {/* Device Capabilities */}
      {initStatus.capabilities && (
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#e8f4fd', borderRadius: '4px' }}>
          <h3>Device Capabilities</h3>
          <p><strong>Performance Level:</strong> {initStatus.capabilities.performance}</p>
          <p><strong>Mobile Device:</strong> {initStatus.capabilities.isMobile ? 'Yes' : 'No'}</p>
          <p><strong>CPU Cores:</strong> {initStatus.capabilities.cores}</p>
          <p><strong>WebGL Support:</strong> {initStatus.capabilities.gpu.webgl.supported ? 'Yes' : 'No'}</p>
          <p><strong>Memory Tier:</strong> {initStatus.capabilities.memory.estimated}</p>
        </div>
      )}

      {/* Animation Controls */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Animation Controls</h3>
        <button 
          onClick={handlePlayFadeAnimation}
          style={{ marginRight: '10px', padding: '8px 16px' }}
        >
          Play Fade Animation
        </button>
        
        <div style={{ marginTop: '10px' }}>
          <label>Force Quality Level: </label>
          <button onClick={() => handleSetQuality('high')} style={{ margin: '0 5px', padding: '4px 8px' }}>High</button>
          <button onClick={() => handleSetQuality('medium')} style={{ margin: '0 5px', padding: '4px 8px' }}>Medium</button>
          <button onClick={() => handleSetQuality('low')} style={{ margin: '0 5px', padding: '4px 8px' }}>Low</button>
        </div>
      </div>

      {/* Example Animation Target */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Animation Example</h3>
        <div 
          id="fade-example"
          style={{ 
            width: '200px', 
            height: '100px', 
            backgroundColor: '#384bff', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            opacity: 0
          }}
        >
          Animated Element
        </div>
      </div>

      {/* Configuration Display */}
      <div style={{ padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
        <h3>Current Configuration</h3>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>
          {JSON.stringify(initStatus.config, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default BasicUsageExample;