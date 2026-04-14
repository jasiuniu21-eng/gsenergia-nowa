import type { Metadata } from "next";
import "./tokens.css";
import { BackToHub } from "../_shared/BackToHub";
import { WarmNav } from "./components/WarmNav";
import { WarmHero } from "./components/WarmHero";
import { WarmServices } from "./components/WarmServices";
import { WarmProof } from "./components/WarmProof";
import { WarmWhyUs } from "./components/WarmWhyUs";
import { WarmCTA } from "./components/WarmCTA";
import { WarmFooter } from "./components/WarmFooter";

export const metadata: Metadata = {
  title: "K2 Warm Authority",
  description:
    "Kierunek 2 dla GS Energia — premium korporacyjny z duszą. Serif + cream + forest green.",
};

export default function K2Warm() {
  return (
    <div data-kierunek="k2" className="min-h-[100dvh] overflow-x-clip">
      <BackToHub variantLabel="K2" />
      <WarmNav />
      <main>
        <WarmHero />
        <WarmServices />
        <WarmProof />
        <WarmWhyUs />
        <WarmCTA />
      </main>
      <WarmFooter />
    </div>
  );
}
