uniform float time;
uniform float progress;
uniform float distanceFromCenter;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;
void main()	{

	vec4 t = texture2D(texture1, vUv);
	// vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
	//gl_FragColor = vec4(vUv,0.0,1.);
	gl_FragColor = t;

	// Makes non selected images black & white
	vec4 blackandWhite = vec4(t.r, t.r, t.r, 1.);
	gl_FragColor = mix(blackandWhite, t, distanceFromCenter);

	// transparency effect, based on distance from center
	gl_FragColor.a = clamp(distanceFromCenter, 0.33, 1.);
}