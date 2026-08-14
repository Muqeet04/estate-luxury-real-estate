"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic-button";
import { CursorTarget } from "@/components/providers/cursor-provider";
import { useSound } from "@/components/providers/sound-provider";
import type { EnvironmentMode, MaterialTheme, CameraPreset } from "@/components/three/building-scene";

const BuildingScene = dynamic(
  () => import("@/components/three/building-scene").then((m) => m.BuildingScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center font-mono text-[0.75rem] uppercase tracking-widest text-bone-2 bg-ink">
        <div className="flex flex-col items-center gap-3">
          <div className="h-px w-20 bg-brass animate-pulse" />
          <span>INITIALIZING 3D ENVIRONMENT...</span>
        </div>
      </div>
    ),
  }
);

export type ConstructionStage = "foundation" | "structure" | "enclosure" | "landscaping" | "spaces";

export const STAGES: { id: ConstructionStage; step: string; title: string; desc: string }[] = [
  {
    id: "foundation",
    step: "01",
    title: "FOUNDATION",
    desc: "Deep pile subterranean concrete core engineered for seismic stability and load distribution.",
  },
  {
    id: "structure",
    step: "02",
    title: "STRUCTURE",
    desc: "Reinforced steel exoskeleton and column-free floor plates offering 360-degree clear span views.",
  },
  {
    id: "enclosure",
    step: "03",
    title: "ENCLOSURE",
    desc: "Low-emissivity double-glazed glass curtain wall system with acoustic insulation and UV filters.",
  },
  {
    id: "landscaping",
    step: "04",
    title: "LANDSCAPING",
    desc: "Elevated infinity pools, sky gardens, and perimeter green spaces integrated into the facade.",
  },
  {
    id: "spaces",
    step: "05",
    title: "THE SPACES",
    desc: "Bespoke interior architecture, Italian marble flooring, and smart home climate automation.",
  },
];

