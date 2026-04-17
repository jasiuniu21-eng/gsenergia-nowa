import type { Metadata } from "next";
import "./tokens.css";
import { BackToHub } from "../_shared/BackToHub";
import { ZeroNav } from "./components/ZeroNav";
import { ZeroHero } from "./components/ZeroHero";
import { ZeroTrust } from "./components/ZeroTrust";
import { ZeroServices } from "./components/ZeroServices";
import { ZeroProof } from "./components/ZeroProof";
import { ZeroCTA } from "./components/ZeroCTA";
import { ZeroFooter } from "./components/ZeroFooter";

export const metadata: Metadata = {
  title: "K10 Zero",
  description:
    "Kierunek 10 — Zeronest-clean + canvas bouquet. Białe tło, green #16A34A, SEO-optimized sections.",
};

export default function K10Zero() {
  return (
    <div data-kierunek="k10" className="min-h-[100dvh] overflow-x-clip">
      <BackToHub variantLabel="K10" tone="light" />
      <ZeroNav />
      <main>
        <ZeroHero />
        <ZeroTrust />
        <ZeroServices />
        <ZeroProof />
        <ZeroCTA />
      </main>
      <ZeroFooter />
    </div>
  );
}
