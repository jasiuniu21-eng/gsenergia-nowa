import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Polityka prywatności GS Energia — jak przetwarzamy dane osobowe, jakie cookies używamy, Twoje prawa wynikające z RODO.",
  alternates: { canonical: "https://gsenergia.pl/polityka-prywatnosci" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "30 kwietnia 2026";

export default function PolitykaPrywatnosciPage() {
  return (
    <article className="container-narrow max-w-[820px] mx-auto px-6 py-[clamp(4rem,7vw,7rem)]">
      {/* Header */}
      <header className="mb-12 md:mb-16">
        <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-medium">
          Dokument prawny
        </p>
        <h1
          className="font-display mt-4 text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.02] tracking-[-0.02em] text-[#1a1c20]"
          style={{ fontWeight: 300 }}
        >
          Polityka prywatności<span style={{ color: "#8DC73F" }}>.</span>
        </h1>
        <p className="mt-5 text-sm text-zinc-500">
          Ostatnia aktualizacja: {LAST_UPDATED}
        </p>
      </header>

      <div
        className="prose prose-zinc max-w-none
          prose-headings:font-display prose-headings:tracking-[-0.01em] prose-headings:text-[#1a1c20]
          prose-h2:text-[1.65rem] prose-h2:font-medium prose-h2:mt-14 prose-h2:mb-5
          prose-h3:text-[1.15rem] prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
          prose-p:leading-[1.75] prose-p:text-zinc-700
          prose-li:leading-[1.7] prose-li:text-zinc-700
          prose-a:text-[#26890d] prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-2
          prose-strong:text-[#1a1c20]
          prose-table:text-[0.92rem]
          prose-th:bg-zinc-50 prose-th:font-semibold prose-th:text-zinc-900 prose-th:text-left
          prose-td:align-top
        "
      >
        <h2>§1 Wprowadzenie</h2>
        <p>
          Niniejsza Polityka prywatności opisuje zasady, na jakich GS Energia (dalej również „my”,
          „Administrator”) przetwarza dane osobowe użytkowników serwisu{" "}
          <a href="https://gsenergia.pl">gsenergia.pl</a> oraz osób, które kontaktują się z nami
          w sprawach handlowych, audytowych i doradczych.
        </p>
        <p>
          GS Energia jest niezależną firmą doradczą działającą w obszarze efektywności
          energetycznej, audytów energetycznych przedsiębiorstw, instalacji OZE oraz wdrożeń ESG/CSRD.
          Przetwarzamy dane osobowe wyłącznie w zakresie niezbędnym do realizacji usług oraz
          wypełnienia obowiązków prawnych spoczywających na Administratorze.
        </p>
        <p>
          Podstawą prawną przetwarzania danych jest Rozporządzenie Parlamentu Europejskiego i Rady
          (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku
          z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych (RODO),
          a także Ustawa z dnia 10 maja 2018 r. o ochronie danych osobowych (Dz.U. 2018 poz. 1000
          z późn. zm.).
        </p>

        <h2>§2 Administrator danych osobowych</h2>
        <p>Administratorem Twoich danych osobowych jest:</p>
        <p>
          <strong>GS Energia</strong>
          <br />
          Rynek Główny 28
          <br />
          31-010 Kraków
          <br />
          NIP: 685-221-14-17
          <br />
          E-mail:{" "}
          <a href="mailto:biuro@gsenergia.pl">biuro@gsenergia.pl</a>
          <br />
          Telefon: <a href="tel:+48606590931">+48 606 590 931</a>
        </p>
        <p>
          We wszelkich sprawach związanych z przetwarzaniem danych osobowych — w tym w celu
          realizacji praw, o których mowa w §8 — prosimy o kontakt pod adresem{" "}
          <a href="mailto:biuro@gsenergia.pl">biuro@gsenergia.pl</a>. Nie powołaliśmy Inspektora
          Ochrony Danych — obowiązki w zakresie ochrony danych osobowych realizuje bezpośrednio
          zarząd Administratora.
        </p>

        <h2>§3 Zakres danych i cele przetwarzania</h2>
        <p>
          Przetwarzamy dane osobowe w zakresie odpowiadającym celowi, dla którego zostały zebrane.
          Poniższa tabela prezentuje główne kategorie danych, cele ich przetwarzania oraz
          przysługujące im podstawy prawne.
        </p>
        <table>
          <thead>
            <tr>
              <th>Kategoria danych</th>
              <th>Cel</th>
              <th>Podstawa prawna</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dane kontaktowe (imię, nazwisko, e-mail, telefon, firma)</td>
              <td>Odpowiedź na zapytanie, prowadzenie korespondencji, realizacja umowy</td>
              <td>art. 6 ust. 1 lit. b RODO</td>
            </tr>
            <tr>
              <td>Dane firmowe (NIP, adres rejestrowy, dane do faktury)</td>
              <td>Wystawianie faktur, prowadzenie ksiąg rachunkowych, obowiązki podatkowe</td>
              <td>art. 6 ust. 1 lit. c RODO</td>
            </tr>
            <tr>
              <td>Dane techniczne (adres IP, identyfikatory cookies, user agent)</td>
              <td>Zapewnienie poprawnego działania serwisu, bezpieczeństwo, statystyki</td>
              <td>art. 6 ust. 1 lit. f RODO (uzasadniony interes)</td>
            </tr>
            <tr>
              <td>Dane marketingowe (e-mail w newsletterze, preferencje)</td>
              <td>Marketing własny — newsletter, materiały eksperckie, kampanie</td>
              <td>art. 6 ust. 1 lit. a RODO (zgoda)</td>
            </tr>
          </tbody>
        </table>
        <p>
          Podanie danych jest dobrowolne, jednak w przypadku danych niezbędnych do zawarcia
          i realizacji umowy lub wystawienia faktury — ich brak uniemożliwia świadczenie usługi.
        </p>

        <h2>§4 Pliki cookies</h2>
        <p>
          Serwis korzysta z plików cookies (tzw. „ciasteczek”) — niewielkich plików tekstowych
          zapisywanych na urządzeniu użytkownika. Cookies pozwalają nam zapewnić poprawne działanie
          strony, dostosować ją do preferencji użytkownika oraz mierzyć skuteczność serwisu.
        </p>
        <p>
          Stosujemy trzy kategorie plików cookies. Wyłącznie cookies niezbędne są instalowane bez
          zgody użytkownika; pozostałe — analityczne i marketingowe — uruchamiamy dopiero po
          udzieleniu zgody za pomocą banera cookies.
        </p>
        <h3>Niezbędne</h3>
        <p>
          Konieczne do prawidłowego funkcjonowania serwisu — obsługa sesji, bezpieczeństwo,
          zapamiętanie wyboru w zakresie cookies oraz preferencji językowych.
        </p>
        <h3>Analityczne</h3>
        <p>
          Umożliwiają nam analizę ruchu i zachowania użytkowników w serwisie — w sposób
          zagregowany i pseudonimizowany. Wykorzystujemy te dane wyłącznie do ulepszania treści
          i wydajności strony.
        </p>
        <h3>Marketingowe</h3>
        <p>
          Pozwalają na prezentowanie spersonalizowanych komunikatów oraz mierzenie skuteczności
          kampanii reklamowych prowadzonych poza serwisem.
        </p>
        <table>
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Dostawca</th>
              <th>Cel</th>
              <th>Czas przechowywania</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>gse_cookie_consent_v1</code>
              </td>
              <td>GS Energia</td>
              <td>Zapamiętanie wyboru użytkownika w zakresie zgód cookies</td>
              <td>12 miesięcy</td>
            </tr>
            <tr>
              <td>
                <code>_ga</code>, <code>_ga_*</code>
              </td>
              <td>Google Ireland Ltd.</td>
              <td>Analityka ruchu, statystyki odwiedzin (po wyrażeniu zgody)</td>
              <td>do 24 miesięcy</td>
            </tr>
            <tr>
              <td>
                <code>_fbp</code>
              </td>
              <td>Meta Platforms Ireland Ltd.</td>
              <td>Retargeting reklamowy, pomiar konwersji (po wyrażeniu zgody)</td>
              <td>do 3 miesięcy</td>
            </tr>
          </tbody>
        </table>
        <p>
          Zgodę na cookies analityczne i marketingowe można w każdej chwili wycofać poprzez
          usunięcie plików cookies w ustawieniach przeglądarki lub poprzez ponowne otwarcie banera
          (np. po wyczyszczeniu pamięci lokalnej serwisu).
        </p>

        <h2>§5 Odbiorcy danych</h2>
        <p>
          Twoje dane osobowe możemy udostępniać wyłącznie zaufanym odbiorcom, którzy świadczą na
          naszą rzecz usługi — w zakresie i w celu niezbędnym do ich realizacji. Każdy odbiorca
          działa na podstawie umowy powierzenia przetwarzania danych, zgodnie z art. 28 RODO.
        </p>
        <p>Do typowych kategorii odbiorców należą:</p>
        <ul>
          <li>
            <strong>Dostawca hostingu</strong> — Vercel Inc. (USA) — hosting serwisu i CDN.
          </li>
          <li>
            <strong>Dostawca analityki</strong> — Google Ireland Ltd. (Google Analytics 4) — po
            wyrażeniu zgody.
          </li>
          <li>
            <strong>Platformy reklamowe</strong> — Meta Platforms Ireland Ltd. — po wyrażeniu zgody.
          </li>
          <li>
            <strong>Biuro księgowe i doradcy podatkowi</strong> — w zakresie obsługi finansowej
            i sprawozdawczej.
          </li>
          <li>
            <strong>Doradcy prawni</strong> — w zakresie obsługi prawnej Administratora.
          </li>
          <li>
            <strong>Dostawcy oprogramowania biurowego i komunikacji</strong> — w szczególności
            Microsoft Ireland Operations Ltd. (Microsoft 365).
          </li>
        </ul>
        <p>
          Dane mogą być również udostępnione organom publicznym, jeśli wynika to z obowiązujących
          przepisów prawa.
        </p>

        <h2>§6 Przekazywanie danych poza EOG</h2>
        <p>
          W związku z korzystaniem z usług dostawców globalnych (m.in. Vercel, Google, Meta) Twoje
          dane mogą być przetwarzane poza Europejskim Obszarem Gospodarczym, w szczególności
          w Stanach Zjednoczonych.
        </p>
        <p>
          W każdym takim przypadku zapewniamy, aby przekazanie odbywało się z zachowaniem
          odpowiednich zabezpieczeń wymaganych przez RODO. Stosujemy:
        </p>
        <ul>
          <li>
            <strong>Standardowe klauzule umowne (SCC)</strong> zatwierdzone decyzją Komisji
            Europejskiej z dnia 4 czerwca 2021 r.,
          </li>
          <li>
            <strong>Data Privacy Framework (UE–USA)</strong> — w przypadku podmiotów certyfikowanych
            w ramach tego programu,
          </li>
          <li>środki techniczne i organizacyjne ograniczające ryzyko (m.in. szyfrowanie danych w transmisji).</li>
        </ul>
        <p>
          Na żądanie udostępniamy szczegółowe informacje o stosowanych zabezpieczeniach — prosimy
          o kontakt pod adresem <a href="mailto:biuro@gsenergia.pl">biuro@gsenergia.pl</a>.
        </p>

        <h2>§7 Czas przechowywania danych</h2>
        <p>
          Przechowujemy dane wyłącznie tak długo, jak jest to niezbędne dla realizacji celów,
          w których zostały zebrane, oraz do wypełnienia obowiązków prawnych. Standardowe okresy
          przechowywania:
        </p>
        <ul>
          <li>
            <strong>Zapytania kontaktowe i korespondencja handlowa</strong> — do 3 lat od ostatniego
            kontaktu.
          </li>
          <li>
            <strong>Dane wynikające z zawartych umów</strong> — 6 lat od końca roku, w którym
            zakończono realizację umowy (zgodnie z przepisami podatkowymi i o rachunkowości).
          </li>
          <li>
            <strong>Dane subskrybentów newslettera</strong> — do momentu wycofania zgody.
          </li>
          <li>
            <strong>Pliki cookies</strong> — do końca sesji przeglądarki lub maksymalnie 24 miesiące,
            zgodnie z tabelą w §4.
          </li>
        </ul>

        <h2>§8 Twoje prawa</h2>
        <p>
          Zgodnie z art. 15–22 RODO przysługują Ci następujące prawa w zakresie przetwarzanych przez
          nas danych osobowych:
        </p>
        <ul>
          <li>
            <strong>Prawo dostępu</strong> do swoich danych oraz uzyskania ich kopii,
          </li>
          <li>
            <strong>Prawo do sprostowania</strong> danych nieprawidłowych lub nieaktualnych,
          </li>
          <li>
            <strong>Prawo do usunięcia danych</strong> („prawo do bycia zapomnianym”) — w przypadkach
            określonych w art. 17 RODO,
          </li>
          <li>
            <strong>Prawo do ograniczenia przetwarzania</strong> w sytuacjach wskazanych w art. 18
            RODO,
          </li>
          <li>
            <strong>Prawo do sprzeciwu</strong> wobec przetwarzania danych w oparciu o uzasadniony
            interes Administratora,
          </li>
          <li>
            <strong>Prawo do przenoszenia danych</strong> dostarczonych nam w sposób zautomatyzowany,
          </li>
          <li>
            <strong>Prawo do wycofania zgody</strong> w dowolnym momencie — bez wpływu na zgodność
            z prawem przetwarzania, którego dokonano na jej podstawie wcześniej,
          </li>
          <li>
            <strong>Prawo do wniesienia skargi</strong> do organu nadzorczego — Prezesa Urzędu
            Ochrony Danych Osobowych (PUODO), ul. Stawki 2, 00-193 Warszawa, e-mail:{" "}
            <a href="mailto:kancelaria@uodo.gov.pl">kancelaria@uodo.gov.pl</a>.
          </li>
        </ul>
        <p>
          W celu realizacji któregokolwiek z powyższych praw prosimy o kontakt pod adresem{" "}
          <a href="mailto:biuro@gsenergia.pl">biuro@gsenergia.pl</a>. Odpowiemy bez zbędnej zwłoki,
          nie później niż w terminie miesiąca od otrzymania żądania.
        </p>

        <h2>§9 Profilowanie i decyzje zautomatyzowane</h2>
        <p>
          Nie podejmujemy wobec użytkowników decyzji opartych wyłącznie na zautomatyzowanym
          przetwarzaniu danych — w tym profilowaniu — które wywoływałyby skutki prawne lub
          w podobny sposób istotnie wpływały na sytuację osoby, której dane dotyczą.
        </p>
        <p>
          Analityka ruchu w serwisie ma charakter zagregowany i służy wyłącznie poprawie jakości
          treści oraz funkcjonowania strony.
        </p>

        <h2>§10 Zmiany polityki</h2>
        <p>
          Zastrzegamy sobie prawo do okresowej aktualizacji niniejszej Polityki prywatności
          w związku ze zmianami przepisów prawa, technologii lub zakresu świadczonych usług. Data
          ostatniej aktualizacji jest widoczna na początku dokumentu.
        </p>
        <p>
          O istotnych zmianach poinformujemy użytkowników z odpowiednim wyprzedzeniem — drogą
          mailową (subskrybentów newslettera) lub poprzez baner informacyjny na stronie głównej
          serwisu.
        </p>

        <h2>§11 Kontakt</h2>
        <p>
          W przypadku pytań, żądań związanych z realizacją praw wynikających z RODO lub skarg
          dotyczących przetwarzania danych osobowych — prosimy o kontakt:
        </p>
        <p>
          E-mail: <a href="mailto:biuro@gsenergia.pl">biuro@gsenergia.pl</a>
          <br />
          Telefon: <a href="tel:+48606590931">+48 606 590 931</a>
          <br />
          Adres korespondencyjny: GS Energia, Rynek Główny 28, 31-010 Kraków
        </p>
      </div>
    </article>
  );
}
