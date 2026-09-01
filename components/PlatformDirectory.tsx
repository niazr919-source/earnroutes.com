"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { Platform } from "@/lib/platforms";
import { categories } from "@/lib/categories";
import { PlatformCard } from "./PlatformCard";

const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"] as const;

export function PlatformDirectory({ platforms }: { platforms: Platform[] }) {
  const [category, setCategory] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<(typeof DIFFICULTIES)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return platforms.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (difficulty !== "All" && p.difficulty !== difficulty) return false;
      if (query.trim() && !p.name.toLowerCase().includes(query.trim().toLowerCase())) return false;
      return true;
    });
  }, [platforms, category, difficulty, query]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
          <SlidersHorizontal className="h-4 w-4" /> Filter:
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search platform name…"
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.shortName}
            </option>
          ))}
        </select>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as (typeof DIFFICULTIES)[number])}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        >
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d}>
              {d} difficulty
            </option>
          ))}
        </select>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PlatformCard key={p.slug} platform={p} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-400 dark:border-slate-700">
          No platforms match your filters. Try broadening your search.
        </p>
      )}
    </div>
  );
}
