"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, useProgress, Float } from "@react-three/drei";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Model } from "./building-model";
import { tierInfo, type Tier } from "@/lib/data/floors";

export type EnvironmentMode = "sunrise" | "sunset" | "midnight";
export type MaterialTheme = "cyber-gold" | "emerald-onyx" | "nordic-marble";
export type CameraPreset = "bird-eye" | "front" | "top";

/** In-canvas loading feedback */
function ModelLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-bone-2 bg-ink/90 p-4 border border-line">
        <div
          className="h-px bg-brass transition-all duration-300"
          style={{ width: `${progress}px`, maxWidth: "120px" }}
        />
        <span>INITIALIZING 3D ENVIRONMENT... {Math.round(progress)}%</span>
      </div>
    </Html>
  );
}

const HOTSPOTS: { tier: Tier; position: [number, number, number]; targetY: number }[] = [
  { tier: "foundation", position: [3.6, 1.1, 0], targetY: 1.1 },
  { tier: "crown", position: [3.6, 3.3, 0], targetY: 3.3 },
  { tier: "summit", position: [3.6, 5.4, 0], targetY: 5.4 },
];

const ENV_SETTINGS: Record<
  EnvironmentMode,
  { bg: string; fog: string; keyColor: string; rimColor: string; keyIntensity: number }
> = {
  sunrise: {
    bg: "#181024",
    fog: "#181024",
    keyColor: "#ffc2a0",
    rimColor: "#ff77aa",
    keyIntensity: 3.0,
  },
  sunset: {
    bg: "#1a0d14",
    fog: "#1a0d14",
    keyColor: "#ff9900",
    rimColor: "#ff0055",
    keyIntensity: 3.8,
  },
  midnight: {
    bg: "#0b0d14",
    fog: "#0b0d14",
    keyColor: "#ffb700",
    rimColor: "#00e5ff",
    keyIntensity: 3.5,
  },
};

/** Particle field overlay for 3D depth */
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesCount = 200;
  const positions = useRef(
    (() => {
      const pos = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 20;
        pos[i * 3 + 1] = Math.random() * 10;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      }
      return pos;
    })()
  );

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#b08d57"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

/** Smooth camera & OrbitControls target transition when tier or preset changes */
function CameraController({
  selectedTier,
  preset = "front",
  autoRotateSpeed = 1.0,
}: {
  selectedTier: Tier | null;
  preset?: CameraPreset;
  autoRotateSpeed?: number;
}) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  const targetYRef = useRef(2.8);
  const targetCamYRef = useRef(4.0);
  const targetCamDistRef = useRef(9.0);

  useEffect(() => {
    if (preset === "top") {
      targetYRef.current = 3.5;
      targetCamYRef.current = 12.0;
      targetCamDistRef.current = 2.0;
      return;
    }
    if (preset === "bird-eye") {
      targetYRef.current = 4.5;
      targetCamYRef.current = 9.0;
      targetCamDistRef.current = 14.0;
      return;
    }

    if (!selectedTier) {
      targetYRef.current = 2.8;
      targetCamYRef.current = 4.0;
      targetCamDistRef.current = 9.0;
      return;
    }
    const spot = HOTSPOTS.find((h) => h.tier === selectedTier);
    if (spot) {
      targetYRef.current = spot.targetY;
      targetCamYRef.current = spot.targetY + 1.2;
    }
  }, [selectedTier, preset]);

  useFrame((_, delta) => {
    if (controlsRef.current) {
      controlsRef.current.target.y = THREE.MathUtils.lerp(
        controlsRef.current.target.y,
        targetYRef.current,
        delta * 3.5
      );
      controlsRef.current.update();
    }

    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      targetCamYRef.current,
      delta * 2.5
    );
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      minDistance={4}
      maxDistance={22}
      maxPolarAngle={Math.PI / 2.05}
      minPolarAngle={Math.PI / 8}
      target={[0, 2.8, 0]}
      autoRotate={autoRotateSpeed > 0}
      autoRotateSpeed={autoRotateSpeed}
    />
  );
}

