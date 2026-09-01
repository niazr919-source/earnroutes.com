"use client";

import Script from "next/script";
import { ADSENSE_CLIENT_ID } from "@/lib/seo";

/**
 * Loads the AdSense tag only once a publisher ID is configured, so the site can
 * be submitted for review (and crawled) without shipping a dead ad script.
 */
export function AdSenseScript() {
  if (!ADSENSE_CLIENT_ID) return null;

  return (
    <Script
      id="adsbygoogle-init"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
    />
  );
}
