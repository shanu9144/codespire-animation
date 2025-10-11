// Particle Vertex Shader
// Handles particle positioning and size calculation

attribute vec2 a_position;
attribute float a_size;
attribute vec4 a_color;
attribute float a_life;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_scroll;
uniform float u_pixelRatio;

varying vec4 v_color;
varying float v_size;
varying float v_life;
varying vec2 v_position;

void main() {
  // Convert from pixels to clip space
  vec2 clipSpace = ((a_position / u_resolution) * 2.0) - 1.0;
  
  // Flip Y coordinate
  clipSpace.y = -clipSpace.y;
  
  // Calculate distance from mouse for interaction effects
  vec2 mouseDistance = a_position - u_mouse;
  float distanceFromMouse = length(mouseDistance);
  
  // Apply subtle mouse influence to position
  vec2 mouseInfluence = vec2(0.0);
  if (distanceFromMouse < 200.0 && distanceFromMouse > 0.0) {
    float influence = (1.0 - distanceFromMouse / 200.0) * 0.02;
    mouseInfluence = normalize(mouseDistance) * influence;
  }
  
  clipSpace += mouseInfluence;
  
  // Apply scroll-based parallax
  float parallaxOffset = u_scroll * 0.0001 * (1.0 - a_life * 0.5);
  clipSpace.y += parallaxOffset;
  
  gl_Position = vec4(clipSpace, 0.0, 1.0);
  
  // Calculate point size with pixel ratio consideration
  float baseSize = a_size * u_pixelRatio;
  
  // Add subtle pulsing based on time and life
  float pulse = 1.0 + sin(u_time * 2.0 + a_life * 6.28) * 0.1;
  gl_PointSize = baseSize * pulse;
  
  // Pass varying values to fragment shader
  v_color = a_color;
  v_size = baseSize;
  v_life = a_life;
  v_position = a_position;
}