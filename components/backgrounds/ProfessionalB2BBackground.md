# ProfessionalB2BBackground

A sophisticated full-page background component designed specifically for professional B2B AI websites. This component creates an elegant, enterprise-grade visual foundation using a carefully crafted color palette of white, blue, and light blue tones.

## Features

- **Soft Diagonal Gradient**: White in the top-left fading into light blue in the bottom-right
- **Abstract Wave Patterns**: Faint, animated wave elements that add depth and movement
- **Blurred Circular Shapes**: Subtle circular elements in varying opacities of blue
- **Minimal & Elegant**: Designed to enhance content without overwhelming it
- **Enterprise-Grade**: Professional aesthetic suitable for B2B applications
- **Performance Optimized**: Canvas-based rendering with efficient animations
- **Responsive**: Automatically adapts to different screen sizes
- **Accessibility**: Respects reduced motion preferences

## Usage

### Basic Implementation

```jsx
import { ProfessionalB2BBackground } from '../components/backgrounds';

function MyPage() {
  return (
    <div className="min-h-screen relative">
      <ProfessionalB2BBackground />
      <div className="relative z-10">
        {/* Your content here */}
      </div>
    </div>
  );
}
```

### Advanced Configuration

```jsx
<ProfessionalB2BBackground 
  intensity="medium"        // 'subtle', 'medium', or 'prominent'
  enableAnimation={true}    // true for animated, false for static
  className="custom-class"  // Additional CSS classes
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `intensity` | `'subtle' \| 'medium' \| 'prominent'` | `'medium'` | Controls the visibility of visual elements |
| `enableAnimation` | `boolean` | `true` | Enables/disables animation effects |
| `className` | `string` | `''` | Additional CSS classes for styling |

## Intensity Levels

### Subtle
- **Use Case**: Maximum readability, minimal distraction
- **Wave Opacity**: 0.03
- **Circle Opacity**: 0.02
- **Animation Speed**: 0.5x
- **Elements**: 3 waves, 4 circles

### Medium (Default)
- **Use Case**: Balanced professional presentation
- **Wave Opacity**: 0.05
- **Circle Opacity**: 0.04
- **Animation Speed**: 0.8x
- **Elements**: 4 waves, 6 circles

### Prominent
- **Use Case**: Dynamic, engaging presentation
- **Wave Opacity**: 0.08
- **Circle Opacity**: 0.06
- **Animation Speed**: 1.0x
- **Elements**: 5 waves, 8 circles

## Design Principles

### Color Palette
- **Primary**: White (#ffffff)
- **Secondary**: Light Blue (#bae6fd)
- **Accent**: Blue (#3b82f6)
- **Gradient**: Diagonal from white to light blue

### Visual Elements
1. **Base Gradient**: Soft diagonal transition from white to light blue
2. **Wave Patterns**: Abstract, flowing wave shapes with gradient fills
3. **Circular Shapes**: Blurred circles with radial gradients
4. **Grid Pattern**: Subtle enterprise-style grid overlay (2% opacity)

### Animation Behavior
- **Waves**: Gentle sine wave motion with varying frequencies
- **Circles**: Floating motion with size pulsing
- **Performance**: 60fps canvas rendering with efficient updates
- **Accessibility**: Respects `prefers-reduced-motion`

## Performance Considerations

- **Canvas Rendering**: Uses HTML5 Canvas for optimal performance
- **Device Pixel Ratio**: Automatically scales for high-DPI displays
- **Animation Control**: Can be disabled for static presentations
- **Memory Efficient**: Minimal DOM manipulation, canvas-based rendering
- **Responsive**: Automatically resizes on window resize events

## Browser Support

- **Modern Browsers**: Full support with canvas and CSS3 features
- **Fallback**: Graceful degradation with CSS gradient fallback
- **Mobile**: Optimized for touch devices with reduced motion options

## Integration Examples

### With Existing Layout

```jsx
// In your main layout or page component
<div className="min-h-screen relative">
  <ProfessionalB2BBackground intensity="subtle" />
  <Header />
  <main className="relative z-10">
    <Wrapper>
      {children}
    </Wrapper>
  </main>
  <Footer />
</div>
```

### With Content Sections

```jsx
// For specific sections that need the background
<section className="relative min-h-screen">
  <ProfessionalB2BBackground intensity="medium" />
  <div className="relative z-10 wrapper py-16">
    <h1>Your Section Content</h1>
  </div>
</section>
```

## Accessibility

- **Reduced Motion**: Automatically respects `prefers-reduced-motion` settings
- **High Contrast**: Maintains sufficient contrast for text readability
- **Screen Readers**: Background elements don't interfere with content
- **Keyboard Navigation**: No impact on keyboard accessibility

## Customization

The component is designed to work out-of-the-box but can be customized through:

1. **Intensity Levels**: Choose the appropriate visual weight
2. **Animation Control**: Enable/disable based on performance needs
3. **CSS Classes**: Add custom styling through className prop
4. **Z-Index Management**: Ensure proper layering with content

## Best Practices

1. **Content Readability**: Always ensure sufficient contrast between text and background
2. **Performance**: Use `enableAnimation={false}` for static presentations
3. **Layering**: Use `relative z-10` on content containers
4. **Responsive Design**: Test across different screen sizes
5. **Accessibility**: Verify with screen readers and reduced motion settings

## Demo

Visit `/test-professional-background` to see the component in action with:
- Interactive intensity controls
- Animation toggle
- Readability test content
- Different use case examples
