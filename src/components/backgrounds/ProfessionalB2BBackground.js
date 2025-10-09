'use client';

import React, { useEffect, useRef } from 'react';

const ProfessionalB2BBackground = ({ 
  className = '', 
  intensity = 'medium',
  enableAnimation = true 
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);

  // Intensity presets for different use cases
  const intensityPresets = {
    subtle: {
      waveOpacity: 0.03,
      circleOpacity: 0.02,
      animationSpeed: 0.5,
      waveCount: 3,
      circleCount: 4
    },
    medium: {
      waveOpacity: 0.05,
      circleOpacity: 0.04,
      animationSpeed: 0.8,
      waveCount: 4,
      circleCount: 6
    },
    prominent: {
      waveOpacity: 0.08,
      circleOpacity: 0.06,
      animationSpeed: 1.0,
      waveCount: 5,
      circleCount: 8
    }
  };

  const config = intensityPresets[intensity] || intensityPresets.medium;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    const drawWave = (x, y, width, height, time, opacity) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      
      // Create gradient for wave
      const gradient = ctx.createLinearGradient(x, y, x + width, y + height);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0)'); // Light blue transparent
      gradient.addColorStop(0.3, 'rgba(59, 130, 246, 0.3)'); // Light blue
      gradient.addColorStop(0.7, 'rgba(37, 99, 235, 0.2)'); // Blue
      gradient.addColorStop(1, 'rgba(37, 99, 235, 0)'); // Blue transparent
      
      ctx.fillStyle = gradient;
      
      // Draw wave path
      ctx.beginPath();
      const waveHeight = height * 0.1;
      const frequency = 0.02;
      
      for (let i = 0; i <= width; i += 2) {
        const waveY = y + height * 0.5 + Math.sin((i * frequency) + (time * 0.001)) * waveHeight;
        if (i === 0) {
          ctx.moveTo(x + i, waveY);
        } else {
          ctx.lineTo(x + i, waveY);
        }
      }
      
      ctx.lineTo(x + width, y + height);
      ctx.lineTo(x, y + height);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    };

    const drawCircle = (x, y, radius, time, opacity) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      
      // Create radial gradient for circle
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)'); // Light blue center
      gradient.addColorStop(0.5, 'rgba(37, 99, 235, 0.2)'); // Blue middle
      gradient.addColorStop(1, 'rgba(37, 99, 235, 0)'); // Transparent edge
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const animate = (time) => {
      if (!enableAnimation) return;
      
      timeRef.current = time;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw base diagonal gradient
      const baseGradient = ctx.createLinearGradient(0, 0, width, height);
      baseGradient.addColorStop(0, '#ffffff'); // White top-left
      baseGradient.addColorStop(0.3, '#f8fafc'); // Very light blue
      baseGradient.addColorStop(0.7, '#e0f2fe'); // Light blue
      baseGradient.addColorStop(1, '#bae6fd'); // Light blue bottom-right
      
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw animated waves
      for (let i = 0; i < config.waveCount; i++) {
        const waveX = (width / config.waveCount) * i;
        const waveY = height * 0.1 + (i * height * 0.15);
        const waveWidth = width * 0.8;
        const waveHeight = height * 0.3;
        
        const waveTime = time * config.animationSpeed + (i * 1000);
        const waveOpacity = config.waveOpacity * (1 - (i * 0.2));
        
        drawWave(waveX, waveY, waveWidth, waveHeight, waveTime, waveOpacity);
      }

      // Draw floating circles
      for (let i = 0; i < config.circleCount; i++) {
        const baseX = (width / config.circleCount) * i + width * 0.1;
        const baseY = height * 0.2 + (i * height * 0.12);
        
        // Animate circle position
        const circleTime = time * config.animationSpeed * 0.5 + (i * 2000);
        const x = baseX + Math.sin(circleTime * 0.0005) * 30;
        const y = baseY + Math.cos(circleTime * 0.0003) * 20;
        
        const radius = 40 + Math.sin(circleTime * 0.0008) * 15;
        const circleOpacity = config.circleOpacity * (1 - (i * 0.15));
        
        drawCircle(x, y, radius, circleTime, circleOpacity);
      }

      // Add subtle grid pattern for enterprise feel
      ctx.save();
      ctx.globalAlpha = 0.02;
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 1;
      
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      ctx.restore();

      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
      if (enableAnimation) {
        animate(timeRef.current);
      }
    };

    // Initialize
    resizeCanvas();
    
    if (enableAnimation) {
      animate(0);
    } else {
      // Draw static version
      const time = 0;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw base diagonal gradient
      const baseGradient = ctx.createLinearGradient(0, 0, width, height);
      baseGradient.addColorStop(0, '#ffffff');
      baseGradient.addColorStop(0.3, '#f8fafc');
      baseGradient.addColorStop(0.7, '#e0f2fe');
      baseGradient.addColorStop(1, '#bae6fd');
      
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw static waves
      for (let i = 0; i < config.waveCount; i++) {
        const waveX = (width / config.waveCount) * i;
        const waveY = height * 0.1 + (i * height * 0.15);
        const waveWidth = width * 0.8;
        const waveHeight = height * 0.3;
        const waveOpacity = config.waveOpacity * (1 - (i * 0.2));
        
        drawWave(waveX, waveY, waveWidth, waveHeight, time, waveOpacity);
      }

      // Draw static circles
      for (let i = 0; i < config.circleCount; i++) {
        const x = (width / config.circleCount) * i + width * 0.1;
        const y = height * 0.2 + (i * height * 0.12);
        const radius = 40;
        const circleOpacity = config.circleOpacity * (1 - (i * 0.15));
        
        drawCircle(x, y, radius, time, circleOpacity);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [config, enableAnimation]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 30%, #e0f2fe 70%, #bae6fd 100%)'
        }}
      />
      
      {/* Fallback gradient for when canvas is not available */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 30%, #e0f2fe 70%, #bae6fd 100%)'
        }}
      />
    </div>
  );
};

export default ProfessionalB2BBackground;
