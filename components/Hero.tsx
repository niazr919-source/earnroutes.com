import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { ArticleSummary } from "@/lib/articles";
import { categories } from "@/lib/categories";
import { SearchBar } from "./SearchBar";

export function Hero({
  articles,
  featured,
}: {
  articles: ArticleSummary[];
  featured?: ArticleSummary;
}) {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-brand-50/60 to-white dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
        {featured && (
          <Link
            href={`/guides/${featured.slug}`}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700 shadow-sm hover:border-brand-400 dark:border-brand-900 dark:bg-slate-900 dark:text-brand-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Trending: {featured.title}
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
      </div>
    </section>
  );
}
