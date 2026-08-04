import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Float, Text } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "motion/react";
import { RefreshCw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

function StoneGrinderMesh({ isGrinding }: { isGrinding: boolean }) {
  const mortarRef = useRef<THREE.Mesh>(null!);
  const pestleRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pestleRef.current) {
      if (isGrinding) {
        pestleRef.current.rotation.y = t * 6;
        pestleRef.current.position.x = Math.sin(t * 8) * 0.15;
        pestleRef.current.position.z = Math.cos(t * 8) * 0.15;
        pestleRef.current.position.y = 0.2 + Math.abs(Math.sin(t * 12)) * 0.1;
      } else {
        pestleRef.current.rotation.y = Math.sin(t * 0.8) * 0.2;
        pestleRef.current.position.x = THREE.MathUtils.lerp(pestleRef.current.position.x, 0, 0.1);
        pestleRef.current.position.z = THREE.MathUtils.lerp(pestleRef.current.position.z, 0, 0.1);
        pestleRef.current.position.y = THREE.MathUtils.lerp(pestleRef.current.position.y, 0.3, 0.1);
      }
    }
  });

  return (
    <group position={[0, -0.4, 0]}>
      {/* Stone Mortar Bowl */}
      <mesh ref={mortarRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[1.3, 0.9, 1.0, 32, 1, false]} />
        <meshStandardMaterial color="#2E3430" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Mortar Inner Cavity */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[1.15, 0.7, 0.6, 32]} />
        <meshStandardMaterial color="#222724" roughness={0.95} />
      </mesh>

      {/* Freshly Ground Spice Powder inside */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1.0, 0.65, 0.25, 32]} />
        <meshStandardMaterial color="#E65100" roughness={0.9} />
      </mesh>

      {/* Stone Pestle (Grinder Handle) */}
      <group ref={pestleRef} position={[0, 0.3, 0]} rotation={[0.25, 0, 0.15]}>
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.2, 0.38, 1.6, 24]} />
          <meshStandardMaterial color="#1C211E" roughness={0.85} metalness={0.15} />
        </mesh>
        <mesh position={[0, 1.6, 0]}>
          <sphereGeometry args={[0.26, 16, 16]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* Grinding Particles */}
      {isGrinding && (
        <>
          <Sparkles count={80} scale={[2, 1, 2]} size={4} speed={2} opacity={0.9} color="#FF9800" />
          <Sparkles count={50} scale={[1.8, 1.2, 1.8]} size={3} speed={3} opacity={0.8} color="#FFD700" />
        </>
      )}
    </group>
  );
}

export default function SpiceGrinderInteractive() {
  const [isGrinding, setIsGrinding] = useState(false);
  const [grindCount, setGrindCount] = useState(0);

  const handleStartGrind = () => {
    setIsGrinding(true);
    setGrindCount((prev) => prev + 1);
  };

  const handleStopGrind = () => {
    setIsGrinding(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-surface border border-border rounded-3xl p-6 sm:p-10 my-12 overflow-hidden relative">
      <div className="space-y-4 z-10">
        <span className="eyebrow text-gold flex items-center gap-2">
          <Zap className="h-3.5 w-3.5" /> Interactive Traditional Milling
        </span>
        <h3 className="font-display text-3xl sm:text-4xl text-foreground">
          Stone-Ground at Low Speeds to Retain Volatile Essential Oils
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Industrial steel rollers burn off essential aroma oils at 120°C. We use Jaipur granite stone mills operating under 40 RPM to preserve volatile terpenes, vibrant natural color, and ancestral aroma.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <Button
            size="lg"
            onMouseDown={handleStartGrind}
            onMouseUp={handleStopGrind}
            onTouchStart={handleStartGrind}
            onTouchEnd={handleStopGrind}
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 gold-border-glow select-none"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isGrinding ? "animate-spin" : ""}`} />
            {isGrinding ? "Milling Spice Oils..." : "Hold to Grind Spices"}
          </Button>
          <span className="text-xs text-muted-foreground">
            Total Batches Ground: <strong className="text-gold font-display text-base">{grindCount * 250 + 1974} g</strong>
          </span>
        </div>
      </div>

      <div className="relative h-[340px] w-full rounded-2xl bg-background border border-border overflow-hidden">
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground bg-surface/80 px-2.5 py-1 rounded-full border border-border">
            Granite Stone Mill • 38 RPM
          </span>
        </div>
        <Canvas camera={{ position: [0, 1.8, 3.5], fov: 45 }}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[3, 5, 3]} intensity={1.6} color="#FFF3E0" />
          <pointLight position={[-2, 1, 2]} intensity={0.8} color="#FF9800" />
          <StoneGrinderMesh isGrinding={isGrinding} />
        </Canvas>
      </div>
    </div>
  );
}
