// Liquid Animation Vertex Shader
// Handles vertex positioning for fluid mesh deformation

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

// Simplex noise function for organic distortion
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
  // Calculate world position
  v_worldPosition = a_position;
  v_texCoord = a_texCoord;
  
  // Generate multi-octave noise for organic distortion
  vec2 noisePos = a_position * u_noiseScale;
  
  // Add time-based flow
  vec2 flowPos = noisePos + u_flowDirection * u_time * 0.1;
  
  // Multi-octave noise for complex distortion
  float noise1 = snoise(flowPos) * 0.5;
  float noise2 = snoise(flowPos * 2.0 + u_time * 0.3) * 0.25;
  float noise3 = snoise(flowPos * 4.0 - u_time * 0.2) * 0.125;
  
  float totalNoise = noise1 + noise2 + noise3;
  v_noise = totalNoise;
  
  // Apply distortion to vertex position
  vec2 distortion = vec2(
    snoise(flowPos + vec2(100.0, 0.0)),
    snoise(flowPos + vec2(0.0, 100.0))
  ) * u_distortionStrength;
  
  vec2 finalPosition = a_position + distortion;
  
  // Convert to clip space
  vec2 clipSpace = ((finalPosition / u_resolution) * 2.0) - 1.0;
  clipSpace.y = -clipSpace.y;
  
  gl_Position = vec4(clipSpace, 0.0, 1.0);
}