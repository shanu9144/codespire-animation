import { forwardRef } from 'react';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    secondary: 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white shadow-md hover:shadow-lg',
    outline: 'bg-transparent text-primary border border-primary hover:bg-primary-light hover:border-primary-hover'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-md',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled}
      data-magnetic="true"
      data-magnetic-strength="0.4"
      data-magnetic-radius="100"
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;