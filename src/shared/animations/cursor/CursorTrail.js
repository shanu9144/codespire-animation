'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue } from 'framer-motion';

/**
 * CursorTrail Component
 * 
 * Creates a particle trail that follows cursor movement with configurable
 * trail length, particle size, spawn rate, and life cycle effects.
 */
const CursorTrail = ({ 
  maxParticles = 20,
  particleLife = 1000, // milliseconds
  spawnRate = 50, // milliseconds between spawns
  particleSize = 4,
  color = '#384bff',
  opacity = 0.8,
  fadeOut = true,
  disabled = false,
  className = ''
}) => {
  const [particles, setParticles] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const lastSpawnTime = useRef(0);
  const animationFrame = useRef();
  const particleId = useRef(0);
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Create a new particle at cursor position
  const createParticle = useCallback((x, y) => {
    const now = Date.now();
    
    return {
      id: particleId.current++,
      x,
      y,
      createdAt: now,
      life: particleLife,
      size: particleSize + Math.random() * (particleSize * 0.5),
      opacity: opacity * (0.8 + Math.random() * 0.2),
      velocityX: (Math.random() - 0.5) * 2,
      velocityY: (Math.random() - 0.5) * 2,
      color: color
    };
  }, [particleLife, particleSize, opacity, color]);
  
  // Update particles (position, life, cleanup)
  const updateParticles = useCallback(() => {
    if (disabled) return;
    
    const now = Date.now();
    
    setParticles(prevParticles => {
      return prevParticles
        .map(particle => ({
          ...particle,
          x: particle.x + particle.velocityX * 0.5,
          y: particle.y + particle.velocityY * 0.5,
          velocityX: particle.velocityX * 0.98, // Slight deceleration
          velocityY: particle.velocityY * 0.98
        }))
        .filter(particle => {
          const age = now - particle.createdAt;
          return age < particle.life;
        });
    });
    
    animationFrame.current = requestAnimationFrame(updateParticles);
  }, [disabled]);
  
  // Handle mouse movement and particle spawning
  const handleMouseMove = useCallback((e) => {
    if (disabled) return;
    
    const now = Date.now();
    const x = e.clientX;
    const y = e.clientY;
    
    mouseX.set(x);
    mouseY.set(y);
    
    if (!isActive) {
      setIsActive(true);
    }
    
    // Spawn new particle if enough time has passed
    if (now - lastSpawnTime.current >= spawnRate) {
      setParticles(prevParticles => {
        const newParticles = [...prevParticles];
        
        // Remove oldest particle if at max capacity
        if (newParticles.length >= maxParticles) {
          newParticles.shift();
        }
        
        // Add new particle
        newParticles.push(createParticle(x, y));
        
        return newParticles;
      });
      
      lastSpawnTime.current = now;
    }
  }, [
    disabled,
    mouseX,
    mouseY,
    isActive,
    spawnRate,
    maxParticles,
    createParticle
  ]);
  
  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
  }, []);
  
  // Set up event listeners and animation loop
  useEffect(() => {
    if (disabled) return;
    
    // Start animation loop
    animationFrame.current = requestAnimationFrame(updateParticles);
    
    // Add mouse event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      // Cleanup
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [disabled, updateParticles, handleMouseMove, handleMouseLeave]);
  
  // Clear particles when disabled
  useEffect(() => {
    if (disabled) {
      setParticles([]);
      setIsActive(false);
    }
  }, [disabled]);
  
  if (disabled) return null;
  
  return (
    <div className={`cursor-trail ${className}`}>
      {particles.map(particle => {
        const age = Date.now() - particle.createdAt;
        const lifeProgress = age / particle.life;
        const currentOpacity = fadeOut 
          ? particle.opacity * (1 - lifeProgress)
          : particle.opacity;
        const currentSize = particle.size * (1 - lifeProgress * 0.3);
        
        return (
          <motion.div
            key={particle.id}
            className="cursor-trail-particle"
            style={{
              position: 'fixed',
              left: particle.x,
              top: particle.y,
              width: currentSize,
              height: currentSize,
              backgroundColor: particle.color,
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 9998,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ 
              opacity: 0,
              scale: 0 
            }}
            animate={{ 
              opacity: currentOpacity,
              scale: 1
            }}
            exit={{ 
              opacity: 0,
              scale: 0 
            }}
            transition={{ 
              duration: 0.1,
              ease: 'easeOut'
            }}
          />
        );
      })}
    </div>
  );
};

export default CursorTrail;