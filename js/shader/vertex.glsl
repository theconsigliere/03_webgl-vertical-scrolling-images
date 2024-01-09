uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
uniform float distanceFromCenter;
uniform vec2 pixels;
float PI = 3.141592653589793238;
void main() {
    vec3 pos = position;



  // zoom in effect when images is selected
  // -----------------------------
  vUv = (uv - vec2(0.5)) * (0.8 - 0.2 * distanceFromCenter*(2. - distanceFromCenter)) + vec2(0.5);

 
  // bending effect
  // -----------------------------
  pos.y += sin(PI*uv.x)*0.005;
  pos.z += sin(PI*uv.x)*0.1;

  // -----------------------------

  // Parallax effect
  // -----------------------------

  pos.y += sin(time*0.3)*0.02;
  vUv.y -= sin(time*0.3)*0.02;
  // -----------------------------

  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}