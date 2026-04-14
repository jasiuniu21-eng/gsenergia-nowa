import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <section id="uslugi" className="container-site py-[var(--section-py)]">
        <p className="text-sm text-[color:var(--c-fg-subtle)]">
          Kolejne sekcje (Usługi, Dlaczego my, Realizacje, Liczby, Opinie, Blog, CTA,
          Stopka) dobuduję po akceptacji vibu hero + nav.
        </p>
      </section>
    </>
  );
}