export function Tour3D() {
  const [activeStage, setActiveStage] = useState<ConstructionStage>("structure");
  const [hoveredStage, setHoveredStage] = useState<ConstructionStage | null>(null);
  const [envMode, setEnvMode] = useState<EnvironmentMode>("midnight");
  const [materialTheme, setMaterialTheme] = useState<MaterialTheme>("cyber-gold");
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>("front");
  const [exploded, setExploded] = useState<boolean>(false);
  const [rotateSpeed, setRotateSpeed] = useState<number>(1.0);

  const { playClick, playHover, playChime } = useSound();
  const stage = STAGES.find((s) => s.id === (hoveredStage ?? activeStage))!;

  return (
    <section id="tour3d" className="section-divider bg-ink px-6 py-28 md:px-12">
      {/* Intro Quote Banner */}
      <Reveal className="mb-16 text-center max-w-4xl mx-auto">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-brass mb-4 flex items-center justify-center gap-2">
          <span>◆</span>
          <span>PRE-CONSTRUCTION VISUALIZATION & 3D MOTION</span>
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-bone leading-tight">
          Watch Yours Built,<br />
          <span className="font-instrument text-brass italic font-normal">Before It&apos;s Built.</span>
        </h2>
        <p className="mt-6 font-mono text-xs md:text-sm tracking-[0.15em] uppercase text-bone-2 leading-relaxed">
          &ldquo;EVERY HOUSE IS A BLUEPRINT WAITING FOR THE PEOPLE WHO WILL LIVE IN IT.&rdquo;
        </p>
        <div className="mt-8 h-px w-20 bg-brass mx-auto" />
      </Reveal>

      {/* 3D Model + Controls Grid */}
      <div className="grid gap-px lg:grid-cols-[1.8fr_1fr] border border-line bg-line">
        {/* 3D Canvas */}
        <div className="relative aspect-[4/3] overflow-hidden bg-ink-2 md:aspect-[16/9] group">
          {/* Top Left HUD Bar */}
          <div className="absolute left-4 top-4 z-10 flex flex-wrap items-center gap-3 font-mono text-[0.65rem] uppercase tracking-widest text-bone-2 bg-ink/80 px-4 py-2 backdrop-blur-md border border-line">
            <span className="h-2 w-2 rounded-full bg-brass animate-pulse" />
            <span>STAGE {stage.step}: {stage.title}</span>
          </div>

          {/* Top Right Live Environment Controls */}
          <div className="absolute right-4 top-4 z-10 flex items-center gap-1.5 bg-ink/80 p-1.5 backdrop-blur-md border border-line">
            {[
              { id: "sunrise", label: "☀️ DAWN" },
              { id: "sunset", label: "🌅 SUNSET" },
              { id: "midnight", label: "🌙 NIGHT" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setEnvMode(m.id as EnvironmentMode);
                  playChime();
                }}
                onMouseEnter={playHover}
                className={`px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest transition-all cursor-pointer ${
                  envMode === m.id
                    ? "border border-brass bg-brass text-ink font-bold"
                    : "text-bone-2 hover:text-bone"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Bottom Left 3D Camera Angles & Exploded Controls */}
          <div className="absolute left-4 bottom-4 z-10 flex flex-wrap items-center gap-2 bg-ink/80 p-2 backdrop-blur-md border border-line font-mono text-[0.6rem] uppercase">
            <button
              onClick={() => {
                setExploded((prev) => !prev);
                playChime();
              }}
              onMouseEnter={playHover}
              className={`px-3 py-1 border transition-all cursor-pointer font-bold ${
                exploded ? "border-brass bg-brass text-ink" : "border-line text-brass hover:border-brass"
              }`}
            >
              {exploded ? "💥 EXPLODED VIEW: ON" : "💥 EXPLODE MODEL"}
            </button>

            <span className="text-bone-3 px-1">ANGLE:</span>
            {[
              { id: "front", label: "👁️ FRONT" },
              { id: "bird-eye", label: "🦅 BIRD EYE" },
              { id: "top", label: "📐 TOP" },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setCameraPreset(p.id as CameraPreset);
                  playClick();
                }}
                onMouseEnter={playHover}
                className={`px-2 py-1 border transition-all cursor-pointer ${
                  cameraPreset === p.id
                    ? "border-brass bg-brass text-ink font-bold"
                    : "border-line text-bone-2 hover:text-bone"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Bottom Right 3D Rotation Speed Controls */}
          <div className="absolute right-4 bottom-4 z-10 hidden sm:flex items-center gap-1.5 bg-ink/80 p-1.5 backdrop-blur-md border border-line font-mono text-[0.6rem] uppercase">
            <span className="text-bone-3 px-1">ORBIT:</span>
            {[
              { speed: 0, label: "⏸️ 0x" },
              { speed: 0.5, label: "0.5x" },
              { speed: 1.5, label: "1.5x" },
              { speed: 3.0, label: "3.0x" },
            ].map((s) => (
              <button
                key={s.speed}
                onClick={() => {
                  setRotateSpeed(s.speed);
                  playClick();
                }}
                onMouseEnter={playHover}
                className={`px-2 py-1 border transition-all cursor-pointer ${
                  rotateSpeed === s.speed
                    ? "border-brass bg-brass text-ink font-bold"
                    : "border-line text-bone-2 hover:text-bone"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Corner framing brackets */}
          <div className="pointer-events-none absolute left-0 top-0 h-10 w-10 border-l-2 border-t-2 border-brass/60" />
          <div className="pointer-events-none absolute right-0 top-0 h-10 w-10 border-r-2 border-t-2 border-brass/60" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-10 border-b-2 border-l-2 border-brass/60" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-brass/60" />

          <BuildingScene
            selectedTier={activeStage === "foundation" ? "foundation" : activeStage === "structure" ? "crown" : "summit"}
            hoveredTier={null}
            envMode={envMode}
            materialTheme={materialTheme}
            cameraPreset={cameraPreset}
            exploded={exploded}
            autoRotateSpeed={rotateSpeed}
            onSelect={() => {}}
            onHover={() => {}}
          />
        </div>

        {/* Construction Sequence Controls */}
        <div className="bg-ink-2 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-[0.65rem] uppercase tracking-widest text-bone-2">
              <span>PROGRESSION PHASES</span>
              <span className="text-brass font-bold">STAGE {stage.step} / 05</span>
            </div>

            <div className="pt-6">
              <div className="h-px w-14 bg-brass mb-6" />
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-brass">
                PHASE {stage.step}
              </p>
              <h3 className="font-display text-3xl md:text-4xl font-bold uppercase text-bone mt-1 tracking-tight">
                {stage.title}
              </h3>
              <p className="mt-4 text-sm text-bone-2 leading-relaxed font-body">
                {stage.desc}
              </p>
            </div>
          </div>

          {/* Interactive Timeline Tabs */}
          <div className="mt-10 border-t border-line pt-6">
            <p className="mb-4 font-mono text-[0.65rem] uppercase tracking-widest text-bone-2 flex justify-between">
              <span>SELECT CONSTRUCTION STAGE</span>
              <span className="text-brass">CLICK TO PREVIEW</span>
            </p>
            <div className="space-y-2">
              {STAGES.map((s) => (
                <CursorTarget key={s.id} mode="swap">
                  <button
                    onClick={() => {
                      setActiveStage(s.id);
                      playClick();
                    }}
                    onMouseEnter={() => {
                      setHoveredStage(s.id);
                      playHover();
                    }}
                    onMouseLeave={() => setHoveredStage(null)}
                    className={`w-full flex items-center justify-between px-4 py-3 border font-mono text-[0.7rem] uppercase tracking-widest transition-all cursor-pointer ${
                      activeStage === s.id
                        ? "border-brass bg-brass text-ink font-bold shadow-[0_0_15px_rgba(176,141,87,0.25)]"
                        : "border-line text-bone-2 hover:border-white/40 hover:text-bone bg-ink/40"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={activeStage === s.id ? "text-ink" : "text-brass"}>
                        {s.step}
                      </span>
                      <span>{s.title}</span>
                    </span>
                    <span>{activeStage === s.id ? "ACTIVE" : "VIEW →"}</span>
                  </button>
                </CursorTarget>
              ))}
            </div>

            <Magnetic className="mt-6 w-full">
              <a
                href="#contact"
                className="block w-full text-center bg-brass px-6 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink font-bold transition-all hover:bg-brass-hi shadow-[0_0_20px_rgba(176,141,87,0.2)]"
              >
                BOOK PRE-CONSTRUCTION TOUR
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
