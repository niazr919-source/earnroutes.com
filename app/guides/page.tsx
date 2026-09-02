import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DynamicIcon } from "@/components/DynamicIcon";
import { AdSlot } from "@/components/AdSlot";
import { getAllArticleSummaries } from "@/lib/articles";
import { categories, categoryIconClasses } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "All Guides",
  description:
    "Every EarnRoutes guide in one place — AdSense approval and policy, SEO and indexing, YouTube monetization, freelancing, and digital products. Each one built from primary sources.",
  path: "/guides",
});

export default function GuidesIndexPage() {
  const articles = getAllArticleSummaries();

  return (
    <>
      <Breadcrumbs items={[{ name: "All Guides", path: "/guides" }]} />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">All Guides</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
          Every guide we publish, grouped by topic. {articles.length} in total, each written from the
          official documentation of the platform it covers and listing its sources at the end.
        </p>

        {/* Jump links, so a long index stays navigable on mobile. */}
        <nav aria-label="Jump to category" className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => {
            const count = articles.filter((a) => a.category === c.slug).length;
            return (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              >
                {c.shortName}
                <span className="ml-1.5 text-slate-400">{count}</span>
              </a>
            );
          })}
        </nav>

        <div className="mt-4">
          <AdSlot id="ad-header-banner" variant="banner" />
        </div>

        {categories.map((category) => {
          const inCategory = articles.filter((a) => a.category === category.slug);
          if (inCategory.length === 0) return null;

          return (
            <section key={category.slug} id={category.slug} className="mt-12 scroll-mt-24">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${categoryIconClasses(category.color)}`}
                >
                  <DynamicIcon name={category.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {category.name}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {inCategory.length} guide{inCategory.length === 1 ? "" : "s"}
                  </p>
                </div>
                <Link
                  href={`/category/${category.slug}`}
                  className="ml-auto hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand-600 sm:flex dark:text-brand-400"
                >
                  Category hub <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Dense list rather than cards: the point of this page is to show
                  everything at once and let a reader scan the whole library. */}
              <ul className="mt-4 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                {inCategory.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/guides/${article.slug}`}
                      className="group flex flex-col gap-1 bg-white p-4 transition hover:bg-slate-50 sm:p-5 dark:bg-slate-900 dark:hover:bg-slate-800/60"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-semibold leading-snug text-slate-900 group-hover:text-brand-600 dark:text-white">
                          {article.title}
                        </h3>
                        <span className="hidden shrink-0 items-center gap-1 text-xs text-slate-400 sm:flex">
                          <Clock className="h-3 w-3" />
                          {article.readingTime}
                        </span>
                      </div>
                      <p className="line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                        {article.description}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                        <span>{article.skillLevel}</span>
                        <span aria-hidden="true">·</span>
                        <span>Setup: {article.setupTime}</span>
                        <span aria-hidden="true">·</span>
                        <span>{article.earningsPotential}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <div className="mt-12">
          <AdSlot id="ad-footer" variant="footer" />
        </div>
      </section>
    </>
  );
}
