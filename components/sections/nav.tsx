"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CursorTarget } from "@/components/providers/cursor-provider";
import { useSound } from "@/components/providers/sound-provider";

const links: { href: string; label: string }[] = [
  { href: "#intro", label: "Vision" },
  { href: "#tour3d", label: "3D Sequence" },
  { href: "#categories", label: "Residences" },
  { href: "#amenities", label: "Amenities" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { muted, toggleMute, playChime } = useSound();

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? scrolled / height : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.from(navRef.current, {
      y: -20,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 2.2,
    });
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[70] h-[72px] mix-blend-difference"
      >
        <div className="flex h-full items-center justify-between px-6 md:px-12">
          {/* Logo with rotating diamond */}
          <a
            href="/"
            className="group font-display text-xl font-bold tracking-tight text-white uppercase flex items-center gap-2"
          >
            <span className="inline-block transition-transform duration-500 group-hover:rotate-90 text-brass text-base">
              ◆
            </span>
            Estate
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <CursorTarget key={link.href} label="View">
                <a
                  href={link.href}
                  className="group relative inline-block font-mono text-[0.7rem] tracking-[0.15em] uppercase transition-colors duration-200 text-white/70 hover:text-white"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-white transition-transform duration-300 origin-center scale-x-0 group-hover:scale-x-100" />
                </a>
              </CursorTarget>
            ))}
          </nav>

          {/* Right CTA + Sound Toggle */}
          <div className="flex items-center gap-4">
            <CursorTarget label="Sound">
              <button
                onClick={() => {
                  toggleMute();
                  if (muted) playChime();
                }}
                className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-white border border-white/30 px-3.5 py-2 hover:border-brass hover:text-brass transition-colors duration-300 flex items-center gap-1.5 cursor-pointer"
              >
                <span>{muted ? "🔇" : "🔊"}</span>
                <span className="hidden sm:inline">{muted ? "SOUND: OFF" : "SOUND: ON"}</span>
              </button>
            </CursorTarget>

            <CursorTarget label="Enquire">
              <a
                href="#contact"
                className="hidden lg:inline-flex font-mono text-[0.7rem] tracking-[0.15em] uppercase text-white border border-white/50 px-5 py-2.5 hover:bg-white hover:text-ink transition-colors duration-300"
              >
                Enquire
              </a>
            </CursorTarget>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span
                className={`block h-px w-6 bg-white transition-all duration-300 ${
                  mobileOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-white transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-white transition-all duration-300 ${
                  mobileOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar at header bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10">
          <div
            ref={progressRef}
            className="h-full bg-brass origin-left transition-transform duration-100"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[65] flex flex-col items-start justify-center bg-ink px-8">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-6 font-mono text-xs tracking-widest text-bone-2 uppercase hover:text-bone transition-colors"
          >
            Close ×
          </button>
          <div className="flex flex-col gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-[clamp(2.5rem,8vw,4.5rem)] font-bold text-bone hover:text-brass transition-colors leading-none uppercase"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex items-center font-mono text-sm tracking-widest text-brass uppercase hover:text-brass-hi transition-colors"
            >
              Enquire →
            </a>
          </div>
        </div>
      )}
    </>
  );
}
