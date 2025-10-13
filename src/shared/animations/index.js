/**
 * Advanced Animations System
 * Main entry point for the animation system
 */

// Core animation engine
export * from './core/index.js';

// Cursor system
export * from './cursor/index.js';

// Particles system
export * from './particles/index.js';

// 3D interactive elements
export * from './3d/index.js';

// Fluid background system
export * from './fluid/index.js';

// Scroll-triggered animations
export * from './scroll/index.js';

// Re-export main engine as default
export { default } from './core/AnimationEngine.js';