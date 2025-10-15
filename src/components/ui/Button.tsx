import { forwardRef } from 'react';
import type { ButtonProps } from '../../types/components';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  onClick,
  type = 'button',
  href,
  target,
  rel,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    secondary: 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white shadow-md hover:shadow-lg',
    outline: 'bg-transparent text-primary border border-primary hover:bg-primary-light hover:border-primary-hover',
    ghost: 'bg-transparent text-primary hover:bg-primary-light',
    link: 'bg-transparent text-primary underline hover:text-primary-hover',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-md',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl',
    icon: 'p-2 rounded-lg',
  };
  
  const widthClasses = fullWidth ? 'w-full' : '';
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClasses} ${className}`;
  
  // If href is provided, render as a link
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={classes}
        data-magnetic="true"
        data-magnetic-strength="0.4"
        data-magnetic-radius="100"
        {...props}
      >
        {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      </a>
    );
  }
  
  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      data-magnetic="true"
      data-magnetic-strength="0.4"
      data-magnetic-radius="100"
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
