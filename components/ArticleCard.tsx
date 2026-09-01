import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import type { ArticleSummary } from "@/lib/articles";
import { getCategoryBySlug } from "@/lib/categories";
import { StatBadge, skillLevelTone } from "./StatBadge";

export function ArticleCard({ article }: { article: ArticleSummary }) {
  const category = getCategoryBySlug(article.category);

  return (
    <Link
      href={`/guides/${article.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      {category && (
        <span className="mb-3 inline-block w-fit rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
          {category.shortName}
        </span>
      )}

      <h3 className="text-lg font-bold leading-snug text-slate-900 group-hover:text-brand-600 dark:text-white">
        {article.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {article.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <StatBadge icon="GraduationCap" label="Skill level" value={article.skillLevel} tone={skillLevelTone(article.skillLevel)} />
        <StatBadge icon="Timer" label="Setup time" value={article.setupTime} tone="slate" />
        <StatBadge icon="DollarSign" label="Earnings potential" value={article.earningsPotential} tone="emerald" />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400 dark:border-slate-800">
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> {article.readingTime}
        </span>
        <span className="flex items-center gap-1 font-semibold text-brand-600 group-hover:gap-1.5 transition-all dark:text-brand-400">
          Read guide <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
