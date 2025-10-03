/**
 * SectionTransitions - Smooth transitions between website sections
 * Provides slide, fade, and liquid transition effects with staggered animations
 */

import scrollTrigger from './ScrollTrigger';

/**
 * Section Transition Controller
 */
class SectionTransitionController {
  constructor() {
    this.sections = new Map();
    this.transitions = new Map();
    this.activeTransitions = new Set();
  }

  /**
   * Register a section for transitions
   */
  registerSection(config) {
    const {
      element,
      name,
      transitionType = 'fade',
      duration = 1000,
      easing = 'ease-out',
      stagger = 100,
      childSelector = '> *',
      triggerOffset = '20%',
      onEnter = null,
      onLeave = null
    } = config;

    if (!element) {
      console.warn('SectionTransitionController: Element is required');
      return null;
    }

    const id = this.generateId();
    
    const sectionConfig = {
      element,
      name,
      transitionType,
      duration,
      easing,
      stagger,
      childSelector,
      triggerOffset,
      onEnter,
      onLeave,
      isVisible: false,
      children: [],
      triggerId: null
    };

    // Get child elements for staggered animations
    if (childSelector) {
      sectionConfig.children = Array.from(element.querySelectorAll(childSelector));
    }

    this.sections.set(id, sectionConfig);
    this.setupSectionTrigger(id, sectionConfig);

    return id;
  }

  /**
   * Setup scroll trigger for section
   */
  setupSectionTrigger(id, config) {
    const triggerId = scrollTrigger.create({
      element: config.element,
      start: `top ${config.triggerOffset}`,
      end: 'bottom top',
      onEnter: () => {
        if (!config.isVisible) {
          this.animateIn(id);
        }
      },
      onLeave: () => {
        if (config.onLeave) {
          config.onLeave(config.element);
        }
      }
    });

    config.triggerId = triggerId;
  }

  /**
   * Animate section entrance
   */
  animateIn(id) {
    const config = this.sections.get(id);
    if (!config || config.isVisible) return;

    config.isVisible = true;
    this.activeTransitions.add(id);

    const { element, transitionType, duration, easing, stagger, children, onEnter } = config;

    // Apply initial styles based on transition type
    this.applyInitialStyles(element, children, transitionType);

    // Animate main element
    this.animateElement(element, transitionType, duration, easing, 0);

    // Animate children with stagger
    if (children.length > 0) {
      children.forEach((child, index) => {
        const delay = index * stagger;
        setTimeout(() => {
          this.animateElement(child, transitionType, duration, easing, delay);
        }, delay);
      });
    }

    // Call onEnter callback
    if (onEnter) {
      onEnter(element);
    }

    // Remove from active transitions after animation completes
    setTimeout(() => {
      this.activeTransitions.delete(id);
    }, duration + (children.length * stagger));
  }

  /**
   * Apply initial styles for transition
   */
  applyInitialStyles(element, children, transitionType) {
    const elements = [element, ...children];

    elements.forEach(el => {
      switch (transitionType) {
        case 'fade':
          el.style.opacity = '0';
          break;
        case 'slideUp':
          el.style.opacity = '0';
          el.style.transform = 'translateY(50px)';
          break;
        case 'slideDown':
          el.style.opacity = '0';
          el.style.transform = 'translateY(-50px)';
          break;
        case 'slideLeft':
          el.style.opacity = '0';
          el.style.transform = 'translateX(50px)';
          break;
        case 'slideRight':
          el.style.opacity = '0';
          el.style.transform = 'translateX(-50px)';
          break;
        case 'scale':
          el.style.opacity = '0';
          el.style.transform = 'scale(0.8)';
          break;
        case 'rotate':
          el.style.opacity = '0';
          el.style.transform = 'rotate(10deg) scale(0.9)';
          break;
        case 'liquid':
          el.style.opacity = '0';
          el.style.transform = 'scale(0.9)';
          el.style.filter = 'blur(10px)';
          break;
        default:
          el.style.opacity = '0';
      }
    });
  }

