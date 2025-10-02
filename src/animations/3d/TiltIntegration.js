import React from 'react';
import TiltCard, { TiltCardAdvanced, TiltButton } from './TiltEffect';

/**
 * Enhanced Card component with 3D tilt effects
 * Integrates with existing card designs
 */
export const Card3D = ({
  children,
  variant = 'default', // 'default', 'advanced', 'subtle'
  className = '',
  style = {},
  ...props
}) => {
  const variants = {
    default: {
      maxTilt: 12,
      perspective: 1000,
      scale: 1.03,
      speed: 300,
      glare: true,
      glareMaxOpacity: 0.1
    },
    advanced: {
      maxTilt: 18,
      perspective: 1200,
      scale: 1.06,
      speed: 400,
      glare: true,
      glareMaxOpacity: 0.15,
      shadow: true,
      shadowIntensity: 0.25
    },
    subtle: {
      maxTilt: 8,
      perspective: 800,
      scale: 1.02,
      speed: 250,
      glare: false
    }
  };

  const config = variants[variant] || variants.default;

  if (variant === 'advanced') {
    return (
      <TiltCardAdvanced
        className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg ${className}`}
        style={style}
        {...config}
        {...props}
      >
        {children}
      </TiltCardAdvanced>
    );
  }

  return (
    <TiltCard
      className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg ${className}`}
      style={style}
      {...config}
      {...props}
    >
      {children}
    </TiltCard>
  );
};

/**
 * Enhanced Button component with 3D tilt effects
 */
export const Button3D = ({
  children,
  variant = 'primary', // 'primary', 'secondary', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  className = '',
  style = {},
  ...props
}) => {
  const variants = {
    primary: {
      maxTilt: 8,
      perspective: 600,
      scale: 1.02,
      speed: 150,
      glare: true,
      pressScale: 0.98,
      baseClasses: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
    },
    secondary: {
      maxTilt: 6,
      perspective: 500,
      scale: 1.01,
      speed: 200,
      glare: false,
      pressScale: 0.99,
      baseClasses: 'bg-white/10 border border-white/30 text-white backdrop-blur-sm'
    },
    ghost: {
      maxTilt: 4,
      perspective: 400,
      scale: 1.005,
      speed: 100,
      glare: false,
      pressScale: 0.995,
      baseClasses: 'text-white hover:bg-white/10'
    }
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const config = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;

  return (
    <TiltButton
      className={`
        ${config.baseClasses}
        ${sizeClasses}
        rounded-lg font-medium transition-all duration-200
        hover:shadow-lg active:shadow-sm
        ${className}
      `}
      style={style}
      maxTilt={config.maxTilt}
      perspective={config.perspective}
      scale={config.scale}
      speed={config.speed}
      glare={config.glare}
      pressScale={config.pressScale}
      {...props}
    >
      {children}
    </TiltButton>
  );
};

/**
 * Product Card with enhanced 3D effects
 */
export const ProductCard3D = ({
  title,
  description,
  image,
  price,
  onAddToCart,
  className = '',
  ...props
}) => {
  return (
    <Card3D
      variant="advanced"
      className={`p-6 max-w-sm ${className}`}
      {...props}
    >
      {image && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
      )}
      
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        
        {description && (
          <p className="text-gray-300 text-sm leading-relaxed">
            {description}
          </p>
        )}
        
        {price && (
          <div className="text-2xl font-bold text-blue-400">
            {price}
          </div>
        )}
        
        {onAddToCart && (
          <Button3D
            variant="primary"
            size="md"
            onClick={onAddToCart}
            className="w-full mt-4"
          >
            Add to Cart
          </Button3D>
        )}
      </div>
    </Card3D>
  );
};

/**
 * Feature Card with 3D tilt effects
 */
export const FeatureCard3D = ({
  icon,
  title,
  description,
  className = '',
  ...props
}) => {
  return (
    <Card3D
      variant="default"
      className={`p-6 text-center ${className}`}
      {...props}
    >
      {icon && (
        <div className="mb-4 flex justify-center">
          <div className="p-3 bg-blue-500/20 rounded-full">
            {icon}
          </div>
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-white mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-gray-300 text-sm">
          {description}
        </p>
      )}
    </Card3D>
  );
};

/**
 * Statistics Card with 3D effects and animated counters
 */
export const StatCard3D = ({
  value,
  label,
  suffix = '',
  prefix = '',
  className = '',
  ...props
}) => {
  return (
    <Card3D
      variant="subtle"
      className={`p-4 text-center ${className}`}
      {...props}
    >
      <div className="text-3xl font-bold text-blue-400 mb-1">
        {prefix}{value}{suffix}
      </div>
      <div className="text-sm text-gray-300 uppercase tracking-wide">
        {label}
      </div>
    </Card3D>
  );
};

export default Card3D;