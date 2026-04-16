import type { Metadata } from "next";
import "./tokens.css";
import { BackToHub } from "../_shared/BackToHub";
import { LightNav } from "./components/LightNav";
import { LightHero } from "./components/LightHero";
import { LightTrust } from "./components/LightTrust";
import { LightServices } from "./components/LightServices";
import { LightProof } from "./components/LightProof";
import { LightCTA } from "./components/LightCTA";
import { LightFooter } from "./components/LightFooter";

export const metadata: Metadata = {
  title: "K9 Light",
  description:
    "Kierunek 6 dla GS Energia — editorial premium, czerń + zieleń, animowany hero w stylu wordware.ai.",
};

export default function K9Light() {
  return (
    <div data-kierunek="k9" className="min-h-[100dvh] overflow-x-clip">
      <BackToHub variantLabel="K9" tone="dark" />
      <LightNav />
      <main>
        <LightHero />
        <LightTrust />
        <LightServices />
        <LightProof />
        <LightCTA />
      </main>
      <LightFooter />
    </div>
  );
}
