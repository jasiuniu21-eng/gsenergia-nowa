import { Nav } from "@/components/layout/Nav";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Inter+Tight:ital,wght@0,300..700;1,300..700&family=JetBrains+Mono:ital,wght@0,400..600;1,400..600&display=swap"
      />
      <Nav />
      <main>{children}</main>
      <Footer />
      <FloatingCTA />
      <CookieBanner />
    </>
  );
}
