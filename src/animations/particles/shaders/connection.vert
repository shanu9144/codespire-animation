// Connection Line Vertex Shader
// Handles line positioning between particles

attribute vec2 a_startPosition;
attribute vec2 a_endPosition;
attribute float a_opacity;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_lineWidth;

varying float v_opacity;
varying float v_progress;

void main() {
  // Calculate line progress (0.0 at start, 1.0 at end)
  v_progress = gl_VertexID == 0 ? 0.0 : 1.0;
  
  // Choose position based on vertex ID
  vec2 position = gl_VertexID == 0 ? a_startPosition : a_endPosition;
  
  // Convert from pixels to clip space
  vec2 clipSpace = ((position / u_resolution) * 2.0) - 1.0;
  
  // Flip Y coordinate
  clipSpace.y = -clipSpace.y;
  
  gl_Position = vec4(clipSpace, 0.0, 1.0);
  
  // Pass opacity to fragment shader
  v_opacity = a_opacity;
}