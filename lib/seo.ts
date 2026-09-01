import type { Metadata } from "next";
import type { ArticleFrontmatter, FaqItem } from "./articles";

export const SITE_NAME = "EarnRoutes";
export const SITE_DOMAIN = "earnroutes.com";
export const SITE_URL = "https://www.earnroutes.com";
export const CONTACT_EMAIL = `hello@${SITE_DOMAIN}`;
export const PRIVACY_EMAIL = `privacy@${SITE_DOMAIN}`;

/**
 * AdSense publisher ID, e.g. "ca-pub-1234567890123456".
 * Set NEXT_PUBLIC_ADSENSE_CLIENT_ID in .env.local once Google approves the site.
 * While this is empty the ad script is not loaded and ad slots render nothing,
 * so reviewers never see empty or placeholder ad boxes.
 */
export const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "";
export const SITE_DESCRIPTION =
  "EarnRoutes is a research-backed guide to online income: step-by-step blueprints for AI automation, ad monetization, freelancing, and digital products — built from primary sources and updated regularly.";

/**
 * Absolute URL for a page path, always with a trailing slash.
 *
 * The static export uses `trailingSlash: true`, so the live URL of /about is
 * /about/. Canonicals, breadcrumbs and the sitemap must use that exact shape or
 * they point at a URL that redirects.
 */
export function absoluteUrl(path: string): string {
  if (!path || path === "/") return `${SITE_URL}/`;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean.endsWith("/") ? clean : `${clean}/`}`;
}

interface PageMetaOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetaOptions): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  } as Metadata;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: SITE_DESCRIPTION,
    sameAs: [],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(article: ArticleFrontmatter, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    // Guides carry a house byline, not a named individual, so the author is
    // declared as the publishing Organization rather than a Person.
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(path),
    },
  };
}

/**
 * FAQPage structured data.
 *
 * Google deprecated FAQ rich results on 7 May 2026, so this earns nothing in
 * Google Search. It is emitted anyway because Google states owners may leave the
 * markup in place for other search engines and services, and answer engines
 * still consume it. The visible FAQ block is what does the real work.
 */
export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
