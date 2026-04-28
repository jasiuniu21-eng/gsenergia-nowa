import { Nav } from "@/components/layout/Nav";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { Footer } from "@/components/layout/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=gambarino@1&f[]=general-sans@200,201,300,301,400,401,500,501,600,601,700,701&display=swap"
      />
      <Nav />
      <main>{children}</main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
