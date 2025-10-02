/**
 * Scroll Parallax System
 * Handles multi-layer particle movement with depth-based parallax effects
 */

class ScrollParallax {
  constructor(config = {}) {
    this.config = {
      // Parallax layers
      layerCount: 3,
      depthRange: { min: 0.2, max: 1.0 },
      
      // Scroll settings
      scrollSensitivity: 1.0,
      velocityInfluence: 0.5,
      maxVelocity: 10.0,
      
      // Movement settings
      horizontalParallax: true,
      verticalParallax: true,
      rotationParallax: false,
      
      // Smoothing
      smoothingFactor: 0.1,
      velocityDecay: 0.95,
      
      ...config
    };
    
    // Scroll state
    this.currentScroll = { x: 0, y: 0 };
    this.previousScroll = { x: 0, y: 0 };
    this.scrollVelocity = { x: 0, y: 0 };
    this.smoothVelocity = { x: 0, y: 0 };
    
    // Parallax layers
    this.layers = [];
    this.initializeLayers();
    
    // Performance tracking
    this.lastUpdateTime = 0;
    this.frameCount = 0;
  }

  /**
   * Initialize parallax layers with different speeds
   */
  initializeLayers() {
    this.layers = [];
    
    for (let i = 0; i < this.config.layerCount; i++) {
      const depth = this.config.depthRange.min + 
                   (i / (this.config.layerCount - 1)) * 
                   (this.config.depthRange.max - this.config.depthRange.min);
      
      this.layers.push({
        depth: depth,
        speed: this.calculateLayerSpeed(depth),
        offset: { x: 0, y: 0 },
        particles: []
      });
    }
  }

  /**
   * Calculate parallax speed based on depth
   */
  calculateLayerSpeed(depth) {
    // Closer objects (higher depth) move faster
    // Further objects (lower depth) move slower
    return {
      x: depth * this.config.scrollSensitivity,
      y: depth * this.config.scrollSensitivity * 0.8, // Slightly less vertical movement
      rotation: depth * 0.1 // Subtle rotation effect
    };
  }

  /**
   * Assign particle to appropriate layer based on Z-depth
   */
  assignParticleToLayer(particle) {
    // Use particle's z value to determine layer
    const z = particle.z || Math.random();
    const layerIndex = Math.floor(z * this.config.layerCount);
    const clampedIndex = Math.max(0, Math.min(this.config.layerCount - 1, layerIndex));
    
    // Store layer info in particle
    particle.parallaxLayer = clampedIndex;
    particle.parallaxDepth = this.layers[clampedIndex].depth;
    
    return clampedIndex;
  }

  /**
   * Update scroll position and calculate velocity
   */
  updateScroll(scrollX, scrollY, deltaTime) {
    // Store previous position
    this.previousScroll.x = this.currentScroll.x;
    this.previousScroll.y = this.currentScroll.y;
    
    // Update current position
    this.currentScroll.x = scrollX;
    this.currentScroll.y = scrollY;
    
    // Calculate raw velocity
    if (deltaTime > 0) {
      const rawVelX = (scrollX - this.previousScroll.x) / deltaTime;
      const rawVelY = (scrollY - this.previousScroll.y) / deltaTime;
      
      // Apply smoothing to velocity
      const smoothing = this.config.smoothingFactor;
      this.scrollVelocity.x += (rawVelX - this.scrollVelocity.x) * smoothing;
      this.scrollVelocity.y += (rawVelY - this.scrollVelocity.y) * smoothing;
      
      // Clamp velocity to maximum
      this.scrollVelocity.x = Math.max(-this.config.maxVelocity, 
                                      Math.min(this.config.maxVelocity, this.scrollVelocity.x));
      this.scrollVelocity.y = Math.max(-this.config.maxVelocity, 
                                      Math.min(this.config.maxVelocity, this.scrollVelocity.y));
    }
    
    // Update smooth velocity for effects
    this.smoothVelocity.x += (this.scrollVelocity.x - this.smoothVelocity.x) * 0.05;
    this.smoothVelocity.y += (this.scrollVelocity.y - this.smoothVelocity.y) * 0.05;
    
    // Update layer offsets
    this.updateLayerOffsets(deltaTime);
    
    // Apply velocity decay
    this.scrollVelocity.x *= this.config.velocityDecay;
    this.scrollVelocity.y *= this.config.velocityDecay;
    
    this.lastUpdateTime = performance.now();
  }

  /**
   * Update parallax layer offsets
   */
  updateLayerOffsets(deltaTime) {
    for (let i = 0; i < this.layers.length; i++) {
      const layer = this.layers[i];
      const speed = layer.speed;
      
      // Calculate base parallax offset
      if (this.config.horizontalParallax) {
        layer.offset.x = this.currentScroll.x * speed.x * -0.1;
      }
      
      if (this.config.verticalParallax) {
        layer.offset.y = this.currentScroll.y * speed.y * -0.1;
      }
      
      // Add velocity-based movement
      const velocityInfluence = this.config.velocityInfluence;
      layer.offset.x += this.smoothVelocity.x * speed.x * velocityInfluence * 0.01;
      layer.offset.y += this.smoothVelocity.y * speed.y * velocityInfluence * 0.01;
    }
  }

