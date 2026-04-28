import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Blog posts: old WordPress dated URLs → /blog/slug
      // Handles all patterns like /2014/04/15/slug/ → /blog/slug
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug/",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },

      // uslugi_pozostale → /uslugi/:slug
      {
        source: "/uslugi_pozostale/kolejna-usluga/",
        destination: "/uslugi/kolejna-usluga",
        permanent: true,
      },
      {
        source: "/uslugi_pozostale/plany-gospodarki-niskoemisyjnej/",
        destination: "/uslugi/plany-gospodarki-niskoemisyjnej",
        permanent: true,
      },
      {
        source: "/uslugi_pozostale/projekt-zalozen-do-planu-zaopatrzenia/",
        destination: "/uslugi/projekt-zalozen-do-planu-zaopatrzenia",
        permanent: true,
      },
      {
        source: "/uslugi_pozostale/szkolenia/",
        destination: "/uslugi/szkolenia",
        permanent: true,
      },
      {
        source: "/uslugi_pozostale/pozyskiwanie-finansowania-dla-inwestycji/",
        destination: "/uslugi/pozyskiwanie-finansowania-dla-inwestycji",
        permanent: true,
      },
      {
        source: "/uslugi_pozostale/projekt-techniczny/",
        destination: "/uslugi/projekt-techniczny",
        permanent: true,
      },
      {
        source: "/uslugi_pozostale/diagnostyka-i-serwis/",
        destination: "/uslugi/diagnostyka-i-serwis",
        permanent: true,
      },
      {
        source: "/uslugi_pozostale/modernizacje-ukladow-pomiarowych/",
        destination: "/uslugi/modernizacje-ukladow-pomiarowych",
        permanent: true,
      },
      {
        source: "/uslugi_pozostale/wizualizacja-profili-zuzycia/",
        destination: "/uslugi/wizualizacja-profili-zuzycia",
        permanent: true,
      },
      {
        source: "/uslugi_pozostale/strategia-zarzadzania-energia/",
        destination: "/uslugi/strategia-zarzadzania-energia",
        permanent: true,
      },
      {
        source: "/uslugi_pozostale/przeglady-stacji-transformatorowych/",
        destination: "/uslugi/przeglady-stacji-transformatorowych",
        permanent: true,
      },
      {
        source: "/uslugi_pozostale/pomiary-energetyczne/",
        destination: "/uslugi/pomiary-energetyczne",
        permanent: true,
      },
      {
        source: "/uslugi_pozostale/esco/",
        destination: "/uslugi/esco",
        permanent: true,
      },
      {
        source: "/uslugi_pozostale/budynek-inteligentny-automatyka/",
        destination: "/uslugi/budynek-inteligentny-automatyka",
        permanent: true,
      },
      {
        source: "/uslugi_pozostale/ocena-efektywnosci-energetycznej-kotlow/",
        destination: "/uslugi/ocena-efektywnosci-energetycznej-kotlow",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
