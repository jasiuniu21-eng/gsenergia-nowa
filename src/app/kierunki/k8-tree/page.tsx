import type { Metadata } from "next";
import "./tokens.css";
import { BackToHub } from "../_shared/BackToHub";
import { TreeNav } from "./components/TreeNav";
import { TreeHero } from "./components/TreeHero";
import { TreeTrust } from "./components/TreeTrust";
import { TreeServices } from "./components/TreeServices";
import { TreeSwiadectwa } from "./components/TreeSwiadectwa";
import { TreeProof } from "./components/TreeProof";
import { TreeCTA } from "./components/TreeCTA";
import { TreeFooter } from "./components/TreeFooter";

export const metadata: Metadata = {
  title: "K8 Tree",
  description:
    "Kierunek 8 dla GS Energia — DEKRA-style nav + wordware-core central tree animation + Energy Intelligence + brand green.",
};

export default function K8Tree() {
  return (
    <div data-kierunek="k8" className="min-h-[100dvh] overflow-x-clip">
      <BackToHub variantLabel="K8" tone="dark" />
      <TreeNav />
      <main>
        <TreeHero />
        <TreeTrust />
        <TreeServices />
        <TreeSwiadectwa />
        <TreeProof />
        <TreeCTA />
      </main>
      <TreeFooter />
    </div>
  );
}
