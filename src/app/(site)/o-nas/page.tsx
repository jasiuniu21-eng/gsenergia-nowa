import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nas — 18 lat audytów · GS Energia",
  description:
    "GS Energia to krakowska firma audytorska założona w 2008 roku. 400+ zrealizowanych audytów, certyfikaty ISO 50001, uprawnienia UDT. Poznaj nasz zespół i historię.",
};

export default function ONasPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">O nas</h1>
      <p className="text-xl text-gray-600 mb-12">
        Jesteśmy krakowską firmą specjalizującą się w audytach energetycznych i doradztwie
        w zakresie efektywności energetycznej dla dużych przedsiębiorstw i instytucji publicznych.
      </p>

      {/* Historia */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Historia firmy</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          GS Energia powstała w Krakowie w <strong>2008 roku</strong> jako odpowiedź na rosnące
          zapotrzebowanie polskich przedsiębiorstw na profesjonalne doradztwo w zakresie
          efektywności energetycznej. Od początku działalności skupiamy się na audytach
          energetycznych dla sektora przemysłowego, energetycznego i publicznego.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          W ciągu 18 lat działalności zrealizowaliśmy ponad <strong>400 audytów</strong> dla
          klientów z całej Polski — od małych zakładów produkcyjnych po wielooddziałowe
          korporacje i instytucje publiczne o ogólnopolskim zasięgu. Wśród naszych klientów
          znalazły się m.in. PGE, PSE, BSH, Grupa ZF, Shell Polska, Mercedes-Benz
          Manufacturing Poland i Wody Polskie.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Dynamiczny rozwój rynku efektywności energetycznej — napędzany regulacjami UE
          (Dyrektywa EED, CSRD, EU ETS) oraz rosnącymi cenami energii — sprawił, że
          audyt energetyczny przestał być formalnością, a stał się realnym narzędziem
          zarządzania kosztami i ryzykiem klimatycznym. GS Energia towarzyszy swoim klientom
          w tej transformacji od samego początku.
        </p>
      </section>

      {/* Liczby */}
      <section className="mb-12 bg-blue-50 rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-6">GS Energia w liczbach</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { value: "2008", label: "rok założenia" },
            { value: "400+", label: "zrealizowanych audytów" },
            { value: "18 lat", label: "doświadczenia" },
            { value: "Kraków", label: "siedziba firmy" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-bold text-blue-700">{value}</div>
              <div className="text-sm text-gray-600 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Certyfikaty */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Certyfikaty i uprawnienia</h2>
        <ul className="space-y-3">
          {[
            {
              title: "ISO 50001",
              desc: "Wdrożenie i audytowanie systemów zarządzania energią zgodnych z normą ISO 50001.",
            },
            {
              title: "Uprawnienia audytora energetycznego UDT",
              desc: "Nasi audytorzy posiadają uprawnienia wydane przez Urząd Dozoru Technicznego do przeprowadzania audytów energetycznych urządzeń i instalacji.",
            },
            {
              title: "Audyt efektywności energetycznej (białe certyfikaty)",
              desc: "Uprawnienia do sporządzania audytów efektywności energetycznej dla URE w ramach systemu białych certyfikatów.",
            },
            {
              title: "PN-EN 16247",
              desc: "Realizacja audytów energetycznych zgodnie z normą europejską PN-EN 16247 (części 1–4), uznawaną przez organy regulacyjne UE.",
            },
          ].map(({ title, desc }) => (
            <li key={title} className="flex gap-4 p-4 border border-gray-100 rounded-lg">
              <div className="shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-2" />
              <div>
                <div className="font-semibold">{title}</div>
                <div className="text-sm text-gray-600 mt-0.5">{desc}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Zespół */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Nasz zespół</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Zespół GS Energia to doświadczeni inżynierowie i specjaliści ds. efektywności
          energetycznej z wykształceniem technicznym (energetyka, elektrotechnika, mechanika,
          budownictwo) i wieloletnim doświadczeniem w realizacji audytów dla różnych branż przemysłu.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Każdy audyt realizowany jest przez certyfikowanego audytora energetycznego we współpracy
          ze specjalistami branżowymi — dzięki temu nasze rekomendacje są realistyczne technicznie
          i ekonomicznie uzasadnione.
        </p>
      </section>
    </div>
  );
}
