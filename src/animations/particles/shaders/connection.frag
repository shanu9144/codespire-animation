// Connection Line Fragment Shader
// Creates smooth lines between particles with dynamic opacity

precision mediump float;

uniform vec3 u_color;
uniform float u_time;

varying float v_opacity;
varying float v_progress;

void main() {
  // Create smooth line with gradient opacity
  float alpha = v_opacity;
  
  // Add subtle pulse effect along the line
  float pulse = sin(u_time * 2.0 + v_progress * 6.28) * 0.1 + 0.9;
  alpha *= pulse;
  
  // Add distance-based fade
  float fade = 1.0 - abs(v_progress - 0.5) * 2.0;
  fade = smoothstep(0.0, 1.0, fade);
  alpha *= fade;
  
  gl_FragColor = vec4(u_color, alpha);
}