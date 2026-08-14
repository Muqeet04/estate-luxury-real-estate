"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Magnetic } from "@/components/ui/magnetic-button";
import { CursorTarget } from "@/components/providers/cursor-provider";
import { useSound } from "@/components/providers/sound-provider";

const BuildingScene = dynamic(
  () => import("@/components/three/building-scene").then((m) => m.BuildingScene),
  { ssr: false }
);

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type Currency = "USD" | "AED" | "PKR" | "EUR";

const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string; label: string }> = {
  USD: { rate: 1, symbol: "$", label: "USD ($)" },
  AED: { rate: 3.67, symbol: "AED ", label: "AED (د.إ)" },
  PKR: { rate: 278.5, symbol: "PKR ", label: "PKR (₨)" },
  EUR: { rate: 0.92, symbol: "€", label: "EUR (€)" },
};

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const brassLineRef = useRef<HTMLDivElement>(null);

  const [heroMode, setHeroMode] = useState<"photo" | "canvas">("photo");
  const [currency, setCurrency] = useState<Currency>("USD");
  const { playClick, playHover, playChime } = useSound();

  const curr = CURRENCY_RATES[currency];

  const formatPrice = (usd: number) => {
    const val = usd * curr.rate;
    if (currency === "PKR") return `${curr.symbol}${(val / 1000000).toFixed(1)}M`;
    if (currency === "AED") return `${curr.symbol}${(val / 1000).toFixed(0)}K`;
    if (currency === "EUR") return `${curr.symbol}${(val / 1000).toFixed(0)}K`;
    return `${curr.symbol}${(val / 1000).toFixed(0)}K`;
  };

  useGSAP(
    () => {
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const tl = gsap.timeline({ delay: 2.1 });

      tl.from(brassLineRef.current, {
        scaleX: 0,
        duration: 0.8,
        ease: "power3.out",
        transformOrigin: "left center",
      })
        .from(
          eyebrowRef.current,
          { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        )
        .from(
          line1Ref.current,
          { y: 70, opacity: 0, duration: 1, ease: "power3.out" },
          "-=0.3"
        )
        .from(
          line2Ref.current,
          { y: 70, opacity: 0, duration: 1, ease: "power3.out" },
          "-=0.7"
        )
        .from(
          subRef.current,
          { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .from(
          ctaRef.current,
          { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .from(
          statsRef.current?.children ?? [],
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.3"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex h-screen min-h-[720px] flex-col justify-end overflow-hidden bg-ink"
    >
      {/* Hero Background Mode: Photo Parallax OR Live 3D Canvas */}
      {heroMode === "photo" ? (
        <div
          ref={imageRef}
          className="absolute inset-0 -top-[10%] h-[120%] w-full will-change-transform opacity-90 transition-opacity duration-500"
        >
          <Image
            src="/images/hero-building.jpg"
            alt="Architectural luxury real estate tower"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center saturate-125 contrast-105"
          />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-ink-2">
          <BuildingScene
            selectedTier={null}
            hoveredTier={null}
            envMode="midnight"
            materialTheme="cyber-gold"
            cameraPreset="front"
            autoRotateSpeed={1.5}
            onSelect={() => {}}
            onHover={() => {}}
          />
        </div>
      )}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/30 to-ink pointer-events-none" />

      {/* SVG Architectural Grid Overlay */}
      <svg className="absolute inset-0 h-full w-full opacity-20 pointer-events-none" aria-hidden="true">
        <defs>
          <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#b08d57" strokeWidth="0.5" />
            <circle cx="80" cy="80" r="1.5" fill="#b08d57" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* Top Right Live Hero HUD Controls */}
      <div className="absolute top-24 right-6 md:right-12 z-20 flex flex-wrap items-center gap-3 bg-ink/80 p-2 border border-line backdrop-blur-md font-mono text-[0.65rem] uppercase">
        {/* Live Mode Switcher */}
        <span className="text-bone-3 px-2">VIEW MODE:</span>
        <button
          onClick={() => {
            setHeroMode("photo");
            playClick();
          }}
          onMouseEnter={playHover}
          className={`px-3 py-1 border transition-all cursor-pointer ${
            heroMode === "photo" ? "border-brass bg-brass text-ink font-bold" : "border-line text-bone-2"
          }`}
        >
          🌅 GOLDEN SKY
        </button>
        <button
          onClick={() => {
            setHeroMode("canvas");
            playChime();
          }}
          onMouseEnter={playHover}
          className={`px-3 py-1 border transition-all cursor-pointer ${
            heroMode === "canvas" ? "border-brass bg-brass text-ink font-bold" : "border-line text-brass border-brass/50"
          }`}
        >
          🧊 LIVE 3D CANVAS
        </button>

        <div className="h-4 w-px bg-line mx-1 hidden sm:block" />

        {/* Currency Switcher */}
        <span className="text-bone-3 px-1 hidden sm:inline">CURRENCY:</span>
        {(Object.keys(CURRENCY_RATES) as Currency[]).map((c) => (
          <button
            key={c}
            onClick={() => {
              setCurrency(c);
              playClick();
            }}
            onMouseEnter={playHover}
            className={`px-2.5 py-1 border transition-all cursor-pointer ${
              currency === c ? "border-brass bg-brass text-ink font-bold" : "border-line text-bone-2"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Noise texture overlay */}
      <div className="noise-overlay pointer-events-none absolute inset-0 mix-blend-overlay" />

      {/* Top accent line */}
      <div className="relative z-10 px-6 md:px-12">
        <div ref={brassLineRef} className="mb-6 h-px w-20 bg-brass origin-left" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 w-full px-6 pb-16 md:px-12 md:pb-24">
        <p
          ref={eyebrowRef}
          className="mb-6 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-brass flex items-center gap-2"
        >
          <span>◆</span>
          <span>5 MARLA TO 1 KANAL · PREMIUM ARCHITECTURAL RESIDENCES</span>
        </p>

        <div className="overflow-hidden">
          <div ref={line1Ref}>
            <h1 className="font-display text-[12vw] leading-[0.88] font-bold text-bone uppercase md:text-[7.5vw] tracking-tight">
              A New Standard
            </h1>
          </div>
        </div>
        <div className="overflow-hidden">
          <div ref={line2Ref}>
            <p className="font-instrument text-[12vw] leading-[0.88] text-brass italic md:text-[7.5vw]">
              Of Living.
            </p>
          </div>
        </div>

        <div
          ref={subRef}
          className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-sm md:text-base text-bone-2 leading-relaxed font-body">
            Witness your vision come to life, from the ground up, before a single brick is laid. Experience real-time 3D spatial pre-visualization.
          </p>

          <div ref={ctaRef} className="flex items-center gap-4">
            <CursorTarget mode="link">
              <Magnetic>
                <a
                  href="#tour3d"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="inline-flex items-center gap-3 bg-brass px-8 py-4 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink font-semibold transition-all hover:bg-brass-hi shadow-[0_0_25px_rgba(176,141,87,0.3)]"
                >
                  <span>Explore 3D Sequence</span>
                  <span>→</span>
                </a>
              </Magnetic>
            </CursorTarget>
            <CursorTarget mode="link">
              <Magnetic>
                <a
                  href="#categories"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="inline-flex items-center gap-2 border border-white/30 px-8 py-4 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-bone transition-all hover:border-brass hover:text-brass backdrop-blur-sm"
                >
                  View Residences
                </a>
              </Magnetic>
            </CursorTarget>
          </div>
        </div>

        {/* Real-time Currency Converted Stats Strip */}
        <div
          ref={statsRef}
          className="mt-14 flex flex-wrap gap-12 border-t border-line pt-8"
        >
          {[
            { value: formatPrice(180000), label: "5 Marla Starting From" },
            { value: formatPrice(340000), label: "10 Marla Starting From" },
            { value: formatPrice(680000), label: "1 Kanal Starting From" },
            { value: "100%", label: "3D Pre-Visualized" },
          ].map((stat) => (
            <div key={stat.label} onMouseEnter={playHover}>
              <p className="font-instrument text-4xl text-brass italic font-normal">
                {stat.value}
              </p>
              <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
