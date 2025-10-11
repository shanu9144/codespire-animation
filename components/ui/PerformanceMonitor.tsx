/**
 * Performance monitoring component for development
 * Shows real-time performance metrics and device capabilities
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useAnimationPerformance } from '../../lib/performance';

interface PerformanceMonitorProps {
  show?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ show = false }) => {
  const { config, isLowEndDevice, shouldReduceAnimations } = useAnimationPerformance();
  const [fps, setFps] = useState<number>(60);
  const [frameCount, setFrameCount] = useState<number>(0);

  useEffect(() => {
    if (!show || typeof window === 'undefined') return;

    let animationId: number;
    let lastTime = performance.now();
    let frames = 0;

    const measureFPS = (currentTime: number) => {
      frames++;
      
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frames * 1000) / (currentTime - lastTime)));
        setFrameCount(prev => prev + frames);
        frames = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    animationId = requestAnimationFrame(measureFPS);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [show]);

  if (!show || process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 text-white p-3 rounded-lg text-xs font-mono max-w-xs">
      <div className="font-bold mb-2 text-primary">Performance Monitor</div>
      
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>FPS:</span>
          <span className={fps < 30 ? 'text-red-400' : fps < 45 ? 'text-yellow-400' : 'text-green-400'}>
            {fps}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Frames:</span>
          <span>{frameCount.toLocaleString()}</span>
        </div>
        
        <div className="border-t border-gray-600 pt-1 mt-2">
          <div className="flex justify-between">
            <span>Device:</span>
            <span className={isLowEndDevice ? 'text-orange-400' : 'text-green-400'}>
              {isLowEndDevice ? 'Low-end' : 'High-end'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>Motion:</span>
            <span className={shouldReduceAnimations ? 'text-orange-400' : 'text-green-400'}>
              {shouldReduceAnimations ? 'Reduced' : 'Full'}
            </span>
          </div>
        </div>
        
        <div className="border-t border-gray-600 pt-1 mt-2">
          <div className="text-xs text-gray-400 mb-1">Animation Config:</div>
          <div className="flex justify-between">
            <span>Complex:</span>
            <span className={config.enableComplexAnimations ? 'text-green-400' : 'text-red-400'}>
              {config.enableComplexAnimations ? 'On' : 'Off'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>Floating:</span>
            <span className={config.enableFloatingElements ? 'text-green-400' : 'text-red-400'}>
              {config.enableFloatingElements ? 'On' : 'Off'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>Blur:</span>
            <span className={config.enableBlur ? 'text-green-400' : 'text-red-400'}>
              {config.enableBlur ? 'On' : 'Off'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>Duration:</span>
            <span>{config.animationDuration}x</span>
          </div>
        </div>
        
        <div className="border-t border-gray-600 pt-1 mt-2">
          <div className="text-xs text-gray-400 mb-1">Hardware:</div>
          <div className="flex justify-between">
            <span>Cores:</span>
            <span>{typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 'Unknown') : 'SSR'}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Memory:</span>
            <span>{typeof navigator !== 'undefined' ? ((navigator as any).deviceMemory ? `${(navigator as any).deviceMemory}GB` : 'Unknown') : 'SSR'}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Connection:</span>
            <span>{typeof navigator !== 'undefined' ? ((navigator as any).connection?.effectiveType || 'Unknown') : 'SSR'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;