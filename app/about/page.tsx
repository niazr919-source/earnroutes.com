import { ShieldCheck, Target, Users, BookCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About EarnRoutes",
  description:
    "Our mission, editorial standards, and how EarnRoutes researches its online income guides.",
  path: "/about",
});

const STANDARDS = [
  {
    icon: Target,
    title: "Built From Primary Sources",
    body: "Every blueprint is written from the official documentation, policy pages, and fee schedules of the platforms it covers — not summarized from other articles.",
  },
  {
    icon: BookCheck,
    title: "Cited & Dated",
    body: "Every guide lists the primary sources behind it, carries a visible last-reviewed date, and is re-checked whenever a platform changes its published policies or payout terms.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent About Money",
    body: "We disclose every affiliate relationship clearly. Revenue never determines which platforms we recommend or how we rank them.",
  },
  {
    icon: Users,
    title: "Realistic, Not Hype-Driven",
    body: "We publish honest timelines and earnings ranges, including the slow, unglamorous parts most 'get rich online' content leaves out.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">About EarnRoutes</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-500 dark:text-slate-400">
          EarnRoutes exists because most &quot;make money online&quot; content is either recycled fluff or
          quietly misleading about how long things actually take. We publish step-by-step,
          teacher-style guides built directly from the official documentation of the platforms
          they cover — ad-supported websites, freelance marketplaces, faceless content channels,
          and digital storefronts — with every factual claim traced back to a cited source.
        </p>

        <h2 className="mt-10 text-xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          To give anyone with an internet connection an honest, actionable map of legitimate
          online income paths — including the setup time, prerequisite skills, and realistic
          earnings range for each one, so readers can choose a path that actually fits their
          situation instead of chasing whatever went viral this week.
        </p>

        <h2 className="mt-10 text-xl font-bold text-slate-900 dark:text-white">Editorial Standards</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {STANDARDS.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
            >
              <s.icon className="h-6 w-6 text-brand-600" />
              <h3 className="mt-3 font-bold text-slate-900 dark:text-white">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-xl font-bold text-slate-900 dark:text-white">Who Writes These Guides</h2>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          EarnRoutes publishes under a single editorial byline rather than invented expert
          personas. We are a small independent team, and we do not claim insider access to any
          of the platforms we write about. What we do instead is read the primary material
          closely: the program policies, fee schedules, eligibility rules, and terms of service
          each platform publishes, plus its own help documentation.
        </p>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          Every guide ends with the list of sources it was built from, so you can verify any
          claim yourself rather than taking our word for it. Where a figure is an estimate or a
          range rather than a published number, we say so in the text. If you find something
          out of date or wrong, please{" "}
          <a href="/contact" className="text-brand-600 underline">
            tell us
          </a>{" "}
          — corrections are logged with the guide&apos;s reviewed date.
        </p>

        <h2 className="mt-10 text-xl font-bold text-slate-900 dark:text-white">How We Make Money</h2>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          EarnRoutes is supported by display advertising and affiliate partnerships with some of
          the platforms we review. This never influences our ratings or recommendations — see our{" "}
          <a href="/affiliate-disclaimer" className="text-brand-600 underline">
            affiliate disclaimer
          </a>{" "}
          for full transparency on how that works.
        </p>
      </section>
    </>
  );
}
