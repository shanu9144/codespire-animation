# Layout System Documentation

## Overview

The CodeSpire website now uses a comprehensive layout system that ensures consistent spacing, alignment, and responsive design across all pages and components. The system is built around a central wrapper structure that prevents content from spilling outside and provides proper spacing for mobile, tablet, and desktop devices.

## Architecture

### Main Structure

```
<div className="main">
  <Header />
  <main className="flex-1 pt-16">
    <Wrapper>
      {children}
    </Wrapper>
  </main>
  <Footer />
</div>
```

### Wrapper System

The wrapper system consists of:

1. **Main Container** (`.main`): Flexbox container that manages the overall page layout
2. **Wrapper Component** (`<Wrapper>`): Reusable component that provides consistent spacing and alignment
3. **CSS Classes**: Utility classes for common layout patterns

## Components

### Wrapper Component

The `Wrapper` component is the core of the layout system:

```jsx
import Wrapper from "../components/ui/Wrapper";

<Wrapper variant="default" className="custom-class">
  <YourContent />
</Wrapper>
```

#### Props

- `children`: Content to wrap
- `className`: Additional CSS classes
- `variant`: Wrapper variant ('default', 'narrow', 'wide', 'full')
- `padding`: Whether to include default padding (default: true)
- `style`: Inline styles
- `as`: HTML element to render as (default: 'div')

#### Variants

- **default**: Standard wrapper with max-width of 1400px
- **narrow**: Max-width of 4xl (896px)
- **wide**: Max-width of 6xl (1152px)
- **full**: No max-width constraint

### CSS Classes

#### Layout Classes

- `.main`: Main container with flexbox layout
- `.wrapper`: Base wrapper with responsive padding
- `.header-container`: Flex container for header elements
- `.header-left`: Left section of header (logo, brand)
- `.header-center`: Center section of header (navigation)
- `.header-right`: Right section of header (CTA, mobile menu)

#### Responsive Classes

- `.grid-2`: Two-column grid (responsive)
- `.grid-3`: Three-column grid (responsive)
- `.flex-center`: Center alignment
- `.flex-between`: Space between alignment
- `.flex-start`: Start alignment
- `.flex-end`: End alignment

#### Spacing Classes

- `.section-padding`: Standard section padding (responsive)
- `.content-section`: Content section with padding

## Responsive Design

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Responsive Padding

The wrapper system automatically adjusts padding based on screen size:

- **Mobile**: 1rem (16px)
- **Tablet**: 1.5rem (24px)
- **Desktop**: 2rem (32px)
- **Large Desktop**: 2.5rem (40px)

### Header Responsiveness

The header automatically adapts to different screen sizes:

- **Desktop**: Full navigation with logo, nav links, and CTA button
- **Tablet**: Logo and CTA button with hidden navigation
- **Mobile**: Logo and hamburger menu

## Usage Examples

### Basic Page Layout

```jsx
export default function MyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Wrapper>
        <h1>My Page Title</h1>
        <p>Page content goes here...</p>
      </Wrapper>
    </div>
  );
}
```

### Section with Background

```jsx
<OptimizedLiquidBackground variant="section" intensity="low">
  <Wrapper>
    <StatsBanner />
  </Wrapper>
</OptimizedLiquidBackground>
```

### Custom Wrapper Variant

```jsx
<Wrapper variant="narrow" className="text-center">
  <h2>Narrow Content</h2>
  <p>This content has a narrower max-width</p>
</Wrapper>
```

### Grid Layout

```jsx
<Wrapper>
  <div className="grid-3">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </div>
</Wrapper>
```

## Best Practices

### 1. Always Use Wrapper

Never add content directly without a wrapper:

```jsx
// ❌ Bad
<div className="min-h-screen">
  <h1>Content without wrapper</h1>
</div>

// ✅ Good
<div className="min-h-screen">
  <Wrapper>
    <h1>Content with wrapper</h1>
  </Wrapper>
</div>
```

### 2. Use Appropriate Variants

Choose the right wrapper variant for your content:

```jsx
// ✅ For main content
<Wrapper variant="default">

// ✅ For forms or narrow content
<Wrapper variant="narrow">

// ✅ For full-width sections
<Wrapper variant="full">
```

### 3. Leverage CSS Classes

Use the provided CSS classes for common patterns:

```jsx
// ✅ Use grid classes
<div className="grid-2">
  <div>Left content</div>
  <div>Right content</div>
</div>

// ✅ Use flex utilities
<div className="flex-between">
  <div>Left</div>
  <div>Right</div>
</div>
```

### 4. Responsive Considerations

Always consider mobile-first design:

```jsx
// ✅ Mobile-first approach
<div className="grid-3"> {/* Responsive grid */}
  <div>Content</div>
</div>
```

## Migration Guide

### From Old Layout

If you have existing components that don't use the wrapper system:

1. **Wrap existing content**:
   ```jsx
   // Before
   <div className="max-w-7xl mx-auto px-4">
     <Content />
   </div>
   
   // After
   <Wrapper>
     <Content />
   </Wrapper>
   ```

2. **Update header structure**:
   ```jsx
   // Before
   <nav className="max-w-7xl mx-auto px-4">
     <div className="flex items-center justify-between">
   
   // After
   <Wrapper>
     <nav className="header-container">
   ```

3. **Use responsive classes**:
   ```jsx
   // Before
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
   
   // After
   <div className="grid-3">
   ```

## Performance Considerations

- The wrapper system uses CSS classes for optimal performance
- No JavaScript overhead for layout calculations
- Responsive design handled purely with CSS
- Minimal bundle size impact

## Browser Support

The layout system supports all modern browsers:

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Troubleshooting

### Common Issues

1. **Content not centered**: Ensure you're using the `Wrapper` component
2. **Mobile layout issues**: Check that responsive classes are applied correctly
3. **Spacing problems**: Verify that padding is not being overridden by custom styles

### Debug Tips

1. Use browser dev tools to inspect wrapper classes
2. Check that `max-width` and `margin: 0 auto` are applied
3. Verify responsive breakpoints are working correctly

## Future Enhancements

- Container queries support
- Advanced grid layouts
- Animation integration
- Theme-aware spacing
