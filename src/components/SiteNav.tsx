import Link from "next/link";
import navRaw from "../../data/navigation.json";

const DEFAULT_NAV = [
  { title: "Oferta", url: "/uslugi" },
  { title: "O Nas", url: "/o-nas" },
  { title: "Referencje", url: "/referencje" },
  { title: "Realizacje", url: "/realizacje" },
  { title: "Energia", url: "/energia" },
  { title: "Blog", url: "/blog" },
  { title: "Kontakt", url: "/kontakt" },
];

const nav =
  Array.isArray(navRaw) && navRaw.some((n: any) => n.title && n.url)
    ? (navRaw as { title: string; url: string }[]).filter((n) => n.title && n.url)
    : DEFAULT_NAV;

export function SiteNav() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="font-bold text-emerald-700 text-xl">
          GS Energia
        </Link>
        <nav className="flex gap-6 text-sm">
          {nav.map((n) => (
            <Link key={n.url} href={n.url} className="hover:text-emerald-700">
              {n.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t mt-16 py-8 text-sm text-neutral-500">
      <div className="max-w-6xl mx-auto px-4">
        © {new Date().getFullYear()} GS Energia — audyty energetyczne
      </div>
    </footer>
  );
}
