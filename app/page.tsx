import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ArticleCard } from "@/components/ArticleCard";
import { AdSlot } from "@/components/AdSlot";
import { DynamicIcon } from "@/components/DynamicIcon";
import { getAllArticleSummaries, getFeaturedArticles } from "@/lib/articles";
import { categories, categoryIconClasses } from "@/lib/categories";
import { getFeaturedPlatforms } from "@/lib/platforms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "EarnRoutes — Real Routes to Real Online Income",
  description:
    "Step-by-step, source-backed blueprints for AI automation, ad monetization, freelancing, and digital products.",
  path: "/",
});

export default function HomePage() {
  const articles = getAllArticleSummaries();
  const featured = getFeaturedArticles(3);
  const featuredSlugs = new Set(featured.map((a) => a.slug));
  const latest = articles.filter((a) => !featuredSlugs.has(a.slug)).slice(0, 6);
  const platforms = getFeaturedPlatforms();

  return (
    <>
      <Hero articles={articles} featured={articles[0]} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdSlot id="ad-header-banner" variant="banner" />
      </div>

      {/* Hub Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Explore by Category</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Four core hubs covering every major online income path.
            </p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className={`group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900`}
            >
              <span
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${categoryIconClasses(c.color)}`}
              >
                <DynamicIcon name={c.icon} className="h-5 w-5" />
              </span>
              <h3 className="font-bold text-slate-900 group-hover:text-brand-600 dark:text-white">
                {c.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {c.description}
              </p>
              <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400">
                Browse guides <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Blueprints */}
      <section className="border-t border-slate-100 bg-slate-50 py-16 dark:border-slate-900 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Featured Step-by-Step Blueprints
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Our deepest, most actionable guides — checked against primary sources and updated regularly.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Guides */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Latest Guides</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Recently published and reviewed, newest first.
            </p>
          </div>
          <Link
            href="/category/ad-networks-content"
            className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand-600 sm:flex dark:text-brand-400"
          >
            Browse all guides <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdSlot id="ad-in-article-1" variant="in-article" />
      </div>

      {/* Top Platform Directory */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Top Vetted Platform Directory
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Direct links to the platforms our guides reference most.
            </p>
          </div>
          <Link
            href="/platforms"
            className="hidden items-center gap-1 text-sm font-semibold text-brand-600 sm:flex dark:text-brand-400"
          >
            View full directory <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p) => (
            <a
              key={p.slug}
              href={p.url}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <DynamicIcon name={p.icon} className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-slate-900 group-hover:text-brand-600 dark:text-white">
                  {p.name}
                </p>
                <p className="text-xs text-slate-400">{p.difficulty} · {p.minPayout} min payout</p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-slate-300 group-hover:text-brand-500" />
            </a>
          ))}
        </div>
        <Link
          href="/platforms"
          className="mt-6 flex items-center justify-center gap-1 text-sm font-semibold text-brand-600 sm:hidden dark:text-brand-400"
        >
          View full directory <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <AdSlot id="ad-footer" variant="footer" />
      </div>
    </>
  );
}
