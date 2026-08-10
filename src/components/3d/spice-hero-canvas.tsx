import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Pure Volumetric 3D Gold & Saffron Glitter Atmosphere Scene
function PureGlitterScene({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!groupRef.current || !mouse.current) return;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.current.y * 0.12,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.current.x * 0.12,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      {/* Soft Ambient & Accent Studio Lighting */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 8, 6]} intensity={1.8} color="#FFF5EA" />
      <pointLight position={[-5, -2, 2]} intensity={1.2} color="#D4AF37" />

      {/* Layer 1: Fine Jaipur Gold Dust (Drifting in deep 3D space) */}
      <Sparkles count={170} scale={[20, 14, 12]} size={3.8} speed={0.6} opacity={0.7} color="#E6C687" />

      {/* Layer 2: Glowing Saffron Crimson Embers */}
      <Sparkles count={120} scale={[18, 12, 10]} size={3.2} speed={0.9} opacity={0.6} color="#E63946" />

      {/* Layer 3: Radiant Amber Shimmer Points */}
      <Sparkles count={80} scale={[16, 10, 8]} size={2.4} speed={1.2} opacity={0.5} color="#FFC107" />
    </group>
  );
}

export default function SpiceHeroCanvas() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement("canvas");
      const isSupported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setHasWebGL(isSupported);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientWidth, clientHeight } = e.currentTarget;
    const x = (e.clientX / clientWidth) * 2 - 1;
    const y = -(e.clientY / clientHeight) * 2 + 1;
    mouse.current = { x, y };
  };

  // Safe SSR Fallback (prevents Node.js server crashes during initial SSR)
  if (!mounted || !hasWebGL) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 z-10 w-full h-full pointer-events-auto"
      onMouseMove={handleMouseMove}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <PureGlitterScene mouse={mouse} />
      </Canvas>
    </div>
  );
}
