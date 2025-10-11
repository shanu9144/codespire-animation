/**
 * Connection Lines Demo
 * Demonstrates particle connection lines functionality
 */

import React, { useState, useRef } from 'react';
import ParticleFieldComponent from '../particles/ParticleFieldComponent.js';

const ConnectionLinesDemo = () => {
  const [connectionLines, setConnectionLines] = useState(true);
  const [connectionDistance, setConnectionDistance] = useState(100);
  const [connectionOpacity, setConnectionOpacity] = useState(0.2);
  const [maxConnections, setMaxConnections] = useState(500);
  const [particleCount, setParticleCount] = useState(200);
  
  const particleFieldRef = useRef(null);

  const handleConnectionToggle = () => {
    setConnectionLines(!connectionLines);
  };

  const handleDistanceChange = (e) => {
    setConnectionDistance(parseInt(e.target.value));
  };

  const handleOpacityChange = (e) => {
    setConnectionOpacity(parseFloat(e.target.value));
  };

  const handleMaxConnectionsChange = (e) => {
    setMaxConnections(parseInt(e.target.value));
  };

  const handleParticleCountChange = (e) => {
    setParticleCount(parseInt(e.target.value));
  };

  const getMetrics = () => {
    if (particleFieldRef.current?.particleField) {
      const metrics = particleFieldRef.current.particleField.getMetrics();
      console.log('Particle Field Metrics:', metrics);
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {/* Controls Panel */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        zIndex: 10,
        minWidth: '300px'
      }}>
        <h3 style={{ margin: '0 0 15px 0' }}>Connection Lines Demo</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            <input
              type="checkbox"
              checked={connectionLines}
              onChange={handleConnectionToggle}
              style={{ marginRight: '8px' }}
            />
            Enable Connection Lines
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Particle Count: {particleCount}
          </label>
          <input
            type="range"
            min="50"
            max="1000"
            value={particleCount}
            onChange={handleParticleCountChange}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Connection Distance: {connectionDistance}px
          </label>
          <input
            type="range"
            min="50"
            max="200"
            value={connectionDistance}
            onChange={handleDistanceChange}
            style={{ width: '100%' }}
            disabled={!connectionLines}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Connection Opacity: {connectionOpacity}
          </label>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.1"
            value={connectionOpacity}
            onChange={handleOpacityChange}
            style={{ width: '100%' }}
            disabled={!connectionLines}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Max Connections: {maxConnections}
          </label>
          <input
            type="range"
            min="100"
            max="1000"
            step="50"
            value={maxConnections}
            onChange={handleMaxConnectionsChange}
            style={{ width: '100%' }}
            disabled={!connectionLines}
          />
        </div>

        <button
          onClick={getMetrics}
          style={{
            background: '#384bff',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Log Metrics
        </button>
      </div>

      {/* Particle Field */}
      <ParticleFieldComponent
        ref={particleFieldRef}
        particleCount={particleCount}
        particleSize={{ min: 2, max: 6 }}
        speed={{ min: 0.3, max: 1.5 }}
        color="#384bff"
        opacity={{ min: 0.4, max: 0.9 }}
        mouseInteraction={true}
        scrollParallax={true}
        connectionLines={connectionLines}
        connectionDistance={connectionDistance}
        connectionOpacity={connectionOpacity}
        maxConnections={maxConnections}
        adaptiveQuality={true}
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
        }}
        onInitialized={(particleField) => {
          console.log('ParticleField initialized:', particleField);
        }}
        onError={(error) => {
          console.error('ParticleField error:', error);
        }}
      />

      {/* Instructions */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        maxWidth: '300px'
      }}>
        <h4 style={{ margin: '0 0 10px 0' }}>Instructions</h4>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Move your mouse to see particle interactions</li>
          <li>Toggle connection lines on/off</li>
          <li>Adjust distance threshold for connections</li>
          <li>Change opacity and max connection limits</li>
          <li>Scroll to see parallax effects</li>
        </ul>
      </div>
    </div>
  );
};

export default ConnectionLinesDemo;