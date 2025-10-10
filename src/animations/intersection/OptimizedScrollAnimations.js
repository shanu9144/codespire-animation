/**
 * OptimizedScrollAnimations - Performance-optimized scroll animations using Intersection Observer
 * Replaces traditional scroll event listeners with intersection observer for better performance
 */

import intersectionObserverManager from './IntersectionObserverManager';
import { useIntersectionObserver, useAnimationTrigger } from './useIntersectionObserver';

/**
 * Optimized parallax controller using intersection observer
 */
class OptimizedParallaxController {
  constructor() {
    this.layers = new Map();
    this.visibleLayers = new Set();
    this.isActive = true;
    this.rafId = null;
    
    // Performance settings
    this.throttleDelay = 16; // ~60fps
    this.lastUpdate = 0;
    
    this.init();
  }

  init() {
    if (typeof window === 'undefined') return;
    
    // Start animation loop
    this.startAnimationLoop();
  }

  /**
   * Add a parallax layer with intersection observer optimization
   */
  addLayer(config) {
    const {
      element,
      speed = { x: 0, y: 0.5 },
      direction = 'vertical',
      bounds = null,
      easing = null,
      offset = { x: 0, y: 0 },
      transformOrigin = 'center center',
      onUpdate = null,
      rootMargin = '100px' // Start animating before element is fully visible
    } = config;

    if (!element) return null;

    const layerId = `layer-${Date.now()}-${Math.random()}`;
    
    const layerConfig = {
      element,
      speed,
      direction,
      bounds,
      easing,
      offset,
      transformOrigin,
      onUpdate,
      isVisible: false,
      lastScrollY: 0,
      lastScrollX: 0
    };

    this.layers.set(layerId, layerConfig);

    // Use intersection observer to only animate visible elements
    intersectionObserverManager.observe(
      element,
      (entry) => {
        layerConfig.isVisible = entry.isIntersecting;
        
        if (entry.isIntersecting) {
          this.visibleLayers.add(layerId);
        } else {
          this.visibleLayers.delete(layerId);
        }
      },
      { rootMargin }
    );

    return layerId;
  }

  /**
   * Remove a parallax layer
   */
  removeLayer(layerId) {
    const layer = this.layers.get(layerId);
    if (!layer) return;

    intersectionObserverManager.unobserve(layer.element);
    this.layers.delete(layerId);
    this.visibleLayers.delete(layerId);
  }

  /**
   * Start optimized animation loop
   */
  startAnimationLoop() {
    const animate = (currentTime) => {
      if (this.isActive) {
        this.updateVisibleLayers();
        this.rafId = requestAnimationFrame(animate);
      }
    };
    
    this.rafId = requestAnimationFrame(animate);
  }

  /**
   * Update only visible layers for better performance
   */
  updateVisibleLayers() {
    const now = performance.now();
    
    // Throttle updates
    if (now - this.lastUpdate < this.throttleDelay) return;
    this.lastUpdate = now;

    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    // Only update visible layers
    this.visibleLayers.forEach(layerId => {
      const layer = this.layers.get(layerId);
      if (!layer || !layer.isVisible) return;

      this.updateLayer(layer, scrollY, scrollX);
    });
  }

  /**
   * Update individual layer
   */
  updateLayer(layer, scrollY, scrollX) {
    const {
      element,
      speed,
      direction,
      bounds,
      easing,
      offset,
      transformOrigin,
      onUpdate
    } = layer;

    if (!element) return;

    // Calculate movement based on direction and speed
    let transformX = 0;
    let transformY = 0;

    if (direction === 'vertical' || direction === 'both') {
      transformY = (scrollY + offset.y) * speed.y;
    }

    if (direction === 'horizontal' || direction === 'both') {
      transformX = (scrollX + offset.x) * speed.x;
    }

    // Apply bounds if specified
    if (bounds) {
      if (bounds.minY !== undefined) transformY = Math.max(bounds.minY, transformY);
      if (bounds.maxY !== undefined) transformY = Math.min(bounds.maxY, transformY);
      if (bounds.minX !== undefined) transformX = Math.max(bounds.minX, transformX);
      if (bounds.maxX !== undefined) transformX = Math.min(bounds.maxX, transformX);
    }

    // Apply easing if specified
    if (easing && typeof easing === 'function') {
      const progress = Math.abs(transformY) / window.innerHeight;
      const easedProgress = easing(Math.min(progress, 1));
      transformY = transformY * easedProgress;
    }

    // Apply transform
    const transform = `translate3d(${transformX}px, ${transformY}px, 0)`;
    element.style.transform = transform;

    // Set transform origin if specified
    if (transformOrigin) {
      element.style.transformOrigin = transformOrigin;
    }

    // Trigger callback if provided
    if (onUpdate) {
      onUpdate({
        scrollY,
        scrollX,
        transformX,
        transformY,
        element
      });
    }
  }

  /**
   * Toggle layer visibility
   */
  toggleLayer(layerId, isActive = true) {
    const layer = this.layers.get(layerId);
    if (layer) {
      layer.isActive = isActive;
    }
  }

  /**
   * Update layer speed
   */
  setLayerSpeed(layerId, speed) {
    const layer = this.layers.get(layerId);
    if (layer) {
      layer.speed = speed;
    }
  }

