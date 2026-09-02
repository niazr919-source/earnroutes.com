"use client";

import Link from "next/link";
import { useState } from "react";
import { Compass, Menu, X, ChevronDown } from "lucide-react";
import { categories } from "@/lib/categories";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/platforms", label: "Platform Directory" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 shadow-[0_1px_3px_rgba(15,23,42,0.04)] backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/85">
      {/* Full-bleed rather than a centred max-width container, so the bar spans
          the whole viewport and the brand sits flush with the page edge. */}
      <nav className="flex w-full items-center gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 text-slate-900 dark:text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm ring-1 ring-inset ring-white/20 transition group-hover:shadow-md">
            <Compass className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="text-lg font-extrabold tracking-tight">EarnRoutes</span>
        </Link>

        {/* Centre group takes the remaining width so the line reads as one bar
            rather than two clusters pinned to the edges. */}
        <div className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-400">
              Categories
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${catOpen ? "rotate-180" : ""}`}
              />
            </button>
            {catOpen && (
              <div className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-2">
                <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      className="block rounded-lg px-3 py-2.5 transition hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {c.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-400">
                        {c.subNiches.slice(0, 2).join(" · ")}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-400"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto hidden shrink-0 items-center lg:flex">
          <ThemeToggle />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-200 px-4 py-3 sm:px-6 lg:hidden dark:border-slate-800">
          <p className="px-2 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Categories
          </p>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="block rounded-md px-2 py-2 text-sm text-slate-700 dark:text-slate-200"
              onClick={() => setOpen(false)}
            >
              {c.name}
            </Link>
          ))}
          <div className="my-2 border-t border-slate-200 dark:border-slate-800" />
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-md px-2 py-2 text-sm font-medium text-slate-700 dark:text-slate-200"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
