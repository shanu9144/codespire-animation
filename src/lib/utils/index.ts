/**
 * Consolidated utility functions for CodeSpire Animation project
 */

import AnimationEngine from '../animations/core/AnimationEngine.js';
import DeviceCapabilities from '../animations/core/DeviceCapabilities.js';

// ============================================================================
// CLASS NAME UTILITIES
// ============================================================================

/**
 * Utility function to combine class names
 * @param {...string} classes - Class names to combine
 * @returns {string} Combined class names
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// ============================================================================
// ANIMATION CONFIGURATIONS
// ============================================================================

export interface AnimationConfig {
  initial: Record<string, any>;
  animate: Record<string, any>;
  transition: Record<string, any>;
}

export interface StaggerConfig {
  animate: {
    transition: {
      staggerChildren: number;
    };
  };
}

/**
 * Animation configurations for consistent use across components
 */
export const animations: Record<string, AnimationConfig | StaggerConfig> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  slideIn: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};

// ============================================================================
// PERFORMANCE UTILITIES
// ============================================================================

/**
 * Debounce function for performance optimization
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ============================================================================
// ANIMATION SYSTEM INITIALIZATION
// ============================================================================

export interface AnimationOptions {
  targetFPS?: number;
  adaptiveQuality?: boolean;
  enableAnimations?: boolean;
  enable3D?: boolean;
  enableParticles?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  respectReducedMotion?: boolean;
  provideFallbacks?: boolean;
  showPerformanceStats?: boolean;
}

export interface AnimationInitResult {
  success: boolean;
  config?: any;
  capabilities?: any;
  engine?: any;
  error?: string;
  fallback?: boolean;
}

/**
 * Initialize the animation system
 * @param options - Configuration options
 * @returns Initialization result
 */
export async function initializeAnimations(options: AnimationOptions = {}): Promise<AnimationInitResult> {
  try {
    // Default configuration
    const defaultConfig: Required<AnimationOptions> = {
      // Performance
      targetFPS: 60,
      adaptiveQuality: true,
      
      // Features
      enableAnimations: true,
      enable3D: true,
      enableParticles: true,
      
      // Visual
      primaryColor: '#384bff',
      secondaryColor: '#ffffff',
      
      // Accessibility
      respectReducedMotion: true,
      provideFallbacks: true,
      
      // Debug
      showPerformanceStats: false
    };

    // Merge with user options
    const config = { ...defaultConfig, ...options };

    // Initialize the animation engine
    await AnimationEngine.initialize(config);

    // Get device capabilities for reporting
    const capabilities = DeviceCapabilities.getCapabilities();
    
    const result: AnimationInitResult = {
      success: true,
      config: AnimationEngine.getConfig(),
      capabilities,
      engine: AnimationEngine
    };

    console.log('Animation system initialized successfully:', result);
    return result;

  } catch (error) {
    console.error('Failed to initialize animation system:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      fallback: true,
      engine: AnimationEngine
    };
  }
}

/**
 * Quick setup for CodeSpire website
 * @returns Initialization result
 */
export async function initializeCodeSpireAnimations(): Promise<AnimationInitResult> {
  return initializeAnimations({
    primaryColor: '#384bff',
    secondaryColor: '#ffffff',
    enableAnimations: true,
    enable3D: true,
    enableParticles: true,
    respectReducedMotion: true,
    showPerformanceStats: process.env.NODE_ENV === 'development'
  });
}

/**
 * Get animation system status
 * @returns Current status
 */
export function getAnimationStatus() {
  return {
    initialized: AnimationEngine.isInitialized,
    metrics: AnimationEngine.getMetrics(),
    config: AnimationEngine.getConfig()
  };
}

/**
 * Cleanup animation system
 */
export function cleanupAnimations(): void {
  AnimationEngine.destroy();
}
