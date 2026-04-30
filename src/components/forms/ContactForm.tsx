"use client";

import { useState, useId } from "react";
import {
  PaperPlaneTilt,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

type FormState = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<{
  imie: string;
  firma: string;
  email: string;
  telefon: string;
  temat: string;
  wiadomosc: string;
  rodo: string;
}>;

type FormValues = {
  imie: string;
  firma: string;
  email: string;
  telefon: string;
  temat: string;
  wiadomosc: string;
  rodo: boolean;
  newsletter: boolean;
  _gotcha: string;
};

const INITIAL: FormValues = {
  imie: "",
  firma: "",
  email: "",
  telefon: "",
  temat: "Audyt energetyczny przedsiębiorstwa",
  wiadomosc: "",
  rodo: false,
  newsletter: false,
  _gotcha: "",
};

const TEMATY = [
  "Audyt energetyczny przedsiębiorstwa",
  "Audyt efektywności energetycznej",
  "EMS / Telemetria",
  "Magazyn energii / BESS",
  "Fotowoltaika / OZE",
  "ESG / CSRD",
  "Inne",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: FormValues): FieldErrors {
  const e: FieldErrors = {};
  if (v.imie.trim().length < 2) e.imie = "Podaj imię (min. 2 znaki).";
  if (v.firma.trim().length < 2) e.firma = "Podaj nazwę firmy.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Podaj poprawny adres e-mail.";
  if (v.wiadomosc.trim().length < 20)
    e.wiadomosc = "Wiadomość powinna mieć co najmniej 20 znaków.";
  if (!v.rodo) e.rodo = "Zgoda jest wymagana, aby wysłać wiadomość.";
  return e;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<FormState>("idle");
  const [serverMsg, setServerMsg] = useState<string>("");

  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;

  const set = <K extends keyof FormValues>(key: K, v: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: v }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setState("submitting");
    setServerMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (res.ok && data.ok) {
        setState("success");
      } else if (res.status === 429) {
        setState("error");
        setServerMsg(
          "Wysłano zbyt wiele wiadomości w krótkim czasie. Spróbuj ponownie za chwilę lub zadzwoń.",
        );
      } else if (res.status === 400) {
        setState("error");
        setServerMsg("Sprawdź poprawność danych i spróbuj ponownie.");
      } else {
        setState("error");
        setServerMsg("Coś poszło nie tak. Spróbuj ponownie lub napisz e-mail.");
      }
    } catch {
      setState("error");
      setServerMsg(
        "Brak połączenia z serwerem. Spróbuj ponownie lub napisz e-mail.",
      );
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl bg-[#26890d]/5 ring-1 ring-[#26890d]/20 p-8 text-center">
        <CheckCircle
          size={56}
          weight="duotone"
          className="mx-auto text-[#26890d]"
        />
        <h3 className="mt-4 font-display text-2xl text-[#222328]">
          Dziękujemy!
        </h3>
        <p className="mt-3 text-[#222328]/75 max-w-sm mx-auto">
          Skontaktujemy się w ciągu 24h. Tymczasem możesz{" "}
          <Link
            href="/realizacje"
            className="text-[#26890d] underline hover:no-underline"
          >
            zobaczyć nasze realizacje
          </Link>
          .
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-[#26890d] focus:border-[#26890d] transition-colors";
  const labelCls =
    "block text-sm font-medium text-[#222328] mb-1.5";
  const errCls = "text-sm text-[#dc2626] mt-1.5";
  const req = <span className="text-[#dc2626]">*</span>;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-black/10 bg-white p-7 lg:p-9"
      aria-describedby={serverMsg ? id("server") : undefined}
    >
      <noscript>
        <p className="mb-6 rounded-lg bg-amber-50 ring-1 ring-amber-200 p-4 text-sm text-amber-900">
          Formularz wymaga włączonego JavaScript. Napisz na{" "}
          <a className="underline" href="mailto:biuro@gsenergia.pl">
            biuro@gsenergia.pl
          </a>{" "}
          lub zadzwoń <a className="underline" href="tel:+48606590931">+48 606 590 931</a>.
        </p>
      </noscript>

      <h2 className="font-display text-2xl text-[#222328] mb-1">
        Napisz do nas
      </h2>
      <p className="text-sm text-[#222328]/65 mb-7">
        Pola oznaczone <span className="text-[#dc2626]">*</span> są wymagane.
      </p>

      {/* Honeypot — ukryte pole anty-bot */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label htmlFor={id("_gotcha")}>Zostaw to pole puste</label>
        <input
          id={id("_gotcha")}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values._gotcha}
          onChange={(e) => set("_gotcha", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={id("imie")} className={labelCls}>
            Imię {req}
          </label>
          <input
            id={id("imie")}
            type="text"
            autoComplete="given-name"
            className={inputCls}
            value={values.imie}
            onChange={(e) => set("imie", e.target.value)}
            aria-invalid={Boolean(errors.imie)}
            aria-describedby={errors.imie ? id("imie-err") : undefined}
            required
            minLength={2}
            maxLength={100}
          />
          {errors.imie && (
            <p id={id("imie-err")} className={errCls}>
              {errors.imie}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={id("firma")} className={labelCls}>
            Nazwa firmy {req}
          </label>
          <input
            id={id("firma")}
            type="text"
            autoComplete="organization"
            className={inputCls}
            value={values.firma}
            onChange={(e) => set("firma", e.target.value)}
            aria-invalid={Boolean(errors.firma)}
            aria-describedby={errors.firma ? id("firma-err") : undefined}
            required
            minLength={2}
            maxLength={200}
          />
          {errors.firma && (
            <p id={id("firma-err")} className={errCls}>
              {errors.firma}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={id("email")} className={labelCls}>
            E-mail {req}
          </label>
          <input
            id={id("email")}
            type="email"
            autoComplete="email"
            className={inputCls}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? id("email-err") : undefined}
            required
            maxLength={200}
          />
          {errors.email && (
            <p id={id("email-err")} className={errCls}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={id("telefon")} className={labelCls}>
            Telefon
          </label>
          <input
            id={id("telefon")}
            type="tel"
            autoComplete="tel"
            placeholder="+48 600 000 000"
            className={inputCls}
            value={values.telefon}
            onChange={(e) => set("telefon", e.target.value)}
            maxLength={30}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id("temat")} className={labelCls}>
            Temat {req}
          </label>
          <select
            id={id("temat")}
            className={inputCls}
            value={values.temat}
            onChange={(e) => set("temat", e.target.value)}
            required
          >
            {TEMATY.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id("wiadomosc")} className={labelCls}>
            Wiadomość {req}
          </label>
          <textarea
            id={id("wiadomosc")}
            className={`${inputCls} min-h-[140px] resize-y`}
            value={values.wiadomosc}
            onChange={(e) => set("wiadomosc", e.target.value)}
            aria-invalid={Boolean(errors.wiadomosc)}
            aria-describedby={
              errors.wiadomosc ? id("wiadomosc-err") : undefined
            }
            required
            minLength={20}
            maxLength={5000}
          />
          {errors.wiadomosc && (
            <p id={id("wiadomosc-err")} className={errCls}>
              {errors.wiadomosc}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <label
          htmlFor={id("rodo")}
          className="flex items-start gap-3 text-sm text-[#222328]/85"
        >
          <input
            id={id("rodo")}
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-black/30 text-[#26890d] focus:ring-[#26890d]"
            checked={values.rodo}
            onChange={(e) => set("rodo", e.target.checked)}
            aria-invalid={Boolean(errors.rodo)}
            aria-describedby={errors.rodo ? id("rodo-err") : undefined}
            required
          />
          <span>
            Wyrażam zgodę na przetwarzanie moich danych osobowych przez GS
            Energia w celu odpowiedzi na zapytanie. Szczegóły w{" "}
            <Link
              href="/polityka-prywatnosci"
              className="text-[#26890d] underline hover:no-underline"
            >
              polityce prywatności
            </Link>
            . {req}
          </span>
        </label>
        {errors.rodo && (
          <p id={id("rodo-err")} className={errCls}>
            {errors.rodo}
          </p>
        )}

        <label
          htmlFor={id("newsletter")}
          className="flex items-start gap-3 text-sm text-[#222328]/85"
        >
          <input
            id={id("newsletter")}
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-black/30 text-[#26890d] focus:ring-[#26890d]"
            checked={values.newsletter}
            onChange={(e) => set("newsletter", e.target.checked)}
          />
          <span>
            Chcę otrzymywać okazjonalne informacje o webinarach, dotacjach OZE i
            wiedzy energetycznej.
          </span>
        </label>
      </div>

      {state === "error" && serverMsg && (
        <p
          id={id("server")}
          role="alert"
          className="mt-6 rounded-lg bg-[#dc2626]/5 ring-1 ring-[#dc2626]/20 p-4 text-sm text-[#dc2626]"
        >
          {serverMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        aria-busy={state === "submitting"}
        className="mt-7 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#26890d] text-white px-7 py-3.5 text-[0.95rem] font-medium hover:bg-[#1f6f0a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {state === "submitting" ? (
          "Wysyłanie..."
        ) : state === "error" ? (
          "Błąd — spróbuj ponownie"
        ) : (
          <>
            Wyślij wiadomość
            <PaperPlaneTilt size={16} weight="bold" />
          </>
        )}
      </button>
    </form>
  );
}
