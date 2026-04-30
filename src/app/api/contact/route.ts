// TODO: integrate with Resend, SendGrid, or biuro@gsenergia.pl SMTP.
// For now this endpoint validates input and logs server-side.
// To enable email: install `resend`, set RESEND_API_KEY, send to biuro@gsenergia.pl.

import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  imie?: unknown;
  firma?: unknown;
  email?: unknown;
  telefon?: unknown;
  temat?: unknown;
  wiadomosc?: unknown;
  rodo?: unknown;
  newsletter?: unknown;
  _gotcha?: unknown;
};

type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  imie: 100,
  firma: 200,
  email: 200,
  telefon: 30,
  temat: 100,
  wiadomosc: 5000,
} as const;

const ALLOWED_TEMATY = new Set([
  "Audyt energetyczny przedsiębiorstwa",
  "Audyt efektywności energetycznej",
  "EMS / Telemetria",
  "Magazyn energii / BESS",
  "Fotowoltaika / OZE",
  "ESG / CSRD",
  "Inne",
]);

// Module-scoped in-memory rate limiter.
// NOTE: not distributed; resets on cold start. Acceptable for early prod;
// swap for Upstash/Redis when going multi-instance.
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_MAX = 5;
const ipHits: Map<string, number[]> = new Map();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const arr = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (arr.length >= RATE_MAX) {
    ipHits.set(ip, arr);
    return false;
  }
  arr.push(now);
  ipHits.set(ip, arr);
  return true;
}

function getIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

function asString(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  if (trimmed.length === 0) return "";
  if (trimmed.length > max) return null;
  return trimmed;
}

function redactEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return "***";
  const head = local.slice(0, 1);
  return `${head}***@${domain}`;
}

type ValidatedData = {
  imie: string;
  firma: string;
  email: string;
  telefon: string;
  temat: string;
  wiadomosc: string;
  rodo: boolean;
  newsletter: boolean;
};

function validate(
  body: ContactPayload,
): { ok: true; data: ValidatedData } | { ok: false; fields: FieldErrors } {
  const fields: FieldErrors = {};

  const imie = asString(body.imie, LIMITS.imie);
  if (imie === null || imie.length < 2) fields.imie = "Imię jest wymagane.";

  const firma = asString(body.firma, LIMITS.firma);
  if (firma === null || firma.length < 2)
    fields.firma = "Nazwa firmy jest wymagana.";

  const email = asString(body.email, LIMITS.email);
  if (email === null || !EMAIL_RE.test(email ?? ""))
    fields.email = "Niepoprawny e-mail.";

  const telefon = asString(body.telefon, LIMITS.telefon) ?? "";

  const temat = asString(body.temat, LIMITS.temat);
  if (!temat || !ALLOWED_TEMATY.has(temat))
    fields.temat = "Wybierz temat z listy.";

  const wiadomosc = asString(body.wiadomosc, LIMITS.wiadomosc);
  if (wiadomosc === null || wiadomosc.length < 20)
    fields.wiadomosc = "Wiadomość zbyt krótka.";

  const rodo = body.rodo === true;
  if (!rodo) fields.rodo = "Zgoda RODO jest wymagana.";

  const newsletter = body.newsletter === true;

  if (Object.keys(fields).length > 0) {
    return { ok: false, fields };
  }

  return {
    ok: true,
    data: {
      imie: imie as string,
      firma: firma as string,
      email: email as string,
      telefon,
      temat: temat as string,
      wiadomosc: wiadomosc as string,
      rodo,
      newsletter,
    },
  };
}

export async function POST(request: NextRequest): Promise<Response> {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return Response.json(
      { ok: false, error: "validation", fields: { _: "Nieprawidłowy JSON." } },
      { status: 400 },
    );
  }

  // Honeypot — silently succeed if filled
  if (typeof body._gotcha === "string" && body._gotcha.trim().length > 0) {
    console.log(
      `[contact] honeypot hit from ${getIp(request)} @ ${new Date().toISOString()}`,
    );
    return Response.json({ ok: true }, { status: 200 });
  }

  const ip = getIp(request);
  if (!rateLimit(ip)) {
    return Response.json(
      { ok: false, error: "rate_limit" },
      { status: 429 },
    );
  }

  const v = validate(body);
  if (!v.ok) {
    return Response.json(
      { ok: false, error: "validation", fields: v.fields },
      { status: 400 },
    );
  }

  try {
    console.log(
      `[contact] ${new Date().toISOString()} ip=${ip} from=${redactEmail(
        v.data.email,
      )} firma="${v.data.firma}" temat="${v.data.temat}" newsletter=${v.data.newsletter} len=${v.data.wiadomosc.length}`,
    );
    // TODO: send email via Resend / SMTP here.
    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] server error", err);
    return Response.json({ ok: false, error: "server" }, { status: 500 });
  }
}
