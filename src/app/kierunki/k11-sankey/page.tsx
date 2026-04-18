import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "K11 Sankey — GS Energia",
  description:
    "Kierunek 11 — port designu Claude Design z animacją Sankey flow. Ciemny granat + emerald, editorial serif Instrument.",
};

export default function K11Redirect() {
  // Serve the static design bundle from /public/k11-static/
  // (port of Claude Design handoff — 1062 lines CSS + 3 JSX components via Babel)
  redirect("/k11-static/");
}
