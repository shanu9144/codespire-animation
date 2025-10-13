'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * CursorTrailAdvanced Component
 * 
 * Advanced cursor trail using Canvas for better performance with many particles.
 * Supports various particle effects, colors, and physics simulations.
 */
const CursorTrailAdvanced = ({ 
  maxParticles = 50,
  particleLife = 1500,
  spawnRate = 30,
  particleSize = { min: 2, max: 6 },
  colors = ['#384bff', '#00d4ff', '#6c5ce7'],
  trailType = 'dots', // 'dots', 'lines', 'stars', 'sparkles'
  physics = {
    gravity: 0.1,
    friction: 0.98,
    spread: 2
  },
  disabled = false,
  className = ''
}) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrame = useRef();
  const lastSpawnTime = useRef(0);
  const particleId = useRef(0);
  const mousePosition = useRef({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  
  // Create a new particle
  const createParticle = useCallback((x, y) => {
    const size = particleSize.min + Math.random() * (particleSize.max - particleSize.min);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * physics.spread;
    
    return {
      id: particleId.current++,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size,
      maxSize: size,
      life: particleLife,
      maxLife: particleLife,
      color,
      opacity: 1,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.1
    };
  }, [particleSize, colors, physics, particleLife]);
  
  // Update particle physics and lifecycle
  const updateParticle = useCallback((particle, deltaTime) => {
    // Update position
    particle.x += particle.vx * deltaTime;
    particle.y += particle.vy * deltaTime;
    
    // Apply physics
    particle.vy += physics.gravity * deltaTime;
    particle.vx *= physics.friction;
    particle.vy *= physics.friction;
    
    // Update rotation
    particle.rotation += particle.rotationSpeed * deltaTime;
    
    // Update life
    particle.life -= deltaTime;
    
    // Calculate opacity and size based on life
    const lifeRatio = particle.life / particle.maxLife;
    particle.opacity = Math.max(0, lifeRatio);
    particle.size = particle.maxSize * (0.3 + lifeRatio * 0.7);
    
    return particle.life > 0;
  }, [physics]);
  
  // Draw particle based on trail type
  const drawParticle = useCallback((ctx, particle) => {
    const { x, y, size, color, opacity, rotation } = particle;
    
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.translate(x, y);
    ctx.rotate(rotation);
    
    switch (trailType) {
      case 'dots':
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        ctx.fill();
        break;
        
      case 'lines':
        ctx.strokeStyle = color;
        ctx.lineWidth = size / 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-size, 0);
        ctx.lineTo(size, 0);
        ctx.stroke();
        break;
        
      case 'stars':
        ctx.beginPath();
        const spikes = 5;
        const outerRadius = size / 2;
        const innerRadius = outerRadius * 0.4;
        
        for (let i = 0; i < spikes * 2; i++) {
          const angle = (i * Math.PI) / spikes;
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const px = Math.cos(angle) * radius;
          const py = Math.sin(angle) * radius;
          
          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.closePath();
        ctx.fill();
        break;
        
      case 'sparkles':
        // Draw a sparkle with crossing lines
        ctx.strokeStyle = color;
        ctx.lineWidth = Math.max(1, size / 4);
        ctx.lineCap = 'round';
        
        // Vertical line
        ctx.beginPath();
        ctx.moveTo(0, -size / 2);
        ctx.lineTo(0, size / 2);
        ctx.stroke();
        
        // Horizontal line
        ctx.beginPath();
        ctx.moveTo(-size / 2, 0);
        ctx.lineTo(size / 2, 0);
        ctx.stroke();
        
        // Diagonal lines
        const diagonalSize = size * 0.3;
        ctx.beginPath();
        ctx.moveTo(-diagonalSize, -diagonalSize);
        ctx.lineTo(diagonalSize, diagonalSize);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(diagonalSize, -diagonalSize);
        ctx.lineTo(-diagonalSize, diagonalSize);
        ctx.stroke();
        break;
        
      default:
        // Default to dots
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.restore();
  }, [trailType]);
  
  // Animation loop
  const animate = useCallback(() => {
    if (disabled) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const deltaTime = 16; // Assume 60fps
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles.current = particles.current.filter(particle => {
      const isAlive = updateParticle(particle, deltaTime);
      
      if (isAlive) {
        drawParticle(ctx, particle);
      }
      
      return isAlive;
    });
    
    animationFrame.current = requestAnimationFrame(animate);
  }, [disabled, updateParticle, drawParticle]);
  
  // Handle mouse movement
  const handleMouseMove = useCallback((e) => {
    if (disabled) return;
    
    const now = Date.now();
    mousePosition.current = { x: e.clientX, y: e.clientY };
    
    if (!isActive) {
      setIsActive(true);
    }
    
    // Spawn new particles
    if (now - lastSpawnTime.current >= spawnRate) {
      if (particles.current.length < maxParticles) {
        particles.current.push(createParticle(e.clientX, e.clientY));
      } else {
        // Replace oldest particle
        particles.current.shift();
        particles.current.push(createParticle(e.clientX, e.clientY));
      }
      
      lastSpawnTime.current = now;
    }
  }, [disabled, isActive, spawnRate, maxParticles, createParticle]);
  
  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
  }, []);
  
  // Resize canvas to match window size
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);
  
  // Set up canvas and event listeners
  useEffect(() => {
    if (disabled) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Initial canvas setup
    resizeCanvas();
    
    // Start animation loop
    animationFrame.current = requestAnimationFrame(animate);
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      // Cleanup
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [disabled, animate, handleMouseMove, handleMouseLeave, resizeCanvas]);
  
  // Clear particles when disabled
  useEffect(() => {
    if (disabled) {
      particles.current = [];
      setIsActive(false);
    }
  }, [disabled]);
  
  if (disabled) return null;
  
  return (
    <canvas
      ref={canvasRef}
      className={`cursor-trail-advanced ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9997,
      }}
    />
  );
};

export default CursorTrailAdvanced;