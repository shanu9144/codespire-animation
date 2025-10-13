// Font family styles for CodeSpire Animation project
// Common typography styles for descriptions and paragraphs

export const fontFamilies = {
  // Primary font for descriptions and paragraphs
  description: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '400',
    lineHeight: '1.6',
    letterSpacing: '0.025em'
  },
  
  // Alternative description font (more modern)
  descriptionModern: {
    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '400',
    lineHeight: '1.65',
    letterSpacing: '0.02em'
  },
  
  // Light weight for subtle descriptions
  descriptionLight: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '300',
    lineHeight: '1.7',
    letterSpacing: '0.03em'
  },
  
  // Medium weight for emphasized descriptions
  descriptionMedium: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '500',
    lineHeight: '1.6',
    letterSpacing: '0.02em'
  }
};

// CSS classes for easy application
export const fontClasses = {
  description: 'font-inter font-normal leading-relaxed tracking-wide',
  descriptionModern: 'font-sf-pro font-normal leading-relaxed tracking-wide',
  descriptionLight: 'font-inter font-light leading-loose tracking-wider',
  descriptionMedium: 'font-inter font-medium leading-relaxed tracking-wide'
};

// Tailwind CSS configuration for custom fonts
export const tailwindFontConfig = {
  fontFamily: {
    'inter': ['Inter', 'sans-serif'],
    'sf-pro': ['"SF Pro Display"', 'sans-serif']
  },
  fontSize: {
    'description-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.025em' }],
    'description': ['1rem', { lineHeight: '1.6', letterSpacing: '0.025em' }],
    'description-lg': ['1.125rem', { lineHeight: '1.65', letterSpacing: '0.02em' }],
    'description-xl': ['1.25rem', { lineHeight: '1.6', letterSpacing: '0.02em' }]
  }
};

// React component styles for inline usage
export const getDescriptionStyles = (variant: keyof typeof fontFamilies = 'description') => {
  return fontFamilies[variant] || fontFamilies.description;
};

// Usage examples:
// 1. For Tailwind classes: className={fontClasses.description}
// 2. For inline styles: style={getDescriptionStyles('descriptionLight')}
// 3. For custom components: <p style={getDescriptionStyles('descriptionMedium')}>
