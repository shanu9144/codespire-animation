/**
 * OrganicMovement Utility
 * 
 * Provides organic movement patterns and easing functions for fluid animations
 * Features:
 * - Natural movement algorithms
 * - Configurable organic patterns
 * - Performance-optimized calculations
 * - Reusable movement generators
 */

export class OrganicMovement {
  constructor(config = {}) {
    this.amplitude = config.amplitude || 50;
    this.frequency = config.frequency || 0.5;
    this.phase = config.phase || 0;
    this.complexity = config.complexity || 3;
    this.randomSeed = config.randomSeed || Math.random();
    this.time = 0;
  }

  // Generate organic X movement
  getX(time, baseX = 0) {
    let movement = 0;
    
    // Layer multiple sine waves for complexity
    for (let i = 1; i <= this.complexity; i++) {
      const freq = this.frequency * i * 0.7;
      const amp = this.amplitude / i;
      const phase = this.phase + (this.randomSeed * i * Math.PI);
      
      movement += Math.sin(time * freq + phase) * amp;
    }
    
    return baseX + movement;
  }

  // Generate organic Y movement
  getY(time, baseY = 0) {
    let movement = 0;
    
    // Use different phase relationships for Y to create figure-8 patterns
    for (let i = 1; i <= this.complexity; i++) {
      const freq = this.frequency * i * 0.8;
      const amp = this.amplitude / i * 0.7;
      const phase = this.phase + (this.randomSeed * i * Math.PI * 1.3);
      
      movement += Math.cos(time * freq + phase) * amp;
    }
    
    return baseY + movement;
  }

  // Generate organic rotation
  getRotation(time) {
    return Math.sin(time * this.frequency * 0.3 + this.phase) * 15; // degrees
  }

  // Generate organic scale variation
  getScale(time, baseScale = 1) {
    const variation = Math.sin(time * this.frequency * 0.4 + this.phase) * 0.1;
    return baseScale + variation;
  }

  // Update internal time
  update(deltaTime) {
    this.time += deltaTime;
  }
}

// Predefined organic movement patterns
export const MovementPatterns = {
  // Gentle floating movement
  floating: {
    amplitude: 30,
    frequency: 0.3,
    complexity: 2
  },
  
  // More active swimming movement
  swimming: {
    amplitude: 60,
    frequency: 0.8,
    complexity: 3
  },
  
  // Subtle breathing movement
  breathing: {
    amplitude: 15,
    frequency: 0.2,
    complexity: 1
  },
  
  // Chaotic organic movement
  chaotic: {
    amplitude: 80,
    frequency: 1.2,
    complexity: 4
  },
  
  // Slow drift movement
  drifting: {
    amplitude: 40,
    frequency: 0.1,
    complexity: 2
  }
};

// Easing functions for organic animations
export const OrganicEasing = {
  // Smooth organic ease in/out
  organic: (t) => {
    return t * t * (3 - 2 * t);
  },
  
  // Elastic organic movement
  elasticOrganic: (t) => {
    if (t === 0 || t === 1) return t;
    return Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
  },
  
  // Bouncy organic movement
  bounceOrganic: (t) => {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
  },
  
  // Sine wave easing for natural movement
  sineInOut: (t) => {
    return 0.5 * (1 - Math.cos(Math.PI * t));
  }
};

// Noise generation for organic randomness
export class OrganicNoise {
  constructor(seed = Math.random()) {
    this.seed = seed;
  }

  // Simple noise function
  noise(x, y = 0, z = 0) {
    const n = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
    return (n - Math.floor(n)) * 2 - 1;
  }

  // Smooth noise with interpolation
  smoothNoise(x, y = 0) {
    const intX = Math.floor(x);
    const intY = Math.floor(y);
    const fracX = x - intX;
    const fracY = y - intY;

    const a = this.noise(intX, intY);
    const b = this.noise(intX + 1, intY);
    const c = this.noise(intX, intY + 1);
    const d = this.noise(intX + 1, intY + 1);

    const i1 = this.interpolate(a, b, fracX);
    const i2 = this.interpolate(c, d, fracX);

    return this.interpolate(i1, i2, fracY);
  }

  // Cosine interpolation for smooth transitions
  interpolate(a, b, x) {
    const ft = x * Math.PI;
    const f = (1 - Math.cos(ft)) * 0.5;
    return a * (1 - f) + b * f;
  }

  // Fractal noise for complex organic patterns
  fractalNoise(x, y, octaves = 4) {
    let value = 0;
    let amplitude = 1;
    let frequency = 1;
    let maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      value += this.smoothNoise(x * frequency, y * frequency) * amplitude;
      maxValue += amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }

    return value / maxValue;
  }
}

// Utility function to create organic movement for multiple objects
export const createOrganicMovementField = (objects, config = {}) => {
  const movements = objects.map((obj, index) => {
    return new OrganicMovement({
      ...config,
      phase: (index / objects.length) * Math.PI * 2,
      randomSeed: Math.random()
    });
  });

  return {
    movements,
    update: (deltaTime) => {
      movements.forEach(movement => movement.update(deltaTime));
    },
    getPositions: (time) => {
      return movements.map((movement, index) => ({
        x: movement.getX(time, objects[index].baseX || 0),
        y: movement.getY(time, objects[index].baseY || 0),
        rotation: movement.getRotation(time),
        scale: movement.getScale(time, objects[index].baseScale || 1)
      }));
    }
  };
};