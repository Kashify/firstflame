import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, ContactShadows, Text } from "@react-three/drei";
import * as THREE from "three";

interface Product3DViewerProps {
  productName: string;
  categoryName: string;
  primaryColor?: string;
}

function PrecisionSpiceJar({ productName, categoryName, primaryColor = "#C94A29" }: Product3DViewerProps) {
  const jarRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!jarRef.current) return;
    jarRef.current.rotation.y += 0.004;
  });

  return (
    <group ref={jarRef} position={[0, -0.15, 0]} scale={1.1}>
      {/* Brass Gold Cap */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.62, 0.64, 0.28, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.88} roughness={0.2} />
      </mesh>

      {/* Cap Rim Detail */}
      <mesh position={[0, 1.08, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.06, 32]} />
        <meshStandardMaterial color="#AA771C" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Glass Body */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.65, 0.63, 1.9, 32]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.92}
          opacity={1}
          transparent={true}
          roughness={0.08}
          ior={1.5}
          thickness={0.35}
        />
      </mesh>

      {/* Spice Powder Filling Inside Glass */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.6, 0.58, 1.6, 32]} />
        <meshStandardMaterial color={primaryColor} roughness={0.88} metalness={0.02} />
      </mesh>

      {/* Luxury Parchment Paper Label */}
      <mesh position={[0, 0.05, 0.015]}>
        <cylinderGeometry args={[0.655, 0.655, 1.05, 32, 1, true, -Math.PI * 0.45, Math.PI * 0.9]} />
        <meshStandardMaterial color="#FAF5EB" roughness={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Brand Text */}
      <Text
        position={[0, 0.32, 0.67]}
        fontSize={0.075}
        color="#1E3729"
        anchorX="center"
        anchorY="middle"
      >
        FIRST FLAME MASALA
      </Text>

      <Text
        position={[0, 0.1, 0.67]}
        fontSize={0.1}
        color="#8B2613"
        anchorX="center"
        anchorY="middle"
      >
        {productName.toUpperCase()}
      </Text>

      <Text
        position={[0, -0.12, 0.67]}
        fontSize={0.055}
        color="#4A5568"
        anchorX="center"
        anchorY="middle"
      >
        {categoryName} • SINGLE ORIGIN
      </Text>

      <Text
        position={[0, -0.3, 0.67]}
        fontSize={0.05}
        color="#D4AF37"
        anchorX="center"
        anchorY="middle"
      >
        ★ ★ ★ ★ ★  BATCH #1974
      </Text>
    </group>
  );
}

export default function Product3DViewer({ productName, categoryName, primaryColor = "#C94A29" }: Product3DViewerProps) {
  const [mounted, setMounted] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative h-[420px] w-full rounded-3xl border border-border bg-surface flex items-center justify-center p-4">
        <span className="eyebrow text-gold font-semibold">Loading 3D Inspector...</span>
      </div>
    );
  }

  return (
    <div className="relative h-[420px] w-full rounded-3xl border border-border bg-gradient-to-b from-surface via-background to-surface p-4 overflow-hidden shadow-soft">
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="rounded-full bg-background/80 backdrop-blur-md px-3.5 py-1 text-xs font-medium border border-border text-foreground shadow-sm transition-all hover:bg-surface"
        >
          {autoRotate ? "Pause Spin" : "Auto Spin"}
        </button>
      </div>

      <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
        <span className="eyebrow text-gold font-semibold">3D Packaging Inspector</span>
        <p className="text-xs text-muted-foreground">Drag to rotate 360° • Scroll to zoom</p>
      </div>

      <Canvas
        camera={{ position: [0, 0.4, 4.0], fov: 45 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 6, 4]} intensity={1.8} color="#FFF5EA" castShadow />
        <directionalLight position={[-4, 2, -2]} intensity={0.8} color="#D4AF37" />
        <pointLight position={[0, -2, 3]} intensity={0.6} color="#FFD700" />

        <Float speed={1} rotationIntensity={0.15} floatIntensity={0.3}>
          <PrecisionSpiceJar productName={productName} categoryName={categoryName} primaryColor={primaryColor} />
        </Float>

        <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={4} blur={2} far={4} color="#1E3729" />

        <OrbitControls
          enableZoom={true}
          minDistance={2.5}
          maxDistance={5.5}
          autoRotate={autoRotate}
          autoRotateSpeed={1.5}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
