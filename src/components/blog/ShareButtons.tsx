"use client";

import { useState } from "react";
import { LinkedinLogo, TwitterLogo, LinkSimple, Check } from "@phosphor-icons/react/dist/ssr";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const twitter = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  const btn =
    "inline-flex items-center justify-center w-10 h-10 rounded-full border border-black/10 text-[#222328] hover:border-[#26890d]/40 hover:text-[#26890d] transition-colors";

  return (
    <div className="flex items-center gap-2.5">
      <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--c-fg-subtle)] mr-1">
        Udostępnij
      </span>
      <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="Udostępnij na LinkedIn" className={btn}>
        <LinkedinLogo size={16} weight="bold" />
      </a>
      <a href={twitter} target="_blank" rel="noopener noreferrer" aria-label="Udostępnij na Twitter" className={btn}>
        <TwitterLogo size={16} weight="bold" />
      </a>
      <button type="button" onClick={copy} aria-label="Skopiuj link" className={btn}>
        {copied ? <Check size={16} weight="bold" /> : <LinkSimple size={16} weight="bold" />}
      </button>
    </div>
  );
}
