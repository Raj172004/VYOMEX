import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Globe,
  Layers3,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export const heroData = {
  badge: {
    icon: Sparkles,
    text: "Trusted by Startups & Businesses Across India",
  },

  title: [
    "Design.",
    "Develop.",
    "Scale.",
  ],

  highlight: "Digital Experiences",

  subtitle: "That Drive Growth.",

  description:
    "VYOMEX builds modern websites, SaaS products, enterprise applications and digital experiences that help businesses launch faster and grow with confidence.",

  primaryButton: {
    text: "Start Your Project",
    href: "/contact",
    icon: ArrowRight,
  },

  secondaryButton: {
    text: "Explore Our Work",
    href: "/portfolio",
  },
};

export const heroStats = [
  {
    value: "100%",
    label: "Custom Development",
  },
  {
    value: "Next.js",
    label: "Modern Stack",
  },
  {
    value: "24/7",
    label: "Project Support",
  },
];

export const analyticsCards = [
  {
    title: "Revenue",
    value: "₹2.4M",
    growth: "+18%",
    icon: TrendingUp,
  },
  {
    title: "Projects",
    value: "128",
    growth: "+12",
    icon: BriefcaseBusiness,
  },
  {
    title: "Conversion",
    value: "42.8%",
    growth: "+8%",
    icon: BarChart3,
  },
];

export const recentProjects = [
  {
    title: "Healthcare Platform",
    status: "Completed",
    icon: CheckCircle2,
  },
  {
    title: "Restaurant Website",
    status: "In Review",
    icon: Layers3,
  },
  {
    title: "Real Estate CRM",
    status: "Development",
    icon: Code2,
  },
];

export const floatingCards = [
  {
    title: "Traffic Growth",
    value: "+38%",
    icon: TrendingUp,
    position: "-top-6 -right-6",
  },
  {
    title: "New Client",
    value: "Website Inquiry",
    icon: Globe,
    position: "bottom-6 -left-8",
  },
  {
    title: "Project Approved",
    value: "Today",
    icon: Rocket,
    position: "-bottom-6 right-10",
  },
];

export const securityCard = {
  title: "Enterprise Security",
  description:
    "Modern scalable architecture with secure deployment.",
  icon: ShieldCheck,
};