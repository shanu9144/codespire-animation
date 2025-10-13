'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Particle Network Component
const ParticleNetwork = ({ mousePosition }) => {
  const pointsRef = useRef();
  const linesRef = useRef();
  
  // Generate particle positions
  const { positions, connections } = useMemo(() => {
    const particleCount = 150;
    const positions = new Float32Array(particleCount * 3);
    const connections = [];
    
    // Generate random positions
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    // Generate connections based on distance
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance < 3) {
          connections.push({
            start: [positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]],
            end: [positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]],
            opacity: 1 - distance / 3
          });
        }
      }
    }
    
    return { positions, connections };
  }, []);
  
  // Animation frame
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
    
    // Mouse parallax effect
    if (mousePosition && pointsRef.current) {
      pointsRef.current.rotation.y += (mousePosition.x - 0.5) * 0.1;
      pointsRef.current.rotation.x += (mousePosition.y - 0.5) * 0.1;
    }
  });
  
  return (
    <group>
      {/* Particles */}
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3B82F6"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      
      {/* Connection Lines */}
      <group ref={linesRef}>
        {connections.map((connection, index) => (
          <line key={index}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  ...connection.start,
                  ...connection.end
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#3B82F6"
              opacity={connection.opacity * 0.3}
              transparent
            />
          </line>
        ))}
      </group>
    </group>
  );
};

// Floating Geometric Shapes
const FloatingGeometry = ({ mousePosition }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      
      // Mouse parallax
      if (mousePosition) {
        groupRef.current.rotation.y += (mousePosition.x - 0.5) * 0.2;
        groupRef.current.rotation.x += (mousePosition.y - 0.5) * 0.2;
      }
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Floating cubes */}
      <mesh position={[2, 1, -2]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.3} />
      </mesh>
      
      <mesh position={[-2, -1, 2]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.2} />
      </mesh>
      
      {/* Floating spheres */}
      <mesh position={[1, 2, 1]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.4} />
      </mesh>
      
      <mesh position={[-1, -2, -1]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.3} />
      </mesh>
      
      {/* Floating torus */}
      <mesh position={[0, 0, 3]}>
        <torusGeometry args={[0.4, 0.1, 8, 16]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

// Main Background Component
const ParticleNetworkBackground = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0.5, y: 0.5 });
  
  const handleMouseMove = (event) => {
    setMousePosition({
      x: event.clientX / window.innerWidth,
      y: event.clientY / window.innerHeight
    });
  };
  
  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800" />
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-cyan-600/20 animate-pulse" />
      
      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={0.3} />
        
        {/* Fog effect */}
        <fog attach="fog" args={['#1E293B', 5, 20]} />
        
        {/* Particle Network */}
        <ParticleNetwork mousePosition={mousePosition} />
        
        {/* Floating Geometry */}
        <FloatingGeometry mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default ParticleNetworkBackground;
