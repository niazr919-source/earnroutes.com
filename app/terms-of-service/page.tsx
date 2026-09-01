import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata, SITE_NAME } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms and conditions governing your use of EarnRoutes.",
  path: "/terms-of-service",
});

const LAST_UPDATED = "August 1, 2026";

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Terms of Service", path: "/terms-of-service" }]} />
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Terms of Service</h1>
        <p className="mt-2 text-sm text-slate-400">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-slate mt-8 max-w-none dark:prose-invert">
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of
            earnroutes.com (the &quot;Site&quot;), operated by {SITE_NAME}. By accessing the
            Site, you agree to be bound by these Terms.
          </p>

          <h2>1. Use of the Site</h2>
          <p>
            You may use the Site only for lawful purposes and in accordance with these Terms. You
            agree not to use the Site in any way that could damage, disable, or impair the Site,
            or interfere with any other party&apos;s use of the Site.
          </p>

          <h2>2. Educational Content, Not Financial Advice</h2>
          <p>
            All content on the Site is provided for general informational and educational
            purposes only. Nothing on this Site constitutes financial, legal, tax, or
            professional advice. Earnings figures, timelines, and examples referenced in our
            guides are illustrative and based on typical outcomes we have observed or
            researched — they are not guarantees of any specific result. Online income results
            vary significantly based on effort, market conditions, platform policies, and factors
            outside our control.
          </p>

          <h2>3. Third-Party Links and Platforms</h2>
          <p>
            The Site contains links to third-party websites and platforms (including but not
            limited to Upwork, Fiverr, Google AdSense, Etsy, and YouTube) that are not owned or
            controlled by {SITE_NAME}. We have no control over, and assume no responsibility for,
            the content, privacy policies, or practices of any third-party sites or services. You
            acknowledge and agree that {SITE_NAME} is not responsible for any damage or loss
            caused by your use of any such third-party content, goods, or services.
          </p>

          <h2>4. Intellectual Property</h2>
          <p>
            All content on the Site, including text, graphics, logos, and guides, is the property
            of {SITE_NAME} or its content contributors and is protected by copyright and other
            intellectual property laws. You may not reproduce, distribute, or create derivative
            works from our content without prior written permission, except for personal,
            non-commercial use with proper attribution.
          </p>

          <h2>5. No Warranties</h2>
          <p>
            The Site and its content are provided on an &quot;as is&quot; and &quot;as
            available&quot; basis without warranties of any kind, either express or implied. We
            do not warrant that the Site will be uninterrupted, error-free, or that any
            information provided is accurate, complete, or current at all times, as platform
            policies and payout terms referenced in our guides can change without notice.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, {SITE_NAME} shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages, including loss of
            profits or income, arising out of or related to your use of the Site or reliance on
            any content published on it.
          </p>

          <h2>7. Changes to These Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective
            immediately upon posting to this page. Continued use of the Site after changes
            constitutes acceptance of the revised Terms.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            Questions about these Terms can be directed to us via our{" "}
            <a href="/contact">Contact page</a>.
          </p>
        </div>
      </section>
    </>
  );
}
