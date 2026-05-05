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
        href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap"
      />
      <Nav />
      <main>{children}</main>
      <Footer />
      <FloatingCTA />
      <CookieBanner />
    </>
  );
}
