"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";

const ALL_LOGOS = Array.from({ length: 94 }, (_, i) => {
  const n = String(i + 1).padStart(3, "0");
  return { src: `/logos/clients/${n}.png`, alt: "Klient GS Energia" };
});

const PER_PAGE = 18; // 6 cols × 3 rows
const PAGE_COUNT = Math.ceil(ALL_LOGOS.length / PER_PAGE);

export function ClientsWall() {
  const reduced = useReducedMotion();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setPage((p) => (p + 1) % PAGE_COUNT);
  };
  const prev = () => {
    setDirection(-1);
    setPage((p) => (p - 1 + PAGE_COUNT) % PAGE_COUNT);
  };

  const slice = ALL_LOGOS.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <section
      aria-labelledby="clients-heading"
      className="bg-white text-[#222328] border-y border-black/10"
    >
      <div className="container-site py-[clamp(4rem,7vw,7rem)]">
        <motion.h2
          id="clients-heading"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center font-display"
          style={{
            fontSize: "clamp(2.5rem, 4vw + 1rem, 4rem)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          Zaufali nam<span style={{ color: "#8DC73F" }}>.</span>
        </motion.h2>

        <div className="relative mt-12">
          {/* Arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Poprzednia strona logo"
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 sm:-ml-6 z-10 size-12 inline-flex items-center justify-center rounded-full bg-white border border-black/10 text-[#222328] shadow-[0_4px_18px_rgba(0,0,0,0.08)] hover:border-[#8DC73F] hover:text-[#8DC73F] transition-colors"
          >
            <CaretLeft size={20} weight="bold" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Następna strona logo"
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 sm:-mr-6 z-10 size-12 inline-flex items-center justify-center rounded-full bg-white border border-black/10 text-[#222328] shadow-[0_4px_18px_rgba(0,0,0,0.08)] hover:border-[#8DC73F] hover:text-[#8DC73F] transition-colors"
          >
            <CaretRight size={20} weight="bold" />
          </button>

          {/* Logo grid (paginated) */}
          <div className="overflow-hidden px-6 sm:px-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.ul
                key={page}
                custom={direction}
                initial={reduced ? false : { opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-6 gap-y-8"
              >
                {slice.map((c) => (
                  <li
                    key={c.src}
                    className="flex items-center justify-center aspect-square"
                  >
                    <Image
                      src={c.src}
                      alt={c.alt}
                      width={150}
                      height={150}
                      className="max-h-[110px] max-w-full w-auto object-contain"
                    />
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          {/* Dot pagination */}
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: PAGE_COUNT }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > page ? 1 : -1);
                  setPage(i);
                }}
                aria-label={`Strona ${i + 1} z ${PAGE_COUNT}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === page ? "w-6 bg-[#8DC73F]" : "w-1.5 bg-black/15 hover:bg-black/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
