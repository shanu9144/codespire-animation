/**
 * MorphingAnimations - SVG path morphing system for icon transformations
 * Provides smooth transitions between different icon states with scroll triggers
 */

import scrollTrigger from './ScrollTrigger';

/**
 * SVG Path Morphing Controller
 */
class MorphingController {
  constructor() {
    this.morphTargets = new Map();
    this.activeAnimations = new Map();
  }

  /**
   * Create a morphing animation between SVG paths
   */
  createPathMorph(config) {
    const {
      element,
      paths,
      duration = 1000,
      easing = 'ease-in-out',
      trigger = 'scroll',
      scrollConfig = {},
      onComplete = null,
      onUpdate = null
    } = config;

    if (!element || !paths || paths.length < 2) {
      console.warn('MorphingController: Element and at least 2 paths are required');
      return null;
    }

    const id = this.generateId();
    const pathElement = element.querySelector('path') || element;

    if (pathElement.tagName !== 'path') {
      console.warn('MorphingController: Element must be or contain a path element');
      return null;
    }

    const morphConfig = {
      element: pathElement,
      paths,
      duration,
      easing,
      currentPathIndex: 0,
      isAnimating: false,
      onComplete,
      onUpdate
    };

    this.morphTargets.set(id, morphConfig);

    // Set initial path
    pathElement.setAttribute('d', paths[0]);

    // Setup trigger
    if (trigger === 'scroll') {
      this.setupScrollTrigger(id, morphConfig, scrollConfig);
    }

    return id;
  }

  /**
   * Setup scroll trigger for morphing animation
   */
  setupScrollTrigger(id, morphConfig, scrollConfig) {
    const {
      start = 'bottom',
      end = 'top',
      scrub = false,
      morphOnEnter = true,
      morphOnLeave = false,
      targetPathIndex = 1
    } = scrollConfig;

    const triggerId = scrollTrigger.create({
      element: morphConfig.element.closest('svg') || morphConfig.element,
      start,
      end,
      scrub,
      onEnter: () => {
        if (morphOnEnter) {
          this.morphToPath(id, targetPathIndex);
        }
      },
      onLeave: () => {
        if (morphOnLeave) {
          this.morphToPath(id, 0); // Return to original
        }
      },
      onUpdate: scrub ? (progress) => {
        this.morphWithProgress(id, progress, targetPathIndex);
      } : null
    });

    morphConfig.scrollTriggerId = triggerId;
  }

  /**
   * Morph to a specific path by index
   */
  morphToPath(id, targetIndex) {
    const config = this.morphTargets.get(id);
    if (!config || config.isAnimating) return;

    const { element, paths, duration, easing, onComplete, onUpdate } = config;
    
    if (targetIndex < 0 || targetIndex >= paths.length) {
      console.warn('MorphingController: Invalid target path index');
      return;
    }

    if (config.currentPathIndex === targetIndex) return;

    const fromPath = paths[config.currentPathIndex];
    const toPath = paths[targetIndex];

    config.isAnimating = true;

    // Animate the path morphing
    this.animatePathMorph({
      element,
      fromPath,
      toPath,
      duration,
      easing,
      onUpdate: (interpolatedPath, progress) => {
        element.setAttribute('d', interpolatedPath);
        if (onUpdate) {
          onUpdate(progress, interpolatedPath);
        }
      },
      onComplete: () => {
        config.currentPathIndex = targetIndex;
        config.isAnimating = false;
        if (onComplete) {
          onComplete(targetIndex);
        }
      }
    });
  }

  /**
   * Morph with scroll progress (for scrub animations)
   */
  morphWithProgress(id, progress, targetIndex = 1) {
    const config = this.morphTargets.get(id);
    if (!config) return;

    const { element, paths } = config;
    const fromPath = paths[0];
    const toPath = paths[targetIndex] || paths[1];

    const interpolatedPath = this.interpolatePaths(fromPath, toPath, progress);
    element.setAttribute('d', interpolatedPath);

    if (config.onUpdate) {
      config.onUpdate(progress, interpolatedPath);
    }
  }

