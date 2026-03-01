import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const fieldVertexShader = /* glsl */`
  uniform float uTime;
  uniform vec2  uMouse;

  attribute float aIndex;

  varying float vDepth;
  varying float vIndex;

  void main() {
    vec3 pos = position;

    // Per-particle organic drift
    float seed = aIndex * 0.01;
    float t    = uTime * 0.18;
    pos.x += sin(t        + seed * 6.28) * 0.35;
    pos.y += cos(t * 0.9  + seed * 5.12) * 0.28;
    pos.z += sin(t * 0.65 + seed * 3.77) * 0.18;

    vec4 mvPos   = modelViewMatrix * vec4(pos, 1.0);
    vec4 clipPos = projectionMatrix * mvPos;

    // Mouse repulsion in NDC space
    vec2 ndc     = clipPos.xy / clipPos.w;
    vec2 diff    = ndc - uMouse;
    float dist   = length(diff);
    float push   = smoothstep(0.45, 0.0, dist) * 1.4;
    clipPos.xy  += normalize(diff + 0.001) * push * clipPos.w * 0.07;

    vDepth = clamp(-mvPos.z / 8.0, 0.0, 1.0);
    vIndex = seed;

    // Size attenuation: bigger in front, smaller behind
    float sz     = mix(3.5, 0.7, vDepth);
    gl_PointSize = sz * (300.0 / -mvPos.z);
    gl_Position  = clipPos;
  }
`;

const fieldFragmentShader = /* glsl */`
  varying float vDepth;
  varying float vIndex;

  void main() {
    vec2  uv = gl_PointCoord - 0.5;
    float r  = length(uv);
    if (r > 0.5) discard;

    // Soft circular glow
    float core  = 1.0 - smoothstep(0.0, 0.25, r);
    float halo  = 1.0 - smoothstep(0.2, 0.5,  r);
    float alpha = (core * 0.9 + halo * 0.35) * mix(0.95, 0.15, vDepth);

    // Color palette: cyan / violet / near-white
    vec3 cyan   = vec3(0.28, 0.85, 1.00);
    vec3 violet = vec3(0.55, 0.34, 1.00);
    vec3 white  = vec3(0.82, 0.88, 1.00);

    float h   = fract(vIndex * 3.71);
    vec3  col = mix(cyan, violet, smoothstep(0.0, 0.5, h));
         col  = mix(col,  white,  smoothstep(0.6, 1.0, h));

    // Brighten core
    col += vec3(0.18) * core;

    gl_FragColor = vec4(col, alpha);
  }
`;

const ParticleField = () => {
  const { viewport } = useThree();
  const count = 2800;

  const uniforms = useMemo(() => ({
    uTime:  { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  const { positions, indices } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const idx = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * viewport.width  * 3.0;
      pos[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 3.0;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8.0;
      idx[i] = i;
    }
    return { positions: pos, indices: idx };
  }, [viewport.width, viewport.height]);

  useFrame(({ clock, pointer }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uMouse.value.lerp(
      new THREE.Vector2(pointer.x, pointer.y),
      0.06,
    );
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aIndex"   args={[indices,    1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={fieldVertexShader}
        fragmentShader={fieldFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
};

const HeroSceneField = () => (
  <Canvas
    camera={{ position: [0, 0, 4], fov: 55 }}
    style={{ position: 'absolute', inset: 0 }}
    gl={{ antialias: true, alpha: true }}
    dpr={Math.min(window.devicePixelRatio, 2)}
  >
    <ParticleField />
  </Canvas>
);

export default HeroSceneField;
