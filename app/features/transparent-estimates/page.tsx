import FeaturePage from "@/components/FeaturePage";
import {
  ShieldCheck,
  FileText,
  Calculator,
  Eye,
} from "lucide-react";

export default function TransparentEstimatesPage() {
  return (
    <FeaturePage
      title="Transparent Estimates"
      subtitle="Understand every property valuation with clear pricing explanations, detailed calculations, and complete transparency. Every estimate is backed by data-driven insights to help you make informed decisions."
      heroIcon={<ShieldCheck size={48} />}
      backgroundImage="/images/transparent-estimates.jpg"
      highlights={[
        {
          icon: <Calculator />,
          title: "Clear Calculations",
          description:
            "Every estimate is calculated using configurable market rates and property-specific factors.",
        },
        {
          icon: <FileText />,
          title: "Detailed Reports",
          description:
            "Receive comprehensive valuation summaries that explain how the final estimate was determined.",
        },
        {
          icon: <Eye />,
          title: "Full Transparency",
          description:
            "View the contribution of location, property type, and other valuation factors without hidden adjustments.",
        },
        {
          icon: <ShieldCheck />,
          title: "Reliable Results",
          description:
            "Generate consistent and trustworthy estimates based on structured valuation rules and market data.",
        },
      ]}
      benefits={[
        { title: "Complete pricing transparency" },
        { title: "Easy-to-understand valuation reports" },
        { title: "Reliable and consistent estimates" },
        { title: "Greater confidence in property decisions" },
      ]}
    />
  );
}