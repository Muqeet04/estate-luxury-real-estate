import { Preloader } from "@/components/ui/preloader";
import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Tour3D } from "@/components/sections/tour-3d";
import { Residences } from "@/components/sections/residences";
import { Calculator } from "@/components/sections/calculator";
import { Amenities } from "@/components/sections/amenities";
import { Location } from "@/components/sections/location";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <About />
        <Tour3D />
        <Residences />
        <Calculator />
        <Amenities />
        <Location />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
