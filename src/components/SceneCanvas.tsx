import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Camera z=5, fov=50 → world height per viewport ≈ 4.66 units
const VIEWPORT_H = 4.66;

const scroll = { raw: 0, smooth: 0 };

interface HexConfig {
  scrollAt: number;
  x: number;
  baseY: number;
  z: number;
  scale: number;
  tube: number;
  speed: number;
  color: string;
}

const HEXES: HexConfig[] = [
  // About (~1.2 viewports)
  { scrollAt: 1.2, x: 3.3, baseY: 0.6, z: -0.5, scale: 0.42, tube: 0.28, speed: 0.28, color: '#a78bfa' },
  { scrollAt: 1.3, x: -3.5, baseY: -0.7, z: -1.0, scale: 0.26, tube: 0.22, speed: -0.20, color: '#4dd9ff' },

  // Experience (~2.5–3.5 viewports)
  { scrollAt: 2.6, x: 3.6, baseY: 0.4, z: -0.8, scale: 0.32, tube: 0.24, speed: 0.22, color: '#ff14a0' },
  { scrollAt: 3.0, x: -3.2, baseY: 1.3, z: -1.2, scale: 0.22, tube: 0.18, speed: -0.32, color: '#ffcc00' },
  { scrollAt: 3.4, x: 3.1, baseY: -1.2, z: -0.5, scale: 0.18, tube: 0.16, speed: 0.40, color: '#8000ff' },

  // Work (~4.5–5.5 viewports)
  { scrollAt: 4.5, x: -3.8, baseY: 0.9, z: -1.0, scale: 0.36, tube: 0.26, speed: -0.18, color: '#4dd9ff' },
  { scrollAt: 4.8, x: 3.5, baseY: -0.6, z: -1.5, scale: 0.24, tube: 0.20, speed: 0.25, color: '#a78bfa' },
  { scrollAt: 5.2, x: -2.8, baseY: -1.6, z: -0.6, scale: 0.18, tube: 0.15, speed: -0.30, color: '#ff14a0' },

  // Contact (~6.5 viewports)
  { scrollAt: 6.5, x: 2.4, baseY: 0.3, z: -0.3, scale: 0.52, tube: 0.32, speed: 0.15, color: '#a78bfa' },
  { scrollAt: 6.6, x: -2.6, baseY: 0.9, z: -0.8, scale: 0.30, tube: 0.24, speed: -0.18, color: '#4dd9ff' },
];

const ScrollTracker = () => {
  useFrame(() => {
    scroll.raw = window.scrollY / window.innerHeight;
    scroll.smooth += (scroll.raw - scroll.smooth) * 0.05;
  });
  return null;
};

const HexPrism = ({ config }: { config: HexConfig }) => {
  const groupRef = useRef<THREE.Group>(null);
  const fillMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null);

  const { fillGeo, edgesGeo } = useMemo(() => {
    // tubularSegments=6 → hexagonal ring, radialSegments=4 → square tube
    const torus = new THREE.TorusGeometry(1, config.tube, 4, 6);
    return { fillGeo: torus, edgesGeo: new THREE.EdgesGeometry(torus) };
  }, [config.tube]);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group || !fillMatRef.current || !lineMatRef.current) return;

    const t = clock.getElapsedTime();
    const su = scroll.smooth;

    // Y follows scroll so prism stays attached to its section
    const y = config.baseY + (su - config.scrollAt) * VIEWPORT_H;
    group.position.set(config.x, y, config.z);

    // Rotate primarily around Y to show hex faces; subtle tilt on X
    group.rotation.y = t * config.speed;
    group.rotation.x = Math.sin(t * config.speed * 0.45) * 0.25;

    // Subtle breathing scale
    const breathe = 1 + Math.sin(t * config.speed * 1.5) * 0.05;
    group.scale.setScalar(config.scale * breathe);

    // Fade in/out based on proximity to scroll target
    const dist = Math.abs(config.scrollAt - su);
    const fade = Math.max(0, 1 - dist * 1.6);
    fillMatRef.current.opacity = fade * 0.10;
    lineMatRef.current.opacity = fade * 0.80;
  });

  return (
    <group ref={groupRef}>
      {/* Translucent hex fill */}
      <mesh geometry={fillGeo}>
        <meshBasicMaterial
          ref={fillMatRef}
          color={config.color}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Bright hex edges */}
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial
          ref={lineMatRef}
          color={config.color}
          transparent
          opacity={0}
        />
      </lineSegments>
    </group>
  );
};

const SceneCanvas = () => (
  <Canvas
    camera={{ position: [0, 0, 5], fov: 50 }}
    style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    gl={{ antialias: true, alpha: true }}
    dpr={Math.min(window.devicePixelRatio, 2)}
  >
    <ScrollTracker />
    {HEXES.map((config, i) => (
      <HexPrism key={i} config={config} />
    ))}
  </Canvas>
);

export default SceneCanvas;
