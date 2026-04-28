import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ClientsWall } from "@/components/sections/ClientsWall";
import { Services } from "@/components/sections/Services";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { HowItWorks } from "@/components/sections/HowItWorks";

export const metadata: Metadata = {
  title: "GS Energia — audyty energetyczne dla przemysłu i budynków",
  description:
    "Audyty energetyczne, EMS, BESS i fotowoltaika dla zakładów produkcyjnych. Od 2008 r., 400+ realizacji, redukcja rachunku 15–30%.",
  openGraph: {
    title: "GS Energia — audyty energetyczne dla przemysłu i budynków",
    description:
      "Audyty energetyczne, EMS, BESS i fotowoltaika dla zakładów produkcyjnych. Od 2008 r., 400+ realizacji, redukcja rachunku 15–30%.",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <CaseStudies />
      <ClientsWall />
      <HowItWorks />
    </>
  );
}
