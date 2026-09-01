"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "consent-choice";

type Choice = "granted" | "denied";

function updateConsent(choice: Choice) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
}

/**
 * Baseline consent gate for advertising and analytics cookies.
 *
 * Pairs with the Consent Mode v2 defaults set in the document head: those
 * default EEA/UK visitors to "denied", and this banner is what upgrades them.
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "granted" || stored === "denied") {
        updateConsent(stored);
      } else {
        setVisible(true);
      }
    } catch {
      // Storage blocked (private mode, cookies disabled) — stay on the denied
      // defaults rather than nagging on every page view.
    }
  }, []);

  function choose(choice: Choice) {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Non-fatal: the choice still applies for this page view.
    }
    updateConsent(choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-slate-200 bg-white/95 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          We use cookies to run this site, measure traffic, and show ads from our partners. You can
          accept personalized ads and analytics, or continue with essential cookies only. Read our{" "}
          <Link href="/privacy-policy" className="font-medium text-brand-600 underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => choose("denied")}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Essential only
          </button>
          <button
            onClick={() => choose("granted")}
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
