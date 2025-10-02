"use client";

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScene3D } from './Scene3DProvider';
import { ComprehensiveGlow } from './GlowEffect';
import * as THREE from 'three';

/**
 * Individual floating geometric shape component
 */
const FloatingShape = ({ 
  type = 'sphere', 
  position = [0, 0, 0], 
  scale = 1,
  color = '#384bff',
  mouseInfluence = 0.5,
  animationSpeed = 1,
  rotationSpeed = [0.01, 0.01, 0.01],
  enableGlow = true,
  glowIntensity = 0.4
}) => {
  const meshRef = useRef();
  const { mouse, viewport } = useThree();
  const { sceneConfig } = useScene3D();
  
  // Store original position for mouse influence calculations
  const originalPosition = useMemo(() => new THREE.Vector3(...position), [position]);
  const targetPosition = useRef(new THREE.Vector3(...position));
  const currentPosition = useRef(new THREE.Vector3(...position));

  // Animation phase for organic movement
  const animationPhase = useRef(Math.random() * Math.PI * 2);

  // Create geometry based on type
  const geometry = useMemo(() => {
    switch (type) {
      case 'cube':
        return new THREE.BoxGeometry(1, 1, 1);
      case 'torus':
        return new THREE.TorusGeometry(0.6, 0.3, 8, 16);
      case 'sphere':
      default:
        return new THREE.SphereGeometry(0.8, 16, 16);
    }
  }, [type]);

  // Material with CodeSpire color scheme
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.3,
      roughness: 0.4,
      transparent: true,
      opacity: 0.8
    });
  }, [color]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime() * animationSpeed;
    
    // Organic floating movement using sine waves
    const floatY = Math.sin(time + animationPhase.current) * 0.5;
    const floatX = Math.cos(time * 0.7 + animationPhase.current) * 0.3;
    const floatZ = Math.sin(time * 0.5 + animationPhase.current) * 0.2;

    // Calculate mouse influence
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;
    
    // Mouse influence on position
    const mouseInfluenceX = mouseX * mouseInfluence * 0.1;
    const mouseInfluenceY = mouseY * mouseInfluence * 0.1;

    // Update target position with organic movement and mouse influence
    targetPosition.current.set(
      originalPosition.x + floatX + mouseInfluenceX,
      originalPosition.y + floatY + mouseInfluenceY,
      originalPosition.z + floatZ
    );

    // Smooth interpolation to target position
    currentPosition.current.lerp(targetPosition.current, delta * 2);
    meshRef.current.position.copy(currentPosition.current);

    // Rotation animation
    meshRef.current.rotation.x += rotationSpeed[0] * animationSpeed;
    meshRef.current.rotation.y += rotationSpeed[1] * animationSpeed;
    meshRef.current.rotation.z += rotationSpeed[2] * animationSpeed;

    // Mouse influence on rotation
    meshRef.current.rotation.y += mouse.x * mouseInfluence * 0.01;
    meshRef.current.rotation.x += mouse.y * mouseInfluence * 0.01;

    // Scale pulsing effect
    const pulseScale = 1 + Math.sin(time * 2 + animationPhase.current) * 0.05;
    meshRef.current.scale.setScalar(scale * pulseScale);
  });

  if (enableGlow) {
    return (
      <ComprehensiveGlow
        geometry={geometry}
        color={color}
        intensity={glowIntensity}
        enableOutline={true}
        enableParticles={false}
        isInteractive={false}
      >
        <mesh
          ref={meshRef}
          castShadow={sceneConfig.enableShadows}
          receiveShadow={sceneConfig.enableShadows}
        />
      </ComprehensiveGlow>
    );
  }

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      castShadow={sceneConfig.enableShadows}
      receiveShadow={sceneConfig.enableShadows}
    />
  );
};

/**
 * Container component for multiple floating geometric shapes
 */
const FloatingGeometry = ({ 
  shapes = [
    { type: 'sphere', position: [-2, 1, -1], color: '#384bff' },
    { type: 'cube', position: [2, -1, -2], color: '#5865f2' },
    { type: 'torus', position: [0, 2, -3], color: '#7289da' }
  ],
  mouseInfluence = 0.5,
  animationSpeed = 1,
  enableGlow = true,
  glowIntensity = 0.4
}) => {
  const { deviceCapabilities } = useScene3D();

  // Reduce number of shapes on low-end devices
  const optimizedShapes = useMemo(() => {
    if (deviceCapabilities.performanceMode === 'low') {
      return shapes.slice(0, 2);
    } else if (deviceCapabilities.performanceMode === 'medium') {
      return shapes.slice(0, 4);
    }
    return shapes;
  }, [shapes, deviceCapabilities.performanceMode]);

  return (
    <group>
      {optimizedShapes.map((shape, index) => (
        <FloatingShape
          key={index}
          type={shape.type}
          position={shape.position}
          scale={shape.scale || 1}
          color={shape.color}
          mouseInfluence={mouseInfluence}
          animationSpeed={animationSpeed}
          rotationSpeed={shape.rotationSpeed || [0.01, 0.01, 0.01]}
          enableGlow={enableGlow}
          glowIntensity={shape.glowIntensity || glowIntensity}
        />
      ))}
    </group>
  );
};

export default FloatingGeometry;