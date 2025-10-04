"use client";

import React from 'react';

/**
 * Wrapper Component
 * 
 * A reusable wrapper component that provides consistent spacing and alignment
 * across the application. Prevents content from spilling outside and ensures
 * responsive design for mobile, tablet, and desktop.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to wrap
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.variant - Wrapper variant ('default', 'narrow', 'wide', 'full')
 * @param {boolean} props.padding - Whether to include default padding
 * @param {Object} props.style - Inline styles
 * @param {string} props.as - HTML element to render as
 */
const Wrapper = ({
  children,
  className = '',
  variant = 'default',
  padding = true,
  style = {},
  as: Component = 'div',
  ...props
}) => {
  // Base wrapper classes
  const baseClasses = 'wrapper';
  
  // Variant-specific classes
  const variantClasses = {
    default: '',
    narrow: 'max-w-4xl',
    wide: 'max-w-6xl',
    full: 'max-w-none'
  };
  
  // Padding classes
  const paddingClasses = padding ? '' : '!p-0';
  
  // Combine all classes
  const combinedClassName = [
    baseClasses,
    variantClasses[variant],
    paddingClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component
      className={combinedClassName}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Wrapper;
