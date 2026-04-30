import type { Metadata } from "next";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  title: "O nas",
  description:
    "Niezależne doradztwo energetyczne od 2008. Audyty energetyczne, EMS, OZE, BESS dla 400+ zakładów przemysłowych w Polsce. Kraków, cała Polska.",
  alternates: { canonical: "https://gsenergia.pl/o-nas" },
};

export default function ONasPage() {
  return <AboutClient />;
}
