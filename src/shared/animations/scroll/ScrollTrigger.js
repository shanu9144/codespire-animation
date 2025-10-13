/**
 * ScrollTrigger - Advanced scroll detection using Intersection Observer API
 * Provides efficient scroll-based animation triggers with configurable zones
 */

class ScrollTrigger {
  constructor() {
    this.triggers = new Map();
    this.observers = new Map();
    this.scrollY = 0;
    this.isScrolling = false;
    this.scrollTimeout = null;
    
    // Bind methods
    this.handleScroll = this.handleScroll.bind(this);
    this.handleScrollEnd = this.handleScrollEnd.bind(this);
    
    // Initialize scroll listener for scrub animations
    this.initScrollListener();
  }

  /**
   * Initialize scroll listener for scrub animations
   */
  initScrollListener() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll, { passive: true });
    }
  }

  /**
   * Handle scroll events for scrub animations
   */
  handleScroll() {
    if (typeof window === 'undefined') return;
    
    this.scrollY = window.scrollY;
    this.isScrolling = true;
    
    // Clear existing timeout
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    
    // Update scrub animations
    this.updateScrubAnimations();
    
    // Set timeout for scroll end
    this.scrollTimeout = setTimeout(this.handleScrollEnd, 150);
  }

  /**
   * Handle scroll end event
   */
  handleScrollEnd() {
    this.isScrolling = false;
  }

  /**
   * Update scrub animations based on scroll position
   */
  updateScrubAnimations() {
    this.triggers.forEach((config) => {
      if (config.scrub && config.element) {
        const progress = this.calculateScrollProgress(config);
        if (config.onUpdate) {
          config.onUpdate(progress);
        }
      }
    });
  }

  /**
   * Calculate scroll progress for an element
   */
  calculateScrollProgress(config) {
    if (typeof window === 'undefined') return 0;
    
    const element = config.element;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate start and end positions
    let start, end;
    
    if (typeof config.start === 'string') {
      if (config.start.includes('%')) {
        const percentage = parseFloat(config.start) / 100;
        start = windowHeight * percentage;
      } else if (config.start === 'top') {
        start = 0;
      } else if (config.start === 'center') {
        start = windowHeight / 2;
      } else if (config.start === 'bottom') {
        start = windowHeight;
      }
    } else {
      start = config.start;
    }
    
    if (typeof config.end === 'string') {
      if (config.end.includes('%')) {
        const percentage = parseFloat(config.end) / 100;
        end = windowHeight * percentage;
      } else if (config.end === 'top') {
        end = 0;
      } else if (config.end === 'center') {
        end = windowHeight / 2;
      } else if (config.end === 'bottom') {
        end = windowHeight;
      }
    } else {
      end = config.end;
    }
    
    // Calculate progress based on element position
    const elementTop = rect.top;
    const elementBottom = rect.bottom;
    
    let progress = 0;
    
    if (elementTop <= start && elementBottom >= end) {
      // Element spans the entire trigger zone
      progress = Math.max(0, Math.min(1, (start - elementTop) / (start - end)));
    } else if (elementTop <= start) {
      // Element is entering from top
      progress = Math.max(0, Math.min(1, (start - elementTop) / element.offsetHeight));
    } else if (elementBottom >= end) {
      // Element is entering from bottom
      progress = Math.max(0, Math.min(1, (elementBottom - end) / element.offsetHeight));
    }
    
    return progress;
  }

  /**
   * Create a scroll trigger for an element
   */
  create(config) {
    const {
      element,
      start = 'bottom',
      end = 'top',
      scrub = false,
      pin = false,
      onEnter = null,
      onLeave = null,
      onUpdate = null,
      threshold = 0.1,
      rootMargin = '0px'
    } = config;

    if (!element) {
      console.warn('ScrollTrigger: Element is required');
      return null;
    }

    const id = this.generateId();
    
    // Store trigger configuration
    const triggerConfig = {
      element,
      start,
      end,
      scrub,
      pin,
      onEnter,
      onLeave,
      onUpdate,
      threshold,
      rootMargin,
      isActive: false,
      hasEntered: false
    };
    
    this.triggers.set(id, triggerConfig);

    // Create Intersection Observer for enter/leave detection
    if (onEnter || onLeave) {
      const observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries, id),
        {
          threshold,
          rootMargin
        }
      );
      
      observer.observe(element);
      this.observers.set(id, observer);
    }

    // Handle pinning
    if (pin) {
      this.setupPinning(id, triggerConfig);
    }

    return id;
  }

  /**
   * Handle intersection observer entries
   */
  handleIntersection(entries, triggerId) {
    const config = this.triggers.get(triggerId);
    if (!config) return;

    entries.forEach(entry => {
      const isIntersecting = entry.isIntersecting;
      
      if (isIntersecting && !config.hasEntered) {
        // Element is entering
        config.isActive = true;
        config.hasEntered = true;
        
        if (config.onEnter) {
          config.onEnter(entry);
        }
      } else if (!isIntersecting && config.hasEntered) {
        // Element is leaving
        config.isActive = false;
        
        if (config.onLeave) {
          config.onLeave(entry);
        }
      }
    });
  }

  /**
   * Setup element pinning
   */
  setupPinning(id, config) {
    const element = config.element;
    const originalPosition = getComputedStyle(element).position;
    const originalTop = getComputedStyle(element).top;
    
    // Store original styles
    config.originalStyles = {
      position: originalPosition,
      top: originalTop
    };
    
    // Add pin logic to scroll handler
    const originalUpdate = config.onUpdate;
    config.onUpdate = (progress) => {
      if (progress > 0 && progress < 1) {
        // Pin the element
        element.style.position = 'fixed';
        element.style.top = '0px';
      } else {
        // Unpin the element
        element.style.position = config.originalStyles.position;
        element.style.top = config.originalStyles.top;
      }
      
      if (originalUpdate) {
        originalUpdate(progress);
      }
    };
  }

  /**
   * Remove a scroll trigger
   */
  remove(id) {
    const config = this.triggers.get(id);
    if (!config) return;

    // Clean up observer
    const observer = this.observers.get(id);
    if (observer) {
      observer.disconnect();
      this.observers.delete(id);
    }

    // Restore original styles if pinned
    if (config.pin && config.originalStyles) {
      const element = config.element;
      element.style.position = config.originalStyles.position;
      element.style.top = config.originalStyles.top;
    }

    // Remove from maps
    this.triggers.delete(id);
  }

  /**
   * Remove all scroll triggers
   */
  removeAll() {
    this.triggers.forEach((_, id) => this.remove(id));
  }

  /**
   * Generate unique ID for triggers
   */
  generateId() {
    return `scroll-trigger-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get trigger by ID
   */
  getTrigger(id) {
    return this.triggers.get(id);
  }

  /**
   * Update trigger configuration
   */
  updateTrigger(id, newConfig) {
    const config = this.triggers.get(id);
    if (!config) return;

    // Update configuration
    Object.assign(config, newConfig);
  }

  /**
   * Refresh all triggers (useful after DOM changes)
   */
  refresh() {
    // Force recalculation on next scroll
    this.handleScroll();
  }

  /**
   * Destroy the ScrollTrigger instance
   */
  destroy() {
    // Remove all triggers
    this.removeAll();
    
    // Remove scroll listener
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll);
    }
    
    // Clear timeout
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }
}

// Create singleton instance (lazy initialization for SSR compatibility)
let scrollTriggerInstance = null;

const getScrollTrigger = () => {
  if (typeof window === 'undefined') {
    // Return a mock object for server-side rendering
    return {
      create: () => null,
      remove: () => {},
      removeAll: () => {},
      getTrigger: () => null,
      updateTrigger: () => {},
      refresh: () => {},
      destroy: () => {}
    };
  }
  
  if (!scrollTriggerInstance) {
    scrollTriggerInstance = new ScrollTrigger();
  }
  
  return scrollTriggerInstance;
};

const scrollTrigger = getScrollTrigger();

export default scrollTrigger;
export { ScrollTrigger, getScrollTrigger };