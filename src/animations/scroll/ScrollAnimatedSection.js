"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * ScrollAnimatedSection Component
 * 
 * Animates entire sections when they come into view with configurable transitions
 */
const ScrollAnimatedSection = ({
  children,
  transitionType = 'fadeUp',
  stagger = 200,
  triggerOffset = '20%',
  childSelector = '> *',
  className = '',
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: triggerOffset 
  });

  // Animation variants based on transition type
  const getVariants = useCallback(() => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          staggerChildren: stagger / 1000,
          delayChildren: 0.1
        }
      }
    };

    const childVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    };

    switch (transitionType) {
      case 'fadeUp':
        childVariants.hidden = { opacity: 0, y: 30 };
        childVariants.visible = { opacity: 1, y: 0 };
        break;
      case 'fadeDown':
        childVariants.hidden = { opacity: 0, y: -30 };
        childVariants.visible = { opacity: 1, y: 0 };
        break;
      case 'slideUp':
        childVariants.hidden = { opacity: 0, y: 50 };
        childVariants.visible = { opacity: 1, y: 0 };
        break;
      case 'slideDown':
        childVariants.hidden = { opacity: 0, y: -50 };
        childVariants.visible = { opacity: 1, y: 0 };
        break;
      case 'slideLeft':
        childVariants.hidden = { opacity: 0, x: 50 };
        childVariants.visible = { opacity: 1, x: 0 };
        break;
      case 'slideRight':
        childVariants.hidden = { opacity: 0, x: -50 };
        childVariants.visible = { opacity: 1, x: 0 };
        break;
      case 'scale':
        childVariants.hidden = { opacity: 0, scale: 0.8 };
        childVariants.visible = { opacity: 1, scale: 1 };
        break;
      case 'rotate':
        childVariants.hidden = { opacity: 0, rotate: -10 };
        childVariants.visible = { opacity: 1, rotate: 0 };
        break;
      case 'liquid':
        childVariants.hidden = { opacity: 0, scale: 0.8, y: 20 };
        childVariants.visible = { opacity: 1, scale: 1, y: 0 };
        break;
      default:
        // Default to fadeUp
        childVariants.hidden = { opacity: 0, y: 30 };
        childVariants.visible = { opacity: 1, y: 0 };
    }

    return { baseVariants, childVariants };
  }, [transitionType, stagger]);

  const { baseVariants, childVariants } = getVariants();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={baseVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return (
            <motion.div
              key={index}
              variants={childVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </motion.div>
  );
};

export default ScrollAnimatedSection;

