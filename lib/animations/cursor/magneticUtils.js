/**
 * Utility functions for magnetic cursor effects
 * 
 * Provides helper functions for calculating magnetic fields,
 * managing magnetic elements, and creating attraction effects.
 */

/**
 * Calculate magnetic force between cursor and element
 */
export const calculateMagneticForce = (
  mouseX,
  mouseY,
  elementX,
  elementY,
  strength = 0.3,
  radius = 100
) => {
  const deltaX = elementX - mouseX;
  const deltaY = elementY - mouseY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
  if (distance > radius) {
    return { x: 0, y: 0, distance, inField: false };
  }
  
  // Normalize distance (0 = at center, 1 = at edge)
  const normalizedDistance = distance / radius;
  
  // Calculate force strength (stronger when closer)
  const forceStrength = (1 - normalizedDistance) * strength;
  
  // Normalize direction
  const directionLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  if (directionLength === 0) {
    return { x: 0, y: 0, distance, inField: true };
  }
  
  const normalizedDeltaX = deltaX / directionLength;
  const normalizedDeltaY = deltaY / directionLength;
  
  return {
    x: normalizedDeltaX * forceStrength * radius * 0.3,
    y: normalizedDeltaY * forceStrength * radius * 0.3,
    distance,
    inField: true,
    strength: forceStrength
  };
};

/**
 * Get element bounds and center position
 */
export const getElementMagneticData = (element) => {
  const bounds = element.getBoundingClientRect();
  const strength = parseFloat(element.dataset.magneticStrength) || 0.3;
  const radius = parseFloat(element.dataset.magneticRadius) || 100;
  
  return {
    element,
    bounds,
    strength,
    radius,
    centerX: bounds.left + bounds.width / 2,
    centerY: bounds.top + bounds.height / 2,
    width: bounds.width,
    height: bounds.height
  };
};

/**
 * Add magnetic properties to an element
 */
export const makeMagnetic = (element, options = {}) => {
  const {
    strength = 0.3,
    radius = 100,
    ease = 0.15,
    className = 'magnetic-element'
  } = options;
  
  element.setAttribute('data-magnetic', 'true');
  element.setAttribute('data-magnetic-strength', strength.toString());
  element.setAttribute('data-magnetic-radius', radius.toString());
  element.classList.add(className);
  
  return element;
};

/**
 * Remove magnetic properties from an element
 */
export const removeMagnetic = (element) => {
  element.removeAttribute('data-magnetic');
  element.removeAttribute('data-magnetic-strength');
  element.removeAttribute('data-magnetic-radius');
  element.classList.remove('magnetic-element');
  
  return element;
};

/**
 * Find all magnetic elements in the document
 */
export const findMagneticElements = () => {
  const elements = document.querySelectorAll('[data-magnetic]');
  return Array.from(elements).map(getElementMagneticData);
};

/**
 * Calculate combined magnetic force from multiple elements
 */
export const calculateCombinedMagneticForce = (mouseX, mouseY, magneticElements) => {
  let totalForceX = 0;
  let totalForceY = 0;
  let closestElement = null;
  let closestDistance = Infinity;
  let activeElements = [];
  
  magneticElements.forEach((elementData) => {
    const { centerX, centerY, strength, radius, element } = elementData;
    const force = calculateMagneticForce(mouseX, mouseY, centerX, centerY, strength, radius);
    
    if (force.inField) {
      totalForceX += force.x;
      totalForceY += force.y;
      activeElements.push({
        element,
        force,
        distance: force.distance
      });
      
      if (force.distance < closestDistance) {
        closestDistance = force.distance;
        closestElement = element;
      }
    }
  });
  
  return {
    forceX: totalForceX,
    forceY: totalForceY,
    closestElement,
    closestDistance,
    activeElements
  };
};

/**
 * Smooth interpolation for cursor movement
 */
export const lerp = (start, end, factor) => {
  return start + (end - start) * factor;
};

/**
 * Clamp value between min and max
 */
export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Map value from one range to another
 */
export const mapRange = (value, inMin, inMax, outMin, outMax) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

/**
 * Easing functions for smooth animations
 */
export const easing = {
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeOutElastic: (t) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  }
};

/**
 * Debounce function for performance optimization
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for performance optimization
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Check if element is in viewport
 */
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Get cursor state based on element type
 */
export const getCursorStateForElement = (element) => {
  if (element.tagName === 'BUTTON' || element.type === 'button' || element.classList.contains('btn')) {
    return 'magnetic-button';
  } else if (element.tagName === 'A') {
    return 'magnetic-link';
  } else if (element.classList.contains('card')) {
    return 'magnetic-card';
  } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    return 'magnetic-text';
  } else {
    return 'magnetic';
  }
};

export default {
  calculateMagneticForce,
  getElementMagneticData,
  makeMagnetic,
  removeMagnetic,
  findMagneticElements,
  calculateCombinedMagneticForce,
  lerp,
  clamp,
  mapRange,
  easing,
  debounce,
  throttle,
  isInViewport,
  getCursorStateForElement
};