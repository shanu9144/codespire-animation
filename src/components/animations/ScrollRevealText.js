/**
 * ScrollRevealText - Text component with scroll-triggered reveal animations
 * Supports word-by-word and character-by-character animations
 */

'use client';

import React, { forwardRef, useMemo } from 'react';
import { useStaggeredChildren } from '../../animations/scroll';

const ScrollRevealText = forwardRef(({
  children,
  className = '',
  animationType = 'fadeUp',
  revealBy = 'word', // 'word' or 'character'
  staggerDelay = 50,
  duration = 600,
  easing = 'ease-out',
  triggerOffset = '20%',
  preserveSpaces = true,
  ...props
}, ref) => {
  // Split text into words or characters
  const textElements = useMemo(() => {
    if (typeof children !== 'string') {
      return [children];
    }

    if (revealBy === 'character') {
      return children.split('').map((char, index) => (
        <span key={index} className="reveal-char" style={{ display: 'inline-block' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    } else {
      // Split by words
      return children.split(' ').map((word, index) => (
        <span key={index} className="reveal-word" style={{ display: 'inline-block' }}>
          {word}
          {index < children.split(' ').length - 1 && preserveSpaces && '\u00A0'}
        </span>
      ));
    }
  }, [children, revealBy, preserveSpaces]);

  const { ref: textRef } = useStaggeredChildren({
    animationType,
    staggerDelay,
    duration,
    easing,
    triggerOffset,
    childSelector: revealBy === 'character' ? '.reveal-char' : '.reveal-word'
  });

  // Combine refs
  const combinedRef = (node) => {
    textRef.current = node;
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  };

  return (
    <span
      ref={combinedRef}
      className={`scroll-reveal-text ${className}`}
      {...props}
    >
      {textElements}
    </span>
  );
});

ScrollRevealText.displayName = 'ScrollRevealText';

export default ScrollRevealText;