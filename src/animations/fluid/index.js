/**
 * Fluid Animation System
 * 
 * Exports all fluid background animation components and utilities
 */

export { default as FluidBackground } from './FluidBackground';
export { default as MorphingShapes, MorphingShape } from './MorphingShapes';
export { default as ScrollFluidBackground } from './ScrollFluidBackground';
export { default as SectionFluidTransitions } from './SectionFluidTransitions';
export { default as RippleEffect, withRippleEffect, useRippleEffect } from './RippleEffect';
export { 
  default as InteractiveRipples,
  RippleButton,
  RippleCard,
  RippleInput,
  RippleNavItem,
  RippleFAB,
  RippleTrigger
} from './InteractiveRipples';
export { 
  OrganicMovement, 
  MovementPatterns, 
  OrganicEasing, 
  OrganicNoise,
  createOrganicMovementField 
} from './OrganicMovement';

// Advanced shader-based liquid effects
export { default as LiquidShaderEffect } from './LiquidShaderEffect';
export { default as AdvancedLiquidEffect } from './AdvancedLiquidEffect';
export { default as ShaderManager, getShaderManager } from './ShaderManager';

// Re-export for convenience
export * from './FluidBackground';
export * from './MorphingShapes';
export * from './ScrollFluidBackground';
export * from './SectionFluidTransitions';
export * from './RippleEffect';
export * from './InteractiveRipples';
export * from './OrganicMovement';