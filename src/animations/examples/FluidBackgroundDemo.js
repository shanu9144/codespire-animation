import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FluidBackground,
  ScrollFluidBackground,
  SectionFluidTransitions,
  RippleButton,
  RippleCard,
  RippleTrigger
} from '../fluid';

/**
 * FluidBackgroundDemo Component
 * 
 * Demonstrates the fluid background animation system
 * Features:
 * - Basic fluid background
 * - Scroll-triggered transformations
 * - Section-aware transitions
 * - Interactive ripple effects
 */

const FluidBackgroundDemo = () => {
  const [activeDemo, setActiveDemo] = useState('basic');
  const [fluidConfig, setFluidConfig] = useState({
    blobCount: 3,
    size: { min: 100, max: 300 },
    speed: 0.5,
    morphSpeed: 0.3,
    color: '#384bff',
    opacity: 0.1
  });

  const demoSections = [
    {
      id: 'hero',
      title: 'Hero Section',
      color: '#384bff',
      opacity: 0.1,
      shapeCount: 3,
      morphPattern: 'gentle'
    },
    {
      id: 'features',
      title: 'Features Section',
      color: '#6366f1',
      opacity: 0.15,
      shapeCount: 4,
      morphPattern: 'active'
    },
    {
      id: 'about',
      title: 'About Section',
      color: '#8b5cf6',
      opacity: 0.12,
      shapeCount: 2,
      morphPattern: 'flowing'
    }
  ];

  const renderBasicDemo = () => (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <FluidBackground
        blobCount={fluidConfig.blobCount}
        size={fluidConfig.size}
        speed={fluidConfig.speed}
        morphSpeed={fluidConfig.morphSpeed}
        color={fluidConfig.color}
        opacity={fluidConfig.opacity}
      />
      
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '2rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center'
      }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '3rem', marginBottom: '1rem' }}
        >
          Fluid Background Demo
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '600px' }}
        >
          Watch the organic morphing blobs create a dynamic background with metaball blending effects.
        </motion.p>
        
        <RippleButton
          variant="primary"
          onClick={() => setActiveDemo('scroll')}
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#384bff',
            color: 'white',
            borderRadius: '8px',
            fontSize: '1.1rem'
          }}
        >
          Try Scroll Demo
        </RippleButton>
      </div>
    </div>
  );

  const renderScrollDemo = () => (
    <div style={{ height: '300vh', position: 'relative' }}>
      <ScrollFluidBackground
        sections={demoSections}
        transitionZones={0.3}
        morphIntensity={1.2}
      />
      
      {demoSections.map((section, index) => (
        <div
          key={section.id}
          data-section={section.id}
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
            color: 'white',
            textAlign: 'center'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              {section.title}
            </h2>
            <p style={{ fontSize: '1.2rem', maxWidth: '500px' }}>
              Scroll to see the fluid background transform with different colors and morphing patterns.
            </p>
          </motion.div>
        </div>
      ))}
    </div>
  );

  const renderInteractiveDemo = () => (
    <div style={{ position: 'relative', height: '100vh', padding: '2rem' }}>
      <FluidBackground
        blobCount={2}
        size={{ min: 150, max: 400 }}
        speed={0.3}
        morphSpeed={0.4}
        color="#6366f1"
        opacity={0.08}
      />
      
      <div style={{
        position: 'relative',
        zIndex: 10,
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        alignItems: 'center'
      }}>
        <RippleCard
          style={{
            padding: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <h3 style={{ marginBottom: '1rem' }}>Ripple Card</h3>
          <p>Hover or click to see ripple effects</p>
        </RippleCard>
        
        <RippleCard
          style={{
            padding: '2rem',
            backgroundColor: 'rgba(56, 75, 255, 0.2)',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(56, 75, 255, 0.3)',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <h3 style={{ marginBottom: '1rem' }}>Interactive Elements</h3>
          <RippleButton
            style={{
              padding: '0.8rem 1.5rem',
              backgroundColor: '#384bff',
              color: 'white',
              borderRadius: '6px',
              marginTop: '1rem'
            }}
          >
            Click Me
          </RippleButton>
        </RippleCard>
        
        <RippleTrigger
          triggerOn={['click', 'mouseenter']}
          rippleConfig={{ color: '#8b5cf6', opacity: 0.3 }}
          style={{
            padding: '2rem',
            backgroundColor: 'rgba(139, 92, 246, 0.2)',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            color: 'white',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          <h3 style={{ marginBottom: '1rem' }}>Custom Trigger</h3>
          <p>Multiple trigger events with custom ripple colors</p>
        </RippleTrigger>
      </div>
    </div>
  );

  const renderControls = () => (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 100,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: '1rem',
      borderRadius: '8px',
      color: 'white',
      minWidth: '200px'
    }}>
      <h4 style={{ marginBottom: '1rem' }}>Demo Controls</h4>
      
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Demo Type:</label>
        <select
          value={activeDemo}
          onChange={(e) => setActiveDemo(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#333',
            color: 'white'
          }}
        >
          <option value="basic">Basic Fluid</option>
          <option value="scroll">Scroll Triggered</option>
          <option value="interactive">Interactive Ripples</option>
        </select>
      </div>
      
      {activeDemo === 'basic' && (
        <>
          <div style={{ marginBottom: '0.5rem' }}>
            <label>Blob Count: {fluidConfig.blobCount}</label>
            <input
              type="range"
              min="1"
              max="8"
              value={fluidConfig.blobCount}
              onChange={(e) => setFluidConfig(prev => ({
                ...prev,
                blobCount: parseInt(e.target.value)
              }))}
              style={{ width: '100%' }}
            />
          </div>
          
          <div style={{ marginBottom: '0.5rem' }}>
            <label>Speed: {fluidConfig.speed.toFixed(1)}</label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={fluidConfig.speed}
              onChange={(e) => setFluidConfig(prev => ({
                ...prev,
                speed: parseFloat(e.target.value)
              }))}
              style={{ width: '100%' }}
            />
          </div>
          
          <div style={{ marginBottom: '0.5rem' }}>
            <label>Morph Speed: {fluidConfig.morphSpeed.toFixed(1)}</label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={fluidConfig.morphSpeed}
              onChange={(e) => setFluidConfig(prev => ({
                ...prev,
                morphSpeed: parseFloat(e.target.value)
              }))}
              style={{ width: '100%' }}
            />
          </div>
        </>
      )}
    </div>
  );

  return (
    <div style={{ backgroundColor: '#1a1a2e', minHeight: '100vh' }}>
      {renderControls()}
      
      {activeDemo === 'basic' && renderBasicDemo()}
      {activeDemo === 'scroll' && renderScrollDemo()}
      {activeDemo === 'interactive' && renderInteractiveDemo()}
    </div>
  );
};

export default FluidBackgroundDemo;