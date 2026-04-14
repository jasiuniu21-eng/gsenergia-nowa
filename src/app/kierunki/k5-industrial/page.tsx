import type { Metadata } from "next";
import "./tokens.css";
import { BackToHub } from "../_shared/BackToHub";
import { IndustrialNav } from "./components/IndustrialNav";
import { IndustrialHero } from "./components/IndustrialHero";
import { IndustrialServices } from "./components/IndustrialServices";
import { IndustrialProof } from "./components/IndustrialProof";
import { IndustrialWhyUs } from "./components/IndustrialWhyUs";
import { IndustrialCTA } from "./components/IndustrialCTA";
import { IndustrialFooter } from "./components/IndustrialFooter";

export const metadata: Metadata = {
  title: "K5 Industrial Premium",
  description:
    "Kierunek 5 dla GS Energia — ciemna stal, premium industrial, linie przepływu energii.",
};

export default function K5Industrial() {
  return (
    <div data-kierunek="k5" className="min-h-[100dvh] overflow-x-clip">
      <BackToHub variantLabel="K5" tone="dark" />
      <IndustrialNav />
      <main>
        <IndustrialHero />
        <IndustrialServices />
        <IndustrialProof />
        <IndustrialWhyUs />
        <IndustrialCTA />
      </main>
      <IndustrialFooter />
    </div>
  );
}