  /**
   * Animate individual element
   */
  animateElement(element, transitionType, duration, easing, delay = 0) {
    // Set transition properties
    const transitionProps = this.getTransitionProperties(transitionType, duration, easing, delay);
    element.style.transition = transitionProps;

    // Trigger animation on next frame
    requestAnimationFrame(() => {
      switch (transitionType) {
        case 'fade':
          element.style.opacity = '1';
          break;
        case 'slideUp':
        case 'slideDown':
        case 'slideLeft':
        case 'slideRight':
          element.style.opacity = '1';
          element.style.transform = 'translateX(0) translateY(0)';
          break;
        case 'scale':
          element.style.opacity = '1';
          element.style.transform = 'scale(1)';
          break;
        case 'rotate':
          element.style.opacity = '1';
          element.style.transform = 'rotate(0deg) scale(1)';
          break;
        case 'liquid':
          element.style.opacity = '1';
          element.style.transform = 'scale(1)';
          element.style.filter = 'blur(0px)';
          break;
        default:
          element.style.opacity = '1';
      }
    });

    // Clean up transition after animation
    setTimeout(() => {
      element.style.transition = '';
    }, duration + delay + 100);
  }

  /**
   * Get transition properties string
   */
  getTransitionProperties(transitionType, duration, easing, delay) {
    const durationMs = `${duration}ms`;
    const delayMs = delay > 0 ? `${delay}ms` : '0ms';

    switch (transitionType) {
      case 'fade':
        return `opacity ${durationMs} ${easing} ${delayMs}`;
      case 'slideUp':
      case 'slideDown':
      case 'slideLeft':
      case 'slideRight':
        return `opacity ${durationMs} ${easing} ${delayMs}, transform ${durationMs} ${easing} ${delayMs}`;
      case 'scale':
        return `opacity ${durationMs} ${easing} ${delayMs}, transform ${durationMs} ${easing} ${delayMs}`;
      case 'rotate':
        return `opacity ${durationMs} ${easing} ${delayMs}, transform ${durationMs} ${easing} ${delayMs}`;
      case 'liquid':
        return `opacity ${durationMs} ${easing} ${delayMs}, transform ${durationMs} ${easing} ${delayMs}, filter ${durationMs} ${easing} ${delayMs}`;
      default:
        return `opacity ${durationMs} ${easing} ${delayMs}`;
    }
  }

  /**
   * Create section-to-section transition
   */
  createSectionTransition(config) {
    const {
      fromSection,
      toSection,
      transitionType = 'slide',
      duration = 1000,
      easing = 'ease-in-out',
      trigger = 'scroll'
    } = config;

    if (!fromSection || !toSection) {
      console.warn('SectionTransitionController: Both sections are required');
      return null;
    }

    const id = this.generateId();
    
    const transitionConfig = {
      fromSection,
      toSection,
      transitionType,
      duration,
      easing,
      trigger,
      isActive: false
    };

    this.transitions.set(id, transitionConfig);

    if (trigger === 'scroll') {
      this.setupTransitionTrigger(id, transitionConfig);
    }

    return id;
  }

  /**
   * Setup scroll trigger for section transition
   */
  setupTransitionTrigger(id, config) {
    const triggerId = scrollTrigger.create({
      element: config.toSection,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        this.executeTransition(id);
      }
    });

