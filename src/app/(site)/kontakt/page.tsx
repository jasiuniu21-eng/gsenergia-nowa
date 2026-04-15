import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt · GS Energia — Kraków",
  description:
    "Skontaktuj się z GS Energia — audytorzy energetyczni z Krakowa. Tel.: +48 606 590 931, e-mail: biuro@gsenergia.pl. Rynek Główny 28, 31-010 Kraków.",
};

export default function KontaktPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Kontakt</h1>
      <p className="text-lg text-gray-600 mb-12 max-w-2xl">
        Zadzwoń, napisz lub wypełnij krótką ankietę konsultacyjną — odpowiemy w ciągu
        jednego dnia roboczego i bezpłatnie ocenimy zakres potrzebnego audytu.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* NAP block — Local SEO */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-6">Dane kontaktowe</h2>

          <address className="not-italic space-y-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">Firma</div>
              <div className="font-semibold text-lg">GS Energia</div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">Adres</div>
              <div className="font-medium">Rynek Główny 28</div>
              <div className="font-medium">31-010 Kraków</div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">Telefon</div>
              <a
                href={SITE.phoneHref}
                className="text-blue-700 font-semibold text-lg hover:underline"
              >
                +48 606 590 931
              </a>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">E-mail</div>
              <a
                href={SITE.emailHref}
                className="text-blue-700 font-medium hover:underline"
              >
                biuro@gsenergia.pl
              </a>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">NIP</div>
              <div className="text-gray-700">{SITE.nip}</div>
            </div>
          </address>
        </div>

        {/* CTA / Survey */}
        <div className="flex flex-col gap-6">
          <div className="border border-blue-200 rounded-2xl p-8 bg-blue-50">
            <h2 className="text-xl font-semibold mb-3">Bezpłatna konsultacja energetyczna</h2>
            <p className="text-gray-700 text-sm mb-5">
              Wypełnij krótką ankietę (ok. 5 minut) — nasi audytorzy skontaktują się z Tobą
              bezpłatnie i ocenią, jakiego rodzaju audyt jest potrzebny Twojej firmie.
            </p>
            <Link
              href={SITE.surveyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Wypełnij ankietę →
            </Link>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6">
            <h3 className="font-semibold mb-2">Godziny kontaktu</h3>
            <p className="text-sm text-gray-600">Poniedziałek – Piątek: 8:00 – 17:00</p>
            <p className="text-sm text-gray-600 mt-1">W pilnych sprawach — telefon całą dobę.</p>
          </div>
        </div>
      </div>

      {/* Map embed placeholder */}
      <div className="rounded-2xl overflow-hidden border border-gray-200 h-64 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
        Rynek Główny 28, 31-010 Kraków — GS Energia
      </div>
    </div>
  );
}
