import type { Metadata } from "next";
import "./tokens.css";
import { BackToHub } from "../_shared/BackToHub";
import { BlueprintNav } from "./components/BlueprintNav";
import { BlueprintHero } from "./components/BlueprintHero";
import { BlueprintServices } from "./components/BlueprintServices";
import { BlueprintProof } from "./components/BlueprintProof";
import { BlueprintWhyUs } from "./components/BlueprintWhyUs";
import { BlueprintCTA } from "./components/BlueprintCTA";
import { BlueprintFooter } from "./components/BlueprintFooter";

export const metadata: Metadata = {
  title: "K1 Engineering Blueprint",
  description:
    "Kierunek 1 dla GS Energia — surowa precyzja techniczna, jak raport inżynierski.",
};

export default function K1Blueprint() {
  return (
    <div data-kierunek="k1" className="min-h-[100dvh] overflow-x-clip">
      <BackToHub variantLabel="K1" />
      <BlueprintNav />
      <main>
        <BlueprintHero />
        <BlueprintServices />
        <BlueprintProof />
        <BlueprintWhyUs />
        <BlueprintCTA />
      </main>
      <BlueprintFooter />
    </div>
  );
}