export function BuildingScene({
  selectedTier,
  hoveredTier,
  envMode = "midnight",
  materialTheme = "cyber-gold",
  cameraPreset = "front",
  exploded = false,
  autoRotateSpeed = 1.0,
  onSelect,
  onHover,
}: {
  selectedTier: Tier | null;
  hoveredTier: Tier | null;
  envMode?: EnvironmentMode;
  materialTheme?: MaterialTheme;
  cameraPreset?: CameraPreset;
  exploded?: boolean;
  autoRotateSpeed?: number;
  onSelect: (tier: Tier | null) => void;
  onHover: (tier: Tier | null) => void;
}) {
  const [lost, setLost] = useState(false);
  const [canRetry, setCanRetry] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);

  const env = ENV_SETTINGS[envMode];

  useEffect(() => {
    if (!lost) return;
    const timer = setTimeout(() => setCanRetry(true), 2500);
    return () => clearTimeout(timer);
  }, [lost]);

  const handleCreated = useCallback(({ gl }: { gl: import("three").WebGLRenderer }) => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      setLost(true);
    });
    canvas.addEventListener("webglcontextrestored", () => {
      setLost(false);
      setCanRetry(false);
    });
  }, []);

  const retry = () => {
    setLost(false);
    setCanRetry(false);
    setCanvasKey((k) => k + 1);
  };

  return (
    <>
      <Canvas
        key={canvasKey}
        camera={{ position: [9, 4, 9], fov: 40 }}
        dpr={1}
        gl={{
          antialias: false,
          powerPreference: "default",
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={handleCreated}
        onPointerMissed={() => onSelect(null)}
      >
        {/* Dynamic environment background & fog */}
        <color attach="background" args={[env.bg]} />
        <fog attach="fog" args={[env.fog, 12, 26]} />

        {/* Dynamic multi-spectrum lighting */}
        <ambientLight intensity={0.6} color="#e0f2fe" />
        <directionalLight position={[8, 12, 6]} intensity={env.keyIntensity} color={env.keyColor} />
        <directionalLight position={[-8, 4, -6]} intensity={1.8} color={env.rimColor} />
        <directionalLight position={[0, -6, 0]} intensity={0.6} color="#ff8c00" />
        <pointLight position={[0, 5, 0]} intensity={3.0} color={env.keyColor} distance={12} />

        {/* 3D Particle Starfield */}
        <ParticleField />

        <Suspense fallback={<ModelLoader />}>
          <Float speed={exploded ? 2 : 1} rotationIntensity={0.2} floatIntensity={0.3}>
            <BuildingDrift exploded={exploded}>
              <Model scale={8} position={[0, 0, 0]} />
            </BuildingDrift>
          </Float>
        </Suspense>

        {HOTSPOTS.map((h) => (
          <Hotspot
            key={h.tier}
            position={h.position}
            label={tierInfo[h.tier].label.split(" ")[0]}
            active={h.tier === selectedTier || h.tier === hoveredTier}
            onClick={() => onSelect(h.tier)}
            onHover={(v) => onHover(v ? h.tier : null)}
          />
        ))}

        <CameraController
          selectedTier={selectedTier}
          preset={cameraPreset}
          autoRotateSpeed={autoRotateSpeed}
        />
      </Canvas>

      {lost && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink/90 font-mono text-[10px] uppercase tracking-widest text-bone-2">
          <span>Reconnecting 3D view…</span>
          {canRetry && (
            <button
              onClick={retry}
              className="cursor-pointer border border-brass/60 px-4 py-2 text-brass hover:bg-brass hover:text-ink"
            >
              Retry
            </button>
          )}
        </div>
      )}
    </>
  );
}

/** Cursor-following drift animation with interactive exploded offset */
function BuildingDrift({ children, exploded }: { children: React.ReactNode; exploded?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    target.current.x = THREE.MathUtils.lerp(target.current.x, state.pointer.x, 0.04);
    target.current.y = THREE.MathUtils.lerp(target.current.y, state.pointer.y, 0.04);
    if (groupRef.current) {
      groupRef.current.rotation.y = target.current.x * 0.15;
      groupRef.current.rotation.x = -target.current.y * 0.05;

      const targetY = exploded ? 0.8 : 0;
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 3);
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

function Hotspot({
  position,
  label,
  active,
  onClick,
  onHover,
}: {
  position: [number, number, number];
  label: string;
  active: boolean;
  onClick: () => void;
  onHover: (v: boolean) => void;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      const s = 1 + Math.sin(state.clock.getElapsedTime() * 4) * 0.2;
      ringRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={position}>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.18, 0.22, 32]} />
        <meshBasicMaterial
          color={active ? "#b08d57" : "#ede9e3"}
          transparent
          opacity={active ? 0.8 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial
          color={active ? "#b08d57" : "#ede9e3"}
          transparent
          opacity={active ? 1 : 0.7}
        />
      </mesh>

      <Html distanceFactor={12} occlude={false} zIndexRange={[10, 0]}>
        <button
          onClick={onClick}
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          className={`-translate-y-1/2 cursor-pointer whitespace-nowrap border px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-widest backdrop-blur-md transition-all duration-300 ${
            active
              ? "border-[#b08d57] bg-[#b08d57] text-black shadow-[0_0_15px_rgba(176,141,87,0.6)] scale-110"
              : "border-white/30 bg-black/80 text-white hover:border-[#b08d57] hover:text-[#b08d57]"
          }`}
        >
          {label}
        </button>
      </Html>
    </group>
  );
}
