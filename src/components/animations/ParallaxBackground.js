/**
 * ParallaxBackground - A background component with parallax scrolling
 * Supports images, gradients, and custom content with parallax effects
 */

'use client';

import React, { forwardRef } from 'react';
import { useParallax } from '../../animations/scroll';

const ParallaxBackground = forwardRef(({
  children,
  className = '',
  speed = 0.5,
  direction = 'vertical',
  backgroundImage = null,
  backgroundGradient = null,
  backgroundColor = null,
  backgroundSize = 'cover',
  backgroundPosition = 'center',
  backgroundRepeat = 'no-repeat',
  overlay = null,
  overlayOpacity = 0.5,
  height = '100vh',
  zIndex = -1,
  bounds = null,
  ...props
}, ref) => {
  const { ref: parallaxRef } = useParallax({
    speed: typeof speed === 'number' ? 
      (direction === 'vertical' ? { y: speed } : { x: speed }) : speed,
    direction,
    bounds
  });

  // Combine refs
  const combinedRef = (node) => {
    parallaxRef.current = node;
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  };

  const backgroundStyles = {
    position: 'relative',
    height,
    overflow: 'hidden',
    zIndex
  };

  const parallaxContentStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    willChange: 'transform'
  };

  const backgroundLayerStyles = {
    position: 'absolute',
    top: '-20%', // Extra space for parallax movement
    left: '-20%',
    right: '-20%',
    bottom: '-20%',
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : backgroundGradient,
    backgroundColor,
    backgroundSize,
    backgroundPosition,
    backgroundRepeat,
    willChange: 'transform'
  };

  const overlayStyles = overlay ? {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: overlay,
    opacity: overlayOpacity,
    zIndex: 1
  } : {};

  const contentStyles = {
    position: 'relative',
    zIndex: 2,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div
      className={`parallax-background ${className}`}
      style={backgroundStyles}
      {...props}
    >
      <div
        ref={combinedRef}
        className="parallax-content"
        style={parallaxContentStyles}
      >
        <div
          className="background-layer"
          style={backgroundLayerStyles}
        />
        {overlay && (
          <div
            className="background-overlay"
            style={overlayStyles}
          />
        )}
      </div>
      {children && (
        <div className="content-layer" style={contentStyles}>
          {children}
        </div>
      )}
    </div>
  );
});

ParallaxBackground.displayName = 'ParallaxBackground';

export default ParallaxBackground;