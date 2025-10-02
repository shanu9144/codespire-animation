"use client";

import React from 'react';
import { AdvancedLiquidDemo } from '../../animations/examples';

/**
 * Test page for advanced liquid shader effects
 */
export default function TestLiquidShadersPage() {
  return (
    <div className="test-liquid-shaders-page">
      <div className="page-header">
        <h1>Advanced Liquid Shader Effects</h1>
        <p>
          Interactive demonstration of WebGL-based liquid animations with noise-based 
          distortion, flow effects, and performance optimization.
        </p>
      </div>

      <AdvancedLiquidDemo />

      <div className="features-section">
        <h2>Features Demonstrated</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🌊 Advanced Noise-Based Distortion</h3>
            <p>
              Multi-octave fractal noise creates complex, organic liquid patterns 
              with realistic flow behavior and turbulence effects.
            </p>
          </div>
          
          <div className="feature-card">
            <h3>⚡ Performance Optimization</h3>
            <p>
              Automatic quality scaling based on device performance, with shader 
              complexity reduction and efficient WebGL rendering.
            </p>
          </div>
          
          <div className="feature-card">
            <h3>🎨 Dynamic Color Mixing</h3>
            <p>
              Real-time color blending based on flow patterns, with shimmer effects 
              and density-based brightness variations.
            </p>
          </div>
          
          <div className="feature-card">
            <h3>🖱️ Mouse Interaction</h3>
            <p>
              Interactive liquid density fields that respond to mouse movement, 
              creating ripples and disturbances in the flow.
            </p>
          </div>
          
          <div className="feature-card">
            <h3>🔧 Configurable Parameters</h3>
            <p>
              Extensive customization options for flow speed, turbulence, viscosity, 
              and visual properties with real-time updates.
            </p>
          </div>
          
          <div className="feature-card">
            <h3>📱 Responsive Fallbacks</h3>
            <p>
              Graceful degradation to CSS-based animations when WebGL is not 
              supported, ensuring compatibility across all devices.
            </p>
          </div>
        </div>
      </div>

      <div className="technical-details">
        <h2>Technical Implementation</h2>
        <div className="tech-grid">
          <div className="tech-item">
            <h4>WebGL Shaders</h4>
            <p>Custom GLSL vertex and fragment shaders for GPU-accelerated liquid simulation</p>
          </div>
          
          <div className="tech-item">
            <h4>Simplex Noise</h4>
            <p>Optimized noise functions for organic distortion and flow field generation</p>
          </div>
          
          <div className="tech-item">
            <h4>Fractal Brownian Motion</h4>
            <p>Multi-octave noise combining for complex, natural-looking patterns</p>
          </div>
          
          <div className="tech-item">
            <h4>Performance Monitoring</h4>
            <p>Real-time FPS tracking with automatic quality adjustment</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .test-liquid-shaders-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 20px;
        }

        .page-header {
          text-align: center;
          margin-bottom: 40px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .page-header h1 {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #384bff, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-header p {
          font-size: 1.1rem;
          color: #666;
          line-height: 1.6;
        }

        .features-section {
          max-width: 1200px;
          margin: 60px auto;
        }

        .features-section h2 {
          text-align: center;
          font-size: 2rem;
          color: #333;
          margin-bottom: 40px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .feature-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .feature-card h3 {
          font-size: 1.2rem;
          color: #333;
          margin-bottom: 12px;
        }

        .feature-card p {
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        .technical-details {
          max-width: 1000px;
          margin: 60px auto;
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .technical-details h2 {
          text-align: center;
          font-size: 2rem;
          color: #333;
          margin-bottom: 30px;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .tech-item {
          text-align: center;
          padding: 20px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background: #f9f9f9;
        }

        .tech-item h4 {
          color: #384bff;
          margin-bottom: 8px;
          font-size: 1.1rem;
        }

        .tech-item p {
          color: #666;
          font-size: 0.9rem;
          line-height: 1.4;
          margin: 0;
        }

        @media (max-width: 768px) {
          .page-header h1 {
            font-size: 2rem;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .tech-grid {
            grid-template-columns: 1fr;
          }
          
          .technical-details {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}