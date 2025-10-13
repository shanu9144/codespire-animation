/**
 * ScrollAnimations - Common scroll-triggered animation patterns
 * Provides pre-built animation configurations for common use cases
 */

import scrollTrigger from './ScrollTrigger';

/**
 * Fade in animation on scroll
 */
export function createFadeInAnimation(element, options = {}) {
  const {
    duration = 0.6,
    delay = 0,
    start = 'bottom',
    end = 'top',
    easing = 'ease-out'
  } = options;

  // Set initial state
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = `opacity ${duration}s ${easing} ${delay}s, transform ${duration}s ${easing} ${delay}s`;

  return scrollTrigger.create({
    element,
    start,
    end,
    onEnter: () => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0px)';
    }
  });
}

/**
 * Slide in from left animation
 */
export function createSlideInLeftAnimation(element, options = {}) {
  const {
    duration = 0.8,
    delay = 0,
    distance = 100,
    start = 'bottom',
    end = 'top',
    easing = 'ease-out'
  } = options;

  // Set initial state
  element.style.opacity = '0';
  element.style.transform = `translateX(-${distance}px)`;
  element.style.transition = `opacity ${duration}s ${easing} ${delay}s, transform ${duration}s ${easing} ${delay}s`;

  return scrollTrigger.create({
    element,
    start,
    end,
    onEnter: () => {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0px)';
    }
  });
}

/**
 * Slide in from right animation
 */
export function createSlideInRightAnimation(element, options = {}) {
  const {
    duration = 0.8,
    delay = 0,
    distance = 100,
    start = 'bottom',
    end = 'top',
    easing = 'ease-out'
  } = options;

  // Set initial state
  element.style.opacity = '0';
  element.style.transform = `translateX(${distance}px)`;
  element.style.transition = `opacity ${duration}s ${easing} ${delay}s, transform ${duration}s ${easing} ${delay}s`;

  return scrollTrigger.create({
    element,
    start,
    end,
    onEnter: () => {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0px)';
    }
  });
}

/**
 * Scale in animation
 */
export function createScaleInAnimation(element, options = {}) {
  const {
    duration = 0.6,
    delay = 0,
    scale = 0.8,
    start = 'bottom',
    end = 'top',
    easing = 'ease-out'
  } = options;

  // Set initial state
  element.style.opacity = '0';
  element.style.transform = `scale(${scale})`;
  element.style.transition = `opacity ${duration}s ${easing} ${delay}s, transform ${duration}s ${easing} ${delay}s`;

  return scrollTrigger.create({
    element,
    start,
    end,
    onEnter: () => {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    }
  });
}

/**
 * Rotate in animation
 */
export function createRotateInAnimation(element, options = {}) {
  const {
    duration = 0.8,
    delay = 0,
    rotation = 180,
    start = 'bottom',
    end = 'top',
    easing = 'ease-out'
  } = options;

  // Set initial state
  element.style.opacity = '0';
  element.style.transform = `rotate(${rotation}deg) scale(0.8)`;
  element.style.transition = `opacity ${duration}s ${easing} ${delay}s, transform ${duration}s ${easing} ${delay}s`;

  return scrollTrigger.create({
    element,
    start,
    end,
    onEnter: () => {
      element.style.opacity = '1';
      element.style.transform = 'rotate(0deg) scale(1)';
    }
  });
}

/**
 * Staggered children animation
 */
export function createStaggeredAnimation(parentElement, options = {}) {
  const {
    childSelector = '> *',
    staggerDelay = 0.1,
    animationType = 'fadeIn',
    animationOptions = {}
  } = options;

  const children = parentElement.querySelectorAll(childSelector);
  const triggerIds = [];

  children.forEach((child, index) => {
    const delay = index * staggerDelay;
    const childOptions = {
      ...animationOptions,
      delay
    };

    let triggerId;
    switch (animationType) {
      case 'fadeIn':
        triggerId = createFadeInAnimation(child, childOptions);
        break;
      case 'slideInLeft':
        triggerId = createSlideInLeftAnimation(child, childOptions);
        break;
      case 'slideInRight':
        triggerId = createSlideInRightAnimation(child, childOptions);
        break;
      case 'scaleIn':
        triggerId = createScaleInAnimation(child, childOptions);
        break;
      case 'rotateIn':
        triggerId = createRotateInAnimation(child, childOptions);
        break;
      default:
        triggerId = createFadeInAnimation(child, childOptions);
    }

    if (triggerId) {
      triggerIds.push(triggerId);
    }
  });

  return triggerIds;
}

