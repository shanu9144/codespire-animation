'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

/**
 * Advanced Scroll Animation System for Digital Engineering Page
 * Provides comprehensive scroll-triggered animations and micro-interactions
 */

// Scroll-triggered animation variants
export const scrollVariants = {
  // Fade up animation
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  
  // Fade in from left
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  
  // Fade in from right
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  
  // Scale in animation
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  
  // Stagger children animation
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  },
  
  // Stagger item
  staggerItem: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }
};

// Micro-interaction variants
export const microInteractionVariants = {
  // Button hover effects
  buttonHover: {
    scale: 1.05,
    y: -2,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  
  buttonTap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: "easeOut"
    }
  },
  
  // Card hover effects
  cardHover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  
  // Icon hover effects
  iconHover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  
  // Link hover effects
  linkHover: {
    x: 5,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

// Parallax scroll hook
export const useParallaxScroll = (speed = 0.5) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
  
  return { ref, y };
};

// Scroll progress hook
export const useScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return scrollYProgress;
};

// Intersection observer hook for scroll animations
export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
    ...options
  });
  
  return { ref, isInView };
};

// Staggered animation hook
export const useStaggeredAnimation = (delay = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };
  
  return { ref, isInView, containerVariants, itemVariants };
};

// Smooth scroll behavior
export const useSmoothScroll = () => {
  useEffect(() => {
    // Add smooth scroll behavior to the document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
};

// Scroll to element utility
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

// Scroll progress indicator component
export const ScrollProgressIndicator = () => {
  const scrollYProgress = useScrollProgress();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

// Floating animation hook
export const useFloatingAnimation = (intensity = 1) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) * intensity * 0.01,
        y: (e.clientY - window.innerHeight / 2) * intensity * 0.01
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [intensity]);
  
  return mousePosition;
};

// Pulse animation hook
export const usePulseAnimation = (duration = 2) => {
  return {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8]
    },
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
};

// Rotate animation hook
export const useRotateAnimation = (duration = 10) => {
  return {
    animate: {
      rotate: 360
    },
    transition: {
      duration,
      repeat: Infinity,
      ease: "linear"
    }
  };
};

// Bounce animation hook
export const useBounceAnimation = (duration = 2) => {
  return {
    animate: {
      y: [0, -20, 0]
    },
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
};

// Glow effect hook
export const useGlowEffect = (color = '#3B82F6') => {
  return {
    animate: {
      boxShadow: [
        `0 0 20px ${color}40`,
        `0 0 40px ${color}60`,
        `0 0 20px ${color}40`
      ]
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
};

// Text reveal animation
export const useTextReveal = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };
  
  return { ref, isInView, containerVariants, itemVariants };
};

// Morphing animation hook
export const useMorphingAnimation = () => {
  return {
    animate: {
      borderRadius: ['50%', '20%', '50%'],
      scale: [1, 1.1, 1]
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
};

// Loading animation hook
export const useLoadingAnimation = () => {
  return {
    animate: {
      rotate: 360
    },
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  };
};

// Shake animation hook
export const useShakeAnimation = () => {
  return {
    animate: {
      x: [0, -10, 10, -10, 10, 0]
    },
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  };
};

// Wiggle animation hook
export const useWiggleAnimation = () => {
  return {
    animate: {
      rotate: [0, -5, 5, -5, 5, 0]
    },
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  };
};

// Fade in animation hook
export const useFadeInAnimation = (delay = 0) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return {
    ref,
    initial: { opacity: 0, y: 30 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }
  };
};

// Slide in animation hook
export const useSlideInAnimation = (direction = 'left', delay = 0) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const getInitialX = () => {
    switch (direction) {
      case 'left': return -100;
      case 'right': return 100;
      default: return 0;
    }
  };
  
  return {
    ref,
    initial: { opacity: 0, x: getInitialX() },
    animate: isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: getInitialX() },
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }
  };
};

// Scale in animation hook
export const useScaleInAnimation = (delay = 0) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return {
    ref,
    initial: { opacity: 0, scale: 0.8 },
    animate: isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 },
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }
  };
};

export default {
  scrollVariants,
  microInteractionVariants,
  useParallaxScroll,
  useScrollProgress,
  useScrollAnimation,
  useStaggeredAnimation,
  useSmoothScroll,
  scrollToElement,
  ScrollProgressIndicator,
  useFloatingAnimation,
  usePulseAnimation,
  useRotateAnimation,
  useBounceAnimation,
  useGlowEffect,
  useTextReveal,
  useMorphingAnimation,
  useLoadingAnimation,
  useShakeAnimation,
  useWiggleAnimation,
  useFadeInAnimation,
  useSlideInAnimation,
  useScaleInAnimation
};
