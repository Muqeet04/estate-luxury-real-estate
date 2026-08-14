"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

export function Preloader() {
  const [done, setDone] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const obj = useRef({ val: 0 });

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(rootRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power3.inOut",
          delay: 0.2,
          onComplete: () => setDone(true),
        });
      },
    });

    // Animate the logo in first
    tl.from(logoRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    // Then animate the counter
    tl.to(
      obj.current,
      {
        val: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current)
            counterRef.current.textContent = String(Math.floor(obj.current.val));
          if (barRef.current)
            barRef.current.style.width = `${obj.current.val}%`;
        },
      },
      "-=0.2"
    );
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[998] flex flex-col justify-between bg-void px-6 py-8 md:px-12 md:py-10"
    >
      {/* Header row */}
      <div
        ref={logoRef}
        className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white-dim"
      >
        <span>Eclipse</span>
        <span>Solmar Bay · 2026</span>
      </div>

      {/* Main counter */}
      <div>
        <div className="flex items-baseline gap-1">
          <span
            ref={counterRef}
            className="font-display italic text-white leading-none"
            style={{ fontSize: "clamp(4rem, 18vw, 14vw)" }}
          >
            0
          </span>
          <span
            className="font-display italic text-gold leading-none"
            style={{ fontSize: "clamp(4rem, 18vw, 14vw)" }}
          >
            %
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-px w-full bg-white-line">
          <div ref={barRef} className="h-px w-0 bg-gold transition-none" />
        </div>
      </div>

      {/* Footer row */}
      <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white-dim">
        <span>Entering Eclipse</span>
        <span>Please wait</span>
      </div>
    </div>
  );
}
