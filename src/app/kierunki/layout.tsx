import type { Metadata } from "next";
import "./kierunki.css";

export const metadata: Metadata = {
  title: {
    default: "5 kierunków designu · GS Energia",
    template: "%s · GS Energia",
  },
  description:
    "Pięć propozycji wizualnej tożsamości dla gsenergia.pl. Wybierz kierunek, który najbardziej pasuje.",
  robots: { index: false, follow: false },
};

export default function KierunkiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Fontshare — bundle of all fonts needed for the 5 directions.
          Single request for the entire set. */}
      <link
        rel="preconnect"
        href="https://api.fontshare.com"
        crossOrigin="anonymous"
      />
      <link
        rel="preconnect"
        href="https://cdn.fontshare.com"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=gambarino@1&f[]=general-sans@200,300,400,500,600,700&f[]=cabinet-grotesk@300,400,500,700,800&f[]=clash-display@400,500,600,700&f[]=supreme@300,400,500,700&f[]=synonym@300,400,500,600,700&f[]=jetbrains-mono@400,500,700&display=swap"
      />
      {children}
    </>
  );
}
