"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * ScrollRevealText Component
 * 
 * Reveals text character by character or word by word with scroll trigger
 */
const ScrollRevealText = ({
  children,
  revealBy = 'word',
  staggerDelay = 100,
  animationType = 'fadeUp',
  className = '',
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '20%' });
  const [text, setText] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);

  // Parse text content
  useEffect(() => {
    if (typeof children === 'string') {
      setText(children);
    } else if (React.isValidElement(children) && children.props.children) {
      setText(children.props.children);
    }
  }, [children]);

  // Trigger reveal animation
  useEffect(() => {
    if (isInView && !isRevealed) {
      setIsRevealed(true);
    }
  }, [isInView, isRevealed]);

  // Split text based on reveal type
  const splitText = () => {
    if (revealBy === 'character') {
      return text.split('').map((char, index) => ({
        char,
        index,
        isSpace: char === ' '
      }));
    } else {
      return text.split(' ').map((word, index) => ({
        word,
        index
      }));
    }
  };

  const textElements = splitText();

  // Animation variants
  const getVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay / 1000,
          delayChildren: 0.1
        }
      }
    };

    const childVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    };

    switch (animationType) {
      case 'fadeUp':
        childVariants.hidden = { opacity: 0, y: 20 };
        childVariants.visible = { opacity: 1, y: 0 };
        break;
      case 'fadeDown':
        childVariants.hidden = { opacity: 0, y: -20 };
        childVariants.visible = { opacity: 1, y: 0 };
        break;
      case 'slideLeft':
        childVariants.hidden = { opacity: 0, x: 20 };
        childVariants.visible = { opacity: 1, x: 0 };
        break;
      case 'slideRight':
        childVariants.hidden = { opacity: 0, x: -20 };
        childVariants.visible = { opacity: 1, x: 0 };
        break;
      case 'scale':
        childVariants.hidden = { opacity: 0, scale: 0.8 };
        childVariants.visible = { opacity: 1, scale: 1 };
        break;
      default:
        childVariants.hidden = { opacity: 0, y: 20 };
        childVariants.visible = { opacity: 1, y: 0 };
    }

    return { baseVariants, childVariants };
  };

  const { baseVariants, childVariants } = getVariants();

  if (typeof children !== 'string' && !React.isValidElement(children)) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={baseVariants}
      initial="hidden"
      animate={isRevealed ? "visible" : "hidden"}
      {...props}
    >
      {revealBy === 'character' ? (
        textElements.map(({ char, index, isSpace }) => (
          <motion.span
            key={index}
            variants={childVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ display: isSpace ? 'inline' : 'inline-block' }}
          >
            {char}
          </motion.span>
        ))
      ) : (
        textElements.map(({ word, index }) => (
          <motion.span
            key={index}
            variants={childVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        ))
      )}
    </motion.span>
  );
};

export default ScrollRevealText;