  /**
   * Animate path morphing with custom timing
   */
  animatePathMorph(config) {
    const { element, fromPath, toPath, duration, easing, onUpdate, onComplete } = config;
    
    let startTime = null;
    const animationId = `morph-${Date.now()}`;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Apply easing
      const easedProgress = this.applyEasing(progress, easing);

      // Interpolate path
      const interpolatedPath = this.interpolatePaths(fromPath, toPath, easedProgress);

      if (onUpdate) {
        onUpdate(interpolatedPath, easedProgress);
      }

      if (progress < 1) {
        this.activeAnimations.set(animationId, requestAnimationFrame(animate));
      } else {
        this.activeAnimations.delete(animationId);
        if (onComplete) {
          onComplete();
        }
      }
    };

    this.activeAnimations.set(animationId, requestAnimationFrame(animate));
    return animationId;
  }

  /**
   * Interpolate between two SVG paths
   */
  interpolatePaths(fromPath, toPath, progress) {
    // Simple path interpolation (works best with paths of similar structure)
    // For more complex morphing, consider using libraries like flubber
    
    const fromCommands = this.parsePath(fromPath);
    const toCommands = this.parsePath(toPath);

    if (fromCommands.length !== toCommands.length) {
      // Fallback: simple crossfade by switching at 50%
      return progress < 0.5 ? fromPath : toPath;
    }

    const interpolatedCommands = fromCommands.map((fromCmd, index) => {
      const toCmd = toCommands[index];
      
      if (fromCmd.type !== toCmd.type) {
        return progress < 0.5 ? fromCmd : toCmd;
      }

      const interpolatedParams = fromCmd.params.map((fromParam, paramIndex) => {
        const toParam = toCmd.params[paramIndex] || fromParam;
        return fromParam + (toParam - fromParam) * progress;
      });

      return {
        type: fromCmd.type,
        params: interpolatedParams
      };
    });

    return this.commandsToPath(interpolatedCommands);
  }

  /**
   * Parse SVG path string into commands
   */
  parsePath(pathString) {
    const commands = [];
    const regex = /([MLHVCSQTAZ])\s*([^MLHVCSQTAZ]*)/gi;
    let match;

    while ((match = regex.exec(pathString)) !== null) {
      const type = match[1];
      const paramString = match[2].trim();
      const params = paramString ? paramString.split(/[\s,]+/).map(Number).filter(n => !isNaN(n)) : [];
      
      commands.push({ type, params });
    }

    return commands;
  }

  /**
   * Convert commands back to path string
   */
  commandsToPath(commands) {
    return commands.map(cmd => {
      const paramString = cmd.params.length > 0 ? ' ' + cmd.params.join(' ') : '';
      return cmd.type + paramString;
    }).join(' ');
  }

  /**
   * Apply easing function to progress
   */
  applyEasing(progress, easing) {
    switch (easing) {
      case 'ease-in':
        return progress * progress;
      case 'ease-out':
        return 1 - Math.pow(1 - progress, 2);
      case 'ease-in-out':
        return progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      case 'ease-in-cubic':
        return progress * progress * progress;
      case 'ease-out-cubic':
        return 1 - Math.pow(1 - progress, 3);
      case 'ease-in-out-cubic':
        return progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      default:
        return progress; // linear
    }
  }

  /**
   * Create icon morphing animation
   */
  createIconMorph(config) {
    const {
      iconElement,
      states,
      triggers = ['hover'],
      duration = 300,
      easing = 'ease-out'
    } = config;

    if (!iconElement || !states || states.length < 2) {
      console.warn('MorphingController: Icon element and at least 2 states are required');
      return null;
    }

    const id = this.generateId();
    const pathElement = iconElement.querySelector('path');

    if (!pathElement) {
      console.warn('MorphingController: Icon must contain a path element');
      return null;
    }

    const morphConfig = {
      element: pathElement,
      paths: states.map(state => state.path),
      duration,
      easing,
      currentPathIndex: 0,
      states
    };

    this.morphTargets.set(id, morphConfig);

    // Set initial state
    pathElement.setAttribute('d', states[0].path);
    if (states[0].fill) pathElement.setAttribute('fill', states[0].fill);
    if (states[0].stroke) pathElement.setAttribute('stroke', states[0].stroke);

    // Setup triggers
    triggers.forEach(trigger => {
      if (trigger === 'hover') {
        iconElement.addEventListener('mouseenter', () => {
          this.morphToPath(id, 1);
          this.applyStateStyles(id, 1);
        });
        iconElement.addEventListener('mouseleave', () => {
          this.morphToPath(id, 0);
          this.applyStateStyles(id, 0);
        });
      } else if (trigger === 'click') {
        iconElement.addEventListener('click', () => {
          const nextIndex = (morphConfig.currentPathIndex + 1) % states.length;
          this.morphToPath(id, nextIndex);
          this.applyStateStyles(id, nextIndex);
        });
      }
    });

    return id;
  }

  /**
   * Apply state styles (fill, stroke, etc.)
   */
  applyStateStyles(id, stateIndex) {
    const config = this.morphTargets.get(id);
    if (!config || !config.states) return;

    const state = config.states[stateIndex];
    const element = config.element;

    if (state.fill) element.setAttribute('fill', state.fill);
    if (state.stroke) element.setAttribute('stroke', state.stroke);
    if (state.strokeWidth) element.setAttribute('stroke-width', state.strokeWidth);
    if (state.opacity) element.setAttribute('opacity', state.opacity);
  }

  /**
   * Create scroll-triggered logo morph
   */
  createLogoMorph(config) {
    const {
      logoElement,
      normalState,
      animatedState,
      scrollTriggerConfig = {}
    } = config;

    return this.createPathMorph({
      element: logoElement,
      paths: [normalState.path, animatedState.path],
      trigger: 'scroll',
      scrollConfig: {
        morphOnEnter: true,
        morphOnLeave: true,
        ...scrollTriggerConfig
      },
      onComplete: (pathIndex) => {
        const state = pathIndex === 0 ? normalState : animatedState;
        this.applyStateStyles(logoElement, state);
      }
    });
  }

  /**
   * Remove morphing animation
   */
  remove(id) {
    const config = this.morphTargets.get(id);
    if (!config) return;

    // Remove scroll trigger if exists
    if (config.scrollTriggerId) {
      scrollTrigger.remove(config.scrollTriggerId);
    }

    // Cancel active animations
    this.activeAnimations.forEach((animationId, key) => {
      if (key.includes(id)) {
        cancelAnimationFrame(animationId);
        this.activeAnimations.delete(key);
      }
    });

    this.morphTargets.delete(id);
  }

  /**
   * Generate unique ID
   */
  generateId() {
    return `morph-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Destroy all morphing animations
   */
  destroy() {
    // Cancel all active animations
    this.activeAnimations.forEach(animationId => {
      cancelAnimationFrame(animationId);
    });
    this.activeAnimations.clear();

    // Remove all morph targets
    this.morphTargets.forEach((config, id) => {
      this.remove(id);
    });
    this.morphTargets.clear();
  }
}

// Pre-defined icon morphing configurations
export const IconMorphPresets = {
  // Menu to X transformation
  menuToX: {
    states: [
      {
        path: 'M3 12h18M3 6h18M3 18h18',
        name: 'menu'
      },
      {
        path: 'M18 6L6 18M6 6l12 12',
        name: 'x'
      }
    ]
  },

  // Play to pause transformation
  playToPause: {
    states: [
      {
        path: 'M8 5v14l11-7z',
        name: 'play'
      },
      {
        path: 'M6 4h4v16H6zM14 4h4v16h-4z',
        name: 'pause'
      }
    ]
  },

  // Heart outline to filled
  heartFill: {
    states: [
      {
        path: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
        fill: 'none',
        stroke: 'currentColor',
        name: 'outline'
      },
      {
        path: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
        fill: '#ff4757',
        stroke: '#ff4757',
        name: 'filled'
      }
    ]
  },

  // Arrow rotation
  arrowRotate: {
    states: [
      {
        path: 'M5 12h14M12 5l7 7-7 7',
        name: 'right'
      },
      {
        path: 'M19 12H5M12 19l-7-7 7-7',
        name: 'left'
      }
    ]
  }
};

// Create singleton instance (lazy initialization for SSR compatibility)
let morphingControllerInstance = null;

const getMorphingController = () => {
  if (typeof window === 'undefined') {
    // Return a mock object for server-side rendering
    return {
      createPathMorph: () => null,
      createIconMorph: () => null,
      createLogoMorph: () => null,
      morphToPath: () => {},
      remove: () => {},
      destroy: () => {}
    };
  }
  
  if (!morphingControllerInstance) {
    morphingControllerInstance = new MorphingController();
  }
  
  return morphingControllerInstance;
};

const morphingController = getMorphingController();

export default morphingController;
export { MorphingController, getMorphingController };