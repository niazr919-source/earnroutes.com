"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT_ID } from "@/lib/seo";

const SIZE_CLASSES: Record<string, string> = {
  banner: "min-h-[90px] w-full max-w-[728px] mx-auto",
  "in-article": "min-h-[250px] w-full",
  sidebar: "min-h-[600px] w-full max-w-[300px]",
  footer: "min-h-[90px] w-full max-w-[728px] mx-auto",
};

/**
 * Standardized, policy-compliant ad container.
 *
 * Renders a real <ins class="adsbygoogle"> once NEXT_PUBLIC_ADSENSE_CLIENT_ID and
 * a slot ID are configured. Until then it renders nothing at all: AdSense reviews
 * the live site, and empty dashed placeholder boxes read as broken ad units.
 *
 * The "Advertisement" label and surrounding margin keep ads visually separated
 * from interactive content, per AdSense's accidental-click policy.
 */
export function AdSlot({
  id,
  slot,
  variant = "in-article",
  label = "Advertisement",
}: {
  id: string;
  /** AdSense ad unit ID (the data-ad-slot value from your AdSense dashboard). */
  slot?: string;
  variant?: "banner" | "in-article" | "sidebar" | "footer";
  label?: string;
}) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT_ID || !slot || pushed.current) return;
    pushed.current = true;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch {
      // AdSense blocked by an ad blocker or not yet loaded — nothing to do.
    }
  }, [slot]);

  if (!ADSENSE_CLIENT_ID || !slot) return null;

  return (
    <div className="my-8 flex flex-col items-center gap-2 not-prose">
      <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-600">
        {label}
      </span>
      <ins
        className={`adsbygoogle block ${SIZE_CLASSES[variant]}`}
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-ad-region={id}
      />
    </div>
  );
}