/**
 * Progress-based animation (scrub)
 */
export function createProgressAnimation(element, options = {}) {
  const {
    start = 'bottom',
    end = 'top',
    fromStyles = {},
    toStyles = {},
    onProgress = null
  } = options;

  // Store initial styles
  const initialStyles = {};
  Object.keys(toStyles).forEach(property => {
    initialStyles[property] = fromStyles[property] || getComputedStyle(element)[property];
  });

  return scrollTrigger.create({
    element,
    start,
    end,
    scrub: true,
    onUpdate: (progress) => {
      // Interpolate between initial and target styles
      Object.keys(toStyles).forEach(property => {
        const fromValue = parseFloat(initialStyles[property]) || 0;
        const toValue = parseFloat(toStyles[property]) || 0;
        const currentValue = fromValue + (toValue - fromValue) * progress;
        
        // Handle different CSS properties
        if (property.includes('transform')) {
          element.style[property] = toStyles[property].replace(/[\d.]+/, currentValue);
        } else if (property === 'opacity') {
          element.style[property] = currentValue;
        } else if (property.includes('Color')) {
          // Handle color interpolation (simplified)
          element.style[property] = toStyles[property];
        } else {
          element.style[property] = `${currentValue}px`;
        }
      });

      if (onProgress) {
        onProgress(progress);
      }
    }
  });
}

/**
 * Parallax animation
 */
export function createParallaxAnimation(element, options = {}) {
  const {
    speed = 0.5,
    direction = 'vertical',
    start = 'bottom',
    end = 'top'
  } = options;

  const initialTransform = getComputedStyle(element).transform;
  
  return scrollTrigger.create({
    element,
    start,
    end,
    scrub: true,
    onUpdate: (progress) => {
      const movement = (progress - 0.5) * 200 * speed; // -100 to 100 range
      
      let transform;
      if (direction === 'vertical') {
        transform = `translateY(${movement}px)`;
      } else if (direction === 'horizontal') {
        transform = `translateX(${movement}px)`;
      } else {
        transform = `translate(${movement}px, ${movement * 0.5}px)`;
      }
      
      // Combine with existing transform
      if (initialTransform && initialTransform !== 'none') {
        element.style.transform = `${initialTransform} ${transform}`;
      } else {
        element.style.transform = transform;
      }
    }
  });
}

/**
 * Counter animation
 */
export function createCounterAnimation(element, options = {}) {
  const {
    from = 0,
    to = 100,
    duration = 2,
    start = 'bottom',
    end = 'top',
    formatter = (value) => Math.round(value).toString()
  } = options;

  let animationId = null;
  let startTime = null;

  const animate = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / (duration * 1000), 1);
    
    // Easing function (ease-out)
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    
    const currentValue = from + (to - from) * easedProgress;
    element.textContent = formatter(currentValue);
    
    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
    }
  };

  return scrollTrigger.create({
    element,
    start,
    end,
    onEnter: () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      startTime = null;
      animationId = requestAnimationFrame(animate);
    }
  });
}

/**
 * Cleanup utility for removing multiple triggers
 */
export function cleanupTriggers(triggerIds) {
  triggerIds.forEach(id => {
    if (id) {
      scrollTrigger.remove(id);
    }
  });
}

const ScrollAnimations = {
  createFadeInAnimation,
  createSlideInLeftAnimation,
  createSlideInRightAnimation,
  createScaleInAnimation,
  createRotateInAnimation,
  createStaggeredAnimation,
  createProgressAnimation,
  createParallaxAnimation,
  createCounterAnimation,
  cleanupTriggers
};

export default ScrollAnimations;