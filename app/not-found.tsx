import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <Compass className="h-12 w-12 text-brand-600" />
      <h1 className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white">
        Looks like this route doesn&apos;t exist.
      </h1>
      <p className="mt-3 text-slate-500 dark:text-slate-400">
        The page you&apos;re looking for may have moved. Try heading back to the homepage or
        browsing our guides.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
