import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { PlatformDirectory } from "@/components/PlatformDirectory";
import { platforms } from "@/lib/platforms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Platform Directory",
  description:
    "A filterable directory of vetted online earning platforms — ratings, payout methods, and difficulty ratings for freelancing, ad networks, and e-commerce.",
  path: "/platforms",
});

export default function PlatformsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Platform Directory", path: "/platforms" }]} />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Platform Directory
        </h1>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
          Every platform referenced across our guides, vetted and rated on payout reliability,
          difficulty, and real-world payout thresholds. Links go directly to official platform
          sites.
        </p>

        <AdSlot id="ad-header-banner" variant="banner" />

        <PlatformDirectory platforms={platforms} />

        <AdSlot id="ad-footer" variant="footer" />
      </section>
    </>
  );
}
