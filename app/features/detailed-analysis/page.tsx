import FeaturePage from "@/components/FeaturePage";
import {
  BarChart3,
  TrendingUp,
  Calculator,
  ClipboardList,
} from "lucide-react";

export default function DetailedAnalysisPage() {
  return (
    <FeaturePage
      title="Detailed Analysis"
      subtitle="Gain a complete understanding of how each property attribute contributes to the estimated value. Every estimate is supported by a transparent breakdown of pricing factors and valuation insights."
      heroIcon={<BarChart3 size={48} />}
      backgroundImage="/images/detailed-analysis.jpg"
      highlights={[
        {
          icon: <Calculator />,
          title: "Value Breakdown",
          description:
            "View how individual property characteristics influence the final estimated value.",
        },
        {
          icon: <TrendingUp />,
          title: "Market Adjustments",
          description:
            "Analyze pricing adjustments based on sector demand, location advantages, and market conditions.",
        },
        {
          icon: <ClipboardList />,
          title: "Transparent Reports",
          description:
            "Receive a structured summary explaining every factor considered during valuation.",
        },
        {
          icon: <BarChart3 />,
          title: "Data-Driven Insights",
          description:
            "Make informed decisions using detailed valuation data and intelligent market analysis.",
        },
      ]}
      benefits={[
        { title: "Complete pricing transparency" },
        { title: "Detailed valuation breakdown" },
        { title: "Market trend analysis" },
        { title: "Reliable decision-making insights" },
      ]}
    />
  );
}