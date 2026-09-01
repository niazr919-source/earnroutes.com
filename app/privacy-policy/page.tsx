import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata, SITE_NAME } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How EarnRoutes collects, uses, and protects your data, including third-party advertising and analytics.",
  path: "/privacy-policy",
});

const LAST_UPDATED = "August 1, 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Privacy Policy", path: "/privacy-policy" }]} />
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-400">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-slate mt-8 max-w-none dark:prose-invert">
          <p>
            This Privacy Policy explains how {SITE_NAME} (&quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;) collects, uses, and discloses information when you visit
            earnroutes.com (the &quot;Site&quot;). By using the Site, you agree to the
            collection and use of information in accordance with this policy.
          </p>

          <h2>1. Information We Collect</h2>
          <h3>1.1 Information You Provide</h3>
          <p>
            When you use our contact form, we collect your name, email address, and message
            content. This information is used solely to respond to your inquiry and is not sold
            or shared with third parties for marketing purposes.
          </p>

          <h3>1.2 Automatically Collected Information</h3>
          <p>
            Like most websites, we automatically collect certain information through cookies and
            similar technologies, including your IP address, browser type, device type, pages
            visited, time spent on pages, and referring URLs. This data is collected via
            analytics tools (such as Google Analytics) and helps us understand how visitors use
            the Site.
          </p>

          <h2>2. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our Site and
            store certain information. Cookies are small data files placed on your device. You
            can instruct your browser to refuse all cookies or to indicate when a cookie is being
            sent, though some parts of the Site may not function properly without cookies.
          </p>
          <p>We use the following categories of cookies:</p>
          <ul>
            <li><strong>Essential cookies</strong> — required for basic site functionality.</li>
            <li><strong>Analytics cookies</strong> — help us understand visitor behavior in aggregate.</li>
            <li><strong>Advertising cookies</strong> — used by our ad partners to serve relevant ads and measure ad performance.</li>
          </ul>

          <h2>3. Third-Party Advertising Networks</h2>
          <p>
            We display advertising served by third-party advertising companies, including Google
            AdSense, Ezoic, and Mediavine. These networks may use cookies, web beacons, and
            similar technologies to collect information about your visits to this and other
            websites in order to provide advertisements about goods and services that may
            interest you.
          </p>
          <p>
            Google&apos;s use of advertising cookies enables it and its partners to serve ads
            based on your visits to this site and/or other sites on the Internet. You may opt out
            of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>{" "}
            or{" "}
            <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
              www.aboutads.info/choices
            </a>
            . Ezoic&apos;s privacy practices are detailed at{" "}
            <a href="https://www.ezoic.com/privacy-policy/" target="_blank" rel="noopener noreferrer">
              ezoic.com/privacy-policy
            </a>
            , and Mediavine&apos;s at{" "}
            <a href="https://www.mediavine.com/privacy-policy/" target="_blank" rel="noopener noreferrer">
              mediavine.com/privacy-policy
            </a>
            .
          </p>

          <h2>4. Analytics</h2>
          <p>
            We use analytics services to monitor and analyze use of the Site. These services may
            track information such as pages visited, time spent on the Site, and general
            geographic location (derived from IP address). This data is used in aggregate to
            improve content and site performance and is not used to personally identify
            individual visitors.
          </p>

          <h2>5. Your Rights (GDPR &amp; CCPA)</h2>
          <p>
            Depending on your location, you may have the right to access, correct, delete, or
            restrict processing of your personal data, and the right to opt out of the sale or
            sharing of personal information. To exercise any of these rights, contact us using
            the details below.
          </p>

          <h2>6. Children&apos;s Privacy</h2>
          <p>
            The Site is not directed to children under 13, and we do not knowingly collect
            personal information from children under 13.
          </p>

          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on
            this page with an updated revision date.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please reach out via our{" "}
            <a href="/contact">Contact page</a>.
          </p>
        </div>
      </section>
    </>
  );
}
