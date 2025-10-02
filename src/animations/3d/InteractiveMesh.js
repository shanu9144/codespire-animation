"use client";

import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScene3D } from './Scene3DProvider';
import { ComprehensiveGlow } from './GlowEffect';
import * as THREE from 'three';

/**
 * Interactive 3D mesh that responds to mouse hover and click
 */
const InteractiveMesh = ({
  geometry = 'sphere',
  position = [0, 0, 0],
  scale = 1,
  color = '#384bff',
  hoverColor = '#5865f2',
  mouseInfluence = 1,
  animationSpeed = 1,
  enableGlow = true,
  glowIntensity = 0.5,
  onClick,
  onHover,
  onUnhover,
  ...props
}) => {
  const meshRef = useRef();
  const { mouse, viewport } = useThree();
  const { sceneConfig } = useScene3D();
  
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // Store original values
  const originalPosition = useMemo(() => new THREE.Vector3(...position), [position]);
  const originalScale = useMemo(() => scale, [scale]);
  
  // Animation state
  const targetPosition = useRef(new THREE.Vector3(...position));
  const targetScale = useRef(originalScale);
  const animationPhase = useRef(Math.random() * Math.PI * 2);

  // Create geometry
  const meshGeometry = useMemo(() => {
    switch (geometry) {
      case 'cube':
        return new THREE.BoxGeometry(1, 1, 1);
      case 'torus':
        return new THREE.TorusGeometry(0.6, 0.3, 8, 16);
      case 'octahedron':
        return new THREE.OctahedronGeometry(0.8);
      case 'dodecahedron':
        return new THREE.DodecahedronGeometry(0.8);
      case 'sphere':
      default:
        return new THREE.SphereGeometry(0.8, 16, 16);
    }
  }, [geometry]);

  // Material with hover effects
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: hovered ? hoverColor : color,
      metalness: hovered ? 0.5 : 0.3,
      roughness: hovered ? 0.2 : 0.4,
      transparent: true,
      opacity: hovered ? 0.9 : 0.8,
      emissive: hovered ? new THREE.Color(color).multiplyScalar(0.1) : new THREE.Color(0x000000)
    });
  }, [color, hoverColor, hovered]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime() * animationSpeed;
    
    // Organic floating movement
    const floatY = Math.sin(time + animationPhase.current) * 0.3;
    const floatX = Math.cos(time * 0.7 + animationPhase.current) * 0.2;
    const floatZ = Math.sin(time * 0.5 + animationPhase.current) * 0.15;

    // Mouse influence calculations
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;
    
    // Enhanced mouse influence when hovered
    const influence = hovered ? mouseInfluence * 1.5 : mouseInfluence;
    const mouseInfluenceX = mouseX * influence * 0.1;
    const mouseInfluenceY = mouseY * influence * 0.1;

    // Update target position
    targetPosition.current.set(
      originalPosition.x + floatX + mouseInfluenceX,
      originalPosition.y + floatY + mouseInfluenceY,
      originalPosition.z + floatZ
    );

    // Smooth position interpolation
    meshRef.current.position.lerp(targetPosition.current, delta * 3);

    // Scale animation
    const hoverScale = hovered ? 1.2 : 1;
    const clickScale = clicked ? 0.9 : 1;
    const pulseScale = 1 + Math.sin(time * 2 + animationPhase.current) * 0.03;
    
    targetScale.current = originalScale * hoverScale * clickScale * pulseScale;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale.current, targetScale.current, targetScale.current),
      delta * 5
    );

    // Rotation with mouse influence
    meshRef.current.rotation.x += (0.01 + mouse.y * influence * 0.005) * animationSpeed;
    meshRef.current.rotation.y += (0.01 + mouse.x * influence * 0.005) * animationSpeed;
    meshRef.current.rotation.z += 0.005 * animationSpeed;

    // Reset click state
    if (clicked) {
      setTimeout(() => setClicked(false), 100);
    }
  });

  const handlePointerOver = (event) => {
    event.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
    onHover?.(event);
  };

  const handlePointerOut = (event) => {
    setHovered(false);
    document.body.style.cursor = 'auto';
    onUnhover?.(event);
  };

  const handleClick = (event) => {
    event.stopPropagation();
    setClicked(true);
    onClick?.(event);
  };

  if (enableGlow) {
    return (
      <ComprehensiveGlow
        geometry={meshGeometry}
        color={color}
        intensity={glowIntensity}
        enableOutline={true}
        enableParticles={true}
        isInteractive={true}
        isHovered={hovered}
        isClicked={clicked}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
        {...props}
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
      geometry={meshGeometry}
      material={material}
      castShadow={sceneConfig.enableShadows}
      receiveShadow={sceneConfig.enableShadows}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
      {...props}
    />
  );
};

/**
 * Collection of interactive meshes with predefined configurations
 */
export const InteractiveMeshCollection = ({ 
  meshes = [
    { 
      geometry: 'sphere', 
      position: [-3, 1, -2], 
      color: '#384bff',
      hoverColor: '#5865f2'
    },
    { 
      geometry: 'cube', 
      position: [3, -1, -1], 
      color: '#5865f2',
      hoverColor: '#7289da'
    },
    { 
      geometry: 'octahedron', 
      position: [0, 2, -3], 
      color: '#7289da',
      hoverColor: '#99aab5'
    },
    { 
      geometry: 'torus', 
      position: [-1, -2, -2], 
      color: '#99aab5',
      hoverColor: '#384bff'
    }
  ],
  mouseInfluence = 1,
  animationSpeed = 1,
  enableGlow = true,
  glowIntensity = 0.5,
  onMeshClick,
  onMeshHover
}) => {
  const { deviceCapabilities } = useScene3D();

  // Optimize for performance
  const optimizedMeshes = useMemo(() => {
    if (deviceCapabilities.performanceMode === 'low') {
      return meshes.slice(0, 2);
    } else if (deviceCapabilities.performanceMode === 'medium') {
      return meshes.slice(0, 3);
    }
    return meshes;
  }, [meshes, deviceCapabilities.performanceMode]);

  return (
    <group>
      {optimizedMeshes.map((mesh, index) => (
        <InteractiveMesh
          key={index}
          geometry={mesh.geometry}
          position={mesh.position}
          scale={mesh.scale || 1}
          color={mesh.color}
          hoverColor={mesh.hoverColor}
          mouseInfluence={mouseInfluence}
          animationSpeed={animationSpeed}
          enableGlow={enableGlow}
          glowIntensity={mesh.glowIntensity || glowIntensity}
          onClick={(event) => onMeshClick?.(event, mesh, index)}
          onHover={(event) => onMeshHover?.(event, mesh, index)}
        />
      ))}
    </group>
  );
};

export default InteractiveMesh;