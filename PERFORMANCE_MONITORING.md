# Animation Performance Monitoring

This document describes the performance monitoring system implemented for hero animations in the CodeSpire website.

## Overview

The performance monitoring system automatically detects device capabilities and user preferences to optimize animation performance. It provides fallbacks for low-end devices and respects accessibility preferences.

## Features

### 1. Device Detection
- **Hardware Concurrency**: Detects CPU cores (≤2 cores = low-end)
- **Memory Detection**: Uses Device Memory API when available (≤2GB = low-end)
- **Connection Speed**: Monitors network connection type (2G/slow-2G = low-end)
- **Mobile Detection**: Identifies mobile devices for potential optimization

### 2. Accessibility Support
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce` preference
- **Fallback Component**: Provides static version for users who prefer reduced motion
- **Dynamic Updates**: Listens for preference changes in real-time

### 3. Real-time Performance Monitoring
- **FPS Tracking**: Monitors frame rate during animations
- **Frame Drop Detection**: Alerts when FPS drops below 30
- **Performance Metrics**: Tracks average FPS and frame drops
- **Automatic Optimization**: Adjusts animation complexity based on performance

### 4. Animation Configuration
The system provides different animation configurations based on device capabilities:

```javascript
// High-end device (default)
{
  enableComplexAnimations: true,
  enableParallax: true,
  enableFloatingElements: true,
  animationDuration: 1,
  staggerDelay: 0.1,
  enableBlur: true,
  enableGradients: true
}

// Low-end device
{
  enableComplexAnimations: false,
  enableParallax: false,
  enableFloatingElements: false,
  animationDuration: 0.5,
  staggerDelay: 0.05,
  enableBlur: false,
  enableGradients: true
}

// Reduced motion preference
{
  enableComplexAnimations: false,
  enableParallax: false,
  enableFloatingElements: false,
  animationDuration: 0,
  staggerDelay: 0,
  enableBlur: false,
  enableGradients: true
}
```

## Implementation

### Core Files

1. **`src/lib/performance.js`** - Main performance monitoring utility
2. **`src/components/sections/Hero.js`** - Updated hero component with performance optimization
3. **`src/components/sections/HeroFallback.js`** - Static fallback component
4. **`src/components/ui/PerformanceMonitor.js`** - Development monitoring component

### Usage

```javascript
import { useAnimationPerformance } from '../../lib/performance';

const MyComponent = () => {
  const { config, isLowEndDevice, shouldReduceAnimations } = useAnimationPerformance();
  
  // Use config to adjust animations
  const animationProps = {
    duration: 0.6 * config.animationDuration,
    delay: 0.1 * config.staggerDelay
  };
  
  return (
    <motion.div
      animate={config.enableComplexAnimations ? complexAnimation : simpleAnimation}
      transition={animationProps}
    >
      Content
    </motion.div>
  );
};
```

## Performance Monitoring Component

In development mode, a performance monitor displays real-time metrics:

- Current FPS
- Frame count
- Device classification
- Animation configuration
- Hardware information

## Fallback Strategies

### 1. Reduced Motion Users
- Renders `HeroFallback` component with no animations
- Maintains all content and functionality
- Provides immediate content display

### 2. Low-end Devices
- Disables complex animations (floating elements, parallax)
- Reduces animation duration and stagger delays
- Removes expensive effects (blur, complex transforms)
- Maintains core functionality

### 3. Performance Degradation
- Monitors FPS in real-time
- Automatically disables animations if FPS drops below 45
- Provides console warnings for performance issues

## Browser Support

- **Modern Browsers**: Full feature support
- **Legacy Browsers**: Graceful degradation with fallbacks
- **Mobile Browsers**: Optimized performance detection
- **Accessibility**: Full support for reduced motion preferences
- **Server-Side Rendering**: Safe initialization with proper SSR handling

## Testing

To test the performance monitoring:

1. **Reduced Motion**: Enable "Reduce motion" in system accessibility settings
2. **Low-end Simulation**: Use Chrome DevTools to throttle CPU and network
3. **Performance**: Monitor the development performance indicator
4. **Console**: Check browser console for performance metrics

## Metrics Logged

The system logs the following metrics in development:

```javascript
{
  isLowEndDevice: boolean,
  shouldReduceAnimations: boolean,
  currentFPS: number,
  averageFPS: number,
  frameDrops: number,
  deviceMemory: string,
  hardwareConcurrency: number,
  connection: string
}
```

## Best Practices

1. **Progressive Enhancement**: Start with basic functionality, enhance with animations
2. **Respect User Preferences**: Always honor accessibility settings
3. **Monitor Performance**: Use the development tools to identify bottlenecks
4. **Test on Real Devices**: Verify performance on actual low-end devices
5. **Graceful Degradation**: Ensure content is accessible without animations

## SSR Compatibility

The performance monitoring system is fully compatible with Next.js server-side rendering:

- **Safe Initialization**: All browser APIs are checked before use
- **Graceful Degradation**: Falls back to default settings during SSR
- **Client Hydration**: Properly initializes monitoring after client-side hydration
- **No SSR Errors**: Prevents `window is not defined` and similar SSR issues

## Future Enhancements

- **Machine Learning**: Predict optimal settings based on user behavior
- **A/B Testing**: Test different performance thresholds
- **Analytics Integration**: Track performance metrics in production
- **Battery Level**: Consider device battery level in optimization decisions