# Scroll Animations System

A comprehensive scroll-triggered animation system built for the CodeSpire website. This system provides smooth, performant animations that enhance user experience without compromising accessibility.

## Features

- **Scroll Triggers**: Efficient scroll detection using Intersection Observer API
- **Parallax Effects**: Multi-layer parallax scrolling with performance optimization
- **Morphing Animations**: SVG path morphing for icons and graphics
- **Section Transitions**: Smooth transitions between website sections
- **Staggered Animations**: Coordinated child element animations
- **Performance Optimized**: GPU acceleration and automatic quality scaling
- **Accessibility Compliant**: Respects reduced motion preferences

## Quick Start

### Basic Usage

```jsx
import { ScrollAnimatedSection, ScrollRevealText } from '../animations';

function MyComponent() {
  return (
    <ScrollAnimatedSection 
      transitionType="fadeUp"
      stagger={200}
    >
      <ScrollRevealText revealBy="word" staggerDelay={100}>
        This text will animate in word by word
      </ScrollRevealText>
    </ScrollAnimatedSection>
  );
}
```

## Components

### ScrollAnimatedSection

Animates entire sections when they come into view.

```jsx
<ScrollAnimatedSection 
  transitionType="fadeUp"    // Animation type
  stagger={200}              // Delay between child animations
  triggerOffset="20%"        // When to trigger animation
  childSelector="> *"        // Which children to animate
>
  <h2>Section Title</h2>
  <p>Section content</p>
</ScrollAnimatedSection>
```

**Props:**
- `transitionType`: `'fade' | 'fadeUp' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate' | 'liquid'`
- `stagger`: Delay between child animations (ms)
- `triggerOffset`: When to trigger animation (percentage or pixels)
- `childSelector`: CSS selector for child elements to animate

### ScrollRevealText

Reveals text character by character or word by word.

```jsx
<ScrollRevealText 
  revealBy="word"           // 'word' or 'character'
  staggerDelay={100}        // Delay between reveals
  animationType="fadeUp"    // Animation type
>
  Your text content here
</ScrollRevealText>
```

### ScrollTriggeredCounter

Animates numbers counting up when scrolled into view.

```jsx
<ScrollTriggeredCounter
  from={0}
  to={1000}
  duration={2000}
  suffix="+"
  separator=","
  className="text-4xl font-bold"
/>
```

### ParallaxElement

Adds parallax scrolling to any element.

```jsx
<ParallaxElement 
  speed={0.5}              // Parallax speed (-1 to 1)
  direction="vertical"     // 'vertical', 'horizontal', or 'both'
  bounds={{ minY: -100, maxY: 100 }}  // Optional bounds
>
  <div>Content that moves with parallax</div>
</ParallaxElement>
```

### ParallaxBackground

Creates parallax background sections.

```jsx
<ParallaxBackground
  height="100vh"
  speed={0.5}
  backgroundImage="/path/to/image.jpg"
  overlay="rgba(0,0,0,0.3)"
>
  <div>Foreground content</div>
</ParallaxBackground>
```

### MorphingIcon

SVG icons that morph between states.

```jsx
<MorphingIcon
  preset="menuToX"         // Predefined morphing preset
  size={24}
  triggers={['hover']}     // 'hover', 'click', or both
  duration={300}
/>

// Or with custom states
<MorphingIcon
  states={[
    { path: "M3 12h18M3 6h18M3 18h18", name: "menu" },
    { path: "M18 6L6 18M6 6l12 12", name: "x" }
  ]}
  triggers={['hover']}
/>
```

**Available Presets:**
- `menuToX`: Menu hamburger to X
- `playToPause`: Play button to pause
- `heartFill`: Heart outline to filled
- `arrowRotate`: Arrow pointing right to left

### StaggeredGrid

Grid layout with staggered animations.

```jsx
<StaggeredGrid
  columns={3}
  gap="2rem"
  animationType="scaleIn"
  staggerDelay={150}
>
  <div>Grid item 1</div>
  <div>Grid item 2</div>
  <div>Grid item 3</div>
</StaggeredGrid>
```

