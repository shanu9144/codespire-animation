/**
 * Animation System Type Definitions
 * Comprehensive types for the animation system including 3D, particles, and fluid effects
 */

import { ReactNode } from 'react';
import { Vector3, Color, Texture, Material, BufferGeometry, Object3D } from 'three';
import { EasingFunction } from './components';

// Core animation types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: EasingFunction;
  repeat?: number | 'infinite';
  yoyo?: boolean;
  onComplete?: () => void;
  onStart?: () => void;
  onUpdate?: (progress: number) => void;
}

// Vector and position types
export interface Vector2D {
  x: number;
  y: number;
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

// Transform types
export interface Transform {
  position?: Vector3D;
  rotation?: Vector3D;
  scale?: Vector3D | number;
  opacity?: number;
}

// Animation keyframes
export interface Keyframe {
  time: number; // 0-1
  transform: Transform;
  easing?: EasingFunction;
}

export interface AnimationKeyframes {
  keyframes: Keyframe[];
  duration: number;
}

// Cursor system types
export interface CursorConfig {
  type: 'default' | 'magnetic' | 'invisible-magnetic' | 'trail' | 'custom';
  size?: number;
  color?: string;
  trailLength?: number;
  trailColor?: string;
  magneticStrength?: number;
  magneticRadius?: number;
  ease?: number;
}

export interface MagneticConfig {
  strength: number;
  radius: number;
  ease: number;
  targets?: string[]; // CSS selectors
}

export interface TouchConfig {
  enableRipples?: boolean;
  enableHaptics?: boolean;
  enableVisualFeedback?: boolean;
  rippleColor?: string;
  rippleSize?: number;
  rippleDuration?: number;
}

// Particle system types
export interface ParticleConfig {
  count: number;
  size: number | { min: number; max: number };
  color: string | string[];
  opacity: number | { min: number; max: number };
  velocity: Vector3D | { min: Vector3D; max: Vector3D };
  acceleration?: Vector3D;
  lifetime: number | { min: number; max: number };
  shape?: 'circle' | 'square' | 'triangle' | 'star';
  texture?: string;
}

export interface ParticleFieldConfig extends ParticleConfig {
  bounds: {
    width: number;
    height: number;
    depth?: number;
  };
  gravity?: number;
  wind?: Vector3D;
  turbulence?: number;
  connectionDistance?: number;
  connectionColor?: string;
  connectionOpacity?: number;
}

// 3D scene types
export interface Scene3DConfig {
  camera: {
    position: Vector3D;
    target: Vector3D;
    fov?: number;
    near?: number;
    far?: number;
  };
  lighting: {
    ambient?: { color: string; intensity: number };
    directional?: { color: string; intensity: number; position: Vector3D };
    point?: { color: string; intensity: number; position: Vector3D }[];
  };
  background?: string | Texture;
  fog?: {
    color: string;
    near: number;
    far: number;
  };
}

export interface GeometryConfig {
  type: 'box' | 'sphere' | 'plane' | 'torus' | 'cylinder' | 'cone' | 'custom';
  size?: Vector3D | number;
  segments?: Vector3D | number;
  radius?: number;
  height?: number;
  customGeometry?: BufferGeometry;
}

export interface MaterialConfig {
  type: 'basic' | 'lambert' | 'phong' | 'standard' | 'physical' | 'shader';
  color?: string;
  opacity?: number;
  transparent?: boolean;
  wireframe?: boolean;
  metalness?: number;
  roughness?: number;
  emissive?: string;
  emissiveIntensity?: number;
  map?: string | Texture;
  normalMap?: string | Texture;
  roughnessMap?: string | Texture;
  metalnessMap?: string | Texture;
  customMaterial?: Material;
  shaderMaterial?: {
    vertexShader: string;
    fragmentShader: string;
    uniforms?: Record<string, any>;
  };
}

export interface MeshConfig {
  geometry: GeometryConfig;
  material: MaterialConfig;
  position?: Vector3D;
  rotation?: Vector3D;
  scale?: Vector3D | number;
  castShadow?: boolean;
  receiveShadow?: boolean;
  userData?: Record<string, any>;
}

// Post-processing types
export interface PostProcessingConfig {
  bloom?: {
    intensity: number;
    threshold: number;
    smoothing: number;
  };
  ssao?: {
    intensity: number;
    radius: number;
    bias: number;
  };
  fxaa?: boolean;
  smaa?: boolean;
  toneMapping?: {
    type: 'linear' | 'reinhard' | 'cineon' | 'aces';
    exposure: number;
  };
  colorGrading?: {
    brightness: number;
    contrast: number;
    saturation: number;
    hue: number;
  };
}

// Fluid animation types
export interface FluidConfig {
  resolution: number;
  density: number;
  viscosity: number;
  velocity: number;
  color: string;
  backgroundColor?: string;
  interactive?: boolean;
  mouseInfluence?: number;
  mouseRadius?: number;
  smoothing?: number;
  dissipation?: number;
}

export interface LiquidBackgroundConfig extends FluidConfig {
  variant: 'default' | 'section' | 'hero' | 'minimal';
  intensity: 'low' | 'medium' | 'high';
  speed: number;
  direction: Vector2D;
  waves?: {
    count: number;
    amplitude: number;
    frequency: number;
    speed: number;
  }[];
}

// Scroll animation types
export interface ScrollTriggerConfig {
  trigger: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  snap?: boolean | number[];
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  onUpdate?: (self: any) => void;
}

export interface ParallaxConfig {
  speed: number;
  direction: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  easing?: EasingFunction;
}

export interface MorphingConfig {
  from: Transform;
  to: Transform;
  duration: number;
  easing?: EasingFunction;
  trigger?: 'scroll' | 'hover' | 'click';
  threshold?: number;
}

// Performance monitoring types
export interface PerformanceConfig {
  enableMonitoring?: boolean;
  targetFPS?: number;
  adaptiveQuality?: boolean;
  qualityLevels?: {
    low: { resolution: number; particles: number; effects: boolean };
    medium: { resolution: number; particles: number; effects: boolean };
    high: { resolution: number; particles: number; effects: boolean };
  };
  onPerformanceUpdate?: (stats: PerformanceStats) => void;
}

export interface PerformanceStats {
  fps: number;
  frameTime: number;
  memoryUsage: number;
  drawCalls: number;
  triangles: number;
  qualityLevel: 'low' | 'medium' | 'high';
}

// Device capabilities
export interface DeviceCapabilities {
  webgl: boolean;
  webgl2: boolean;
  webglVersion: string;
  maxTextureSize: number;
  maxVertexUniforms: number;
  maxFragmentUniforms: number;
  extensions: string[];
  renderer: string;
  vendor: string;
  memory?: number;
  cores?: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  touchSupport: boolean;
  pointerSupport: boolean;
}

// Animation engine types
export interface AnimationEngineConfig {
  performance: PerformanceConfig;
  deviceCapabilities: DeviceCapabilities;
  debug?: boolean;
  onError?: (error: Error) => void;
  onWarning?: (warning: string) => void;
}

// Hook return types
export interface UseAnimationReturn {
  isAnimating: boolean;
  progress: number;
  start: () => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

export interface UseParallaxReturn {
  ref: React.RefObject<HTMLElement>;
  style: React.CSSProperties;
  progress: number;
}

export interface UseScrollTriggerReturn {
  ref: React.RefObject<HTMLElement>;
  isInView: boolean;
  progress: number;
  direction: 'up' | 'down';
}

// Component prop types
export interface AnimationComponentProps {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
}

export interface CursorSystemProps {
  cursorType?: CursorConfig['type'];
  magneticConfig?: MagneticConfig;
  touchConfig?: TouchConfig;
  children: ReactNode;
  className?: string;
}

export interface ParticleFieldProps extends AnimationComponentProps {
  config: ParticleFieldConfig;
  interactive?: boolean;
  onParticleClick?: (particle: any) => void;
}

export interface Scene3DProps extends AnimationComponentProps {
  config: Scene3DConfig;
  meshes?: MeshConfig[];
  postProcessing?: PostProcessingConfig;
  onSceneReady?: (scene: any) => void;
}

export interface FluidBackgroundProps extends AnimationComponentProps {
  config: LiquidBackgroundConfig;
  variant?: LiquidBackgroundConfig['variant'];
  intensity?: LiquidBackgroundConfig['intensity'];
}

// Utility types
export type AnimationValue = number | string | Vector2D | Vector3D | Color;
export type AnimationTarget = HTMLElement | Object3D | any;
export type AnimationProperty = string | string[];

// Event types
export interface AnimationEvent {
  type: 'start' | 'update' | 'complete' | 'pause' | 'resume' | 'stop';
  target: AnimationTarget;
  progress: number;
  timestamp: number;
}

// Error types
export interface AnimationError extends Error {
  code: 'INVALID_CONFIG' | 'WEBGL_NOT_SUPPORTED' | 'PERFORMANCE_LOW' | 'UNKNOWN';
  context?: string;
  suggestion?: string;
}
