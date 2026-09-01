import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-brand-600">
            <Home className="h-3.5 w-3.5" />
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3" />
            {i === items.length - 1 ? (
              <span className="font-medium text-slate-600 dark:text-slate-300">{item.name}</span>
            ) : (
              <Link href={item.path} className="hover:text-brand-600">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
