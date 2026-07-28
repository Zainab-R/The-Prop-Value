import FeaturePage from "@/components/FeaturePage";
import {
  MapPinned,
  Building2,
  Compass,
  Map,
} from "lucide-react";

export default function LocationIntelligencePage() {
  return (
    <FeaturePage
      title="Location Intelligence"
      subtitle="Discover how a property's location influences its market value through sector analysis, surrounding amenities, and strategic positioning."
      heroIcon={<MapPinned size={48} />}
      backgroundImage="/images/location-intelligence.jpg"
      highlights={[
        {
          icon: <MapPinned />,
          title: "Sector Analysis",
          description:
            "Evaluate property value based on DHA Multan sectors and blocks.",
        },
        {
          icon: <Building2 />,
          title: "Nearby Amenities",
          description:
            "Consider schools, parks, mosques, commercial areas, and hospitals.",
        },
        {
          icon: <Compass />,
          title: "Premium Locations",
          description:
            "Analyze corner plots, boulevard-facing plots, and park-facing locations.",
        },
        {
          icon: <Map />,
          title: "Location Insights",
          description:
            "Understand how location characteristics influence estimated value.",
        },
      ]}
      benefits={[
        { title: "Sector-wise property evaluation" },
        { title: "Premium location identification" },
        { title: "Amenity-based valuation insights" },
        { title: "More accurate market estimates" },
      ]}
    />
  );
}