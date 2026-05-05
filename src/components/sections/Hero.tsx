import { HeroVideo } from "./HeroVideo";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden min-h-[100vh] flex flex-col bg-[#fcfcfc]"
    >
      {/* Visually hidden H1 — keeps page SEO and a11y intact */}
      <h1 id="hero-heading" className="sr-only">
        Audyty energetyczne dla przemysłu — GS Energia
      </h1>

      <HeroVideo />
    </section>
  );
}
