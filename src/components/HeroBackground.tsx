'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

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

interface ParticleFieldProps {
  count: number;
  animate: boolean;
}

function ParticleField({ count }: ParticleFieldProps) {
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Distribute particles in a sphere
      const radius = 8 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }

    return positions;
  }, [count]);

  return (
    <Points positions={positions}>
      <PointMaterial
        size={0.08}
        color="#8b5cf6"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </Points>
  );
}

interface GradientSphereProps {
  animate: boolean;
}

function GradientSphere({ animate }: GradientSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!animate || !meshRef.current) return;

    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.1;
    meshRef.current.rotation.x = Math.sin(time * 0.15) * 0.2;
  });

  const sphereGeom = useMemo(() => new THREE.SphereGeometry(2.5, 64, 64), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#6366f1',
        emissive: '#8b5cf6',
        emissiveIntensity: 0.3,
        metalness: 0.8,
        roughness: 0.2,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      }),
    []
  );

  return <primitive object={new THREE.Mesh(sphereGeom, material)} ref={meshRef} />;
}

export interface HeroBackgroundProps {
  className?: string;
  particleCount?: number;
  enableParticles?: boolean;
}

export function HeroBackground({
  className = '',
  particleCount = 200,
  enableParticles = true,
}: HeroBackgroundProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animate = !prefersReducedMotion;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reduce particle count on mobile
  const effectiveParticleCount = isMobile ? Math.floor(particleCount * 0.4) : particleCount;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-800/20" />

      {/* Animated gradient blobs */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30 blur-3xl"
           style={{
             animation: animate ? 'pulse 8s ease-in-out infinite' : 'none'
           }} />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-500/30 blur-3xl"
           style={{
             animation: animate ? 'pulse 10s ease-in-out infinite 2s' : 'none',
           }} />

      {/* WebGL Canvas */}
      {enableParticles && (
        <Canvas
          camera={{ position: [0, 0, 12], fov: 50 }}
          dpr={[1, isMobile ? 1.5 : 2]}
          performance={{ min: 0.5 }}
          gl={{
            alpha: true,
            antialias: !isMobile,
            powerPreference: 'low-power',
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />

          {!prefersReducedMotion && (
            <>
              <ParticleField count={effectiveParticleCount} animate={animate} />
              <GradientSphere animate={animate} />
            </>
          )}
        </Canvas>
      )}
    </div>
  );
}

export default HeroBackground;
