// Core cursor components
export { default as MagneticCursor } from './MagneticCursor';
export { default as CustomCursor } from './CustomCursor';
export { default as MagneticCursorAdvanced } from './MagneticCursorAdvanced';
export { default as InvisibleMagneticCursor } from './InvisibleMagneticCursor';

// Magnetic field and utilities
export { default as MagneticField } from './MagneticField';
export { default as magneticUtils } from './magneticUtils';

// Trail components
export { default as CursorTrail } from './CursorTrail';
export { default as CursorTrailAdvanced } from './CursorTrailAdvanced';
export { default as CursorWithTrail } from './CursorWithTrail';

// Mobile and touch support
export { default as MobileDetection } from './MobileDetection';
export { default as TouchAlternatives } from './TouchAlternatives';
export { TouchFeedback, AdaptiveCursor } from './TouchAlternatives';

// Complete cursor system
export { default as CursorSystem } from './CursorSystem';
export { useCursorSystem } from './CursorSystem';

// Hooks
export { useCursor, useDeviceDetection } from './useCursor';
export { useDeviceCapabilities, useTouchInteractions } from './MobileDetection';

// Re-export for convenience
export * from './MagneticCursor';
export * from './CustomCursor';
export * from './useCursor';
export * from './MobileDetection';
export * from './TouchAlternatives';
export * from './CursorSystem';