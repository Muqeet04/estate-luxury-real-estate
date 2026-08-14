"use client";

import { Reveal } from "@/components/ui/reveal";
import { CursorTarget } from "@/components/providers/cursor-provider";

const stats = [
  { value: "05", label: "PRECONSTRUCTION STAGES" },
  { value: "100%", label: "3D DIGITAL TWIN" },
  { value: "24/7", label: "CONCIERGE & SECURITY" },
];

export function About() {
  return (
    <section id="intro" className="section-divider bg-ink px-6 py-28 md:px-12">
      <div className="grid gap-16 md:grid-cols-2 md:gap-28 items-center">
        {/* Left column — headline */}
        <Reveal>
          <p className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-brass flex items-center gap-2">
            <span>◆</span>
            <span>ARCHITECTURAL VISION</span>
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-bone leading-tight">
            Unparalleled Luxury,<br />
            <span className="font-instrument text-brass italic font-normal">In Every Detail.</span>
          </h2>
          <div className="mt-8 h-px w-20 bg-brass" />
        </Reveal>

        {/* Right column — body + stats */}
        <div className="flex flex-col justify-between">
          <Reveal delay={0.1}>
            <p className="text-sm md:text-base text-bone-2 leading-relaxed font-body">
              Every residence is engineered as a digital twin before construction begins. By combining real-time 3D spatial simulation with master craftsmanship, future homeowners can walk through, customize, and inspect every structural detail from 5 Marla plots to 1 Kanal grand estate villas.
            </p>
            <p className="mt-5 text-sm md:text-base text-bone-2 leading-relaxed font-body">
              Column-free panoramic glass enclosures, subterranean automated parking vaults, and private rooftop infinity pools set a new standard for modern living.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-instrument text-4xl italic text-brass md:text-5xl">
                    {s.value}
                  </dt>
                  <dd className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone-2">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* Marquee strip matching reference site aesthetic */}
      <Reveal delay={0.3}>
        <div className="mt-24 overflow-hidden border-t border-b border-line py-6">
          <div className="flex gap-16 whitespace-nowrap animate-none">
            {Array.from({ length: 4 }).map((_, i) => (
              <p
                key={i}
                className="font-mono text-[0.7rem] uppercase tracking-[0.4em] text-bone-3 flex items-center gap-6"
              >
                <span className="text-brass">◆</span>
                <span>ESTATE LAHORE</span>
                <span className="text-brass">◆</span>
                <span>5 MARLA TO 1 KANAL</span>
                <span className="text-brass">◆</span>
                <span>3D PRE-CONSTRUCTION</span>
                <span className="text-brass">◆</span>
                <span>BESPOKE ARCHITECTURE</span>
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
