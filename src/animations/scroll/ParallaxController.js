/**
 * ParallaxController - Multi-layer parallax system with performance optimization
 * Supports both vertical and horizontal parallax effects with smooth interpolation
 */

class ParallaxController {
  constructor() {
    this.layers = new Map();
    this.isActive = true;
    this.scrollY = 0;
    this.scrollX = 0;
    this.ticking = false;
    this.rafId = null;
    
    // Performance optimization
    this.lastScrollY = 0;
    this.lastScrollX = 0;
    this.threshold = 1; // Minimum scroll difference to trigger update
    
    // Smooth interpolation
    this.lerp = 0.1; // Linear interpolation factor
    this.targetScrollY = 0;
    this.targetScrollX = 0;
    
    // Bind methods
    this.handleScroll = this.handleScroll.bind(this);
    this.updateParallax = this.updateParallax.bind(this);
    this.smoothUpdate = this.smoothUpdate.bind(this);
    
    // Initialize
    this.init();
  }

  /**
   * Initialize the parallax controller
   */
  init() {
    if (typeof window === 'undefined') return;
    
    // Add scroll listener
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    
    // Start smooth update loop
    this.startSmoothUpdate();
    
    // Initial scroll position
    this.scrollY = window.scrollY;
    this.scrollX = window.scrollX;
    this.targetScrollY = this.scrollY;
    this.targetScrollX = this.scrollX;
  }

  /**
   * Handle scroll events
   */
  handleScroll() {
    if (typeof window === 'undefined') return;
    
    this.targetScrollY = window.scrollY;
    this.targetScrollX = window.scrollX;
    
    if (!this.ticking) {
      this.requestTick();
    }
  }

  /**
   * Request animation frame for parallax update
   */
  requestTick() {
    this.ticking = true;
    this.rafId = requestAnimationFrame(this.updateParallax);
  }

