'use client';

import React from 'react';

/**
 * Wrapper Component
 * 
 * A reusable wrapper component that provides consistent spacing and alignment
 * across the application. Prevents content from spilling outside and ensures
 * responsive design for mobile, tablet, and desktop.
 */
const Wrapper = ({
  children,
  className = '',
  maxWidth = 'lg',
  padding = true,
  center = true,
  style,
  ...props
}) => {
  // Base wrapper classes
  const baseClasses = 'wrapper';
  
  // Max width classes
  const maxWidthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    '2xl': 'max-w-8xl',
    full: 'max-w-none',
  };
  
  // Center classes
  const centerClasses = center ? 'mx-auto' : '';
  
  // Padding classes
  const paddingClasses = padding ? 'px-6 sm:px-8 lg:px-12' : '';
  
  // Combine all classes
  const combinedClassName = [
    baseClasses,
    maxWidthClasses[maxWidth],
    centerClasses,
    paddingClasses,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={combinedClassName}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default Wrapper;

