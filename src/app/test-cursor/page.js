'use client';

import React from 'react';
import { CursorSystem } from '../../animations';

export default function TestCursor() {
  return (
    <CursorSystem
      cursorType="invisible-magnetic"
      magneticConfig={{
        strength: 0.3,
        radius: 80,
        ease: 0.15
      }}
    >
      <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <h1>Cursor System Test</h1>
        <p>Move your cursor around to test the magnetic effects. The cursor looks normal but elements will attract it.</p>
        
        <div style={{ marginTop: '2rem', display: 'grid', gap: '2rem' }}>
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
              width: 'fit-content'
            }}
          >
            Magnetic Link (Medium)
          </a>
          
          <div
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
            <p>This card has subtle magnetic attraction.</p>
          </div>
        </div>
      </div>
    </CursorSystem>
  );
}