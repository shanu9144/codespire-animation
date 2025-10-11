/**
 * WebGL-based Connection Lines System
 * Renders lines between nearby particles with dynamic opacity
 */

class ConnectionLines {
  constructor(gl, config = {}) {
    this.gl = gl;
    this.program = null;
    this.connections = [];
    this.connectionBuffer = null;
    
    // Configuration with defaults
    this.config = {
      maxDistance: 100,
      maxConnections: 500, // Performance limit
      opacity: 0.2,
      color: '#384bff',
      lineWidth: 1.0,
      enablePulse: true,
      enableDistanceFade: true,
      ...config
    };
    
    // WebGL resources
    this.buffers = {};
    this.uniforms = {};
    this.attributes = {};
    
    // Performance tracking
    this.connectionCount = 0;
    this.lastUpdateTime = 0;
    
    this.initialize();
  }

  /**
   * Initialize WebGL resources for connection lines
   */
  initialize() {
    try {
      this.createShaderProgram();
      this.createBuffers();
      this.setupUniforms();
      console.log('ConnectionLines initialized');
    } catch (error) {
      console.error('Failed to initialize ConnectionLines:', error);
      throw error;
    }
  }

  /**
   * Create shader program for connection lines
   */
  createShaderProgram() {
    const gl = this.gl;
    
    // Vertex shader source
    const vertexShaderSource = `
      attribute vec2 a_startPosition;
      attribute vec2 a_endPosition;
      attribute float a_opacity;
      
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_lineWidth;
      
      varying float v_opacity;
      varying float v_progress;
      
      void main() {
        // Calculate line progress based on vertex index
        float vertexIndex = float(gl_VertexID);
        v_progress = mod(vertexIndex, 2.0);
        
        // Choose position based on vertex index
        vec2 position = mix(a_startPosition, a_endPosition, v_progress);
        
        // Convert from pixels to clip space
        vec2 clipSpace = ((position / u_resolution) * 2.0) - 1.0;
        
        // Flip Y coordinate
        clipSpace.y = -clipSpace.y;
        
        gl_Position = vec4(clipSpace, 0.0, 1.0);
        
        // Pass opacity to fragment shader
        v_opacity = a_opacity;
      }
    `;
    
    // Fragment shader source
    const fragmentShaderSource = `
      precision mediump float;
      
      uniform vec3 u_color;
      uniform float u_time;
      uniform bool u_enablePulse;
      uniform bool u_enableDistanceFade;
      
      varying float v_opacity;
      varying float v_progress;
      
      void main() {
        float alpha = v_opacity;
        
        // Add subtle pulse effect along the line
        if (u_enablePulse) {
          float pulse = sin(u_time * 2.0 + v_progress * 6.28) * 0.1 + 0.9;
          alpha *= pulse;
        }
        
        // Add distance-based fade from center
        if (u_enableDistanceFade) {
          float fade = 1.0 - abs(v_progress - 0.5) * 2.0;
          fade = smoothstep(0.0, 1.0, fade);
          alpha *= fade;
        }
        
        gl_FragColor = vec4(u_color, alpha);
      }
    `;
    
    // Create shaders
    const vertexShader = this.createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    // Create program
    this.program = gl.createProgram();
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);
    
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      throw new Error('Failed to link connection shader program: ' + gl.getProgramInfoLog(this.program));
    }
    
    // Clean up shaders
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
  }

  /**
   * Create individual shader
   */
  createShader(type, source) {
    const gl = this.gl;
    const shader = gl.createShader(type);
    
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const error = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error('Failed to compile connection shader: ' + error);
    }
    
    return shader;
  }

  /**
   * Create WebGL buffers for connection data
   */
  createBuffers() {
    const gl = this.gl;
    
    // Start position buffer
    this.buffers.startPosition = gl.createBuffer();
    
    // End position buffer
    this.buffers.endPosition = gl.createBuffer();
    
    // Opacity buffer
    this.buffers.opacity = gl.createBuffer();
  }

  /**
   * Set up shader uniforms and attributes
   */
  setupUniforms() {
    const gl = this.gl;
    
    gl.useProgram(this.program);
    
    // Get uniform locations
    this.uniforms.resolution = gl.getUniformLocation(this.program, 'u_resolution');
    this.uniforms.time = gl.getUniformLocation(this.program, 'u_time');
    this.uniforms.color = gl.getUniformLocation(this.program, 'u_color');
    this.uniforms.lineWidth = gl.getUniformLocation(this.program, 'u_lineWidth');
    this.uniforms.enablePulse = gl.getUniformLocation(this.program, 'u_enablePulse');
    this.uniforms.enableDistanceFade = gl.getUniformLocation(this.program, 'u_enableDistanceFade');
    
    // Get attribute locations
    this.attributes.startPosition = gl.getAttribLocation(this.program, 'a_startPosition');
    this.attributes.endPosition = gl.getAttribLocation(this.program, 'a_endPosition');
    this.attributes.opacity = gl.getAttribLocation(this.program, 'a_opacity');
    
    // Enable attributes
    gl.enableVertexAttribArray(this.attributes.startPosition);
    gl.enableVertexAttribArray(this.attributes.endPosition);
    gl.enableVertexAttribArray(this.attributes.opacity);
  }

  /**
   * Calculate connections between particles
   */
  calculateConnections(particles) {
    this.connections = [];
    this.connectionCount = 0;
    
    const maxDistance = this.config.maxDistance;
    const maxConnections = this.config.maxConnections;
    
    // Calculate distances and create connections
    for (let i = 0; i < particles.length && this.connectionCount < maxConnections; i++) {
      const particleA = particles[i];
      
      for (let j = i + 1; j < particles.length && this.connectionCount < maxConnections; j++) {
        const particleB = particles[j];
        
        const dx = particleA.x - particleB.x;
        const dy = particleA.y - particleB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          // Calculate opacity based on distance
          const opacity = (1 - distance / maxDistance) * this.config.opacity;
          
          this.connections.push({
            startX: particleA.x,
            startY: particleA.y,
            endX: particleB.x,
            endY: particleB.y,
            opacity: opacity,
            distance: distance
          });
          
          this.connectionCount++;
        }
      }
    }
  }

  /**
   * Update connection buffers with new data
   */
  updateBuffers() {
    if (this.connections.length === 0) return;
    
    const gl = this.gl;
    const connectionCount = this.connections.length;
    
    // Prepare data arrays (2 vertices per line)
    const startPositions = new Float32Array(connectionCount * 4); // 2 vertices * 2 coords
    const endPositions = new Float32Array(connectionCount * 4);
    const opacities = new Float32Array(connectionCount * 2); // 2 vertices per line
    
    // Fill arrays with connection data
    for (let i = 0; i < connectionCount; i++) {
      const connection = this.connections[i];
      const idx4 = i * 4;
      const idx2 = i * 2;
      
      // Start positions (both vertices get same start position)
      startPositions[idx4] = connection.startX;
      startPositions[idx4 + 1] = connection.startY;
      startPositions[idx4 + 2] = connection.startX;
      startPositions[idx4 + 3] = connection.startY;
      
      // End positions (both vertices get same end position)
      endPositions[idx4] = connection.endX;
      endPositions[idx4 + 1] = connection.endY;
      endPositions[idx4 + 2] = connection.endX;
      endPositions[idx4 + 3] = connection.endY;
      
      // Opacity (both vertices get same opacity)
      opacities[idx2] = connection.opacity;
      opacities[idx2 + 1] = connection.opacity;
    }
    
    // Update start position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.startPosition);
    gl.bufferData(gl.ARRAY_BUFFER, startPositions, gl.DYNAMIC_DRAW);
    
    // Update end position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.endPosition);
    gl.bufferData(gl.ARRAY_BUFFER, endPositions, gl.DYNAMIC_DRAW);
    
    // Update opacity buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.opacity);
    gl.bufferData(gl.ARRAY_BUFFER, opacities, gl.DYNAMIC_DRAW);
  }

  /**
   * Render connection lines
   */
  render(canvas) {
    if (this.connections.length === 0 || !this.program) return;
    
    const gl = this.gl;
    
    // Use connection shader program
    gl.useProgram(this.program);
    
    // Set uniforms
    gl.uniform2f(this.uniforms.resolution, canvas.width, canvas.height);
    gl.uniform1f(this.uniforms.time, performance.now() * 0.001);
    gl.uniform1f(this.uniforms.lineWidth, this.config.lineWidth);
    gl.uniform1i(this.uniforms.enablePulse, this.config.enablePulse);
    gl.uniform1i(this.uniforms.enableDistanceFade, this.config.enableDistanceFade);
    
    // Set color
    const color = this.hexToRgb(this.config.color);
    gl.uniform3f(this.uniforms.color, color.r / 255, color.g / 255, color.b / 255);
    
    // Bind start position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.startPosition);
    gl.vertexAttribPointer(this.attributes.startPosition, 2, gl.FLOAT, false, 0, 0);
    
    // Bind end position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.endPosition);
    gl.vertexAttribPointer(this.attributes.endPosition, 2, gl.FLOAT, false, 0, 0);
    
    // Bind opacity buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.opacity);
    gl.vertexAttribPointer(this.attributes.opacity, 1, gl.FLOAT, false, 0, 0);
    
    // Enable line rendering
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    // Draw lines
    gl.drawArrays(gl.LINES, 0, this.connections.length * 2);
  }

  /**
   * Update connections based on particles
   */
  update(particles) {
    // Throttle connection calculations for performance
    const now = performance.now();
    if (now - this.lastUpdateTime < 16) return; // ~60fps limit
    
    this.lastUpdateTime = now;
    
    // Calculate new connections
    this.calculateConnections(particles);
    
    // Update buffers
    this.updateBuffers();
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig) {
    Object.assign(this.config, newConfig);
  }

  /**
   * Get connection metrics for debugging
   */
  getMetrics() {
    return {
      connectionCount: this.connectionCount,
      maxConnections: this.config.maxConnections,
      maxDistance: this.config.maxDistance,
      opacity: this.config.opacity
    };
  }

  /**
   * Convert hex color to RGB
   */
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 56, g: 75, b: 255 }; // Default to #384bff
  }

  /**
   * Cleanup resources
   */
  destroy() {
    const gl = this.gl;
    
    if (gl) {
      // Delete buffers
      Object.values(this.buffers).forEach(buffer => {
        if (buffer) gl.deleteBuffer(buffer);
      });
      
      // Delete program
      if (this.program) {
        gl.deleteProgram(this.program);
      }
    }
    
    this.connections = [];
    this.program = null;
    
    console.log('ConnectionLines destroyed');
  }
}

export default ConnectionLines;