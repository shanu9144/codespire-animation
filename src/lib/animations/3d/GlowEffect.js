"use client";

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScene3D } from './Scene3DProvider';

/**
 * Custom glow effect for 3D objects using emissive materials and bloom
 */
export const GlowMaterial = ({
  color = '#384bff',
  intensity = 0.5,
  animated = true,
  pulseSpeed = 2,
  ...props
}) => {
  const materialRef = useRef();
  
  // Create emissive material for glow effect
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: color,
      emissive: new THREE.Color(color),
      emissiveIntensity: intensity,
      metalness: 0.2,
      roughness: 0.8,
      transparent: true,
      opacity: 0.9,
      ...props
    });
  }, [color, intensity, props]);

  // Animate glow intensity
  useFrame((state) => {
    if (!materialRef.current || !animated) return;
    
    const time = state.clock.getElapsedTime();
    const pulse = Math.sin(time * pulseSpeed) * 0.3 + 0.7; // Oscillate between 0.4 and 1.0
    materialRef.current.emissiveIntensity = intensity * pulse;
  });

  return (
    <primitive 
      ref={materialRef} 
      object={material} 
      attach="material"
    />
  );
};

/**
 * Glow outline effect using a slightly larger duplicate mesh
 */
export const GlowOutline = ({
  geometry,
  color = '#384bff',
  intensity = 0.8,
  thickness = 0.05,
  animated = true,
  pulseSpeed = 1.5,
  ...props
}) => {
  const meshRef = useRef();
  const materialRef = useRef();
  
  // Create outline material
  const outlineMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: intensity * 0.6,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
  }, [color, intensity]);

  // Animate outline
  useFrame((state) => {
    if (!meshRef.current || !materialRef.current || !animated) return;
    
    const time = state.clock.getElapsedTime();
    const pulse = Math.sin(time * pulseSpeed) * 0.2 + 0.8; // Oscillate between 0.6 and 1.0
    
    // Scale the outline mesh
    const scale = 1 + thickness * pulse;
    meshRef.current.scale.setScalar(scale);
    
    // Animate opacity
    materialRef.current.opacity = intensity * 0.6 * pulse;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={outlineMaterial}
      {...props}
    >
      <primitive ref={materialRef} object={outlineMaterial} attach="material" />
    </mesh>
  );
};

/**
 * Interactive glow effect that responds to hover and click states
 */
