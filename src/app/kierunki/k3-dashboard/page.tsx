import type { Metadata } from "next";
import "./tokens.css";
import { BackToHub } from "../_shared/BackToHub";
import { DashboardNav } from "./components/DashboardNav";
import { DashboardHero } from "./components/DashboardHero";
import { DashboardServices } from "./components/DashboardServices";
import { DashboardProof } from "./components/DashboardProof";
import { DashboardWhyUs } from "./components/DashboardWhyUs";
import { DashboardCTA } from "./components/DashboardCTA";
import { DashboardFooter } from "./components/DashboardFooter";

export const metadata: Metadata = {
  title: "K3 Data Dashboard",
  description:
    "Kierunek 3 dla GS Energia — dark, data-dense, live-dashboard feel.",
};

export default function K3Dashboard() {
  return (
    <div data-kierunek="k3" className="min-h-[100dvh] overflow-x-clip">
      <BackToHub variantLabel="K3" tone="dark" />
      <DashboardNav />
      <main>
        <DashboardHero />
        <DashboardServices />
        <DashboardProof />
        <DashboardWhyUs />
        <DashboardCTA />
      </main>
      <DashboardFooter />
    </div>
  );
}
