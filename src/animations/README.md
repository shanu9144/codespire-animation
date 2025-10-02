# Advanced Animation System

A sophisticated, performance-optimized animation system for the CodeSpire website featuring WebGL detection, adaptive quality scaling, and comprehensive performance monitoring.

## Features

- **Performance Monitoring**: Real-time FPS tracking and automatic quality adjustment
- **Device Detection**: Adaptive configuration based on device capabilities
- **WebGL Support**: Automatic fallback when WebGL is unavailable
- **Accessibility**: Respects reduced motion preferences
- **Memory Management**: Automatic cleanup and memory monitoring
- **React Integration**: Custom hooks and components for easy React usage

## Quick Start

### Basic Initialization

```javascript
import { initializeCodeSpireAnimations } from './animations/utils/AnimationInitializer.js';

// Initialize with default CodeSpire settings
const result = await initializeCodeSpireAnimations();

if (result.success) {
  console.log('Animation system ready!');
} else {
  console.log('Fallback mode active');
}
```

### React Hook Usage

```javascript
import { useAnimationEngine } from './animations/hooks/useAnimationEngine.js';

function MyComponent() {
  const { 
    isInitialized, 
    playAnimation, 
    registerAnimation,
    qualityLevel 
  } = useAnimationEngine({
    trackMetrics: true,
    config: {
      primaryColor: '#384bff',
      enableParticles: true
    }
  });

  // Use animations...
}
```

## Core Components

### AnimationEngine

Central controller for all animations:

```javascript
import AnimationEngine from './animations/core/AnimationEngine.js';

// Initialize
await AnimationEngine.initialize({
  targetFPS: 60,
  enableParticles: true,
  primaryColor: '#384bff'
});

// Register animation
AnimationEngine.registerAnimation('my-animation', animationInstance);

// Play animation
await AnimationEngine.playAnimation('my-animation');
```

### PerformanceManager

Monitors and optimizes performance:

```javascript
import PerformanceManager from './animations/core/PerformanceManager.js';

// Listen for performance changes
PerformanceManager.onQualityChange((newLevel) => {
  console.log('Quality changed to:', newLevel);
});

// Get current metrics
const metrics = PerformanceManager.getMetrics();
```

### DeviceCapabilities

Detects device performance characteristics:

```javascript
import DeviceCapabilities from './animations/core/DeviceCapabilities.js';

const capabilities = DeviceCapabilities.getCapabilities();
const config = DeviceCapabilities.getAnimationConfig();
const isMobile = DeviceCapabilities.isMobileDevice();
```

### WebGLDetection

Tests WebGL support and capabilities:

```javascript
import WebGLDetection from './animations/core/WebGLDetection.js';

const isSupported = WebGLDetection.isWebGLSupported();
const capabilities = WebGLDetection.getWebGLCapabilities();
const quality = WebGLDetection.getRecommendedQuality();
```

## Creating Custom Animations

### Basic Animation Class

```javascript
class MyAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.options = options;
    this.isPlaying = false;
  }

  async play(options = {}) {
    this.isPlaying = true;
    // Animation logic here
    return new Promise(resolve => {
      // Resolve when animation completes
    });
  }

  pause() {
    this.isPlaying = false;
  }

  stop() {
    this.isPlaying = false;
    // Reset element state
  }

  update(deltaTime) {
    // Called every frame by animation engine
  }

  onQualityChange(newLevel, config) {
    // Adjust animation based on quality level
  }
}
```

### Registration and Usage

```javascript
// Create and register
const myAnimation = new MyAnimation(element, { duration: 1000 });
AnimationEngine.registerAnimation('my-animation', myAnimation);

// Play with options
await AnimationEngine.playAnimation('my-animation', {
  priority: true,
  force: true
});
```

## React Components

### PerformanceStats

Display real-time performance metrics:

```javascript
import PerformanceStats from './animations/components/PerformanceStats.js';

function App() {
  return (
    <div>
      {/* Show performance stats in development */}
      {process.env.NODE_ENV === 'development' && (
        <PerformanceStats 
          position="top-right"
          showMemory={true}
          showQuality={true}
        />
      )}
    </div>
  );
}
```

## React Hooks

### useAnimationEngine

Main hook for animation control:

```javascript
const {
  isInitialized,     // Boolean: Is system ready?
  metrics,           // Object: Performance metrics
  qualityLevel,      // String: Current quality level
  playAnimation,     // Function: Play animation by ID
  pauseAnimation,    // Function: Pause animation by ID
  stopAnimation,     // Function: Stop animation by ID
  registerAnimation, // Function: Register new animation
  setPerformanceMode // Function: Force quality level
} = useAnimationEngine(options);
```

### useAnimationPerformance

Monitor performance metrics:

```javascript
const {
  fps,           // Number: Current FPS
  frameTime,     // Number: Frame time in ms
  qualityLevel,  // String: Current quality
  memoryUsage,   // Object: Memory usage info
  metrics        // Object: Complete metrics
} = useAnimationPerformance();
```

