import type { MetadataRoute } from "next";
import { getAllArticleSlugs } from "@/lib/articles";
import { categories } from "@/lib/categories";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/platforms"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/guides"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/contact"), changeFrequency: "monthly", priority: 0.3 },
    { url: absoluteUrl("/privacy-policy"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/terms-of-service"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/affiliate-disclaimer"), changeFrequency: "yearly", priority: 0.2 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: absoluteUrl(`/category/${c.slug}`),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const guidePages: MetadataRoute.Sitemap = getAllArticleSlugs().map((slug) => ({
    url: absoluteUrl(`/guides/${slug}`),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticPages, ...categoryPages, ...guidePages];
}
