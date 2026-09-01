import { Star, ExternalLink, Wallet } from "lucide-react";
import type { Platform } from "@/lib/platforms";
import { DynamicIcon } from "./DynamicIcon";
import { skillLevelTone, StatBadge } from "./StatBadge";

export function PlatformCard({ platform }: { platform: Platform }) {
  const fullStars = Math.round(platform.rating);

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <DynamicIcon name={platform.icon} className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">{platform.name}</h3>
            <div className="flex items-center gap-0.5" aria-label={`Rated ${platform.rating} out of 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < fullStars ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-700"
                  }`}
                />
              ))}
              <span className="ml-1 text-xs text-slate-400">{platform.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {platform.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <StatBadge icon="GraduationCap" label="Difficulty" value={platform.difficulty} tone={skillLevelTone(platform.difficulty)} />
        <StatBadge icon="Wallet" label="Minimum payout" value={platform.minPayout} tone="slate" />
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
        <Wallet className="h-3.5 w-3.5" />
        {platform.payoutMethods.join(" · ")}
      </div>

      <a
        href={platform.url}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="mt-5 flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 dark:bg-white dark:text-slate-900 dark:hover:bg-brand-500 dark:hover:text-white"
      >
        Visit {platform.name} <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
