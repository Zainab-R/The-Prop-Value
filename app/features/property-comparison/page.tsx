import type { Metadata } from "next";
import FeaturePage from "@/components/FeaturePage";
import {
  GitCompare,
  Scale,
  Layers,
  ListChecks,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Property Comparison | Prop Value",
  description:
    "Compare two of your saved property estimates side by side to see exactly how sector, size, and price differ, helping you decide between properties with confidence.",
};

export default function PropertyComparisonPage() {
  return (
    <FeaturePage
      title="Property Comparison"
      subtitle="Compare two of your saved property estimates side by side to see exactly how sector, size, and price differ, helping you decide between properties with confidence."
      heroIcon={<GitCompare size={48} />}
      backgroundImage="/images/property-comparison.jpg"
      highlights={[
        {
          icon: <Layers />,
          title: "Side-by-Side View",
          description:
            "Line up two saved estimates in a single table to see every detail at a glance.",
        },
        {
          icon: <Scale />,
          title: "Highlighted Differences",
          description:
            "Sector, property type, size, and price fields that differ between the two are automatically highlighted.",
        },
        {
          icon: <ListChecks />,
          title: "Uses Your Saved History",
          description:
            "Pick straight from your existing search history, no need to re-enter property details.",
        },
        {
          icon: <GitCompare />,
          title: "Clearer Decisions",
          description:
            "See minimum and maximum estimated value ranges next to each other to judge which property fits your budget.",
        },
      ]}
      benefits={[
        { title: "Compare any two saved estimates instantly" },
        { title: "Automatic highlighting of differing attributes" },
        { title: "No re-entering property details" },
        { title: "Easier, more confident property decisions" },
      ]}
    />
  );
}
