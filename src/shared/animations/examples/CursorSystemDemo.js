import React from 'react';
import { CursorSystem, useCursorSystem } from '../cursor';

/**
 * CursorSystemDemo Component
 * 
 * Demonstrates the magnetic cursor system with various interactive elements.
 * Shows how to use magnetic fields, touch alternatives, and device detection.
 */
const CursorSystemDemo = () => {
  const { addMagneticElement, shouldUseCursor } = useCursorSystem();
  
  return (
    <CursorSystem
      cursorType="magnetic-with-trail"
      magneticConfig={{
        strength: 0.4,
        radius: 100,
        ease: 0.15
      }}
      trailConfig={{
        maxParticles: 20,
        particleLife: 1000,
        spawnRate: 50,
        particleSize: 4,
        colors: ['#384bff', '#00d4ff', '#6c5ce7'],
        fadeOut: true
      }}
      touchConfig={{
        enableRipples: true,
        enableHaptics: true,
        enableVisualFeedback: true,
        rippleColor: '#384bff'
      }}
    >
      <div className="cursor-demo-container" style={{ padding: '2rem', minHeight: '100vh' }}>
        <h1>Magnetic Cursor System Demo</h1>
        <p>
          {shouldUseCursor 
            ? 'Move your cursor around to see magnetic attraction effects and particle trails.'
            : 'Touch the elements below to see touch-friendly interaction effects.'
          }
        </p>
        
        <div style={{ display: 'grid', gap: '2rem', marginTop: '2rem' }}>
          {/* Magnetic Button */}
          <button
            data-magnetic="true"
            data-magnetic-strength="0.5"
            data-magnetic-radius="120"
            style={{
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              backgroundColor: '#384bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Magnetic Button (Strong)
          </button>
          
          {/* Magnetic Link */}
          <a
            href="#"
            data-magnetic="true"
            data-magnetic-strength="0.3"
            data-magnetic-radius="80"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              color: '#00d4ff',
              textDecoration: 'none',
              border: '2px solid #00d4ff',
              borderRadius: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            Magnetic Link (Medium)
          </a>
          
          {/* Magnetic Card */}
          <div
            className="card"
            data-magnetic="true"
            data-magnetic-strength="0.2"
            data-magnetic-radius="100"
            style={{
              padding: '2rem',
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer'
            }}
          >
            <h3>Magnetic Card (Subtle)</h3>
            <p>This card has subtle magnetic attraction. The cursor will be gently pulled towards it.</p>
          </div>
          
          {/* Interactive Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                data-magnetic="true"
                data-magnetic-strength="0.25"
                data-magnetic-radius="60"
                style={{
                  padding: '1rem',
                  backgroundColor: `hsl(${240 + i * 30}, 70%, 60%)`,
                  color: 'white',
                  borderRadius: '8px',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
              >
                Item {i}
              </div>
            ))}
          </div>
          
          {/* Text Input (Different cursor state) */}
          <input
            type="text"
            placeholder="Type here (cursor changes to text mode)"
            style={{
              padding: '1rem',
              fontSize: '1rem',
              border: '2px solid #e0e0e0',
              borderRadius: '6px',
              outline: 'none'
            }}
          />
          
          {/* Non-magnetic elements for comparison */}
          <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
            <h4>Regular Elements (No Magnetic Effect)</h4>
            <p>These elements don&apos;t have magnetic properties, so the cursor behaves normally around them.</p>
            <button style={{ padding: '0.5rem 1rem', margin: '0.5rem' }}>Regular Button</button>
            <a href="#" style={{ margin: '0.5rem', color: '#666' }}>Regular Link</a>
          </div>
        </div>
        
        <div style={{ marginTop: '3rem', padding: '1rem', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
          <h4>Device Information</h4>
          <p>Current mode: {shouldUseCursor ? 'Desktop Cursor Mode' : 'Touch Mode'}</p>
          <p>The system automatically detects your device capabilities and provides the appropriate interaction method.</p>
        </div>
      </div>
    </CursorSystem>
  );
};

export default CursorSystemDemo;