"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { pois, poiCategoryLabel } from "@/lib/data/pois";
import { Reveal } from "@/components/ui/reveal";
import { CursorTarget } from "@/components/providers/cursor-provider";

export function Location() {
  const [active, setActive] = useState<string | null>(null);
  const activePoi = useMemo(
    () => pois.find((p) => p.id === active) ?? null,
    [active]
  );

  return (
    <section
      id="location"
      className="section-divider bg-void px-6 py-28 md:px-12"
    >
      <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            Site Location
          </p>
          <h2 className="font-display text-5xl italic leading-tight text-white md:text-6xl">
            Solmar Bay’s<br />
            <span className="not-italic text-white/50">Golden Quadrant</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm text-white-dim leading-relaxed">
          Positioned between the waterfront and the business district — culture,
          transit, and the bay all within a short walk.
        </p>
      </Reveal>

      <div className="grid gap-px lg:grid-cols-[1fr_1.6fr]">
        {/* POI List */}
        <div className="border border-white-line bg-charcoal">
          <div className="border-b border-white-line px-5 py-4 font-mono text-[9px] uppercase tracking-widest text-white-dim">
            Points of Interest
          </div>
          <ul className="max-h-[460px] overflow-y-auto">
            {pois.map((poi) => (
              <li key={poi.id} className="border-b border-white-line last:border-b-0">
                <CursorTarget label="Locate">
                  <button
                    onMouseEnter={() => setActive(poi.id)}
                    onMouseLeave={() => setActive(null)}
                    className={`flex w-full items-center justify-between px-5 py-4 text-left transition-all group ${
                      active === poi.id ? "bg-gold-dim" : "hover:bg-white-ghost"
                    }`}
                  >
                    <span>
                      <span
                        className={`block text-sm font-medium transition-colors ${
                          active === poi.id ? "text-gold" : "text-white"
                        }`}
                      >
                        {poi.name}
                      </span>
                      <span className="block font-mono text-[9px] uppercase tracking-widest text-white-dim mt-0.5">
                        {poiCategoryLabel[poi.category]}
                      </span>
                    </span>
                    <span
                      className={`whitespace-nowrap font-mono text-xs transition-colors ${
                        active === poi.id ? "text-gold" : "text-white-dim"
                      }`}
                    >
                      {poi.walkMinutes}m walk
                    </span>
                  </button>
                </CursorTarget>
              </li>
            ))}
          </ul>
        </div>

        {/* Location map image */}
        <div className="relative aspect-square overflow-hidden border border-white-line bg-charcoal sm:aspect-[4/3]">
          <Image
            src="/images/location-skyline.jpg"
            alt="Solmar Bay skyline aerial view"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover saturate-125 contrast-105"
          />
          <div className="absolute inset-0 bg-ink/40" />

          {/* SVG grid overlay */}
          <svg
            className="absolute inset-0 h-full w-full opacity-10"
            aria-hidden
          >
            {Array.from({ length: 9 }, (_, i) => (
              <line
                key={`v${i}`}
                x1={`${(i + 1) * 10}%`}
                y1="0"
                x2={`${(i + 1) * 10}%`}
                y2="100%"
                stroke="#ffc000"
                strokeWidth={0.5}
              />
            ))}
            {Array.from({ length: 9 }, (_, i) => (
              <line
                key={`h${i}`}
                x1="0"
                y1={`${(i + 1) * 10}%`}
                x2="100%"
                y2={`${(i + 1) * 10}%`}
                stroke="#ffc000"
                strokeWidth={0.5}
              />
            ))}
          </svg>

          {/* Site marker with ping animation */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative flex h-5 w-5 items-center justify-center">
              <span className="absolute h-5 w-5 animate-ping rounded-full bg-gold/30" />
              <span className="h-3 w-3 rounded-full bg-gold shadow-[0_0_10px_rgba(255,192,0,0.5)]" />
            </div>
            <span className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
              Eclipse
            </span>
          </div>

          {/* POI dots */}
          {pois.map((poi) => (
            <div
              key={poi.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
              style={{
                left: `${poi.x}%`,
                top: `${poi.y}%`,
                transform:
                  active === poi.id
                    ? `translate(-50%, -50%) scale(1.6)`
                    : undefined,
              }}
            >
              <span
                className={`block h-2 w-2 rounded-full transition-colors duration-300 ${
                  active === poi.id
                    ? "bg-gold shadow-[0_0_6px_rgba(255,192,0,0.8)]"
                    : "bg-white/40"
                }`}
              />
            </div>
          ))}

          {/* Active POI tooltip */}
          {activePoi && (
            <div className="absolute bottom-4 left-4 right-4 border border-gold/40 bg-void/95 p-4 backdrop-blur-sm">
              <div className="h-px w-8 bg-gold mb-3" />
              <p className="font-display text-lg italic text-white">
                {activePoi.name}
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-gold">
                {activePoi.walkMinutes} min walk · {activePoi.driveMinutes} min drive
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
