"use client";

import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic-button";
import { CursorTarget } from "@/components/providers/cursor-provider";

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block group">
      <span className="mb-2 block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone-2 transition-colors group-focus-within:text-brass">
        {label}
      </span>
      <input
        {...props}
        className="w-full border border-line bg-ink/50 px-4 py-3.5 text-sm text-bone outline-none transition-colors focus:border-brass placeholder:text-bone-3 font-body"
      />
    </label>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section-divider bg-ink px-6 py-28 md:px-12">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] items-start">
        {/* Left column */}
        <Reveal>
          <p className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-brass flex items-center gap-2">
            <span>◆</span>
            <span>PRIVATE ENQUIRY</span>
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-bone leading-tight">
            Witness Your Vision,<br />
            <span className="font-instrument text-brass italic font-normal">Firsthand.</span>
          </h2>
          <div className="mt-8 h-px w-20 bg-brass" />
          <p className="mt-8 text-sm md:text-base text-bone-2 leading-relaxed font-body">
            Schedule a private viewing or request full spatial blueprints for 5 Marla, 10 Marla, or 1 Kanal residences. Our architectural advisory team responds within 24 hours.
          </p>

          <div className="mt-10 space-y-5 border-t border-line pt-8">
            {[
              { label: "SALES ADVISORY", value: "+92 (42) 111-ESTATE" },
              { label: "ENQUIRIES", value: "concierge@estate-lahore.com" },
              { label: "SALES GALLERY", value: "Phase 6 Main Boulevard, DHA Lahore" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-brass mt-2 flex-shrink-0" />
                <div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-widest text-brass">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-sm text-bone-2 font-body">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Right column — Form matching reference site */}
        <Reveal delay={0.15}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="grid gap-6 border border-line bg-ink-2 p-8 sm:grid-cols-2 relative"
          >
            {/* Corner framing brackets */}
            <div className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-brass/60" />
            <div className="pointer-events-none absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-brass/60" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-brass/60" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-brass/60" />

            <Field label="FULL NAME" type="text" placeholder="Sharjeel Ahmed" />
            <Field label="EMAIL ADDRESS" type="email" placeholder="sharjeel@domain.com" />
            <Field label="PHONE NUMBER" type="tel" placeholder="+92 300 0000000" />
            <Field label="INTEREST CATEGORY" type="text" placeholder="10 Marla / 1 Kanal Villa" />

            <label className="block sm:col-span-2 group">
              <span className="mb-2 block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone-2 transition-colors group-focus-within:text-brass">
                SPECIFIC REQUIREMENTS (OPTIONAL)
              </span>
              <textarea
                rows={4}
                placeholder="Specify preferred plot location, floor orientation, or timeline requirements..."
                className="w-full resize-none border border-line bg-ink/50 px-4 py-3.5 text-sm text-bone outline-none transition-colors focus:border-brass placeholder:text-bone-3 font-body"
              />
            </label>

            <div className="sm:col-span-2 flex items-center justify-between pt-4 border-t border-line">
              <CursorTarget mode="link">
                <Magnetic className="inline-block">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 bg-brass px-10 py-4 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink font-bold transition-all hover:bg-brass-hi shadow-[0_0_20px_rgba(176,141,87,0.25)] cursor-pointer"
                  >
                    <span>ENQUIRE NOW</span>
                    <span>→</span>
                  </button>
                </Magnetic>
              </CursorTarget>
              <p className="text-[0.65rem] font-mono uppercase tracking-widest text-bone-3 hidden sm:block">
                PRIVACY GUARANTEED
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
