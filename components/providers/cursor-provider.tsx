"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";

type CursorMode = "default" | "link" | "eye" | "swap";

type CursorContextValue = {
  setCursorMode: (mode: CursorMode) => void;
};

const CursorContext = createContext<CursorContextValue | null>(null);

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor must be used within CursorProvider");
  return ctx;
}

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setCursorMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return;

    // Center initially so cursor doesn't glitch at 0,0
    gsap.set(dotRef.current, { x: window.innerWidth / 2, y: window.innerHeight / 2 });
    gsap.set(ringRef.current, { x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.1, ease: "power2.out" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.1, ease: "power2.out" });
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.35, ease: "power3.out" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [visible]);

  return (
    <CursorContext.Provider value={{ setCursorMode }}>
      {children}
      {/* High-visibility glowing custom cursor follower */}
      <div
        className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        {/* Core dot */}
        <div
          ref={dotRef}
          className={`fixed left-0 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_12px_rgba(255,215,0,0.9)] pointer-events-none transition-transform duration-200 ${
            mode !== "default" ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
        />

        {/* Outer ring follower */}
        <div
          ref={ringRef}
          className={`fixed left-0 top-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/80 bg-gold/10 backdrop-blur-[1px] flex items-center justify-center pointer-events-none transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.25)] ${
            mode === "link"
              ? "scale-150 border-gold bg-gold/20"
              : mode === "eye" || mode === "swap"
              ? "scale-130 border-gold bg-gold text-ink"
              : "scale-100"
          }`}
        >
          {mode === "eye" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-ink"
            >
              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
          {mode === "swap" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-ink"
            >
              <path d="M8 3 4 7l4 4" />
              <path d="M4 7h16" />
              <path d="m16 21 4-4-4-4" />
              <path d="M20 17H4" />
            </svg>
          )}
        </div>
      </div>
    </CursorContext.Provider>
  );
}

export function CursorTarget({
  mode = "link",
  label,
  children,
  className,
}: {
  mode?: CursorMode;
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { setCursorMode } = useCursor();
  return (
    <div
      className={className}
      onMouseEnter={() => setCursorMode(mode)}
      onMouseLeave={() => setCursorMode("default")}
    >
      {children}
    </div>
  );
}
