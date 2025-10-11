// Liquid Animation Fragment Shader
// Creates complex fluid effects with noise-based distortion and flow

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

// Fractal Brownian Motion for complex noise patterns
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

// Generate flow field for liquid motion
vec2 getFlowField(vec2 pos, float time) {
  vec2 flowPos = pos * 0.01 + u_flowDirection * time * u_flowSpeed;
  
  float angle1 = fbm(flowPos, 4) * 6.28318;
  float angle2 = fbm(flowPos + vec2(100.0), 3) * 3.14159;
  
  vec2 flow1 = vec2(cos(angle1), sin(angle1));
  vec2 flow2 = vec2(cos(angle2), sin(angle2));
  
  return normalize(flow1 + flow2 * 0.5) * u_turbulence;
}

// Create liquid density field
float getLiquidDensity(vec2 pos, float time) {
  vec2 flowField = getFlowField(pos, time);
  vec2 distortedPos = pos + flowField * 50.0;
  
  // Multiple noise layers for complex liquid behavior
  float density = 0.0;
  
  // Large scale flow
  density += fbm(distortedPos * 0.005 + time * 0.1, 4) * 0.6;
  
  // Medium scale turbulence
  density += fbm(distortedPos * 0.02 + time * 0.3, 3) * 0.3;
  
  // Small scale details
  density += fbm(distortedPos * 0.08 + time * 0.5, 2) * 0.1;
  
  // Add mouse interaction
  vec2 mouseDistance = pos - u_mouse;
  float mouseDist = length(mouseDistance);
  if (mouseDist < 200.0) {
    float mouseInfluence = (1.0 - mouseDist / 200.0) * 0.5;
    density += mouseInfluence * sin(time * 4.0);
  }
  
  return density;
}

// Create color mixing based on flow patterns
vec3 getLiquidColor(vec2 pos, float density, float time) {
  // Create color zones based on flow patterns
  vec2 colorPos = pos * 0.003 + u_flowDirection * time * 0.05;
  
  float colorNoise1 = fbm(colorPos, 3);
  float colorNoise2 = fbm(colorPos * 2.0 + vec2(50.0), 2);
  
  // Mix colors based on noise patterns
  float mixFactor1 = smoothstep(-0.3, 0.3, colorNoise1);
  float mixFactor2 = smoothstep(-0.2, 0.2, colorNoise2);
  
  vec3 color = mix(u_color1, u_color2, mixFactor1);
  color = mix(color, u_color3, mixFactor2 * 0.5);
  
  // Add density-based brightness variation
  color *= (0.8 + density * 0.4);
  
  // Add subtle shimmer effect
  float shimmer = sin(time * 3.0 + density * 10.0) * 0.1 + 0.9;
  color *= shimmer;
  
  return color;
}

void main() {
  vec2 pos = v_worldPosition;
  float time = u_time;
  
  // Calculate liquid density at this position
  float density = getLiquidDensity(pos, time);
  
  // Apply viscosity effect (smoother transitions)
  density = smoothstep(-u_viscosity, u_viscosity, density);
  
  // Get liquid color
  vec3 liquidColor = getLiquidColor(pos, density, time);
  
  // Calculate alpha based on density
  float alpha = density * u_opacity;
  
  // Add edge softening for organic look
  float edgeSoftness = 1.0 - smoothstep(0.3, 0.7, density);
  alpha *= (1.0 - edgeSoftness * 0.3);
  
  // Add subtle glow effect at edges
  float glow = smoothstep(0.1, 0.4, density) * (1.0 - smoothstep(0.4, 0.8, density));
  liquidColor += vec3(glow * 0.2);
  
  // Final color output
  gl_FragColor = vec4(liquidColor, alpha);
}