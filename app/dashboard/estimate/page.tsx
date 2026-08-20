import EstimateForm from "@/components/estimate/EstimateForm";
import FadeInUp from "@/components/shared/FadeInUp";

export default function EstimatePage() {
  return (
    <FadeInUp>
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">
          Property Valuation
        </h1>

        <p className="mt-2 text-slate-500">
          Fill in the property details to get an estimated market value.
        </p>
      </div>

      <EstimateForm />
    </div>
    </FadeInUp>
  );
}