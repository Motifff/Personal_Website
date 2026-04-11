// Processing port by Raphaël de Courville.

#ifdef GL_ES
precision highp float;
#endif

#define PI 3.1415926
// Type of shader expected by Processing
// #define PROCESSING_COLOR_SHADER

// Processing specific input
// uniform float time;
// uniform vec2 resolution;
// uniform vec2 mouse;

// for vscode plugin glslCanvas
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Random from https://godotshaders.com/snippet/random-value/
float random (vec2 uv) {
    return fract(sin(dot(uv.xy,
        vec2(12.9898,78.233))) * 43758.5453123);
}
// Sigmoid from https://www.shadertoy.com/view/XtjcDW
float lerp(float x){
	return(x < 0.5 ? (4. * x * x * x) : 1. - pow(-2. * x + 2., 3.) / 2.);
}
// Noises from http://patriciogonzalezvivo.com
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

vec3 wind(vec2 pt){
	vec2 pos = vec2(pt*.15);
	
	float DF = 0.0;

    // Add a random position
    float a = 0.0;
    vec2 vel = vec2(u_time*.2*.5);
    DF += snoise(pos+vel)*.25+.25;

    a = snoise(pos*vec2(cos(u_time*0.1),sin(u_time*0.2))*0.1)*PI;
    vel = vec2(cos(a),sin(a));
    DF += snoise(pos+vel)*.25+.25;

	float intensity = smoothstep(.65,.75,fract(DF));
	float crop = smoothstep(.6,.72,fract(DF));

	// convert color from https://airtightinteractive.com/util/hex-to-glsl/
	vec3 lc = vec3(.1);
	vec3 hc = vec3(0.086,0.902,0.565);

	// add some random to edge
	float rd = random(pt) * lerp(1.-DF);

	vec3 c = mix(lc, hc, intensity);
	c = c-rd;

	return(c);
}

vec3 light(vec2 pt){
	vec2 pos = vec2(pt.x*1.5,pt.y*.15);
	
	float DF = 0.0;

    // Add a random position
    float a = 0.0;
    vec2 vel = vec2(u_time*.8*.3);
    DF += snoise(pos+vel)*.25+.25;

    a = snoise(pos*vec2(cos(u_time*0.1),sin(u_time*0.2))*0.1)*PI;
    vel = vec2(cos(a),sin(a));
    DF += snoise(pos+vel)*.25+.25;

	float intensity = smoothstep(.65,.75,fract(DF));
	float crop = smoothstep(.6,.72,fract(DF));

	// convert color from https://airtightinteractive.com/util/hex-to-glsl/
	vec3 lc = vec3(0.0);
	vec3 hc = vec3(0.996,0.965,0.357);

	// add some random to edge
	float rd = random(pt) * lerp(1.-DF);

	vec3 c = mix(lc, hc, intensity);
	c = c-rd;

	return(c);
}

vec3 light1(vec2 pt){
	vec2 pos = vec2(pt.x*.5+.3,pt.y*.05);
	
	float DF = 0.0;

    // Add a random position
    float a = 0.0;
    vec2 vel = vec2(u_time*.8*.2);
    DF += snoise(pos+vel)*.25+.25;

    a = snoise(pos*vec2(cos(u_time*0.1),sin(u_time*0.2))*0.1)*PI;
    vel = vec2(cos(a),sin(a));
    DF += snoise(pos+vel)*.25+.25;

	float intensity = smoothstep(.65,.75,fract(DF));
	float crop = smoothstep(.6,.72,fract(DF));

	// convert color from https://airtightinteractive.com/util/hex-to-glsl/
	vec3 lc = vec3(0.0);
	vec3 hc = vec3(0.518,0.957,0.749);

	// add some random to edge
	float rd = random(pt) * lerp(1.-DF);

	vec3 c = mix(lc, hc, intensity);
	c = c-rd;

	return(c);
}


void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.);

	mat2 rM = mat2(cos(90.0), -sin(90.0), sin(90.0), cos(90.0));
	
	color = wind(st) + light(st)*0.1 + light1(st) * 0.1;

    gl_FragColor = vec4(color,1.);
}