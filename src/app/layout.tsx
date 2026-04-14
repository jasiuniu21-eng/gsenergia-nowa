import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://gsenergia.pl"),
  title: {
    default: "GS Energia — audyty energetyczne dla przemysłu",
    template: "%s · GS Energia",
  },
  description:
    "Od 2008 r. audyty energetyczne, efektywnościowe, chłodnicze i wodorowe dla zakładów produkcyjnych. Konkret, liczby, zwrot inwestycji.",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: SITE.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className="h-full" suppressHydrationWarning>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
