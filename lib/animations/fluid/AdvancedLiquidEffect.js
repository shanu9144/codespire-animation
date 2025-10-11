"use client";

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { getShaderManager } from './ShaderManager';

/**
 * AdvancedLiquidEffect Component
 * 
 * High-performance WebGL liquid animation with advanced shader effects
 * Features:
 * - Performance-optimized shader management
 * - Automatic quality scaling based on device performance
 * - Advanced noise-based distortion and flow animations
 * - Mouse interaction with liquid density fields
 * - Configurable visual parameters and fallbacks
 */

const AdvancedLiquidEffect = ({
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
  resolution = 64,
  enableMouseInteraction = true,
  enablePerformanceScaling = true,
  className = '',
  style = {},
  onPerformanceChange,
  ...props
}) => {
  const canvasRef = useRef(null);
  const glContextRef = useRef(null);
  const programRef = useRef(null);
  const geometryRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const mouseRef = useRef({ x: 0, y: 0 });
  const shaderManagerRef = useRef(getShaderManager());
  
  const [isInitialized, setIsInitialized] = useState(false);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    fps: 60,
    qualityLevel: 'high',
    isWebGLSupported: true
  });

  // Advanced vertex shader with performance optimizations
  const getVertexShaderSource = useCallback(() => {
    return shaderManagerRef.current.getOptimizedShaderSource(`
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_noiseScale;
      uniform float u_distortionStrength;
      uniform vec2 u_flowDirection;
      uniform float u_performanceMultiplier;
      
      varying vec2 v_texCoord;
      varying vec2 v_worldPosition;
      varying float v_noise;
      
      // Optimized simplex noise
      vec3 permute(vec3 x) {
        return mod(((x * 34.0) + 1.0) * x, 289.0);
      }
      
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
        m = m * m * m * m;
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
        v_worldPosition = a_position * u_resolution * 0.5 + u_resolution * 0.5;
        v_texCoord = a_texCoord;
        
        // Performance-adjusted noise calculation
        vec2 noisePos = v_worldPosition * u_noiseScale * u_performanceMultiplier;
        vec2 flowPos = noisePos + u_flowDirection * u_time * 0.1;
        
        // Multi-octave noise with performance scaling
        float noise1 = snoise(flowPos) * 0.5;
        float noise2 = snoise(flowPos * 2.0 + u_time * 0.3) * 0.25 * u_performanceMultiplier;
        float noise3 = snoise(flowPos * 4.0 - u_time * 0.2) * 0.125 * u_performanceMultiplier;
        
        float totalNoise = noise1 + noise2 + noise3;
        v_noise = totalNoise;
        
        // Apply vertex distortion
        vec2 distortion = vec2(
          snoise(flowPos + vec2(100.0, 0.0)),
          snoise(flowPos + vec2(0.0, 100.0))
        ) * u_distortionStrength * u_performanceMultiplier;
        
        vec2 finalPosition = a_position + distortion / u_resolution;
        gl_Position = vec4(finalPosition, 0.0, 1.0);
      }
    `, 'vertex');
  }, []);

  // Advanced fragment shader with performance optimizations
  const getFragmentShaderSource = useCallback(() => {
    return shaderManagerRef.current.getOptimizedShaderSource(`
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
      uniform float u_performanceMultiplier;
      uniform bool u_enableMouseInteraction;
      
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
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
        m = m * m * m * m;
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
        
        int octaves = int(4.0 * u_performanceMultiplier);
        float angle1 = fbm(flowPos, octaves) * 6.28318;
        float angle2 = fbm(flowPos + vec2(100.0), max(1, octaves - 1)) * 3.14159;
        
        vec2 flow1 = vec2(cos(angle1), sin(angle1));
        vec2 flow2 = vec2(cos(angle2), sin(angle2));
        
        return normalize(flow1 + flow2 * 0.5) * u_turbulence;
      }
      
      float getLiquidDensity(vec2 pos, float time) {
        vec2 flowField = getFlowField(pos, time);
        vec2 distortedPos = pos + flowField * 50.0 * u_performanceMultiplier;
        
        float density = 0.0;
        
        // Performance-scaled noise layers
        int octaves1 = int(4.0 * u_performanceMultiplier);
        int octaves2 = int(3.0 * u_performanceMultiplier);
        int octaves3 = int(2.0 * u_performanceMultiplier);
        
        density += fbm(distortedPos * 0.005 + time * 0.1, octaves1) * 0.6;
        density += fbm(distortedPos * 0.02 + time * 0.3, octaves2) * 0.3;
        density += fbm(distortedPos * 0.08 + time * 0.5, octaves3) * 0.1;
        
        // Mouse interaction (optional for performance)
        if (u_enableMouseInteraction) {
          vec2 mouseDistance = pos - u_mouse;
          float mouseDist = length(mouseDistance);
          if (mouseDist < 200.0) {
            float mouseInfluence = (1.0 - mouseDist / 200.0) * 0.5;
            density += mouseInfluence * sin(time * 4.0);
          }
        }
        
        return density;
      }
      
      vec3 getLiquidColor(vec2 pos, float density, float time) {
        vec2 colorPos = pos * 0.003 + u_flowDirection * time * 0.05;
        
        int octaves = int(3.0 * u_performanceMultiplier);
        float colorNoise1 = fbm(colorPos, octaves);
        float colorNoise2 = fbm(colorPos * 2.0 + vec2(50.0), max(1, octaves - 1));
        
        float mixFactor1 = smoothstep(-0.3, 0.3, colorNoise1);
        float mixFactor2 = smoothstep(-0.2, 0.2, colorNoise2);
        
        vec3 color = mix(u_color1, u_color2, mixFactor1);
        color = mix(color, u_color3, mixFactor2 * 0.5);
        
        // Density-based brightness
        color *= (0.8 + density * 0.4);
        
        // Performance-scaled shimmer
        float shimmer = sin(time * 3.0 * u_performanceMultiplier + density * 10.0) * 0.1 + 0.9;
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
        
        // Edge softening
        float edgeSoftness = 1.0 - smoothstep(0.3, 0.7, density);
        alpha *= (1.0 - edgeSoftness * 0.3);
        
        // Glow effect
        float glow = smoothstep(0.1, 0.4, density) * (1.0 - smoothstep(0.4, 0.8, density));
        liquidColor += vec3(glow * 0.2);
        
        gl_FragColor = vec4(liquidColor, alpha);
      }
    `, 'fragment');
  }, []);

  // Initialize WebGL and shaders
  const initializeWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const shaderManager = shaderManagerRef.current;
    const webglContext = shaderManager.initializeWebGL(canvas);
    
    if (!webglContext) {
      setPerformanceMetrics(prev => ({ ...prev, isWebGLSupported: false }));
      return false;
    }

    const { gl } = webglContext;
    glContextRef.current = gl;

    // Create shaders
    const vertexShader = shaderManager.createShader(
      gl, 
      gl.VERTEX_SHADER, 
      getVertexShaderSource(), 
      'liquid-vertex'
    );
    
    const fragmentShader = shaderManager.createShader(
      gl, 
      gl.FRAGMENT_SHADER, 
      getFragmentShaderSource(), 
      'liquid-fragment'
    );

    if (!vertexShader || !fragmentShader) {
      setPerformanceMetrics(prev => ({ ...prev, isWebGLSupported: false }));
      return false;
    }

    // Create program
    const program = shaderManager.createProgram(
      gl, 
      vertexShader, 
      fragmentShader, 
      'liquid-program'
    );

    if (!program) {
      setPerformanceMetrics(prev => ({ ...prev, isWebGLSupported: false }));
      return false;
    }

    programRef.current = program;

    // Create geometry
    const geometry = shaderManager.createLiquidGeometry(gl, resolution);
    geometryRef.current = geometry;

    // Setup vertex attributes
    const vertexBuffer = shaderManager.setupVertexAttributes(gl, program, geometry.vertices);
    
    // Setup index buffer
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.indices, gl.STATIC_DRAW);

    // Enable blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    setIsInitialized(true);
    return true;
  }, [getVertexShaderSource, getFragmentShaderSource, resolution]);

  // Convert hex color to RGB array
  const hexToRgb = useCallback((hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16) / 255,
      parseInt(result[2], 16) / 255,
      parseInt(result[3], 16) / 255
    ] : [0, 0, 0];
  }, []);

  // Render frame
  const render = useCallback((currentTime) => {
    const gl = glContextRef.current;
    const program = programRef.current;
    const geometry = geometryRef.current;
    const shaderManager = shaderManagerRef.current;
    
    if (!gl || !program || !geometry) return;

    const deltaTime = currentTime - (render.lastTime || currentTime);
    render.lastTime = currentTime;

    // Update performance metrics
    if (enablePerformanceScaling) {
      shaderManager.updatePerformance(deltaTime);
      
      const metrics = shaderManager.getPerformanceMetrics();
      setPerformanceMetrics(metrics);
      
      if (onPerformanceChange) {
        onPerformanceChange(metrics);
      }
    }

    const time = (currentTime - startTimeRef.current) / 1000;
    
    // Set viewport
    gl.viewport(0, 0, width, height);
    
    // Clear canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // Use program
    gl.useProgram(program);
    
    // Get performance-adjusted uniforms
    const baseUniforms = {
      u_flowSpeed: flowSpeed,
      u_turbulence: turbulence,
      u_distortionStrength: distortionStrength,
      u_noiseScale: noiseScale
    };
    
    const adjustedUniforms = enablePerformanceScaling ? 
      shaderManager.getPerformanceAdjustedUniforms(baseUniforms) : baseUniforms;
    
    // Set uniforms
    gl.uniform1f(gl.getUniformLocation(program, 'u_time'), time);
    gl.uniform2f(gl.getUniformLocation(program, 'u_resolution'), width, height);
    gl.uniform2f(gl.getUniformLocation(program, 'u_mouse'), mouseRef.current.x, mouseRef.current.y);
    gl.uniform3fv(gl.getUniformLocation(program, 'u_color1'), hexToRgb(colors[0]));
    gl.uniform3fv(gl.getUniformLocation(program, 'u_color2'), hexToRgb(colors[1]));
    gl.uniform3fv(gl.getUniformLocation(program, 'u_color3'), hexToRgb(colors[2]));
    gl.uniform1f(gl.getUniformLocation(program, 'u_opacity'), opacity);
    gl.uniform1f(gl.getUniformLocation(program, 'u_flowSpeed'), adjustedUniforms.u_flowSpeed);
    gl.uniform1f(gl.getUniformLocation(program, 'u_turbulence'), adjustedUniforms.u_turbulence);
    gl.uniform1f(gl.getUniformLocation(program, 'u_viscosity'), viscosity);
    gl.uniform2f(gl.getUniformLocation(program, 'u_flowDirection'), flowDirection[0], flowDirection[1]);
    gl.uniform1f(gl.getUniformLocation(program, 'u_noiseScale'), adjustedUniforms.u_noiseScale);
    gl.uniform1f(gl.getUniformLocation(program, 'u_distortionStrength'), adjustedUniforms.u_distortionStrength);
    gl.uniform1f(gl.getUniformLocation(program, 'u_performanceMultiplier'), shaderManager.getPerformanceMultiplier());
    gl.uniform1i(gl.getUniformLocation(program, 'u_enableMouseInteraction'), enableMouseInteraction ? 1 : 0);
    
    // Draw
    gl.drawElements(gl.TRIANGLES, geometry.indices.length, gl.UNSIGNED_SHORT, 0);
    
    animationRef.current = requestAnimationFrame(render);
  }, [width, height, colors, opacity, flowSpeed, turbulence, viscosity, flowDirection, 
      noiseScale, distortionStrength, enableMouseInteraction, enablePerformanceScaling, 
      hexToRgb, onPerformanceChange]);

  // Handle mouse movement
  const handleMouseMove = useCallback((event) => {
    if (!enableMouseInteraction) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }, [enableMouseInteraction]);

  // Initialize and start animation
  useEffect(() => {
    if (initializeWebGL()) {
      animationRef.current = requestAnimationFrame(render);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initializeWebGL, render]);

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
    }
  }, [width, height]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const gl = glContextRef.current;
      if (gl) {
        shaderManagerRef.current.dispose(gl);
      }
    };
  }, []);

  // Fallback for unsupported WebGL
  if (!performanceMetrics.isWebGLSupported) {
    return (
      <div
        className={`advanced-liquid-fallback ${className}`}
        style={{
          width,
          height,
          background: `linear-gradient(45deg, ${colors[0]}${Math.round(opacity * 255).toString(16)}, ${colors[1]}${Math.round(opacity * 255).toString(16)})`,
          backgroundSize: '400% 400%',
          animation: 'liquidFallback 8s ease-in-out infinite',
          ...style
        }}
        {...props}
      >
        <style jsx>{`
          @keyframes liquidFallback {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`advanced-liquid-effect ${className}`}
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

export default AdvancedLiquidEffect;