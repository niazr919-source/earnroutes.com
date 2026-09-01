import { BookMarked, ExternalLink } from "lucide-react";
import type { Source } from "@/lib/articles";

export function SourcesList({ sources }: { sources: Source[] }) {
  if (!sources || sources.length === 0) return null;

  return (
    <section aria-labelledby="sources-heading" className="not-prose mt-10">
      <h2
        id="sources-heading"
        className="mb-1.5 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white"
      >
        <BookMarked className="h-5 w-5 text-brand-600" /> Sources &amp; Further Reading
      </h2>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        Every factual claim in this guide is drawn from primary, authoritative sources. Figures
        reflect the referenced pages at the time of our last review and can change — always confirm
        current terms on the official site.
      </p>
      <ol className="space-y-3">
        {sources.map((source, i) => (
          <li key={source.url} className="flex gap-3 text-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {i + 1}
            </span>
            <span className="leading-relaxed text-slate-600 dark:text-slate-300">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-700 hover:underline dark:text-brand-400"
              >
                {source.title}
                <ExternalLink className="ml-1 inline h-3 w-3 align-baseline" />
              </a>
              <span className="text-slate-400"> — {source.publisher}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