  /**
   * Apply parallax effect to particle
   */
  applyParallaxToParticle(particle, deltaTime) {
    // Assign to layer if not already assigned
    if (particle.parallaxLayer === undefined) {
      this.assignParticleToLayer(particle);
    }
    
    const layerIndex = particle.parallaxLayer;
    const layer = this.layers[layerIndex];
    
    if (!layer) return;
    
    // Apply layer offset to particle position
    const parallaxOffset = this.calculateParticleOffset(particle, layer);
    
    // Apply horizontal parallax
    if (this.config.horizontalParallax) {
      particle.x += parallaxOffset.x * deltaTime * 60; // Normalize for 60fps
    }
    
    // Apply vertical parallax
    if (this.config.verticalParallax) {
      particle.y += parallaxOffset.y * deltaTime * 60;
    }
    
    // Apply velocity influence to particle movement
    this.applyVelocityInfluence(particle, deltaTime);
    
    // Apply rotation if enabled
    if (this.config.rotationParallax && particle.rotation !== undefined) {
      particle.rotation += parallaxOffset.rotation * deltaTime;
    }
  }

  /**
   * Calculate parallax offset for specific particle
   */
  calculateParticleOffset(particle, layer) {
    const depth = particle.parallaxDepth || layer.depth;
    const speed = layer.speed;
    
    // Base parallax movement
    let offsetX = 0;
    let offsetY = 0;
    let offsetRotation = 0;
    
    // Scroll-based offset
    if (this.config.horizontalParallax) {
      offsetX = this.scrollVelocity.x * speed.x * 0.001;
    }
    
    if (this.config.verticalParallax) {
      offsetY = this.scrollVelocity.y * speed.y * 0.001;
    }
    
    // Add depth-based variation
    const depthMultiplier = 1 + (depth - 0.5) * 0.5;
    offsetX *= depthMultiplier;
    offsetY *= depthMultiplier;
    
    // Rotation based on scroll velocity
    if (this.config.rotationParallax) {
      offsetRotation = (this.scrollVelocity.x + this.scrollVelocity.y) * speed.rotation * 0.0001;
    }
    
    return {
      x: offsetX,
      y: offsetY,
      rotation: offsetRotation
    };
  }

  /**
   * Apply scroll velocity influence to particle behavior
   */
  applyVelocityInfluence(particle, deltaTime) {
    const influence = this.config.velocityInfluence;
    const depth = particle.parallaxDepth || 0.5;
    
    // Velocity affects particle movement direction
    const velocityMagnitude = Math.sqrt(
      this.scrollVelocity.x * this.scrollVelocity.x + 
      this.scrollVelocity.y * this.scrollVelocity.y
    );
    
    if (velocityMagnitude > 0.1) {
      // Normalize velocity direction
      const velDirX = this.scrollVelocity.x / velocityMagnitude;
      const velDirY = this.scrollVelocity.y / velocityMagnitude;
      
      // Apply influence based on depth and velocity
      const forceStrength = Math.min(velocityMagnitude * 0.01, 1.0) * influence * depth;
      
      particle.vx += velDirX * forceStrength * deltaTime * 60;
      particle.vy += velDirY * forceStrength * deltaTime * 60;
    }
  }

  /**
   * Get parallax layer for particle
   */
  getParticleLayer(particle) {
    const layerIndex = particle.parallaxLayer;
    return layerIndex !== undefined ? this.layers[layerIndex] : null;
  }

  /**
   * Update particle Z-depth and reassign layer
   */
  updateParticleDepth(particle, newZ) {
    particle.z = newZ;
    this.assignParticleToLayer(particle);
  }

  /**
   * Get scroll velocity magnitude
   */
  getScrollVelocityMagnitude() {
    return Math.sqrt(
      this.scrollVelocity.x * this.scrollVelocity.x + 
      this.scrollVelocity.y * this.scrollVelocity.y
    );
  }

  /**
   * Get current scroll state
   */
  getScrollState() {
    return {
      position: { ...this.currentScroll },
      velocity: { ...this.scrollVelocity },
      smoothVelocity: { ...this.smoothVelocity },
      layers: this.layers.map(layer => ({
        depth: layer.depth,
        speed: { ...layer.speed },
        offset: { ...layer.offset }
      }))
    };
  }

  /**
   * Set parallax configuration
   */
  updateConfig(newConfig) {
    const oldLayerCount = this.config.layerCount;
    Object.assign(this.config, newConfig);
    
    // Reinitialize layers if count changed
    if (this.config.layerCount !== oldLayerCount) {
      this.initializeLayers();
    }
  }

  /**
   * Enable/disable specific parallax effects
   */
  setParallaxEnabled(horizontal, vertical, rotation = false) {
    this.config.horizontalParallax = horizontal;
    this.config.verticalParallax = vertical;
    this.config.rotationParallax = rotation;
  }

  /**
   * Reset parallax state
   */
  reset() {
    this.currentScroll = { x: 0, y: 0 };
    this.previousScroll = { x: 0, y: 0 };
    this.scrollVelocity = { x: 0, y: 0 };
    this.smoothVelocity = { x: 0, y: 0 };
    
    // Reset layer offsets
    this.layers.forEach(layer => {
      layer.offset = { x: 0, y: 0 };
    });
  }

  /**
   * Get performance metrics
   */
  getMetrics() {
    return {
      layerCount: this.layers.length,
      scrollVelocityMagnitude: this.getScrollVelocityMagnitude(),
      currentScroll: { ...this.currentScroll },
      config: { ...this.config }
    };
  }
}

export default ScrollParallax;