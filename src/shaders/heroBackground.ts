export const vertexShader = /* glsl */`
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */`
  uniform float uTime;
  uniform vec2  uMouse;
  varying vec2  vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p  = rot * p * 2.0 + vec2(100.0);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.12;

    vec2 mouse = (uMouse - 0.5) * 0.9;
    uv += mouse * (1.0 - length(mouse) * 0.5);

    vec2 q = vec2(
      fbm(uv + t * 0.3),
      fbm(uv + vec2(5.2, 1.3) + t * 0.2)
    );
    vec2 r = vec2(
      fbm(uv + 3.0 * q + vec2(1.7, 9.2) + t * 0.4),
      fbm(uv + 3.0 * q + vec2(8.3, 2.8) + t * 0.25)
    );
    float f = fbm(uv + 3.5 * r + t * 0.1);

    vec3 dark     = vec3(0.012, 0.012, 0.055);
    vec3 violet   = vec3(0.18,  0.0,   0.42);
    vec3 teal     = vec3(0.0,   0.22,  0.28);
    vec3 electric = vec3(0.0,   0.55,  0.85);

    vec3 color = mix(dark,   violet,   clamp(f * f * 3.5,       0.0, 1.0));
    color      = mix(color,  teal,     clamp(length(q) * 0.8,   0.0, 1.0));
    color      = mix(color,  electric, clamp(r.x * r.y * 5.0,   0.0, 0.15));

    float dist = length(vUv - 0.5);
    color *= 1.0 - dist * 0.75;

    gl_FragColor = vec4(color, 1.0);
  }
`;
