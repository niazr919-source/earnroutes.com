import { CalendarClock } from "lucide-react";

export function AuthorBox({
  author,
  authorTitle,
  authorBio,
  updatedAt,
}: {
  author: string;
  authorTitle: string;
  authorBio: string;
  updatedAt: string;
}) {
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const formatted = new Date(updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="not-prose flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-start dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white">
        {initials}
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-1.5">
          <p className="font-bold text-slate-900 dark:text-white">{author}</p>
        </div>
        <p className="text-sm font-medium text-brand-700 dark:text-brand-400">{authorTitle}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{authorBio}</p>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
          <CalendarClock className="h-3.5 w-3.5" />
          Last reviewed on {formatted}
        </p>
      </div>
    </div>
  );
}
