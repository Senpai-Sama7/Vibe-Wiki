'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Mesh } from 'three';

const usePrefersReducedMotion = (): boolean => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event: MediaQueryListEvent) => setValue(event.matches);

    setValue(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return value;
};

function TorusKnot({ animate }: { animate: boolean }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!animate || !meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.4;
    meshRef.current.rotation.y += delta * 0.55;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.2, 0.35, 220, 32]} />
      <meshStandardMaterial
        color={0x6ef2ff}
        emissive={0x0d3b50}
        emissiveIntensity={0.6}
        metalness={0.45}
        roughness={0.2}
      />
    </mesh>
  );
}

function FloatingParticles({ animate }: { animate: boolean }) {
  const particles = useMemo(() => {
    return Array.from({ length: 32 }).map((_, index) => {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const radius = 2.4 + Math.random() * 1.4;

      return {
        position: [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ] as const,
        key: `particle-${index}`
      };
    });
  }, []);

  return (
    <group>
      {particles.map(particle => (
        <Float
          key={particle.key}
          speed={animate ? 1.8 : 0}
          rotationIntensity={animate ? 0.4 : 0}
          floatIntensity={animate ? 0.6 : 0}
          floatingRange={animate ? [-0.1, 0.1] : [0, 0]}
        >
          <mesh position={particle.position}>
            <sphereGeometry args={[0.08, 14, 14]} />
            <meshStandardMaterial color={0x8b5cf6} emissive={0x28125a} emissiveIntensity={0.7} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function HeroOrbitalScene() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <div className="relative aspect-square w-full max-w-sm">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/25 blur-3xl" aria-hidden="true" />
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} color={0x6ef2ff} />
        <directionalLight intensity={0.9} position={[3, 3, 5]} color={0xffffff} />
        <TorusKnot animate={animate} />
        <FloatingParticles animate={animate} />
      </Canvas>
      <div className="absolute inset-x-0 bottom-0 text-center text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
        Real-time WebGL vibes
      </div>
    </div>
  );
}

export default HeroOrbitalScene;
