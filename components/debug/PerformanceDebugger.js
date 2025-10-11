"use client";

import React, { useState, useEffect, useRef } from 'react';

/**
 * PerformanceDebugger Component
 * 
 * Real-time performance monitoring for debugging animation issues
 */

const PerformanceDebugger = ({ show = false }) => {
  const [metrics, setMetrics] = useState({
    fps: 0,
    frameTime: 0,
    memoryUsage: 0,
    animationCount: 0
  });
  
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const animationFrameRef = useRef();

  useEffect(() => {
    if (!show) return;

    const measurePerformance = () => {
      const now = performance.now();
      const delta = now - lastTimeRef.current;
      
      frameCountRef.current++;
      
      // Calculate FPS every second
      if (delta >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / delta);
        const frameTime = delta / frameCountRef.current;
        
        // Get memory usage if available
        const memoryUsage = performance.memory ? 
          Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) : 0;
        
        // Count active animations
        const animationCount = document.getAnimations ? document.getAnimations().length : 0;
        
        setMetrics({
          fps,
          frameTime: Math.round(frameTime * 100) / 100,
          memoryUsage,
          animationCount
        });
        
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }
      
      animationFrameRef.current = requestAnimationFrame(measurePerformance);
    };

    animationFrameRef.current = requestAnimationFrame(measurePerformance);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [show]);

  if (!show) return null;

  const getFPSColor = (fps) => {
    if (fps >= 55) return 'text-green-500';
    if (fps >= 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="fixed top-4 left-4 z-[9999] bg-black/90 text-white p-3 rounded-lg text-xs font-mono min-w-[200px]">
      <div className="mb-2 font-semibold text-blue-400">Performance Monitor</div>
      
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>FPS:</span>
          <span className={getFPSColor(metrics.fps)}>{metrics.fps}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Frame Time:</span>
          <span>{metrics.frameTime}ms</span>
        </div>
        
        <div className="flex justify-between">
          <span>Memory:</span>
          <span>{metrics.memoryUsage}MB</span>
        </div>
        
        <div className="flex justify-between">
          <span>Animations:</span>
          <span>{metrics.animationCount}</span>
        </div>
        
        <div className="mt-2 pt-2 border-t border-gray-600">
          <div className="text-xs text-gray-400">
            Target: 60 FPS (16.67ms)
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDebugger;