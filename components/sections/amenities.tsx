"use client";

import Image from "next/image";
import { amenities, type Amenity } from "@/lib/data/amenities";
import { Reveal } from "@/components/ui/reveal";
import { CursorTarget } from "@/components/providers/cursor-provider";

const featured = amenities.find((a) => a.id === "aurora-pool")!;
const rest = amenities.filter((a) => a.id !== "aurora-pool");

const icons: Record<Amenity["icon"], React.ReactNode> = {
  pool: (
    <path d="M3 16c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0M6 8h12M8 4h8v8H8z" />
  ),
  spa: <path d="M12 3c2 3 4 5 4 8a4 4 0 1 1-8 0c0-3 2-5 4-8ZM6 21c1-3 3-4 6-4s5 1 6 4" />,
  work: <path d="M4 7h16v11H4zM9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M4 12h16" />,
  garden: <path d="M12 21v-9M12 12c-4 0-6-2-6-6 4 0 6 2 6 6ZM12 12c4 0 6-2 6-6-4 0-6 2-6 6Z" />,
  kitchen: <path d="M5 3v18M19 3v6a2 2 0 0 1-2 2h-1M19 21V9M5 8h4" />,
  screen: <path d="M3 5h18v11H3zM8 21h8M12 16v5" />,
  garage: <path d="M4 10 12 4l8 6v10H4Zm3 10v-6h10v6" />,
  pet: <path d="M12 15c3 0 5 2 5 4H7c0-2 2-4 5-4ZM6 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM9 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
};

export function Amenities() {
  return (
    <section id="amenities" className="section-divider bg-ink px-6 py-28 md:px-12">
      {/* Header */}
      <Reveal className="mb-16 max-w-2xl">
        <p className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-brass flex items-center gap-2">
          <span>◆</span>
          <span>ESTATE AMENITIES & WELLNESS</span>
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-bone leading-tight">
          Everything Above<br />
          <span className="font-instrument text-brass italic font-normal">Ground Level.</span>
        </h2>
        <p className="mt-6 max-w-md text-sm text-bone-2 leading-relaxed font-body">
          Dedicated floors of wellness, culinary, private screening rooms, and subterranean automated parking vaults — curated for absolute privacy.
        </p>
        <div className="mt-8 h-px w-20 bg-brass" />
      </Reveal>

      {/* Featured Amenity */}
      <CursorTarget mode="eye">
        <Reveal className="relative mb-px aspect-[16/9] overflow-hidden border border-line md:aspect-[21/9] group cursor-pointer">
          <Image
            src="/images/amenity-pool.jpg"
            alt="Midnight Rooftop Infinity Pool"
            fill
            sizes="100vw"
            className="object-cover object-center scale-105 transition-transform duration-700 group-hover:scale-100 saturate-125 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

          {/* Corner accents */}
          <div className="pointer-events-none absolute left-6 top-6 h-10 w-10 border-l-2 border-t-2 border-brass/60" />
          <div className="pointer-events-none absolute right-6 top-6 h-10 w-10 border-r-2 border-t-2 border-brass/60" />

          <div className="absolute bottom-0 left-0 p-8 md:p-12">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-brass flex items-center gap-2">
              <span>◆</span>
              <span>LEVEL 24 SKYLINE DECK</span>
            </p>
            <h3 className="mt-2 font-display text-3xl md:text-5xl font-bold uppercase text-bone">
              Midnight Infinity Pool
            </h3>
            <p className="mt-3 max-w-md text-sm text-bone-2 leading-relaxed font-body">
              Heated saltwater pool with 360-degree panorama of the skyline, private cabanas, and automated temperature control under night skies.
            </p>
          </div>
        </Reveal>
      </CursorTarget>

      {/* Grid of Amenities */}
      <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((amenity, i) => (
          <CursorTarget key={amenity.id} mode="eye">
            <Reveal
              delay={(i % 3) * 0.06}
              className="group bg-ink-2 p-8 transition-all duration-300 hover:bg-ink-3 relative"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-brass transition-transform duration-300 group-hover:scale-110"
              >
                {icons[amenity.icon]}
              </svg>
              <h4 className="mt-6 font-display text-2xl font-bold uppercase text-bone group-hover:text-brass transition-colors">
                {amenity.name}
              </h4>
              <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-brass">
                {amenity.level}
              </p>
              <p className="mt-4 text-xs md:text-sm text-bone-2 leading-relaxed font-body">
                {amenity.description}
              </p>
              <div className="mt-6 h-px w-0 bg-brass transition-all duration-500 group-hover:w-16" />
            </Reveal>
          </CursorTarget>
        ))}
      </div>
    </section>
  );
}
