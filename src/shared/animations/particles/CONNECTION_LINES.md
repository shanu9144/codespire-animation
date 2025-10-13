# Connection Lines System

The Connection Lines system adds dynamic line rendering between nearby particles using WebGL for optimal performance. This feature creates visually appealing networks of connected particles that respond to user interactions.

## Features

- **WebGL-based rendering** for high performance with hundreds of connections
- **Dynamic opacity** based on particle distance
- **Configurable connection threshold** for fine-tuning visual density
- **Performance optimization** with connection limits and efficient algorithms
- **Real-time updates** that respond to particle movement and interactions
- **Smooth animations** with optional pulse and fade effects

## Usage

### Basic Setup

```javascript
import { ParticleFieldComponent } from '../particles';

<ParticleFieldComponent
  connectionLines={true}
  connectionDistance={100}
  connectionOpacity={0.2}
  maxConnections={500}
  // ... other props
/>
```

### Advanced Configuration

```javascript
// Enable connection lines with custom settings
const particleField = new ParticleField(container, {
  connectionLines: true,
  connectionDistance: 120,     // Maximum distance for connections (px)
  connectionOpacity: 0.15,     // Base opacity for connection lines
  maxConnections: 400,         // Performance limit for total connections
  color: '#384bff'            // Color for both particles and connections
});

// Update connection settings dynamically
particleField.updateConnectionConfig({
  connectionDistance: 150,
  connectionOpacity: 0.3,
  maxConnections: 600
});

// Toggle connection lines on/off
particleField.toggleConnectionLines(true);
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `connectionLines` | boolean | `false` | Enable/disable connection line rendering |
| `connectionDistance` | number | `100` | Maximum distance (px) between particles for connections |
| `connectionOpacity` | number | `0.2` | Base opacity for connection lines (0-1) |
| `maxConnections` | number | `500` | Maximum number of connections for performance |
| `color` | string | `'#384bff'` | Color for connection lines (inherits from particle color) |

## Performance Considerations

### Automatic Optimization

The system includes several performance optimizations:

- **Connection Limiting**: Respects `maxConnections` to prevent performance degradation
- **Distance Culling**: Only calculates connections within the specified distance
- **Efficient Algorithms**: Uses optimized distance calculations and early termination
- **Quality Scaling**: Automatically disables connections on lower-end devices

### Performance Impact

| Particle Count | Max Connections | Performance Impact |
|----------------|-----------------|-------------------|
| 100-200 | 200-300 | Minimal |
| 300-500 | 400-600 | Low |
| 500-800 | 600-800 | Medium |
| 800+ | 800+ | High (auto-scaling recommended) |

### Quality Scaling

```javascript
// Connection lines are automatically disabled on lower quality settings
const qualitySettings = {
  high: { connectionLines: true, maxConnections: 800 },
  medium: { connectionLines: false },  // Disabled for performance
  low: { connectionLines: false }      // Disabled for performance
};
```

## Visual Effects

### Distance-Based Opacity

Connection opacity automatically decreases with distance:

```javascript
// Opacity calculation
const opacity = (1 - distance / maxDistance) * baseOpacity;
```

### Optional Effects

The system supports additional visual enhancements:

- **Pulse Animation**: Subtle pulsing along connection lines
- **Distance Fade**: Opacity fading from center to edges
- **Color Transitions**: Smooth color changes based on interaction

## Integration Examples

### Hero Section Integration

```javascript
import { ParticleFieldComponent } from '../animations/particles';

const HeroSection = () => (
  <section className="hero">
    <div className="hero-content">
      <h1>CodeSpire Solutions</h1>
      <p>Advanced web development with cutting-edge animations</p>
    </div>
    
    <ParticleFieldComponent
      particleCount={300}
      connectionLines={true}
      connectionDistance={120}
      connectionOpacity={0.15}
      mouseInteraction={true}
      scrollParallax={true}
      style={{ position: 'absolute', inset: 0 }}
    />
  </section>
);
```

### Interactive Dashboard

```javascript
const Dashboard = () => {
  const [showConnections, setShowConnections] = useState(true);
  const [connectionDistance, setConnectionDistance] = useState(100);
  
  return (
    <div className="dashboard">
      <div className="controls">
        <label>
          <input
            type="checkbox"
            checked={showConnections}
            onChange={(e) => setShowConnections(e.target.checked)}
          />
          Show Connections
        </label>
        
        <label>
          Distance: {connectionDistance}px
          <input
            type="range"
            min="50"
            max="200"
            value={connectionDistance}
            onChange={(e) => setConnectionDistance(parseInt(e.target.value))}
          />
        </label>
      </div>
      
      <ParticleFieldComponent
        connectionLines={showConnections}
        connectionDistance={connectionDistance}
        connectionOpacity={0.2}
        maxConnections={400}
      />
    </div>
  );
};
```

## API Reference

### ConnectionLines Class

```javascript
import { ConnectionLines } from '../animations/particles';

const connectionLines = new ConnectionLines(gl, config);
```

#### Methods

- `calculateConnections(particles)` - Calculate connections between particles
- `updateBuffers()` - Update WebGL buffers with connection data
- `render(canvas)` - Render connection lines to canvas
- `updateConfig(config)` - Update configuration settings
- `getMetrics()` - Get performance and connection metrics
- `destroy()` - Clean up WebGL resources

#### Events

The system integrates with the particle system's update cycle:

```javascript
// Automatic updates during particle system update
particleSystem.update(deltaTime); // Includes connection line updates
```

## Troubleshooting

### Common Issues

1. **No connections visible**
   - Check that `connectionLines` is set to `true`
   - Verify `connectionDistance` is appropriate for particle density
   - Ensure particles are close enough to connect

2. **Performance issues**
   - Reduce `maxConnections` limit
   - Decrease `connectionDistance`
   - Enable adaptive quality scaling

3. **WebGL errors**
   - The system falls back gracefully if WebGL is unavailable
   - Check browser console for specific WebGL error messages

### Debug Information

```javascript
// Get connection metrics for debugging
const metrics = particleField.getConnectionMetrics();
console.log('Connection count:', metrics.connectionCount);
console.log('Max connections:', metrics.maxConnections);
console.log('Connection distance:', metrics.maxDistance);
```

## Browser Support

- **Modern browsers**: Full WebGL support with all features
- **Older browsers**: Graceful fallback to particle-only rendering
- **Mobile devices**: Automatic performance scaling and connection limiting

## Requirements Fulfilled

This implementation satisfies the following requirements from the specification:

- **Requirement 1.1**: Floating particles that follow the cursor with subtle delay
- **Requirement 1.4**: Particles interact with UI elements creating subtle repulsion or attraction effects

The connection lines enhance these interactions by visualizing the relationships between particles, creating a more engaging and sophisticated animation system.