const links = [
  { label: "Vision", href: "#intro" },
  { label: "3D Sequence", href: "#tour3d" },
  { label: "Residences", href: "#categories" },
  { label: "Amenities", href: "#amenities" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="section-divider bg-ink px-6 py-16 md:px-12">
      {/* Metallic brass shimmer divider */}
      <div className="brass-shimmer mb-12 h-px w-full" />

      <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <a
            href="#"
            className="group font-display text-2xl font-bold tracking-tight text-bone uppercase flex items-center gap-2"
          >
            <span className="inline-block transition-transform duration-500 group-hover:rotate-90 text-brass text-lg">
              ◆
            </span>
            Estate
          </a>
          <div className="mt-4 h-px w-12 bg-brass" />
          <p className="mt-4 max-w-sm text-sm text-bone-2 leading-relaxed font-body">
            Watch yours built, before it&apos;s built. Premium residential plots and architectural residences engineered from 5 Marla to 1 Kanal.
          </p>
          <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-widest text-bone-3">
            DHA Phase 6 Main Boulevard, Lahore
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="mb-5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-brass">
            SECTIONS
          </p>
          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-bone-2 transition-colors hover:text-brass"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <p className="mb-5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-brass">
            ADVISORY
          </p>
          <div className="space-y-4">
            <div>
              <p className="font-mono text-[0.65rem] text-bone-3 uppercase tracking-widest">
                DIRECT LINE
              </p>
              <p className="mt-1 text-sm text-bone-2 font-body">+92 (42) 111-ESTATE</p>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] text-bone-3 uppercase tracking-widest">
                EMAIL
              </p>
              <p className="mt-1 text-sm text-bone-2 font-body">
                concierge@estate-lahore.com
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            {["IG", "TW", "LI"].map((s) => (
              <a
                key={s}
                href="#"
                className="flex h-9 w-9 items-center justify-center border border-line font-mono text-[0.7rem] text-bone-2 transition-all hover:border-brass hover:text-brass bg-ink-2"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-16 flex flex-col justify-between gap-4 border-t border-line pt-8 font-mono text-[0.65rem] uppercase tracking-widest text-bone-3 md:flex-row">
        <span>© 2026 ESTATE — PREMIUM REAL ESTATE. ALL RIGHTS RESERVED.</span>
        <span>DESIGN INSPIRED BY DEOM ESTATE (DEOM-ESTATE-SJLX.VERCEL.APP)</span>
      </div>
    </footer>
  );
}
