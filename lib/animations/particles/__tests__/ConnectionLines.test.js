/**
 * Connection Lines Tests
 * Basic functionality tests for the connection lines system
 */

import ConnectionLines from '../ConnectionLines.js';

// Mock WebGL context for testing
const createMockGL = () => {
  const mockBuffer = {};
  const mockProgram = {};
  const mockShader = {};
  
  return {
    createBuffer: () => mockBuffer,
    createProgram: () => mockProgram,
    createShader: () => mockShader,
    attachShader: () => {},
    linkProgram: () => {},
    getProgramParameter: () => true,
    getShaderParameter: () => true,
    shaderSource: () => {},
    compileShader: () => {},
    deleteShader: () => {},
    useProgram: () => {},
    getUniformLocation: () => 0,
    getAttribLocation: () => 0,
    enableVertexAttribArray: () => {},
    bindBuffer: () => {},
    bufferData: () => {},
    vertexAttribPointer: () => {},
    uniform2f: () => {},
    uniform1f: () => {},
    uniform3f: () => {},
    uniform1i: () => {},
    enable: () => {},
    blendFunc: () => {},
    drawArrays: () => {},
    deleteBuffer: () => {},
    deleteProgram: () => {},
    VERTEX_SHADER: 35633,
    FRAGMENT_SHADER: 35632,
    LINK_STATUS: 35714,
    COMPILE_STATUS: 35713,
    ARRAY_BUFFER: 34962,
    DYNAMIC_DRAW: 35048,
    LINES: 1,
    BLEND: 3042,
    SRC_ALPHA: 770,
    ONE_MINUS_SRC_ALPHA: 771
  };
};

// Mock particles for testing
const createMockParticles = (count = 10) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * 800,
      y: Math.random() * 600,
      size: 2 + Math.random() * 3,
      opacity: 0.5 + Math.random() * 0.5
    });
  }
  return particles;
};

describe('ConnectionLines', () => {
  let mockGL;
  let connectionLines;

  beforeEach(() => {
    mockGL = createMockGL();
    connectionLines = new ConnectionLines(mockGL, {
      maxDistance: 100,
      maxConnections: 50,
      opacity: 0.3,
      color: '#384bff'
    });
  });

  afterEach(() => {
    if (connectionLines) {
      connectionLines.destroy();
    }
  });

  test('should initialize with default configuration', () => {
    expect(connectionLines.config.maxDistance).toBe(100);
    expect(connectionLines.config.maxConnections).toBe(50);
    expect(connectionLines.config.opacity).toBe(0.3);
    expect(connectionLines.config.color).toBe('#384bff');
  });

  test('should calculate connections between nearby particles', () => {
    const particles = [
      { x: 0, y: 0 },
      { x: 50, y: 0 }, // 50px away - should connect
      { x: 200, y: 0 } // 200px away - should not connect
    ];

    connectionLines.calculateConnections(particles);
    
    expect(connectionLines.connections.length).toBe(1);
    expect(connectionLines.connections[0].startX).toBe(0);
    expect(connectionLines.connections[0].startY).toBe(0);
    expect(connectionLines.connections[0].endX).toBe(50);
    expect(connectionLines.connections[0].endY).toBe(0);
  });

  test('should respect maximum connection limit', () => {
    const connectionLinesLimited = new ConnectionLines(mockGL, {
      maxDistance: 1000, // Large distance to connect all
      maxConnections: 5,
      opacity: 0.3
    });

    const particles = createMockParticles(20); // Many particles
    connectionLinesLimited.calculateConnections(particles);
    
    expect(connectionLinesLimited.connections.length).toBeLessThanOrEqual(5);
    
    connectionLinesLimited.destroy();
  });

  test('should calculate opacity based on distance', () => {
    const particles = [
      { x: 0, y: 0 },
      { x: 25, y: 0 }, // 25px away - should have higher opacity
      { x: 75, y: 0 }  // 75px away - should have lower opacity
    ];

    connectionLines.calculateConnections(particles);
    
    expect(connectionLines.connections.length).toBe(2);
    
    // Closer particles should have higher opacity
    const connection1 = connectionLines.connections.find(c => c.endX === 25);
    const connection2 = connectionLines.connections.find(c => c.endX === 75);
    
    expect(connection1.opacity).toBeGreaterThan(connection2.opacity);
  });

  test('should update configuration correctly', () => {
    const newConfig = {
      maxDistance: 150,
      opacity: 0.5,
      color: '#ff0000'
    };

    connectionLines.updateConfig(newConfig);
    
    expect(connectionLines.config.maxDistance).toBe(150);
    expect(connectionLines.config.opacity).toBe(0.5);
    expect(connectionLines.config.color).toBe('#ff0000');
  });

  test('should provide metrics', () => {
    const particles = createMockParticles(5);
    connectionLines.calculateConnections(particles);
    
    const metrics = connectionLines.getMetrics();
    
    expect(metrics).toHaveProperty('connectionCount');
    expect(metrics).toHaveProperty('maxConnections');
    expect(metrics).toHaveProperty('maxDistance');
    expect(metrics).toHaveProperty('opacity');
    expect(typeof metrics.connectionCount).toBe('number');
  });

  test('should convert hex colors to RGB correctly', () => {
    const rgb1 = connectionLines.hexToRgb('#384bff');
    expect(rgb1.r).toBe(56);
    expect(rgb1.g).toBe(75);
    expect(rgb1.b).toBe(255);

    const rgb2 = connectionLines.hexToRgb('#ff0000');
    expect(rgb2.r).toBe(255);
    expect(rgb2.g).toBe(0);
    expect(rgb2.b).toBe(0);

    // Test invalid hex - should return default
    const rgb3 = connectionLines.hexToRgb('invalid');
    expect(rgb3.r).toBe(56);
    expect(rgb3.g).toBe(75);
    expect(rgb3.b).toBe(255);
  });

  test('should handle empty particle array', () => {
    connectionLines.calculateConnections([]);
    
    expect(connectionLines.connections.length).toBe(0);
    expect(connectionLines.connectionCount).toBe(0);
  });

  test('should handle single particle', () => {
    const particles = [{ x: 100, y: 100 }];
    connectionLines.calculateConnections(particles);
    
    expect(connectionLines.connections.length).toBe(0);
    expect(connectionLines.connectionCount).toBe(0);
  });
});

export default ConnectionLines;