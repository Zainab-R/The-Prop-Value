import type { Metadata } from "next";
import FeaturePage from "@/components/FeaturePage";
import {
  Home,
  BarChart3,
  MapPinned,
  DollarSign,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Smart Valuation | Prop Value",
  description:
    "Estimate property values accurately using configurable market pricing and intelligent valuation factors.",
};

export default function SmartValuationPage() {
  return (
    <FeaturePage
      title="Smart Valuation"
      subtitle="Estimate property values accurately using configurable market pricing and intelligent valuation factors."
      heroIcon={<Home size={48} />}
       backgroundImage="/images/smart-valuation.jpg"
      highlights={[
        {
          icon: <Home />,
          title: "Property Valuation",
          description: "Estimate plot and house values accurately.",
        },
        {
          icon: <BarChart3 />,
          title: "Market Analysis",
          description: "Powered by current pricing rules.",
        },
        {
          icon: <MapPinned />,
          title: "Sector Intelligence",
          description: "Location-aware valuation.",
        },
        {
          icon: <DollarSign />,
          title: "Transparent Pricing",
          description: "Clear and reliable estimates.",
        },
      ]}
      benefits={[
        { title: "Fast property valuation" },
        { title: "Accurate market estimates" },
        { title: "Sector-specific pricing" },
        { title: "Professional valuation reports" },
      ]}
    />
  );
}