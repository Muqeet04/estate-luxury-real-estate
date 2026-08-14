import type { Metadata } from "next";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { CursorProvider } from "@/components/providers/cursor-provider";
import { SoundProvider } from "@/components/providers/sound-provider";
import "../globals.css";

export const metadata: Metadata = {
  title: "Estate — Cyber Obsidian & Electric Gold Real Estate",
  description:
    "5 Marla to 1 Kanal. Watch yours built, before it's built. Premium Cyber Obsidian & Electric Gold architectural residences.",
  openGraph: {
    title: "Estate — Architectural Luxury Residences",
    description: "Watch yours built, before it's built. Cyber Obsidian & Electric Gold residences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-ink text-bone font-body antialiased selection:bg-gold selection:text-ink">
        <LenisProvider>
          <SoundProvider>
            <CursorProvider>{children}</CursorProvider>
          </SoundProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
