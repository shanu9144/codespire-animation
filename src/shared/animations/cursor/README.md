# Cursor System Documentation

## Overview

The cursor system provides magnetic attraction effects for interactive elements while keeping the default browser cursor appearance. Users will see their normal cursor, but it will be subtly attracted to buttons, links, and other interactive elements.

## Features

- **Normal Cursor Appearance**: The default browser cursor remains visible and unchanged
- **Magnetic Attraction**: Interactive elements attract the cursor with configurable strength and radius
- **Automatic Device Detection**: Provides touch-friendly alternatives on mobile devices
- **Performance Optimized**: Respects reduced motion preferences and adapts to device capabilities

## Usage

### Basic Implementation

```jsx
import { CursorSystem } from "../animations";

function App() {
  return (
    <CursorSystem>
      <YourAppContent />
    </CursorSystem>
  );
}
```

### Configuration Options

```jsx
<CursorSystem
  cursorType="invisible-magnetic"
  magneticConfig={{
    strength: 0.3, // Attraction strength (0-1)
    radius: 80, // Attraction radius in pixels
    ease: 0.15, // Easing factor for smooth movement
  }}
  touchConfig={{
    enableRipples: true,
    enableHaptics: true,
    enableVisualFeedback: true,
    rippleColor: "#384bff",
  }}
/>
```

### Adding Magnetic Properties to Elements

#### Automatic Detection

Buttons and links automatically have magnetic properties:

```jsx
<button>This button is automatically magnetic</button>
<a href="/link">This link is automatically magnetic</a>
```

#### Manual Configuration

Add custom magnetic properties to any element:

```jsx
<div
  data-magnetic="true"
  data-magnetic-strength="0.4"
  data-magnetic-radius="100"
>
  Custom magnetic element
</div>
```

#### Using the Hook

Programmatically add magnetic properties:

```jsx
import { useCursorSystem } from "../animations";

function MyComponent() {
  const { addMagneticElement } = useCursorSystem();

  const elementRef = useRef();

  useEffect(() => {
    if (elementRef.current) {
      addMagneticElement(elementRef.current, {
        strength: 0.5,
        radius: 120,
      });
    }
  }, []);

  return <div ref={elementRef}>Magnetic element</div>;
}
```

## Cursor Types

- **`invisible-magnetic`** (default): Normal cursor with magnetic attraction
- **`magnetic`**: Custom cursor with visible magnetic effects
- **`magnetic-with-trail`**: Custom cursor with particle trail
- **`trail`**: Custom cursor with trail only
- **`simple`**: Subtle magnetic effects

## Mobile Support

The system automatically detects touch devices and provides appropriate alternatives:

- **Touch Ripples**: Visual feedback on touch
- **Haptic Feedback**: Vibration on supported devices
- **Visual States**: Touch-friendly hover states

## Performance

The system includes several performance optimizations:

- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **Device Detection**: Disables effects on low-end devices
- **Adaptive Quality**: Adjusts animation complexity based on device capabilities
- **Efficient Rendering**: Uses optimized animation techniques

## Browser Support

- **Desktop**: All modern browsers with mouse support
- **Mobile**: Touch devices with appropriate fallbacks
- **Accessibility**: Fully compatible with screen readers and keyboard navigation

## Examples

Visit `/test-cursor` to see the cursor system in action with various interactive elements.

## Troubleshooting

### Cursor Not Working

1. Ensure elements have `data-magnetic="true"` attribute
2. Check that the CursorSystem component wraps your content
3. Verify the cursor type is set correctly

### Performance Issues

1. Reduce magnetic strength and radius values
2. Enable `disableOnLowEnd` in performance config
3. Use `invisible-magnetic` type for better performance

### Mobile Issues

1. Ensure touch alternatives are enabled
2. Check haptic feedback permissions
3. Verify touch event handling
