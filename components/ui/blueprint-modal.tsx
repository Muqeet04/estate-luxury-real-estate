"use client";

import { useState } from "react";
import { type ResidenceItem } from "@/components/sections/residences";
import { CursorTarget } from "@/components/providers/cursor-provider";

export function BlueprintModal({
  item,
  onClose,
}: {
  item: ResidenceItem | null;
  onClose: () => void;
}) {
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");
  const [activeFloor, setActiveFloor] = useState<number>(1);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 backdrop-blur-md p-4 md:p-10">
      <div className="relative w-full max-w-5xl border border-line bg-ink-2 p-6 md:p-10 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 font-mono text-xs tracking-widest text-bone-2 uppercase hover:text-brass transition-colors cursor-pointer border border-line px-3 py-1.5"
        >
          CLOSE [ESC] ×
        </button>

        {/* Modal Header */}
        <div className="border-b border-line pb-6">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-brass flex items-center gap-2">
            <span>◆</span>
            <span>ARCHITECTURAL BLUEPRINT SPECIFICATION · {item.code}</span>
          </p>
          <h3 className="font-display text-3xl md:text-5xl font-bold uppercase text-bone mt-2">
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-bone-2 font-mono">
            PLOT CATEGORY: <span className="text-brass">{item.categoryLabel}</span> · AREA: <span className="text-brass">{item.area}</span> · DIMENSIONS: <span className="text-brass">{item.dimensions}</span>
          </p>
        </div>

        {/* Blueprint Viewer Grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.8fr_1fr]">
          {/* Blueprint Canvas Container */}
          <div className="relative aspect-[4/3] border border-line bg-ink p-6 flex flex-col justify-between overflow-hidden group">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-widest border-b border-line pb-3 z-10">
              <span className="text-brass flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brass animate-pulse" />
                <span>SCHEMATIC VIEWER · FLOOR {activeFloor}</span>
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("2d")}
                  className={`px-3 py-1 border transition-all cursor-pointer ${
                    viewMode === "2d" ? "border-brass bg-brass text-ink font-bold" : "border-line text-bone-2"
                  }`}
                >
                  2D SCHEMATIC
                </button>
                <button
                  onClick={() => setViewMode("3d")}
                  className={`px-3 py-1 border transition-all cursor-pointer ${
                    viewMode === "3d" ? "border-brass bg-brass text-ink font-bold" : "border-line text-bone-2"
                  }`}
                >
                  3D ISOMETRIC
                </button>
              </div>
            </div>

            {/* SVG Blueprint Illustration */}
            <div className="relative my-6 flex-1 flex items-center justify-center">
              {viewMode === "2d" ? (
                <svg
                  viewBox="0 0 600 400"
                  className="w-full h-full max-h-[300px] text-brass stroke-current fill-none stroke-[1.5]"
                >
                  {/* Grid Lines */}
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(176,141,87,0.15)" strokeWidth="0.5" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Outer Walls */}
                  <rect x="50" y="40" width="500" height="320" stroke="#b08d57" strokeWidth="3" />

                  {/* Rooms */}
                  <rect x="50" y="40" width="220" height="180" stroke="#b08d57" strokeWidth="2" />
                  <text x="160" y="130" fill="#ede9e3" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle">
                    GRAND LOUNGE (24&apos; x 18&apos;)
                  </text>

                  <rect x="270" y="40" width="280" height="180" stroke="#b08d57" strokeWidth="2" />
                  <text x="410" y="130" fill="#ede9e3" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle">
                    MASTER SUITE (28&apos; x 18&apos;)
                  </text>

                  <rect x="50" y="220" width="300" height="140" stroke="#b08d57" strokeWidth="2" />
                  <text x="200" y="295" fill="#ede9e3" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle">
                    DINING & KITCHEN (30&apos; x 14&apos;)
                  </text>

                  <rect x="350" y="220" width="200" height="140" stroke="#b08d57" strokeWidth="2" />
                  <text x="450" y="295" fill="#ede9e3" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle">
                    PATIO & TERRACE
                  </text>

                  {/* Dimensions */}
                  <line x1="50" y1="20" x2="550" y2="20" stroke="#b08d57" strokeWidth="1" strokeDasharray="4 4" />
                  <text x="300" y="15" fill="#b08d57" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
                    DIMENSION: {item.dimensions} FT
                  </text>
                </svg>
              ) : (
                <svg
                  viewBox="0 0 600 400"
                  className="w-full h-full max-h-[300px] text-brass stroke-current fill-none stroke-[1.5]"
                >
                  {/* Isometric 3D Wireframe Simulation */}
                  <g transform="translate(300, 200) rotate(-30) skewX(30) scale(0.8)">
                    {/* Substructure */}
                    <rect x="-180" y="-140" width="360" height="280" stroke="#b08d57" strokeWidth="2" fill="rgba(176,141,87,0.05)" />
                    {/* Walls 3D height */}
                    <path d="M-180,-140 L-180,-200 L180,-200 L180,-140 Z" stroke="#b08d57" strokeWidth="1.5" />
                    <path d="M180,-140 L180,-200 L180,80 L180,140 Z" stroke="#b08d57" strokeWidth="1.5" />
                    <path d="M-180,140 L-180,80 L180,80 L180,140 Z" stroke="#b08d57" strokeWidth="1.5" />
                  </g>
                  <text x="300" y="360" fill="#ede9e3" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">
                    ISOMETRIC 3D STRUCTURAL WIREFRAME
                  </text>
                </svg>
              )}
            </div>

            {/* Floor Selector */}
            <div className="flex items-center justify-between border-t border-line pt-3 font-mono text-[0.65rem] uppercase">
              <span className="text-bone-3">SELECT FLOOR LEVEL:</span>
              <div className="flex gap-2">
                {[1, 2, 3].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFloor(f)}
                    className={`px-3 py-1 border transition-all cursor-pointer ${
                      activeFloor === f ? "border-brass bg-brass text-ink font-bold" : "border-line text-bone-2"
                    }`}
                  >
                    FLOOR 0{f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Specification Sidebar */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-brass border-b border-line pb-3">
                KEY SPECIFICATIONS
              </p>

              <dl className="mt-6 space-y-4 font-mono text-xs">
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-bone-3">TOTAL COVERED AREA</dt>
                  <dd className="text-bone font-bold">{item.area}</dd>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-bone-3">PLOT SIZE</dt>
                  <dd className="text-brass font-bold">{item.dimensions} FT</dd>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-bone-3">BUILDING ELEVATION</dt>
                  <dd className="text-bone font-bold">{item.floors}</dd>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-bone-3">BEDROOM SUITES</dt>
                  <dd className="text-bone font-bold">4 MASTER ENSUITES</dd>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-bone-3">PARKING VAULT</dt>
                  <dd className="text-bone font-bold">2 COVERED BAYS</dd>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-bone-3">ESTIMATED PRICE</dt>
                  <dd className="text-brass font-bold">{item.price}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 pt-6 border-t border-line">
              <CursorTarget mode="link">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="block w-full text-center bg-brass px-6 py-4 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink font-bold transition-all hover:bg-brass-hi shadow-[0_0_20px_rgba(176,141,87,0.3)]"
                >
                  REQUEST OFFICIAL BLUEPRINT PDF →
                </a>
              </CursorTarget>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