### useReducedMotion

Detect motion preferences:

```javascript
const {
  prefersReducedMotion, // Boolean: User prefers reduced motion
  shouldAnimate         // Boolean: Should animations play
} = useReducedMotion();
```

## Configuration Options

### Animation Engine Config

```javascript
{
  // Performance
  targetFPS: 60,
  adaptiveQuality: true,
  maxAnimations: 50,
  
  // Features
  enableAnimations: true,
  enable3D: true,
  enableShaders: true,
  enablePostProcessing: false,
  enableParticles: true,
  
  // Visual
  primaryColor: '#384bff',
  secondaryColor: '#ffffff',
  particleOpacity: 0.8,
  animationSpeed: 1.0,
  
  // Accessibility
  respectReducedMotion: true,
  provideFallbacks: true,
  
  // Debug
  showPerformanceStats: false,
  enableDebugMode: false
}
```

### Quality Levels

The system automatically adjusts between three quality levels:

- **High**: Full features, 1000+ particles, post-processing
- **Medium**: Reduced particles (500), no post-processing
- **Low**: Minimal particles (100-200), simple animations only

## Performance Optimization

### Automatic Quality Scaling

The system monitors FPS and automatically reduces quality when performance drops:

- FPS < 30: Reduce quality level
- FPS > 54: Increase quality level (if device supports it)
- Memory > 80%: Reduce quality
- Memory > 90%: Force low quality

### Manual Optimization

```javascript
// Force specific quality level
AnimationEngine.setPerformanceMode('low');

// Pause non-essential animations
AnimationEngine.pauseNonEssentialAnimations();

// Get performance metrics
const metrics = AnimationEngine.getMetrics();
```

## Accessibility

### Reduced Motion Support

The system automatically detects and respects the `prefers-reduced-motion` CSS media query:

```javascript
// Check if reduced motion is preferred
const prefersReduced = DeviceCapabilities.prefersReducedMotion();

// System automatically disables animations if preferred
```

### Fallback Behavior

When animations are disabled or fail:

- Static content is shown instead
- Essential functionality remains available
- No JavaScript errors are thrown
- Graceful degradation to CSS-only animations

## Browser Support

### WebGL Support

- **Full Support**: Chrome, Firefox, Safari, Edge (modern versions)
- **Fallback**: Automatic detection and graceful degradation
- **Mobile**: Optimized configurations for mobile devices

### Feature Detection

The system automatically detects and adapts to:

- WebGL availability and version
- Device memory and CPU cores
- Screen size and pixel ratio
- Network connection quality
- Touch vs. mouse input

## Development Tools

### Debug Mode

Enable debug mode for development:

```javascript
await AnimationEngine.initialize({
  enableDebugMode: true,
  showPerformanceStats: true
});
```

### Performance Monitoring

```javascript
// Listen for performance warnings
PerformanceManager.onPerformanceWarning((type, value) => {
  console.warn(`Performance warning: ${type} - ${value}`);
});

// Get detailed metrics
const metrics = PerformanceManager.getMetrics();
```

## Integration with CodeSpire Website

### Initialization in Layout

```javascript
// In your main layout or App component
import { initializeCodeSpireAnimations } from './animations/utils/AnimationInitializer.js';

useEffect(() => {
  initializeCodeSpireAnimations();
}, []);
```

### Component Integration

```javascript
// In individual components
import { useAnimationEngine } from './animations/hooks/useAnimationEngine.js';

function HeroSection() {
  const { playAnimation, registerAnimation } = useAnimationEngine();
  
  useEffect(() => {
    // Register hero animations
    const heroAnimation = new HeroParticleAnimation(heroRef.current);
    registerAnimation('hero-particles', heroAnimation);
    
    // Play on mount
    playAnimation('hero-particles');
  }, []);
}
```

## Troubleshooting

### Common Issues

1. **Animations not playing**: Check if system is initialized and `enableAnimations` is true
2. **Poor performance**: System should auto-adjust, but you can force lower quality
3. **WebGL errors**: System should fallback automatically, check console for details
4. **Memory leaks**: Ensure animations are properly stopped and cleaned up

### Debug Information

```javascript
// Get system status
const status = {
  initialized: AnimationEngine.isInitialized,
  config: AnimationEngine.getConfig(),
  metrics: AnimationEngine.getMetrics(),
  capabilities: DeviceCapabilities.getCapabilities()
};

console.log('Animation System Status:', status);
```

## Next Steps

This infrastructure is now ready for implementing specific animation features:

1. **Particle Systems** (Task 2.1)
2. **3D Elements** (Task 5.1)
3. **Fluid Backgrounds** (Task 6.1)
4. **Magnetic Cursor** (Task 4.1)
5. **Scroll Animations** (Task 7.1)

Each feature will build upon this foundation and automatically benefit from the performance monitoring and device adaptation systems.