"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { CursorTarget } from "@/components/providers/cursor-provider";
import { BlueprintModal } from "@/components/ui/blueprint-modal";
import { useSound } from "@/components/providers/sound-provider";

export type ResidenceCategory = "5-marla" | "10-marla" | "1-kanal";

export interface ResidenceItem {
  id: string;
  category: ResidenceCategory;
  categoryLabel: string;
  title: string;
  code: string;
  area: string;
  dimensions: string;
  floors: string;
  price: string;
  status: "Available" | "Reserved" | "Sold Out";
  desc: string;
}

const RESIDENCES: ResidenceItem[] = [
  {
    id: "r1",
    category: "5-marla",
    categoryLabel: "5 Marla",
    title: "Compact Executive Villa",
    code: "PL-05M-A",
    area: "1,125 sq. ft",
    dimensions: "25 x 45",
    floors: "G + 2 Floors",
    price: "$180,000",
    status: "Available",
    desc: "Optimized contemporary floorplan featuring double-height ceiling lounge, private roof garden, and automated smart access.",
  },
  {
    id: "r2",
    category: "5-marla",
    categoryLabel: "5 Marla",
    title: "Urban Skyline Suite",
    code: "PL-05M-B",
    area: "1,125 sq. ft",
    dimensions: "25 x 45",
    floors: "G + 2 Floors",
    price: "$195,000",
    status: "Available",
    desc: "Corner plot placement with dual elevation glass facade, open-plan kitchen, and subterranean parking vault.",
  },
  {
    id: "r3",
    category: "10-marla",
    categoryLabel: "10 Marla",
    title: "The Horizon Residence",
    code: "PL-10M-A",
    area: "2,250 sq. ft",
    dimensions: "35 x 65",
    floors: "G + 2 Floors + Basement",
    price: "$340,000",
    status: "Available",
    desc: "Spacious family residence with interior courtyard garden, heated lap pool, four ensuite master bedrooms, and staff suite.",
  },
  {
    id: "r4",
    category: "10-marla",
    categoryLabel: "10 Marla",
    title: "The Celestial Wing",
    code: "PL-10M-B",
    area: "2,250 sq. ft",
    dimensions: "35 x 65",
    floors: "G + 2 Floors + Basement",
    price: "$365,000",
    status: "Reserved",
    desc: "Park-facing luxury villa featuring stone cladding exterior, private elevator, wine cellar, and outdoor terrace firepit.",
  },
  {
    id: "r5",
    category: "1-kanal",
    categoryLabel: "1 Kanal",
    title: "Grand Estate Villa",
    code: "PL-01K-A",
    area: "4,500 sq. ft",
    dimensions: "50 x 90",
    floors: "G + 3 Floors + Sub-Basement",
    price: "$680,000",
    status: "Available",
    desc: "The pinnacle of spatial luxury. Features 6 ensuite bedrooms, private infinity edge pool, 4-car showroom garage, and home cinema.",
  },
  {
    id: "r6",
    category: "1-kanal",
    categoryLabel: "1 Kanal",
    title: "The Zenith Penthouse Estate",
    code: "PL-01K-B",
    area: "4,500 sq. ft",
    dimensions: "50 x 90",
    floors: "G + 3 Floors + Rooftop",
    price: "$750,000",
    status: "Available",
    desc: "Palatial plot layout commanding 360-degree panorama, private spa deck, cantilevered glass lounge, and dedicated butler pantry.",
  },
];

