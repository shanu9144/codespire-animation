import { forwardRef } from 'react';

// Heading component
export const Heading = forwardRef(({ 
  level = 1, 
  size, 
  className = '', 
  children, 
  ...props 
}, ref) => {
  const Tag = `h${level}`;
  
  // Auto-size based on heading level if size not specified
  const autoSize = {
    1: 'hero',
    2: 'h1', 
    3: 'h2',
    4: 'h3',
    5: 'h3',
    6: 'h3',
  };
  
  const actualSize = size || autoSize[level];
  
  const sizeClasses = {
    hero: 'text-hero text-gray-900 font-bold leading-tight',
    h1: 'text-h1 text-gray-900 font-bold leading-tight',
    h2: 'text-h2 text-gray-900 font-semibold leading-snug',
    h3: 'text-h3 text-gray-900 font-semibold leading-normal',
  };
  
  const classes = `${sizeClasses[actualSize]} ${className}`;
  
  return (
    <Tag ref={ref} className={classes} {...props}>
      {children}
    </Tag>
  );
});

Heading.displayName = 'Heading';

// Text component for body text
export const Text = forwardRef(({ 
  size = 'body', 
  color = 'primary',
  className = '', 
  children, 
  ...props 
}, ref) => {
  const sizeClasses = {
    'body-lg': 'text-body-lg leading-relaxed',
    'body': 'text-body leading-relaxed',
    'sm': 'text-sm leading-normal',
  };
  
  const colorClasses = {
    primary: 'text-text-primary',
    secondary: 'text-text-secondary',
    white: 'text-white',
    'primary-color': 'text-primary',
  };
  
  const classes = `${sizeClasses[size]} ${colorClasses[color]} ${className}`;
  
  return (
    <p ref={ref} className={classes} {...props}>
      {children}
    </p>
  );
});

Text.displayName = 'Text';

// Label component for form labels and small text
export const Label = forwardRef(({ 
  className = '', 
  children, 
  htmlFor,
  ...props 
}, ref) => {
  const classes = `text-sm font-medium text-text-primary ${className}`;
  
  return (
    <label ref={ref} className={classes} htmlFor={htmlFor} {...props}>
      {children}
    </label>
  );
});

Label.displayName = 'Label';