### ScrollProgressBar

Shows reading or scroll progress.

```jsx
<ScrollProgressBar 
  progressColor="#384bff"
  showPercentage={true}
  position="fixed"
  top="0"
/>
```

## Hooks

### useScrollTrigger

Low-level hook for custom scroll triggers.

```jsx
import { useScrollTrigger } from '../animations/scroll';

function MyComponent() {
  const { ref } = useScrollTrigger({
    start: 'top 80%',
    end: 'bottom 20%',
    onEnter: () => console.log('Element entered'),
    onLeave: () => console.log('Element left'),
    scrub: true,
    onUpdate: (progress) => console.log('Progress:', progress)
  });

  return <div ref={ref}>Content</div>;
}
```

### useParallax

Hook for parallax effects.

```jsx
import { useParallax } from '../animations/scroll';

function MyComponent() {
  const { ref } = useParallax({
    speed: { y: 0.5 },
    direction: 'vertical'
  });

  return <div ref={ref}>Parallax content</div>;
}
```

### useMorphing

Hook for SVG morphing animations.

```jsx
import { useMorphing } from '../animations/scroll';

function MyComponent() {
  const { ref, morphToPath } = useMorphing({
    paths: ['M3 12h18...', 'M18 6L6 18...'],
    duration: 300
  });

  return (
    <svg ref={ref} onClick={() => morphToPath(1)}>
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  );
}
```

## Performance

The animation system is optimized for performance:

- **GPU Acceleration**: Uses CSS transforms and will-change properties
- **Intersection Observer**: Efficient scroll detection
- **Automatic Quality Scaling**: Reduces complexity on low-end devices
- **Memory Management**: Proper cleanup of animation objects
- **Reduced Motion**: Respects user accessibility preferences

## Accessibility

- Automatically detects and respects `prefers-reduced-motion`
- Provides fallback animations for users with motion sensitivity
- Maintains focus management during animations
- Ensures proper contrast ratios for animated elements

## Browser Support

- Modern browsers with Intersection Observer support
- Fallbacks provided for older browsers
- Progressive enhancement approach

## Examples

See `ScrollAnimationExamples.js` for complete usage examples, or visit `/scroll-animations-demo` for a live demonstration.

## Integration with Existing Components

### Enhancing Hero Section

```jsx
import { ScrollRevealText, ParallaxElement } from '../animations';

function Hero() {
  return (
    <section className="hero">
      <ParallaxElement speed={0.3}>
        <div className="background-element" />
      </ParallaxElement>
      
      <ScrollRevealText 
        className="hero-title"
        revealBy="word"
        staggerDelay={200}
      >
        Your Hero Title
      </ScrollRevealText>
    </section>
  );
}
```

### Adding Statistics Animation

```jsx
import { ScrollTriggeredCounter } from '../animations';

function Statistics() {
  return (
    <div className="stats">
      <ScrollTriggeredCounter from={0} to={1000} suffix="+" />
      <ScrollTriggeredCounter from={0} to={500} suffix="+" />
      <ScrollTriggeredCounter from={0} to={99} suffix="%" />
    </div>
  );
}
```

## Customization

All components accept custom CSS classes and can be styled with Tailwind CSS or custom CSS. Animation timing, easing, and triggers are fully configurable.

## Best Practices

1. **Use sparingly**: Don't animate everything - focus on key elements
2. **Performance first**: Test on various devices and connection speeds
3. **Accessibility**: Always provide reduced motion alternatives
4. **Progressive enhancement**: Ensure content works without animations
5. **Consistent timing**: Use consistent animation durations across your site
6. **Meaningful motion**: Animations should enhance understanding, not distract

## Troubleshooting

### Animations not triggering
- Check that elements are properly in the viewport
- Verify trigger offsets are appropriate for your layout
- Ensure elements have proper dimensions

### Performance issues
- Reduce particle counts or disable complex animations
- Check for memory leaks in custom callbacks
- Use the performance monitor in development mode

### Accessibility concerns
- Test with `prefers-reduced-motion` enabled
- Verify animations don't interfere with screen readers
- Ensure sufficient color contrast during animations