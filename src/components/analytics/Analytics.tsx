"use client";

// Google Analytics 4 — consent-gated via the existing CookieBanner.
// To enable: set NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX in Vercel project env vars.
// Until set, this component renders nothing and no tracking occurs.

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useConsent } from "@/components/layout/CookieBanner";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function Analytics() {
  const consent = useConsent("analytics");
  const pathname = usePathname();
  const enabled = Boolean(GA_ID) && consent === true;

  // Update consent state on change (after initial 'default' is set in inline script).
  useEffect(() => {
    if (!GA_ID) return;
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;
    if (consent === true) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    } else if (consent === false) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
  }, [consent]);

  // Manual page_view on client navigation.
  useEffect(() => {
    if (!GA_ID) return;
    if (consent !== true) return;
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, consent]);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'wait_for_update': 500
          });
          gtag('consent', 'update', { 'analytics_storage': 'granted' });
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { 'anonymize_ip': true });
        `}
      </Script>
    </>
  );
}

export default Analytics;
