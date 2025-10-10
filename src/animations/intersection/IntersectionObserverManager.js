/**
 * IntersectionObserverManager - High-performance intersection observer system
 * Optimizes scroll-based animations by only running when elements are visible
 */

class IntersectionObserverManager {
  constructor() {
    this.observers = new Map();
    this.elements = new Map();
    this.callbacks = new Map();
    this.isInitialized = false;
    
    // Performance settings
    this.defaultOptions = {
      root: null,
      rootMargin: '50px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1.0]
    };
    
    // Throttle settings
    this.throttleDelay = 16; // ~60fps
    this.lastUpdate = 0;
    
    this.init();
  }

  /**
   * Initialize the intersection observer manager
   */
  init() {
    if (typeof window === 'undefined' || this.isInitialized) return;
    
    this.isInitialized = true;
    this.setupGlobalScrollListener();
  }

  /**
   * Create or get an intersection observer with specific options
   */
  createObserver(options = {}) {
    const observerId = this.generateObserverId(options);
    
    if (this.observers.has(observerId)) {
      return this.observers.get(observerId);
    }

    const observerOptions = {
      ...this.defaultOptions,
      ...options
    };

    const observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      observerOptions
    );

    this.observers.set(observerId, observer);
    return observer;
  }

  /**
   * Observe an element with intersection observer
   */
  observe(element, callback, options = {}) {
    if (!element || typeof callback !== 'function') {
      console.warn('IntersectionObserverManager: Invalid element or callback');
      return null;
    }

    const observer = this.createObserver(options);
    const elementId = this.generateElementId(element);
    
    // Store element and callback
    this.elements.set(elementId, {
      element,
      observer,
      callback,
      options,
      isVisible: false,
      lastThreshold: 0
    });

    // Store callback for this observer
    if (!this.callbacks.has(observer)) {
      this.callbacks.set(observer, new Map());
    }
    this.callbacks.get(observer).set(element, callback);

    observer.observe(element);
    return elementId;
  }

  /**
   * Stop observing an element
   */
  unobserve(elementId) {
    const elementData = this.elements.get(elementId);
    if (!elementData) return;

    const { element, observer } = elementData;
    
    observer.unobserve(element);
    this.elements.delete(elementId);
    
    // Clean up callback
    const observerCallbacks = this.callbacks.get(observer);
    if (observerCallbacks) {
      observerCallbacks.delete(element);
      
      // If no more elements for this observer, clean it up
      if (observerCallbacks.size === 0) {
        observer.disconnect();
        this.observers.delete(this.getObserverId(observer));
        this.callbacks.delete(observer);
      }
    }
  }

  /**
   * Handle intersection changes
   */
  handleIntersection(entries) {
    const now = performance.now();
    
    // Throttle updates for performance
    if (now - this.lastUpdate < this.throttleDelay) {
      requestAnimationFrame(() => this.processIntersections(entries));
      return;
    }
    
    this.lastUpdate = now;
    this.processIntersections(entries);
  }

  /**
   * Process intersection entries
   */
  processIntersections(entries) {
    entries.forEach(entry => {
      const element = entry.target;
      const observer = this.getObserverForElement(element);
      
      if (!observer) return;

      const callbacks = this.callbacks.get(observer);
      const callback = callbacks?.get(element);
      
      if (!callback) return;

      const elementId = this.generateElementId(element);
      const elementData = this.elements.get(elementId);
      
      if (!elementData) return;

      // Update element data
      elementData.isVisible = entry.isIntersecting;
      elementData.lastThreshold = entry.intersectionRatio;

      // Create enhanced entry data
      const enhancedEntry = {
        ...entry,
        elementId,
        scrollProgress: this.calculateScrollProgress(entry),
        visibilityRatio: entry.intersectionRatio,
        isFullyVisible: entry.intersectionRatio === 1,
        isPartiallyVisible: entry.intersectionRatio > 0 && entry.intersectionRatio < 1,
        direction: this.getScrollDirection(entry),
        distanceFromViewport: this.getDistanceFromViewport(entry)
      };

      // Call the callback with enhanced data
      callback(enhancedEntry);
    });
  }

  /**
   * Calculate scroll progress for an element
   */
  calculateScrollProgress(entry) {
    const { boundingClientRect, rootBounds } = entry;
    if (!rootBounds) return 0;

    const elementTop = boundingClientRect.top;
    const elementHeight = boundingClientRect.height;
    const viewportHeight = rootBounds.height;

    // Calculate how much of the element has scrolled through the viewport
    const scrolled = Math.max(0, viewportHeight - elementTop);
    const total = viewportHeight + elementHeight;
    
    return Math.max(0, Math.min(1, scrolled / total));
  }

  /**
   * Get scroll direction based on intersection
   */
  getScrollDirection(entry) {
    const { boundingClientRect, rootBounds } = entry;
    if (!rootBounds) return 'none';

    const elementTop = boundingClientRect.top;
    const viewportHeight = rootBounds.height;

    if (elementTop > viewportHeight) return 'down';
    if (elementTop < -boundingClientRect.height) return 'up';
    return 'visible';
  }

  /**
   * Get distance from viewport center
   */
  getDistanceFromViewport(entry) {
    const { boundingClientRect, rootBounds } = entry;
    if (!rootBounds) return Infinity;

    const elementCenter = boundingClientRect.top + boundingClientRect.height / 2;
    const viewportCenter = rootBounds.height / 2;
    
    return Math.abs(elementCenter - viewportCenter);
  }

  /**
   * Setup global scroll listener for additional optimizations
   */
  setupGlobalScrollListener() {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollBasedAnimations();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /**
   * Update scroll-based animations only for visible elements
   */
  updateScrollBasedAnimations() {
    this.elements.forEach((elementData) => {
      if (!elementData.isVisible) return;
      
      // Only update animations for visible elements
      const scrollY = window.scrollY;
      const element = elementData.element;
      
      // Trigger scroll-based updates if callback supports it
      if (elementData.callback && typeof elementData.callback === 'function') {
        const mockEntry = {
          target: element,
          isIntersecting: true,
          intersectionRatio: elementData.lastThreshold,
          boundingClientRect: element.getBoundingClientRect(),
          rootBounds: {
            height: window.innerHeight,
            width: window.innerWidth
          }
        };
        
        // Only call if element is actually visible
        if (elementData.isVisible) {
          elementData.callback(mockEntry);
        }
      }
    });
  }

  /**
   * Get observer for a specific element
   */
  getObserverForElement(element) {
    for (const [observer, callbacks] of this.callbacks) {
      if (callbacks.has(element)) {
        return observer;
      }
    }
    return null;
  }

  /**
   * Generate unique observer ID
   */
  generateObserverId(options) {
    return JSON.stringify(options);
  }

  /**
   * Generate unique element ID
   */
  generateElementId(element) {
    return `${element.tagName}-${element.className}-${element.offsetTop}-${element.offsetLeft}`;
  }

  /**
   * Get observer ID from observer instance
   */
  getObserverId(observer) {
    for (const [id, obs] of this.observers) {
      if (obs === observer) return id;
    }
    return null;
  }

  /**
   * Get all visible elements
   */
  getVisibleElements() {
    const visible = [];
    this.elements.forEach((elementData, elementId) => {
      if (elementData.isVisible) {
        visible.push({
          elementId,
          element: elementData.element,
          threshold: elementData.lastThreshold
        });
      }
    });
    return visible;
  }

  /**
   * Get performance statistics
   */
  getStats() {
    return {
      totalObservers: this.observers.size,
      totalElements: this.elements.size,
      visibleElements: this.getVisibleElements().length,
      isInitialized: this.isInitialized
    };
  }

  /**
   * Clean up all observers
   */
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.elements.clear();
    this.callbacks.clear();
    this.isInitialized = false;
  }
}

// Create singleton instance
const intersectionObserverManager = new IntersectionObserverManager();

export default intersectionObserverManager;
export { IntersectionObserverManager };
