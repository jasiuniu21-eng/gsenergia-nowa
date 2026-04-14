import type { Metadata } from "next";
import "./tokens.css";
import { BackToHub } from "../_shared/BackToHub";
import { EditorialNav } from "./components/EditorialNav";
import { EditorialHero } from "./components/EditorialHero";
import { EditorialServices } from "./components/EditorialServices";
import { EditorialProof } from "./components/EditorialProof";
import { EditorialWhyUs } from "./components/EditorialWhyUs";
import { EditorialCTA } from "./components/EditorialCTA";
import { EditorialFooter } from "./components/EditorialFooter";

export const metadata: Metadata = {
  title: "K4 Editorial Minimal",
  description:
    "Kierunek 4 dla GS Energia — radykalny minimalizm. Gigantyczna typografia, whitespace, jedna zieleń.",
};

export default function K4Editorial() {
  return (
    <div data-kierunek="k4" className="min-h-[100dvh] overflow-x-clip">
      <BackToHub variantLabel="K4" />
      <EditorialNav />
      <main>
        <EditorialHero />
        <EditorialServices />
        <EditorialProof />
        <EditorialWhyUs />
        <EditorialCTA />
      </main>
      <EditorialFooter />
    </div>
  );
}
