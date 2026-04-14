import Link from "next/link";

const nav = [
  { title: "Oferta", url: "/uslugi" },
  { title: "O Nas", url: "/o-nas" },
  { title: "Realizacje", url: "/realizacje" },
  { title: "Blog", url: "/blog" },
  { title: "Kontakt", url: "/kontakt" },
];

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
