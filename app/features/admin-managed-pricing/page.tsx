import FeaturePage from "@/components/FeaturePage";
import {
  Settings,
  Database,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

export default function AdminManagedPricingPage() {
  return (
    <FeaturePage
      title="Admin Managed Pricing"
      subtitle="Maintain accurate and up-to-date property valuations through a centralized pricing system. Administrators can manage sector rates, valuation factors, and market adjustments without modifying the application's code."
      heroIcon={<Settings size={48} />}
      backgroundImage="/images/admin-managed-pricing.jpg"
      highlights={[
        {
          icon: <Database />,
          title: "Centralized Pricing",
          description:
            "Manage sector rates and valuation parameters from a single administrative dashboard.",
        },
        {
          icon: <RefreshCw />,
          title: "Real-Time Updates",
          description:
            "Update market prices and adjustment factors instantly to reflect changing property trends.",
        },
        {
          icon: <ShieldCheck />,
          title: "Secure Management",
          description:
            "Only authorized administrators can modify pricing data, ensuring accuracy and system reliability.",
        },
        {
          icon: <Settings />,
          title: "Flexible Configuration",
          description:
            "Customize valuation rules and pricing factors without changing or redeploying application code.",
        },
      ]}
      benefits={[
        { title: "Centralized market price management" },
        { title: "Instant pricing and factor updates" },
        { title: "Secure administrator controls" },
        { title: "Consistent and accurate property valuations" },
      ]}
    />
  );
}