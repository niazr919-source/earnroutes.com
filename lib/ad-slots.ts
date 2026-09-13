/**
 * Ad unit IDs, keyed by placement.
 *
 * Every placement below already exists in the page templates — this file only
 * decides whether each one renders. A placement with an empty string renders
 * nothing at all, so unconfigured positions never appear as blank boxes.
 *
 * To switch a placement on:
 *   1. In AdSense, create a Display ad unit for that position.
 *   2. Copy the `data-ad-slot` value from the generated code — a 10-digit number.
 *   3. Paste it against the matching key below and push.
 *
 * You do not need any of this for Auto ads. The AdSense tag in the document
 * head is sufficient for those, and for account verification.
 */
export const AD_SLOTS: Record<string, string> = {
  /** Below the header, above the first content block. Appears site-wide. */
  "ad-header-banner": "",

  /** Inside an article, after the body copy and before the FAQ and sources. */
  "ad-in-article-1": "",

  /** Sticky unit in the guide sidebar, beneath the table of contents. */
  "ad-sidebar-sticky": "",

  /** Bottom of the page, after the related guides. Appears site-wide. */
  "ad-footer": "",
};

/** Returns the configured unit for a placement, or undefined if it is off. */
export function adSlotFor(id: string): string | undefined {
  const slot = AD_SLOTS[id]?.trim();
  return slot ? slot : undefined;
}
