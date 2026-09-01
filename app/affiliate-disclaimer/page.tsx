import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalloutBox } from "@/components/CalloutBox";
import { buildMetadata, SITE_NAME } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Affiliate Disclaimer",
  description: "EarnRoutes's full disclosure of affiliate relationships and referral links, per FTC guidelines.",
  path: "/affiliate-disclaimer",
});

const LAST_UPDATED = "August 1, 2026";

export default function AffiliateDisclaimerPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Affiliate Disclaimer", path: "/affiliate-disclaimer" }]} />
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Affiliate Disclaimer</h1>
        <p className="mt-2 text-sm text-slate-400">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-slate mt-8 max-w-none dark:prose-invert">
          <p>
            In accordance with the Federal Trade Commission&apos;s (FTC) guidelines concerning
            testimonials and endorsements, this page discloses {SITE_NAME}&apos;s use of
            affiliate and referral links.
          </p>

          <h2>What This Means</h2>
          <p>
            Some links on {SITE_NAME} — including links to platforms like Upwork, Fiverr, Google
            AdSense, Etsy, and others referenced in our guides — are affiliate or referral links.
            If you click one of these links and sign up for or purchase a product or service, we
            may earn a commission or referral fee at no additional cost to you.
          </p>

          <CalloutBox type="info" title="Our Commitment to You">
            Affiliate relationships never determine which platforms we recommend, how we rate
            them, or the content of our guides. We only link to platforms we believe offer
            genuine value based on independent research and, in most cases, firsthand use by our
            contributors.
          </CalloutBox>

          <h2>How We Choose What to Recommend</h2>
          <p>
            Our editorial team evaluates platforms based on factors including payout reliability,
            ease of use, fee structure, customer support quality, and user reviews. A platform&apos;s
            affiliate program — or lack of one — has no bearing on its rating in our{" "}
            <a href="/platforms">Platform Directory</a> or its inclusion in our guides.
          </p>

          <h2>External Link Attributes</h2>
          <p>
            All outbound links to partner platforms use <code>rel=&quot;nofollow sponsored
            noopener&quot;</code> attributes, in line with Google&apos;s guidelines for
            monetized or sponsored content, ensuring transparent handling of these links from both
            a user-trust and search-engine perspective.
          </p>

          <h2>Not Financial Advice</h2>
          <p>
            As noted in our <a href="/terms-of-service">Terms of Service</a>, all content is
            provided for educational purposes only and does not constitute financial or
            professional advice. Any earnings estimates for affiliate programs, ad networks, or
            freelance platforms are illustrative, not guaranteed.
          </p>

          <h2>Questions</h2>
          <p>
            If you have questions about a specific link or relationship, please reach out via our{" "}
            <a href="/contact">Contact page</a>.
          </p>
        </div>
      </section>
    </>
  );
}
