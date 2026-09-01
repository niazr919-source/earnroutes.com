/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Hostinger shared hosting serves plain files from public_html with no Node
  // runtime, so the site is emitted as a fully static bundle into out/.
  output: "export",

  // Emits about/index.html rather than about.html, which Apache/LiteSpeed serve
  // at /about/ with no rewrite rules. Canonicals in lib/seo.ts match this shape.
  trailingSlash: true,

  // The Image Optimization API needs a server; there is none in an export.
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
