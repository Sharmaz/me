export const orbVertexShader = /* glsl */`
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uScroll;

  varying vec3  vNormal;
  varying vec3  vViewDir;
  varying float vDisp;

  // --- Simplex 3D noise (Stefan Gustavson) ---
  vec4 _permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  vec4 _taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0);
    vec4 p = _permute(_permute(_permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0 / 7.0;
    vec3  ns  = n_ * D.wyz - D.xzx;

    vec4 j  = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = _taylorInvSqrt(vec4(
      dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(
      dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;

    return 42.0 * dot(m * m, vec4(
      dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }
  // --- end Simplex ---

  void main() {
    vec3 pos = position;
    float t  = uTime * 0.22;

    // Layered noise octaves for organic morphing
    float n  = snoise(pos * 1.2 + t * 0.9)  * 0.500;
          n += snoise(pos * 2.5 - t * 0.65) * 0.250;
          n += snoise(pos * 5.0 + t * 0.45) * 0.125;
          n += snoise(pos * 9.5 - t * 0.30) * 0.062;

    // Mouse influence — subtle warp in cursor direction
    vec3 mouseWarp = vec3(uMouse.x * 0.5, uMouse.y * 0.5, 0.0);
    n += snoise(pos + mouseWarp + t * 0.2) * 0.12;

    float disp     = n * 0.28;
    vec3 displaced = pos + normalize(position) * disp;

    // Unique scatter direction per vertex (stable — no time dependency)
    vec3 scatterDir = normalize(vec3(
      snoise(position * 4.1),
      snoise(position * 4.1 + vec3(100.0, 0.0, 0.0)),
      snoise(position * 4.1 + vec3(0.0, 100.0, 0.0))
    ));
    float scatter = uScroll * uScroll * 14.0;
    displaced = mix(displaced, displaced + scatterDir * scatter, uScroll);

    vDisp    = n;
    vNormal  = normalize(normalMatrix * normal);
    vViewDir = normalize(-(modelViewMatrix * vec4(displaced, 1.0)).xyz);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

export const orbFragmentShader = /* glsl */`
  uniform float uTime;
  uniform float uScroll;

  varying vec3  vNormal;
  varying vec3  vViewDir;
  varying float vDisp;

  void main() {
    vec3  N  = normalize(vNormal);
    vec3  V  = normalize(vViewDir);
    float fr = pow(1.0 - max(dot(N, V), 0.0), 2.5);

    // Vibrant palette: indigo → electric violet → hot magenta → bright cyan
    vec3 core    = vec3(0.06, 0.0,  0.30);   // deep indigo
    vec3 violet  = vec3(0.50, 0.0,  1.00);   // electric violet
    vec3 magenta = vec3(1.00, 0.05, 0.65);   // hot magenta
    vec3 cyan    = vec3(0.30, 0.95, 1.00);   // bright cyan
    vec3 gold    = vec3(1.00, 0.55, 0.00);   // golden orange

    vec3 col = mix(core,    violet,  clamp(fr * 1.8,            0.0, 1.0));
    col      = mix(col,     gold,    clamp(fr * fr * 1.8,       0.0, 0.45));
    col      = mix(col,     magenta, clamp(fr * fr * 3.0,       0.0, 1.0));
    col      = mix(col,     cyan,    clamp(fr * fr * fr * 5.0,  0.0, 0.55));

    // Displacement → gold prominente en picos
    col += gold * clamp(vDisp * 1.6, 0.0, 0.90);

    // Pulse: magenta flare on rim
    float pulse = 0.5 + 0.5 * sin(uTime * 0.7);
    col += magenta * fr * fr * pulse * 0.30;

    float alpha = mix(0.60, 1.0, fr) * max(0.0, 1.0 - uScroll * 1.8);

    gl_FragColor = vec4(col, alpha);
  }
`;
