import { forwardRef } from 'react';

interface BaseComponentProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'elevated' | 'highlight';
  hover?: boolean;
}

interface CardSubComponentProps extends BaseComponentProps {}

const Card = forwardRef<HTMLDivElement, CardProps>(({ 
  children, 
  variant = 'default',
  hover = true,
  className = '', 
  ...props 
}, ref) => {
  const baseClasses = 'bg-white rounded-xl transition-all duration-300';
  
  const variants = {
    default: 'border border-gray-100 shadow-sm',
    elevated: 'shadow-lg border border-gray-100',
    highlight: 'border-2 border-primary-light bg-gradient-to-br from-white to-primary-light/20',
  };
  
  const hoverClasses = hover 
    ? 'hover:shadow-xl hover:-translate-y-1 hover:border-primary-light cursor-pointer' 
    : '';
  
  const classes = `${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`;
  
  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

// Card Header component
export const CardHeader = forwardRef<HTMLDivElement, CardSubComponentProps>(({ 
  children, 
  className = '', 
  ...props 
}, ref) => {
  const classes = `p-6 pb-4 ${className}`;
  
  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

// Card Content component
export const CardContent = forwardRef<HTMLDivElement, CardSubComponentProps>(({ 
  children, 
  className = '', 
  ...props 
}, ref) => {
  const classes = `px-6 pb-6 ${className}`;
  
  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

CardContent.displayName = 'CardContent';

// Card Footer component
export const CardFooter = forwardRef<HTMLDivElement, CardSubComponentProps>(({ 
  children, 
  className = '', 
  ...props 
}, ref) => {
  const classes = `px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-xl ${className}`;
  
  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';

export default Card;
