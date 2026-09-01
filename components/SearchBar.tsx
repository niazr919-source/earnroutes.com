"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { ArticleSummary } from "@/lib/articles";

export function SearchBar({ articles }: { articles: ArticleSummary[] }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return articles
      .filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.subNiche.some((n) => n.toLowerCase().includes(q))
      )
      .slice(0, 5);
  }, [query, articles]);

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3.5 shadow-sm focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:focus-within:ring-brand-900/40">
        <Search className="h-5 w-5 shrink-0 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search guides: “AdSense approval”, “Upwork proposals”…"
          className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
        />
      </div>

      {focused && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-xl dark:border-slate-800 dark:bg-slate-900">
          {results.map((r) => (
            <Link
              key={r.slug}
              href={`/guides/${r.slug}`}
              className="block border-b border-slate-100 px-4 py-3 last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
            >
              <p className="text-sm font-medium text-slate-900 dark:text-white">{r.title}</p>
              <p className="mt-0.5 text-xs text-slate-400">{r.earningsPotential}</p>
            </Link>
          ))}
        </div>
      )}

      {focused && query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-xl border border-slate-200 bg-white p-4 text-center text-sm text-slate-400 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          No guides match “{query}” yet.
        </div>
      )}
    </div>
  );
}
