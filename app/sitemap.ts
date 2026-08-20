import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

const featureSlugs = [
  "smart-valuation",
  "transparent-estimates",
  "detailed-analysis",
  "location-intelligence",
  "construction-insights",
  "admin-managed-pricing",
];

const howItWorksSlugs = [
  "enter-property-details",
  "market-analysis",
  "receive-estimate",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms-of-service", priority: 0.3 },
    { path: "/login", priority: 0.5 },
    { path: "/register", priority: 0.5 },
  ];

  const featureRoutes = featureSlugs.map((slug) => ({
    path: `/features/${slug}`,
    priority: 0.7,
  }));

  const howItWorksRoutes = howItWorksSlugs.map((slug) => ({
    path: `/how-it-works/${slug}`,
    priority: 0.7,
  }));

  return [...staticRoutes, ...featureRoutes, ...howItWorksRoutes].map(
    (route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified: new Date(),
      priority: route.priority,
    })
  );
}
