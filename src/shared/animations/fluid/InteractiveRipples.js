"use client";

import React, { useRef, useCallback } from 'react';
import RippleEffect, { withRippleEffect, useRippleEffect } from './RippleEffect';

/**
 * InteractiveRipples Components
 * 
 * Specialized ripple components for different UI elements
 * Features:
 * - Button-specific ripple effects
 * - Card hover ripples
 * - Form field focus ripples
 * - Customizable ripple behaviors
 */

// Button with ripple effect
export const RippleButton = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'medium',
  rippleColor,
  className = '',
  onClick,
  ...props
}, ref) => {
  const buttonRef = useRef(null);
  
  // Default ripple colors based on button variant
  const defaultRippleColors = {
    primary: '#ffffff',
    secondary: '#384bff',
    outline: '#384bff',
    ghost: '#384bff'
  };

  const handleClick = useCallback((event) => {
    // Call original onClick if provided
    if (onClick) {
      onClick(event);
    }
  }, [onClick]);

  return (
    <RippleEffect
      ref={buttonRef}
      className={`ripple-button ripple-button--${variant} ripple-button--${size} ${className}`}
      rippleColor={rippleColor || defaultRippleColors[variant]}
      rippleOpacity={0.3}
      rippleDuration={600}
      onClick={handleClick}
      {...props}
    >
      <button
        ref={ref}
        className="ripple-button__inner"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          outline: 'none'
        }}
      >
        {children}
      </button>
    </RippleEffect>
  );
});

RippleButton.displayName = 'RippleButton';

// Card with hover ripple effect
export const RippleCard = React.forwardRef(({
  children,
  className = '',
  onHover,
  onClick,
  ...props
}, ref) => {
  const cardRef = useRef(null);

  const handleMouseEnter = useCallback((event) => {
    if (onHover) {
      onHover(event);
    }
  }, [onHover]);

  const handleClick = useCallback((event) => {
    if (onClick) {
      onClick(event);
    }
  }, [onClick]);

  return (
    <RippleEffect
      ref={cardRef}
      className={`ripple-card ${className}`}
      rippleColor="#384bff"
      rippleOpacity={0.1}
      rippleDuration={1000}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      {...props}
    >
      <div
        ref={ref}
        className="ripple-card__inner"
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        {children}
      </div>
    </RippleEffect>
  );
});

RippleCard.displayName = 'RippleCard';

// Form field with focus ripple
export const RippleInput = React.forwardRef(({
  className = '',
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const inputRef = useRef(null);
  const { createRipple } = useRippleEffect(inputRef, {
    color: '#384bff',
    opacity: 0.2,
    duration: 400
  });

  const handleFocus = useCallback((event) => {
    const rect = event.target.getBoundingClientRect();
    createRipple(rect.left + rect.width / 2, rect.top + rect.height / 2, {
      type: 'pulse',
      maxRadius: Math.max(rect.width, rect.height) * 0.6
    });
    
    if (onFocus) {
      onFocus(event);
    }
  }, [createRipple, onFocus]);

  const handleBlur = useCallback((event) => {
    if (onBlur) {
      onBlur(event);
    }
  }, [onBlur]);

  return (
    <div
      ref={inputRef}
      className={`ripple-input ${className}`}
      style={{ position: 'relative' }}
    >
      <input
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          width: '100%',
          position: 'relative',
          zIndex: 2
        }}
        {...props}
      />
    </div>
  );
});

RippleInput.displayName = 'RippleInput';

// Navigation item with ripple
export const RippleNavItem = React.forwardRef(({
  children,
  href,
  className = '',
  onClick,
  ...props
}, ref) => {
  const navRef = useRef(null);

  const handleClick = useCallback((event) => {
    if (onClick) {
      onClick(event);
    }
  }, [onClick]);

  return (
    <RippleEffect
      ref={navRef}
      className={`ripple-nav-item ${className}`}
      rippleColor="#384bff"
      rippleOpacity={0.15}
      rippleDuration={500}
      onClick={handleClick}
      {...props}
    >
      {href ? (
        <a
          ref={ref}
          href={href}
          className="ripple-nav-item__link"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            textDecoration: 'none'
          }}
        >
          {children}
        </a>
      ) : (
        <div
          ref={ref}
          className="ripple-nav-item__content"
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          {children}
        </div>
      )}
    </RippleEffect>
  );
});

RippleNavItem.displayName = 'RippleNavItem';

// Floating action button with enhanced ripple
export const RippleFAB = React.forwardRef(({
  children,
  size = 'medium',
  className = '',
  onClick,
  ...props
}, ref) => {
  const fabRef = useRef(null);

  const sizeStyles = {
    small: { width: '40px', height: '40px' },
    medium: { width: '56px', height: '56px' },
    large: { width: '72px', height: '72px' }
  };

  const handleClick = useCallback((event) => {
    if (onClick) {
      onClick(event);
    }
  }, [onClick]);

  return (
    <RippleEffect
      ref={fabRef}
      className={`ripple-fab ripple-fab--${size} ${className}`}
      rippleColor="#ffffff"
      rippleOpacity={0.4}
      rippleDuration={800}
      onClick={handleClick}
      style={{
        borderRadius: '50%',
        ...sizeStyles[size],
        ...props.style
      }}
      {...props}
    >
      <button
        ref={ref}
        className="ripple-fab__button"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          background: 'transparent',
          borderRadius: '50%',
          cursor: 'pointer',
          outline: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {children}
      </button>
    </RippleEffect>
  );
});

RippleFAB.displayName = 'RippleFAB';

// Custom ripple trigger component
export const RippleTrigger = ({
  children,
  triggerOn = ['click'],
  rippleConfig = {},
  className = '',
  ...props
}) => {
  const triggerRef = useRef(null);
  const { createRipple } = useRippleEffect(triggerRef, rippleConfig);

  const createEventHandler = useCallback((eventType) => {
    return (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX || rect.left + rect.width / 2;
      const y = event.clientY || rect.top + rect.height / 2;
      
      createRipple(x, y, {
        type: eventType === 'click' ? 'click' : 'hover'
      });
      
      // Call original event handler if provided
      const originalHandler = props[`on${eventType.charAt(0).toUpperCase() + eventType.slice(1)}`];
      if (originalHandler) {
        originalHandler(event);
      }
    };
  }, [createRipple]);

  const eventHandlers = {};
  triggerOn.forEach(eventType => {
    const handlerName = `on${eventType.charAt(0).toUpperCase() + eventType.slice(1)}`;
    eventHandlers[handlerName] = createEventHandler(eventType);
  });

  return (
    <div
      ref={triggerRef}
      className={`ripple-trigger ${className}`}
      style={{ position: 'relative' }}
      {...eventHandlers}
      {...props}
    >
      {children}
    </div>
  );
};

// Export all components
export default {
  RippleButton,
  RippleCard,
  RippleInput,
  RippleNavItem,
  RippleFAB,
  RippleTrigger
};