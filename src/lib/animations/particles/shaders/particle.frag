// Particle Fragment Shader
// Creates circular particles with soft edges and various effects

precision mediump float;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

varying vec4 v_color;
varying float v_size;
varying float v_life;
varying vec2 v_position;

void main() {
  // Create circular particles
  vec2 center = gl_PointCoord - vec2(0.5, 0.5);
  float distance = length(center);
  
  // Discard pixels outside circle
  if (distance > 0.5) {
    discard;
  }
  
  // Create soft edges with smooth falloff
  float alpha = 1.0 - smoothstep(0.2, 0.5, distance);
  
  // Add subtle glow effect
  float glow = 1.0 - smoothstep(0.0, 0.3, distance);
  glow = pow(glow, 2.0) * 0.3;
  
  // Calculate distance from mouse for interaction effects
  vec2 mouseDistance = v_position - u_mouse;
  float distanceFromMouse = length(mouseDistance);
  
  // Add mouse proximity glow
  float mouseGlow = 0.0;
  if (distanceFromMouse < 150.0) {
    mouseGlow = (1.0 - distanceFromMouse / 150.0) * 0.4;
  }
  
  // Combine base color with effects
  vec3 finalColor = v_color.rgb;
  
  // Add glow effects
  finalColor += vec3(glow + mouseGlow);
  
  // Add subtle sparkle effect based on time and life
  float sparkle = sin(u_time * 8.0 + v_life * 12.56) * 0.5 + 0.5;
  sparkle = pow(sparkle, 8.0) * 0.2;
  finalColor += vec3(sparkle);
  
  // Apply life-based fading
  float lifeFade = smoothstep(0.0, 0.2, v_life) * smoothstep(1.0, 0.8, v_life);
  
  // Final alpha calculation
  float finalAlpha = v_color.a * alpha * lifeFade;
  
  gl_FragColor = vec4(finalColor, finalAlpha);
}