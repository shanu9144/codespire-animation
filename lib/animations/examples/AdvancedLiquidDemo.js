"use client";

import React, { useState, useCallback } from 'react';
import { AdvancedLiquidEffect } from '../fluid';

/**
 * AdvancedLiquidDemo Component
 * 
 * Demonstrates the advanced shader-based liquid effects with interactive controls
 */

const AdvancedLiquidDemo = () => {
  const [config, setConfig] = useState({
    colors: ['#384bff', '#5865f2', '#7c3aed'],
    opacity: 0.6,
    flowSpeed: 0.5,
    turbulence: 1.0,
    viscosity: 0.3,
    flowDirection: [1.0, 0.5],
    noiseScale: 0.01,
    distortionStrength: 20.0,
    resolution: 64,
    enableMouseInteraction: true,
    enablePerformanceScaling: true
  });

  const [performanceMetrics, setPerformanceMetrics] = useState({
    fps: 60,
    qualityLevel: 'high',
    isWebGLSupported: true
  });

  const handleConfigChange = useCallback((key, value) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const handlePerformanceChange = useCallback((metrics) => {
    setPerformanceMetrics(metrics);
  }, []);

  const presets = {
    calm: {
      flowSpeed: 0.2,
      turbulence: 0.5,
      viscosity: 0.5,
      distortionStrength: 10.0
    },
    energetic: {
      flowSpeed: 1.0,
      turbulence: 1.5,
      viscosity: 0.1,
      distortionStrength: 30.0
    },
    chaotic: {
      flowSpeed: 1.5,
      turbulence: 2.0,
      viscosity: 0.05,
      distortionStrength: 50.0
    }
  };

  const applyPreset = (presetName) => {
    const preset = presets[presetName];
    setConfig(prev => ({
      ...prev,
      ...preset
    }));
  };

  return (
    <div className="advanced-liquid-demo">
      <div className="demo-container">
        <div className="liquid-canvas-container">
          <AdvancedLiquidEffect
            width={800}
            height={600}
            {...config}
            onPerformanceChange={handlePerformanceChange}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px'
            }}
          />
          
          {/* Performance overlay */}
          <div className="performance-overlay">
            <div className="performance-metrics">
              <span>FPS: {performanceMetrics.fps}</span>
              <span>Quality: {performanceMetrics.qualityLevel}</span>
              <span>WebGL: {performanceMetrics.isWebGLSupported ? '✓' : '✗'}</span>
            </div>
          </div>
        </div>

        <div className="controls-panel">
          <h3>Liquid Effect Controls</h3>
          
          {/* Presets */}
          <div className="control-group">
            <label>Presets:</label>
            <div className="preset-buttons">
              {Object.keys(presets).map(presetName => (
                <button
                  key={presetName}
                  onClick={() => applyPreset(presetName)}
                  className="preset-button"
                >
                  {presetName}
                </button>
              ))}
            </div>
          </div>

          {/* Flow Controls */}
          <div className="control-group">
            <label>
              Flow Speed: {config.flowSpeed.toFixed(2)}
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={config.flowSpeed}
                onChange={(e) => handleConfigChange('flowSpeed', parseFloat(e.target.value))}
              />
            </label>
          </div>

          <div className="control-group">
            <label>
              Turbulence: {config.turbulence.toFixed(2)}
              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={config.turbulence}
                onChange={(e) => handleConfigChange('turbulence', parseFloat(e.target.value))}
              />
            </label>
          </div>

          <div className="control-group">
            <label>
              Viscosity: {config.viscosity.toFixed(2)}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={config.viscosity}
                onChange={(e) => handleConfigChange('viscosity', parseFloat(e.target.value))}
              />
            </label>
          </div>

          {/* Visual Controls */}
          <div className="control-group">
            <label>
              Opacity: {config.opacity.toFixed(2)}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={config.opacity}
                onChange={(e) => handleConfigChange('opacity', parseFloat(e.target.value))}
              />
            </label>
          </div>

          <div className="control-group">
            <label>
              Distortion Strength: {config.distortionStrength.toFixed(1)}
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={config.distortionStrength}
                onChange={(e) => handleConfigChange('distortionStrength', parseFloat(e.target.value))}
              />
            </label>
          </div>

          <div className="control-group">
            <label>
              Noise Scale: {config.noiseScale.toFixed(3)}
              <input
                type="range"
                min="0.001"
                max="0.05"
                step="0.001"
                value={config.noiseScale}
                onChange={(e) => handleConfigChange('noiseScale', parseFloat(e.target.value))}
              />
            </label>
          </div>

          {/* Performance Controls */}
          <div className="control-group">
            <label>
              <input
                type="checkbox"
                checked={config.enableMouseInteraction}
                onChange={(e) => handleConfigChange('enableMouseInteraction', e.target.checked)}
              />
              Mouse Interaction
            </label>
          </div>

          <div className="control-group">
            <label>
              <input
                type="checkbox"
                checked={config.enablePerformanceScaling}
                onChange={(e) => handleConfigChange('enablePerformanceScaling', e.target.checked)}
              />
              Auto Performance Scaling
            </label>
          </div>

          {/* Color Controls */}
          <div className="control-group">
            <label>Colors:</label>
            <div className="color-inputs">
              {config.colors.map((color, index) => (
                <input
                  key={index}
                  type="color"
                  value={color}
                  onChange={(e) => {
                    const newColors = [...config.colors];
                    newColors[index] = e.target.value;
                    handleConfigChange('colors', newColors);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .advanced-liquid-demo {
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .demo-container {
          display: flex;
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .liquid-canvas-container {
          position: relative;
          flex-shrink: 0;
        }

        .performance-overlay {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 12px;
        }

        .performance-metrics {
          display: flex;
          gap: 10px;
        }

        .controls-panel {
          flex: 1;
          background: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
          max-height: 600px;
          overflow-y: auto;
        }

        .controls-panel h3 {
          margin-top: 0;
          color: #333;
        }

        .control-group {
          margin-bottom: 15px;
        }

        .control-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
          color: #555;
        }

        .control-group input[type="range"] {
          width: 100%;
          margin-top: 5px;
        }

        .control-group input[type="checkbox"] {
          margin-right: 8px;
        }

        .preset-buttons {
          display: flex;
          gap: 8px;
          margin-top: 5px;
        }

        .preset-button {
          padding: 6px 12px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 4px;
          cursor: pointer;
          text-transform: capitalize;
          transition: all 0.2s;
        }

        .preset-button:hover {
          background: #384bff;
          color: white;
          border-color: #384bff;
        }

        .color-inputs {
          display: flex;
          gap: 8px;
          margin-top: 5px;
        }

        .color-inputs input[type="color"] {
          width: 40px;
          height: 30px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .demo-container {
            flex-direction: column;
          }
          
          .liquid-canvas-container canvas {
            width: 100%;
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdvancedLiquidDemo;