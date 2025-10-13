/**
 * Mouse Interaction System
 * Handles smooth mouse tracking and magnetic field simulation for particles
 */

class MouseInteraction {
  constructor(config = {}) {
    this.config = {
      // Interaction settings
      influenceRadius: 150,
      maxForce: 2.0,
      smoothingFactor: 0.1,
      delayFrames: 3,
      
      // Magnetic field settings
      attractionStrength: 1.0,
      repulsionStrength: 1.5,
      magneticDecay: 0.95,
      
      // Cursor following
      followDelay: 0.05,
      followStrength: 0.8,
      interpolationSpeed: 0.15,
      
      ...config
    };
    
    // Mouse state
    this.currentPosition = { x: 0, y: 0 };
    this.smoothPosition = { x: 0, y: 0 };
    this.velocity = { x: 0, y: 0 };
    this.previousPositions = [];
    
    // Interaction state
    this.isActive = false;
    this.lastUpdateTime = 0;
    this.magneticField = new Map();
    
    // Performance tracking
    this.frameCount = 0;
    this.lastPerformanceCheck = 0;
  }

  /**
   * Update mouse position with smooth interpolation
   */
  updatePosition(x, y, deltaTime) {
    // Store previous position for velocity calculation
    const prevX = this.currentPosition.x;
    const prevY = this.currentPosition.y;
    
    // Update current position
    this.currentPosition.x = x;
    this.currentPosition.y = y;
    
    // Calculate velocity
    if (deltaTime > 0) {
      this.velocity.x = (x - prevX) / deltaTime;
      this.velocity.y = (y - prevY) / deltaTime;
    }
    
    // Smooth position interpolation
    const smoothing = this.config.smoothingFactor;
    this.smoothPosition.x += (x - this.smoothPosition.x) * smoothing;
    this.smoothPosition.y += (y - this.smoothPosition.y) * smoothing;
    
    // Store position history for delayed following
    this.previousPositions.push({ 
      x: x, 
      y: y, 
      time: performance.now() 
    });
    
    // Limit history size
    const maxHistory = this.config.delayFrames * 2;
    if (this.previousPositions.length > maxHistory) {
      this.previousPositions.shift();
    }
    
    this.isActive = true;
    this.lastUpdateTime = performance.now();
  }

  /**
   * Get delayed position for cursor following effect
   */
  getDelayedPosition(delay = null) {
    const targetDelay = delay || this.config.followDelay;
    const currentTime = performance.now();
    const targetTime = currentTime - (targetDelay * 1000);
    
    // Find closest position in history
    let closestPosition = this.currentPosition;
    let minTimeDiff = Infinity;
    
    for (const pos of this.previousPositions) {
      const timeDiff = Math.abs(pos.time - targetTime);
      if (timeDiff < minTimeDiff) {
        minTimeDiff = timeDiff;
        closestPosition = pos;
      }
    }
    
    return closestPosition;
  }

  /**
   * Calculate magnetic field influence on a particle
   */
  calculateMagneticInfluence(particle) {
    const mousePos = this.getInterpolatedPosition();
    const dx = mousePos.x - particle.x;
    const dy = mousePos.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance === 0 || distance > this.config.influenceRadius) {
      return { fx: 0, fy: 0, strength: 0 };
    }
    
    // Calculate normalized direction
    const dirX = dx / distance;
    const dirY = dy / distance;
    
    // Calculate influence strength (inverse square law with smoothing)
    const normalizedDistance = distance / this.config.influenceRadius;
    const influence = Math.pow(1 - normalizedDistance, 2);
    
    // Determine force type based on velocity and distance
    let forceStrength;
    const velocityMagnitude = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
    
    if (velocityMagnitude > 100) {
      // High velocity = repulsion
      forceStrength = -this.config.repulsionStrength * influence;
    } else {
      // Low velocity = subtle attraction
      forceStrength = this.config.attractionStrength * influence * 0.3;
    }
    
    // Apply maximum force limit
    forceStrength = Math.max(-this.config.maxForce, Math.min(this.config.maxForce, forceStrength));
    
