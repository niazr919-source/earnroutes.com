import Link from "next/link";
import { Sparkles, BookMarked, CalendarCheck, Link2 } from "lucide-react";
import type { ArticleSummary } from "@/lib/articles";
import { categories } from "@/lib/categories";
import { SearchBar } from "./SearchBar";

/** Most recent review date across the library, for the "updated" signal. */
function lastReviewed(articles: ArticleSummary[]): string {
  const newest = articles
    .map((a) => a.updatedAt)
    .sort()
    .pop();
  if (!newest) return "";
  return new Date(newest).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function Hero({
  articles,
  featured,
}: {
  articles: ArticleSummary[];
  featured?: ArticleSummary;
}) {
  const reviewed = lastReviewed(articles);

  const signals = [
    { icon: BookMarked, text: `${articles.length} in-depth guides` },
    { icon: Link2, text: "Every claim linked to a primary source" },
    ...(reviewed ? [{ icon: CalendarCheck, text: `Last reviewed ${reviewed}` }] : []),
  ];

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-brand-50/70 via-white to-white dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
      {/* Soft radial wash behind the headline so the band isn't a flat block of
          colour. Purely decorative and non-interactive. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-brand-200/25 blur-3xl dark:bg-brand-900/20"
      />

      <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
        {featured && (
          <Link
            href={`/guides/${featured.slug}`}
            className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-brand-200 bg-white/90 px-4 py-1.5 text-xs font-semibold text-brand-700 shadow-sm backdrop-blur transition hover:border-brand-400 hover:shadow dark:border-brand-900 dark:bg-slate-900/90 dark:text-brand-300"
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Trending: {featured.title}</span>
          </Link>
        )}

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          Real routes to real online income.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">
          Step-by-step, source-backed blueprints for AI automation, ad monetization,
          freelancing, and digital products — no hype, just what actually works.
        </p>

        <div className="mt-8">
          <SearchBar articles={articles} />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-600 transition hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-brand-400"
            >
              {c.shortName}
            </Link>
          ))}
        </div>

        {/* Trust signals. Every one of these is a fact a reader can check on the
            page, which is the whole editorial position of the site. */}
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-slate-500 dark:text-slate-400">
          {signals.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5 text-brand-500" />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
