// TODO: integrate with MailerLite, ConvertKit, or Mailchimp.
// For now, validates email and logs to server console.
// To enable: install provider SDK, set <PROVIDER>_API_KEY in env, push to list ID.

import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type NewsletterPayload = {
  email?: unknown;
  _gotcha?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_MAX = 200;

// TODO: replace with real "already subscribed" check from email provider API.
// Hardcoded for demo of the UI state only.
const ALREADY_SUBSCRIBED_DEMO = new Set<string>([
  "test@gsenergia.pl",
  "subscribed@example.com",
]);

// Module-scoped in-memory rate limiter. Lax: 10/hour/IP — newsletter signups
// are short and people may submit twice. Resets on cold start.
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_MAX = 10;
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

function redactEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return "***";
  const head = local.slice(0, 1);
  return `${head}***@${domain}`;
}

export async function POST(request: NextRequest): Promise<Response> {
  let body: NewsletterPayload;
  try {
    body = (await request.json()) as NewsletterPayload;
  } catch {
    return Response.json(
      { ok: false, error: "validation" },
      { status: 400 },
    );
  }

  // Honeypot — silently succeed if filled
  if (typeof body._gotcha === "string" && body._gotcha.trim().length > 0) {
    console.log(
      `[newsletter] honeypot hit from ${getIp(request)} @ ${new Date().toISOString()}`,
    );
    return Response.json(
      { ok: true, status: "success" },
      { status: 200 },
    );
  }

  const ip = getIp(request);
  if (!rateLimit(ip)) {
    return Response.json(
      { ok: false, error: "rate_limit" },
      { status: 429 },
    );
  }

  // Validate email
  if (typeof body.email !== "string") {
    return Response.json(
      { ok: false, error: "validation" },
      { status: 400 },
    );
  }
  const email = body.email.trim().toLowerCase();
  if (
    email.length === 0 ||
    email.length > EMAIL_MAX ||
    !EMAIL_RE.test(email)
  ) {
    return Response.json(
      { ok: false, error: "validation" },
      { status: 400 },
    );
  }

  try {
    if (ALREADY_SUBSCRIBED_DEMO.has(email)) {
      console.log(
        `[newsletter] ${new Date().toISOString()} ip=${ip} email=${redactEmail(email)} status=already_subscribed`,
      );
      return Response.json(
        { ok: true, status: "already_subscribed" },
        { status: 200 },
      );
    }

    console.log(
      `[newsletter] ${new Date().toISOString()} ip=${ip} email=${redactEmail(email)} status=success`,
    );
    // TODO: push to email provider list here.
    return Response.json(
      { ok: true, status: "success" },
      { status: 200 },
    );
  } catch (err) {
    console.error("[newsletter] server error", err);
    return Response.json({ ok: false, error: "server" }, { status: 500 });
  }
}
