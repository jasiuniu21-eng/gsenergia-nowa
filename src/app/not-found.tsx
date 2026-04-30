import type { Metadata } from "next";
import { NotFoundContent } from "@/components/not-found/NotFoundContent";

export const metadata: Metadata = {
  title: "Strona nie znaleziona",
  description:
    "Tej strony nie ma w naszym serwisie. Sprawdź adres lub wróć na stronę główną GS Energia.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundContent />;
}