  /**
   * Start smooth update loop for interpolated scrolling
   */
  startSmoothUpdate() {
    const update = () => {
      this.smoothUpdate();
      if (this.isActive) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  }

  /**
   * Smooth interpolation update
   */
  smoothUpdate() {
    // Interpolate scroll values
    this.scrollY += (this.targetScrollY - this.scrollY) * this.lerp;
    this.scrollX += (this.targetScrollX - this.scrollX) * this.lerp;
    
    // Check if we need to update (performance optimization)
    const scrollYDiff = Math.abs(this.scrollY - this.lastScrollY);
    const scrollXDiff = Math.abs(this.scrollX - this.lastScrollX);
    
    if (scrollYDiff > this.threshold || scrollXDiff > this.threshold) {
      this.updateLayers();
      this.lastScrollY = this.scrollY;
      this.lastScrollX = this.scrollX;
    }
  }

  /**
   * Update parallax layers
   */
  updateParallax() {
    this.updateLayers();
    this.ticking = false;
  }

  /**
   * Update all parallax layers
   */
  updateLayers() {
    if (!this.isActive) return;

    this.layers.forEach((config, id) => {
      this.updateLayer(config);
    });
  }

  /**
   * Update individual parallax layer
   */
  updateLayer(config) {
    const {
      element,
      speed,
      direction,
      offset,
      bounds,
      easing,
      transformOrigin
    } = config;

    if (!element) return;

    // Calculate movement based on direction and speed
    let transformX = 0;
    let transformY = 0;

    if (direction === 'vertical' || direction === 'both') {
      transformY = (this.scrollY + offset.y) * speed.y;
    }

    if (direction === 'horizontal' || direction === 'both') {
      transformX = (this.scrollX + offset.x) * speed.x;
    }

    // Apply bounds if specified
    if (bounds) {
      if (bounds.minY !== undefined) transformY = Math.max(bounds.minY, transformY);
      if (bounds.maxY !== undefined) transformY = Math.min(bounds.maxY, transformY);
      if (bounds.minX !== undefined) transformX = Math.max(bounds.minX, transformX);
      if (bounds.maxX !== undefined) transformX = Math.min(bounds.maxX, transformX);
    }

    // Apply easing if specified
    if (easing && typeof easing === 'function' && typeof window !== 'undefined') {
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
    if (config.onUpdate) {
      config.onUpdate({
        scrollY: this.scrollY,
        scrollX: this.scrollX,
        transformX,
        transformY,
        element
      });
    }
  }

  /**
   * Add a parallax layer
   */
  addLayer(config) {
    const {
      element,
      speed = { x: 0, y: 0.5 },
      direction = 'vertical',
      offset = { x: 0, y: 0 },
      bounds = null,
      easing = null,
      transformOrigin = 'center center',
      onUpdate = null
    } = config;

    if (!element) {
      console.warn('ParallaxController: Element is required');
      return null;
    }

    // Normalize speed to object format
    const normalizedSpeed = typeof speed === 'number' 
      ? { x: speed, y: speed }
      : { x: 0, y: 0.5, ...speed };

    const id = this.generateId();
    
    const layerConfig = {
      element,
      speed: normalizedSpeed,
      direction,
      offset,
      bounds,
      easing,
      transformOrigin,
      onUpdate,
      isActive: true
    };

    this.layers.set(id, layerConfig);

    // Initial update
    this.updateLayer(layerConfig);

    return id;
  }

  /**
   * Remove a parallax layer
   */
  removeLayer(id) {
    const config = this.layers.get(id);
    if (!config) return;

    // Reset element transform
    if (config.element) {
      config.element.style.transform = '';
      config.element.style.transformOrigin = '';
    }

    this.layers.delete(id);
  }

  /**
   * Update layer configuration
   */
  updateLayer(id, newConfig) {
    const config = this.layers.get(id);
    if (!config) return;

    Object.assign(config, newConfig);
  }

  /**
   * Enable/disable a specific layer
   */
  toggleLayer(id, isActive = true) {
    const config = this.layers.get(id);
    if (!config) return;

    config.isActive = isActive;
    
    if (!isActive && config.element) {
      // Reset transform when disabled
      config.element.style.transform = '';
    }
  }

  /**
   * Set parallax speed for a layer
   */
  setLayerSpeed(id, speed) {
    const config = this.layers.get(id);
    if (!config) return;

    config.speed = typeof speed === 'number' 
      ? { x: speed, y: speed }
      : { ...config.speed, ...speed };
  }

  /**
   * Set parallax bounds for a layer
   */
  setLayerBounds(id, bounds) {
    const config = this.layers.get(id);
    if (!config) return;

    config.bounds = bounds;
  }

  /**
   * Get layer configuration
   */
  getLayer(id) {
    return this.layers.get(id);
  }

  /**
   * Get all layers
   */
  getAllLayers() {
    return Array.from(this.layers.entries()).map(([id, config]) => ({
      id,
      ...config
    }));
  }

  /**
   * Pause all parallax effects
   */
  pause() {
    this.isActive = false;
  }

  /**
   * Resume all parallax effects
   */
  resume() {
    this.isActive = true;
  }

  /**
   * Set interpolation factor for smooth scrolling
   */
  setLerpFactor(factor) {
    this.lerp = Math.max(0, Math.min(1, factor));
  }

  /**
   * Set update threshold for performance optimization
   */
  setThreshold(threshold) {
    this.threshold = Math.max(0, threshold);
  }

  /**
   * Refresh all layers (useful after DOM changes)
   */
  refresh() {
    this.updateLayers();
  }

  /**
   * Generate unique ID for layers
   */
  generateId() {
    return `parallax-layer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Destroy the parallax controller
   */
  destroy() {
    // Remove all layers
    this.layers.forEach((config, id) => {
      this.removeLayer(id);
    });

    // Remove scroll listener
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll);
    }

    // Cancel animation frame
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    // Deactivate
    this.isActive = false;
  }
}

// Easing functions for parallax effects
export const ParallaxEasing = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => (--t) * t * t + 1,
  easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInSine: (t) => 1 - Math.cos(t * Math.PI / 2),
  easeOutSine: (t) => Math.sin(t * Math.PI / 2),
  easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2
};

// Create singleton instance (lazy initialization for SSR compatibility)
let parallaxControllerInstance = null;

const getParallaxController = () => {
  if (typeof window === 'undefined') {
    // Return a mock object for server-side rendering
    return {
      addLayer: () => null,
      removeLayer: () => {},
      updateLayer: () => {},
      toggleLayer: () => {},
      setLayerSpeed: () => {},
      setLayerBounds: () => {},
      getLayer: () => null,
      getAllLayers: () => [],
      pause: () => {},
      resume: () => {},
      setLerpFactor: () => {},
      setThreshold: () => {},
      refresh: () => {},
      destroy: () => {}
    };
  }
  
  if (!parallaxControllerInstance) {
    parallaxControllerInstance = new ParallaxController();
  }
  
  return parallaxControllerInstance;
};

const parallaxController = getParallaxController();

export default parallaxController;
export { ParallaxController, getParallaxController };