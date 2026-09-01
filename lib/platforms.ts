export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Platform {
  slug: string;
  name: string;
  category: string; // matches Category.slug
  description: string;
  rating: number; // 1-5
  payoutMethods: string[];
  difficulty: Difficulty;
  minPayout: string;
  url: string;
  icon: string; // lucide-react icon name
  featured: boolean;
}

export const platforms: Platform[] = [
  {
    slug: "upwork",
    name: "Upwork",
    category: "freelance-job-platforms",
    description:
      "The largest global freelance marketplace covering development, design, writing, and consulting contracts.",
    rating: 4.5,
    payoutMethods: ["Direct Deposit", "PayPal", "Payoneer", "Wire Transfer"],
    difficulty: "Beginner",
    minPayout: "$5",
    url: "https://www.upwork.com",
    icon: "Briefcase",
    featured: true,
  },
  {
    slug: "fiverr",
    name: "Fiverr",
    category: "freelance-job-platforms",
    description:
      "Productized gig marketplace where you package services into fixed-price offers buyers can purchase instantly.",
    rating: 4.3,
    payoutMethods: ["PayPal", "Payoneer", "Direct Deposit"],
    difficulty: "Beginner",
    minPayout: "$5",
    url: "https://www.fiverr.com",
    icon: "Store",
    featured: true,
  },
  {
    slug: "remote-ok",
    name: "Remote.ok",
    category: "freelance-job-platforms",
    description:
      "Curated remote job board for full-time and contract tech, marketing, and support roles at distributed companies.",
    rating: 4.1,
    payoutMethods: ["Employer Payroll", "Direct Deposit"],
    difficulty: "Intermediate",
    minPayout: "N/A",
    url: "https://remoteok.com",
    icon: "Globe",
    featured: false,
  },
  {
    slug: "youtube-partner-program",
    name: "YouTube Partner Program",
    category: "ad-networks-content",
    description:
      "Monetize video content through ad revenue, channel memberships, Super Thanks, and the YouTube Shorts fund.",
    rating: 4.4,
    payoutMethods: ["Direct Deposit", "AdSense Payout"],
    difficulty: "Intermediate",
    minPayout: "$100",
    url: "https://www.youtube.com/creators",
    icon: "Youtube",
    featured: true,
  },
  {
    slug: "google-adsense",
    name: "Google AdSense",
    category: "ad-networks-content",
    description:
      "The most widely used contextual display ad network — the standard entry point for monetizing websites and blogs.",
    rating: 4.2,
    payoutMethods: ["Direct Deposit", "Wire Transfer", "Check"],
    difficulty: "Beginner",
    minPayout: "$100",
    url: "https://www.google.com/adsense",
    icon: "MonitorPlay",
    featured: true,
  },
  {
    slug: "ezoic",
    name: "Ezoic",
    category: "ad-networks-content",
    description:
      "AI-driven ad optimization platform. As of 2026 it targets established publishers (250k+ monthly users), with an Incubator track for smaller growing sites.",
    rating: 4.0,
    payoutMethods: ["PayPal", "Wire Transfer", "Payoneer"],
    difficulty: "Advanced",
    minPayout: "$20",
    url: "https://www.ezoic.com",
    icon: "TrendingUp",
    featured: false,
  },
  {
    slug: "mediavine",
    name: "Mediavine",
    category: "ad-networks-content",
    description:
      "Premium full-service ad management. Its Journey on-ramp now starts at ~1,000 monthly sessions, auto-upgrading to the main network at $5,000+ annual ad revenue.",
    rating: 4.7,
    payoutMethods: ["Direct Deposit", "PayPal"],
    difficulty: "Intermediate",
    minPayout: "$25",
    url: "https://www.mediavine.com",
    icon: "BarChart3",
    featured: true,
  },
  {
    slug: "etsy",
    name: "Etsy",
    category: "digital-assets-ecommerce",
    description:
      "Marketplace for handmade goods, craft supplies, and digital downloads with built-in buyer traffic.",
    rating: 4.3,
    payoutMethods: ["Direct Deposit", "Etsy Payments"],
    difficulty: "Beginner",
    minPayout: "N/A",
    url: "https://www.etsy.com",
    icon: "ShoppingBag",
    featured: true,
  },
  {
    slug: "gumroad",
    name: "Gumroad",
    category: "digital-assets-ecommerce",
    description:
      "Lightweight storefront for selling digital products, courses, and memberships directly to your audience.",
    rating: 4.4,
    payoutMethods: ["Direct Deposit", "PayPal"],
    difficulty: "Beginner",
    minPayout: "$10",
    url: "https://gumroad.com",
    icon: "Package",
    featured: false,
  },
  {
    slug: "amazon-associates",
    name: "Amazon Associates",
    category: "ad-networks-content",
    description:
      "Affiliate program letting content creators earn commissions by linking to Amazon products.",
    rating: 3.8,
    payoutMethods: ["Direct Deposit", "Amazon Gift Card", "Check"],
    difficulty: "Beginner",
    minPayout: "$10",
    url: "https://affiliate-program.amazon.com",
    icon: "ShoppingCart",
    featured: false,
  },
  {
    slug: "teachable",
    name: "Teachable",
    category: "digital-assets-ecommerce",
    description:
      "Course-hosting platform for creators selling structured educational content and cohort programs.",
    rating: 4.2,
    payoutMethods: ["Direct Deposit", "Stripe", "PayPal"],
    difficulty: "Intermediate",
    minPayout: "N/A",
    url: "https://teachable.com",
    icon: "GraduationCap",
    featured: false,
  },
  {
    slug: "redbubble",
    name: "Redbubble",
    category: "digital-assets-ecommerce",
    description:
      "Print-on-demand marketplace for artists selling designs across apparel, home goods, and accessories.",
    rating: 3.9,
    payoutMethods: ["Direct Deposit", "PayPal"],
    difficulty: "Beginner",
    minPayout: "$20",
    url: "https://www.redbubble.com",
    icon: "Shirt",
    featured: false,
  },
];

export function getPlatformBySlug(slug: string): Platform | undefined {
  return platforms.find((p) => p.slug === slug);
}

export function getFeaturedPlatforms(): Platform[] {
  return platforms.filter((p) => p.featured);
}

export function getPlatformsByCategory(categorySlug: string): Platform[] {
  return platforms.filter((p) => p.category === categorySlug);
}
