"use client";

import React, { useEffect, useRef, useCallback, useState } from 'react';

/**
 * LiquidShaderEffect Component
 * 
 * Advanced WebGL-based liquid animation using custom shaders
 * Features:
 * - Noise-based distortion and flow animations
 * - Multi-octave fractal noise for complex patterns
 * - Mouse interaction with liquid density
 * - Performance-optimized rendering
 * - Configurable flow parameters and colors
 */

const LiquidShaderEffect = ({
  width = 800,
  height = 600,
  colors = ['#384bff', '#5865f2', '#7c3aed'],
  opacity = 0.6,
  flowSpeed = 0.5,
  turbulence = 1.0,
  viscosity = 0.3,
  flowDirection = [1.0, 0.5],
  noiseScale = 0.01,
  distortionStrength = 20.0,
  className = '',
  style = {},
  onPerformanceChange,
  ...props
}) => {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const mouseRef = useRef({ x: 0, y: 0 });
  const performanceRef = useRef({ fps: 60, frameCount: 0, lastTime: 0 });
  
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  const [performanceMode, setPerformanceMode] = useState('high');

  // Vertex shader source
  const vertexShaderSource = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_noiseScale;
    uniform float u_distortionStrength;
    uniform vec2 u_flowDirection;
    
    varying vec2 v_texCoord;
    varying vec2 v_worldPosition;
    varying float v_noise;
    
    // Simplex noise function
    vec3 permute(vec3 x) {
      return mod(((x * 34.0) + 1.0) * x, 289.0);
    }
    
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
      m = m * m;
      m = m * m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }
    
    void main() {
      v_worldPosition = a_position;
      v_texCoord = a_texCoord;
      
      vec2 noisePos = a_position * u_noiseScale;
      vec2 flowPos = noisePos + u_flowDirection * u_time * 0.1;
      
      float noise1 = snoise(flowPos) * 0.5;
      float noise2 = snoise(flowPos * 2.0 + u_time * 0.3) * 0.25;
      float noise3 = snoise(flowPos * 4.0 - u_time * 0.2) * 0.125;
      
      float totalNoise = noise1 + noise2 + noise3;
      v_noise = totalNoise;
      
      vec2 distortion = vec2(
        snoise(flowPos + vec2(100.0, 0.0)),
        snoise(flowPos + vec2(0.0, 100.0))
      ) * u_distortionStrength;
      
      vec2 finalPosition = a_position + distortion;
      vec2 clipSpace = ((finalPosition / u_resolution) * 2.0) - 1.0;
      clipSpace.y = -clipSpace.y;
      
      gl_Position = vec4(clipSpace, 0.0, 1.0);
    }
  `;

  // Fragment shader source
  const fragmentShaderSource = `
    precision mediump float;
    
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform vec3 u_color1;
    uniform vec3 u_color2;
    uniform vec3 u_color3;
    uniform float u_opacity;
    uniform float u_flowSpeed;
    uniform float u_turbulence;
    uniform float u_viscosity;
    uniform vec2 u_flowDirection;
    
    varying vec2 v_texCoord;
    varying vec2 v_worldPosition;
    varying float v_noise;
    
    vec3 permute(vec3 x) {
      return mod(((x * 34.0) + 1.0) * x, 289.0);
    }
    
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
      m = m * m;
      m = m * m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }
    
    float fbm(vec2 p, int octaves) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      
      for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        value += amplitude * snoise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
      }
      
      return value;
    }
    
    vec2 getFlowField(vec2 pos, float time) {
      vec2 flowPos = pos * 0.01 + u_flowDirection * time * u_flowSpeed;
      
      float angle1 = fbm(flowPos, 4) * 6.28318;
      float angle2 = fbm(flowPos + vec2(100.0), 3) * 3.14159;
      
      vec2 flow1 = vec2(cos(angle1), sin(angle1));
      vec2 flow2 = vec2(cos(angle2), sin(angle2));
      
      return normalize(flow1 + flow2 * 0.5) * u_turbulence;
    }
    
    float getLiquidDensity(vec2 pos, float time) {
      vec2 flowField = getFlowField(pos, time);
      vec2 distortedPos = pos + flowField * 50.0;
      
      float density = 0.0;
      density += fbm(distortedPos * 0.005 + time * 0.1, 4) * 0.6;
      density += fbm(distortedPos * 0.02 + time * 0.3, 3) * 0.3;
      density += fbm(distortedPos * 0.08 + time * 0.5, 2) * 0.1;
      
      vec2 mouseDistance = pos - u_mouse;
      float mouseDist = length(mouseDistance);
      if (mouseDist < 200.0) {
        float mouseInfluence = (1.0 - mouseDist / 200.0) * 0.5;
        density += mouseInfluence * sin(time * 4.0);
      }
      
      return density;
    }
    
    vec3 getLiquidColor(vec2 pos, float density, float time) {
      vec2 colorPos = pos * 0.003 + u_flowDirection * time * 0.05;
      
      float colorNoise1 = fbm(colorPos, 3);
      float colorNoise2 = fbm(colorPos * 2.0 + vec2(50.0), 2);
      
      float mixFactor1 = smoothstep(-0.3, 0.3, colorNoise1);
      float mixFactor2 = smoothstep(-0.2, 0.2, colorNoise2);
      
      vec3 color = mix(u_color1, u_color2, mixFactor1);
      color = mix(color, u_color3, mixFactor2 * 0.5);
      
      color *= (0.8 + density * 0.4);
      
      float shimmer = sin(time * 3.0 + density * 10.0) * 0.1 + 0.9;
      color *= shimmer;
      
      return color;
    }
    
    void main() {
      vec2 pos = v_worldPosition;
      float time = u_time;
      
      float density = getLiquidDensity(pos, time);
      density = smoothstep(-u_viscosity, u_viscosity, density);
      
      vec3 liquidColor = getLiquidColor(pos, density, time);
      
      float alpha = density * u_opacity;
      
      float edgeSoftness = 1.0 - smoothstep(0.3, 0.7, density);
      alpha *= (1.0 - edgeSoftness * 0.3);
      
      float glow = smoothstep(0.1, 0.4, density) * (1.0 - smoothstep(0.4, 0.8, density));
      liquidColor += vec3(glow * 0.2);
      
      gl_FragColor = vec4(liquidColor, alpha);
    }
  `;

  // Initialize WebGL context and shaders
  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported, falling back to canvas');
      setIsWebGLSupported(false);
      return false;
    }

    glRef.current = gl;

    // Create and compile shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) {
      setIsWebGLSupported(false);
      return false;
    }

    // Create program
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) {
      setIsWebGLSupported(false);
      return false;
    }

    programRef.current = program;

    // Set up geometry (full screen quad)
    const positions = new Float32Array([
      -1, -1,  0, 0,
       1, -1,  1, 0,
      -1,  1,  0, 1,
       1,  1,  1, 1,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // Set up attributes
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');

    gl.enableVertexAttribArray(positionLocation);
    gl.enableVertexAttribArray(texCoordLocation);

    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 16, 0);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 16, 8);

    // Enable blending for transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    return true;
  }, []);

  // Create and compile shader
  const createShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  };

  // Create and link program
  const createProgram = (gl, vertexShader, fragmentShader) => {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }

    return program;
  };

  // Convert hex color to RGB array
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16) / 255,
      parseInt(result[2], 16) / 255,
      parseInt(result[3], 16) / 255
    ] : [0, 0, 0];
  };

  // Performance monitoring
  const updatePerformance = useCallback(() => {
    const now = performance.now();
    const perf = performanceRef.current;
    
    perf.frameCount++;
    
    if (now - perf.lastTime >= 1000) {
      perf.fps = perf.frameCount;
      perf.frameCount = 0;
      perf.lastTime = now;
      
      // Adjust performance mode based on FPS
      if (perf.fps < 30 && performanceMode === 'high') {
        setPerformanceMode('medium');
        onPerformanceChange?.({ fps: perf.fps, mode: 'medium' });
      } else if (perf.fps < 20 && performanceMode === 'medium') {
        setPerformanceMode('low');
        onPerformanceChange?.({ fps: perf.fps, mode: 'low' });
      }
    }
  }, [performanceMode, onPerformanceChange]);

  // Render frame
  const render = useCallback(() => {
    const gl = glRef.current;
    const program = programRef.current;
    
    if (!gl || !program) return;

    updatePerformance();

    const currentTime = (Date.now() - startTimeRef.current) / 1000;
    
    // Set viewport
    gl.viewport(0, 0, width, height);
    
    // Clear canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // Use program
    gl.useProgram(program);
    
    // Set uniforms
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
    const color1Location = gl.getUniformLocation(program, 'u_color1');
    const color2Location = gl.getUniformLocation(program, 'u_color2');
    const color3Location = gl.getUniformLocation(program, 'u_color3');
    const opacityLocation = gl.getUniformLocation(program, 'u_opacity');
    const flowSpeedLocation = gl.getUniformLocation(program, 'u_flowSpeed');
    const turbulenceLocation = gl.getUniformLocation(program, 'u_turbulence');
    const viscosityLocation = gl.getUniformLocation(program, 'u_viscosity');
    const flowDirectionLocation = gl.getUniformLocation(program, 'u_flowDirection');
    const noiseScaleLocation = gl.getUniformLocation(program, 'u_noiseScale');
    const distortionStrengthLocation = gl.getUniformLocation(program, 'u_distortionStrength');
    
    // Performance-based adjustments
    const perfMultiplier = performanceMode === 'high' ? 1.0 : performanceMode === 'medium' ? 0.7 : 0.4;
    
    gl.uniform1f(timeLocation, currentTime);
    gl.uniform2f(resolutionLocation, width, height);
    gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y);
    gl.uniform3fv(color1Location, hexToRgb(colors[0]));
    gl.uniform3fv(color2Location, hexToRgb(colors[1]));
    gl.uniform3fv(color3Location, hexToRgb(colors[2]));
    gl.uniform1f(opacityLocation, opacity);
    gl.uniform1f(flowSpeedLocation, flowSpeed * perfMultiplier);
    gl.uniform1f(turbulenceLocation, turbulence * perfMultiplier);
    gl.uniform1f(viscosityLocation, viscosity);
    gl.uniform2f(flowDirectionLocation, flowDirection[0], flowDirection[1]);
    gl.uniform1f(noiseScaleLocation, noiseScale);
    gl.uniform1f(distortionStrengthLocation, distortionStrength * perfMultiplier);
    
    // Draw
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    
    animationRef.current = requestAnimationFrame(render);
  }, [width, height, colors, opacity, flowSpeed, turbulence, viscosity, flowDirection, noiseScale, distortionStrength, performanceMode, updatePerformance]);

  // Handle mouse movement
  const handleMouseMove = useCallback((event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }, []);

  // Initialize WebGL and start animation
  useEffect(() => {
    if (initWebGL()) {
      animationRef.current = requestAnimationFrame(render);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initWebGL, render]);

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
    }
  }, [width, height]);

  if (!isWebGLSupported) {
    // Fallback to CSS-based fluid background
    return (
      <div
        className={`liquid-shader-fallback ${className}`}
        style={{
          width,
          height,
          background: `linear-gradient(45deg, ${colors[0]}${Math.round(opacity * 255).toString(16)}, ${colors[1]}${Math.round(opacity * 255).toString(16)})`,
          ...style
        }}
        {...props}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`liquid-shader-effect ${className}`}
      width={width}
      height={height}
      onMouseMove={handleMouseMove}
      style={{
        display: 'block',
        ...style
      }}
      {...props}
    />
  );
};

export default LiquidShaderEffect;