    return {
      fx: dirX * forceStrength,
      fy: dirY * forceStrength,
      strength: Math.abs(influence)
    };
  }

  /**
   * Get interpolated mouse position for smooth following
   */
  getInterpolatedPosition() {
    const target = this.getDelayedPosition();
    const current = this.smoothPosition;
    const speed = this.config.interpolationSpeed;
    
    return {
      x: current.x + (target.x - current.x) * speed,
      y: current.y + (target.y - current.y) * speed
    };
  }

  /**
   * Apply magnetic field to particle
   */
  applyMagneticField(particle, deltaTime) {
    if (!this.isActive) return;
    
    const influence = this.calculateMagneticInfluence(particle);
    
    if (influence.strength > 0) {
      // Apply force with time-based scaling
      const timeScale = deltaTime * 60; // Normalize for 60fps
      
      particle.vx += influence.fx * timeScale * this.config.followStrength;
      particle.vy += influence.fy * timeScale * this.config.followStrength;
      
      // Apply velocity damping to prevent excessive acceleration
      const damping = 0.98;
      particle.vx *= damping;
      particle.vy *= damping;
      
      // Store magnetic field data for visualization
      const particleId = particle.id || `${particle.x}_${particle.y}`;
      this.magneticField.set(particleId, {
        strength: influence.strength,
        force: { x: influence.fx, y: influence.fy },
        distance: Math.sqrt(
          Math.pow(this.currentPosition.x - particle.x, 2) + 
          Math.pow(this.currentPosition.y - particle.y, 2)
        )
      });
    }
  }

  /**
   * Create cursor following behavior for particle
   */
  applyCursorFollowing(particle, deltaTime) {
    if (!this.isActive) return;
    
    const delayedPos = this.getDelayedPosition(this.config.followDelay);
    const dx = delayedPos.x - particle.x;
    const dy = delayedPos.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 5) { // Minimum distance threshold
      const followStrength = this.config.followStrength * deltaTime * 60;
      const maxFollowDistance = 200;
      
      if (distance < maxFollowDistance) {
        const normalizedDistance = distance / maxFollowDistance;
        const strength = followStrength * (1 - normalizedDistance);
        
        particle.vx += (dx / distance) * strength;
        particle.vy += (dy / distance) * strength;
      }
    }
  }

  /**
   * Update magnetic field decay
   */
  updateMagneticField(deltaTime) {
    const currentTime = performance.now();
    
    // Decay magnetic field strength over time
    for (const [particleId, fieldData] of this.magneticField.entries()) {
      fieldData.strength *= this.config.magneticDecay;
      
      // Remove weak fields
      if (fieldData.strength < 0.01) {
        this.magneticField.delete(particleId);
      }
    }
    
    // Check if mouse has been inactive
    if (currentTime - this.lastUpdateTime > 100) {
      this.isActive = false;
      this.velocity.x *= 0.9;
      this.velocity.y *= 0.9;
    }
  }

  /**
   * Get current mouse state
   */
  getMouseState() {
    return {
      position: { ...this.currentPosition },
      smoothPosition: { ...this.smoothPosition },
      velocity: { ...this.velocity },
      isActive: this.isActive,
      influenceRadius: this.config.influenceRadius
    };
  }

  /**
   * Get magnetic field visualization data
   */
  getMagneticFieldData() {
    return Array.from(this.magneticField.entries()).map(([id, data]) => ({
      particleId: id,
      ...data
    }));
  }

  /**
   * Set interaction configuration
   */
  updateConfig(newConfig) {
    Object.assign(this.config, newConfig);
  }

  /**
   * Enable/disable mouse interaction
   */
  setActive(active) {
    this.isActive = active;
    
    if (!active) {
      this.velocity.x = 0;
      this.velocity.y = 0;
      this.magneticField.clear();
    }
  }

  /**
   * Reset interaction state
   */
  reset() {
    this.currentPosition = { x: 0, y: 0 };
    this.smoothPosition = { x: 0, y: 0 };
    this.velocity = { x: 0, y: 0 };
    this.previousPositions = [];
    this.magneticField.clear();
    this.isActive = false;
  }

  /**
   * Get performance metrics
   */
  getMetrics() {
    return {
      isActive: this.isActive,
      velocityMagnitude: Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y),
      magneticFieldSize: this.magneticField.size,
      positionHistorySize: this.previousPositions.length,
      config: { ...this.config }
    };
  }
}

export default MouseInteraction;