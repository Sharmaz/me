import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { orbVertexShader, orbFragmentShader } from '../shaders/orbMorph';

const Orb = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScroll: { value: 0 },
  }), []);

  useFrame(({ clock, pointer }) => {
    const scrollProgress = Math.min(window.scrollY / (window.innerHeight * 0.55), 1);
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uScroll.value = scrollProgress;
    uniforms.uMouse.value.lerp(
      new THREE.Vector2(pointer.x, pointer.y),
      0.04,
    );

    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.rotation.y = t * 0.06;
      meshRef.current.rotation.x = Math.sin(t * 0.04) * 0.08;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.2, 4]} />
      <shaderMaterial
        vertexShader={orbVertexShader}
        fragmentShader={orbFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.FrontSide}
      />
    </mesh>
  );
};

interface RingProps {
  positions: Float32Array;
  tilt: number;
  speed: number;
  opacity?: number;
  size?: number;
  color?: string;
}

const Ring = ({ positions, tilt, speed, opacity = 0.45, size = 0.02, color = '#ffffff' }: RingProps) => {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  useFrame(({ clock }) => {
    const scrollProgress = Math.min(window.scrollY / (window.innerHeight * 0.55), 1);
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * speed;
    }
    if (matRef.current) {
      matRef.current.opacity = opacity * Math.max(0, 1 - scrollProgress * 2);
    }
  });

  return (
    <points ref={ref} rotation={[tilt, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        color={color}
        size={size}
        transparent
        opacity={opacity}
        sizeAttenuation
      />
    </points>
  );
};

const OrbitalRings = () => {
  const rings = useMemo(() => {
    const configs = [
      { count: 110, radius: 1.95, spread: 0.10, tilt: 0.30, speed: 0.040, opacity: 0.60, size: 0.020, color: '#ff14a0' },
      { count: 80, radius: 2.50, spread: 0.12, tilt: 1.10, speed: -0.028, opacity: 0.45, size: 0.016, color: '#8000ff' },
      { count: 65, radius: 2.70, spread: 0.10, tilt: 0.75, speed: 0.022, opacity: 0.50, size: 0.018, color: '#ffcc00' },
      { count: 55, radius: 3.00, spread: 0.08, tilt: -0.58, speed: 0.018, opacity: 0.30, size: 0.013, color: '#00dfff' },
    ];

    return configs.map(({ count, radius, spread, tilt, speed, opacity, size, color }) => {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const r = radius + (Math.random() - 0.5) * spread;
        arr[i * 3] = r * Math.cos(angle);
        arr[i * 3 + 1] = (Math.random() - 0.5) * 0.18;
        arr[i * 3 + 2] = r * Math.sin(angle);
      }
      return { positions: arr, tilt, speed, opacity, size, color };
    });
  }, []);

  return (
    <>
      {rings.map((ring, i) => (
        <Ring
          key={i}
          positions={ring.positions}
          tilt={ring.tilt}
          speed={ring.speed}
          opacity={ring.opacity}
          size={ring.size}
          color={ring.color}
        />
      ))}
    </>
  );
};

const HeroScene = () => (
  <Canvas
    camera={{ position: [0, 0, 3.8], fov: 45 }}
    style={{ position: 'absolute', inset: 0 }}
    gl={{ antialias: true, alpha: true }}
    dpr={Math.min(window.devicePixelRatio, 2)}
  >
    <Orb />
    <OrbitalRings />
  </Canvas>
);

export default HeroScene;