export const InteractiveGlow = ({
  children,
  geometry,
  baseColor = '#384bff',
  hoverColor = '#5865f2',
  clickColor = '#7289da',
  baseIntensity = 0.3,
  hoverIntensity = 0.8,
  clickIntensity = 1.2,
  isHovered = false,
  isClicked = false,
  animationSpeed = 3,
  ...props
}) => {
  const glowRef = useRef();
  const outlineRef = useRef();
  
  // Determine current state
  const currentColor = isClicked ? clickColor : isHovered ? hoverColor : baseColor;
  const currentIntensity = isClicked ? clickIntensity : isHovered ? hoverIntensity : baseIntensity;
  
  // Animate transitions
  useFrame((state, delta) => {
    if (!glowRef.current || !outlineRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Smooth intensity transition
    const targetIntensity = currentIntensity * (1 + Math.sin(time * animationSpeed) * 0.1);
    glowRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      glowRef.current.emissiveIntensity,
      targetIntensity,
      delta * 5
    );
    
    // Color transition
    const targetColor = new THREE.Color(currentColor);
    glowRef.current.emissive.lerp(targetColor, delta * 3);
    
    // Outline animation
    if (isHovered || isClicked) {
      const pulse = Math.sin(time * animationSpeed * 1.5) * 0.15 + 0.85;
      outlineRef.current.scale.setScalar(1.05 * pulse);
      outlineRef.current.material.opacity = currentIntensity * 0.4 * pulse;
    } else {
      outlineRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), delta * 3);
      outlineRef.current.material.opacity = THREE.MathUtils.lerp(
        outlineRef.current.material.opacity,
        0,
        delta * 5
      );
    }
  });

  return (
    <group {...props}>
      {/* Main object with glow material */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          ref={glowRef}
          color={currentColor}
          emissive={new THREE.Color(currentColor)}
          emissiveIntensity={currentIntensity}
          metalness={0.3}
          roughness={0.7}
          transparent={true}
          opacity={0.9}
        />
        {children}
      </mesh>
      
      {/* Glow outline */}
      <mesh
        ref={outlineRef}
        geometry={geometry}
      >
        <meshBasicMaterial
          color={currentColor}
          transparent={true}
          opacity={0}
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

/**
 * Particle-based glow effect for enhanced visual impact
 */
export const ParticleGlow = ({
  position = [0, 0, 0],
  color = '#384bff',
  intensity = 0.5,
  particleCount = 20,
  radius = 1,
  animated = true,
  ...props
}) => {
  const particlesRef = useRef();
  const { deviceCapabilities } = useScene3D();
  
  // Adjust particle count based on performance
  const adjustedParticleCount = useMemo(() => {
    const performanceMode = deviceCapabilities.performanceMode || 'medium';
    switch (performanceMode) {
      case 'high': return particleCount;
      case 'medium': return Math.floor(particleCount * 0.7);
      case 'low': return Math.floor(particleCount * 0.4);
      default: return Math.floor(particleCount * 0.7);
    }
  }, [particleCount, deviceCapabilities.performanceMode]);

  // Create particle geometry and material
  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(adjustedParticleCount * 3);
    const colors = new Float32Array(adjustedParticleCount * 3);
    const sizes = new Float32Array(adjustedParticleCount);
    
    const colorObj = new THREE.Color(color);
    
    for (let i = 0; i < adjustedParticleCount; i++) {
      // Random positions in sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.random() * radius;
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      
      colors[i * 3] = colorObj.r;
      colors[i * 3 + 1] = colorObj.g;
      colors[i * 3 + 2] = colorObj.b;
      
      sizes[i] = Math.random() * 0.1 + 0.05;
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const mat = new THREE.PointsMaterial({
      size: 0.1,
      transparent: true,
      opacity: intensity,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    return { geometry: geo, material: mat };
  }, [adjustedParticleCount, color, intensity, radius]);

  // Animate particles
  useFrame((state) => {
    if (!particlesRef.current || !animated) return;
    
    const time = state.clock.getElapsedTime();
    const positions = particlesRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < adjustedParticleCount; i++) {
      const i3 = i * 3;
      
      // Gentle floating animation
      positions[i3 + 1] += Math.sin(time + i) * 0.001;
      
      // Rotation around center
      const angle = time * 0.5 + i * 0.1;
      const currentRadius = Math.sqrt(positions[i3] ** 2 + positions[i3 + 2] ** 2);
      positions[i3] = Math.cos(angle) * currentRadius;
      positions[i3 + 2] = Math.sin(angle) * currentRadius;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Pulse opacity
    const pulse = Math.sin(time * 2) * 0.2 + 0.8;
    particlesRef.current.material.opacity = intensity * pulse;
  });

  return (
    <points
      ref={particlesRef}
      position={position}
      geometry={geometry}
      material={material}
      {...props}
    />
  );
};

/**
 * Comprehensive glow system that combines multiple effects
 */
export const ComprehensiveGlow = ({
  children,
  geometry,
  color = '#384bff',
  intensity = 0.5,
  enableOutline = true,
  enableParticles = false,
  isInteractive = false,
  isHovered = false,
  isClicked = false,
  ...props
}) => {
  const { deviceCapabilities } = useScene3D();
  
  // Disable particles on low-end devices
  const shouldShowParticles = enableParticles && deviceCapabilities.performanceMode !== 'low';
  
  if (isInteractive) {
    return (
      <InteractiveGlow
        geometry={geometry}
        baseColor={color}
        baseIntensity={intensity}
        isHovered={isHovered}
        isClicked={isClicked}
        {...props}
      >
        {children}
        {shouldShowParticles && (
          <ParticleGlow
            color={color}
            intensity={intensity * 0.5}
            particleCount={15}
            radius={1.2}
          />
        )}
      </InteractiveGlow>
    );
  }

  return (
    <group {...props}>
      <mesh geometry={geometry}>
        <GlowMaterial
          color={color}
          intensity={intensity}
          animated={true}
        />
        {children}
      </mesh>
      
      {enableOutline && (
        <GlowOutline
          geometry={geometry}
          color={color}
          intensity={intensity}
          thickness={0.03}
        />
      )}
      
      {shouldShowParticles && (
        <ParticleGlow
          color={color}
          intensity={intensity * 0.3}
          particleCount={12}
          radius={1.1}
        />
      )}
    </group>
  );
};

export default ComprehensiveGlow;