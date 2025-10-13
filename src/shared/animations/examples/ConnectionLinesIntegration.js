/**
 * Connection Lines Integration Example
 * Shows how to integrate connection lines with existing CodeSpire components
 */

import React, { useEffect, useRef } from 'react';
import ParticleFieldComponent from '../particles/ParticleFieldComponent.js';

const ConnectionLinesIntegration = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    // Example of how to integrate with existing Hero section
    console.log('Connection Lines integrated with Hero section');
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      position: 'relative',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Hero Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        color: 'white',
        maxWidth: '800px',
        padding: '40px'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          background: 'linear-gradient(45deg, #384bff, #00d4ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          CodeSpire Solutions
        </h1>
        
        <p style={{
          fontSize: '1.2rem',
          marginBottom: '30px',
          opacity: 0.9,
          lineHeight: 1.6
        }}>
          Experience our advanced particle system with interactive connection lines. 
          Move your mouse to see particles respond and connect dynamically.
        </p>

        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button style={{
            background: '#384bff',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            Get Started
          </button>
          
          <button style={{
            background: 'transparent',
            color: 'white',
            border: '2px solid #384bff',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            Learn More
          </button>
        </div>
      </div>

      {/* Particle Field with Connection Lines */}
      <ParticleFieldComponent
        ref={heroRef}
        particleCount={300}
        particleSize={{ min: 1, max: 3 }}
        speed={{ min: 0.2, max: 1.0 }}
        color="#384bff"
        opacity={{ min: 0.3, max: 0.7 }}
        mouseInteraction={true}
        scrollParallax={true}
        connectionLines={true}
        connectionDistance={120}
        connectionOpacity={0.15}
        maxConnections={400}
        adaptiveQuality={true}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
        onInitialized={(particleField) => {
          console.log('Particle field with connection lines initialized:', particleField);
          
          // Example: Access connection metrics
          setTimeout(() => {
            const metrics = particleField.getMetrics();
            console.log('Connection metrics:', metrics.connections);
          }, 1000);
        }}
        onError={(error) => {
          console.error('Particle field error:', error);
        }}
      />

      {/* Performance Info */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '12px',
        zIndex: 10
      }}>
        <div>✨ Connection Lines Active</div>
        <div>🎯 Mouse Interaction Enabled</div>
        <div>📱 Adaptive Quality Scaling</div>
        <div>⚡ WebGL Accelerated</div>
      </div>

      {/* Instructions */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        background: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '14px',
        maxWidth: '300px',
        zIndex: 10
      }}>
        <strong>Interactive Features:</strong>
        <ul style={{ margin: '10px 0 0 0', paddingLeft: '20px' }}>
          <li>Move mouse to attract particles</li>
          <li>Watch connection lines form dynamically</li>
          <li>Scroll to see parallax effects</li>
          <li>Hover over buttons for magnetic effects</li>
        </ul>
      </div>
    </div>
  );
};

export default ConnectionLinesIntegration;