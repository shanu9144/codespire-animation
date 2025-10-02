/**
 * Performance Stats Component
 * Displays real-time animation performance metrics
 */

import React from 'react';
import { useAnimationPerformance } from '../hooks/useAnimationEngine.js';

export function PerformanceStats({ 
  position = 'top-right',
  showMemory = true,
  showQuality = true,
  className = '',
  style = {}
}) {
  const { fps, frameTime, qualityLevel, memoryUsage } = useAnimationPerformance();

  const positionStyles = {
    'top-left': { top: '10px', left: '10px' },
    'top-right': { top: '10px', right: '10px' },
    'bottom-left': { bottom: '10px', left: '10px' },
    'bottom-right': { bottom: '10px', right: '10px' }
  };

  const baseStyle = {
    position: 'fixed',
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '12px',
    lineHeight: '1.4',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    ...positionStyles[position],
    ...style
  };

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'high': return '#00ff00';
      case 'medium': return '#ffff00';
      case 'low': return '#ff6600';
      default: return '#ffffff';
    }
  };

  const getFPSColor = (fps) => {
    if (fps >= 55) return '#00ff00';
    if (fps >= 30) return '#ffff00';
    return '#ff0000';
  };

  return (
    <div className={className} style={baseStyle}>
      <div style={{ marginBottom: '4px' }}>
        <span style={{ color: getFPSColor(fps) }}>
          FPS: {fps}
        </span>
        <span style={{ marginLeft: '12px', color: '#cccccc' }}>
          Frame: {frameTime}ms
        </span>
      </div>
      
      {showQuality && (
        <div style={{ marginBottom: '4px' }}>
          <span style={{ color: '#cccccc' }}>Quality: </span>
          <span style={{ color: getQualityColor(qualityLevel) }}>
            {qualityLevel.toUpperCase()}
          </span>
        </div>
      )}
      
      {showMemory && memoryUsage && memoryUsage.supported && (
        <div>
          <span style={{ color: '#cccccc' }}>Memory: </span>
          <span style={{ 
            color: memoryUsage.percentage > 80 ? '#ff0000' : 
                   memoryUsage.percentage > 60 ? '#ffff00' : '#00ff00'
          }}>
            {Math.round(memoryUsage.percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}

export default PerformanceStats;