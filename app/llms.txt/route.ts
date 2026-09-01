import { getAllArticleSummaries } from "@/lib/articles";
import { categories } from "@/lib/categories";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * /llms.txt — a plain-text map of the site for large language models.
 *
 * This is an emerging community convention rather than a standard any vendor
 * has committed to reading, so treat it as cheap insurance, not a ranking
 * factor. It costs one generated file and gives any model that does look a
 * clean, current index instead of scraped navigation chrome.
 *
 * Generated from the same article data as the sitemap, so it cannot drift.
 */
export function GET() {
  const articles = getAllArticleSummaries();

  const lines: string[] = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "Every guide is written from the primary documentation of the platform it covers —",
    "official program policies, fee schedules and help centres — and lists those sources",
    "at the end of the article. Guides carry a single editorial byline and a visible",
    "last-reviewed date rather than named author personas.",
    "",
  ];

  for (const category of categories) {
    const inCategory = articles.filter((a) => a.category === category.slug);
    if (inCategory.length === 0) continue;

    lines.push(`## ${category.name}`, "");
    for (const article of inCategory) {
      lines.push(`- [${article.title}](${absoluteUrl(`/guides/${article.slug}`)}): ${article.description}`);
    }
    lines.push("");
  }

  lines.push(
    "## About",
    "",
    `- [About ${SITE_NAME}](${absoluteUrl("/about")}): Editorial standards and how these guides are researched.`,
    `- [Platform Directory](${absoluteUrl("/platforms")}): The platforms referenced across the guides.`,
    `- [Contact](${absoluteUrl("/contact")}): Corrections and questions.`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