export function Residences() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedBlueprint, setSelectedBlueprint] = useState<ResidenceItem | null>(null);
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  const { playClick, playHover, playChime } = useSound();

  const filtered = useMemo(
    () => (activeCategory === "all" ? RESIDENCES : RESIDENCES.filter((r) => r.category === activeCategory)),
    [activeCategory]
  );

  const toggleFlip = (id: string) => {
    setFlippedCardId((prev) => (prev === id ? null : id));
    playChime();
  };

  return (
    <>
      <section id="categories" className="section-divider bg-ink px-6 py-28 md:px-12">
        {/* Header */}
        <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-brass flex items-center gap-2">
              <span>◆</span>
              <span>RESIDENCES & PLOTS</span>
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-bone">
              Architectural<br />
              <span className="font-instrument text-brass italic font-normal">Categories.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-bone-2 leading-relaxed font-body">
            Select from 5 Marla executive villas to 1 Kanal grand estate plots. Inspect spatial dimensions, floor layouts, and architectural specifications.
          </p>
        </Reveal>

        {/* Category Tabs */}
        <div className="mb-12 flex flex-wrap gap-3">
          {[
            { id: "all", label: "ALL RESIDENCES" },
            { id: "5-marla", label: "5 MARLA (1,125 SQ FT)" },
            { id: "10-marla", label: "10 MARLA (2,250 SQ FT)" },
            { id: "1-kanal", label: "1 KANAL (4,500 SQ FT)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id);
                playClick();
              }}
              onMouseEnter={playHover}
              className={`border px-6 py-3 font-mono text-[0.7rem] uppercase tracking-[0.15em] transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? "border-brass bg-brass text-ink font-bold shadow-[0_0_15px_rgba(176,141,87,0.25)]"
                  : "border-line text-bone-2 hover:border-white/40 hover:text-bone bg-ink-2"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3D Perspective Card Grid with 3D Flip */}
        <div className="perspective-1000 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => {
            const isFlipped = flippedCardId === item.id;
            return (
              <Reveal
                key={item.id}
                delay={(i % 3) * 0.08}
                className="relative min-h-[460px] cursor-pointer group"
                onMouseEnter={playHover}
              >
                <div
                  className={`w-full h-full transition-transform duration-700 preserve-3d relative ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* FRONT CARD FACE */}
                  <div
                    className="absolute inset-0 bg-ink-2 border border-line p-8 flex flex-col justify-between overflow-hidden backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-widest border-b border-line pb-4 mb-6">
                        <span className="text-brass font-bold flex items-center gap-1.5">
                          <span>◆</span>
                          <span>{item.categoryLabel}</span>
                        </span>
                        <span className="text-bone-3">{item.code}</span>
                      </div>

                      <h3 className="font-display text-2xl font-bold uppercase text-bone group-hover:text-brass transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-xs text-bone-2 leading-relaxed font-body">
                        {item.desc}
                      </p>
                    </div>

                    <div>
                      <dl className="space-y-2.5 border-t border-line/80 pt-6 text-xs font-mono">
                        <div className="flex justify-between">
                          <dt className="text-bone-3">PLOT AREA</dt>
                          <dd className="text-bone font-medium">{item.area}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-bone-3">DIMENSIONS</dt>
                          <dd className="text-bone font-medium">{item.dimensions}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-bone-3">ELEVATION</dt>
                          <dd className="text-bone font-medium">{item.floors}</dd>
                        </div>
                      </dl>

                      <div className="mt-6 flex items-center justify-between border-t border-line/80 pt-6">
                        <button
                          onClick={() => toggleFlip(item.id)}
                          className="font-mono text-[0.65rem] uppercase tracking-widest text-brass hover:text-brass-hi flex items-center gap-1 cursor-pointer border border-brass/40 px-3 py-1.5 bg-brass/10"
                        >
                          <span>🔄 FLIP 3D CARD</span>
                        </button>

                        <CursorTarget mode="link">
                          <button
                            onClick={() => {
                              setSelectedBlueprint(item);
                              playClick();
                            }}
                            className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-bone group-hover:text-brass transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <span>BLUEPRINT</span>
                            <span>→</span>
                          </button>
                        </CursorTarget>
                      </div>
                    </div>
                  </div>

                  {/* BACK CARD FACE (3D FLIPPED) */}
                  <div
                    className="absolute inset-0 bg-ink-3 border border-brass p-8 flex flex-col justify-between overflow-hidden [transform:rotateY(180deg)] backface-hidden shadow-[0_0_30px_rgba(176,141,87,0.2)]"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-widest border-b border-line pb-4 mb-4">
                        <span className="text-brass font-bold">3D REVERSE SPEC SHEET</span>
                        <button
                          onClick={() => toggleFlip(item.id)}
                          className="text-bone-2 hover:text-brass cursor-pointer"
                        >
                          CLOSE ✖
                        </button>
                      </div>

                      <h4 className="font-display text-xl font-bold uppercase text-brass">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-xs text-bone-2 leading-relaxed">
                        Features subterranean car vault, Smart Automation Hub, Italian Marble Flooring, & Private Sky Lounge.
                      </p>

                      <div className="mt-6 space-y-2 font-mono text-[0.7rem]">
                        <div className="flex justify-between border-b border-line pb-1.5">
                          <span className="text-bone-3">BEDROOM SUITES</span>
                          <span className="text-bone">4 ENSUITES</span>
                        </div>
                        <div className="flex justify-between border-b border-line pb-1.5">
                          <span className="text-bone-3">BATHROOMS</span>
                          <span className="text-bone">5 LUXURY BASINS</span>
                        </div>
                        <div className="flex justify-between border-b border-line pb-1.5">
                          <span className="text-bone-3">GARAGE BAYS</span>
                          <span className="text-bone">2 COVERED</span>
                        </div>
                        <div className="flex justify-between border-b border-line pb-1.5">
                          <span className="text-bone-3">ORIENTATIONS</span>
                          <span className="text-brass">NORTH EAST FACING</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-line flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedBlueprint(item);
                          playClick();
                        }}
                        className="flex-1 text-center bg-brass px-4 py-3 font-mono text-[0.65rem] uppercase tracking-widest text-ink font-bold hover:bg-brass-hi cursor-pointer"
                      >
                        VIEW 2D/3D BLUEPRINT
                      </button>
                      <button
                        onClick={() => toggleFlip(item.id)}
                        className="px-3 py-3 border border-line text-bone-2 font-mono text-[0.65rem] uppercase hover:text-bone cursor-pointer"
                      >
                        FLIP BACK ↩
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Blueprint Modal Component */}
      <BlueprintModal
        item={selectedBlueprint}
        onClose={() => setSelectedBlueprint(null)}
      />
    </>
  );
}
