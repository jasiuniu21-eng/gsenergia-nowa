"use client";

import { useState, useId } from "react";
import { PaperPlaneTilt, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

type Variant = "section" | "footer";

type FormState =
  | "idle"
  | "submitting"
  | "success"
  | "error"
  | "already_subscribed";

type FieldErrors = Partial<{
  email: string;
  rodo: string;
}>;

type FormValues = {
  email: string;
  rodo: boolean;
  _gotcha: string;
};

const INITIAL: FormValues = {
  email: "",
  rodo: false,
  _gotcha: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: FormValues): FieldErrors {
  const e: FieldErrors = {};
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Podaj poprawny adres e-mail.";
  if (!v.rodo) e.rodo = "Zgoda jest wymagana.";
  return e;
}

type NewsletterFormProps = {
  variant: Variant;
};

export function NewsletterForm({ variant }: NewsletterFormProps) {
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

    const payload = {
      email: values.email.trim().toLowerCase(),
      _gotcha: values._gotcha,
    };

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        status?: "success" | "already_subscribed";
        error?: string;
      };
      if (res.ok && data.ok) {
        if (data.status === "already_subscribed") {
          setState("already_subscribed");
        } else {
          setState("success");
        }
      } else if (res.status === 429) {
        setState("error");
        setServerMsg(
          "Zbyt wiele prób. Spróbuj ponownie za chwilę.",
        );
      } else if (res.status === 400) {
        setState("error");
        setServerMsg("Sprawdź adres e-mail i spróbuj ponownie.");
      } else {
        setState("error");
        setServerMsg("Coś poszło nie tak. Spróbuj ponownie później.");
      }
    } catch {
      setState("error");
      setServerMsg("Brak połączenia z serwerem. Spróbuj ponownie.");
    }
  }

  // Honeypot field (shared)
  const honeypot = (
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
  );

  // Success / already-subscribed card content
  const successTitle =
    state === "already_subscribed"
      ? "Już jesteś zapisany"
      : "Dziękujemy!";
  const successBody =
    state === "already_subscribed"
      ? "Ten adres jest już na liście newslettera."
      : "Sprawdź skrzynkę — wysłaliśmy potwierdzenie.";

  const inputCls =
    "w-full rounded-lg bg-white/5 ring-1 ring-white/15 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#86bc25] focus:border-[#86bc25] transition-colors";
  const errCls = "text-sm text-[#fca5a5] mt-1.5";
  const buttonCls =
    "shrink-0 inline-flex items-center justify-center gap-2 bg-[#86bc25] text-black hover:bg-[#9bd02e] px-7 py-3 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors";
  const checkboxCls =
    "mt-1 h-4 w-4 rounded border-white/30 bg-white/10 text-[#86bc25] focus:ring-[#86bc25] focus:ring-offset-0";
  const checkboxLabelCls =
    "flex items-start gap-3 text-xs text-white/65 leading-relaxed";

  // RODO consent block
  const rodoBlock = (
    <>
      <label htmlFor={id("rodo")} className={checkboxLabelCls}>
        <input
          id={id("rodo")}
          type="checkbox"
          className={checkboxCls}
          checked={values.rodo}
          onChange={(e) => set("rodo", e.target.checked)}
          aria-invalid={Boolean(errors.rodo)}
          aria-describedby={errors.rodo ? id("rodo-err") : undefined}
          required
        />
        <span>
          Zgadzam się na otrzymywanie newslettera. Możesz wypisać się w
          każdej chwili.{" "}
          <Link
            href="/polityka-prywatnosci"
            className="underline text-white/80 hover:text-white"
          >
            Polityka prywatności
          </Link>
          .
        </span>
      </label>
      {errors.rodo && (
        <p id={id("rodo-err")} className={errCls}>
          {errors.rodo}
        </p>
      )}
    </>
  );

  // Submit button content
  const submitContent =
    state === "submitting" ? (
      "Wysyłanie..."
    ) : (
      <>
        Zapisz się
        <PaperPlaneTilt size={16} weight="bold" />
      </>
    );

  // ───────────────────────── FOOTER VARIANT ─────────────────────────
  if (variant === "footer") {
    if (state === "success" || state === "already_subscribed") {
      return (
        <div className="rounded-xl bg-[#86bc25]/10 ring-1 ring-[#86bc25]/30 p-5">
          <div className="flex items-start gap-3">
            <CheckCircle
              size={24}
              weight="duotone"
              className="shrink-0 text-[#86bc25]"
            />
            <div>
              <p className="font-medium text-white">{successTitle}</p>
              <p className="mt-1 text-sm text-white/70">{successBody}</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <form onSubmit={onSubmit} noValidate className="relative">
        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/65 mb-3">
          Newsletter
        </p>
        <p className="text-sm text-white/75 mb-4 max-w-[42ch]">
          Comiesięczna porcja wiedzy energetycznej. Bez spamu.
        </p>

        {honeypot}

        <div className="flex flex-col sm:flex-row gap-2">
          <label htmlFor={id("email")} className="sr-only">
            Twój e-mail
          </label>
          <input
            id={id("email")}
            type="email"
            autoComplete="email"
            placeholder="Twój e-mail"
            className={`${inputCls} flex-1`}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? id("email-err") : undefined}
            required
            maxLength={200}
          />
          <button
            type="submit"
            disabled={state === "submitting"}
            aria-busy={state === "submitting"}
            className={buttonCls}
          >
            {submitContent}
          </button>
        </div>
        {errors.email && (
          <p id={id("email-err")} className={errCls}>
            {errors.email}
          </p>
        )}

        <div className="mt-3">{rodoBlock}</div>

        {state === "error" && serverMsg && (
          <p
            role="alert"
            className="mt-3 rounded-lg bg-[#dc2626]/10 ring-1 ring-[#dc2626]/30 p-3 text-sm text-[#fca5a5]"
          >
            {serverMsg}
          </p>
        )}
      </form>
    );
  }

  // ───────────────────────── SECTION VARIANT ─────────────────────────
  return (
    <section id="newsletter" className="bg-[oklch(0.16_0.02_150)] text-white border-t border-white/10">
      <div className="container-site py-[clamp(4rem,7vw,7rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
          {/* LEFT — copy */}
          <div>
            <p
              className="text-[11px] font-mono uppercase tracking-[0.18em] mb-5"
              style={{ color: "#86bc25" }}
            >
              Newsletter
            </p>
            <h2
              className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em]"
              style={{ fontWeight: 300 }}
            >
              Wiedza energetyczna w Twojej skrzynce
              <span style={{ color: "#86bc25" }}>.</span>
            </h2>
            <p className="mt-6 text-white/70 max-w-[52ch] leading-relaxed">
              Raz w miesiącu praktyczne case studies, najnowsze dotacje OZE i
              regulacje. Bez spamu.
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              <li>
                <span className="text-[#86bc25]">✓</span> Co miesiąc
              </li>
              <li>
                <span className="text-[#86bc25]">✓</span> Praktyczne case studies
              </li>
              <li>
                <span className="text-[#86bc25]">✓</span> Wypisanie 1 klikiem
              </li>
            </ul>
          </div>

          {/* RIGHT — form card */}
          <div className="rounded-2xl bg-white/[0.04] ring-1 ring-white/10 p-7 lg:p-8">
            {state === "success" || state === "already_subscribed" ? (
              <div className="text-center py-6">
                <CheckCircle
                  size={48}
                  weight="duotone"
                  className="mx-auto text-[#86bc25]"
                />
                <h3 className="mt-4 font-display text-2xl text-white">
                  {successTitle}
                </h3>
                <p className="mt-3 text-white/70">{successBody}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="relative">
                {honeypot}

                <label
                  htmlFor={id("email")}
                  className="block text-sm font-medium text-white/85 mb-2"
                >
                  Twój e-mail służbowy
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    id={id("email")}
                    type="email"
                    autoComplete="email"
                    placeholder="Twój e-mail"
                    className={`${inputCls} flex-1`}
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? id("email-err") : undefined}
                    required
                    maxLength={200}
                  />
                  <button
                    type="submit"
                    disabled={state === "submitting"}
                    aria-busy={state === "submitting"}
                    className={buttonCls}
                  >
                    {submitContent}
                  </button>
                </div>
                {errors.email && (
                  <p id={id("email-err")} className={errCls}>
                    {errors.email}
                  </p>
                )}

                <div className="mt-4">{rodoBlock}</div>

                {state === "error" && serverMsg && (
                  <p
                    role="alert"
                    className="mt-4 rounded-lg bg-[#dc2626]/10 ring-1 ring-[#dc2626]/30 p-3 text-sm text-[#fca5a5]"
                  >
                    {serverMsg}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
