import Link from "next/link";
import { Compass } from "lucide-react";
import { categories } from "@/lib/categories";

const POLICY_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/affiliate-disclaimer", label: "Affiliate Disclaimer" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
                <Compass className="h-5 w-5" strokeWidth={2.5} />
              </span>
              <span className="text-lg">EarnRoutes</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Research-backed guides to building real online income — checked against primary
              sources and updated regularly.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Categories</h3>
            <ul className="mt-3 space-y-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                  >
                    {c.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Resources</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/platforms"
                  className="text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                >
                  Platform Directory
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                >
                  Editorial Standards
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Legal</h3>
            <ul className="mt-3 space-y-2">
              {POLICY_LINKS.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row dark:border-slate-800">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} EarnRoutes. All rights reserved.
          </p>
          <p className="max-w-xl text-center text-xs text-slate-400 sm:text-right">
            EarnRoutes may earn a commission from partner links at no extra cost to you. See our{" "}
            <Link href="/affiliate-disclaimer" className="underline hover:text-brand-600">
              affiliate disclaimer
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
