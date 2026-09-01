"use client";

import Link from "next/link";
import { useState } from "react";
import { Compass, Menu, X } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Compass className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="text-lg">EarnRoutes</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
              Categories
            </button>
            {catOpen && (
              <div className="absolute left-0 top-full w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <span className="font-medium">{c.name}</span>
                    <span className="block text-xs text-slate-400">{c.subNiches.slice(0, 2).join(" · ")}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-1 border-l border-slate-200 pl-2 dark:border-slate-800">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            className="rounded-md p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-200 px-4 py-3 lg:hidden dark:border-slate-800">
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