    config.triggerId = triggerId;
  }

  /**
   * Execute section transition
   */
  executeTransition(id) {
    const config = this.transitions.get(id);
    if (!config || config.isActive) return;

    config.isActive = true;
    const { fromSection, toSection, transitionType, duration, easing } = config;

    switch (transitionType) {
      case 'slide':
        this.executeSlideTransition(fromSection, toSection, duration, easing);
        break;
      case 'fade':
        this.executeFadeTransition(fromSection, toSection, duration, easing);
        break;
      case 'morph':
        this.executeMorphTransition(fromSection, toSection, duration, easing);
        break;
      case 'liquid':
        this.executeLiquidTransition(fromSection, toSection, duration, easing);
        break;
      default:
        this.executeFadeTransition(fromSection, toSection, duration, easing);
    }

    // Reset active state after transition
    setTimeout(() => {
      config.isActive = false;
    }, duration);
  }

  /**
   * Execute slide transition
   */
  executeSlideTransition(fromSection, toSection, duration, easing) {
    const durationMs = `${duration}ms`;
    
    // Animate from section out
    fromSection.style.transition = `transform ${durationMs} ${easing}, opacity ${durationMs} ${easing}`;
    fromSection.style.transform = 'translateY(-100px)';
    fromSection.style.opacity = '0.5';

    // Animate to section in
    toSection.style.transform = 'translateY(100px)';
    toSection.style.opacity = '0';
    toSection.style.transition = `transform ${durationMs} ${easing}, opacity ${durationMs} ${easing}`;
    
    requestAnimationFrame(() => {
      toSection.style.transform = 'translateY(0)';
      toSection.style.opacity = '1';
    });

    // Reset styles after transition
    setTimeout(() => {
      fromSection.style.transition = '';
      fromSection.style.transform = '';
      fromSection.style.opacity = '';
      toSection.style.transition = '';
    }, duration + 100);
  }

  /**
   * Execute fade transition
   */
  executeFadeTransition(fromSection, toSection, duration, easing) {
    const durationMs = `${duration}ms`;
    
    // Cross-fade between sections
    fromSection.style.transition = `opacity ${durationMs} ${easing}`;
    toSection.style.transition = `opacity ${durationMs} ${easing}`;
    
    fromSection.style.opacity = '0.3';
    toSection.style.opacity = '1';

    // Reset styles after transition
    setTimeout(() => {
      fromSection.style.transition = '';
      fromSection.style.opacity = '';
      toSection.style.transition = '';
    }, duration + 100);
  }

  /**
   * Execute morph transition
   */
  executeMorphTransition(fromSection, toSection, duration, easing) {
    const durationMs = `${duration}ms`;
    
    // Scale and fade transition
    fromSection.style.transition = `transform ${durationMs} ${easing}, opacity ${durationMs} ${easing}`;
    toSection.style.transition = `transform ${durationMs} ${easing}, opacity ${durationMs} ${easing}`;
    
    fromSection.style.transform = 'scale(0.95)';
    fromSection.style.opacity = '0.5';
    
    toSection.style.transform = 'scale(1.05)';
    toSection.style.opacity = '0';
    
    requestAnimationFrame(() => {
      toSection.style.transform = 'scale(1)';
      toSection.style.opacity = '1';
    });

    // Reset styles after transition
    setTimeout(() => {
      fromSection.style.transition = '';
      fromSection.style.transform = '';
      fromSection.style.opacity = '';
      toSection.style.transition = '';
      toSection.style.transform = '';
    }, duration + 100);
  }

  /**
   * Execute liquid transition
   */
  executeLiquidTransition(fromSection, toSection, duration, easing) {
    const durationMs = `${duration}ms`;
    
    // Liquid-like blur and scale transition
    fromSection.style.transition = `transform ${durationMs} ${easing}, opacity ${durationMs} ${easing}, filter ${durationMs} ${easing}`;
    toSection.style.transition = `transform ${durationMs} ${easing}, opacity ${durationMs} ${easing}, filter ${durationMs} ${easing}`;
    
    fromSection.style.transform = 'scale(0.9)';
    fromSection.style.opacity = '0.3';
    fromSection.style.filter = 'blur(5px)';
    
    toSection.style.transform = 'scale(0.9)';
    toSection.style.opacity = '0';
    toSection.style.filter = 'blur(10px)';
    
    requestAnimationFrame(() => {
      toSection.style.transform = 'scale(1)';
      toSection.style.opacity = '1';
      toSection.style.filter = 'blur(0px)';
    });

    // Reset styles after transition
    setTimeout(() => {
      fromSection.style.transition = '';
      fromSection.style.transform = '';
      fromSection.style.opacity = '';
      fromSection.style.filter = '';
      toSection.style.transition = '';
      toSection.style.transform = '';
      toSection.style.filter = '';
    }, duration + 100);
  }

  /**
   * Create staggered child animations
   */
  createStaggeredAnimation(config) {
    const {
      parentElement,
      childSelector = '> *',
      animationType = 'fadeUp',
      staggerDelay = 100,
      duration = 600,
      easing = 'ease-out',
      triggerOffset = '20%'
    } = config;

    if (!parentElement) {
      console.warn('SectionTransitionController: Parent element is required');
      return null;
    }

    const children = Array.from(parentElement.querySelectorAll(childSelector));
    const triggerIds = [];

    children.forEach((child, index) => {
      // Apply initial styles
      this.applyInitialStyles(child, [], animationType);

      // Create individual trigger for each child
      const triggerId = scrollTrigger.create({
        element: child,
        start: `top ${triggerOffset}`,
        onEnter: () => {
          setTimeout(() => {
            this.animateElement(child, animationType, duration, easing);
          }, index * staggerDelay);
        }
      });

      triggerIds.push(triggerId);
    });

    return triggerIds;
  }

  /**
   * Remove section registration
   */
  removeSection(id) {
    const config = this.sections.get(id);
    if (!config) return;

    // Remove scroll trigger
    if (config.triggerId) {
      scrollTrigger.remove(config.triggerId);
    }

    this.sections.delete(id);
  }

  /**
   * Remove section transition
   */
  removeTransition(id) {
    const config = this.transitions.get(id);
    if (!config) return;

    // Remove scroll trigger
    if (config.triggerId) {
      scrollTrigger.remove(config.triggerId);
    }

    this.transitions.delete(id);
  }

  /**
   * Generate unique ID
   */
  generateId() {
    return `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Destroy all section transitions
   */
  destroy() {
    // Remove all sections
    this.sections.forEach((config, id) => {
      this.removeSection(id);
    });

    // Remove all transitions
    this.transitions.forEach((config, id) => {
      this.removeTransition(id);
    });

    // Clear active transitions
    this.activeTransitions.clear();
  }
}

// Pre-defined transition configurations
export const TransitionPresets = {
  fadeIn: {
    transitionType: 'fade',
    duration: 800,
    easing: 'ease-out',
    stagger: 100
  },
  slideUp: {
    transitionType: 'slideUp',
    duration: 1000,
    easing: 'ease-out',
    stagger: 150
  },
  scaleIn: {
    transitionType: 'scale',
    duration: 600,
    easing: 'ease-out',
    stagger: 80
  },
  liquidIn: {
    transitionType: 'liquid',
    duration: 1200,
    easing: 'ease-out',
    stagger: 200
  }
};

// Create singleton instance (lazy initialization for SSR compatibility)
let sectionTransitionControllerInstance = null;

const getSectionTransitionController = () => {
  if (typeof window === 'undefined') {
    // Return a mock object for server-side rendering
    return {
      registerSection: () => null,
      removeSection: () => {},
      createSectionTransition: () => null,
      removeTransition: () => {},
      createStaggeredAnimation: () => [],
      destroy: () => {}
    };
  }
  
  if (!sectionTransitionControllerInstance) {
    sectionTransitionControllerInstance = new SectionTransitionController();
  }
  
  return sectionTransitionControllerInstance;
};

const sectionTransitionController = getSectionTransitionController();

export default sectionTransitionController;
export { SectionTransitionController, getSectionTransitionController };