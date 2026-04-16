import type { Metadata } from "next";
import "./tokens.css";
import { BackToHub } from "../_shared/BackToHub";
import { BloomNav } from "./components/BloomNav";
import { BloomHero } from "./components/BloomHero";
import { BloomTrust } from "./components/BloomTrust";
import { BloomServices } from "./components/BloomServices";
import { BloomProof } from "./components/BloomProof";
import { BloomCTA } from "./components/BloomCTA";
import { BloomFooter } from "./components/BloomFooter";

export const metadata: Metadata = {
  title: "K7 Bloom",
  description:
    "Kierunek 6 dla GS Energia — editorial premium, czerń + zieleń, animowany hero w stylu wordware.ai.",
};

export default function K7Bloom() {
  return (
    <div data-kierunek="k7" className="min-h-[100dvh] overflow-x-clip">
      <BackToHub variantLabel="K7" tone="dark" />
      <BloomNav />
      <main>
        <BloomHero />
        <BloomTrust />
        <BloomServices />
        <BloomProof />
        <BloomCTA />
      </main>
      <BloomFooter />
    </div>
  );
}