  /**
   * Update layer bounds
   */
  setLayerBounds(layerId, bounds) {
    const layer = this.layers.get(layerId);
    if (layer) {
      layer.bounds = bounds;
    }
  }

  /**
   * Get performance statistics
   */
  getStats() {
    return {
      totalLayers: this.layers.size,
      visibleLayers: this.visibleLayers.size,
      isActive: this.isActive
    };
  }

  /**
   * Destroy the controller
   */
  destroy() {
    this.isActive = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    
    this.layers.forEach((layer, layerId) => {
      this.removeLayer(layerId);
    });
  }
}

/**
 * Optimized scroll trigger system
 */
class OptimizedScrollTrigger {
  constructor() {
    this.triggers = new Map();
    this.visibleTriggers = new Set();
    this.isActive = true;
    this.rafId = null;
    
    this.init();
  }

  init() {
    if (typeof window === 'undefined') return;
    this.startAnimationLoop();
  }

  /**
   * Create a scroll trigger with intersection observer optimization
   */
  create(config) {
    const {
      element,
      start = 'bottom',
      end = 'top',
      scrub = false,
      onUpdate = null,
      onEnter = null,
      onLeave = null,
      onEnterBack = null,
      onLeaveBack = null,
      rootMargin = '50px'
    } = config;

    if (!element) return null;

    const triggerId = `trigger-${Date.now()}-${Math.random()}`;
    
    const triggerConfig = {
      element,
      start,
      end,
      scrub,
      onUpdate,
      onEnter,
      onLeave,
      onEnterBack,
      onEnterBack,
      onLeaveBack,
      isVisible: false,
      hasEntered: false,
      hasLeft: false,
      lastProgress: 0
    };

    this.triggers.set(triggerId, triggerConfig);

    // Use intersection observer for visibility detection
    intersectionObserverManager.observe(
      element,
      (entry) => {
        triggerConfig.isVisible = entry.isIntersecting;
        
        if (entry.isIntersecting) {
          this.visibleTriggers.add(triggerId);
          
          // Trigger enter callbacks
          if (!triggerConfig.hasEntered && onEnter) {
            onEnter(entry);
            triggerConfig.hasEntered = true;
          }
        } else {
          this.visibleTriggers.delete(triggerId);
          
          // Trigger leave callbacks
          if (triggerConfig.hasEntered && onLeave) {
            onLeave(entry);
            triggerConfig.hasLeft = true;
          }
        }
      },
      { rootMargin }
    );

    return triggerId;
  }

  /**
   * Remove a scroll trigger
   */
  remove(triggerId) {
    const trigger = this.triggers.get(triggerId);
    if (!trigger) return;

    intersectionObserverManager.unobserve(trigger.element);
    this.triggers.delete(triggerId);
    this.visibleTriggers.delete(triggerId);
  }

  /**
   * Start animation loop for visible triggers
   */
  startAnimationLoop() {
    const animate = () => {
      if (this.isActive) {
        this.updateVisibleTriggers();
        this.rafId = requestAnimationFrame(animate);
      }
    };
    
    this.rafId = requestAnimationFrame(animate);
  }

  /**
   * Update only visible triggers
   */
  updateVisibleTriggers() {
    const scrollY = window.scrollY;

    this.visibleTriggers.forEach(triggerId => {
      const trigger = this.triggers.get(triggerId);
      if (!trigger || !trigger.isVisible) return;

      this.updateTrigger(trigger, scrollY);
    });
  }

  /**
   * Update individual trigger
   */
  updateTrigger(trigger, scrollY) {
    const { element, onUpdate, scrub } = trigger;
    
    if (!element || !onUpdate) return;

    // Calculate progress
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementTop = rect.top;
    const elementHeight = rect.height;
    
    let progress = 0;
    if (elementTop < windowHeight && elementTop + elementHeight > 0) {
      const visibleHeight = Math.min(windowHeight - elementTop, elementHeight);
      progress = Math.max(0, Math.min(1, visibleHeight / elementHeight));
    }

    // Only update if progress changed significantly
    if (Math.abs(progress - trigger.lastProgress) > 0.01) {
      trigger.lastProgress = progress;
      
      if (scrub) {
        onUpdate(progress);
      } else {
        onUpdate({ progress, scrollY, element });
      }
    }
  }

  /**
   * Get performance statistics
   */
  getStats() {
    return {
      totalTriggers: this.triggers.size,
      visibleTriggers: this.visibleTriggers.size,
      isActive: this.isActive
    };
  }

  /**
   * Destroy the trigger system
   */
  destroy() {
    this.isActive = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    
    this.triggers.forEach((trigger, triggerId) => {
      this.remove(triggerId);
    });
  }
}

// Create singleton instances
const optimizedParallaxController = new OptimizedParallaxController();
const optimizedScrollTrigger = new OptimizedScrollTrigger();

export default {
  OptimizedParallaxController,
  OptimizedScrollTrigger,
  parallaxController: optimizedParallaxController,
  scrollTrigger: optimizedScrollTrigger
};

export {
  OptimizedParallaxController,
  OptimizedScrollTrigger,
  optimizedParallaxController,
  optimizedScrollTrigger
};
