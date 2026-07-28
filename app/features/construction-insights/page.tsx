import FeaturePage from "@/components/FeaturePage";
import {
  Building2,
  Hammer,
  Home,
  Layers3,
} from "lucide-react";

export default function ConstructionInsightsPage() {
  return (
    <FeaturePage
      title="Construction Insights"
      subtitle="Evaluate construction quality, development stage, and property specifications to estimate the value of residential houses with greater accuracy and confidence."
      heroIcon={<Building2 size={48} />}
      backgroundImage="/images/construction-insights.jpg"
      highlights={[
        {
          icon: <Hammer />,
          title: "Construction Progress",
          description:
            "Assess properties at different construction stages, from foundation to completed homes.",
        },
        {
          icon: <Home />,
          title: "House Specifications",
          description:
            "Consider covered area, number of floors, layout, and finishing quality during valuation.",
        },
        {
          icon: <Layers3 />,
          title: "Quality Assessment",
          description:
            "Analyze construction standards, materials, and workmanship to improve valuation accuracy.",
        },
        {
          icon: <Building2 />,
          title: "Residential Insights",
          description:
            "Compare plots, under-construction houses, and completed homes using intelligent valuation factors.",
        },
      ]}
      benefits={[
        { title: "Construction stage evaluation" },
        { title: "Quality-based property assessment" },
        { title: "Accurate residential valuation" },
        { title: "Comprehensive construction insights" },
      ]}
    />
  );
}