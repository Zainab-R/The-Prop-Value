import EstimateForm from "@/components/estimate/EstimateForm";

export default function EstimatePage() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-[#102A43]">
          Property Valuation
        </h1>

        <p className="mt-2 text-slate-600">
          Fill in the property details below to receive an estimated market
          value for your property in DHA Multan.
        </p>
      </div>

      <EstimateForm />
    </div>
  );
}