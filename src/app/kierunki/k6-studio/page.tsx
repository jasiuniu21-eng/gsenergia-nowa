import type { Metadata } from "next";
import "./tokens.css";
import { BackToHub } from "../_shared/BackToHub";
import { StudioNav } from "./components/StudioNav";
import { StudioHero } from "./components/StudioHero";
import { StudioTrust } from "./components/StudioTrust";
import { StudioServices } from "./components/StudioServices";
import { StudioProof } from "./components/StudioProof";
import { StudioCTA } from "./components/StudioCTA";
import { StudioFooter } from "./components/StudioFooter";

export const metadata: Metadata = {
  title: "K6 Studio",
  description:
    "Kierunek 6 dla GS Energia — editorial premium, czerń + zieleń, animowany hero w stylu wordware.ai.",
};

export default function K6Studio() {
  return (
    <div data-kierunek="k6" className="min-h-[100dvh] overflow-x-clip">
      <BackToHub variantLabel="K6" tone="dark" />
      <StudioNav />
      <main>
        <StudioHero />
        <StudioTrust />
        <StudioServices />
        <StudioProof />
        <StudioCTA />
      </main>
      <StudioFooter />
    </div>
  );
}
